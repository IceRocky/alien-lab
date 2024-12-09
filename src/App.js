import React, { useState, useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import Chamber from './Components/Chamber';
import Lab from './Components/Lab';
import ThreeScene from './Components/ThreeScene';
import CustomFirstPersonControls from './Components/CustomFirstPersonControls';
import GlassWithBubblesScene from './Components/GlassWithBubblesScene';
import WaterCylinder from './Components/WaterCylinder';
import Floor from './Components/Floor';
import { RectAreaLightEffect,  SceneLighting } from './Components/LightEffect';


// Extend Three.js with RectAreaLight
extend({ RectAreaLight: THREE.RectAreaLight });

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Calculate light positions in a circular pattern
  const lightPositions = [
    [22, 5.3, 4.83],    // Right (rotated 5 degrees clockwise around y-axis)
    // [16.31, 5, 14.86],   // Right-Front
    // [5.69, 5, 21.25],    // Front
    // [-5.69, 5, 21.25],   // Left-Front
    // [-16.31, 5, 14.86],  // Left
    // [-21.25, 5, 5.69],   // Left-Back
    // [-21.25, 5, -5.69],  // Back
    // [-16.31, 5, -14.86], // Back-Left
  ];

  // Add event listener to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <Canvas camera={{ position: [0, 3, 20], fov: 50 }}>
        <SceneLighting/>
        {lightPositions.map((position, index) => (
          <RectAreaLightEffect 
            key={index}
            position={position}
            color="#FF063D"
          />
        ))}
        <Chamber />
        <Lab />
        <ThreeScene />
        <WaterCylinder />
        <Floor />
        {/* Conditionally render controls based on screen width */}
        {isMobile ? (
          <OrbitControls
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={30}
          />
        ) : (
          <>
            <CustomFirstPersonControls />
            <PointerLockControls />
          </>
        )}
      </Canvas>
    </div>
  );
}
