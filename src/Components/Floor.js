import React, { useEffect } from 'react';
import { MeshStandardMaterial, TextureLoader, RepeatWrapping } from 'three';
import { useLoader } from '@react-three/fiber';

export default function Floor({ 
  color = '##4A796D',
  roughness = 0.5,
  metalness = 0.4,
  envMapIntensity = 1,
  size = [50, 50],
  textureMap = '/Textures/floor/floor1.jpg',
  normalMap = '/Textures/floor/floor1.jpg',
  roughnessMap = '/Textures/floor/floor1.jpg',
  repeat = [0.8, 1]
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
    roughnessMap: roughnessTexture
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial {...floorMaterial} />
    </mesh>
  );
}
