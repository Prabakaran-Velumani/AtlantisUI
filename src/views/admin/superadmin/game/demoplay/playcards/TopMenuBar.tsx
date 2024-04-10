import {
  Box,
  Button,
  Img,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
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
}

const TopMenuBar: React.FC<TopMenuProps> = ({
  dontShowTopMenu,
  preloadedAssets,
  currentScreenId,
  setCurrentScreenId,
  isSettingOpen,
  setIsSettingOpen,
  setHomeLeaderBoard,
  profileData
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

  return (
    <Box className="top-menu-home-section">
      {dontShowTopMenu ? (
        <>
          <Img src={preloadedAssets.TopMenu} className="top-menu-img" />
          <Img
            src={preloadedAssets.home}
            className={'top-home-menu'}
            onClick={() => setCurrentScreenId(1)}
          />
          <Img
            src={preloadedAssets.Overview}
            className="overview-img"
            onClick={handleOverView}
          />
          <Img
            src={preloadedAssets.Setting}
            className="setting-img"
            onClick={() => setIsSettingOpen(true)}
          />
          <Box className="score-box">
            <Text className="text">
            {/* <Text fontFamily={'AtlantisText'} textAlign={'center'}> */}
                {geFinalscorequest ? geFinalscorequest : 0}
            </Text>
          </Box>
        </>
      ) : null}

      {/* {permission.setting ? */}
      {isSettingOpen ? (
        <Box className="Setting-box">
          <Img src={preloadedAssets.SettingPad} className="setting-pad" />
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
                <SliderFilledTrack className="filled-volume" bg="pink.500" />
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
                <SliderFilledTrack className="filled-volume" bg="pink.500" />
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
              <Img src={preloadedAssets.Okay} />
            </Button>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default TopMenuBar;
