'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';

// Define the exact data structure we used previously, plus specific colors for 3D
const NODES = [
  { id: 'core', label: 'Backend Engineer', type: 'center', color: '#f59e0b', val: 5 },
  
  // Categories
  { id: 'lang', label: 'Languages', type: 'category', color: '#93c5fd', val: 3 },
  { id: 'cloud', label: 'Cloud & Infra', type: 'category', color: '#93c5fd', val: 3 },
  { id: 'ai', label: 'AI / ML', type: 'category', color: '#93c5fd', val: 3 },
  { id: 'data', label: 'Databases', type: 'category', color: '#93c5fd', val: 3 },

  // Languages
  { id: 'java', label: 'Java', type: 'skill', parent: 'lang', color: '#a8c8ff', val: 1.5 },
  { id: 'go', label: 'Go', type: 'skill', parent: 'lang', color: '#a8c8ff', val: 1.5 },
  { id: 'python', label: 'Python', type: 'skill', parent: 'lang', color: '#a8c8ff', val: 1.5 },
  { id: 'ts', label: 'TypeScript', type: 'skill', parent: 'lang', color: '#a8c8ff', val: 1.5 },

  // Cloud
  { id: 'aws', label: 'AWS', type: 'skill', parent: 'cloud', color: '#a8c8ff', val: 1.5 },
  { id: 'gcp', label: 'GCP', type: 'skill', parent: 'cloud', color: '#a8c8ff', val: 1.5 },
  { id: 'k8s', label: 'Kubernetes', type: 'skill', parent: 'cloud', color: '#a8c8ff', val: 1.5 },
  { id: 'docker', label: 'Docker', type: 'skill', parent: 'cloud', color: '#a8c8ff', val: 1.5 },

  // AI
  { id: 'langchain', label: 'LangChain4j', type: 'skill', parent: 'ai', color: '#a8c8ff', val: 1.5 },
  { id: 'pytorch', label: 'PyTorch', type: 'skill', parent: 'ai', color: '#a8c8ff', val: 1.5 },
  { id: 'ray', label: 'Ray Serve', type: 'skill', parent: 'ai', color: '#a8c8ff', val: 1.5 },

  // Data
  { id: 'pg', label: 'PostgreSQL', type: 'skill', parent: 'data', color: '#a8c8ff', val: 1.5 },
  { id: 'redis', label: 'Redis', type: 'skill', parent: 'data', color: '#a8c8ff', val: 1.5 },
  { id: 'kafka', label: 'Kafka', type: 'skill', parent: 'data', color: '#a8c8ff', val: 1.5 },
  { id: 'chroma', label: 'ChromaDB', type: 'skill', parent: 'data', color: '#a8c8ff', val: 1.5 },
];

const EDGES = [
  // Core to categories
  { source: 'core', target: 'lang' },
  { source: 'core', target: 'cloud' },
  { source: 'core', target: 'ai' },
  { source: 'core', target: 'data' },
  
  // Langs
  { source: 'lang', target: 'java' },
  { source: 'lang', target: 'go' },
  { source: 'lang', target: 'python' },
  { source: 'lang', target: 'ts' },

  // Cloud
  { source: 'cloud', target: 'aws' },
  { source: 'cloud', target: 'gcp' },
  { source: 'cloud', target: 'k8s' },
  { source: 'cloud', target: 'docker' },

  // AI
  { source: 'ai', target: 'langchain' },
  { source: 'ai', target: 'pytorch' },
  { source: 'ai', target: 'ray' },

  // Data
  { source: 'data', target: 'pg' },
  { source: 'data', target: 'redis' },
  { source: 'data', target: 'kafka' },
  { source: 'data', target: 'chroma' },
];

export default function SkillsGraph() {
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  const graphData = useMemo(() => {
    return { nodes: NODES, links: EDGES };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.cameraPosition({ x: 0, y: 0, z: 250 });
        const controls = fgRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.0;
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-crosshair">
      <ForceGraph3D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeColor={(node: any) => node.color}
        nodeVal={(node: any) => node.val}
        nodeResolution={32}
        linkColor={() => 'rgba(168, 200, 255, 0.2)'}
        linkWidth={1.5}
        linkOpacity={0.3}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleColor={() => '#c4913a'}
        backgroundColor="rgba(0,0,0,0)" // Transparent to see global background
        showNavInfo={false}
        nodeLabel={(node: any) => node.label}
        nodeThreeObject={(node: any) => {
          // Custom node representation: a glowing sphere + text label
          const group = new THREE.Group();
          
          // Core node gets a special glowing aura
          if (node.type === 'center') {
            const auraGeometry = new THREE.SphereGeometry(node.val * 1.5, 32, 32);
            const auraMaterial = new THREE.MeshBasicMaterial({ 
              color: node.color, 
              transparent: true, 
              opacity: 0.15,
              blending: THREE.AdditiveBlending 
            });
            group.add(new THREE.Mesh(auraGeometry, auraMaterial));
          }

          // Main sphere
          const geometry = new THREE.SphereGeometry(node.val, 32, 32);
          const material = new THREE.MeshPhongMaterial({ 
            color: node.color,
            emissive: node.color,
            emissiveIntensity: node.type === 'center' ? 0.8 : 0.2
          });
          group.add(new THREE.Mesh(geometry, material));

          // Text Label
          if (node.label) {
            const sprite = new SpriteText(node.label);
            sprite.textHeight = node.type === 'center' ? 5 : 3;
            // Shift the text further below the node
            sprite.position.y = -(node.val + (node.type === 'center' ? 8 : 5));
            
            // Adjust colors and add a background pill for maximum clarity
            sprite.color = node.type === 'center' ? '#fcd34d' : '#ffffff';
            sprite.backgroundColor = 'rgba(10, 10, 15, 0.8)';
            sprite.padding = 2;
            sprite.borderRadius = 4;
            
            // Ensure the text is drawn on top of everything else
            sprite.material.depthWrite = false;
            sprite.material.depthTest = false;
            sprite.renderOrder = 999;
            
            group.add(sprite);
          }

          return group;
        }}
      />
      {/* HUD overlay for instructions */}
      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm border border-white/10 p-3 rounded text-[10px] text-[var(--ghost)] font-mono uppercase">
        <p>Drag to rotate</p>
        <p>Scroll to zoom</p>
      </div>
    </div>
  );
}
