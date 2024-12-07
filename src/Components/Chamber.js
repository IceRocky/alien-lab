import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Chamber = function () {
    const { scene } = useGLTF('/Model/Chamber.glb');
  
    return <primitive object={scene} scale={[2, 1.25, 2]} />; // Scale 2x on all axes
};
  
export default Chamber;