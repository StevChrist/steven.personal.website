// dipakai di Main.tsx
'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function Model() {
  const gltf = useGLTF('/models/myAvatar.glb')
  const modelRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame(({ clock }) => {
    if (modelRef.current) {
      const time = clock.getElapsedTime()

      // Idle animation (floating)
      modelRef.current.position.y = -1 + Math.sin(time * 2) * 0.05

      // Rotate based on mouse X
      const targetYRotation = mouse.x * 0.5
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetYRotation,
        0.1
      )
    }
  })

  return (
    <group ref={modelRef}>
      {/* Bayangan mengikuti group */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <circleGeometry args={[0.8, 64]} />
        <meshStandardMaterial
          color="grey"
          transparent
          opacity={0.35}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Model */}
      <primitive object={gltf.scene} scale={1.7} position={[0, -0.5, 0.2]} />
    </group>
  )
}

export default function ModelViewer() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 2, 7], fov: 30 }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  )
}