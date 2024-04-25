import {
  Box,
  Button,
  Img,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import { ScoreContext } from '../GamePreview';
import { motion } from 'framer-motion';
interface TopMenuProps {
  dontShowTopMenu: boolean;
  preloadedAssets: any;
  currentScreenId: number;
  setCurrentScreenId: (id: number) => void;
  isSettingOpen: boolean;
  setIsSettingOpen: (opt: boolean) => void;
  setHomeLeaderBoard: (id: number) => void;
  profileData: any;
  gameInfo: any;
  demoBlocks: any;
  data: any;
  setAudioObj: (obj: any) => void;
  audioObj: any;
  setIsLanguage: any;
}

const TopMenuBar: React.FC<TopMenuProps> = ({
  setIsLanguage,
  dontShowTopMenu,
  preloadedAssets,
  currentScreenId,
  setCurrentScreenId,
  isSettingOpen,
  setIsSettingOpen,
  setHomeLeaderBoard,
  profileData,
  gameInfo,
  demoBlocks,
  data,
  setAudioObj,
  audioObj
}) => {
  const [geFinalscorequest, SetFinalscore] = useState(null);
  const { profile, setProfile } = useContext<{ profile: any, setProfile: any }>(ScoreContext);
  const [progressPercent, setProgressPercent] = useState<any>(0);

  useEffect(() => {
    const scores = profile?.score;
    const sums = scores?.reduce((accumulator: { [key: string]: number }, score: any) => {
      const quest = score.quest;
      accumulator[quest] = (accumulator[quest] || 0) + score.score;
      return accumulator;
    }, 0);
    SetFinalscore(sums);
  }, []);

  const handleOverView = () => {
    setHomeLeaderBoard(currentScreenId);
    setCurrentScreenId(15); //overview Screen
  };

  useEffect(() => {

    const progressResult = () => {
      //calculate Progress based on screen, Need to show different progress for current screen is in story, progress of the current quest, unless  show the entire game progress
      if (currentScreenId === 2) {
        const currentQuestBlocks = demoBlocks[profile?.currentQuest];
        const totalblockCount = Object.keys(currentQuestBlocks).length;
        const keyWithValueOfCurrentBlock = Object.keys(currentQuestBlocks).find((key: any) => {
          const obj = currentQuestBlocks[key];
          const blockPrimarySequence = obj?.blockPrimarySequence;
          if (blockPrimarySequence) {
            const hasMatchingSequence = blockPrimarySequence.trim() === (data?.blockPrimarySequence || '').trim();
            return hasMatchingSequence;
          }
      //     return false;
      //   });
      //   const progressBarRatio: any = keyWithValueOfCurrentBlock && (parseInt(keyWithValueOfCurrentBlock) > 0 ? (parseInt(keyWithValueOfCurrentBlock) - 1) / totalblockCount : 0);
      //   setProgressPercent(progressBarRatio && progressBarRatio > 0 ? progressBarRatio : 0);
      // }
      return false;
  });
    const progressBarRatio:any = keyWithValueOfCurrentBlock && (parseInt(keyWithValueOfCurrentBlock) > 0 ? (parseInt(keyWithValueOfCurrentBlock)-1)/totalblockCount: 0 );
    setProgressPercent(progressBarRatio && progressBarRatio > 0 ? progressBarRatio :0 );
      }
      else{
        const completedQuest = profile?.completedLevels.length-1;
        // console.log('profile?.completedLevels', profile?.completedLevels)
        let gameProgress = 0;
        if(completedQuest > 0)
          { 
            gameProgress = completedQuest/gameInfo?.gameQuest?.length;
          }
        }
      }
    progressResult();
  }, [data, currentScreenId])

const handleMusicVolume = (vol: any)=>{
  // console.log('Volume : ', vol);
  setAudioObj((prev: any)=>({...prev, "volume": vol}));
}


  return (
    <Box className="top-menu-home-section">
      {dontShowTopMenu && !isSettingOpen ? (
        <>
          <Box w='100%' h='auto' position={'relative'}>
            <Img src={preloadedAssets.TopMenu} className="top-menu-img" h={'auto !important'} />
            <Box className='new-top-menu' >
              <Box w={'10%'} h={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Tooltip label="Home"
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  background={'transparent'}
                  boxShadow={'unset'}
                  backgroundImage={preloadedAssets.TooltipImg}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'contain'}
                  backgroundPosition={'center'}
                  filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                  padding={'10px'}
                  height={'70px'}
                  w={'150px'}
                  fontSize={'29px'}
                  fontFamily={'Atlantis'}
                  color={'#000'}
                  overflow={'hidden'}
                  lineHeight={'25px'}
                >
                  <Img
                    src={preloadedAssets.home}
                    width={'auto'}
                    height={'70%'}
                    position={'relative'}
                    zIndex={9999}
                    onClick={() => setCurrentScreenId(1)}
                  />
                </Tooltip>
                <Tooltip label="Profile"
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  background={'transparent'}
                  boxShadow={'unset'}
                  backgroundImage={preloadedAssets.TooltipImg}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'contain'}
                  backgroundPosition={'center'}
                  filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                  padding={'10px'}
                  height={'70px'}
                  w={'150px'}
                  fontSize={'29px'}
                  fontFamily={'Atlantis'}
                  color={'#000'}
                  overflow={'hidden'}
                  lineHeight={'25px'}
                >
                  <Img
                    src={preloadedAssets.Profile}
                    width={'auto'}
                    height={'70%'}
                    position={'relative'}
                    zIndex={9999}
                    onClick={() => setCurrentScreenId(1)}
                  />
                </Tooltip>
              </Box>
              <Box w={'42.5%'} >
                <Box w='90%' h={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
                  <Tooltip label="Progress"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    background={'transparent'}
                    boxShadow={'unset'}
                    backgroundImage={preloadedAssets.TooltipImg}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'contain'}
                    backgroundPosition={'center'}
                    filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                    padding={'10px'}
                    height={'70px'}
                    w={'150px'}
                    fontSize={'29px'}
                    fontFamily={'Atlantis'}
                    color={'#000'}
                    overflow={'hidden'}
                    lineHeight={'25px'}
                  >
                    <Box h={'70%'} w={'auto'} position={'relative'} zIndex={9999}>
                      <Img src={preloadedAssets?.ProgressBar} h={'100%'} width={'auto'} />
                      <Box position={'absolute'} display={'flex'} top={0} left={'4%'} w={'90%'} h={'100%'}>
                        <Box w={'28.5%'} display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100%'}>
                          <Text textAlign={'center'} className='progress_percentage'>{Math.floor(progressPercent * 100)}%</Text>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} w={'70%'} h={'100%'} >
                          {Array.from({ length: Math.floor(progressPercent * 100 / 10) }, (_, index) => (
                            <Box w={'9%'} h={'40%'} ml={'1%'} background={'linear-gradient(to bottom, #009400, #00000000)'}></Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Tooltip>
                  <Tooltip label="Score"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    background={'transparent'}
                    boxShadow={'unset'}
                    backgroundImage={preloadedAssets.TooltipImg}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'contain'}
                    backgroundPosition={'center'}
                    filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                    padding={'10px'}
                    height={'70px'}
                    w={'150px'}
                    fontSize={'29px'}
                    fontFamily={'Atlantis'}
                    color={'#000'}
                    overflow={'hidden'}
                    lineHeight={'25px'}
                  >
                    <Box h={'70%'} w={'auto'} position={'relative'} zIndex={9999}>
                      <Img src={preloadedAssets?.Scorebox} h={'100%'} width={'auto'} />
                      <Box position={'absolute'} display={'flex'} justifyContent={'center'} alignItems={'center'} top={0} left={'26%'} w={'68%'} h={'100%'}>
                        <Text className="score_text">
                          {(profile &&
                            profile.score &&
                            profile.score.length > 0 &&
                            profile.score.reduce(
                              (accumulator: number, currentValue: any) => {
                                return accumulator + currentValue.score;
                              },
                              0,
                            )) ||
                            0}
                        </Text>
                      </Box>
                    </Box>
                  </Tooltip>
                  <Tooltip label="Overview"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    background={'transparent'}
                    boxShadow={'unset'}
                    backgroundImage={preloadedAssets.TooltipImg}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'contain'}
                    backgroundPosition={'center'}
                    filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                    padding={'10px'}
                    height={'70px'}
                    w={'150px'}
                    fontSize={'29px'}
                    fontFamily={'Atlantis'}
                    color={'#000'}
                    overflow={'hidden'}
                    lineHeight={'25px'}
                  >
                    <Img
                      src={preloadedAssets.Overview}
                      onClick={handleOverView}
                      width={'auto'}
                      height={'70%'}
                      position={'relative'}
                      zIndex={9999}
                    />
                  </Tooltip>
                  <Tooltip label="Settings"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    background={'transparent'}
                    boxShadow={'unset'}
                    backgroundImage={preloadedAssets.TooltipImg}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'contain'}
                    backgroundPosition={'center'}
                    filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                    padding={'10px'}
                    height={'70px'}
                    w={'150px'}
                    fontSize={'29px'}
                    fontFamily={'Atlantis'}
                    color={'#000'}
                    overflow={'hidden'}
                    lineHeight={'25px'}
                  >
                    <Img
                      src={preloadedAssets.Setting}
                      onClick={() => setIsSettingOpen(true)}
                      width={'auto'}
                      height={'70%'}
                      position={'relative'}
                      zIndex={9999}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : null}

      {isSettingOpen ? (
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
            <Img
              src={preloadedAssets.SettingPad}
              className="setting-pad"
            />
            <Box className="music-volume volumes">
              <Slider
                aria-label="slider-ex-4"
                defaultValue={30}
                name="musicVolume"
                onChangeEnd={(val) => { handleMusicVolume(val) }}
                value={audioObj.volume ?? 0}
              >
                <SliderTrack
                  className="slider-track"
                  height="15px"
                  borderRadius="80px"
                >
                  <Box position="relative">
                    <Img w={'100%'} h={'auto'} src={preloadedAssets.VolumeTrack} alt="Volume Track" />
                    <Box
                      position="absolute"
                      top="47%"
                      left="45%"
                      transform="translate(-50%, -50%)"
                      width="86%"
                    >
                      <SliderFilledTrack className="filled-volume" bg="pink.500" />
                    </Box>
                  </Box>
                  {/* <Box w={'100%'} h={'15px'} display={'flex'} justifyContent={'center'}>
                          <Box w={'75%'}>
                            <SliderFilledTrack
                              className="filled-volume"
                              bg="pink.500"
                            />
                          </Box>
                        </Box> */}
                </SliderTrack>
                <SliderThumb
                  boxSize={10}
                  background={'transparent'}
                // left={'calc(100% - 30%)'}
                >
                  <Img className='slider_thumb' src={preloadedAssets.SliderPointer} />
                </SliderThumb>
              </Slider>
            </Box>
            <Box className="voice-volume volumes">
              <Slider
                aria-label="slider-ex-4"
                defaultValue={30}
                name="voiceVolume"
              >
                <SliderTrack
                  className="slider-track"
                  height="15px"
                  borderRadius="80px"
                >
                  <Box position="relative">
                    <Img w={'100%'} h={'auto'} src={preloadedAssets.VolumeTrack} alt="Volume Track" />
                    <Box
                      position="absolute"
                      top="47%"
                      left="45%"
                      transform="translate(-50%, -50%)"
                      width="86%"
                    >
                      <SliderFilledTrack className="filled-volume" bg="pink.500" />
                    </Box>
                  </Box>
                </SliderTrack>
                <SliderThumb boxSize={9} background={'transparent'}>
                  <Img className='slider_thumb' src={preloadedAssets.SliderPointer} />
                </SliderThumb>
              </Slider>
            </Box>
            <Box className="btns">
              <Button
                className="okay-btn btn"
                onClick={() => setIsSettingOpen(false)}
              >
                <Img src={preloadedAssets.OkayBtn} />
              </Button>
            </Box>
          </motion.div>
        </Box>
      ) : null}
    </Box>
  );
};

export default TopMenuBar;
