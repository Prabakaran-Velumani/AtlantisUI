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
import Sample from 'assets/img/games/collector.glb';
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
    // const [SpeedIsOver, setSpeedIsOver] = useState<any>(false);
    const [isPlayAudioConfirmation, setIsPlayAudioConfirmation] = useState<boolean>(false);

    const [score, setScore] = useState(null);

    useEffect(() => {
      getVoice(data, type);
      setShowNote(true);
      setTimeout(() => {
        setShowNote(false);
        getDataSection(data);
      }, 1000);
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
          // let optionsText = '';
          // options.forEach((item: any) => {
          //   optionsText +=
          //     '---Option ' + item?.qpOptions + '-' + item?.qpOptionText;
          //     console.log("optionsText",item?.qpOptionText)
          // });
          // text = blockInfo.blockText + optionsText;
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

    const stylerender = (Navigatenext === true && (data && type === 'Dialog')) ? '' : 'transform 0.3s ease-in-out, translateY 0.3s ease-in-out';
    const styletransform = (Navigatenext === true && (data && type === 'Dialog')) ? '' : `translateY(${showNote ? 200 : 0}px)`;
    useEffect(() => {
      if (Navigatenext === true) {
        getData(data);
      }
    }, [Navigatenext]);

    const getDataSection = (data: any) => {
      setShowTypingEffect(false);
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
      // Response 
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
      setRemainingSentences(concatenatedSentences);

      if (newRemainingSentences.length >= 1) {
        setCurrentPosition(currentPosition + concatenatedSentences.length);
        setNavigateNext(false);
      }
      if (newRemainingResponseSentences.length >= 1) {
        setCurrentPosition(currentPosition + concatenatedSentences.length);
        setNavigateNext(false);
      }
      else {
        setCurrentPosition(0);
        setNavigateNext(true);
        // getData(data);
      }
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
                <Img src={note} className="story_note_image" loading="lazy" />
                <Box
                  className={'story_note_content'}
                >
                  <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                    <Box
                      w={'65%'}
                      fontSize={{ base: '3.8vw', sm: '2.8vw', md: '1.8vw' }}
                      height={'20vh'}
                      overflowY={'auto'}
                      fontFamily={'AtlantisContent'}
                      color={'#D9C7A2'}
                      display={'flex'}
                      justifyContent={'center'}
                      className={'story_note_content'}
                    >
                      <Text textAlign={'center'}>
                        {remainingSentences}
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    w={'100%'}
                    onClick={() => getDataSection(data)}
                    mt={'20px'}
                    display={'flex'}
                    justifyContent={'center'}
                    cursor={'pointer'}
                    position={'fixed'}
                    top={'70%'}
                  >
                    <Img src={next} h={'7vh'} className={'story_note_next_button'} />
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        )}
        {data && type === 'Dialog' && (
          <Box
            w={'100%'}
            h={'100vh'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'relative'}
            className="chapter_potrait"
          >
            <Img
              src={backGroundImg}
              maxW={'100%'}
              maxH={'100%'}
              w={'100%'}
              h={'100vh'}
              transform={'scale(1.3}) translateY(-10%) translateX(-10%)'}
              transition={'transform 0.9s ease-in-out'}
            />
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
            <Img
              style={{
                transform: `translateY(${showNote ? 200 : 0}px)`,
                transition:
                  'transform 0.3s ease-in-out, translateY 0.3s ease-in-out',
              }}
              position={'fixed'}
              maxW={'100%'}
              maxH={'100%'}
              w={'100%'}
              h={'180px'}
              bottom={'0'}
              src={dial}
            />
            {!showNote && (
              <>
                <Box position={'relative'}>
                  <Img
                    src={char}
                    position={'fixed'}
                    h={'100px'}
                    w={'30%'}
                    left={'5%'}
                    bottom={'93px'}
                  />
                  <Text
                    position={'fixed'}
                    left={'18%'}
                    bottom={'118px'}
                    fontSize={'2.8vw'}
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
                  fontSize={'2vw'}
                  bottom={'38px'}
                  fontFamily={'AtlantisContent'}
                >
                  {/* <TypingEffect text={data?.blockText} speed={50} /> */}
                  {/* <TypingEffect text={remainingSentences} speed={50} /> */}
                  {showTypingEffect === false ? <TypingEffect
                    text={remainingSentences.toString()}
                    speed={50}
                    setSpeedIsOver={setShowTypingEffect}
                  /> : remainingSentences}
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
                    onClick={() => Updatecontent()}
                  />
                </Box>
              </>
            )}
          </Box>
        )}

        {data && type === 'Interaction' && (
          <Interaction backGroundImg={backGroundImg} data={data} option={option} options={options} optionClick={optionClick} prevData={prevData} InteractionFunction={InteractionFunction} />
        )}
        {data && type === 'response' && (
          <Box
            w={'100%'}
            h={'100vh'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'relative'}
            className="chapter_potrait"
          >
            <Img
              src={backGroundImg}
              maxW={'100%'}
              maxH={'100%'}
              w={'100%'}
              h={'100vh'}
              transform={'scale(1.3}) translateY(-10%) translateX(-10%)'}
              transition={'transform 0.9s ease-in-out'}
            />
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
            <Img
              style={{
                transform: `translateY(${showNote ? 200 : 0}px)`,
                transition:
                  'transform 0.3s ease-in-out, translateY 0.3s ease-in-out',
              }}
              position={'fixed'}
              maxW={'100%'}
              maxH={'100%'}
              w={'100%'}
              h={'180px'}
              bottom={'0'}
              src={dial}
            />
            {!showNote && (
              <>
                <Box position={'relative'}>
                  <Img
                    src={char}
                    position={'fixed'}
                    h={{ base: '75px', md: '100px' }}
                    w={'30%'}
                    left={'5%'}
                    bottom={'93px'}
                  />
                  <Text
                    position={'fixed'}
                    left={'18%'}
                    bottom={'118px'}
                    fontSize={'2.8vw'}
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
                  fontSize={'2vw'}
                  bottom={'38px'}
                  fontFamily={'AtlantisContent'}
                >
                  {/* <TypingEffect text={resMsg} speed={50} /> */}
                  {showTypingEffect === false ? <TypingEffect
                    text={remainingSentences.toString()}
                    speed={50}
                    setSpeedIsOver={setShowTypingEffect}
                  /> : remainingSentences}
                </Box>
                <Box
                  display={'flex'}
                  position={'fixed'}
                  justifyContent={'flex-end'}
                  w={'95%'}
                  bottom={'0'}
                >
                  <Img
                    src={right}
                    w={'70px'}
                    h={'50px'}
                    cursor={'pointer'}
                    onClick={() => Updatecontent()}
                  />
                </Box>
              </>
            )}
          </Box>
        )}
        {data && type === 'feedback' && (
          <Box
            w={'100%'}
            h={'100vh'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'relative'}
            overflow={'visible'}
            style={{ perspective: '1000px' }}
            className="chapter_potrait"
          >
            <Box
              backgroundImage={backGroundImg}
              w={'100%'}
              h={'100vh'}
              backgroundRepeat={'no-repeat'}
              backgroundSize={'cover'}
              transform={`scale(${first ? 1 : 1.3}) translateY(${first ? 0 : -10
                }%) translateX(${first ? 0 : -10}%)`}
              transition={'transform 0.9s ease-in-out'}
            >
              <Box
                position={'fixed'}
                top={'200px'}
                right={'0px'}
                bottom={0}
                zIndex={999}
                w={'300px'}
              >
              </Box>
            </Box>
            <Box
              style={{
                transform: `scale(${showNote ? 0.2 : 1})`,
                transition: 'transform 0.5s ease-in-out',
              }}
              position={'fixed'}
              w={'40%'}
              h={'80vh'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              className="story_feedback"
            >
              <Img w={'90%'} h={'80vh'} src={feedi} />
              <Box
                position={'fixed'}
                w={'50%'}
                mt={'10px'}
                display={'flex'}
                flexDirection={'column'}
                textAlign={'center'}
                justifyContent={'center'}
                style={{
                  fontWeight: '900',
                  color: '#D9C7A2',
                }}
                fontFamily={'AtlantisContent'}
              >
                {feed}
                <Box
                  w={'100%'}
                  onClick={() => getData(data)}
                  mt={'20px'}
                  display={'flex'}
                  justifyContent={'center'}
                  cursor={'pointer'}
                  transform={{
                    base: 'translate(0px, 60px)',
                    md: 'translate(0px, 100px)',
                  }}
                >
                  <Img src={next} w={'200px'} h={'60px'} />
                </Box>
              </Box>
            </Box>
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
