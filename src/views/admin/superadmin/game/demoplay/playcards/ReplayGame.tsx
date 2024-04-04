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
  isOptionalReplay:any;
  setisOptionalReplay:any;
  profilescore:any;
  setisReplay:any;
  isReplay:any;
  data?: any;
  gameInfo:any;
  type?:any;
  setType:any;
  setData:any;
  replayNextHandler: any;
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
}) => {
   const { profile } = useContext(ScoreContext);
   

  //  const nextNavigation = (data:any)=>{
  //    if(data && type)
  //    {
  //        setCurrentScreenId(13);
  //        return false;
  //    }
  //    else{
  //     if (gameInfo?.gameData?.gameIsShowReflectionScreen === 'true') {
  //       setCurrentScreenId(3);
  //       return false;
  //     } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
  //       setCurrentScreenId(7);
  //       return false;
  //     }
  //     else {
  //       setType(null);
  //       setData(null);
  //       setCurrentScreenId(5);
  //       return false;
  //     }
  //    }
  // }

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
                  {isReplay === true ? `Your Are Only ${profilescore} Points Away From A Perfect Score  Would You Like To Replay` : (isOptionalReplay === true)?`Your Score is to low. So U have to play Again` : 'Do You Want Play Again ?'}
                 {/* {isOptionalReplay === true ? `Your Score is to low. So U have to play Again`  : 'Do You Want Play Again ?'}  */}
                </Text>
              </Box>
              <Box
                position={'fixed'} 
                top={'360px'}
                w={'40%'}
                display={'flex'}
                justifyContent={'center'}
              >
                 {(isReplay === true || isOptionalReplay === true) ?
                <Img
                  src={ReplayBtn}
                  w={'200px'}
                  h={'60px'}
                  cursor={'pointer'}
                  onClick={replayGame}
                />: null}
                  <Img
                    src={next}
                    w={'200px'}
                    h={'60px'}
                    cursor={'pointer'}
                    onClick={() => replayNextHandler(data)}
                  />
               
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ReplayGame;
