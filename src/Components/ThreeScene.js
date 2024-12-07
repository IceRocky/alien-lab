// ThreeScene.js
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = ({ cameraPosition = [0, 5, 10] }) => {
  // This will keep the camera within specified limits
  useFrame((state) => {
    const camera = state.camera;
    const minHeight = 5; // Minimum height for the camera
    const maxHeight = 10; // Maximum height for the camera
    const radius = 19; // Radius for the circular area

    // Add lerp factor for smooth movement
    const lerpFactor = 0.1;

    // Create target position
    const targetY = Math.max(minHeight, Math.min(maxHeight, camera.position.y));
    
    // Smoothly interpolate the camera height
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, lerpFactor);

    const x = camera.position.x;
    const z = camera.position.z;
    const distanceFromCenter = Math.sqrt(x * x + z * z);

    if (distanceFromCenter > radius) {
      const scale = radius / distanceFromCenter;
      // Smoothly interpolate the position
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, x * scale, lerpFactor);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, z * scale, lerpFactor);
    }
  });

  return (
    <>
      {/* Main reflective floor */}
      <Plane 
        args={[100, 100]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0.01, 0]}
      >
        <meshPhysicalMaterial 
          color="#44222F"
          metalness={0.8}
          roughness={0.05}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </Plane>

      {/* Additional subtle glow plane for more visibility */}
      <Plane 
        args={[100, 100]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
      >
        <meshBasicMaterial 
          color="#44222F"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Volumetric light effect */}
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[2, 0, 10, 32]} />
        <meshBasicMaterial
          transparent
          opacity={0.15}
          color="#44222F"
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default ThreeScene;
