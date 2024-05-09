// Chakra Imports
import {
  Box,
  Grid,
  GridItem,
  Img,
  Text,
} from '@chakra-ui/react';

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import Interaction from './Interaction';
import TypingEffect from './Typing';
// import { getVoiceMessage, getPreview } from 'utils/game/gameService';
import { ProfileContext } from '../EntirePreview';
import { motion } from 'framer-motion';
import {
  API_SERVER
} from 'config/constant';
import { ScoreContext } from '../GamePreview';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import Sample from 'assets/img/games/Merlin.glb';
import { useLayoutEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import Model from './Model';

const Story: React.FC<{
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
  formData: any;
  setAudioObj: any;
  selectedPlayer: any;
  selectedNpc: any;
  voiceIds: any;
  setIsPrevNavigation: any;
  setNavTrack: any;
  navTrack: any;
  gameInfo: any;
  preloadedAssets: any;
  questState: any;
  LastModiPrevData: any;
  setPreLogDatas: any;
  getPrevLogDatas: any;
  RepeatSelectOption:any;
  RepeatPrevOption:any;
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
  selectedPlayer,
  setIsGetsPlayAudioConfirmation,
  selectedNpc,
  // getAudioForText,
  voiceIds,
  setIsPrevNavigation,
  setNavTrack,
  navTrack,
  gameInfo,
  preloadedAssets,
  questState,
  LastModiPrevData,
  getPrevLogDatas,
  setPreLogDatas,
  RepeatSelectOption,
  RepeatPrevOption,
}) => {
    const [showNote, setShowNote] = useState(true),
      [first, setFirst] = useState(false);
    // const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const userProfile = useContext(ProfileContext);
    const { profile, setProfile } = useContext(ScoreContext);
    const [showTypingEffect, setShowTypingEffect] = useState<any>(false);
    const [AudioOptions, SetAudioOptions] = useState({ qpOptionId: '' });
    const [score, setScore] = useState(null);
    const [interactionNext, setInteractionNext] = useState(null);


    useEffect(() => {
      if (data && type) {
        // getVoice(data, type);
        setShowNote(true);
        setShowTypingEffect(false);
        setTimeout(() => {
          setShowNote(false);
          interactionNext === true && setInteractionNext(false);
        }, 1000);
        const currentQuest = data
          ? parseInt(data?.blockPrimarySequence.split('.')[0])
          : null;
        
          if (getPrevLogDatas.nevigatedSeq[currentQuest]) {
            if (!getPrevLogDatas.nevigatedSeq[currentQuest].includes(data.blockPrimarySequence)) {
    
              setPreLogDatas((prev: any) => ({
                ...prev,
                lastActiveBlockSeq: data.blockId,
                nevigatedSeq: { ...prev.nevigatedSeq, [currentQuest]: [...(prev.nevigatedSeq[currentQuest] || []), data.blockPrimarySequence] }
                
              }));
            }
    
          }
          else {
            setPreLogDatas((prev: any) => ({
              ...prev,
              lastActiveBlockSeq: data.blockId,
              nevigatedSeq: { ...prev.nevigatedSeq, [currentQuest]: [data.blockPrimarySequence] }
            }));
    
          }
    
        if (gameInfo.hasOwnProperty('blocks')) {
          let previousPrimarySeq = navTrack[navTrack.length - 1];
          if (previousPrimarySeq) {
            let currentQuest = previousPrimarySeq.split('.')[0];
            let previousBlock: any = Object.values(
              gameInfo?.blocks[currentQuest],
            )?.find((row: any) => {
              return row.blockPrimarySequence == previousPrimarySeq;
            });
            if (data.blockPrimarySequence != previousPrimarySeq) {
              if (previousBlock?.blockChoosen === 'Interaction') {
                setNavTrack([data.blockPrimarySequence]);
              } else {
              const newArray = navTrack;
              newArray.push(data.blockPrimarySequence);
              setNavTrack(newArray);
               }
            }
          } else {
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
    console.log('profileData',profileData);
/*
    useEffect(() => {
      const fetchData = async () => {
        if (profileData?.Audiogetlanguage.length !== 0) {
          if (AudioOptions.qpOptionId === '') {
            const GetblocktextAudioFiltered =
              profileData?.Audiogetlanguage.filter(
                (key: any) => key?.textId === data?.blockId,
              );
            if (GetblocktextAudioFiltered.length > 0) {
              const FilteredFieldName = GetblocktextAudioFiltered.map(
                (item: any) => item.fieldName,
              );
              if (FilteredFieldName[0] === 'blockText') {
                const audioUrls = GetblocktextAudioFiltered.map(
                  (item: any) => JSON.parse(item.audioUrls)[0]?.audioUrl,
                );
                const normalizedPath = audioUrls[0];
                const fullUrl = `${API_SERVER}${normalizedPath}`;
                const responseblockText = await fetch(fullUrl);
                if (responseblockText.ok) {
                  setAudioObj({
                    url: fullUrl,
                    type: 'api',
                    volume: '0.5',
                    loop: false,
                    autoplay: true,
                  });
                  setIsGetsPlayAudioConfirmation(true);
                }
              }
            }
          } else {
            if (AudioOptions.qpOptionId) {
              const optionAudioFiltered = profileData?.Audiogetlanguage.filter(
                (key: any) => key?.textId === AudioOptions?.qpOptionId,
              );
              if (optionAudioFiltered.length > 0) {
                const getoptionsAudioFiltered = optionAudioFiltered.filter(
                  (key: any) => key?.fieldName === 'qpOptionText',
                );
                if (getoptionsAudioFiltered.length > 0) {
                  const QOTaudioUrls = getoptionsAudioFiltered.map(
                    (item: any) => JSON.parse(item.audioUrls)[0]?.audioUrl,
                  );

                  if (QOTaudioUrls.length > 0) {
                    // const relativePath = QOTaudioUrls[0].split('\\uploads\\')[1];
                    // const normalizedPath = relativePath.replace(/\\/g, '/');
                    const normalizedPath = QOTaudioUrls[0];
                    // const qpOptionTextUrl = `${API_SERVER}/uploads/${normalizedPath}`;
                    const qpOptionTextUrl = `${API_SERVER}${normalizedPath}`;
                    const responseqpOptionText = await fetch(qpOptionTextUrl);
                    if (responseqpOptionText.ok) {
                      setAudioObj({
                        url: qpOptionTextUrl,
                        type: 'api',
                        volume: '0.5',
                        loop: false,
                        autoplay: true,
                      });
                      setIsGetsPlayAudioConfirmation(true);
                    } else {
                      const getAudioFiltered1 = optionAudioFiltered.filter(
                        (key: any) => key?.fieldName === 'qpOptions',
                      );
                      if (getAudioFiltered1.length > 0) {
                        const QPaudioUrls = getAudioFiltered1.map(
                          (item: any) => JSON.parse(item.audioUrls)[0]?.audioUrl,
                        );
                        if (QPaudioUrls.length > 0) {
                          const normalizedPath = QPaudioUrls[0];
                          const qpOptionsUrl = `${API_SERVER}${normalizedPath}`;
                          const responsequestoption = await fetch(qpOptionsUrl);
                          if (responsequestoption.ok) {
                            setAudioObj({
                              url: qpOptionsUrl,
                              type: 'api',
                              volume: '0.5',
                              loop: false,
                              autoplay: true,
                            });
                            setIsGetsPlayAudioConfirmation(true);
                          } else {
                            setAudioObj({
                              url: '',
                              type: 'bgm',
                              volume: '0.5',
                              loop: true,
                              autoplay: true,
                            });
                            setIsGetsPlayAudioConfirmation(false);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          setAudioObj({
            autoplay: false,
          });
          setIsGetsPlayAudioConfirmation(false);
        }
      };
      fetchData();

    }, [profileData, data, AudioOptions]);
    */
/*
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
           /*
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
            optionsText +=
              '---Option ' + item?.qpOptions + '-' + item?.qpOptionText;
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
      // getAudioForText(text, voiceId);
    };
*/
    const InteractionFunction = () => {
      setIsGetsPlayAudioConfirmation(true);
      
      if (questState[profile?.currentQuest] === 'Started') {
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
      }
      else {
        // update the replayScore when a player want to replay. Scores were hanlded seperatly, after Quest completion, if the calculated total score is lesser than replay score total then replace the score by replayscore, other wise score not changed, then reset the replayscore to {}
        setProfile((prev: any) => {
          const { seqId, score: newScore } = score;
          const index = prev.replayScore.findIndex((item: any) => item.seqId === seqId);
          if (index !== -1) {
            const updatedScore = [...prev.replayScore];
            updatedScore[index] = { ...updatedScore[index], score: newScore };
            return { ...prev, replayScore: updatedScore };
          } else {
            const newScoreArray = [
              ...prev.replayScore,
              {
                seqId: seqId,
                score: newScore,
                quest: parseInt(seqId.split('.')[0]),
              },
            ];
            return { ...prev, replayScore: newScoreArray };
          }
        });
      }
      setInteractionNext(true);
    };

    useEffect(() => {
      if (interactionNext === true) {
        setInteractionNext(false);
        getData(data);
      }
    }, [interactionNext])


    const optionClick = (item: any, ind: any) => {
      setScore({ seqId: item?.qpSequence, score: parseInt(item?.qpScore) });
      SetAudioOptions(item);
      handleValidate(item, ind);
    };

    const Updatecontent = () => {
      if (showTypingEffect === false) {
        setShowTypingEffect(true);
      } else {
        getData(data);
      }
    };


    const getNoteNextData = () => {
      setIsPrevNavigation(false);
      getData(data);
    };

    const SkipContentForBackNavigation = () => {
      if (showTypingEffect === false) {
        setShowTypingEffect(true);
      } else {
          LastModiPrevData(data);
      
      }
      
    };



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
                    <Img
                      src={preloadedAssets.note}
                      className="story_note_image"
                      loading="lazy"
                    />

                    <Box className={'note_align'}>
                      <Text textAlign={'center'} className="note_title">
                        Note
                      </Text>
                    </Box>
                    <Box
                      className={'story_note_content'}
                    // bg={'blue.300'}
                    >
                      <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                        <Box className={'story_note_block'}>
                          <Text textAlign={'center'}>
                            {data?.blockText}
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
                      <Box
                        display={'flex'}
                        position={'fixed'}
                        justifyContent={navTrack.length > 1 ? 'space-between' : 'end'}
                        w={'95%'}
                        bottom={'0'}
                      >

                        <Img
                          src={preloadedAssets.left}
                          w={'70px'}
                          h={'50px'}
                          cursor={'pointer'}
                          // onClick={() => { SkipContentForBackNavigation() }}
                          onClick={() => {  LastModiPrevData(data)}}
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
            {selectedNpc && (
              <Box className={'player_character_image'}>
                <Canvas camera={{ position: [0, 1, 9] }} > {/* For Single view */}
                  {/* <Environment preset={"park"} background />   */}
                  <directionalLight position={[2.0, 78.0, 100]} intensity={0.8} color={'ffffff'} castShadow />
                  <ambientLight intensity={0.5} />
                  {/* <OrbitControls   />  */}
                  <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />

                  {/* COMPONENTS */}
                  <Player />
                  <Model position={[-3, -1.8, 5]} rotation={[0, 1, 0]} />
                  {/* <Sphere position={[0,0,0]} size={[1,30,30]} color={'orange'}  />   */}
                  {/* <Trex position={[0,0,0]} size={[1,30,30]} color={'red'}  />             */}
                  {/* <Parrot /> */}
                </Canvas>
              </Box>
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
                {data.blockRoll === 'Narrator' ? data.blockRoll : (data.blockRoll === '999999' ? formData.gameNonPlayerName : profileData.name)}
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
              <Box transform={'translateY(16%)'}>
                {showTypingEffect === false ? <TypingEffect
                  text={data?.blockText}
                  speed={50}
                  setSpeedIsOver={setShowTypingEffect}
                /> : data?.blockText}
              </Box>
            </Box>
            <Box
              display={'flex'}
              position={'fixed'}
              justifyContent={navTrack.length > 1 ? 'space-between' : 'end'}
              w={'95%'}
              bottom={'0'}
            >
              {/* {navTrack.length > 1 &&
                <Img
                  src={preloadedAssets.left}
                  w={'70px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => { SkipContentForBackNavigation() }}
                />
              } */}
              <Img
                src={preloadedAssets.left}
                w={'70px'}
                h={'50px'}
                cursor={'pointer'}
                onClick={() => { SkipContentForBackNavigation() }}
              />
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
          <Interaction backGroundImg={backGroundImg} data={data} option={option} options={options} optionClick={optionClick}  InteractionFunction={InteractionFunction} navTrack={navTrack} preloadedAssets={preloadedAssets} selectedPlayer={selectedPlayer}  LastModiPrevData={LastModiPrevData}  RepeatSelectOption={RepeatSelectOption}  RepeatPrevOption={RepeatPrevOption}
          />
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
                {data.blockResponseRoll === 'Narrator' ? data.blockResponseRoll : (data.blockResponseRoll === '999999' ? profileData.name : formData.gameNonPlayerName)}
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
              {showTypingEffect === false ? <TypingEffect
                text={resMsg}
                speed={50}
                setSpeedIsOver={setShowTypingEffect}
              /> : resMsg}
            </Box>
            <Box
              display={'flex'}
              position={'fixed'}
              justifyContent={'end'}
              w={'95%'}
              bottom={'0'}
            >
              <Img
                src={preloadedAssets.left}
                w={'70px'}
                h={'50px'}
                cursor={'pointer'}
              onClick={() => { SkipContentForBackNavigation() }}
              // onClick={() => prevData(data)}
              />
              <Img
                src={preloadedAssets.right}
                w={'70px'}
                h={'50px'}
                cursor={'pointer'}
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
                          <Box className='feed_list'> Interaction </Box>
                          <Box w={'70%'} h={'75%'} overflowY={'scroll'} className='feedback_content_text'>
                            {/* <Box display={'flex'}>
                             <Img src={preloadedAssets.qs} h={'1em'} w={'1em'}  />
                             This way, you can increase the RGB color intensity of the GLTF/GLB model while using an HDR environment map in your React Three Fiber scene. Adjust the values as needed to achieve the desired color intensity.
                           </Box>
                           <Box display={'flex'} mt={'10px'}>
                             <Img src={preloadedAssets.ANS} h={'1em'} w={'1em'}  />
                              Adjust the values as needed to achieve the desired color intensity.
                           </Box> */}
                            <Box display={'flex'} mt={'10px'}>
                              <Img src={preloadedAssets.FB} h={'1em'} w={'1em'} />
                              <Text textAlign={'justify'}>{feed}</Text>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          w={'100%'}
                          onClick={() => getData(data)}
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
                        <Box
                        display={'flex'}
                        position={'fixed'}
                        justifyContent={navTrack.length > 1 ? 'space-between' : 'end'}
                        w={'95%'}
                        bottom={'0'}
                      >

                        <Img
                          src={preloadedAssets.left}
                          w={'70px'}
                          h={'50px'}
                          cursor={'pointer'}
                          // onClick={() => { SkipContentForBackNavigation() }}
                          onClick={() => {  LastModiPrevData(data)}}
                        />


                      </Box>
                      </Box>
                      {/* <Box className={'story_note_block'}> */}
                      {/* <Text textAlign={'center'}>{feed}</Text> */}
                      {/* </Box> */}
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
const Player: React.FC = () => {
  const groupRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, Sample);
  const [isHovered, setIsHovered] = useState<any>(false);

  const mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[10]);

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

  // function handleClick() {
  //   console.log('Character Click!')
  // }

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
export default Story;
