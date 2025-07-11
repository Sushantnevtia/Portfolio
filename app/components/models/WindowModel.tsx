'use client';

import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['#WIN0003_Frame_#WIN0003_Textures_0']: THREE.Mesh
    ['#WIN0003_Window_#WIN0003_Textures_0']: THREE.Mesh
    ['#WIN0003_Handle_#WIN0003_Textures_0']: THREE.Mesh
  }
  materials: {
    WIN0003_Textures: THREE.MeshPhysicalMaterial
  }
}
const WindowModel = (props: Partial<THREE.Object3D>) => {
  const handleRef = useRef<THREE.Mesh>(null);
  const windowRef = useRef<THREE.Mesh>(null);

  const { nodes, materials } = useGLTF('models/window.glb', true ) as GLTFResult
  const data = useScroll();
  useFrame(() => {
    const b = data.range(0.4, 0.1);
    const c = data.range(0.5, 0.1);

    if (handleRef.current) {
      handleRef.current.rotation.y = -0.5 * Math.PI * b;
    }
    if (windowRef.current) {
      windowRef.current.rotation.z = 0.5 * Math.PI * c;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group rotation={[0, Math.PI, Math.PI]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['#WIN0003_Frame_#WIN0003_Textures_0'].geometry}
          material={materials.WIN0003_Textures}
        />
        <group position={[0.441, -0.039, 0.082]}
          ref={windowRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['#WIN0003_Window_#WIN0003_Textures_0'].geometry}
            material={materials.WIN0003_Textures}/>
          <mesh ref={handleRef}
            castShadow
            receiveShadow
            geometry={nodes['#WIN0003_Handle_#WIN0003_Textures_0'].geometry}
            material={materials.WIN0003_Textures}
            position={[-0.84, -0.018, 0.55]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models/window.glb');

export default WindowModel;