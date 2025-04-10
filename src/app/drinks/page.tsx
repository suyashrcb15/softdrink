"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import gsap from "gsap";
import { useRouter } from "next/navigation"; // Ensure this import is correct

const o = new THREE.Object3D();

function Bubbles({ count = 300, speed = 5, bubbleSize = 0.05, opacity = 0.3, repeat = true }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const bubbleSpeed = useRef(new Float32Array(count));
    const minSpeed = speed * 0.001;
    const maxSpeed = speed * 0.005;

    useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;

        for (let i = 0; i < count; i++) {
            o.position.set(
                gsap.utils.random(-4, 4),
                gsap.utils.random(-4, 4),
                gsap.utils.random(-4, 4)
            );
            o.updateMatrix();
            mesh.setMatrixAt(i, o.matrix);
            bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
        }

        mesh.instanceMatrix.needsUpdate = true;

        return () => {
            mesh.geometry.dispose();
            (mesh.material as THREE.Material).dispose();
        };
    }, [count]);

    useFrame(() => {
        const mesh = meshRef.current;
        if (!mesh) return;

        for (let i = 0; i < count; i++) {
            mesh.getMatrixAt(i, o.matrix);
            o.position.setFromMatrixPosition(o.matrix);
            o.position.y += bubbleSpeed.current[i];

            if (o.position.y > 4 && repeat) {
                o.position.y = -4;
                o.position.x = gsap.utils.random(-4, 4);
                o.position.z = gsap.utils.random(-4, 4);
            }

            o.updateMatrix();
            mesh.setMatrixAt(i, o.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[bubbleSize, 16, 16]} />
            <meshStandardMaterial transparent opacity={opacity} color="#ffffff" />
        </instancedMesh>
    );
}

export default function DrinkPage() {
    const [drinks, setDrinks] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDrink, setSelectedDrink] = useState<any | null>(null);
    const router = useRouter();  // Ensure this is the correct hook

    const colors = [
        "bg-red-100",
        "bg-green-100",
        "bg-blue-100",
        "bg-yellow-100",
        "bg-purple-100",
        "bg-pink-100",
        "bg-indigo-100",
        "bg-orange-100",
    ];

    useEffect(() => {
        fetchDrinks();
        document.body.style.backgroundColor = "#FEF08A";
    }, []);

    const fetchDrinks = async () => {
        try {
            const res = await fetch("/dummy.json");
            const data = await res.json();
            setDrinks(data);
        } catch (error) {
            console.error("Failed to load drinks:", error);
        }
    };

    // Close modal function and navigate to home page
    const closeModal = () => {
        setSelectedDrink(null); // Reset the selected drink state
        router.push("/");  // Redirect to the home page
    };

    return (
        <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-50">
            <div className="fixed inset-0 -z-10">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} />
                    <Bubbles />
                    <OrbitControls enableZoom={false} enableRotate={false} />
                </Canvas>
            </div>

            <motion.div className="relative z-10 p-6">
                <motion.h1
                    className="text-5xl font-extrabold text-center text-yellow-800 mb-14 mt-14 drop-shadow-md"
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    🥤 All Drinks Library
                </motion.h1>

                <div className="mb-10 flex justify-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search drink by name..."
                        className="w-full max-w-md px-4 py-2 border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-gray-800"
                    />
                </div>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {drinks.map((drink, index) => {
                        const isVisible = drink.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) && selectedDrink === null;

                        return (
                            <motion.div
                                key={drink.id}
                                className={`p-5 rounded-xl shadow-lg transform transition-all duration-500 ${colors[index % colors.length]}`}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{
                                    opacity: isVisible ? 1 : 0,
                                    scale: isVisible ? 1 : 0.9,
                                    y: isVisible ? 0 : 20,
                                    pointerEvents: isVisible ? "auto" : "none",
                                }}
                                transition={{ duration: 0.4, delay: index * 0.03 }}
                                whileHover={{ rotate: 1 }}
                            >
                                <h2 className="text-2xl font-bold mb-2 text-gray-800">{drink.name}</h2>
                                <p className="text-sm italic mb-2 text-gray-700">{drink.description}</p>
                                <p className="text-gray-900">
                                    <strong>Ingredients:</strong> {drink.ingredients?.join(", ")}
                                </p>
                                <button
                                    onClick={() => setSelectedDrink(drink)}
                                    className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md shadow"
                                >
                                    View Details
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {drinks.filter((drink) => drink.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <p className="text-center text-gray-500 mt-10">No drinks found.</p>
                )}
            </motion.div>

            {/* Modal for Drink Details */}
            {selectedDrink && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-3xl font-bold mb-4 text-center">{selectedDrink.name} Details</h2>
                        <p className="text-lg mb-4">{selectedDrink.description}</p>
                        <p className="text-lg mb-4">
                            <strong>Ingredients:</strong> {selectedDrink.ingredients?.join(", ")}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
