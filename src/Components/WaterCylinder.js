import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import *as THREE from 'three';

const WaterCylinder = () => {
  const cylinderRef = useRef();
  const waterRef = useRef();
  const bubbleRefs = useRef([...Array(50)].map(() => ({
    ref: React.createRef(),
    speed: Math.random() * 0.02 + 0.01,
    offset: Math.random() * Math.PI * 2
  })));

  useFrame((state) => {
    // Animate water material
    if (waterRef.current) {
      waterRef.current.material.opacity = 0.6 + Math.sin(state.clock.elapsedTime) * 0.1;
    }

    // Animate bubbles
    bubbleRefs.current.forEach((bubble, i) => {
      if (bubble.ref.current) {
        bubble.ref.current.position.y += bubble.speed;
        bubble.ref.current.position.x = Math.sin(state.clock.elapsedTime + bubble.offset) * 0.1;
        
        if (bubble.ref.current.position.y > 4) {
          bubble.ref.current.position.y = -4;
        }
      }
    });
  });

  return (
    <group position={[0, 2, 0]}>
      {/* Outer Glass Cylinder */}
      <mesh ref={cylinderRef}>
        <cylinderGeometry args={[1.8, 1.8, 10, 32]} />
        <meshPhysicalMaterial
          transparent
          transmission={0.95}
          thickness={0.5}
          roughness={0}
          color="#80ffff"
          opacity={0.3}
        />
      </mesh>

      {/* Water Column */}
      <mesh ref={waterRef}>
        <cylinderGeometry args={[1.3, 1.3, 9.8, 32]} />
        <meshPhysicalMaterial
          transparent
          transmission={0.6}
          thickness={0.5}
          roughness={0.2}
          color="#00ffff"
          opacity={0.5}
        />
      </mesh>

      {/* Specimen (alien) */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 2, 4, 8]} />
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
            Math.random() * 1 - 0.5,
            Math.random() * 8 - 4,
            Math.random() * 1 - 0.5
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00ffff"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

export default WaterCylinder;