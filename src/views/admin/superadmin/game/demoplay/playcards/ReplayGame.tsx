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
  data?: any;
}> = ({
  formData,
  imageSrc,
  replayGame,
  setCurrentScreenId,
  getData,
  data,
}) => {
  const { profile } = useContext(ScoreContext);
  console.log(profile.score);
  //  console.log()
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
                        Do You Want Play Again ?
                      </Text>
                    </Box>
                    <Box
                      // onClick={() => getData(data)}
                      // position={'fixed'}
                      // top={'360px'}
                      w={'100%'}
                      display={'flex'}
                      justifyContent={formData?.gameMinScore < profile?.score ? 'space-between' : 'center'}
                      // justifyContent={'space-between'}
                    >
                      <Img
                        src={ReplayBtn}
                        className='replay_buttons'
                        onClick={replayGame}
                      />
                      {formData?.gameMinScore < profile?.score ? (
                        <Img
                          src={next}
                          className='replay_buttons'
                          onClick={() => getData(data)}
                        />
                       ) : null} 
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
