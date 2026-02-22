import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { accentColor, theme } = useTheme();
  
  // Map accent colors to hex values for Three.js
  const colorMap: Record<string, string> = {
    'crimson': '#8b0000',
    'gold': '#d4af37',
    'neon-blue': '#00f3ff',
    'neon-pink': '#ff00ff',
    'monochrome': theme === 'minimal' ? '#111111' : '#888888',
  };

  const currentColor = colorMap[accentColor] || '#8b0000';

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color={currentColor}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  );
};

const FloatingParticles = () => {
  const { theme } = useTheme();
  const isMinimal = theme === 'minimal';
  
  if (isMinimal) return null;

  return (
    <Stars 
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0} 
      fade 
      speed={1} 
    />
  );
};

export const HeroScene: React.FC = () => {
  const { theme } = useTheme();
  const isMinimal = theme === 'minimal';

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={isMinimal ? 1 : 0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        <AnimatedSphere />
        <FloatingParticles />
        
        <Environment preset={isMinimal ? "studio" : "city"} />
      </Canvas>
    </div>
  );
};
