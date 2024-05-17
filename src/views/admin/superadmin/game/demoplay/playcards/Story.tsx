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
import ReplayGame from './ReplayGame';

const Story: React.FC<{
  imageSrc?: any;
  replayGame: any;
  isOptionalReplay: any;
  setisOptionalReplay: any;
  profilescore: any;
  setisReplay: any;
  isReplay: any;
  setType: any;
  setData: any;
  replayNextHandler: any;
  prevData?: any;
  currentScore?: any;
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
  RepeatSelectOption: any;
  RepeatPrevOption: any;
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
  voiceIds,
  setIsPrevNavigation,
  setNavTrack,
  navTrack,
  gameInfo,
  preloadedAssets,
  imageSrc,
  replayGame,
  replayNextHandler,
  prevData,
  currentScore,
  setisReplay,
  setisOptionalReplay,
  isOptionalReplay,
  profilescore,
  setData,
  setType,
  isReplay,
  questState,
  LastModiPrevData,
  getPrevLogDatas,
  setPreLogDatas,
  RepeatSelectOption,
  RepeatPrevOption,
}) => {
    const [showNote, setShowNote] = useState(true),
      [first, setFirst] = useState(false);
    const userProfile = useContext(ProfileContext);
    const { profile, setProfile } = useContext(ScoreContext);
    const [showTypingEffect, setShowTypingEffect] = useState<any>(false);
    const [AudioOptions, SetAudioOptions] = useState({ qpOptionId: '' });
    const [score, setScore] = useState(null);
    const [interactionNext, setInteractionNext] = useState(null);
    const [optionalReplay, setOptionalReplay] = useState(false);
    const [contentByLanguage, setContentByLanguage] = useState(null);
    const EnumType = {
      BGM: 'bgm',
      VOICE: 'voice',
    };

    useEffect(() => {
      if (data && type) {
        setShowNote(true);
        setShowTypingEffect(false);
        setTimeout(() => {
          setShowNote(false);
          interactionNext === true && setInteractionNext(false);
        }, 1000);
        SetAudioOptions({ qpOptionId: '' });
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

    useEffect(() => {
      const fetchData = async () => {
        if (profileData?.Audiogetlanguage.length !== 0) {
          if (AudioOptions.qpOptionId === '') {
            setAudioObj({
              url: '',
              type: EnumType.VOICE,
              volume: '0.5',
              loop: false, // Voice doesn't loop
              autoplay: true, // Autoplay is disabled
            });
            const GetblocktextAudioFiltered =
              profileData?.Audiogetlanguage.filter(
                (key: any) => key?.textId === data?.blockId,
              );
            if (GetblocktextAudioFiltered.length > 0) {
              const FilteredFieldName = GetblocktextAudioFiltered.map(
                (item: any) => item.fieldName,
              );
              const Filteredcontent = GetblocktextAudioFiltered.map(
                (item: any) => item.content,
              );
              setContentByLanguage(Filteredcontent);
              console.log('FilteredFieldName', FilteredFieldName);
              if (FilteredFieldName[0] === 'blockText') {
                const audioUrls = GetblocktextAudioFiltered.map(
                  (item: any) => item.audioUrls !== '' ? JSON.parse(item.audioUrls)[0]?.audioUrl : item.audioUrls,
                );
                console.log('audioUrls', audioUrls)
                try {
                  const normalizedPath = audioUrls[0];
                  if (normalizedPath !== '') {
                    const fullUrl = `${API_SERVER}${normalizedPath}`;
                    const responseblockText = await fetch(fullUrl);
                    console.log('responseblockText', responseblockText);
                    if (responseblockText.ok) {
                      setAudioObj({
                        url: fullUrl,
                        type: EnumType.VOICE,
                        volume: '0.5',
                        loop: false, // Voice doesn't loop
                        autoplay: true, // Autoplay is disabled
                      });
                    }
                  }
                  // Handle the response
                } catch (error) {
                  console.error('Error fetching data:', error);
                }

              }
            }
          } else {
            if (AudioOptions.qpOptionId) {
              setAudioObj({
                url: '',
                type: EnumType.VOICE,
                volume: '0.5',
                loop: false, // Voice doesn't loop
                autoplay: true, // Autoplay is disabled
              });
              const optionAudioFiltered = profileData?.Audiogetlanguage.filter(
                (key: any) => key?.textId === AudioOptions?.qpOptionId,
              );
              if (optionAudioFiltered.length > 0) {
                const getoptionsAudioFiltered = optionAudioFiltered.filter(
                  (key: any) => key?.fieldName === 'qpOptionText',
                );
                const responseAudioFiltered = optionAudioFiltered.filter(
                  (key: any) => key?.fieldName === 'qpResponse',
                );
                const FilteredResponsecontent = responseAudioFiltered[0].content;
                if (getoptionsAudioFiltered.length > 0) {
                  const QOTaudioUrls = getoptionsAudioFiltered.map(
                    (item: any) => item.audioUrls !== '' ? JSON.parse(item.audioUrls)[0]?.audioUrl : item.audioUrls,
                  );

                  if (QOTaudioUrls.length > 0) {
                    // const relativePath = QOTaudioUrls[0].split('\\uploads\\')[1];
                    // const normalizedPath = relativePath.replace(/\\/g, '/');
                    try {

                      const normalizedPath = QOTaudioUrls[0];
                      // const qpOptionTextUrl = `${API_SERVER}/uploads/${normalizedPath}`;
                      if (normalizedPath !== '') {
                        const qpOptionTextUrl = `${API_SERVER}${normalizedPath}`;
                        const responseqpOptionText = await fetch(qpOptionTextUrl);
                        if (responseqpOptionText.ok) {
                          setAudioObj({
                            url: qpOptionTextUrl,
                            type: EnumType.VOICE,
                            volume: '0.5',
                            loop: false,
                            autoplay: true,
                          });
                        }
                        /*
                        else {
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
                                  type: EnumType.VOICE,
                                  volume: '0.5',
                                  loop: false,
                                  autoplay: true,
                                });
                              }
                            }
                          }
                        }
                        */
                      }
                    }
                    catch (error) {
                      console.error('Error fetching data:', error);
                    }
                  }
                }
                if (responseAudioFiltered.length > 0) {
                  const QResTaudioUrls = responseAudioFiltered.map(
                    (item: any) => item.audioUrls !== '' ? JSON.parse(item.audioUrls)[0]?.audioUrl : item.audioUrls,
                  );

                  if (QResTaudioUrls.length > 0) {
                    try {

                      const normalizedPath = QResTaudioUrls[0];
                      if (normalizedPath !== '') {
                        const qRespOptionTextUrl = `${API_SERVER}${normalizedPath}`;
                        const responseqpOptionText = await fetch(qRespOptionTextUrl);
                        if (responseqpOptionText.ok) {
                          setAudioObj({
                            url: qRespOptionTextUrl,
                            type: EnumType.VOICE,
                            volume: '0.5',
                            loop: false,
                            autoplay: true,
                          });
                        }
                      }
                    } catch (error) {
                      console.error('Error fetching data:', error);
                    }

                  }
                }
              }
            }
          }
        }
      };
      fetchData();

    }, [data, AudioOptions]);

    const InteractionFunction = () => {
      setIsGetsPlayAudioConfirmation(true);

      /**Get current data mm-dd-yyyy */
      const currentDateTime = new Date();
      const day: String = String(currentDateTime.getDate()).padStart(2, '0');
      const month: String = String(currentDateTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year: String = String(currentDateTime.getFullYear());

      const currentDate = `${day}-${month}-${year}`;

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
                scoreEarnedDate: currentDate,
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
                scoreEarnedDate: currentDate,
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
    }, [interactionNext]);

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
        {optionalReplay && <ReplayGame
          setOptionalReplay={setOptionalReplay}
          replayGame={replayGame}
          replayNextHandler={replayNextHandler}
          type={type}
          gameInfo={gameInfo}
          setType={setType}
          setData={setData}
          isOptionalReplay={isOptionalReplay}
          setisOptionalReplay={setisOptionalReplay}
          setisReplay={setisReplay}
          profilescore={profilescore}
          isReplay={isReplay}
          // setCurrentScreenId={setCurrentScreenId}
          formData={gameInfo?.gameData}
          imageSrc={preloadedAssets.Replay}
          getData={getData}
          data={data}
          preloadedAssets={preloadedAssets} />}
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
                          <Text textAlign={'center'} letterSpacing={'normal'}>
                            {contentByLanguage !== null ? contentByLanguage : data?.blockText}
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        w={'100%'}
                        onClick={() => getNoteNextData()}
                        mt={'20px'}
                        display={'flex'}
                        justifyContent={'center'}
                        // cursor={'pointer'}
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
                <Canvas camera={{ position: [0, 1, 9] }}>
                  {' '}
                  {/* For Single view */}
                  {/* <Environment preset={"park"} background />   */}
                  <directionalLight
                    position={[2.0, 78.0, 100]}
                    intensity={0.8}
                    color={'ffffff'}
                    castShadow
                  />
                  <ambientLight intensity={0.5} />
                  {/* <OrbitControls   />  */}
                  <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />
                  {/* COMPONENTS */}
                  {/* <Player /> */}
                  <Model position={[-3, -1.8, 5]} rotation={[0, 1, 0]} isSpeaking={false} />
                  {/* <Sphere position={[0,0,0]} size={[1,30,30]} color={'orange'}  />   */}
                  {/* <Trex position={[0,0,0]} size={[1,30,30]} color={'red'}  />             */}
                  {/* <Parrot /> */}
                </Canvas>
              </Box>
            )}
            <Img className={'dialogue_image'} src={preloadedAssets.dial} />
            <Box position={'relative'}>
              <Box
                position={'fixed'}
                h={'100px'}
                w={'30%'}
                left={'5%'}
                bottom={'105px'}
              >
                <Img src={preloadedAssets.char} w={'100%'} height={'100%'} />
                <Box position={'absolute'} top={0} w={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}
                  fontSize={{ base: '30px', xl: '2vw' }}
                  fontWeight={500}
                  textAlign={'center'}
                  fontFamily={'AtlantisText'}
                  color={'#312821'}
                >
                  {data.blockRoll === 'Narrator' ? data.blockRoll : (data.blockRoll === '999999' ? profileData.name  : formData.gameNonPlayerName)}
                </Box>
              </Box>
            </Box>
            <Box
              display={'flex'}
              position={'fixed'}
              alignItems={'center'}
              justifyContent={'space-between'}
              h={'61px'}
              overflowY={'scroll'}
              w={'85%'}
              fontSize={'3vh'}
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
              <Box transform={'translateY(26%)'}>
                {showTypingEffect === false ? <TypingEffect
                  text={contentByLanguage !== null ? contentByLanguage : data?.blockText}
                  speed={50}
                  setSpeedIsOver={setShowTypingEffect}
                /> : contentByLanguage !== null ? contentByLanguage : data?.blockText}
              </Box>
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
                onClick={() => { SkipContentForBackNavigation() }}
              />
              <Img
                src={preloadedAssets.right}
                w={'70px'}
                h={'50px'}
                // cursor={'pointer'}
                onClick={() => Updatecontent()}
              />
            </Box>
            {/* </>
          )} */}
            {/* </motion.div> */}
          </Box>
        )}
        {data && type === 'Interaction' && (
          <Interaction backGroundImg={backGroundImg} data={data} option={option} options={options} optionClick={optionClick} InteractionFunction={InteractionFunction} navTrack={navTrack} preloadedAssets={preloadedAssets} selectedPlayer={selectedPlayer} LastModiPrevData={LastModiPrevData} RepeatSelectOption={RepeatSelectOption} RepeatPrevOption={RepeatPrevOption} contentByLanguage={contentByLanguage}
          />
        )}
        {data && type === 'response' && (
          <Box className="chapter_potrait">
            <Img src={backGroundImg} className="dialogue_screen" />
            {selectedPlayer && (
              <Img
                src={`${API_SERVER}/${selectedPlayer}`}
                className={'narrator_character_image'}
              />
            )}
            {selectedNpc && (
              <Img src={selectedNpc} className={'player_character_image'} />
            )}
            <Img className={'dialogue_image'} src={preloadedAssets.dial} />
            <Box position={'relative'}>
              <Box
                position={'fixed'}
                h={'100px'}
                w={'30%'}
                left={'5%'}
                bottom={'105px'}
              >
                <Img src={preloadedAssets.char} w={'100%'} height={'100%'} />
                <Box position={'absolute'} top={0} w={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}
                  fontSize={{ base: '30px', xl: '2vw' }}
                  fontWeight={500}
                  textAlign={'center'}
                  fontFamily={'AtlantisText'}
                  color={'#312821'}
                >
                  {data.blockResponseRoll === 'Narrator' ? data.blockResponseRoll : (data.blockResponseRoll === '999999' ? profileData.name  : formData.gameNonPlayerName)}
                </Box>
              </Box>
            </Box>
            <Box
              display={'flex'}
              position={'fixed'}
              alignItems={'center'}
              justifyContent={'space-between'}
              h={'61px'}
              overflowY={'scroll'}
              w={'85%'}
              fontSize={'3vh'}
              bottom={'38px'}
              fontFamily={'AtlantisContent'}
              transform={'translateY(26%)'}
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
              />
              <Img
                src={preloadedAssets.right}
                w={'70px'}
                h={'50px'}
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
                          <Box className="feed_list"> Interaction </Box>
                          <Box
                            w={'70%'}
                            h={'75%'}
                            overflowY={'scroll'}
                            className="feedback_content_text"
                          >
                            <Box display={'flex'} mt={'10px'}>
                              <Img src={preloadedAssets.FB} h={'1em'} w={'1em'} />
                              <Text textAlign={'justify'}>{feed}</Text>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          w={'120%'}
                          onClick={() => getData(data)}
                          mt={'20px'}
                          display={'flex'}
                          justifyContent={'center'}
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
                          onClick={() => {  LastModiPrevData(data)}}
                        />
                        </Box>
                      </Box>
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
  console.log('*****gltf', gltf.animations)
  const action = mixer.clipAction(gltf.animations[12]);

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

  return (
    <group ref={groupRef}>
      {/* <primitive object={gltf.scene} position={[3, 0 , 0]} /> */}
      <primitive
        object={gltf.scene}
        position={[5, -5, 0]}
        rotation={[0, -1, 0]}
      />{' '}
      {/* For Single view */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 5, 0]} receiveShadow onClick={handleClick} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
        <planeGeometry args={[100, 500]} />
        <shadowMaterial color={isHovered ? 'orange' : 'lightblue'} opacity={0.5} />
      </mesh> */}
    </group>
  );
};
export default Story;
