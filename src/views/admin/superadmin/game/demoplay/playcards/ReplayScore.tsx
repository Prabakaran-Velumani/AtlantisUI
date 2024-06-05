import { Box, Button, Img, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ScoreContext ,ProfileType} from '../GamePreview';
import { ProfileContext } from '../EntirePreview';
import { motion } from 'framer-motion';
import { GiConsoleController } from 'react-icons/gi';
type replayScoreProps = {
  preloadedAssets: any;
  setReplayIsOpen: (value: boolean) => void;
  replayState?: string;
  handleReplayButtonClick?: (replayState:string) => void;
  setCurrentScreenId?: (id: number) => void;
  gameInfo?: any;
  // isOptionalReplay : boolean; //true if it is an optional replay
  // isReplay?: boolean; //true if it is an Mandatory replay
  profilescore?: any;
  setOptionalReplay?: (value: boolean) => void;
  getPrevLogDatas: any;
  setQuestState: any;
  setOptions: any;
  setType: any;
  setData: any;
  gameInfoquest: any;
  gameinfodata: any;
  profileData: any;
  setPreLogDatas: any;
  replayNextHandler: any;
  data: any;
  QuestBlocklastpaused: ()=> void;
}

const ReplayScore: React.FC<replayScoreProps> = ({
  preloadedAssets,
  setReplayIsOpen,
  replayState,
  handleReplayButtonClick,
  setCurrentScreenId,
  gameInfo,
  // isOptionalReplay,
  // isReplay,
  profilescore,
  setOptionalReplay,
  getPrevLogDatas,
  setQuestState,
  setOptions,
  setType,
  setData,
  gameInfoquest,
  gameinfodata,
  profileData,
  setPreLogDatas,
  replayNextHandler,
  data,
  QuestBlocklastpaused
}) => {
  const [replayMessage, setReplayMessage] = useState<string>(null);
  const playerInfo = useContext(ProfileContext);
  const { profile, setProfile } = useContext(ScoreContext);
  const initialProfileObject: ProfileType = {
    score: [],
    completedLevels: ['1'],
    currentQuest: 1,
    replayScore: [],
    playerGrandTotal: { questScores: {} },
    todayEarnedScore: [{ quest: 1, score: 0, earnedDate: "" }],
  };
  useEffect(() => {
    const currentQuestMasterData = gameInfo?.gameQuest[profile?.currentQuest - 1];    
      if (replayState === "mandatoryReplay") {
        const currentQuestIndex = profile?.currentQuest;
        const previousQuestScore = profile?.playerGrandTotal.questScores[currentQuestIndex] || 0;
        const differedScore = parseInt(currentQuestMasterData.gameMinScore) - parseInt(previousQuestScore);
        setReplayMessage(`You are only ${differedScore ?? 'few'} points lower than minimum score. Click 'OKAY' to Play Again?`)
      }
      else if (replayState === 'optionalReplay') {
        const currentQuestIndex = profile?.currentQuest - 1;
        const previousQuestScore = profile?.playerGrandTotal.questScores[currentQuestIndex] || 0; // Default to 0 if undefined

        const differedScore = parseInt(currentQuestMasterData.gameDistinctionScore) - parseInt(previousQuestScore);
        setReplayMessage(`You are only ${differedScore ?? 'few'} points away from a perfect score. Would you like to replay?`)
      }
      else {
        setReplayMessage(`Would you like to play again?`);
      }
  }, []);
  // const QuestBlocklastpaused = () => {
  //   if (getPrevLogDatas.nevigatedSeq) {
  //     const LastPreviousActiveBlock = getPrevLogDatas.lastActiveBlockSeq;
  //     const lastActiveBlock = Object.keys(getPrevLogDatas.lastActiveBlockSeq);
  //     const lastActivityquest = lastActiveBlock[0];
  //     const findActiveBlockId = LastPreviousActiveBlock[lastActivityquest];
  //     let SetLastSeqData: any;
  //     for (const key in gameInfo.blocks[lastActivityquest]) {
  //       const data = gameInfo.blocks[lastActivityquest][key];
  //       if (data.blockId === findActiveBlockId[0]) {
  //         SetLastSeqData = data;
  //         break;
  //       }
  //     }
  //     setProfile((prev: any)=> ({...prev, currentQuest: lastActivityquest}))
  //     setData(SetLastSeqData);
  //     setType(SetLastSeqData.blockChoosen);
  //     if (
  //       SetLastSeqData.blockChoosen ===
  //       'Interaction'
  //     ) {
  //       const optionsFiltered = [];
  //       const primarySequence = findActiveBlockId[0];
  //       for (const option of gameInfoquest) {
  //         if (profileData?.Audiogetlanguage.length > 0) {
  //           if (option?.qpQuestionId === primarySequence) {
  //             const profilesetlan = profileData?.Audiogetlanguage.find(
  //               (key: any) => key?.textId === option.qpOptionId,
  //             );

  //             if (profilesetlan) {
  //               const languagecont = {
  //                 ...option,
  //                 qpOptionText: profilesetlan.content,
  //               };
  //               optionsFiltered.push(languagecont);
  //             } else {
  //               optionsFiltered.push(option);
  //             }
  //           }
  //         } else {
  //           if (option?.qpQuestionId === primarySequence) {
  //             optionsFiltered.push(option);
  //           }
  //         }
  //       }
  //       if (gameinfodata === 'true') {
  //         for (let i = optionsFiltered.length - 1; i > 0; i--) {
  //           const j = Math.floor(Math.random() * (i + 1));
  //           [optionsFiltered[i], optionsFiltered[j]] = [
  //             optionsFiltered[j],
  //             optionsFiltered[i],
  //           ]; // Swap elements at indices i and j
  //         }
  //       }
  //       setOptions(optionsFiltered);
  //     }
  //     setReplayIsOpen(false);
  //     setCurrentScreenId(2);
  //     return false;
  //   }
  // }
  const QuestSelectionScreen = () => {
    setReplayIsOpen(false);
    setCurrentScreenId(13);
    return false;
  }
  const PlayAgain = () => {
    setPreLogDatas((prev: any) => ({
      ...prev,
      nevigatedSeq: [],
      screenIdSeq: [1],
      lastActiveBlockSeq: '',
      lastModifiedBlockSeq: null,
      lastBlockModifiedDate: null,
      selectedOptions: '',
      previewScore:initialProfileObject,
      previewProfile:{...getPrevLogDatas.previewProfile,score:[]}
    }));
    setProfile(initialProfileObject);
    setCurrentScreenId(1);
    setReplayIsOpen(false);
    return false;
  }
  
  return (
    <>
      <Box id="container" className="Play-station">
        <Box className="top-menu-home-section">
          <Box className="Setting-box">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              style={{
                width: '100%',
                height: '100%',
                // backgroundColor: 'coral',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {['replayPointPrompt', 'redirectToChapter', 'Replay', 'Minimum', 'Prompt'].includes(replayState) ?
                <>
                  <Img
                    src={preloadedAssets?.Replay}
                    className="setting-pad"
                  />
                  <Box className={replayState === 'Prompt' ? 'replay-prompt-vertex' : "replay-vertex"}>
                    <Box
                      w={'100%'}
                      h={'100%'}
                      display={'flex'}
                      flexDirection={'column'}
                      justifyContent={'space-between'}
                    >
                      {replayState === 'Replay' &&
                        <>
                          <Box className='replay_game_text'>Would you like to play Again ?</Box>
                          <Box display={'flex'} justifyContent={'space-between'} w={'100%'}>
                            <Button
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.NextBtn} onClick={() => setReplayIsOpen(false)} className='replay_game_btn' />
                            </Button>
                            <Button
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.replayBtn} className='replay_game_btn' />
                            </Button>
                          </Box>
                        </>
                      }
                      {replayState === 'Minimum' &&
                        <>
                          <Box className='replay_game_text'>Your score is too low than required score please play again ?</Box>
                          <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                            <Button
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.OkayBtn} className='replay_game_btn' />
                            </Button>
                          </Box>
                        </>
                      }
                      {replayState === 'Prompt' &&
                        <>
                          <Box className='replay_prompt_text'> Do you want to continue from the Quest where you last paused?</Box>
                          <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                            <Button
                              h={'auto !important'}
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.Continue} className='replay_game_btn_prompt' onClick={QuestBlocklastpaused} />
                            </Button>
                          </Box>
                          <Box className='replay_prompt_text'> Would you like to navigate to the Quest Selection page?</Box>
                          <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                            <Button
                              h={'auto !important'}
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.Continue} className='replay_game_btn_prompt' onClick={QuestSelectionScreen} />
                            </Button>
                          </Box>
                          <Box className='replay_prompt_text'> Do you want to Play Again</Box>
                          <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                            <Button
                              h={'auto !important'}
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.Continue} className='replay_game_btn_prompt' onClick={PlayAgain} />
                            </Button>
                          </Box>
                        </>
                      }
                      {replayState === 'replayPointPrompt' &&
                        <>
                          <Box className='replay_game_text'>{`You have been redirected to the replay point. Click "Okay" to continue.`}</Box>
                          <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                            <Button
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.OkayBtn} className='replay_game_btn' onClick={() => { setReplayIsOpen(false); handleReplayButtonClick(replayState) }} />
                            </Button>
                          </Box>
                        </>
                      }
                      {replayState === 'redirectToChapter' &&
                        <>
                          <Box className='replay_game_text'>No previous navigation exists. Do you want to stay on this screen or redirect to Chapter Selection?</Box>
                          <Box display={'flex'} justifyContent={'space-between'} w={'100%'}>
                            <Button
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.OkayBtn} onClick={() => setReplayIsOpen(false)} className='replay_game_btn' />
                            </Button>
                            <Button
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.replayBtn} onClick={() => { setCurrentScreenId(13); setReplayIsOpen(false) }} className='replay_game_btn' />
                            </Button>
                          </Box>
                        </>
                      }
                    </Box>
                  </Box>
                </>
                :
                (
                  <>
                    {/** ReplayGame prompt*/}
                    <Img
                      src={preloadedAssets?.overview}
                      className="setting-pad"
                    />
                    <Box className="optional-vertex">
                      <Box
                        w={'100%'}
                        h={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                      >
                        <Text className='replay_game_text'>
                          {replayMessage}
                        </Text>

                        <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                          {replayState === "mandatoryReplay" ? <><Button
                            background={'transparent !important'}
                          >
                            <Img src={preloadedAssets?.OkayBtn} onClick={() => { setReplayIsOpen(false); handleReplayButtonClick(replayState) }} className='replay_game_btn' />
                          </Button></> : replayState === "optionalReplay" ? <><Button
                            background={'transparent !important'}
                          >
                            <Img src={preloadedAssets?.OkayBtn} onClick={() => { setReplayIsOpen(false); handleReplayButtonClick(replayState) }} className='replay_game_btn' />
                          </Button><Button
                            background={'transparent !important'}
                          >
                              <Img src={preloadedAssets?.next} onClick={() => { setReplayIsOpen(false); replayNextHandler(data) }} className='replay_game_btn' />
                            </Button></> : null}

                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
            </motion.div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReplayScore;
