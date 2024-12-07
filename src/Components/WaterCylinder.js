import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export default function WaterCylinder() {
  const meshRef = useRef();
  const iceTexture = useLoader(TextureLoader, './Textures/water.jpg');
  
  // Configure texture
  iceTexture.wrapS = THREE.RepeatWrapping;
  iceTexture.wrapT = THREE.RepeatWrapping;
  iceTexture.repeat.set(7, 7);
  iceTexture.colorSpace = THREE.NoColorSpace;

  // Create custom shader material
  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseTexture: { value: iceTexture },
      baseColor: { value: new THREE.Color(0x97C1FF) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform sampler2D baseTexture;
      uniform vec3 baseColor;
      varying vec2 vUv;

      void main() {
        // Create seamless wrapping by using fract
        vec2 uv = vec2(fract(1.0 - vUv.x), vUv.y);
        
        // Smooth the seam by blending near the edges
        float blend = smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x);
        
        float ripple1 = sin(uv.x * 10.0 + time * 4.0) * 0.5 + 0.5;
        float ripple2 = sin(uv.y * 8.0 - time * 5.6) * 0.5 + 0.5;
        float ripple = ripple1 * ripple2;

        vec4 texColor = texture2D(baseTexture, uv + vec2(sin(time * 1.2) * 0.1));
        
        vec3 finalColor = mix(baseColor, texColor.rgb, 0.5) + ripple * 0.2;
        finalColor *= mix(0.95, 1.0, blend); // Subtle darkening at the seam
        
        gl_FragColor = vec4(finalColor, 0.8);
      }
    `,
    transparent: true
  });

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 3, 0]} material={waterMaterial}>
      <cylinderGeometry args={[1.35, 1.35, 9]} />
    </mesh>
  );
}