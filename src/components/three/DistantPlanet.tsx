"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function PlanetSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const prefersReduced = useReducedMotion();

  useFrame(() => {
    if (prefersReduced || !meshRef.current) return;
    meshRef.current.rotation.y += 0.0001; // extremely slow
  });

  return (
    <>
      {/* DirectionalLight from upper-left */}
      <directionalLight color="#A8C8FF" intensity={0.6} position={[-5, 5, 5]} />
      
      <mesh ref={meshRef}>
        {/* Radius 1, 64x64 segments for perfect smoothness */}
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#1A1A3E"
          emissive="#2D1B69"
          emissiveIntensity={0.15}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
    </>
  );
}

export default function DistantPlanet() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "-20px", // Upper right
        right: "-24px", // 40% cropped by right edge (assuming 60px size)
        width: "60px",
        height: "60px",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.8, // subtle
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <PlanetSphere />
      </Canvas>
    </div>
  );
}
