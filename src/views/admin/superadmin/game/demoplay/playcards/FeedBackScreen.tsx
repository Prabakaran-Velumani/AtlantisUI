import {
  Box,
  Grid,
  GridItem,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import next from 'assets/img/screens/next.png';
import feedi from 'assets/img/screens/feed.png';
import InteractionScreenShot from './InteractionScreenShot';
import Close from 'assets/img/games/close.png';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import Sample from 'assets/img/games/Merlin.glb';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import * as THREE from 'three';
import Model from './Model';
import { useLayoutEffect, useRef, useState } from 'react'
import room from 'assets/img/games/Compressed.glb';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import hdr from 'assets/models/bg.hdr';
interface FeedBackScreenShotProps {
  backgroundScreenUrl: any;
  first: any;
  showNote: any;
  currentScreenId: any;
  isScreenshot: any;
  FeedbackremainingSentences: any;
  options: any;
  getData: any;
  data: any;
  FeedBackselectedoptionData: any;
  FeedBackoptionData: any;
  feed?: any;
  getFeedbackData: any;
  profile: any;
  setisScreenshot: any;
  preloadedAssets: any;
}
const FeedBackScreen: React.FC<FeedBackScreenShotProps> = ({
  backgroundScreenUrl,
  first,
  profile,
  showNote,
  isScreenshot,
  setisScreenshot,
  data,
  getData,
  FeedbackremainingSentences,
  options,
  currentScreenId,
  FeedBackselectedoptionData,
  FeedBackoptionData,
  feed,
  getFeedbackData,
  preloadedAssets,
}) => {

  const geTfeedBackoption = () => {
    setisScreenshot(false);
  };

  return (
    <>
      <>
        <Box
          position="relative"
          w={'100%'}
          height="100vh"
          backgroundImage={backgroundScreenUrl}
          backgroundSize={'cover'}
          backgroundRepeat={'no-repeat'}
          className="chapter_potrait"
        >
          <Grid
            templateColumns="repeat(1, 1fr)"
            gap={4}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w={'90%'}
          >
            <GridItem colSpan={1} position={'relative'}>
              <Box w={'fit-content'} display={'flex'} position={'relative'}>
                <Img
                  src={preloadedAssets.feedi}
                  className="story_note_image"
                  loading="lazy"
                />
                <Box
                  position={'absolute'}
                  top={{ base: '5%', md: '6%' }}
                  className='story_feedback_content'
                >
                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100%'}>
                    <Box
                      w={'90%'}
                      h={'70%'}
                      display={'flex'}
                      justifyContent={'center'}
                      position={'relative'}
                    >
                      <Img src={preloadedAssets?.feedparch} w={'auto'} h={'100%'} />
                      <Box position={'absolute'} top={0} width={'100%'} h={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Box className='feed_list'>Interaction 1/3</Box>
                        <Box w={'70%'} h={'75%'} overflowY={'scroll'} className='feedback_content_text'>
                          <Box display={'flex'}>
                            <Img src={preloadedAssets.qs} h={'1em'} w={'1em'}  />
                            This way, you can increase the RGB color intensity of the GLTF/GLB model while using an HDR environment map in your React Three Fiber scene. Adjust the values as needed to achieve the desired color intensity.
                          </Box>
                          <Box display={'flex'} mt={'10px'}>
                            <Img src={preloadedAssets.ANS} h={'1em'} w={'1em'}  />
                             Adjust the values as needed to achieve the desired color intensity.
                          </Box>
                          <Box display={'flex'} mt={'10px'}>
                            <Img src={preloadedAssets.FB} h={'1em'} w={'1em'}  />
                            This way, you can increase the RGB color intensity of the GLTF/GLB model while using an HDR environment map in your React Three Fiber scene. Adjust the values as needed to achieve the desired color intensity.
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        w={'100%'}
                        onClick={() => getFeedbackData(data)}
                        mt={'20px'}
                        display={'flex'}
                        justifyContent={'center'}
                        cursor={'pointer'}
                        position={'absolute'}
                        bottom={'-8%'}
                      >
                        <Img
                          src={preloadedAssets.next}
                          h={'7vh'}
                          className={'story_note_next_button'}
                        />
                      </Box>
                    </Box>
                    {/* <Box className={'story_note_block'}> */}
                    <Text textAlign={'center'}>{feed}</Text>
                    {/* </Box> */}
                  </Box>

                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Box>
        {/* <Box className={'player_character_image'} zIndex={999}> */}
        {/* <Canvas camera={{ position: [0, 1, 9] }} >           
            <directionalLight position={[2.0, 78.0, 100]} intensity={0.8} color={'ffffff'} castShadow />
            <ambientLight intensity={0.5} />
            <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />
            <Player />
          </Canvas> */}
        {/* </Box> */}
        {/* <ThreeScene/> */}
        {/* {currentScreenId === 9 ? (
          <>
            <Box>
              <React.Fragment>{feed}</React.Fragment>
            </Box>
            <Box
              w={'100%'}
              onClick={() => getData(data)}
              mt={'20px'}
              display={'flex'}
              justifyContent={'center'}
              cursor={'pointer'}
            >
              <Img src={preloadedAssets.next} w={'200px'} h={'60px'} />
            </Box>
          </>
        ) : (
          <>
            {FeedbackremainingSentences}
            {isScreenshot === true ? (
              <InteractionScreenShot
                data={FeedBackoptionData}
                option={FeedBackselectedoptionData}
                options={options}
                backGroundImg={backgroundScreenUrl}
                profile={profile}
                geTfeedBackoption={geTfeedBackoption}
                isScreenshot={isScreenshot}
                preloadedAssets={preloadedAssets}
              />
            ) : (
              ''
            )}
          </>
        )} */}
      </>
    </>
  );
};
const ThreeScene = () => {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [renderer, setRenderer] = useState();
  useEffect(() => {
    const { current: container } = refContainer;
    if (container) {
      const canvas = document.createElement('canvas');
      canvas.className = 'webgl';
      container.appendChild(canvas);
    }
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('canvas.webgl');
    const scene = new THREE.Scene();

    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    new RGBELoader()
      .setPath('models')
      .load('bg.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        const loader = new GLTFLoader().setPath('models');
        loader.load('Compressed.glb', async function (gltf) {
          gltf.scene.traverse(function (child: any) {/////////////////////
            if (child.isMesh && child.material.map) {
              child.material.map.minFilter = THREE.LinearFilter
              child.material.map.magFilter = THREE.LinearFilter
            }
          });
          const model = gltf.scene;
          model.rotation.y -= 1.15;
          model.position.x = -1.88;
          scene.add(model);
          setLoading(false);
        });
      });
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    window.addEventListener('resize', resizecallback);
    function resizecallback() {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    const aspectRatio = sizes.width / sizes.height;
    const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 1, 1000);
    camera.position.z = 8.9;
    camera.position.y = 1.7;
    scene.add(camera);
    const cursor = { x: 0, y: 0 }
    canvas.addEventListener('mousemove', movecallback, false);
    function movecallback(event: any) {
      cursor.x = (event.clientX / sizes.width) * 2 - 1;
      cursor.y = - (event.clientY / sizes.height) * 2 + 1;
    }

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setClearColor(0xffffff, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.physicallyCorrectLights = true;

    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    function animate() {
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate); // Call again on the next frame

    }
    animate();

  }, [])
  return (
    <div
      style={{ height: "100%", width: "100%", position: "absolute" }}
      ref={refContainer}
    >
      {loading && (
        <span style={{ position: "absolute", left: "50%", top: "50%" }}>
          Loading...
        </span>
      )}
    </div>
  );
};

// const Player: React.FC = () => {
//   const groupRef = useRef<any>();
//   const HDRMap = useLoader(RGBELoader, hdr);
//   const gltf = useLoader(GLTFLoader, room);
//   const [isHovered, setIsHovered] = useState<any>(false);
//   const mixer = new THREE.AnimationMixer(gltf.scene);
//   // const action = mixer.clipAction(gltf.animations[10]);

//   useFrame((state, delta) => {
//     if (groupRef.current) {
//       groupRef.current.castShadow = true;
//     }
//     mixer.update(delta);
//   });

//   // !isHovered &&
//   // action.play();

//   useLayoutEffect(() => {
//     if (groupRef.current) {
//       groupRef.current.traverse((obj: any) => {
//         if (obj.isMesh) {
//           obj.castShadow = true;
//           obj.receiveShadow = true;
//         }
//       });
//     }
//   }, []);

//   gltf.scene.traverse((child) => {
//     if (child instanceof THREE.Mesh && child.material.map) {
//       child.material.color.set(0xffffff); // Set your desired color
//       child.material.roughness = 0.4; // Adjust roughness as needed
//       child.material.metalness = 0.8; // Adjust metalness as needed
//       if (child.material.map) {
//         child.material.map.minFilter = THREE.LinearFilter;
//         child.material.map.magFilter = THREE.LinearFilter;
//       }
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       {/* <primitive object={gltf.scene} position={[3, 0 , 0]} /> */}
//       <primitive object={HDRMap} />
//       <primitive object={gltf.scene} position={[-0.2,-1.5, 0.7]} rotation={[-0.1, -1.4, 0]} /> 
//       {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 5, 0]} receiveShadow onClick={handleClick} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
//         <planeGeometry args={[100, 500]} />
//         <shadowMaterial color={isHovered ? 'orange' : 'lightblue'} opacity={0.5} />
//       </mesh> */}
//     </group>
//   )
// };

export default FeedBackScreen;
