import { Box, Flex, Text, Img ,useBreakpointValue } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updatePreviewData } from 'store/preview/previewSlice';
import Replay from 'assets/img/screens/Replay.png';


const PreviewEndOfStory : React.FC<{preloadedAssets: any, setEndOfQuest:any, replayQuest: ()=> void}>= ({preloadedAssets, setEndOfQuest, replayQuest}) => {

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
          
          <Box className="end-screen" >
            <Img src={Replay} className="bg-Img1" /></Box>
            {/* <Text  position={'relative'} fontFamily="AtlantisContent" textAlign="center" bottom={'390px'} color="white" fontSize="2xl" zIndex="999999">
              Do You Want to Play Again?
            </Text> */}
            <Box className='end-screen-text'  position={'absolute'} fontSize={'5vw'} fontFamily="AtlantisContent" textAlign="center" color="white"  zIndex="999999"> <Text>
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
