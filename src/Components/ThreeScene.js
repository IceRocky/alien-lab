// ThreeScene.js
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { useRef } from 'react';

const ThreeScene = ({ cameraPosition = [0, 5, 10] }) => {
  // This will keep the camera within specified limits
  useFrame((state) => {
    const camera = state.camera;
    const minHeight = 5; // Minimum height for the camera
    const maxHeight = 10; // Maximum height for the camera
    const radius = 29; // Radius for the circular area

    // Lock the camera at the minimum height
    if (camera.position.y < minHeight) {
      camera.position.y = minHeight;
    }

    // Limit the camera's y position
    if (camera.position.y > maxHeight) {
      camera.position.y = maxHeight;
    }

    // Constrain the camera's position within a circle of radius 50
    const x = camera.position.x;
    const z = camera.position.z;
    const distanceFromCenter = Math.sqrt(x * x + z * z);

    if (distanceFromCenter > radius) {
      // Normalize the direction and scale it to the radius
      const scale = radius / distanceFromCenter;
      camera.position.x *= scale;
      camera.position.z *= scale;
    }
  });

  return (
    <>
      {/* Ground Plane with height 0.01, color cyan, reflective and glossy */}
      <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial 
          color="cyan" 
          roughness={0.1} // Lower roughness for more gloss
          metalness={0.8} // Higher metalness for more reflectivity
        />
      </Plane>
    </>
  );
};

export default ThreeScene;