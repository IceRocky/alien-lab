import React, { useEffect } from 'react';
import { MeshStandardMaterial, TextureLoader, RepeatWrapping } from 'three';
import { useLoader } from '@react-three/fiber';

export default function Floor({ 
  color = 'white',
  roughness = 0.8,
  metalness = 0,
  envMapIntensity = 20,
  size = [50, 50],
  textureMap = '/Textures/floor/floor1.jpg',
  normalMap = '/Textures/floor/floor1.jpg',
  roughnessMap = '/Textures/floor/floor1.jpg',
  repeat = [20, 20]
}) {
  const [
    baseTexture,
    normalTexture,
    roughnessTexture
  ] = useLoader(TextureLoader, [
    textureMap,
    normalMap,
    roughnessMap
  ]);

  useEffect(() => {
    [baseTexture, normalTexture, roughnessTexture].forEach(texture => {
      if (texture) {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(repeat[0], repeat[1]);
      }
    });
  }, [baseTexture, normalTexture, roughnessTexture, repeat]);

  const floorMaterial = new MeshStandardMaterial({
    color,
    roughness,
    metalness,
    envMapIntensity,
    map: baseTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    flatShading: false,
    side: 2
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial {...floorMaterial} />
    </mesh>
  );
}
