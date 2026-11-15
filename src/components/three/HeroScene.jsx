import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useRef } from 'react'

function Ornament() {
  const group = useRef()
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.z += delta * 0.05
    group.current.rotation.x = state.pointer.y * 0.08
    group.current.rotation.y = state.pointer.x * 0.12
  })
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={group} position={[1.9, 1.15, -1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.8, 0.012, 8, 96]} /><meshStandardMaterial color="#E7C98D" emissive="#C9A45C" emissiveIntensity={1.5} transparent opacity={0.42} /></mesh>
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}><torusGeometry args={[0.55, 0.008, 8, 80]} /><meshStandardMaterial color="#FFF8EA" emissive="#C9A45C" emissiveIntensity={1.2} transparent opacity={0.28} /></mesh>
      </group>
    </Float>
  )
}

export default function HeroScene() {
  return <div className="hero-canvas" aria-hidden="true"><Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}><ambientLight intensity={0.3} /><pointLight position={[2, 2, 3]} intensity={14} color="#E7C98D" /><Sparkles count={48} scale={[8, 5, 2]} size={1.5} speed={0.3} opacity={0.65} color="#E7C98D" /><Ornament /></Canvas></div>
}

