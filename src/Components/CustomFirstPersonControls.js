import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CustomFirstPersonControls() {
  const { camera } = useThree(); // Fixed: useThree imported and used correctly
  const move = useRef({ forward: 0, backward: 0, left: 0, right: 0 });

  useEffect(() => {
    const onKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW':
          move.current.forward = 2;
          break;
        case 'KeyS':
          move.current.backward = 2;
          break;
        case 'KeyA':
          move.current.left = 2;
          break;
        case 'KeyD':
          move.current.right = 2;
          break;
        default:
          break;
      }
    };

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
          move.current.forward = 0;
          break;
        case 'KeyS':
          move.current.backward = 0;
          break;
        case 'KeyA':
          move.current.left = 0;
          break;
        case 'KeyD':
          move.current.right = 0;
          break;
        default:
          break;
      }
    };

    // Add event listeners
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => {
    const speed = 0.1;

    const handleMovement = () => {
      const direction = new THREE.Vector3();
      const forward = new THREE.Vector3();
      const right = new THREE.Vector3();

      // Calculate forward and right directions
      camera.getWorldDirection(forward);
      forward.y = 0; // Ignore vertical movement
      forward.normalize();
      right.crossVectors(forward, camera.up).normalize();

      // Calculate the direction of movement
      direction
        .add(forward.clone().multiplyScalar(move.current.forward - move.current.backward))
        .add(right.clone().multiplyScalar(move.current.right - move.current.left));

      // Update camera position
      camera.position.add(direction.multiplyScalar(speed));
    };

    // Use requestAnimationFrame for smoother movement
    const id = setInterval(handleMovement, 16); // 60 fps

    return () => clearInterval(id);
  }, [camera]);

  return null;
}

export default CustomFirstPersonControls;
