"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const prefersReduced = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const sonarRef = useRef<THREE.Mesh>(null!);
  const sonarOpacityRef = useRef(0);

  // Particle assembly on mount
  const particlesRef = useRef<THREE.Points>(null!);
  const assembledRef = useRef(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const geometry = useMemo(
    () => new THREE.IcosahedronGeometry(1.8, 4),
    []
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F5A623"),
        metalness: 0.9,
        roughness: 0.1,
        wireframe: false,
        emissive: new THREE.Color("#FF8C00"),
        emissiveIntensity: 0.08,
      }),
    []
  );

  const sonarGeometry = useMemo(() => new THREE.RingGeometry(1.8, 2.1, 64), []);
  const sonarMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#F5A623"),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (prefersReduced) return;
    const t = clock.elapsedTime;
    timeRef.current = t;

    if (!groupRef.current || !meshRef.current) return;

    // Slow Y rotation base
    const baseSpeed = 0.007;
    const dist = Math.sqrt(mouseRef.current.x ** 2 + mouseRef.current.y ** 2);
    const speedBoost = Math.min(dist * 0.05, 0.03);
    meshRef.current.rotation.y += baseSpeed + speedBoost;
    meshRef.current.rotation.x += 0.002;

    // Mouse parallax on group
    groupRef.current.rotation.y += (mouseRef.current.x * 0.1 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-mouseRef.current.y * 0.08 - groupRef.current.rotation.x) * 0.04;

    // Sonar ping every 4 seconds
    const pingPhase = t % 4;
    if (pingPhase < 1.5 && sonarRef.current) {
      const progress = pingPhase / 1.5;
      const scale = 1 + progress * 2;
      sonarRef.current.scale.setScalar(scale);
      (sonarRef.current.material as THREE.MeshBasicMaterial).opacity =
        (1 - progress) * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        position={[0, 0, 0]}
      />
      {/* Sonar ring */}
      <mesh ref={sonarRef} geometry={sonarGeometry} material={sonarMaterial} />
      {/* Edge glow */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#F5A623"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </group>
  );
}

export default function HeroSphere() {
  return (
    <div
      aria-hidden="true"
      data-cursor="canvas"
      style={{
        position: "absolute",
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "min(45vw, 520px)",
        height: "min(45vw, 520px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} color="#F5F0E8" />
        <pointLight position={[5, 5, 5]} color="#F5A623" intensity={3} />
        <pointLight position={[-5, -3, 3]} color="#9D00FF" intensity={1.5} />
        <pointLight position={[0, -5, 2]} color="#FF2D78" intensity={0.8} />
        <Sphere />
      </Canvas>
    </div>
  );
}
