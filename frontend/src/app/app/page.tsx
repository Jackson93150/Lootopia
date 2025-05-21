"use client"

import Earth from "@/components/3D/earth"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Autofocus, BrightnessContrast, EffectComposer } from "@react-three/postprocessing"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

export default function AppPage() {
  const earthRef = useRef(null)
  const controls = useAnimation()
  const canvasControls = useAnimation()

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      controls
        .start({
          scale: 1.2,
          transition: { duration: 0.8, ease: "easeOut" },
        })
        .then(() => {
          controls.start({
            scale: [1.2, 1, 1.2],
            transition: {
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            },
          })
        })
    }, 500)

    const canvasTimer = setTimeout(() => {
      canvasControls.start({
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      })
    }, 500)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(canvasTimer)
    }
  }, [controls, canvasControls])

  return (
    <div className="bg-gradient-to-t from-[#a2cbf4] via-[#69BDF2] to-[#0150fa] relative w-screen h-screen flex justify-center">
      {/* <div className="absolute top-50 left-6 z-10">
        <StylishButton variant="bag" onClick={() => console.log("clicked")} />
      </div> */}
      <motion.img
        src="/images/title.png"
        alt="title"
        className="absolute w-[40vw] will-change-transform"
        initial={{ scale: 0 }}
        animate={controls}
      />

      <motion.div initial={{ opacity: 0 }} animate={canvasControls} className="w-full h-full pointer-events-none">
        <Canvas gl={{ powerPreference: "high-performance" }} camera={{ position: [0, 0, 5], fov: 40 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[50, 50, 15]} intensity={6.5} />
          <Earth earthRef={earthRef} />
          <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
          <EffectComposer multisampling={0} enableNormalPass>
            <BrightnessContrast contrast={-0.15} brightness={-0.01} />
            <Autofocus />
          </EffectComposer>
        </Canvas>
      </motion.div>
    </div>
  )
}
