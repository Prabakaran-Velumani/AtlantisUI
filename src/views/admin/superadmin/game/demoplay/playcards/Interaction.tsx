import React from 'react'
import { Box, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { API_SERVER } from 'config/constant';
import { motion } from 'framer-motion';

interface InteractionProps {
  backGroundImg: any;
  data: any;
  options: any;
  optionClick: any;
  prevData: any;
  InteractionFunction: () => void;
  option: any;
  isScreenshot?: boolean;
  navTrack?: any;
  preloadedAssets: any;
  selectedPlayer: any;
}

const Interaction: React.FC<InteractionProps> = ({ backGroundImg, data, option, options, optionClick, prevData, InteractionFunction, isScreenshot, navTrack, preloadedAssets, selectedPlayer}) => {

  return (
    <Box
      position="relative"
      w={'100%'}
      height="100vh"
      backgroundImage={backGroundImg}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      className='chapter_potrait'
    >
      <Grid
        templateColumns="repeat(1, 1fr)"
        gap={4}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={'90%'}
      >

        <GridItem colSpan={1} position={'relative'}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box position={'relative'} className="story_interaction_image">
              <Img src={preloadedAssets.parch} w={'auto'} h={'100%'} loading="lazy" />
              <Box
                position={'absolute'}
                top={{ base: '5%', md: '6%' }}
                className="story_interaction_content"
              >
                <Box
                  textAlign={'center'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontWeight={500}
                  fontSize={{ md: '3vw', lg: '2.5vw' }}
                  fontFamily={'AtlantisText'}
                  lineHeight={1}
                  w={'100%'}
                  h={'10%'}
                  className={'interaction_heading_potrait'}
                >
                  <Box w={'80%'} color={'#312821'}>
                    Interaction{' '}
                  </Box>
                </Box>
                <Box
                  textAlign={'center'}
                  h={'25%'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontWeight={500}
                  fontFamily={'AtlantisText'}
                  lineHeight={1}
                  w={'96%'}
                  overflowY={'scroll'}
                  marginTop={'15px'}
                >
                  <Box
                    className={'story_intraction_question'}
                    justifyContent={'flex-start'}
                  >
                    <Img
                      src={preloadedAssets.qs}
                      h={'1em'}
                      w={'1em'}
                    />
                    {data?.blockText}
                  </Box>
                </Box>
                <Box
                  mt={'10px'}
                  w={'100%'}
                  h={'40%'}
                  fontWeight={500}
                  overflowY={'scroll'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <Box w={'60%'}>
                    {options &&
                      options.map((item: any, ind: number) => (
                        <Box
                          w={'100%'}
                          mb={'10px'}
                          lineHeight={1}
                          key={ind}
                          color={option === ind ? 'purple' : ''}
                          textAlign={'center'}
                          cursor={'pointer'}
                          onClick={() => optionClick(item, ind)}
                          fontFamily={'AtlantisText'}
                        >
                          <Img
                            src={option === ind ? preloadedAssets.on : preloadedAssets.off}
                            h={'4vh'}
                            w={'100%'}
                          />
                          <Box className={'story_interaction_option'}>
                            {item?.qpOptionText}
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </Box>
                <Box
                  w={'98%'}
                  display={'flex'}
                  justifyContent={navTrack.length > 1 ? 'space-between' : 'end'}
                >
                  {navTrack.length > 1 &&
                    <Img
                      src={preloadedAssets.left}
                      className={'interaction_button'}
                      onClick={() => prevData(data)}
                    />}
                  {option !== null && (
                    <Box className={'blinking-wave'} onClick={() => InteractionFunction()} borderRadius={'50%'}>
                      <Img
                        src={preloadedAssets.right}
                        className={'interaction_button'}
                        onClick={() => InteractionFunction()}
                      /></Box>
                  )}
                </Box>
              </Box>
            </Box>
          </motion.div>
        </GridItem>
      </Grid>
            {selectedPlayer && (
                <Img
                  src={`${API_SERVER}/${selectedPlayer}`}
                  className={'narrator_character_image'}
                  loading="lazy"
                />
              )}
              {preloadedAssets?.nonplayerImage && (
                <Img
                  src={preloadedAssets?.nonplayerImage}
                  className={'player_character_image'}
                  loading="lazy"
                />
              )}
    </Box>
  )
}

export default Interaction;