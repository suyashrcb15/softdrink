"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Bubbles } from "@/slices/Hero/Bubbles";

export default function AboutPage() {
    const router = useRouter();

    useEffect(() => {
        document.body.style.backgroundColor = "#FEF08A"; // light yellow
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Bubbles Canvas Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="w-full h-full">
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Suspense fallback={null}>
                        <Bubbles count={300} speed={2} repeat={true} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 py-16 text-gray-800">
                <h1 className="text-5xl font-extrabold text-orange-600 mb-6 drop-shadow-md fade-in">
                    About SoftDrink
                </h1>
                <p className="text-xl max-w-2xl mb-6 fade-in">
                    Welcome to <span className="font-semibold text-orange-700">SoftDrink</span> – your ultimate guide to discovering and learning about your favorite drinks!
                </p>
                <div className="max-w-3xl text-lg leading-relaxed fade-in space-y-4 mb-8">
                    <p>
                        This is a sample website created with the goal of helping users explore and learn more about a variety of beverages – from classic sodas and mocktails to exotic and trending drinks.
                    </p>
                    <p>
                        Whether you're a casual drink lover, a party planner, or just curious about what's trending, SoftDrink is your go-to companion to find, review, and get inspired by the world of drinks.
                    </p>
                    <p>
                        Behind SoftDrink is a passionate team who loves experimenting with flavors and sharing their discoveries. We're mixing creativity with refreshment – just like your favorite drink!
                    </p>
                </div>

                {/* Button with CSS Animation */}
                <button
                    onClick={() => router.push("/drinks")}
                    className="bg-orange-600 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition-transform duration-300 button-animate"
                >
                    Know Your Drink
                </button>
            </div>

            {/* CSS Animations */}
            <style>{`
                .fade-in {
                    opacity: 0;
                    animation: fadeIn 1.5s ease-out forwards;
                }

                .button-animate {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.8);
                    animation: slideIn 1s ease-out forwards;
                }

                @keyframes fadeIn {
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideIn {
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}


