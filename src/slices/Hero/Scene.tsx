"use client";

import { useRef } from "react";
import { Environment, OrbitControls, View } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingCan from "@/components/FloatingCan";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Bubbles } from "./Bubbles"; // Ensure you have a Bubbles component that handles the bubbles

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

export default function Scene({}: Props) {
    const isReady = useStore((state) => state.isReady);
    const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen

    const can1Ref = useRef<Group>(null);
    const can2Ref = useRef<Group>(null);
    const can3Ref = useRef<Group>(null);
    const can4Ref = useRef<Group>(null);
    const can5Ref = useRef<Group>(null);

    const can1GroupRef = useRef<Group>(null);
    const can2GroupRef = useRef<Group>(null);

    const groupRef = useRef<Group>(null);

    const FLOAT_SPEED = 1.5;

    useGSAP(() => {
        if (
            !can1Ref.current ||
            !can2Ref.current ||
            !can3Ref.current ||
            !can4Ref.current ||
            !can5Ref.current ||
            !can1GroupRef.current ||
            !can2GroupRef.current ||
            !groupRef.current
        )
            return;

        isReady();

        // Set can starting location
        gsap.set(can1Ref.current.position, { x: -1.5 });
        gsap.set(can1Ref.current.rotation, { z: -0.5 });

        gsap.set(can2Ref.current.position, { x: 1.5 });
        gsap.set(can2Ref.current.rotation, { z: 0.5 });

        gsap.set(can3Ref.current.position, { y: 5, z: 2 });
        gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
        gsap.set(can5Ref.current.position, { y: -5 });

        const introTl = gsap.timeline({
            defaults: {
                duration: 3,
                ease: "back.out(1.4)",
            },
        });

        if (window.scrollY < 20) {
            introTl
                .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
                .from(can1GroupRef.current.rotation, { z: 3 }, 0)
                .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
                .from(can2GroupRef.current.rotation, { z: 3 }, 0);
        }

        const scrollTl = gsap.timeline({
            defaults: {
                duration: 2,
            },
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            },
        });

        scrollTl
            .to(groupRef.current.rotation, { y: Math.PI * 2 }) // Rotate can group
            .to(can1Ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
            .to(can1Ref.current.rotation, { z: 0.3 }, 0)
            .to(can2Ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
            .to(can2Ref.current.rotation, { z: 0 }, 0)
            .to(can3Ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
            .to(can3Ref.current.rotation, { z: -0.1 }, 0)
            .to(can4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
            .to(can4Ref.current.rotation, { z: 0.3 }, 0)
            .to(can5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
            .to(can5Ref.current.rotation, { z: -0.25 }, 0)
            .to(groupRef.current.position, { x: 1, duration: 3, ease: "sine.inOut" }, 1.3);
    });

    return (
        <>
            <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
                <Scene />
                <Bubbles count={300} speed={2} repeat={true} />
            </View>

            {/* Mobile view */}
            {isMobile && (
                <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] h-screen w-screen">
                    <Scene />
                    <Bubbles count={50} speed={1} repeat={true} />
                </View>
            )}

            {/* Floating cans */}
            <group ref={groupRef}>
                <group ref={can1GroupRef}>
                    <FloatingCan
                        ref={can1Ref}
                        flavor="blackCherry"
                        floatSpeed={FLOAT_SPEED}
                    />
                </group>
                <group ref={can2GroupRef}>
                    <FloatingCan
                        ref={can2Ref}
                        flavor="lemonLime"
                        floatSpeed={FLOAT_SPEED}
                    />
                </group>

                <FloatingCan ref={can3Ref} flavor="grape" floatSpeed={FLOAT_SPEED} />

                <FloatingCan
                    ref={can4Ref}
                    flavor="strawberryLemonade"
                    floatSpeed={FLOAT_SPEED}
                />

                <FloatingCan ref={can5Ref} flavor="watermelon" floatSpeed={FLOAT_SPEED} />
            </group>

            <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
        </>
    );
}
