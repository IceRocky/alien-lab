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

// Extend Three.js with RectAreaLight
extend({ RectAreaLight: THREE.RectAreaLight });

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
        <ambientLight intensity={1.0} />
        <directionalLight 
          position={[0, 20, 0]} 
          intensity={1.5}
          castShadow
        />
        <spotLight
          position={[0, 15, 0]}
          angle={0.8}
          penumbra={1}
          intensity={3}
          color="#00ffff"
          distance={50}
        />
         <rectAreaLight 
          position={[10, 5, 0]}  // East position
          width={3}              // Width of the vertical band
          height={20}            // Height of the vertical band
          intensity={15} 
          color="#ff0000" 
          rotation={[0, -Math.PI / 2, 0]}  // Rotated to stand vertical
        />
        <rectAreaLight 
          position={[-10, 5, 0]}  // West position
          width={3}              
          height={20}             
          intensity={15} 
          color="#ff0000" 
          rotation={[0, Math.PI / 2, 0]} 
        />
        <rectAreaLight 
          position={[0, 5, 10]}  // North position
          width={3}             
          height={20}            
          intensity={15} 
          color="#ff0000" 
          rotation={[0, Math.PI, 0]} 
        />
        <rectAreaLight 
          position={[0, 5, -10]}  // South position
          width={3}              
          height={20}             
          intensity={15} 
          color="#ff0000" 
          rotation={[0, 0, 0]} 
        />
        <fog attach="fog" args={['#000000', 10, 50]} />
        <Chamber />
        <Lab />
        <ThreeScene />
        <WaterCylinder />
        <Floor position={[0, 0.1, 0]}/>
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
