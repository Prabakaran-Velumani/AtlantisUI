import React, { useContext, useState } from 'react'
import { Box, Button, Grid, GridItem, Img, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Switch, Text } from '@chakra-ui/react';
import right from 'assets/img/games/right.png';
import left from 'assets/img/games/left.png';
import parch from 'assets/img/games/parch.png';
import on from 'assets/img/games/on.png';
import off from 'assets/img/games/off.png';
import TopMenu from 'assets/img/games/top-menu.png';
import Overview from 'assets/img/games/game-overview.png';
import Setting from 'assets/img/games/settings.png';
import SettingPad from 'assets/img/games/setting-pad.png';
import SliderPointer from 'assets/img/games/slider-pointer.png';
import Close from 'assets/img/games/close.png';
import { ScoreContext } from '../GamePreview';
import { motion } from 'framer-motion';
interface ModelPopupProps {
  data?: any;
  options?: any;
  backGroundImg?: any;
  option?: any;
  profile?: any;
  geTfeedBackoption?: any;
  ModelControl?: any;
  preloadedAssets?: any;
  setModelControl: any;
  getPrevLogDatas: any
  setCurrentScreenId: any;
  setLastModified: any;
  LastModified: any;
  setData: any;
  setType: any;
  gameInfo: any;
  setOptions: any;
  gameInfoquest: any;
  gameinfodata: any;
  isStoryScreen: any;
  isSetStoryScreen: any;
  setPreLogDatas: any;
  setNavigateBlockEmpty: any;
  NavigateBlockEmpty: any;
  profileData:any;
  setQuestState:any;
  setReplayState:any;
  setReplayIsOpen:any;
}

