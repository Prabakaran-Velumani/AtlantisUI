import { Box, Grid, GridItem, Img, Button, Text } from '@chakra-ui/react';
import React from 'react'

interface GameIntroType {
    preloadedAssets: any;
    setCurrentScreenId: (id:number)=> void;
    setIsGetsPlayAudioConfirmation: (value: boolean)=>void;
}

const GameIntroScreen : React.FC<GameIntroType> = ({preloadedAssets, setCurrentScreenId, setIsGetsPlayAudioConfirmation}) => {

    return (
    <Box
    position="relative"
    maxW="100%"
    w={'100vw'}
    height="100vh"
    backgroundImage={preloadedAssets.backgroundImage}
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
      <GridItem colSpan={1}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          position={'relative'}
        >
          <Img
            src={preloadedAssets.Login}
            className={'first_play'}
          />
          <Box className={'play_screen_content'}>
            <Box>
              <Box
                w={'100%'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Text className={'play_screen_heading'}>
                  Atlantis
                </Text>
              </Box>
            </Box>
            <Box>
              <Box
                w={'100%'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Text className={'play_screen_text'}>
                  Welcome To
                </Text>
              </Box>
              <Box
                w={'100%'}
                display={'flex'}
                justifyContent={'center'}
                mb={{ base: 0, lg: 2 }}
              >
                <Text className={'play_screen_text'}>
                  The Demo Play
                </Text>
              </Box>
              <Box
                w={'100%'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Button
                  w={'90%'}
                  h={'5vh'}
                  bg={'none'}
                  _hover={{ bg: 'none' }}
                  onClick={() => {
                    setCurrentScreenId(1);
                    setIsGetsPlayAudioConfirmation(true);
                  }}
                ></Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  </Box>
  )
}

export default GameIntroScreen;