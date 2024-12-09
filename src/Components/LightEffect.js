import React from 'react';
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";


import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js';
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";


const RectAreaLightEffect = ({ position, color }) => {
  const { scene } = useThree();
  RectAreaLightUniformsLib.init();

  const rectLight = new THREE.RectAreaLight(color, 150, 0.3, 7.5);
  rectLight.position.set(position[0], position[1], position[2]);
  rectLight.lookAt(0, position[1], 0);
  
  scene.add(rectLight);
  scene.add(new RectAreaLightHelper(rectLight));

  return null;
};

const SceneLighting = () => {
  const { scene } = useThree();

  // Spotlight setup
  const spotLight = new THREE.SpotLight('#ffffff', 50);
  spotLight.position.set(0, 10, 0);
  spotLight.angle = 2;
  spotLight.penumbra = 2;
  spotLight.castShadow = true;
  scene.add(spotLight);

  // Directional light setup
  const directionalLight = new THREE.DirectionalLight('#ffffff', 0.3);
  directionalLight.position.set(0, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  return (
    <ambientLight intensity={0.3} />
  );
};

export { RectAreaLightEffect, SceneLighting };
