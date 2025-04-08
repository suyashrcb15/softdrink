"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf");

const flavorTextures = {
    lemonLime: "/labels/lemon-lime.png",
    grape: "/labels/grape.png",
    blackCherry: "/labels/black-cherry.png",
    strawberryLemonade: "/labels/strawberry-lemonade.png",
    watermelon: "/labels/watermelon.png",
};



const metalMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 1,
    color: "#bbbbbb",
});

export type SodaCanProps = {
    flavor?: keyof typeof flavorTextures;
    scale?: number;
};

export function SodaCan({ flavor = "blackCherry", scale = 2, ...props }: SodaCanProps) {
    const { nodes } = useGLTF("/Soda-can.gltf");

    console.log("Flavor:", flavor);
    console.log("Texture Path:", flavorTextures[flavor]);

    // Load only the required texture
    const label = useTexture(flavorTextures[flavor]);
    label.flipY = false;

    return (
        <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.cylinder as THREE.Mesh).geometry}
                material={metalMaterial}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
            >
                <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Tab as THREE.Mesh).geometry}
                material={metalMaterial}
            />
        </group>
    );
}