const ModelPopup: React.FC<ModelPopupProps> = ({ data, backGroundImg, option, options, geTfeedBackoption, ModelControl, preloadedAssets, setModelControl, getPrevLogDatas, setCurrentScreenId, setLastModified, LastModified, setType, setData, gameInfo, setOptions, gameInfoquest, gameinfodata, isStoryScreen, isSetStoryScreen, setPreLogDatas, setNavigateBlockEmpty, NavigateBlockEmpty ,profileData,setQuestState,setReplayState,setReplayIsOpen}) => {
  const [QuestScreen, SetQuestScreen] = useState<boolean>(false);
  const [QuestSelectionPage, SetQuestSelectionPage] = useState<boolean>(false);
  const [PlayAgain, SetPlayAgain] = useState<boolean>(false);
  const { profile, setProfile } = useContext(ScoreContext);
  const NextScreen = () => {
    setPreLogDatas((prev: any) => ({
      ...prev,
      nevigatedSeq: [],
      screenIdSeq: [],
      lastActiveBlockSeq: '',
      selectedOptions: '',
    }));
    setModelControl(false);
    setLastModified(false);
    setCurrentScreenId(1);

  }
  const continueScreen = () => {
    if (LastModified === true) {
      const getLastModifiedid = getPrevLogDatas.lastModifiedBlockSeq;
      // const getLastModifieddata = new Date(getPrevLogDatas.lastBlockModifiedDate).getTime();
      // const getupdatedAt = new Date(getPrevLogDatas.updatedAt).getTime();
      let filteredData: any;
      for (const key in gameInfo) {
        const innerObj = gameInfo[key];
        for (const innerKey in innerObj) {
          const data = innerObj[innerKey];
          if (data.blockId == getLastModifiedid) {
            filteredData = data;
            break;
          }
        }
        if (filteredData) {
          break;
        }
      }
      if (getPrevLogDatas.nevigatedSeq) {
        const getnevigatedSeq = getPrevLogDatas.nevigatedSeq;
        const convertArray = Object.keys(getnevigatedSeq);
        if (convertArray.length > 0) {
          setProfile((prev: any) => ({
            ...prev,
            currentQuest: filteredData.blockQuestNo,
            completedLevels: convertArray,
            score: getPrevLogDatas.previewProfile?.score,
          }));
          if(getPrevLogDatas.previewProfile?.score?.length > 0)
            {
              setQuestState((prevquestdataList: any) => ({
                ...prevquestdataList,
                [filteredData.blockQuestNo]: 'completed',
              }));
            }
         
        }
        else
        {
          setProfile((prev: any) => ({
            ...prev,
            currentQuest: filteredData.blockQuestNo,
            completedLevels: ['1'],
            score: getPrevLogDatas.previewProfile?.score,
          }));
          if(getPrevLogDatas.previewProfile?.score?.length > 0)
            {
              setQuestState((prevquestdataList: any) => ({
                ...prevquestdataList,
                [filteredData.blockQuestNo]: 'completed',
              }));
            }
        }
      }
      setData(filteredData);
      setType(filteredData.blockChoosen);
      if (
        filteredData.blockChoosen ===
        'Interaction'
      ) {

        const optionsFiltered = [];
        const primarySequence = filteredData.blockPrimarySequence;

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
      setCurrentScreenId(2);
      setModelControl(false); // for model show
      setLastModified(false); // for last modified 
      return false;



    }
    else {
      if (getPrevLogDatas.screenIdSeq.length > 0) {
        const screenlast = getPrevLogDatas.screenIdSeq;
        const getLastScreenId = screenlast[screenlast.length - 1];
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
              else{
                    setQuestState((prevquestdataList: any) => ({
                      ...prevquestdataList,
                      [parseInt(convertArray[convertArray.length -1 ])]: 'Started',
                    }));
                  
              }
          }
          else
          {
            setProfile((prev: any) => ({
              ...prev,
              currentQuest: 1,
              completedLevels: ['1']
            })); 
                  
              
          }
        }
        if (getLastScreenId === 2) {
        
          setLastModified(false);
          //isSetStoryScreen(true);
          setReplayState('Prompt');
          setModelControl(false);
          setReplayIsOpen(true);
          console.log('replayState');
          return false;
        }
        else {

          setCurrentScreenId(getLastScreenId);
          setModelControl(false);
          return false;
        }

      }

    }


  }
  const handleChange = (e: any) => {
    const { name, value, checked } = e.target;
    if (name === 'lastpausedQuest' && checked) {

      SetQuestScreen(true);
      SetQuestSelectionPage(false);
      SetPlayAgain(false);
      return false;
    }
    else if (name === 'questSelectionPage' && checked) {
      SetQuestScreen(false);
      SetQuestSelectionPage(true);
      SetPlayAgain(false);
      return false;
    }
    else if (name === 'playAgain' && checked) {
      SetQuestScreen(false);
      SetQuestSelectionPage(false);
      SetPlayAgain(true);
      return false;
    }
  }
  const HandleScreen = () => {
    if (QuestScreen === true) {
      if (getPrevLogDatas.nevigatedSeq) {
        const getnevigatedSeq = getPrevLogDatas.nevigatedSeq;
        const convertArray = Object.keys(getnevigatedSeq);
        const getLastquest = convertArray[convertArray.length - 1];
        const findseq = getnevigatedSeq[getLastquest];
        const getLastSeq = findseq[getnevigatedSeq[getLastquest].length - 1];
        let SetLastSeqData: any;
        for (const key in gameInfo[getLastquest]) {
          const data = gameInfo[getLastquest][key];
          if (data.blockPrimarySequence == getLastSeq) {
            SetLastSeqData = data;
            break;
          }

        }
        // console.log('score',getPrevLogDatas.previewProfile,'....',getPrevLogDatas.previewProfile?.score) ;//{"score":[{"seqId":"1.1","score":100,"quest":1,"scoreEarnedDate":"15-05-2024"}],"name":"Book","language":0,"gender":"Male"}
        // return;
        if(convertArray.length > 0)
          {
            setProfile((prev: any) => ({
              ...prev,
              currentQuest: SetLastSeqData.blockQuestNo,
              completedLevels: convertArray,
              score: getPrevLogDatas.previewProfile?.score,
            }));
            if(getPrevLogDatas.previewProfile?.score?.length > 0)
              {
                setQuestState((prevquestdataList: any) => ({
                  ...prevquestdataList,
                  [SetLastSeqData.blockQuestNo]: 'completed',
                }));
              }
          }
          else{
            setProfile((prev: any) => ({
              ...prev,
              currentQuest: SetLastSeqData.blockQuestNo,
              completedLevels: ['1'],
              score: getPrevLogDatas.previewProfile?.score,
            }));
            if(getPrevLogDatas.previewProfile?.score?.length > 0)
              {
                setQuestState((prevquestdataList: any) => ({
                  ...prevquestdataList,
                  [SetLastSeqData.blockQuestNo]: 'completed',
                }));
              }
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
        setModelControl(false);
        //isSetStoryScreen(false);
        // setReplayState(null)
        setCurrentScreenId(2);
        return false;
      }
    }
    else if (QuestSelectionPage === true) {
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
        }
      }
      setModelControl(false);
      //isSetStoryScreen(false);
      setCurrentScreenId(13);
      return false;
    }
    else if (PlayAgain === true) {
      setPreLogDatas((prev: any) => ({
        ...prev,
        nevigatedSeq: [],
        screenIdSeq: [],
        lastActiveBlockSeq: '',
        selectedOptions: '',
      }));
      setModelControl(false);
      //isSetStoryScreen(false);
      return false;
    }
  }
  const HandleBlockScreen = () => {
    setNavigateBlockEmpty(false);
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
              <Img src={preloadedAssets?.Replay} className="setting-pad" />
              <Box className="replay-vertex">
                <Box
                  w={'100%'}
                  h={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                >
                  <Box className="replay_game_text">
                 { LastModified === true ? ' Would you like to view the lastModified sequence?' : NavigateBlockEmpty === true ? 'Dont have any blocks. So, navigate to the first block.' : '  Do you want to continue from the screen where you last paused?'}
                  </Box>
              
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    w={'100%'}
                  >
                    { NavigateBlockEmpty === true ?  
                    <Button background={'transparent !important'}>
                      <Img
                        src={preloadedAssets?.OkayBtn}
                        className="replay_game_btn"
                        onClick={HandleBlockScreen}
                      />
                    </Button> 
                    : 
                    <>
                    <Button background={'transparent !important'}>
                      <Img
                        src={preloadedAssets?.cancel}
                        
                        onClick={NextScreen}
                        className="replay_game_btn_cancel"
                      />
                    </Button>
                    <Button background={'transparent !important'}>
                      <Img
                        src={preloadedAssets?.OkayBtn}
                        className="replay_game_btn"
                        onClick={continueScreen}
                      />
                    </Button>
                    </>
                    
                   } 
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
      {/* 
    <Modal isOpen={true} onClose={ModelControl} closeOnOverlayClick={false} size={'medium'} >
    <ModalOverlay />
    <ModalContent
      className='feedback_screenshot'
      backgroundImage={backGroundImg}
      backgroundSize={'cover'}
      filter={'contrast(70%)'}
      backgroundRepeat={'no-repeat'}
      boxShadow={'inset 0px 5px 100px 25px white'}
      borderRadius={'35px !important'}
    >
      <ModalBody width={'100%'} height={'100%'}>

        <Box className="top-menu-home-section-screenshot">

        </Box>

        <Box className="story_interaction_image_screenshot">
          <Box position={'relative'} h={'100%'}>
            <Box
              position={'absolute'}
              top={{ sm: '18px', md: '8%' }}
              h={'80% !important'}
              className="story_interaction_image_screenshot_content"
            >
              <Box
                textAlign={'center'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                fontWeight={700}
                fontSize={{ md: '1.5vw', lg: '1.9vw' }}
                fontFamily={'AtlantisText'}
                lineHeight={1}
                w={'100%'}
                h={'5%'}
              >
                <Box w={'80%'}>
                  {LastModified === true ? 'Would you like to view the lastModified sequence?' : isStoryScreen === true ?

                    <><Box style={{ textAlign: 'center' }}>  Choose  Any One Option ?</Box>

                      <Box >
                        Do you want to continue from the Quest where you last paused?
                        <Switch
                          isChecked={QuestScreen === true ? true : false}
                          color="#fff"
                          colorScheme="brandScheme"
                          size="md"
                          id="lastpausedQuest"
                          name="lastpausedQuest"
                          onChange={handleChange}
                        />
                      </Box>
                      <Box >
                        Would you like to navigate to the Quest Selection page?
                        <Switch
                          isChecked={QuestSelectionPage === true ? true : false}
                          color="#fff"
                          colorScheme="brandScheme"
                          size="md"
                          id="questSelectionPage"
                          name="questSelectionPage"
                          onChange={handleChange}
                        />
                      </Box>
                      <Box >
                        Do you want to Play Again
                        <Switch
                          isChecked={PlayAgain === true ? true : false}
                          color="#fff"
                          colorScheme="brandScheme"
                          size="md"
                          id="playAgain"
                          name="playAgain"
                          onChange={handleChange}
                        />
                      </Box>
                    </> : NavigateBlockEmpty === true ? 'Dont have any blocks. So, navigate to the first block.' : '  Do you want to continue from the screen where you last paused?'}

                </Box>
              </Box>
              <Box
                className='story_screenshot_interaction_question'
              >
                <Box
                  className='screenshot_content'
                  w={'60%'}
                  fontSize={{ md: '1.5vw', lg: '1.9vw' }}
                  letterSpacing={1}
                  justifyContent={'flex-start'}
                >

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
                className={'screenshot_interaction_options'}
              >
                <Box w={'60%'}>

                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

      </ModalBody>
      <ModalFooter>
        <>
          {/* <Img
            src={preloadedAssets.replayBtn}
            className="replay_buttons"
          /> 



          {NavigateBlockEmpty === true ? <Button onClick={() => { HandleBlockScreen() }} > Ok</Button> : isStoryScreen === false ? <> <Button onClick={() => { continueScreen() }}> Yes</Button>
            <Button onClick={() => { NextScreen() }} > No</Button></> : <Button onClick={() => { HandleScreen() }} > Ok</Button>}

          {/* <Img
            src={preloadedAssets.next}
            className="replay_buttons"
          /> 
        </>
      </ModalFooter>
    </ModalContent>
  </Modal> 
  */}
    </>
  );
}

export default ModelPopup;