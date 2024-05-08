import { Box, Grid, GridItem, Icon, Img, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { FaLanguage } from "react-icons/fa6";

interface GameIntroType {
  preloadedAssets: any;
  setCurrentScreenId: (id: number) => void;
  setIsGetsPlayAudioConfirmation: (value: boolean) => void;
  setPreLogDatas?: any;
  getPrevLogDatas?: any;
  setprevScreenId?: any;
  currentScreenId?: any;
  setModelControl: any;
  gameInfo: any;
  setLastModified: any;
  hasMulitLanguages: boolean;
  setIsOpenCustomModal: (value: boolean)=> void;
}

const GameIntroScreen: React.FC<GameIntroType> = ({ preloadedAssets, setCurrentScreenId, setIsGetsPlayAudioConfirmation, setPreLogDatas, getPrevLogDatas, setprevScreenId, currentScreenId, setModelControl, gameInfo, setLastModified, hasMulitLanguages, setIsOpenCustomModal}) => {


  const Handlemodel = () => {
    // setprevScreenId((prev:any) => ([
    //     ...prev, currentScreenId
    //   ]));
    if (getPrevLogDatas.playerType === 'creator') {
      const getplayerid = getPrevLogDatas.playerId;
      if (getplayerid === gameInfo.gameCreatedUserId) {
        const getLastModifiedid = getPrevLogDatas.lastModifiedBlockSeq;
        if (getLastModifiedid !== null) {
          setLastModified(true);
          setModelControl(true);
          return false;
        }
        else {
          if (getPrevLogDatas.screenIdSeq.length > 0) {
            setModelControl(true);
            return false;
          }
          else
          {
            setCurrentScreenId(1);
            return false;
          }

        }
      }
    }

    const screenIdset = getPrevLogDatas.screenIdSeq[getPrevLogDatas.screenIdSeq.length - 1];
    if (screenIdset !== currentScreenId) {
      setPreLogDatas((prev: any) => ({
        ...prev,
        screenIdSeq: [...prev.screenIdSeq, currentScreenId]
      }));
    }
  
    // const screens1 = [1];
    // if (!screens1.includes(currentScreenId)) {
    //   console.log('getPrevLogDatas.screenIdSeq ***', getPrevLogDatas.screenIdSeq);
    //   if (getPrevLogDatas.screenIdSeq != null) {
    //     const myArray = JSON.parse(getPrevLogDatas.screenIdSeq);
    //     const lastValue = myArray[myArray.length - 1];
    //     console.log('getPrevLogDatas&&&', lastValue, '...', JSON.parse(getPrevLogDatas.screenIdSeq));
    //     setModelControl(true);
    //     return false;
    //   }

    // }


  }
  return (
    <Box
      position="relative"
      maxW="100%"
      w={'100vw'}
      height="100vh"
      backgroundImage={preloadedAssets.backgroundImage}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      className="chapter_potrait"
    >
       {hasMulitLanguages && (
      <>
        <Box className="intro_lang_icon" onClick={()=>setIsOpenCustomModal(true)}>
        <Icon as={FaLanguage} w={"4em"} h={"3em"} />
        </Box>
      </>
      )}
      <Grid
        templateColumns="repeat(1, 1fr)"
        gap={4}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        className="story_note_grid"
      >
        <GridItem colSpan={1}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            position={'relative'}
          >
            <Img
              src={preloadedAssets.Login}
              className={'first_play'}
            />
            <Box className={'play_screen_content'}>
              <Box>
                <Box
                  w={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <Text className={'play_screen_heading'}>
                    Atlantis
                  </Text>
                </Box>
              </Box>
              <Box>
                <Box
                  w={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <Text className={'play_screen_text'}>
                    Welcome To
                  </Text>
                </Box>
                <Box
                  w={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
                  mb={{ base: 0, lg: 2 }}
                >
                  <Text className={'play_screen_text'}>
                    The Demo Play
                  </Text>
                </Box>
                <Box
                  w={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <Button
                    w={'90%'}
                    h={'5vh'}
                    bg={'none'}
                    _hover={{ bg: 'none' }}
                    onClick={() => {
                      setIsGetsPlayAudioConfirmation(true);
                      Handlemodel();
                    }}
                  ></Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default GameIntroScreen;