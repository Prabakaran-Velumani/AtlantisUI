import React, { useState } from 'react'
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
}

const ModelPopup: React.FC<ModelPopupProps> = ({ data, backGroundImg, option, profile, options, geTfeedBackoption, ModelControl, preloadedAssets, setModelControl, getPrevLogDatas, setCurrentScreenId, setLastModified, LastModified, setType, setData, gameInfo, setOptions, gameInfoquest, gameinfodata, isStoryScreen, isSetStoryScreen }) => {
  const [QuestScreen, SetQuestScreen] = useState<boolean>(false);
  const [QuestSelectionPage, SetQuestSelectionPage] = useState<boolean>(false);
  const [PlayAgain, SetPlayAgain] = useState<boolean>(false);
  const NextScreen = () => {
    setModelControl(false);
    setLastModified(false);
  }
  const continueScreen = () => {
    if (LastModified === true) {
      const getLastModifiedid = getPrevLogDatas.lastModifiedBlockSeq;
      const getLastModifieddata = new Date(getPrevLogDatas.lastBlockModifiedDate).getTime();
      const getupdatedAt = new Date(getPrevLogDatas.updatedAt).getTime();
      // const getdifferent = getLastModifieddata - getupdatedAt;
      // console.log(getLastModifieddata,'...........',getupdatedAt,'.....',getdifferent ,'...',getPrevLogDatas.lastBlockModifiedDate,'.....',getPrevLogDatas.updatedAt);
      if (getLastModifieddata > getupdatedAt) {
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
        setData(filteredData);
        setType(filteredData.blockChoosen);
        if (
          filteredData.blockChoosen ===
          'Interaction'
        ) {
          const optionsFiltered = [];
          const primarySequence = filteredData.blockPrimarySequence;

          for (const option of gameInfoquest) {

            if (option?.qpSequence === primarySequence) {
              optionsFiltered.push(option);
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
      else
      {
        console.log('getPrevLogDatas', getPrevLogDatas);
        if (getPrevLogDatas.screenIdSeq) {
          const screenlast = getPrevLogDatas.screenIdSeq;
          const getLastScreenId = screenlast[screenlast.length - 1];
          if (getLastScreenId == 2) {
            setLastModified(false);
            isSetStoryScreen(true);
            return false;
          }
          else {
            setCurrentScreenId(getLastScreenId);
            setLastModified(false);
            setModelControl(false);
            return false;
          }
  
        }
      }

    }
    else {
      console.log('getPrevLogDatas', getPrevLogDatas);
      if (getPrevLogDatas.screenIdSeq.length > 0) {
        const screenlast = getPrevLogDatas.screenIdSeq;
        const getLastScreenId = screenlast[screenlast.length - 1];
        if (getLastScreenId == 2) {
          setLastModified(false);
          isSetStoryScreen(true);
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
    console.log('name **********', name);
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
      console.log('.....142......', getPrevLogDatas.nevigatedSeq, '....', getPrevLogDatas.nevigatedSeq.length);
      if (getPrevLogDatas.nevigatedSeq) {
        const getnevigatedSeq = getPrevLogDatas.nevigatedSeq;
        const convertArray = Object.keys(getnevigatedSeq);
        const getLastquest = convertArray[convertArray.length - 1];
        console.log('getLastquest', getLastquest);
        const findseq = getnevigatedSeq[getLastquest];
        const getLastSeq = findseq[getnevigatedSeq[getLastquest].length - 1];
        console.log('.....151......', getLastSeq, 'findseq', findseq);
        let SetLastSeqData: any;
        for (const key in gameInfo[getLastquest]) {
          const data = gameInfo[getLastquest][key];
          if (data.blockPrimarySequence == getLastSeq) {
            SetLastSeqData = data;
            break;
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

            if (option?.qpSequence === primarySequence) {
              optionsFiltered.push(option);
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
        setCurrentScreenId(2);
        return false;
      }
    }
    else if (QuestSelectionPage === true) {
      setModelControl(false);
      setCurrentScreenId(13);
      return false;
    }
    else if (PlayAgain === true) {
      setModelControl(false);
      return false;
    }
  }
  return (
    // <Modal isOpen={isScreenshot} onClose={isScreenshot} size={'medium'}>
    <Modal isOpen={true} onClose={ModelControl} size={'medium'} >
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
                    {LastModified === true ? ' Would you like to view the lastModified sequence?' : isStoryScreen === true ?

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
                      </> : '  Do you want to continue from the screen where you last paused?'}

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
            /> */}
            {isStoryScreen === false ? <> <Button onClick={() => { continueScreen() }}> Yes</Button>
              <Button onClick={() => { NextScreen() }} > No</Button></> : <Button onClick={() => { HandleScreen() }} > Ok</Button>}

            {/* <Img
              src={preloadedAssets.next}
              className="replay_buttons"
            /> */}
          </>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModelPopup;