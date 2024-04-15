import { Box, Icon, Img, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import ReplayBtn from 'assets/img/games/ReplayBtn.png';
import next from 'assets/img/screens/next.png';
import { ScoreContext } from '../GamePreview';
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const ReplayGame: React.FC<{
  formData?: any;
  imageSrc?: any;
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
  preloadedAssets,
}) => {
  const { profile } = useContext(ScoreContext);
  const [replayMessage, setReplayMessage] = useState<string>(null);
useEffect(()=>{
  const currentQuestMasterData =  gameInfo?.gameQuest[profile?.currentQuest -1];
  if(currentQuestMasterData.hasOwnProperty('gameTotalScore') )
    {
      if(isReplay === true && isOptionalReplay !== true){
        
        const differedScore = currentQuestMasterData?.gameTotalScore ? (parseInt(currentQuestMasterData?.gameTotalScore) - parseInt(profilescore)) : null ;
        setReplayMessage(`You are only ${differedScore ?? 'few'} points away from a perfect score. Would you like to replay?`)
      }
      else if(isOptionalReplay === true){
        setReplayMessage(`Your score is low. Would you like to play again?`);
      }
      else{
        setReplayMessage(`Would you like to play again?`);
      }
    }
},[]);


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
                          {replayMessage}
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
                      {isReplay === true ? (
                        <Img
                          src={preloadedAssets.replayBtn}
                          className="replay_buttons"
                          onClick={replayGame}
                        />
                      ) : isOptionalReplay === true ?
                      ( 
                        <>
                      <Img
                        src={preloadedAssets.replayBtn}
                        className="replay_buttons"
                        onClick={replayGame}
                      />
                      <Img
                        src={preloadedAssets.next}
                        className="replay_buttons"
                        onClick={() => replayNextHandler(data)}
                      /> </>) : null}
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
