import * as THREE from 'three';

/**
 * Prevents the camera from moving through models.
 * @param {THREE.Camera} camera - The camera object.
 * @param {THREE.Scene} scene - The scene containing the objects.
 * @param {THREE.Vector3} direction - The movement direction.
 * @param {number} speed - The speed of movement.
 */
export function handleCollision(camera, scene, direction, speed) {
  const raycaster = new THREE.Raycaster();
  const offset = 0.1; // Distance offset to avoid clipping.

  // Cast a ray in the direction of movement
  raycaster.set(camera.position, direction.normalize());
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0 && intersects[0].distance < speed + offset) {
    // Collision detected, stop movement
    return false;
  }

  // No collision, allow movement
  return true;
}
