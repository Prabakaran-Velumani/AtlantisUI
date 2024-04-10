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
import Interaction from './Interaction';
import TypingEffect from './Typing';
import { getVoiceMessage, getPreview } from 'utils/game/gameService';
import { useParams } from 'react-router-dom';
// Import ProfileContext from EntirePreview
import { ProfileContext } from '../EntirePreview';
import { motion } from 'framer-motion';
import { API_SERVER, Notelength, Dialoglength, Responselength } from 'config/constant';
import { ScoreContext } from '../GamePreview';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import Sample from 'assets/img/games/agent.glb';
import { useLayoutEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Story: React.FC<{
  prevData?: any;
  currentScore: any;
  data: any;
  type: any;
  profileData: any;
  backGroundImg: any;
  getData: any;
  option: any;
  options: any;
  handleValidate: any;
  resMsg: any;
  feed: any;
  setIsGetsPlayAudioConfirmation: any;
  isGetsPlayAudioConfirmation: any;
  formData: any;
  setAudio: any;
  setAudioObj: any;
  setCurrentScreenId: any;
  selectedPlayer: any;
  selectedNpc: any;
  getAudioForText: any;
  voiceIds: any;
  windowWidth: any;
  windowHeight: any;
  setIsPrevNavigation: any;
  isPrevNavigation: any;
  setNavTrack: any;
  navTrack: any;
  setCurrentTrackPointer: any;
  gameInfo: any;
  preloadedAssets: any;
}> = ({
  data,
  type,
  resMsg,
  feed,
  getData,
  profileData,
  option,
  options,
  setAudioObj,
  handleValidate,
  backGroundImg,
  formData,
  setCurrentScreenId,
  setAudio,
  selectedPlayer,
  setIsGetsPlayAudioConfirmation,
  isGetsPlayAudioConfirmation,
  selectedNpc,
  getAudioForText,
  voiceIds,
  currentScore,
  prevData,
  windowWidth,
  windowHeight,
  setIsPrevNavigation,
  isPrevNavigation,
  setNavTrack,
  navTrack,
  setCurrentTrackPointer,
  gameInfo,
  preloadedAssets
}) => {
    const [showNote, setShowNote] = useState(true),
      [first, setFirst] = useState(false);
    // const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const userProfile = useContext(ProfileContext);
    const { profile, setProfile } = useContext(ScoreContext);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [remainingSentences, setRemainingSentences] = useState<any[]>([]);
    const [Navigatenext, setNavigateNext] = useState<any>(false);
    const [showTypingEffect, setShowTypingEffect] = useState<any>(false);
    const [isPlayAudioConfirmation, setIsPlayAudioConfirmation] = useState<boolean>(false);
    const [score, setScore] = useState(null);
    useEffect(() => {
      if (data && type) {
        getVoice(data, type);
        setShowNote(true);
        setTimeout(() => {
          setShowNote(false);
          getDataSection(data);
        }, 1000);

        /** this logic is used to hanlde the navigation options in both forward and backward navigation */
        if (gameInfo.hasOwnProperty('blocks')) {
          let previousPrimarySeq = navTrack[navTrack.length - 1];
          if (previousPrimarySeq) {
            let currentQuest = previousPrimarySeq.split('.')[0];
            let previousBlock: any = Object.values(gameInfo?.blocks[currentQuest])?.find((row: any) => {
              // let previousBlock : any = Object.values(gameInfo?.blocks[profile?.currentQuest])?.find((row: any)=> {
              return row.blockPrimarySequence == previousPrimarySeq
            });
            if (data.blockPrimarySequence != previousPrimarySeq) {
              if (previousBlock?.blockChoosen === 'Interaction') {
                setNavTrack([data.blockPrimarySequence]);
              }
              else {
                const newArray = navTrack;
                newArray.push(data.blockPrimarySequence);
                setNavTrack(newArray);
              }
            }
          }
          else {
            setNavTrack([data.blockPrimarySequence]);
          }
        }
      }
    }, [data, type]);

    useEffect(() => {
      setFirst(true);
      setTimeout(() => {
        setFirst(false);
        setShowNote(false);
      }, 1000);
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        if (profileData?.Audiogetlanguage.length !== 0) {
          // if(AudioOptions.qpOptionId ==='')
          // {
          const GetblocktextAudioFiltered = profileData?.Audiogetlanguage.filter((key: any) => key?.textId === data?.blockId);
          if (GetblocktextAudioFiltered.length > 0) {
            const FilteredFieldName = GetblocktextAudioFiltered.map((item: any) => item.fieldName);
            if (FilteredFieldName[0] === 'blockText') {
              const audioUrls = GetblocktextAudioFiltered.map((item: any) => JSON.parse(item.audioUrls)[0]?.audioUrl);
              const relativePath = audioUrls[0].split('\\uploads\\')[1];
              const normalizedPath = relativePath.replace(/\\/g, '/');
              const fullUrl = `${API_SERVER}/uploads/${normalizedPath}`;
              const responseblockText = await fetch(fullUrl);
              if (responseblockText.ok) {
                setAudioObj({
                  url: fullUrl,
                  type: 'bgm',
                  volume: '0.5',
                  loop: true,
                  autoplay: true,
                });
                setIsGetsPlayAudioConfirmation(true);
              }

            }
          }
          // }
          // else{
          // console.log(' =>', AudioOptions);
          // if (AudioOptions.qpOptionId) {
          //   const optionAudioFiltered = profileData?.Audiogetlanguage.filter((key: any) => key?.textId === AudioOptions?.qpOptionId);
          //   console.log('1 =>',optionAudioFiltered,'.....', AudioOptions);
          //   if (optionAudioFiltered.length > 0) {
          //     const getoptionsAudioFiltered = optionAudioFiltered.filter((key: any) => key?.fieldName === 'qpOptionText');
          //     console.log('2 =>',getoptionsAudioFiltered);
          //     if (getoptionsAudioFiltered.length > 0) {
          //       const QOTaudioUrls = getoptionsAudioFiltered.map((item: any) => JSON.parse(item.audioUrls)[0]?.audioUrl);
          //       console.log('3 =>',QOTaudioUrls);
          //       if (QOTaudioUrls.length > 0) {
          //         const relativePath = QOTaudioUrls[0].split('\\uploads\\')[1];
          //         const normalizedPath = relativePath.replace(/\\/g, '/');
          //         const qpOptionTextUrl = `${API_SERVER}/uploads/${normalizedPath}`;
          //         const responseqpOptionText = await fetch(qpOptionTextUrl);
          //         console.log('4 =>',responseqpOptionText,qpOptionTextUrl);
          //         if (responseqpOptionText.ok) {
          //           setAudioObj({
          //             url: qpOptionTextUrl,
          //             type: 'bgm',
          //             volume: '0.5',
          //             loop: true,
          //             autoplay: true,
          //           });
          //           setIsGetsPlayAudioConfirmation(true);
          //         }
          //         else {
          //           const getAudioFiltered1 = optionAudioFiltered.filter((key: any) => key?.fieldName === "qpOptions");
          //           if (getAudioFiltered1.length > 0) {
          //             const QPaudioUrls = getAudioFiltered1.map((item: any) => JSON.parse(item.audioUrls)[0]?.audioUrl);
          //             if (QPaudioUrls.length > 0) {
          //               const relativePath = QPaudioUrls[0].split('\\uploads\\')[1];
          //               const normalizedPath = relativePath.replace(/\\/g, '/');
          //               const qpOptionsUrl = `${API_SERVER}/uploads/${normalizedPath}`;
          //               const responsequestoption = await fetch(qpOptionsUrl);
          //               console.log('4 =>',responsequestoption);
          //               if (responsequestoption.ok) {
          //                 setAudioObj({
          //                   url: qpOptionsUrl,
          //                   type: 'bgm',
          //                   volume: '0.5',
          //                   loop: true,
          //                   autoplay: true,
          //                 });
          //                 setIsGetsPlayAudioConfirmation(true);
          //               }
          //               else
          //               {
          //                 setAudioObj({
          //                   url: '',
          //                   type: 'bgm',
          //                   volume: '0.5',
          //                   loop: true,
          //                   autoplay: true,
          //                 });
          //                 setIsGetsPlayAudioConfirmation(false);
          //               }

          //             }
          //           }
          //         }

          //       }
          //     }
          //   }

          // }
          //   setAudioObj({
          //     url: '',
          //     type: 'bgm',
          //     volume: '0.5',
          //     loop: true,
          //     autoplay: true,
          //   });
          //   setIsGetsPlayAudioConfirmation(false);

          // }

        }
        // else {

        //   setAudioObj({
        //     autoplay: false,
        //   });
        //   setIsGetsPlayAudioConfirmation(false);
        // }
      };
      fetchData();
    }, [profileData, data]);


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
          // Sort the options array based on a unique identifier, such as index
          options.sort((a: any, b: any) => a.index - b.index);
          options.forEach((item: any) => {
            optionsText += '---Option ' + item?.qpOptions + '-' + item?.qpOptionText;
          });

          text = blockInfo.blockText + optionsText;
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
      setIsGetsPlayAudioConfirmation(true);
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


    const stylerender = (Navigatenext === true && (data && type === 'Dialog')) ? '' : 'transform 0.3s ease-in-out, translateY 0.3s ease-in-out';
    const styletransform = (Navigatenext === true && (data && type === 'Dialog')) ? '' : `translateY(${showNote ? 200 : 0}px)`;
    useEffect(() => {
      if (Navigatenext === true) {
        getData(data);
      }
    }, [Navigatenext]);

    const getDataSection = (data: any) => {
      // console.log("data", data);
      showTypingEffect === true && setShowTypingEffect(false);
      setCurrentPosition(0);
      // Note and Dialog
      const content = data?.blockText || '';
      const sentences = content.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
      const newRemainingSentences = sentences.slice(currentPosition);

      // response
      const Responsecontent = resMsg || '';
      const Responsesentences = Responsecontent.split(
        /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/,
      );
      const newRemainingResponseSentences = Responsesentences.slice(currentPosition);
      const concatenatedSentences = [];
      let totalLength = 0;
      // Note and Dialog
      if (type !== 'response') {
        for (let i = 0; i < newRemainingSentences.length; i++) {
          const sentence = newRemainingSentences[i];

          if (data && type === 'Note') {
            if (totalLength + sentence.length <= Notelength) {
              concatenatedSentences.push(sentence);
              totalLength += sentence.length;
            } else {
              concatenatedSentences.push(sentence);
              break;
            }
          }
          if (data && type === 'Dialog') {
            if (totalLength + sentence.length <= Dialoglength) {
              concatenatedSentences.push(sentence);
              totalLength += sentence.length;
            } else {
              if (totalLength + sentence.length >= Dialoglength) {
                break;
              }
              concatenatedSentences.push(sentence);
              break;
            }
          }
        }
      }
      // Response 
      if (type === 'response') {
        for (let i = 0; i < newRemainingResponseSentences.length; i++) {
          const ressentence = newRemainingResponseSentences[i];
          if (data && type === 'response') {
            if (totalLength + ressentence.length <= Responselength) {
              concatenatedSentences.push(ressentence);
              totalLength += ressentence.length;
            } else {
              if (totalLength + ressentence.length >= Responselength) {
                break;
              }
              concatenatedSentences.push(ressentence);
              break;
            }
          }
        }
      }
      setRemainingSentences(concatenatedSentences);
      if (newRemainingSentences.length > 0 && type !== 'response') {
        setCurrentPosition(currentPosition + concatenatedSentences.length);
        setNavigateNext(false);
        return false;
      }
      if (newRemainingResponseSentences.length > 0) {
        setCurrentPosition(currentPosition + concatenatedSentences.length);
        setNavigateNext(false);
        return false;
      }
      setNavigateNext(true);
      setIsPrevNavigation(false);
    };

    const Updatecontent = () => {
      if (showTypingEffect === false) {
        setShowTypingEffect(true);
      }
      else {
        getDataSection(data);
      }
    }

    useEffect(() => {
      getDataSection(data);
    }, []);

    const getNoteNextData = () => {
      setIsPrevNavigation(false);
      getDataSection(data)
    }


    const SkipContentForBackNavigation = () => {
      if (showTypingEffect === false) {
        setShowTypingEffect(true);
      }
      else {
        setCurrentPosition(0);
        prevData(data)
      }
    }

    return (
      <>
        {data && type === 'Note' && (
          <Box
            position="relative"
            maxW="100%"
            w={'100vw'}
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
                    <Img src={preloadedAssets.note} className="story_note_image" loading="lazy" />
                    <Box
                      className={'story_note_content'}
                    // bg={'blue.300'}
                    >
                      <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                        <Box className={'story_note_block'}>
                          <Text textAlign={'center'}>
                            {remainingSentences}
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        w={'100%'}
                        onClick={() => getNoteNextData()}
                        mt={'20px'}
                        display={'flex'}
                        justifyContent={'center'}
                        cursor={'pointer'}
                        position={'fixed'}
                        top={'70%'}
                      >
                        <Img src={preloadedAssets.next} h={'7vh'} className={'story_note_next_button'} />
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
            {selectedPlayer && (
              <Img
                src={`${API_SERVER}/${selectedPlayer}`}
                className={'narrator_character_image'}
              />
            )}
            {selectedNpc && (
              <Img
                src={selectedNpc}
                className={'player_character_image'}
              />
            )}
            <Img className={'dialogue_image'} src={preloadedAssets.dial} />
            <Box position={'relative'}>
              <Img
                src={preloadedAssets.char}
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
              fontSize={{ base: '30px', xl: '2.2vw' }}
              bottom={'38px'}
              fontFamily={'AtlantisContent'}
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
              {showTypingEffect === false ? <TypingEffect
                text={remainingSentences.toString()}
                speed={50}
                setSpeedIsOver={setShowTypingEffect}
              /> : remainingSentences}
            </Box>
            <Box
              display={'flex'}
              position={'fixed'}
              justifyContent={navTrack.length > 1 ? 'space-between' : 'end'}
              w={'95%'}
              bottom={'0'}
            >
              {navTrack.length > 1 &&
                <Img
                  src={preloadedAssets.left}
                  w={'70px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => { SkipContentForBackNavigation() }}
                />
              }
              <Img
                src={preloadedAssets.right}
                w={'70px'}
                h={'50px'}
                cursor={'pointer'}
                onClick={() => Updatecontent()}
              />
            </Box>
            {/* </>
          )} */}
            {/* </motion.div> */}
          </Box>
        )}
        {data && type === 'Interaction' && (
          <Interaction backGroundImg={backGroundImg} data={data} option={option} options={options} optionClick={optionClick} prevData={prevData} InteractionFunction={InteractionFunction} navTrack={navTrack} preloadedAssets={preloadedAssets} selectedPlayer={selectedPlayer} />
        )}
        {data && type === 'response' && (
          <Box
            className="chapter_potrait"
          >
            <Img src={backGroundImg} className="dialogue_screen" />
            {selectedPlayer && (
              <Img
                src={`${API_SERVER}/${selectedPlayer}`}
                className={'narrator_character_image'}
              />
            )}
            {selectedNpc && (
              <Img
                src={selectedNpc}
                className={'player_character_image'}
              />
            )}
            <Img className={'dialogue_image'} src={preloadedAssets.dial} />
            <Box position={'relative'}>
              <Img
                src={preloadedAssets.char}
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
              w={'85%'}
              fontSize={{ base: '30px', lg: '1.8vw' }}
              bottom={'38px'}
              fontFamily={'AtlantisContent'}
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
              {showTypingEffect === false ? <TypingEffect
                text={remainingSentences.toString()}
                speed={50}
                setSpeedIsOver={setShowTypingEffect}
              /> : remainingSentences}
            </Box>
            <Box
              display={'flex'}
              position={'fixed'}
              justifyContent={'end'}
              w={'95%'}
              bottom={'0'}
            >
              <Img
                src={preloadedAssets.right}
                w={'70px'}
                h={'50px'}
                cursor={'pointer'}
                // onClick={() => {setCurrentPosition(0);getDataSection(data)}}
                onClick={() => Updatecontent()}
              />
            </Box>
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
                  <Img src={preloadedAssets.feedi} className="story_note_image" loading="lazy" />
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
                        src={preloadedAssets.next}
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
      <primitive object={gltf.scene}  />
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
