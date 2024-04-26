




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

const ReplayPoints: React.FC<{
  setType: any;
  setData: any;
  preloadedAssets: any;
  demoBlocks: any;
  profile: any;
  setCurrentScreenId: (id: number)=>void;
}> = ({
  setData,
  setType,
  preloadedAssets,
  demoBlocks,
  profile,
  setCurrentScreenId
}) => {

    const handleReplayButtonClick = () => {
        
      console.log('demoBlocks', demoBlocks['1']['1']);
      console.log('profile', profile);
    

      
      // setType(gameInfo?.blocks[profile?.currentQuest]['1']?.blockChoosen);
      // setData(gameInfo?.blocks[profile?.currentQuest]['1']);

      setType(demoBlocks[profile?.currentQuest]['1']?.blockChoosen);
      setData(demoBlocks[profile?.currentQuest]['1']);
      setCurrentScreenId(2);
       
  };


  


  return (

    <>
      {preloadedAssets.backgroundImage && (
        <>
          <Box className="takeaway-screen">
            <Box className="takeaway-screen-box">
              <Box position={'relative'}>
                <Img src={preloadedAssets.backgroundImage} className="bg-replay" />
                <Box className="replay_content">
                  <Box className="replay_content_center">
                    <Box className="title_replay">
                      <Text fontFamily={'AtlantisContent'} textAlign={'center'}>
                                { "You have been redirected to replay point. Click replay button to continue...!"}
                      </Text>
                    </Box>
                    <Box
                      w={'100%'}
                      display={'flex'}
                      justifyContent={'center'}
                    >
                      <Img
                        src={preloadedAssets.replayBtn}
                        className="replay_buttons"
                        onClick={handleReplayButtonClick}
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

export default ReplayPoints;
