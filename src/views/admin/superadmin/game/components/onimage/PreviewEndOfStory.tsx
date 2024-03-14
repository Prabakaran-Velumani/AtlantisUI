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
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          
          <Box className="thankyou-screen-box" >
            <Img src={preloadedAssets.Screen6} className="bg-Img" /></Box>
            <Box  position={'absolute'} fontSize={['xl', '2xl', '3xl']} fontFamily="AtlantisContent" textAlign="center" color="white"  zIndex="999999"> <Text  mb="4">
                  End of the current Quest.!
                </Text>
                <Text >
                  Do You Want Play Again ?
                </Text>
           
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
      </Box>
      )}
    </Flex>
  );
};

export default PreviewEndOfStory;
