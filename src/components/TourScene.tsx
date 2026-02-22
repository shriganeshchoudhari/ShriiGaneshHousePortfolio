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

const AnimatedAboutText = ({ color }: { color: string }) => {
  const textRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (textRef.current) {
      textRef.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <Text ref={textRef} position={[0, 2, -1.8]} fontSize={0.5} color={color} anchorX="center" anchorY="middle">
      ABOUT ME
    </Text>
  );
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
        <AnimatedAboutText color={currentColor} />
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
  const { theme, activeSection, accentColor } = useTheme();
  const isMinimal = theme === 'minimal';

  useEffect(() => {
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-amp-strings-10711.mp3');
    audio.loop = true;
    audio.volume = 0.2;
    
    const playAudio = () => {
      audio.play().catch(e => console.log("Audio autoplay blocked", e));
      document.removeEventListener('click', playAudio);
    };
    
    document.addEventListener('click', playAudio);
    
    return () => {
      audio.pause();
      document.removeEventListener('click', playAudio);
    };
  }, []);

  const colorMap: Record<string, string> = {
    'crimson': '#8b0000',
    'gold': '#d4af37',
    'neon-blue': '#00f3ff',
    'neon-pink': '#ff00ff',
    'monochrome': theme === 'minimal' ? '#111111' : '#888888',
  };
  const currentColor = colorMap[accentColor] || '#8b0000';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 5, 15], fov: 45 }}>
        <color attach="background" args={[isMinimal ? '#fafafa' : '#050505']} />
        <fog attach="fog" args={[isMinimal ? '#fafafa' : '#050505', 10, 40]} />
        
        <ambientLight intensity={isMinimal ? 0.4 : 0.1} />
        <directionalLight 
          position={[15, 20, 10]} 
          intensity={isMinimal ? 2 : 3} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-15, 10, -10]} intensity={isMinimal ? 1 : 0.5} color={currentColor} />
        <pointLight position={[0, 5, 0]} intensity={isMinimal ? 1 : 2} color={currentColor} distance={20} />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <Sphere args={[15, 64, 64]} position={[0, 5, -30]}>
            <MeshDistortMaterial
              color={currentColor}
              transparent
              opacity={0.15}
              distort={0.3}
              speed={1}
              roughness={0.5}
            />
          </Sphere>
        </Float>

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
