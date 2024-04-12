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
    </>
  );
};

export default FeedBackScreen;
