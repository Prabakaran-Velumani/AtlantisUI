import React from 'react'
import {Box, Flex,Text,Img} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { updatePreviewData } from 'store/preview/previewSlice';


const PreviewEndOfStory : React.FC<{preloadedAssets: any, setEndOfQuest:any}>= ({preloadedAssets, setEndOfQuest}) => {
const dispatch = useDispatch();
 
  const replayQuest = () => {
    dispatch(updatePreviewData({ activeBlockSeq: 1 }));
    setEndOfQuest(false);
  };

  return (
    <Flex className="end-of-quest" direction="column" align="center" position="relative">
      <Img src={preloadedAssets?.backgroundImage} className="eoq-bg-img" />
      {preloadedAssets.Screen6 && (
        <Box
          className="overlay-container"
          position="absolute"
          top="1110"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box className="thankyou-screen-box" zIndex="1">
            <Img src={preloadedAssets.Screen6} className="bg-Img" />
            <Text fontFamily="AtlantisContent" textAlign="center"top={'-200px'} color="white" fontSize="2xl" zIndex="2">
              You are at the end of the Quest..! Do You Want to Play this Quest Again..!?
            </Text>
          </Box>
          <Flex
            mt="1"
            direction="column"
            align="center"
            justifyContent="center"
            className="eoq-replay-img"
            zIndex="2"
          >
            <Img
              src={preloadedAssets?.replayBtn}
              w="200px"
              h="60px"
              cursor="pointer"
              onClick={replayQuest}
            />
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default PreviewEndOfStory;
