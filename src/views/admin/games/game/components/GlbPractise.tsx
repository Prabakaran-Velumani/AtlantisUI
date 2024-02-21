import { Canvas, useFrame, useLoader } from "react-three-fiber";
import Sample from 'assets/img/games/Merlin.glb';
import { useLayoutEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { Box } from "@chakra-ui/react";


const GlbPractise:React.FC<{}> = ({}) =>{

    return (
      <>
        {/* <Box w={'100%'} h={'100vh'}> */}
          <Canvas camera={{ position: [23, 3, 10]}}>
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.8}
              color={0xffccaa}
              castShadow
            />
            <ambientLight intensity={5.5} />
            <pointLight position={[5, 5, 5]} color={0xff0000} intensity={1} />
<Model/>
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -5, 0]}
              receiveShadow
            >
              <planeGeometry args={[100, 100]} />
              <shadowMaterial opacity={0.5} />
            </mesh>
          </Canvas>
        {/* </Box> */}
      </>
    );
}

const Model: React.FC = () => {
    const groupRef = useRef<any>();
    const gltf = useLoader(GLTFLoader, Sample);
  
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);
  
    useFrame((state, delta) => {
      if (groupRef.current) {
        groupRef.current.castShadow = true;
      }
      mixer.update(delta);
    });
    action.play();
  
    useLayoutEffect(() => {
      if (groupRef.current) {
        groupRef.current.traverse((obj: any) => {
          if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });
      }
    }, []);
  
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.color.set(0xffccaaf0); // Set your desired color
        child.material.roughness = 0.4; // Adjust roughness as needed
        child.material.metalness = 0.8; // Adjust metalness as needed
      }
    });
  
    return (
      <group ref={groupRef}>
        <primitive object={gltf.scene} />
      </group>
    );
  };
export default GlbPractise;