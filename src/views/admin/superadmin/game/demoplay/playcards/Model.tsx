import React, {
    useLayoutEffect,
    useRef,
    useState,
  } from 'react';

  import Sample from 'assets/img/games/Character_sample.glb';
  // Three js
  import { Canvas, useLoader, useFrame } from 'react-three-fiber';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  // import { useGLTF } from '@react-three/drei';
  // import { Environment, OrbitControls } from '@react-three/drei';
  // import { FBXLoader } from 'three/addons/loaders/FBXLoader';
  // Components
  // import PlayingCharacter from '../three/PlayingCharacter';
  // import Sphere from '../three/Sphere';
  // import Trex from '../three/Trex';
  // import { Parrot } from '../three/Parrot';
  // Import ProfileContext from EntirePreview
  
 const Model: React.FC<{isSpeaking?:any,position?:any,rotation?:any}> = ({isSpeaking,position,rotation}) => {
    const groupRef = useRef<any>();
    const gltf = useLoader(GLTFLoader, Sample);  
    const [isHovered, setIsHovered] = useState<any>(false);    
    
    const mixer = new THREE.AnimationMixer(gltf.scene);  
    const action = mixer.clipAction(gltf.animations[isSpeaking ? 0 : 1]);    
  
    useFrame((state, delta) => {
      // Rotate the model on the Y-axis
      
      if (groupRef.current) {      
        // groupRef.current.rotation.y += delta;
        // groupRef.current.rotation.x += delta;
        // groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 2;
        groupRef.current.castShadow = true;
      }
  
      mixer.update(delta);    
    });
    
    // !isHovered &&
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
        // child.material.color.set(0xffccaaf0); // Set your desired color
        child.material.color.set(0xffffff ); // Set your desired color
        child.material.roughness = 0.4; // Adjust roughness as needed
        child.material.metalness = 0.8; // Adjust metalness as needed
        // child.material.map.format = THREE.RGBAFormat;
      }
    });
  
    function handleClick() {
      console.log('Character Click!')
    }
  
    return (    
      <group ref={groupRef}>      
        {/* <primitive object={gltf.scene} position={[3, 0 , 0]} /> */}        
        <primitive object={gltf.scene} position={position} rotation={rotation} />   {/* For Single view */} 
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 5, 0]} receiveShadow onClick={handleClick} onPointerEnter={()=> setIsHovered(true)} onPointerLeave={()=> setIsHovered(false)}>            
          <planeGeometry args={[100, 500]} />
          <shadowMaterial color={isHovered ? 'orange' : 'lightblue'} opacity={0.5} />
        </mesh>     */}
      </group>
    )
  };

export default Model;  