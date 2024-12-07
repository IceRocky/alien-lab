import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Chamber = function () {
    const { scene } = useGLTF('/Model/Lab.glb');
  
    return <primitive object={scene} scale={[0.75, 1, 0.75]} />; // Scale 2x on all axes
};
  
export default Chamber;