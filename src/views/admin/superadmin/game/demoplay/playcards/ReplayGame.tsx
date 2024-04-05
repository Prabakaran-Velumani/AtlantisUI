import { Box, Icon, Img, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import ReplayBtn from 'assets/img/games/ReplayBtn.png';
import next from 'assets/img/screens/next.png';
import { ScoreContext } from '../GamePreview';
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const ReplayGame: React.FC<{
  formData: any;
  imageSrc: any;
  replayGame: any;
  setCurrentScreenId: any;
  getData?: any;
  isOptionalReplay: any;
  setisOptionalReplay: any;
  profilescore: any;
  setisReplay: any;
  isReplay: any;
  data?: any;
  gameInfo: any;
  type?: any;
  setType: any;
  setData: any;
  replayNextHandler: any;
  preloadedAssets: any;
}> = ({
  formData,
  imageSrc,
  replayGame,
  replayNextHandler,
  setisReplay,
  setisOptionalReplay,
  isOptionalReplay,
  profilescore,
  gameInfo,
  setData,
  setType,
  isReplay,
  setCurrentScreenId,
  getData,
  data,
  type,
  preloadedAssets
}) => {
  const { profile } = useContext(ScoreContext);

  return (
    <>
      {imageSrc && (
        <>
          <Box className="takeaway-screen">
            <Box className="takeaway-screen-box">
              <Box position={'relative'}>
                <Img src={imageSrc} className="bg-replay" />
                <Box className="replay_content">
                  <Box className="replay_content_center">
                    <Box className="title_replay">
                      <Text fontFamily={'AtlantisContent'} textAlign={'center'}>
                        {isReplay === true
                          ? `Your Are Only ${profilescore} Points Away From A Perfect Score  Would You Like To Replay`
                          : isOptionalReplay === true
                          ? `Your Score is to low. So U have to play Again`
                          : 'Do You Want Play Again ?'}
                      </Text>
                    </Box>
                    <Box
                      w={'100%'}
                      display={'flex'}
                      justifyContent={
                        formData?.gameMinScore < profile?.score
                          ? 'space-between'
                          : 'center'
                      }
                    >
                      {isReplay === true || isOptionalReplay === true ? (
                        <Img
                          src={preloadedAssets.ReplayBtn}
                          className="replay_buttons"
                          onClick={replayGame}
                        />
                      ) : null}
                      <Img
                        src={preloadedAssets.next}
                        className="replay_buttons"
                        onClick={() => replayNextHandler(data)}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ReplayGame;
