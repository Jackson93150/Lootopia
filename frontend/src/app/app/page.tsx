"use client";

import dynamic from 'next/dynamic';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, PerformanceMonitor} from '@react-three/drei';
import {useRef, useState} from "react";
import Earth from "@/components/3D/earth";
import {Bloom, BrightnessContrast, DepthOfField, EffectComposer, Noise} from "@react-three/postprocessing";
import { BlendFunction } from 'postprocessing';
import StylishButton from "@/components/ui/StylishButton";

// Import dynamique pour désactiver le SSR (obligatoire avec WebGL)
export default function AppPage() {
    const earthRef = useRef(null)
    const [dpr, setDpr] = useState(1);
    return (
        <div className="bg-gradient-to-t from-[#4DA6FF] via-[#69BDF2] to-[#B3E5FC] relative w-screen h-screen">

            <div className="absolute top-50 left-6 z-10">
            <StylishButton
                variant="bag"
                onClick={() => console.log("clicked")}
            />
        </div>
    <Canvas
        gl={{
            powerPreference: 'high-performance',
        }}
        camera={{position: [0, 0, 5], fov: 40}}>
        <PerformanceMonitor onDecline={() => setDpr(0.5)}>
        <ambientLight intensity={0.5}/>
                    <directionalLight position={[50, 50, 15]} intensity={7}/>
                    <Earth earthRef={earthRef}/>
                    <OrbitControls enableRotate={false} enableZoom={false} enablePan={false}/>
                    <EffectComposer multisampling={0} enableNormalPass>
                        <BrightnessContrast contrast={-0.25}/>
                    </EffectComposer>
                </PerformanceMonitor>
            </Canvas>
        </div>
    );
}
