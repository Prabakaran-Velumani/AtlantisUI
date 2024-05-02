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
import React,{useEffect, useState, useContext} from 'react';
import { ScoreContext } from '../GamePreview';

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
  data:any;
  setAudioObj: (obj:any)=>void;
  audioObj: any;
}

const TopMenuBar: React.FC<TopMenuProps> = ({
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

useEffect(()=>{

  const progressResult = ()=>{
  //calculate Progress based on screen, Need to show different progress for current screen is in story, progress of the current quest, unless  show the entire game progress
  if(currentScreenId === 2) {
    const currentQuestBlocks = demoBlocks[profile?.currentQuest];
    const totalblockCount = Object.keys(currentQuestBlocks).length;
    const keyWithValueOfCurrentBlock = Object.keys(currentQuestBlocks).find((key: any) => {
      const obj = currentQuestBlocks[key];
      const blockPrimarySequence = obj?.blockPrimarySequence;
      if (blockPrimarySequence) {
          const hasMatchingSequence = blockPrimarySequence.trim() === (data?.blockPrimarySequence || '').trim();
          return hasMatchingSequence;
      }
      return false;
  });
    const progressBarRatio:any = keyWithValueOfCurrentBlock && (parseInt(keyWithValueOfCurrentBlock) > 0 ? (parseInt(keyWithValueOfCurrentBlock)-1)/totalblockCount: 0 );
    setProgressPercent(progressBarRatio && progressBarRatio > 0 ? progressBarRatio :0 );
  }
  else{
    const completedQuest = profile?.completedLevels.length-1;
    console.log('profile?.completedLevels', profile?.completedLevels)
    let gameProgress = 0;
    if(completedQuest > 0)
      { 
        gameProgress = completedQuest/gameInfo?.gameQuest?.length;
      }
      setProgressPercent(gameProgress && gameProgress > 0 ? gameProgress :0 );
  }
  }

  progressResult();
},[data, currentScreenId])

const handleMusicVolume = (vol: any)=>{
  console.log('Volume : ', vol);
  setAudioObj((prev: any)=>({...prev, "volume": vol}));
}


  return (
    <Box className="top-menu-home-section">
              {dontShowTopMenu ? (
                <>
                  <Img src={preloadedAssets.TopMenu} className="top-menu-img" />
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
                    className={'top-home-menu'}
                    onClick={() => setCurrentScreenId(1)}
                  />
                  </Tooltip>
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

                    <Box className='progress-box'>
                      {/* <Text className='text'>{BlockNo ? Math.floor(progressPercentage) : 0}%</Text> */}
                      <Text className='text'>{Math.floor(progressPercent*100)}%</Text>
                      {/* <Box className='progressing'>
                        {Array.from({ length: Math.floor(currentScreenId === 2 ? 
                                  ((parseInt(geFinalscorequest) / (parseInt(gameInfo?.gameQuest?.gameTotalScore) ?? 1000))) : (((parseInt(profile?.currentQuest)-1) > 0) ? ((parseInt(profile?.currentQuest)-1)-gameInfo?.gameQuest?.length) : 0))}, (_, index) => (  
                          <Box key={index} className='level'></Box>
                        ))}
                      </Box> */}
                      <Box className='progressing'>
                        {Array.from({ length: Math.floor(progressPercent*100/10)}, (_, index) => (  
                          <Box key={index} className='level'></Box>
                        ))}
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
                    className="overview-img"
                    onClick={handleOverView}
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
                    className="setting-img"
                    onClick={() => setIsSettingOpen(true)}
                  />
                  </Tooltip>
                  <Box className="score-box">
                    <Text className="text">
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
                </>
              ) : null}

              {/* {permission.setting ? */}
              {isSettingOpen ? (
                <Box className="Setting-box">
                  <Img
                    src={preloadedAssets.SettingPad}
                    className="setting-pad"
                  />
                  <Box className="music-volume volumes">
                    <Slider
                      aria-label="slider-ex-4"
                      defaultValue={30}
                      name="musicVolume"
                      onChangeEnd={(val) => {handleMusicVolume(val); console.log("Music Volume Level ---", val);}}
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
                </Box>
              ) : null}
            </Box>
  );
};

export default TopMenuBar;