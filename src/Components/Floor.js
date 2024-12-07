import React from 'react';
import { Text } from '@react-three/drei';
import { MeshStandardMaterial, PlaneGeometry, Mesh, GridHelper, AxesHelper } from 'three';

function PlaneWithGrid() {
  return (
    <>
      {/* Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="azure" 
          metalness={1}  // Makes the surface shiny
          roughness={0.1} // Low roughness for a glossy effect
          envMapIntensity={1} // Increases the intensity of reflections
          reflectivity={1} // Makes the material reflective
        />
      </mesh>

      {/* Grid Helper */}
      <gridHelper args={[100, 100, 'black', 'gray']} /> {/* Size, Divisions */}

      {/* Axes Helper */}
      <axesHelper args={[5]} /> {/* Length of the axes */}

      {/* Labels for Axes */}
      <Text position={[5.5, 0.1, 0]} fontSize={0.3} color="red">
        X
      </Text>
      <Text position={[0, 5.5, 0]} fontSize={0.3} color="green">
        Y
      </Text>
      <Text position={[0, 0.1, 5.5]} fontSize={0.3} color="blue">
        Z
      </Text>
    </>
  );
}

export default PlaneWithGrid;
