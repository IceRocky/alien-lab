import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Chamber = function () {
    const group = useRef();
    const { scene, animations } = useGLTF('/Model/Chamber.glb');
    const { actions } = useAnimations(animations, group);
  
    useEffect(() => {
        // Play all animations
        // If you know the specific animation name, you can play it like:
        // actions.YOUR_ANIMATION_NAME.play()
        Object.values(actions).forEach((action) => action.play());
    }, [actions]);
  
    return (
        <group ref={group}>
            <primitive object={scene} scale={[2, 1.25, 2]} />
        </group>
    );
};
  
export default Chamber;