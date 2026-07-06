'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FaPython, FaTelegramPlane } from 'react-icons/fa'
import { useLang } from '@/context/lang'

/**
 * GlobalScrollVideo — a single fixed canvas background for the entire site.
 *
 * The background animation is driven by page scroll:
 * 0% scroll = frame 1, 100% scroll = frame 192.
 *
 * Uses preloaded image frames rendered to a 1280x720 HTML5 Canvas.
 * This provides ultra-smooth forward and backward scroll animations.
 */
export function GlobalScrollVideo({
  brightness = 0.32,
}: {
  src?: string // kept for backward compatibility but unused
  brightness?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(1)
  const { lang } = useLang()
  const [isHovered, setIsHovered] = useState(false)

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[frameIndex]
    if (img && img.complete && img.naturalWidth !== 0) {
      ctx.drawImage(img, 0, 0, 1920, 1080)
    } else {
      // Find the closest loaded frame
      const closestImg = findClosestLoadedFrame(frameIndex)
      if (closestImg) {
        ctx.drawImage(closestImg, 0, 0, 1920, 1080)
      }
    }
  }

  const findClosestLoadedFrame = (targetIndex: number) => {
    for (let offset = 1; offset < 192; offset++) {
      const left = targetIndex - offset
      const right = targetIndex + offset
      if (left >= 1 && imagesRef.current[left]?.complete && imagesRef.current[left]?.naturalWidth !== 0) {
        return imagesRef.current[left]
      }
      if (right <= 192 && imagesRef.current[right]?.complete && imagesRef.current[right]?.naturalWidth !== 0) {
        return imagesRef.current[right]
      }
    }
    return imagesRef.current[1]?.complete ? imagesRef.current[1] : null
  }

  const computeTargetFrame = () => {
    const scrollTop = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (maxScroll <= 0) return 1
    const progress = Math.max(0, Math.min(1, scrollTop / maxScroll))
    return Math.max(1, Math.min(192, Math.round(progress * 191) + 1))
  }

  useEffect(() => {
    // 1. Preload first frame immediately for instant background
    const firstImg = new Image()
    firstImg.src = '/images/frames_webp/frame_001.webp'
    firstImg.onload = () => {
      imagesRef.current[1] = firstImg
      drawFrame(1)
      
      // Start progressive loading of other keyframes to quickly fill the scrollbar range
      loadKeyframes()
    }

    // Keyframes list: load every 8th frame to get a quick visual baseline
    const keyframes: number[] = []
    for (let i = 1; i <= 192; i += 8) {
      if (i !== 1) keyframes.push(i)
    }
    if (keyframes[keyframes.length - 1] !== 192) {
      keyframes.push(192)
    }

    const loadKeyframes = () => {
      let index = 0
      const nextKeyframe = () => {
        if (index >= keyframes.length) {
          // Keyframes loaded, now load all remaining frames in non-blocking batches
          loadRemainingFrames()
          return
        }
        const frameIndex = keyframes[index]
        index++
        const img = new Image()
        const frameNum = String(frameIndex).padStart(3, '0')
        img.src = `/images/frames_webp/frame_${frameNum}.webp`
        imagesRef.current[frameIndex] = img
        img.onload = () => {
          if (currentFrameRef.current === frameIndex) {
            drawFrame(frameIndex)
          }
          nextKeyframe()
        }
        img.onerror = () => {
          nextKeyframe()
        }
      }
      nextKeyframe()
    }

    const loadRemainingFrames = () => {
      const remaining: number[] = []
      for (let i = 1; i <= 192; i++) {
        if (!imagesRef.current[i]) {
          remaining.push(i)
        }
      }

      let index = 0
      const CONCURRENCY = 4
      
      const loadNext = () => {
        if (index >= remaining.length) return
        const frameIndex = remaining[index]
        index++
        
        const img = new Image()
        const frameNum = String(frameIndex).padStart(3, '0')
        img.src = `/images/frames_webp/frame_${frameNum}.webp`
        imagesRef.current[frameIndex] = img
        img.onload = () => {
          if (currentFrameRef.current === frameIndex) {
            drawFrame(frameIndex)
          }
          loadNext()
        }
        img.onerror = () => {
          loadNext()
        }
      }

      for (let c = 0; c < CONCURRENCY; c++) {
        loadNext()
      }
    }

    // 3. Scroll listener for dynamic brightness & blur transition
    const handleScroll = () => {
      const targetFrame = computeTargetFrame()
      if (currentFrameRef.current !== targetFrame) {
        currentFrameRef.current = targetFrame
        requestAnimationFrame(() => drawFrame(targetFrame))
      }

      // Dynamic adjustments based on scroll position (transition finishes at 400px scroll)
      const scrollTop = window.scrollY
      const transitionProgress = Math.max(0, Math.min(1, scrollTop / 400))

      // Brightness: 0.65 at Hero -> 0.40 at content sections
      const currBrightness = 0.65 - (0.65 - 0.40) * transitionProgress

      // Blur: 0px at Hero -> 5px at content sections
      const currBlur = transitionProgress * 5

      const canvas = canvasRef.current
      if (canvas) {
        canvas.style.filter = `brightness(${currBrightness}) blur(${currBlur}px)`
      }

      const overlay = overlayRef.current
      if (overlay) {
        // Soft backdrop-filter blur on the overlay: 0px -> 2.5px
        const overlayBlur = transitionProgress * 2.5
        overlay.style.backdropFilter = overlayBlur > 0 ? `blur(${overlayBlur}px)` : 'none'

        // Vignette edge opacity: 0.15 -> 0.45
        const edgeOpacity = 0.15 + 0.30 * transitionProgress
        overlay.style.background = `radial-gradient(ellipse at center, transparent 40%, rgba(5,5,6,${edgeOpacity}) 100%)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial sync
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* 16:9 Aspect Ratio Wrapper to keep the overlay perfectly in sync with the video/canvas pixels */}
      <div
        className="fixed top-1/2 left-1/2 pointer-events-none z-0 overflow-hidden"
        style={{
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '56.25vw', // 16:9 height (9/16 = 56.25%)
          minHeight: '100vh',
          minWidth: '177.78vh', // 16:9 width (16/9 = 177.78%)
        }}
      >
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-fill pointer-events-none"
          style={{
            willChange: 'transform',
            background: '#050506',
            filter: `brightness(0.65) blur(0px)`, // starting values
          }}
        />

        {/* Floating tech badge covering the stock video watermark (bottom-right: x ~1820, y ~1020 of 1920x1080) */}
        <a
          href="https://t.me/ad_min_group"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute flex items-center justify-center pointer-events-auto"
          style={{
            right: '0.8%',
            bottom: '0.8%',
            width: '5.5%',
            aspectRatio: '1 / 1',
            minWidth: '46px',
            minHeight: '46px',
            maxWidth: '100px',
            maxHeight: '100px',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="w-full h-full rounded-full flex items-center justify-center relative transition-all duration-300"
            style={{
              background: 'rgba(5, 5, 6, 0.65)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              boxShadow: isHovered 
                ? '0 0 25px rgba(6, 182, 212, 0.45), inset 0 0 15px rgba(6, 182, 212, 0.2)'
                : '0 0 15px rgba(6, 182, 212, 0.15), inset 0 0 10px rgba(6, 182, 212, 0.1)',
            }}
            animate={{
              scale: isHovered ? 1.12 : 1,
            }}
          >
            {/* Spinning tech border */}
            <div
              className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-spin"
              style={{
                animationDuration: '12s',
              }}
            />

            {/* Glowing inner border */}
            <div
              className="absolute inset-[3px] rounded-full border border-t-orange-500/40 border-r-green-500/20 border-b-cyan-500/40 border-l-transparent animate-spin"
              style={{
                animationDuration: '6s',
                animationDirection: 'reverse',
              }}
            />

            {/* Animated Icon Container */}
            <div className="relative z-10 flex items-center justify-center text-cyan-400">
              <AnimatePresence mode="wait">
                {!isHovered ? (
                  <motion.div
                    key="python"
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FaPython className="w-[50%] h-[50%] min-w-[20px] min-h-[20px] max-w-[44px] max-h-[44px] text-cyan-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="telegram"
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FaTelegramPlane className="w-[50%] h-[50%] min-w-[20px] min-h-[20px] max-w-[44px] max-h-[44px] text-orange-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tooltip on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-[120%] top-1/2 -translate-y-1/2 py-2 px-3.5 rounded-lg whitespace-nowrap text-xs font-mono border"
                  style={{
                    background: 'rgba(5, 5, 6, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderColor: 'rgba(6, 182, 212, 0.3)',
                    color: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {lang === 'en' ? 'Telegram Dev' : 'Написать разработчику'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </a>
      </div>

      {/* Dynamic vignette + backdrop blur overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,6,0.15) 100%)',
          transition: 'backdrop-filter 0.1s, background 0.1s',
        }}
      />
    </>
  )
}
