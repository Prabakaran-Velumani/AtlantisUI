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
import React, { useEffect, lazy, Suspense } from 'react';
import Close from 'assets/img/games/close.png';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import Sample from 'assets/img/games/Merlin.glb';
import Model from './Model';
import { useLayoutEffect, useRef, useState } from 'react';
import room from 'assets/img/games/Compressed.glb';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import hdr from 'assets/models/bg.hdr';
const InteractionScreenShot = lazy(()=> import('./InteractionScreenShot'));
interface FeedBackScreenShotProps {
    backgroundScreenUrl: any;
    first: any;
    showNote: any;
    currentScreenId: any;
    isScreenshot: any;
    FeedbackremainingSentences?: any;
    options: any;
    getData: any;
    data: any;
    FeedBackselectedoptionData?: any;
    FeedBackoptionData?: any;
    feed?: any;
    getFeedbackData?: any;
    profile: any;
    setisScreenshot: any;
    preloadedAssets: any;
    FeedbackcurrentPosition?: any;
    interactionBlockArray?: any;
    profileData?:any
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
  FeedbackcurrentPosition,
  interactionBlockArray,
  profileData
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
                  className="story_feedback_content"
                >
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    h={'100%'}
                  >
                    <Box
                      w={'90%'}
                      h={'70%'}
                      display={'flex'}
                      justifyContent={'center'}
                      position={'relative'}
                    >
                      <Img
                        src={preloadedAssets?.feedparch}
                        w={'auto'}
                        h={'100%'}
                      />
                      <Box
                        position={'absolute'}
                        top={0}
                        width={'100%'}
                        h={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Box w={'70%'} >
                          <Img src={preloadedAssets.on} h={'4vh'} w={'100%'} />
                          <Box w={'90%'} display={'flex'} justifyContent={'flex-end'} position={'relative'} onClick={()=>setisScreenshot(true)}>
                            <Img src={preloadedAssets.ModelQ} h={'5vh'} w={'auto'} />
                            <Text position={'absolute'} color={'#fff'} fontSize={'3vh'} right={'25px'} >!</Text>
                          </Box>
                        </Box>
                        <Box className="feed_list">
                          {' '}
                          Interaction{' '}
                          {currentScreenId === 14 &&
                            FeedbackcurrentPosition &&
                            interactionBlockArray &&
                            FeedbackcurrentPosition +
                              '/' +
                              interactionBlockArray.length}
                        </Box>
                        <Box
                          w={'70%'}
                          h={'65%'}
                          overflowY={'auto'}
                          className="feedback_content_text"
                        >
                          <Box display={'flex'} mt={'10px'} alignItems={'center'}>
                            <Img src={preloadedAssets.FB} h={'1em'} w={'1em'} mr={'8px'} />
                            <Text textAlign={'justify'}>
                              {currentScreenId === 9
                                ? feed
                                : FeedbackremainingSentences}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        w={'120%'}
                        mt={'20px'}
                        display={'flex'}
                        justifyContent={'space-between'}
                        cursor={'pointer'}
                        position={'absolute'}
                        bottom={'-8%'}
                      >
                        <Img
                          src={preloadedAssets.left}
                          className={'interaction_button'}
                        />
                        <Img
                          src={preloadedAssets.right}
                          className={'interaction_button'}
                          onClick={() => getFeedbackData(data)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Box>
         {isScreenshot === true && (
              <InteractionScreenShot
                data={FeedBackoptionData}
                option={FeedBackselectedoptionData}
                options={options}
                backGroundImg={backgroundScreenUrl}
                geTfeedBackoption={geTfeedBackoption}
                isScreenshot={isScreenshot}
                preloadedAssets={preloadedAssets}
                profileData={profileData}
                currentScreenId={9}
              />
            )}
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

    new RGBELoader().setPath('models').load('bg.hdr', function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      const loader = new GLTFLoader().setPath('models');
      loader.load('Compressed.glb', async function (gltf) {
        gltf.scene.traverse(function (child: any) {
          /////////////////////
          if (child.isMesh && child.material.map) {
            child.material.map.minFilter = THREE.LinearFilter;
            child.material.map.magFilter = THREE.LinearFilter;
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
      height: window.innerHeight,
    };
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
    const camera = new THREE.PerspectiveCamera(
      65,
      sizes.width / sizes.height,
      1,
      1000,
    );
    camera.position.z = 8.9;
    camera.position.y = 1.7;
    scene.add(camera);
    const cursor = { x: 0, y: 0 };
    canvas.addEventListener('mousemove', movecallback, false);
    function movecallback(event: any) {
      cursor.x = (event.clientX / sizes.width) * 2 - 1;
      cursor.y = -(event.clientY / sizes.height) * 2 + 1;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
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
  }, []);
  return (
    <div
      style={{ height: '100%', width: '100%', position: 'absolute' }}
      ref={refContainer}
    >
      {loading && (
        <span style={{ position: 'absolute', left: '50%', top: '50%' }}>
          Loading...
        </span>
      )}
    </div>
  );
};


export default FeedBackScreen;
