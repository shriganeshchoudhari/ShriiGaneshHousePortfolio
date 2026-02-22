import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sphere, Stars, Box, Plane, Text } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import { useTheme, Section } from '../context/ThemeContext';

const CameraController = ({ activeSection }: { activeSection: Section }) => {
  const { camera } = useThree();
  
  const positions: Record<Section, THREE.Vector3> = {
    hero: new THREE.Vector3(0, 5, 15),
    about: new THREE.Vector3(-10, 2, 5),
    projects: new THREE.Vector3(10, 2, 5),
    contact: new THREE.Vector3(0, 2, -10),
  };

  const targets: Record<Section, THREE.Vector3> = {
    hero: new THREE.Vector3(0, 0, 0),
    about: new THREE.Vector3(-10, 1, 0),
    projects: new THREE.Vector3(10, 1, 0),
    contact: new THREE.Vector3(0, 1, -15),
  };

  const currentTarget = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // Smoothly interpolate camera position
    easing.damp3(state.camera.position, positions[activeSection], 0.4, delta);
    
    // Smoothly interpolate lookAt target
    easing.damp3(currentTarget.current, targets[activeSection], 0.4, delta);
    state.camera.lookAt(currentTarget.current);
  });

  return null;
};

const AbstractHouse = () => {
  const { accentColor, theme } = useTheme();
  
  const colorMap: Record<string, string> = {
    'crimson': '#8b0000',
    'gold': '#d4af37',
    'neon-blue': '#00f3ff',
    'neon-pink': '#ff00ff',
    'monochrome': theme === 'minimal' ? '#111111' : '#888888',
  };

  const currentColor = colorMap[accentColor] || '#8b0000';
  const wallColor = theme === 'minimal' ? '#ffffff' : '#111111';
  const floorColor = theme === 'minimal' ? '#f0f0f0' : '#050505';

  return (
    <group>
      {/* Floor */}
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <meshStandardMaterial color={floorColor} roughness={0.8} metalness={0.2} />
      </Plane>

      {/* Central Hub (Hero) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, 64, 64]} position={[0, 2, 0]} castShadow>
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

      {/* About Room (Left) */}
      <group position={[-10, 0, 0]}>
        <Box args={[4, 3, 0.2]} position={[0, 1.5, -2]} castShadow receiveShadow>
          <meshStandardMaterial color={wallColor} />
        </Box>
        <Text position={[0, 2, -1.8]} fontSize={0.5} color={currentColor} anchorX="center" anchorY="middle">
          ABOUT ME
        </Text>
        <Box args={[2, 1, 1]} position={[0, 0.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={currentColor} roughness={0.5} metalness={0.5} />
        </Box>
      </group>

      {/* Projects Room (Right) */}
      <group position={[10, 0, 0]}>
        <Box args={[6, 4, 0.2]} position={[0, 2, -2]} castShadow receiveShadow>
          <meshStandardMaterial color={wallColor} />
        </Box>
        <Text position={[0, 3, -1.8]} fontSize={0.5} color={currentColor} anchorX="center" anchorY="middle">
          PROJECTS
        </Text>
        {/* Gallery frames */}
        <Box args={[1.5, 1, 0.1]} position={[-1.5, 1.5, -1.8]} castShadow>
          <meshStandardMaterial color="#333" />
        </Box>
        <Box args={[1.5, 1, 0.1]} position={[1.5, 1.5, -1.8]} castShadow>
          <meshStandardMaterial color="#333" />
        </Box>
      </group>

      {/* Contact Room (Back) */}
      <group position={[0, 0, -15]}>
        <Box args={[4, 4, 0.2]} position={[0, 2, -2]} castShadow receiveShadow>
          <meshStandardMaterial color={wallColor} />
        </Box>
        <Text position={[0, 3, -1.8]} fontSize={0.5} color={currentColor} anchorX="center" anchorY="middle">
          CONTACT
        </Text>
        <Box args={[1, 2, 1]} position={[0, 1, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={currentColor} />
        </Box>
      </group>
    </group>
  );
};

export const TourScene: React.FC = () => {
  const { theme, activeSection } = useTheme();
  const isMinimal = theme === 'minimal';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 5, 15], fov: 45 }}>
        <color attach="background" args={[isMinimal ? '#fafafa' : '#050505']} />
        <fog attach="fog" args={[isMinimal ? '#fafafa' : '#050505', 10, 40]} />
        
        <ambientLight intensity={isMinimal ? 0.8 : 0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        
        <AbstractHouse />
        
        {!isMinimal && (
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        )}
        
        <Environment preset={isMinimal ? "studio" : "city"} />
        <CameraController activeSection={activeSection} />
      </Canvas>
    </div>
  );
};
