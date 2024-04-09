import {
  Box,
  Grid,
  GridItem,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import next from 'assets/img/screens/next.png';
import feedi from 'assets/img/screens/feed.png';
import InteractionScreenShot from './InteractionScreenShot';
import Close from 'assets/img/games/close.png';
interface FeedBackScreenShotProps {
  backgroundScreenUrl: any;
  first: any;
  showNote: any;
  currentScreenId: any;
  isScreenshot: any;
  FeedbackremainingSentences: any;
  options: any;
  getData: any;
  data: any;
  FeedBackselectedoptionData: any;
  FeedBackoptionData: any;
  feed?: any;
  getFeedbackData: any;
  profile: any;
  setisScreenshot: any;
  preloadedAssets: any;
}
const FeedBackScreen: React.FC<FeedBackScreenShotProps> = ({
  backgroundScreenUrl,
  first,
  profile,
  showNote,
  isScreenshot,
  setisScreenshot,
  data,
  getData,
  FeedbackremainingSentences,
  options,
  currentScreenId,
  FeedBackselectedoptionData,
  FeedBackoptionData,
  feed,
  getFeedbackData,
  preloadedAssets,
}) => {
  const geTfeedBackoption = () => {
    setisScreenshot(false);
  };
  return (
    <>
      {/* <motion.div
              initial={{ opacity: 0, background: '#000' }}
              animate={{ opacity: 1, background: '#0000' }}
              transition={{ duration: 0.3, delay: 0.5 }}
            > */}
      <>
        <Box
          position="relative"
          w={'100%'}
          height="100vh"
          backgroundImage={backgroundScreenUrl}
          backgroundSize={'cover'}
          backgroundRepeat={'no-repeat'}
          className="chapter_potrait"
        >
          <Grid
            templateColumns="repeat(1, 1fr)"
            gap={4}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            className="story_note_grid"
          >
            <GridItem colSpan={1} position={'relative'}>
              <Box display={'flex'} justifyContent={'center'}>
                <Img
                  src={preloadedAssets.feedi}
                  className="story_note_image"
                  loading="lazy"
                />
                <Box
                  className={'story_note_content'}
                  // bg={'blue.300'}
                >
                  <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                    <Box className={'story_note_block'}>
                      <Text textAlign={'center'}>{feed}</Text>
                    </Box>
                  </Box>
                  <Box
                    w={'100%'}
                    onClick={() => getFeedbackData(data)}
                    mt={'20px'}
                    display={'flex'}
                    justifyContent={'center'}
                    cursor={'pointer'}
                    position={'fixed'}
                    top={'70%'}
                  >
                    <Img
                      src={preloadedAssets.next}
                      h={'7vh'}
                      className={'story_note_next_button'}
                    />
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Box>
        {currentScreenId === 9 ? (
          <>
            <Box>
              <React.Fragment>{feed}</React.Fragment>
            </Box>
            <Box
              w={'100%'}
              onClick={() => getData(data)}
              mt={'20px'}
              display={'flex'}
              justifyContent={'center'}
              cursor={'pointer'}
            >
              <Img src={preloadedAssets.next} w={'200px'} h={'60px'} />
            </Box>
          </>
        ) : (
          <>
            {FeedbackremainingSentences}
            {isScreenshot === true ? (
              <InteractionScreenShot
                data={FeedBackoptionData}
                option={FeedBackselectedoptionData}
                options={options}
                backGroundImg={backgroundScreenUrl}
                profile={profile}
                geTfeedBackoption={geTfeedBackoption}
                isScreenshot={isScreenshot}
                preloadedAssets={preloadedAssets}
              />
            ) : (
              ''
            )}
          </>
        )}
      </>
      {/* <Box
        w={'100%'}
        h={'100vh'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        position={'relative'}
        overflow={'visible'}
        style={{ perspective: '1000px' }}
      >
        <Box
          backgroundImage={backgroundScreenUrl}
          w={'100%'}
          h={'100vh'}
          backgroundRepeat={'no-repeat'}
          backgroundSize={'cover'}
          transform={`scale(${first ? 1 : 1.3}) translateY(${
            first ? 0 : -10
          }%) translateX(${first ? 0 : -10}%)`}
          transition={'transform 0.9s ease-in-out'}
        >
          <Box
            position={'fixed'}
            top={'200px'}
            right={'0px'}
            bottom={0}
            zIndex={999}
            w={'300px'}
          ></Box>
        </Box>
        <Box
          style={{
            transform: `scale(${showNote ? 0.2 : 1})`,
            transition: 'transform 0.5s ease-in-out',
          }}
          // ml={isScreenshot === true ? '-500px' : ''}
          position={'fixed'}
          w={'40%'}
          h={'80vh'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Img w={'80%'} h={'80vh'} src={preloadedAssets.feedi} />
          <Box
            position={'fixed'}
            w={'50%'}
            mt={'10px'}
            display={'flex'}
            flexDirection={'column'}
            textAlign={'center'}
            justifyContent={'center'}
            style={{
              fontWeight: '900',
              color: '#D9C7A2',
              fontSize: '18px',
              lineHeight: 1,
              fontFamily: 'cont',
            }}
          >
            {/* {feed} */}
      {/* {FeedbackremainingSentences} 
            {currentScreenId === 9 ? (
              <>
                <Box>
                  <React.Fragment>{feed}</React.Fragment>
                </Box>

                <Box
                  w={'100%'}
                  onClick={() => getData(data)}
                  mt={'20px'}
                  display={'flex'}
                  justifyContent={'center'}
                  cursor={'pointer'}
                >
                  <Img src={preloadedAssets.next} w={'200px'} h={'60px'} />
                </Box>
              </>
            ) : (
              <>
                {FeedbackremainingSentences}
                {isScreenshot === true ? (
                  <InteractionScreenShot
                    data={FeedBackoptionData}
                    option={FeedBackselectedoptionData}
                    options={options}
                    backGroundImg={backgroundScreenUrl}
                    profile={profile}
                    geTfeedBackoption={geTfeedBackoption}
                    isScreenshot={isScreenshot}
                    preloadedAssets={preloadedAssets}
                  />
                ) : (
                  ''
                )}
                <Box
                  w={'100%'}
                  onClick={() => getFeedbackData(data)}
                  mt={'20px'}
                  display={'flex'}
                  justifyContent={'center'}
                  cursor={'pointer'}
                >
                  <Img src={preloadedAssets.next} w={'200px'} h={'60px'} />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box> */}
      {/* </motion.div> */}
    </>
  );
};

export default FeedBackScreen;
