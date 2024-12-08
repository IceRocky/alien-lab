import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import *as THREE from 'three';

const WaterCylinder = () => {
  const cylinderRef = useRef();
  const waterRef = useRef();
  const bubbleRefs = useRef([...Array(15)].map(() => ({
    ref: React.createRef(),
    speed: Math.random() * 0.01 + 0.005,
    offset: Math.random() * Math.PI * 2,
    scale: Math.random() * 0.15 + 0.05
  })));

  useFrame((state) => {
    // Animate water material
    if (waterRef.current) {
      waterRef.current.material.opacity = 0.6 + Math.sin(state.clock.elapsedTime) * 0.1;
    }

    // More realistic bubble animation
    bubbleRefs.current.forEach((bubble, i) => {
      if (bubble.ref.current) {
        bubble.ref.current.position.y += bubble.speed;
        // Smaller, more gentle wobble
        bubble.ref.current.position.x += Math.sin(state.clock.elapsedTime * 0.5 + bubble.offset) * 0.003;
        bubble.ref.current.position.z += Math.cos(state.clock.elapsedTime * 0.5 + bubble.offset) * 0.003;
        
        // Reset bubbles lower and at random horizontal positions
        if (bubble.ref.current.position.y > 4) {
          bubble.ref.current.position.y = -4;
          bubble.ref.current.position.x = (Math.random() - 0.5) * 1.5;
          bubble.ref.current.position.z = (Math.random() - 0.5) * 1.5;
        }
      }
    });
  });

  return (
    <group position={[0, 5, 0]}>
      {/* Outer Glass Cylinder */}
      <mesh ref={cylinderRef}>
        <cylinderGeometry args={[2.65, 2.65, 6.7, 32]} />
        <meshPhysicalMaterial
          transparent
          transmission={0.95}
          thickness={0.5}
          roughness={0}
          color="#80ffff"
          opacity={0.5}
        />
      </mesh>

      {/* Water Column */}
      <mesh ref={waterRef}>
        <cylinderGeometry args={[2.6, 2.6, 6.7, 32]} />
        <meshPhysicalMaterial
          transparent
          transmission={0.9}
          thickness={0.5}
          roughness={0.2}
          color="#00ffff"
          opacity={0.1}
        />
      </mesh>

      {/* Specimen (alien) */}
      <mesh position={[0, 1, 0]}>
        <capsuleGeometry args={[0.5, 1, 8, 8]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#00ffff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Bubbles */}
      {bubbleRefs.current.map((bubble, i) => (
        <mesh
          key={i}
          ref={bubble.ref}
          position={[
            (Math.random() - 0.5) * 1.5,
            Math.random() * -4,
            (Math.random() - 0.5) * 1.5
          ]}
          scale={bubble.scale}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshPhysicalMaterial
            color="#ffffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.2}
            roughness={0}
            metalness={0.2}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={0.9}
            ior={1.3}
          />
        </mesh>
      ))}
    </group>
  );
};

export default WaterCylinder;