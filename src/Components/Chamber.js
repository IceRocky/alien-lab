import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Chamber = function () {
    const { scene } = useGLTF('/Model/Chamber.glb');
  
    return <primitive object={scene} scale={[1, 1, 1]} />; // Scale 2x on all axes
};
  
export default Chamber;