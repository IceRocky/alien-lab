import React from 'react';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

const LightEffect = () => {
  // Initialize RectAreaLight uniforms
  RectAreaLightUniformsLib.init();

  return (
    <>
      <ambientLight intensity={0.8} />
      {/* <directionalLight 
        position={[20, 20, 100]} 
        intensity={3}
        castShadow
      /> */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={200}
        color="#00ffff"
        distance={50}
      />
      {/* <rectAreaLight 
        position={[20, -5, 0]}  // East position
        width={1}              
        height={5}            
        intensity={50} 
        color="blue" 
        rotation={[0, Math.PI/2, 0]}  // Rotated to point along y-axis
      />
      <rectAreaLight 
        position={[-10, 5, 0]}  // West position
        width={4}              
        height={10}             
        intensity={15} 
        color="#ff0000" 
        rotation={[Math.PI / 2, 0, 0]}  // Rotated to point along y-axis
      />
      <rectAreaLight 
        position={[0, 5, 10]}  // North position
        width={4}             
        height={10}            
        intensity={15} 
        color="#ff0000" 
        rotation={[Math.PI / 2, 0, 0]}  // Rotated to point along y-axis
      />
      <rectAreaLight 
        position={[0, 5, -10]}  // South position
        width={4}              
        height={10}             
        intensity={15} 
        color="#ff0000" 
        rotation={[Math.PI / 2, 0, 0]}  // Rotated to point along y-axis
      /> */}
      <fog attach="fog" args={['#000000', 10, 50]} />
    </>
  );
};

export default LightEffect; 