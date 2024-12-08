// ThreeScene.js
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = ({ cameraPosition = [0, 5, 10] }) => {
  // Cameraconstraints remain the same
  useFrame((state) => {
    const camera = state.camera;
    const minHeight = 5;
    const maxHeight = 10;
    const radius = 19.8;

    if (camera.position.y < minHeight) {
      camera.position.y = minHeight;
    }
    if (camera.position.y > maxHeight) {
      camera.position.y = maxHeight;
    }

    const x = camera.position.x;
    const z = camera.position.z;
    const distanceFromCenter = Math.sqrt(x * x + z * z);

    if (distanceFromCenter > radius) {
      const scale = radius / distanceFromCenter;
      camera.position.x *= scale;
      camera.position.z *= scale;
    }
  });

  return null;
};

export default ThreeScene;
