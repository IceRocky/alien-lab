import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import Chamber from './Components/Chamber';
import Lab from './Components/Lab';
import ThreeScene from './Components/ThreeScene';
import CustomFirstPersonControls from './Components/CustomFirstPersonControls';
import GlassWithBubblesScene from './Components/GlassWithBubblesScene';
import WaterCylinder from './Components/WaterCylinder';


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
      <Canvas camera={{ position: [0, 3, 30], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7.5]} intensity={1} />
        <Chamber />
        <Lab />
        <ThreeScene cameraPosition={[0, 3, 30]} />
        <WaterCylinder/>
        {/* Conditionally render controls based on screen width */}
        {isMobile ? (
          <OrbitControls />
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
