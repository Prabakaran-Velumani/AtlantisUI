// CharacterModal.js
import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CharacterModal: React.FC<{ preloadedAssets: any; isSpeaking: boolean }> = ({
  preloadedAssets,
  isSpeaking,
}) => {
  const clock = new THREE.Clock();
  const groupRef = useRef<any>();
  const [gltf, setGltf] = useState(null);
  const mixer = useRef(null);
  const previousTime = useRef(0);

  useEffect(() => {
    const loadGltf = async () => {
      try {
        const response = await fetch(preloadedAssets?.preloadedGLBs?.characterGlb);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        console.log("objectUrl", objectUrl);
        const loader = new GLTFLoader();
        loader.load(
          objectUrl,
          gltf => {
            console.log("gltf.scene", gltf.scene);
            setGltf(gltf);
            groupRef.current = gltf.scene;
            const newMixer = new THREE.AnimationMixer(gltf.scene);
            mixer.current = newMixer;
            const animations = gltf.animations;
            if (animations && animations.length > 0) {
            
              // for(let i=0; i< animations.length; i++)
              //   {

              //   }
              const action = newMixer.clipAction(animations[isSpeaking ? 0 : 1]);
              action.play();
            }
          },
          undefined,
          error => {
            console.error('Error loading GLB:', error);
          }
        );
      } catch (error) {
        console.error('Error loading GLTF:', error);
      }
    };
    loadGltf();
  }, [isSpeaking]);

  useEffect(() => {
    if (groupRef.current) {
      // Your code to adjust group position
    }
  }, []);

  useEffect(() => {
    if (gltf) {
      return () => {
        // Dispose the loaded GLTF model when unmounting
        gltf?.scene.traverse((obj: any) => {
          if (obj.isMesh) {
            obj.geometry.dispose();
            obj.material.dispose();
          }
        });
      };
    }
  }, [gltf]);

  useEffect(() => {
    // Your useFrame equivalent logic
   const animate = () => {
    const deltaTime = clock.getDelta(); // Get the time delta dynamically
    console.log("deltaTime",deltaTime)
      if (mixer.current) {
        mixer.current.update(deltaTime);
      }
      requestAnimationFrame(animate);
    };
    animate();
    console.log("mixer", mixer);
  }, []);
  
console.log(" gltf", gltf)
console.log("groupRef", groupRef)

  return (
    gltf?.scene &&
    <primitive object={gltf?.scene} ref={groupRef} position={[2, -2, 0]} scale={1} />
  )
};
export default CharacterModal;








/*******************************************************/
/** working code with three.js react-three-fiber drei libraries 

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CharacterModal: React.FC<{ preloadedAssets: any; isSpeaking: boolean }> = ({
  preloadedAssets,
  isSpeaking,
}) => {
  const groupRef = useRef<THREE.Group>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [gltf, setGltf] = useState<THREE.Object3D | null>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);


  useEffect(() => {
    const loadGltf = async () => {
      try {
        const response = await fetch(preloadedAssets?.preloadedGLBs?.characterGlb);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        const loader = new GLTFLoader();
        loader.load(
          objectUrl,
          (gltf) => {
            setGltf(gltf.scene);
            const newMixer = new THREE.AnimationMixer(gltf.scene);
            mixer.current = newMixer;
            const animations = gltf.animations;
            if (animations && animations.length > 0) {
              const action = newMixer.clipAction(animations[isSpeaking ? 0 : 1]);
              action.play();
            }
          },
          undefined,
          (error) => {
            console.error('Error loading GLB:', error);
          }
        );
      } catch (error) {
        console.error('Error loading GLTF:', error);
      }
    };
    loadGltf();
      console.log("UseEffect - isSpeaking - 2", isSpeaking);
    return () => {
      if (gltf) {
        // Dispose the loaded GLTF model when unmounting
        gltf.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            obj.material.dispose();
          }
        });
      }
    };
  }, [preloadedAssets, isSpeaking]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });


  useEffect(() => {
    if (groupRef.current && cameraRef.current) {
      const cameraHeight = 2 * Math.tan((cameraRef.current.fov * Math.PI) / 360) * cameraRef.current.position.z;
      const bottomDistance = cameraHeight / 2;
      const bottomPosition = -bottomDistance;
      groupRef.current.position.setY(bottomPosition);
    }
  }, []);


  return (
    <group ref={groupRef}>
      {gltf && <primitive object={gltf} position={[2, 0, 0]} scale={.7}/>}
    </group>
  );
};

export default CharacterModal;
*/