'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function BlackHoleModel() {
  const accretionDiskRef = useRef<THREE.Mesh>(null);
  const outerDiskRef = useRef<THREE.Mesh>(null);

  // Custom shader for the accretion disk to give it a turbulent, fiery look
  const accretionMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#f59e0b') }, // Amber
        color2: { value: new THREE.Color('#c4913a') }, // Dust
        color3: { value: new THREE.Color('#93c5fd') }, // Blue-white hints
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Simple 2D noise
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          // Circular gradient
          float dist = length(vPosition.xy);
          float angle = atan(vPosition.y, vPosition.x);
          
          // Noise and turbulence
          float noise = random(vUv * 10.0 + vec2(time * 0.1, 0.0));
          float wave = sin(angle * 10.0 - time * 2.0) * 0.5 + 0.5;
          
          // Mix colors based on distance and angle
          vec3 finalColor = mix(color1, color2, wave);
          if (noise > 0.8) {
            finalColor = mix(finalColor, color3, 0.5);
          }
          
          // Fade edges more aggressively
          float alpha = smoothstep(3.5, 2.5, dist) * smoothstep(1.5, 2.0, dist);
          
          // Boost alpha for the core ring
          alpha *= 1.5;
          
          gl_FragColor = vec4(finalColor * 2.0, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z = -time * 0.2;
      (accretionDiskRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;
    }
    if (outerDiskRef.current) {
      outerDiskRef.current.rotation.z = -time * 0.1;
    }
  });

  return (
    // Position the black hole slightly to the right to balance the text on the left
    <group position={[3, 0, -2]} rotation={[Math.PI / 3, 0, 0]}>
      {/* Event Horizon */}
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#000000" />
      </Sphere>

      {/* Inner Accretion Disk */}
      <Torus ref={accretionDiskRef} args={[3.2, 0.8, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={accretionMaterial} attach="material" />
      </Torus>

      {/* Outer faint disk */}
      <Torus ref={outerDiskRef} args={[4.5, 0.4, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial 
          color="#f59e0b" 
          transparent 
          opacity={0.08} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Torus>
    </group>
  );
}

export default function BlackHole3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        
        <BlackHoleModel />
        
        {/* We use OrbitControls to allow subtle panning but restrict heavy movement */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 2 - 0.1}
          maxAzimuthAngle={0.1}
          minAzimuthAngle={-0.1}
        />
        {/* Removed EffectComposer because it was causing alpha rendering issues (solid yellow box) 
            Instead, we boosted the brightness and opacity of the custom shader directly. */}
      </Canvas>
    </div>
  );
}
