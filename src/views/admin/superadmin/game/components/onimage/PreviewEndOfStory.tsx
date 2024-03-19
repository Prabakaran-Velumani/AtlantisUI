import { Box, Flex, Text, Img ,useBreakpointValue } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updatePreviewData } from 'store/preview/previewSlice';
import Replay from 'assets/img/screens/Replay.png';


const PreviewEndOfStory : React.FC<{preloadedAssets: any, setEndOfQuest:any}>= ({preloadedAssets, setEndOfQuest}) => {
const dispatch = useDispatch();
 
  const replayQuest = () => {
    dispatch(updatePreviewData({ activeBlockSeq: 1 }));
    setEndOfQuest(false);
  };
  const baseFontSize = 22;
  const fontSize = useBreakpointValue({
    base: `${baseFontSize}px`, // base font size for mobile
    sm: `${baseFontSize * 1.2}px`, // font size for tablets
    md: `${baseFontSize * 1.4}px`, // font size for small desktops
    lg: `${baseFontSize * 1.6}px`, 
  });

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
            <Box className='end-screen-text'  position={'absolute'} fontSize={fontSize} fontFamily="AtlantisContent" textAlign="center" color="white"  zIndex="999999"> <Text>
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
