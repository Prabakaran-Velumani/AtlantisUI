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
   console.log(profile.score)
  //  console.log()
  return (
    <>
      {imageSrc && (
        <>
          <Box className="thankyou-screen">
            <Box className="thankyou-screen-box">
              <Img src={imageSrc} className="bg-Img" />
            </Box>
            <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              position={'relative'}
            >
              <Box className="title" mt={'80px'}>
                <Text fontFamily={'AtlantisContent'} textAlign={'center'}>
                  Do You Want Play Again ?
                </Text>
              </Box>
              <Box
                // onClick={() => getData(data)}
                position={'fixed'}
                top={'360px'}
                w={'40%'}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Img
                  src={ReplayBtn}
                  w={'200px'}
                  h={'60px'}
                  cursor={'pointer'}
                  onClick={replayGame}
                />
                {formData?.gameMinScore < profile?.score ? (
                  <Img
                    src={next}
                    w={'200px'}
                    h={'60px'}
                    cursor={'pointer'}
                    onClick={() => getData(data)}
                  />
                ) : null}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ReplayGame;
