'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

// ─── config ───────────────────────────────────────────────
const NODE_COUNT     = 80
const EDGE_MAX_DIST  = 2.8
const SPHERE_RADIUS  = 8
const CAMERA_Z_START = 14
const CAMERA_Z_END   = 5
const ROTATION_SPEED = 0.0003
const MOUSE_INFLUENCE = 0.4
const COLOR_CYAN     = new THREE.Color('#06b6d4')
const COLOR_ORANGE   = new THREE.Color('#f97316')
const COLOR_GREEN    = new THREE.Color('#00ff88')
const COLOR_WHITE    = new THREE.Color('#ffffff')
const BG_COLOR       = new THREE.Color('#050506')

// ─── helpers ──────────────────────────────────────────────
function randomSpherePoint(radius: number): THREE.Vector3 {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const r = radius * Math.cbrt(Math.random()) // volume-uniform
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  )
}

function pickNodeColor(i: number): THREE.Color {
  const t = i / NODE_COUNT
  if (t < 0.35) return COLOR_CYAN.clone()
  if (t < 0.55) return COLOR_GREEN.clone()
  if (t < 0.75) return COLOR_ORANGE.clone()
  return COLOR_WHITE.clone().multiplyScalar(0.6)
}

// ─── component ────────────────────────────────────────────
export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef({
    scrollY: 0,
    mouseX: 0,
    mouseY: 0,
    destroyed: false,
  })

  const init = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    // ── renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── scene & camera ──
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(BG_COLOR.getHex(), 0.04)

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, CAMERA_Z_START)

    // ── nodes (points) ──
    const positions: THREE.Vector3[] = []
    const nodeGeometry = new THREE.BufferGeometry()
    const posArr = new Float32Array(NODE_COUNT * 3)
    const colArr = new Float32Array(NODE_COUNT * 3)
    const sizeArr = new Float32Array(NODE_COUNT)

    for (let i = 0; i < NODE_COUNT; i++) {
      const p = randomSpherePoint(SPHERE_RADIUS)
      positions.push(p)
      posArr[i * 3]     = p.x
      posArr[i * 3 + 1] = p.y
      posArr[i * 3 + 2] = p.z
      const c = pickNodeColor(i)
      colArr[i * 3]     = c.r
      colArr[i * 3 + 1] = c.g
      colArr[i * 3 + 2] = c.b
      sizeArr[i] = 3.5 + Math.random() * 5
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
    nodeGeometry.setAttribute('color',    new THREE.BufferAttribute(colArr, 3))
    nodeGeometry.setAttribute('size',     new THREE.BufferAttribute(sizeArr, 1))

    const nodeMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.2, 0.5, d);
          float glow  = exp(-d * 6.0) * 0.6;
          gl_FragColor = vec4(vColor * (1.0 + glow), alpha * 0.85);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(nodeGeometry, nodeMaterial)
    scene.add(points)

    // ── edges (lines between nearby nodes) ──
    const edgePositions: number[] = []
    const edgeColors: number[] = []

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = positions[i].distanceTo(positions[j])
        if (dist < EDGE_MAX_DIST) {
          edgePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z,
          )
          const c1 = pickNodeColor(i)
          const c2 = pickNodeColor(j)
          edgeColors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b)
        }
      }
    }

    const edgeGeometry = new THREE.BufferGeometry()
    edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3))
    edgeGeometry.setAttribute('color',    new THREE.Float32BufferAttribute(edgeColors, 3))

    const edgeMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    // scene.add(edges)

    // ── ambient glow sphere ──
    const glowGeo = new THREE.IcosahedronGeometry(SPHERE_RADIUS * 0.65, 3)
    const glowMat = new THREE.MeshBasicMaterial({
      color: COLOR_CYAN,
      transparent: true,
      opacity: 0.015,
      wireframe: true,
    })
    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
    // scene.add(glowMesh)

    // ── event listeners ──
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      stateRef.current.scrollY = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }

    const onMouse = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth)  * 2 - 1
      stateRef.current.mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }

    const onResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('resize', onResize)
    onScroll()

    // ── animation loop ──
    const clock = new THREE.Clock()

    const animate = () => {
      if (stateRef.current.destroyed) return
      requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()
      const { scrollY, mouseX, mouseY } = stateRef.current

      // Camera zoom based on scroll
      const targetZ = CAMERA_Z_START + (CAMERA_Z_END - CAMERA_Z_START) * scrollY
      camera.position.z += (targetZ - camera.position.z) * 0.05

      // Camera look offset based on mouse (parallax)
      camera.position.x += (mouseX * MOUSE_INFLUENCE - camera.position.x) * 0.03
      camera.position.y += (-mouseY * MOUSE_INFLUENCE - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)

      // Rotate the network
      const rotSpeed = ROTATION_SPEED * (1 + scrollY * 2)
      points.rotation.y += rotSpeed
      points.rotation.x = Math.sin(elapsed * 0.1) * 0.15
      // No edges or glowMesh rotations and opacities since they are disabled

      renderer.render(scene, camera)
    }

    animate()

    // ── cleanup ──
    return () => {
      stateRef.current.destroyed = true
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      nodeGeometry.dispose()
      nodeMaterial.dispose()
      edgeGeometry.dispose()
      edgeMaterial.dispose()
      glowGeo.dispose()
      glowMat.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  useEffect(() => {
    const cleanup = init()
    return () => cleanup?.()
  }, [init])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[2]"
      style={{ pointerEvents: 'none', opacity: 0.15 }}
    />
  )
}
