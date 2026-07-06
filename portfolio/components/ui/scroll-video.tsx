'use client'

import { useRef, useEffect, useCallback } from 'react'

interface ScrollVideoProps {
  src: string
  className?: string
  style?: React.CSSProperties
  /** 0–1, how opaque the video is. Default 1 */
  opacity?: number
  /** 0-1, brightness level. Default 0.7 to darken the background video */
  brightness?: number
}

/**
 * Scroll-driven video background.
 *
 * Instead of seeking frame-by-frame (which is janky because browsers
 * decode from the nearest keyframe), this component actually *plays*
 * the video and dynamically adjusts `playbackRate` so it catches up
 * to the target time determined by scroll position.
 *
 * This leverages the browser's native video decoder pipeline, which
 * produces smooth frame output. When the user stops scrolling, the
 * video pauses.
 */
export function ScrollVideo({
  src,
  className = '',
  style = {},
  opacity = 1,
  brightness = 0.7,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const targetTime = useRef(0)
  const lastScroll = useRef(0)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tickId = useRef(0)

  const findSection = useCallback((node: HTMLVideoElement | null) => {
    if (!node) return
    videoRef.current = node
    let el: HTMLElement | null = node.parentElement
    while (el && el.tagName !== 'SECTION') el = el.parentElement
    sectionRef.current = el
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.currentTime = 0

    /** Compute where the video should be based on scroll position */
    const computeTarget = () => {
      const section = sectionRef.current
      if (!section || !video.duration || isNaN(video.duration)) return 0

      const rect = section.getBoundingClientRect()
      const wh = window.innerHeight
      const progress = Math.max(0, Math.min(1, (wh - rect.top) / (rect.height + wh)))
      return progress * video.duration
    }

    /**
     * Animation tick: adjust playbackRate so the video smoothly
     * converges toward `targetTime`. Runs every frame while active.
     *
     * Backward scrolling uses dynamic seek steps proportional to
     * the distance, so it keeps up with fast reverse scrolling.
     */
    const tick = () => {
      if (!video || !video.duration || isNaN(video.duration)) return

      const diff = targetTime.current - video.currentTime
      const absDiff = Math.abs(diff)

      if (absDiff < 0.02) {
        // Close enough — freeze
        video.pause()
        return
      }

      // For large jumps (e.g. anchor-click or fast swipe), seek directly
      if (absDiff > 0.8) {
        video.pause()
        video.currentTime = targetTime.current
        return
      }

      if (diff > 0) {
        // Forward: use native playback with dynamic rate
        const rate = Math.min(Math.max(absDiff * 3, 0.4), 4)
        video.playbackRate = rate
        if (video.paused) video.play().catch(() => {})
      } else {
        // Backward: dynamic step size proportional to distance
        // Close: tiny steps (smooth). Far: bigger steps (responsive).
        video.pause()
        const step = Math.min(Math.max(absDiff * 0.35, 0.02), 0.15)
        video.currentTime = Math.max(0, video.currentTime - step)
      }

      tickId.current = requestAnimationFrame(tick)
    }

    const handleScroll = () => {
      targetTime.current = computeTarget()

      // Cancel any pending idle-pause
      if (idleTimer.current) clearTimeout(idleTimer.current)

      // Start animation loop
      cancelAnimationFrame(tickId.current)
      tickId.current = requestAnimationFrame(tick)

      // Pause after user stops scrolling for 300ms
      // (longer than before so backward seeking has time to finish)
      idleTimer.current = setTimeout(() => {
        cancelAnimationFrame(tickId.current)
        // Final snap to exact target position
        if (video.duration && !isNaN(video.duration)) {
          const finalDiff = Math.abs(targetTime.current - video.currentTime)
          if (finalDiff > 0.02 && finalDiff < 1) {
            video.currentTime = targetTime.current
          }
        }
        video.pause()
      }, 300)
    }

    const onMeta = () => {
      targetTime.current = computeTarget()
      video.currentTime = targetTime.current
    }

    video.addEventListener('loadedmetadata', onMeta)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Set initial position
    if (video.readyState >= 1) onMeta()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      video.removeEventListener('loadedmetadata', onMeta)
      cancelAnimationFrame(tickId.current)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [])

  return (
    <>
      <video
        ref={findSection}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 ${className}`}
        style={{
          opacity,
          willChange: 'transform',
          background: '#050506',
          filter: `brightness(${brightness})`,
          ...style,
        }}
      />
      {/* Top fade: dark → transparent */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-[1]"
        style={{
          height: '180px',
          background: 'linear-gradient(to bottom, #050506 0%, rgba(5,5,6,0) 100%)',
        }}
      />
      {/* Bottom fade: transparent → dark */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
        style={{
          height: '180px',
          background: 'linear-gradient(to top, #050506 0%, rgba(5,5,6,0) 100%)',
        }}
      />
    </>
  )
}
