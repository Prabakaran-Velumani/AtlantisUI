// Chakra Imports
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Img,
  Text,
  useToast,
} from '@chakra-ui/react';

import bk from 'assets/img/games/17.png';
import note from 'assets/img/games/note.png';
import next from 'assets/img/screens/next.png';
import dial from 'assets/img/games/Dialogue.png';
import char from 'assets/img/games/charbox.png';
import right from 'assets/img/games/right.png';
import left from 'assets/img/games/left.png';
import parch from 'assets/img/games/parch.png';
import on from 'assets/img/games/on.png';
import off from 'assets/img/games/off.png';
import React, {
  Suspense,
  useContext,
  useEffect,
  // useLayoutEffect,
  // useRef,
  useState,
} from 'react';

// import { Canvas, useLoader, useFrame } from 'react-three-fiber';

import feedi from 'assets/img/screens/feed.png';
import TypingEffect from './Typing';
import { getVoiceMessage, getPreview } from 'utils/game/gameService';
import { useParams } from 'react-router-dom';
// Import ProfileContext from EntirePreview
import { ProfileContext } from '../EntirePreview';
import { motion } from 'framer-motion';
import { API_SERVER } from 'config/constant';
import { ScoreContext } from '../GamePreview';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import Sample from 'assets/img/games/collector.glb';
import { useLayoutEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
const Story: React.FC<{
  prevData?: any;
  currentScore: any;
  data: any;
  type: any;
  backGroundImg: any;
  getData: any;
  option: any;
  options: any;
  handleValidate: any;
  resMsg: any;
  feed: any;
  formData: any;
  setAudio: any;
  setCurrentScreenId: any;
  selectedPlayer: any;
  selectedNpc: any;
  getAudioForText: any;
  voiceIds: any;
  windowWidth: any;
  windowHeight: any;
}> = ({
  data,
  type,
  resMsg,
  feed,
  getData,
  option,
  options,
  handleValidate,
  backGroundImg,
  formData,
  setCurrentScreenId,
  setAudio,
  selectedPlayer,
  selectedNpc,
  getAudioForText,
  voiceIds,
  currentScore,
  prevData,
  windowWidth,
  windowHeight,
}) => {
  const [showNote, setShowNote] = useState(true),
    [first, setFirst] = useState(false);
  // const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const userProfile = useContext(ProfileContext);
  const { profile, setProfile } = useContext(ScoreContext);
  const [score, setScore] = useState<any>({ seqId: '', score: null });
  // const [blink, setBlink] = useState(false);
  // useEffect(() => {

  //   const blinkInterval = setInterval(() => {
  //     setBlink(false);
  //   }, 3000); 

  //   return () => clearInterval(blinkInterval);
  // }, []);
  useEffect(() => {
    getVoice(data, type);
    setShowNote(true);
    setTimeout(() => {
      setShowNote(false);
    }, 1000);
  }, [data, type]);

  useEffect(() => {
    // setShowNote(true);
    setFirst(true);
    setTimeout(() => {
      setFirst(false);
      setShowNote(false);
    }, 1000);
  }, []);

  const getVoice = async (blockInfo: any, blockType: string) => {
    let text = '';
    let voiceId = '';
    /** 
         * For voice 
        data.includes('note') =>  Game Narattor
        data.includes('dialog') =>  data.character
        data.includes('interaction') => data.blockRoll
        resMsg => data.blockRoll
        
        *For Animations & Emotion & voice Modulation 
        data.includes('dialog') => data.animation
        data.includes('interaction') //For Question => data.QuestionsEmotion
        data.includes('interaction') //For Answers  => optionsObject[] : data.optionsemotionObject[]
          resMsg =>responseObject[]  : responseemotionObject[]
        */

    switch (blockType) {
      case 'Note':
        text = blockInfo.blockText;
        voiceId = voiceIds?.narrator;
        break;
      case 'Dialog':
        text = blockInfo.blockText;
        voiceId =
          blockInfo?.blockRoll == '999999'
            ? voiceIds.NPC
            : userProfile?.gender == 'Male'
            ? voiceIds?.playerMale
            : voiceIds?.playerFemale;
        break;
      case 'Interaction':
        let optionsText = '';
        console.log('options', options);
        options.forEach((item: any) => {
          optionsText +=
            '---Option ' + item?.qpOptions + '-' + item?.qpOptionText;
        });
        text = blockInfo.blockText + optionsText;
        console.log(
          "userProfile?.gender == 'Male'",
          userProfile?.gender == 'Male',
        );
        console.log('blockInfo?.blockRoll ', blockInfo?.blockRoll);
        voiceId =
          blockInfo?.blockRoll == '999999'
            ? voiceIds.NPC
            : userProfile?.gender == 'Male'
            ? voiceIds?.playerMale
            : voiceIds?.playerFemale;
        break;
      case 'Response':
        text = resMsg;
        voiceId =
          blockInfo?.blockRoll == '999999'
            ? voiceIds.NPC
            : userProfile?.gender === 'Male'
            ? voiceIds?.playerMale
            : voiceIds?.playerFemale;
        break;
      case 'Feedback':
        text = feed;
        voiceId =
          blockInfo?.blockRoll === '999999'
            ? voiceIds.NPC
            : userProfile?.gender === 'Male'
            ? voiceIds?.playerMale
            : voiceIds?.playerFemale;
        break;
    }
    getAudioForText(text, voiceId);
  };

  const InteractionFunction = () => {
    setProfile((prev: any) => {
      const { seqId, score: newScore } = score;
      const index = prev.score.findIndex((item: any) => item.seqId === seqId);
      if (index !== -1) {
        const updatedScore = [...prev.score];
        updatedScore[index] = { ...updatedScore[index], score: newScore };
        return { ...prev, score: updatedScore };
      } else {
        const newScoreArray = [
          ...prev.score,
          {
            seqId: seqId,
            score: newScore,
            quest: parseInt(seqId.split('.')[0]),
          },
        ];
        return { ...prev, score: newScoreArray };
      }
    });
    getData(data);
  };
  const optionClick = (item: any, ind: any) => {
    setScore({ seqId: item?.qpSequence, score: parseInt(item?.qpScore) });
    handleValidate(item, ind);
  };
  // useEffect(()=>{
  //   const handleImageLoad = (event:any) => {
  //     const { naturalWidth, naturalHeight } = event.target;
  //     setImageDimensions({ width: naturalWidth, height: naturalHeight });
  //   };
  // },[]);

  const imageRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(null);
  useEffect(() => {
    if (imageRef.current) {
      // Ensure image is loaded before accessing its dimensions
      imageRef.current.onload = () => {
        setImageHeight(imageRef.current.height);
      };
    }
  }, [imageRef, windowWidth, windowHeight]);
  console.log(imageHeight);
  return (
    <>
      {data && type === 'Note' && (
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
            className="story_note_grid"
          >
            <GridItem colSpan={1} position={'relative'}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box display={'flex'} justifyContent={'center'}>
                  <Img src={note} className="story_note_image" loading="lazy" />
                  <Box
                    className={'story_note_content'}
                    // bg={'blue.300'}
                  >
                    <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                      <Box className={'story_note_block'}>
                        <Text textAlign={'center'}>{data?.blockText}</Text>
                      </Box>
                    </Box>
                    <Box
                      w={'100%'}
                      onClick={() => getData(data)}
                      mt={'20px'}
                      display={'flex'}
                      justifyContent={'center'}
                      cursor={'pointer'}
                      position={'fixed'}
                      top={'70%'}
                    >
                      <Img
                        src={next}
                        h={'7vh'}
                        className={'story_note_next_button'}
                      />
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </GridItem>
          </Grid>
        </Box>
      )}
      {data && type === 'Dialog' && (
        <Box className="chapter_potrait">
          <Img src={backGroundImg} className="dialogue_screen" />
          {/* <Box w={'100%'} h={'100vh'}>
          <Canvas camera={{ position: [30, 0, 10] }}>
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.8}
              color={0xffccaa}
              castShadow
            />
            <ambientLight intensity={5.5} />
            {/* <pointLight position={[5, 5, 5]} color={0xff0000} intensity={1} /> */}
          {/* <Background /> */}
          {/* <Model /> */}
          {/* <mesh 
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5, 0]}
        receiveShadow 
      > */}
          {/* <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.5} />
      </mesh> */}
          {/* </Canvas>
        </Box> */}
          {selectedPlayer && (
            <Img
              src={`${API_SERVER}/${selectedPlayer}`}
              position={'fixed'}
              right={'300px'}
              bottom={'100px'}
              w={'200px'}
              h={'324px'}
            />
          )}
          {selectedNpc && (
            <Img
              src={selectedNpc}
              position={'fixed'}
              right={'500px'}
              bottom={'100px'}
              w={'200px'}
              h={'324px'}
            />
          )}
           {/* <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              > */}
          <Img className={'dialogue_image'} src={dial} />
          {!showNote && (
            <>
              <Box position={'relative'}>
                <Img
                  src={char}
                  position={'fixed'}
                  h={'100px'}
                  w={'30%'}
                  left={'5%'}
                  bottom={'105px'}
                />
                <Text
                  position={'fixed'}
                  left={'18%'}
                  bottom={'130px'}
                  fontSize={{ base: '30px', xl: '2.2vw' }}
                  fontWeight={500}
                  textAlign={'center'}
                  fontFamily={'AtlantisText'}
                  color={'#312821'}
                >
                  {data.blockRoll === 'Narrator'
                    ? data.blockRoll
                    : formData.gameNonPlayerName}
                </Text>
              </Box>
              <Box
                display={'flex'}
                position={'fixed'}
                alignItems={'center'}
                justifyContent={'space-between'}
                h={'61px'}
               
                overflowY={'scroll'}
                w={'85%'}
                fontSize={{ base: '30px', lg: '1.8vw' }}
                bottom={'38px'}
                fontFamily={'AtlantisContent'}
              >
                <TypingEffect text={data?.blockText} speed={50} />
              </Box>
              <Box
                display={'flex'}
                position={'fixed'}
                justifyContent={'space-between'}
                w={'95%'}
                bottom={'0'}
              >
                <Img
                  src={left}
                  w={'70px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => prevData(data)}
                />
                <Img
                  src={right}
                  w={'70px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => getData(data)}
                />
              </Box>
            </>
          )}
              {/* </motion.div> */}
        </Box>
      )}
      {data && type === 'Interaction' && (
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
                transition={{ duration: 0.5 }}
              >
              <Box position={'relative'} className="story_interaction_image">
                <Img src={parch} w={'auto'} h={'100%'} loading="lazy" />
                <Box
                  position={'absolute'}
                  top={{ base: '5%', md: '6%' }}
                  // h={'80% !important'}
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
                    h={'25%'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    fontWeight={500}
                    fontFamily={'AtlantisText'}
                    lineHeight={1}
                    w={'96%'}
                    overflowY={'scroll'}
                    marginTop={'15px'}
                  >
                    <Box className={'story_intraction_question'}>
                      {data?.blockText}
                    </Box>
                  </Box>
                  <Box
                    mt={'10px'}
                    w={'100%'}
                    h={'40%'}
                    fontWeight={500}
                    overflowY={'scroll'}
                    display={'flex'}
                    justifyContent={'center'}
                  >
                    <Box w={'60%'}>
                      {options &&
                        options.map((item: any, ind: number) => (
                          <Box
                            w={'100%'}
                            mb={'10px'}
                            lineHeight={1}
                            key={ind}
                            color={option === ind ? 'purple' : ''}
                            textAlign={'center'}
                            cursor={'pointer'}
                            onClick={() => optionClick(item, ind)}
                            fontFamily={'AtlantisText'}
                          >
                            <Img
                              src={option === ind ? on : off}
                              h={'4vh'}
                              w={'100%'}
                            />
                            <Box className={'story_interaction_option'}>
                              {item?.qpOptionText}
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
                    <Img
                      src={left}
                      className={'interaction_button'}
                      onClick={() => prevData(data)}
                    />
                    {option !== null && (
                       <Box  className={'blinking-wave'} onClick={() => InteractionFunction()} borderRadius={'50%'}>
                      <Img
                        src={right}
                        className={'interaction_button'}                       
                      />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              </motion.div>
            </GridItem>
          </Grid>
        </Box>
      )}
      {data && type === 'response' && (
        <Box className="chapter_potrait">
          <Img src={backGroundImg} className="dialogue_screen" />
          {/* <Box w={'100%'} h={'100vh'}>
        <Canvas camera={{ position: [30, 0, 10] }}>
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color={0xffccaa}
            castShadow
          />
          <ambientLight intensity={5.5} />
          {/* <pointLight position={[5, 5, 5]} color={0xff0000} intensity={1} /> */}
          {/* <Background /> */}
          {/* <Model /> */}
          {/* <mesh 
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -5, 0]}
      receiveShadow 
    > */}
          {/* <planeGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.5} />
    </mesh> */}
          {/* </Canvas>
      </Box> */}
          {selectedPlayer && (
            <Img
              src={`${API_SERVER}/${selectedPlayer}`}
              position={'fixed'}
              right={'300px'}
              bottom={'100px'}
              w={'200px'}
              h={'324px'}
            />
          )}
          {selectedNpc && (
            <Img
              src={selectedNpc}
              position={'fixed'}
              right={'500px'}
              bottom={'100px'}
              w={'200px'}
              h={'324px'}
            />
          )}
          <Img className={'dialogue_image'} src={dial} />
          {!showNote && (
            <>
              <Box position={'relative'}>
                <Img
                  src={char}
                  position={'fixed'}
                  h={'100px'}
                  w={'30%'}
                  left={'5%'}
                  bottom={'105px'}
                />
                <Text
                  position={'fixed'}
                  left={'18%'}
                  bottom={'130px'}
                  fontSize={{ base: '30px', xl: '2.2vw' }}
                  fontWeight={500}
                  textAlign={'center'}
                  fontFamily={'AtlantisText'}
                  color={'#312821'}
                >
                  {data.blockRoll === 'Narrator'
                    ? data.blockRoll
                    : formData.gameNonPlayerName}
                </Text>
              </Box>
              <Box
                display={'flex'}
                position={'fixed'}
                alignItems={'center'}
                justifyContent={'space-between'}
                h={'61px'}
                overflowY={'scroll'}
                w={'85%'}
                fontSize={{ base: '30px', lg: '1.8vw' }}
                bottom={'38px'}
                fontFamily={'AtlantisContent'}
              >
                <TypingEffect text={resMsg} speed={50} />
              </Box>
              <Box
                display={'flex'}
                position={'fixed'}
                justifyContent={'space-between'}
                w={'95%'}
                bottom={'0'}
              >
                <Img
                  src={left}
                  w={'70px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => prevData(data)}
                />
                <Img
                  src={right}
                  w={'70px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => getData(data)}
                />
              </Box>
            </>
          )}
        </Box>
      )}
      {data && type === 'feedback' && (
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
            className="story_note_grid"
          >
            <GridItem colSpan={1} position={'relative'}>
              <Box display={'flex'} justifyContent={'center'}>
                <Img src={feedi} className="story_note_image" loading="lazy" />
                <Box
                  className={'story_note_content'}
                  // bg={'blue.300'}
                >
                  <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                    <Box className={'story_note_block'}>
                      <Text textAlign={'center'}>{feed}</Text>
                    </Box>
                  </Box>
                  <Box
                    w={'100%'}
                    onClick={() => getData(data)}
                    mt={'20px'}
                    display={'flex'}
                    justifyContent={'center'}
                    cursor={'pointer'}
                    position={'fixed'}
                    top={'70%'}
                  >
                    <Img
                      src={next}
                      h={'7vh'}
                      className={'story_note_next_button'}
                    />
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      )}
    </>
  );
};
const Model: React.FC = () => {
  const groupRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, Sample);

  const mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[3]);

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
      <primitive object={gltf.scene} scale={[1, 1, 1]} position={[0, 20, -2]} />
    </group>
  );
};

// const Background: React.FC = () => {
//   const textureLoader = new THREE.TextureLoader();
//   const texture = textureLoader.load(bg);

//   const sphereRef = useRef<THREE.Mesh>();

//   // useFrame(() => {
//   //   // Rotate the background sphere
//   //   if (sphereRef.current) {
//   //     // sphereRef.current.rotation.x += 0.005;
//   //     sphereRef.current.rotation.y += 0.001;
//   //   }
//   // });

//   return (
//     <mesh ref={sphereRef}>
//       <sphereGeometry args={[500, 60, 30]} />
//       <meshBasicMaterial map={texture} side={THREE.BackSide} />
//     </mesh>
//   );
// };
export default Story;
