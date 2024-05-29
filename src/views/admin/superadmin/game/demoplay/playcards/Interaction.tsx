import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Box, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { API_SERVER } from 'config/constant';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import Sample from 'assets/img/games/Merlin.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import Model from './Model';

interface InteractionProps {
  backGroundImg: any;
  data: any;
  options: any;
  optionClick: any;
  InteractionFunction: () => void;
  option: any;
  navTrack?: any;
  preloadedAssets: any;
  selectedPlayer: any;
  LastModiPrevData: any;
  RepeatSelectOption: any;
  RepeatPrevOption:any;
  contentByLanguage:any;
}

const Interaction: React.FC<InteractionProps> = ({ backGroundImg, data, option, options, optionClick, InteractionFunction, navTrack, preloadedAssets, selectedPlayer, LastModiPrevData, RepeatSelectOption, RepeatPrevOption ,contentByLanguage}) => {
  const [prevSelectOption, setprevselectoptions] = useState<any>();
  useEffect(() => {
    if (RepeatSelectOption === true) {
        if (RepeatPrevOption.length > 0) {
          const prevoptionseleted = RepeatPrevOption;
          // return;
          setprevselectoptions(prevoptionseleted);
        }
      
    }
    else
    {
      setprevselectoptions([]);
    }

  }, [RepeatSelectOption]);

  return (
    <Box
      position="relative"
      w={'100%'}
      height="100vh"
      backgroundImage={backGroundImg}
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
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box position={'relative'} className="story_interaction_image">
              <Img
                src={preloadedAssets.parch}
                w={'auto'}
                h={'100%'}
                loading="lazy"
              />
              <Box
                position={'absolute'}
                top={{ base: '5%', md: '6%' }}
                className="story_interaction_content"
              >
                <Box
                  textAlign={'center'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontWeight={500}
                  fontSize={{ md: '3vw', lg: '2.5vw' }}
                  fontFamily={'AtlantisText'}
                  lineHeight={1}
                  w={'100%'}
                  h={'10%'}
                  className={'interaction_heading_potrait'}
                >
                  <Box w={'80%'} color={'#312821'}>
                    Interaction{' '}
                  </Box>
                </Box>
                <Box
                  textAlign={'center'}
                  h={'17%'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontWeight={500}
                  fontFamily={'AtlantisContent'}
                  lineHeight={1.1}
                  w={'96%'}
                  marginTop={'15px'}
                  position={'relative'}
                  overflowY={'scroll'}
                  css={{
                    // Hide scrollbar for webkit-based browsers (Safari, Chrome)
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                    // Hide scrollbar for Mozilla-based browsers (Firefox)
                    'scrollbar-width': 'none', // For Firefox
                    '-ms-overflow-style': 'none', // For IE and Edge
                  }}
                >
                  <Box
                    className={'story_intraction_question'}
                    justifyContent={'flex-start'}
                  >
                    <Img src={preloadedAssets.qs} h={'1em'} w={'1em'} />
                    <Text>
                      {contentByLanguage!==null? contentByLanguage: data?.blockText}
                    </Text>
                  </Box>
                </Box>
                <Box
                  className='story_options_area'
                >
                  <Box w={'60%'}>
                    {options &&
                      options.map((item: any, ind: number) => (

                        <Box
                          w={'100%'}
                          mb={'10px'}
                          lineHeight={1}
                          key={ind}
                          color={prevSelectOption?.some((prev: any) => prev === item.qpOptions)
                            ? 'white'
                            : option === ind ? 'purple' : ''}
                          style={
                            prevSelectOption?.some((prev: any) => prev === item.qpOptions)
                              ? {
                                // backgroundColor: "#df555533",
                                // backgroundSize: 'cover',
                                opacity: 0.7,
                                // border: 'snow',
                                // borderRadius: '8%',
                                color: 'grey',
                              }
                              : {}
                          }
                        >
                          <Box
                            w={'100%'}
                            mb={'10px'}
                            lineHeight={1}
                            key={ind}
                            color={option === ind ? 'purple' : ''}
                            textAlign={'center'}
                            onClick={() => {
                              if (!prevSelectOption || !prevSelectOption.some((prev: any) => prev === item.qpOptions)) {
                                optionClick(item, ind);
                              }
                            }}
                            fontFamily={'AtlantisText'}
                          >
                            <Img
                              src={
                                prevSelectOption?.some((prev: any) => prev === item.qpOptions)
                                  ? preloadedAssets.on
                                  : option === ind ? preloadedAssets.on : preloadedAssets.off
                              }
                              opacity={prevSelectOption?.some((prev: any) => prev === item.qpOptions) ? 0.5 : 1}
                              h={'4vh'}
                              w={'100%'}
                            />
                            <Box className={'story_interaction_option'}>
                              {/* {item?.qpOptionText} */}
                              {`${String.fromCharCode(65 + ind)}). ${item?.qpOptionText}`}
                            </Box>
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </Box>
                <Box
                  w={'98%'}
                  display={'flex'}
                  justifyContent={'space-between'}
                >
                  {/* {navTrack.length > 1 && (
                    <Img
                      src={preloadedAssets.left}
                      className={'interaction_button'}
                      onClick={() => prevData(data)}
                    />
                  )} */}
                  <Img
                    src={preloadedAssets.left}
                    className={'interaction_button'}
                    onClick={() => { LastModiPrevData(data) }}
                  />

                  {option !== null && (
                    <Box
                      className={'blinking-wave'}
                      // onClick={() => InteractionFunction()}
                      borderRadius={'50%'}
                    >
                      <Img
                        src={preloadedAssets.right}
                        className={'interaction_button'}
                        onClick={() => InteractionFunction()}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </motion.div>
        </GridItem>
      </Grid>
      {selectedPlayer && (
        <Box className={'player_character_image'}>
          <Canvas camera={{ position: [0, 1, 9] }} > {/* For Single view */}
            {/* <Environment preset={"park"} background />   */}
            <directionalLight position={[2.0, 78.0, 100]} intensity={0.8} color={'ffffff'} castShadow />
            <ambientLight intensity={0.5} />
            {/* <OrbitControls   />  */}
            <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />

            {/* COMPONENTS */}
            <Player />
            <Model isSpeaking={option} position={[-3, -1.8, 5]} rotation={[0, 1, 0]} />
            {/* <Sphere position={[0,0,0]} size={[1,30,30]} color={'orange'}  />   */}
            {/* <Trex position={[0,0,0]} size={[1,30,30]} color={'red'}  />             */}
            {/* <Parrot /> */}
          </Canvas>
        </Box>
      )}
    </Box>
  );
}

const Player: React.FC = () => {
  const groupRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, Sample);
  const [isHovered, setIsHovered] = useState<any>(false);

  const mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[1]);

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
      child.material.color.set(0xffffff); // Set your desired color
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
      <primitive object={gltf.scene} position={[5, -5, 0]} rotation={[0, -1, 0]} />   {/* For Single view */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 5, 0]} receiveShadow onClick={handleClick} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
        <planeGeometry args={[100, 500]} />
        <shadowMaterial color={isHovered ? 'orange' : 'lightblue'} opacity={0.5} />
      </mesh> */}
    </group>
  )
};
export default Interaction;