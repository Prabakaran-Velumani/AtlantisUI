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
  gameInfo
}) => {
    const [geFinalscorequest, SetFinalscore] = useState(null);
    const { profile, setProfile } = useContext<{ profile: any, setProfile: any }>(ScoreContext);

    useEffect(() => {
        const scores = profile?.score;
        const sums = scores.reduce((accumulator: { [key: string]: number }, score: any) => {
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
console.log('geFinalscorequest',geFinalscorequest)
console.log('profileData',profileData)
console.log('profile',profile)
console.log('gameInfo',gameInfo.gameQuest)


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
                      <Text className='text'>{true ? Math.floor(currentScreenId ===2 ? (geFinalscorequest / (gameInfo?.gameQuest?.gameTotalScore ?? 1000)) : ((parseInt(profile?.currentQuest)-1) - gameInfo?.gameQuest?.length)) : 0}%</Text>
                      <Box className='progressing'>
                        {Array.from({ length: Math.floor(currentScreenId === 2 ? (parseInt(geFinalscorequest) / (parseInt(gameInfo?.gameQuest?.gameTotalScore) ?? 1000)) : ((parseInt(profile?.currentQuest)-1)-gameInfo?.gameQuest?.length))}, (_, index) => (
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
                    //  onChange={handleMusicVolume} value={rangeValue?.musicVolume}
                    >
                      <SliderTrack
                        className="slider-track"
                        height="15px"
                        borderRadius="80px"
                      >
                        {/* <Img src={VolumeTrack} /> */}
                        <SliderFilledTrack
                          className="filled-volume"
                          bg="pink.500"
                        />
                      </SliderTrack>
                      <SliderThumb
                        boxSize={9}
                        background={'transparent'}
                        left={'calc(100% - 30%)'}
                      >
                        <Img src={preloadedAssets.SliderPointer} />
                      </SliderThumb>
                    </Slider>
                  </Box>
                  <Box className="voice-volume volumes">
                    <Slider
                      aria-label="slider-ex-4"
                      defaultValue={30}
                      name="voiceVolume"
                    // onChange={handleVoiceVolume} value={rangeValue?.voiceVolume}
                    >
                      <SliderTrack
                        className="slider-track"
                        height="15px"
                        borderRadius="80px"
                      >
                        <SliderFilledTrack
                          className="filled-volume"
                          bg="pink.500"
                        />
                      </SliderTrack>
                      <SliderThumb boxSize={9} background={'transparent'}>
                        <Img src={preloadedAssets.SliderPointer} />
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
