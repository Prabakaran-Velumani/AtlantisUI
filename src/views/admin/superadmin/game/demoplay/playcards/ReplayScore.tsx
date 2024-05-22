import { Box, Button, Img, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ScoreContext } from '../GamePreview';
import { ProfileContext } from '../EntirePreview';
import { motion } from 'framer-motion';
type replayScoreProps = {
  preloadedAssets: any;
  setReplayIsOpen: (value: boolean)=>void;
  replayState?: string;
  handleReplayButtonClick?: ()=>void;
  setCurrentScreenId?: (id: number)=>void;
  gameInfo?: any;
  // isOptionalReplay : boolean; //true if it is an optional replay
  // isReplay?: boolean; //true if it is an Mandatory replay
  profilescore?: any;
  setOptionalReplay?: (value:boolean)=>void;
  getPrevLogDatas: any;
  setQuestState:any;
  setOptions:any;
  setType:any;
  setData:any;
  gameInfoquest:any;
  gameinfodata:any;
  profileData:any;
  setPreLogDatas:any;
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
  setPreLogDatas
}) => {
  const [replayMessage, setReplayMessage] = useState<string>(null);
  const playerInfo = useContext(ProfileContext);
  const { profile, setProfile } = useContext(ScoreContext);
console.log("profile", profile);
console.log("playerInfo", playerInfo);
console.log("profilescore", profilescore);
console.log("getPrevLogDatas", getPrevLogDatas);

  useEffect(() => {
    const currentQuestMasterData = gameInfo?.gameQuest[profile?.currentQuest - 1];
    if (currentQuestMasterData.hasOwnProperty('gameTotalScore')) {
      // if (isReplay === true && isOptionalReplay !== true) {
      if(replayState === "mandatoryReplay")
      {
        const differedScore = currentQuestMasterData?.gameTotalScore ? (parseInt(currentQuestMasterData?.gameTotalScore) - parseInt(profilescore)) : null;
        setReplayMessage(`You are only ${differedScore ?? 'few'} points away from a perfect score. Would you like to replay?`)
      }
      // else if (isOptionalReplay === true) {
        else if(replayState === 'optionalReplay'){
        // setReplayMessage(`You are only ${differedScore ?? 'few'} points away from a perfect score. Would you like to replay?`)
        setReplayMessage(`Your score is below the distinction level. Would you like to play again?`);
      }
      else {
        setReplayMessage(`Would you like to play again?`);
      }
    }
  }, []);
  const QuestBlocklastpaused =()=>
    {
      if (getPrevLogDatas.nevigatedSeq) {
        const getnevigatedSeq = getPrevLogDatas.nevigatedSeq;
        const convertArray = Object.keys(getnevigatedSeq);
        const getLastquest = convertArray[convertArray.length - 1];
        const findseq = getnevigatedSeq[getLastquest];
        const getLastSeq = findseq[getnevigatedSeq[getLastquest].length - 1];
        // const lastActiveBlockSeq = getPrevLogDatas.lastActiveBlockSeq;
        let SetLastSeqData: any;
        for (const key in gameInfo.blocks[getLastquest]) {
          const data = gameInfo.blocks[getLastquest][key];
          console.log('data.blockId',data.blockId)
          if (data.blockPrimarySequence === getLastSeq) {
            SetLastSeqData = data;
            break;
          }

        }
        if(convertArray.length > 0)
          {
            setProfile((prev: any) => ({
              ...prev,
              currentQuest: SetLastSeqData.blockQuestNo,
              completedLevels: convertArray,
              score: getPrevLogDatas.previewProfile?.score,
            }));
          }
          else{
            setProfile((prev: any) => ({
              ...prev,
              currentQuest: SetLastSeqData.blockQuestNo,
              completedLevels: ['1'],
              score: getPrevLogDatas.previewProfile?.score,
            }));
          }
        setData(SetLastSeqData);
        setType(SetLastSeqData.blockChoosen);
        if (
          SetLastSeqData.blockChoosen ===
          'Interaction'
        ) {
          const optionsFiltered = [];
          const primarySequence = getLastSeq;
  
          for (const option of gameInfoquest) {
            if (profileData?.Audiogetlanguage.length > 0) {
              if (option?.qpSequence === primarySequence) {
                const profilesetlan = profileData?.Audiogetlanguage.find(
                  (key: any) => key?.textId === option.qpOptionId,
                );
  
                if (profilesetlan) {
                  const languagecont = {
                    ...option,
                    qpOptionText: profilesetlan.content,
                  };
                  console.log('languagecont',languagecont);
                  optionsFiltered.push(languagecont);
                } else {
                  optionsFiltered.push(option);
                }
              }
            } else {
              if (option?.qpSequence === primarySequence) {
                optionsFiltered.push(option);
              }
            }
          }
          if (gameinfodata === 'true') {
            for (let i = optionsFiltered.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [optionsFiltered[i], optionsFiltered[j]] = [
                optionsFiltered[j],
                optionsFiltered[i],
              ]; // Swap elements at indices i and j
            }
          }
          setOptions(optionsFiltered);
        }
        setReplayIsOpen(false);
        //isSetStoryScreen(false);
        // setReplayState(null)
        setCurrentScreenId(2);
        return false;
      }
    }
  const  QuestSelectionScreen =() =>
    {
      if (getPrevLogDatas.nevigatedSeq) {
        const getnevigatedSeq = getPrevLogDatas.nevigatedSeq;
        const convertArray = Object.keys(getnevigatedSeq);
        if (convertArray.length > 0) {
          setProfile((prev: any) => ({
            ...prev,
            currentQuest: parseInt(convertArray[convertArray.length -1 ]),
            completedLevels: convertArray,
            score: getPrevLogDatas.previewProfile?.score,
          }));
          if(getPrevLogDatas.previewProfile?.score?.length > 0)
            {
              setQuestState((prevquestdataList: any) => ({
                ...prevquestdataList,
                [parseInt(convertArray[convertArray.length -1 ])]: 'completed',
              }));
            }
        }
        else
        {
          setProfile((prev: any) => ({
            ...prev,
            currentQuest: 1,
            completedLevels: ['1'],
          }));
          if(getPrevLogDatas.previewProfile?.score?.length > 0)
            {
              setQuestState((prevquestdataList: any) => ({
                ...prevquestdataList,
                [1]: 'Started',
              }));
            }
        }
      }
      setReplayIsOpen(false);
      setCurrentScreenId(13);
      return false;
    }
    const PlayAgain =()=>
      {
        setPreLogDatas((prev: any) => ({
          ...prev,
          nevigatedSeq: [],
          screenIdSeq: [],
          lastActiveBlockSeq: '',
          selectedOptions: '',
        }));
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
            {['replayPointPrompt','redirectToChapter', 'Replay','Minimum','Prompt'].includes(replayState) ?
            <>
            <Img
              src={preloadedAssets?.Replay}
              className="setting-pad"
            />
            <Box className={replayState === 'Prompt' ? 'replay-prompt-vertex':"replay-vertex"}>
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
                        <Img src={preloadedAssets?.Continue} className='replay_game_btn_prompt' onClick={QuestBlocklastpaused}/>
                      </Button>
                    </Box>
                    <Box className='replay_prompt_text'> Would you like to navigate to the Quest Selection page?</Box>
                    <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                      <Button
                        h={'auto !important'}
                        background={'transparent !important'}
                      >
                        <Img src={preloadedAssets?.Continue} className='replay_game_btn_prompt' onClick={QuestSelectionScreen}/>
                      </Button>
                    </Box>
                    <Box className='replay_prompt_text'> Do you want to Play Again</Box>
                    <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                      <Button
                        h={'auto !important'}
                        background={'transparent !important'}
                      >
                        <Img src={preloadedAssets?.Continue} className='replay_game_btn_prompt' onClick={PlayAgain}/>
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
                        <Img src={preloadedAssets?.OkayBtn} className='replay_game_btn' onClick={()=>{setReplayIsOpen(false);handleReplayButtonClick()}}/>
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
                        <Img src={preloadedAssets?.replayBtn}  onClick={() => {setCurrentScreenId(13); setReplayIsOpen(false)}} className='replay_game_btn' />
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
                      <Button
                        background={'transparent !important'}
                      >
                        <Img src={preloadedAssets?.OkayBtn} onClick={()=>{setReplayIsOpen(false);handleReplayButtonClick()}} className='replay_game_btn' />
                      </Button>
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
