import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const GlassWithBubbles = () => {
  const groupRef = useRef();
  const bubblesRef = useRef([]);

  // Create bubbles at initialization
  useEffect(() => {
    const bubbles = [];
    for (let i = 0; i < 50; i++) {
      bubbles.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 1.8, // Random X within the glass
          Math.random() * 1.9 - 0.95, // Random Y within the water
          (Math.random() - 0.5) * 1.8 // Random Z within the glass
        ),
      });
    }
    bubblesRef.current = bubbles;
  }, []);

  // Animate bubbles to move upwards
  useFrame(() => {
    bubblesRef.current.forEach((bubble) => {
      bubble.position.y += 0.02; // Move upward
      if (bubble.position.y > 0.95) {
        bubble.position.y = -0.95; // Reset to bottom
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Glass */}
      <mesh>
        <cylinderGeometry args={[1, 1, 2, 64]} />
        <meshPhysicalMaterial
          color={0xffffff}
          transparent={true}
          opacity={0.5}
          transmission={0.9}
          thickness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* Water */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 1.9, 64]} />
        <meshPhysicalMaterial
          color={0xffeefa}
          transparent={true}
          opacity={0.7}
          transmission={0.9}
          roughness={0.8}
        />
      </mesh>

      {/* Bubbles */}
      {bubblesRef.current.map((bubble, index) => (
        <mesh key={index} position={bubble.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshPhysicalMaterial color={0xffffff} />
        </mesh>
      ))}
    </group>
  );
};

export default GlassWithBubbles;
