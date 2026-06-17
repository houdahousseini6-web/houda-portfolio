import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const FloatingParticles = () => {
  const count = 200
  const mesh = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return positions
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#A855F7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

const AnimatedSphere = () => {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={mesh} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#7C3AED"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#4C1D95"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  )
}

const FloatingRing = ({ position, color, size }) => {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.5
      mesh.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
      <Torus ref={mesh} args={[size, 0.02, 16, 100]} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Torus>
    </Float>
  )
}

const Scene3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#A855F7" />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#EC4899" />
        <pointLight position={[0, 0, 4]} intensity={0.6} color="#22D3EE" />

        <AnimatedSphere />
        <FloatingRing position={[0, 0, 0]} color="#A855F7" size={2.5} />
        <FloatingRing position={[0, 0, 0]} color="#EC4899" size={3.2} />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}

export default Scene3D