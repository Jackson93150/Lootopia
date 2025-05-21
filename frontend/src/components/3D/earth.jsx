import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
// components/3d/Earth.jsx
import { useEffect, useRef } from "react"

export default function Earth({ earthRef }) {
  const group = useRef(null)
  const { scene, animations } = useGLTF("/images/3D/earth_cartoon.glb")
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const firstActionName = Object.keys(actions)[0]
    if (firstActionName) {
      actions[firstActionName].reset().fadeIn(0.5).play()
    }
  }, [actions])

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.01
      earthRef.current.rotation.x += delta * 0.01
    }
  })

  return (
    <group ref={earthRef} position={[0, -4.6, 0]} rotation={[0.5, 0.5, 1]}>
      <primitive ref={group} object={scene} scale={4} />
    </group>
  )
}

useGLTF.preload("/images/3D/earth_cartoon.glb")
