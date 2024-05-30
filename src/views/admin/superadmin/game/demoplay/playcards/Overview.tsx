import { Box, Button, Grid, GridItem, Icon, Img, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ImHappy } from 'react-icons/im';
import { TfiFaceSad } from 'react-icons/tfi';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { FaRegFaceMehBlank } from 'react-icons/fa6';
import { BsEmojiNeutral } from 'react-icons/bs';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { FaRegTired } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
  FaHatCowboy,
  FaRegCommentDots,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from 'react-icons/fa';

interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const ThankYou: React.FC<{
  formData: any;
  imageSrc: any;
  preloadedAssets: any;
  homeLeaderBoard: any;
  setCurrentScreenId: any;
  backGroundImg: any;
}> = ({
  formData,
  imageSrc,
  preloadedAssets,
  setCurrentScreenId,
  homeLeaderBoard,
  backGroundImg,
}) => {
  const handleHome = () => {
    // console.log('homeLeaderBoard', homeLeaderBoard);
    if (homeLeaderBoard) {
      setCurrentScreenId(homeLeaderBoard);
    }
  };

  return (
    <>
      {imageSrc && (
        <Box
          position="relative"
          maxW="100%"
          w={'100vw'}
          height="100vh"
          backgroundImage={backGroundImg}
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
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box display={'flex'} justifyContent={'center'}>
                  <Img
                    src={preloadedAssets.overview}
                    className="story_overview_image"
                    loading="lazy"
                  />
                  <Box
                    className={'story_overview_content'}
                  >
                    <Text className='story_overview_title' >Story Line...</Text>
                    <Box
                      w={'100%'}
                      display={'flex'}
                      justifyContent={'center'}
                    >
                      <Box className={'story_overview_block'}>
                        <Text>{formData.gameStoryLine}</Text>
                      </Box>
                      <Box
                        w={'100%'}
                        onClick={() => handleHome() }
                        display={'flex'}
                        justifyContent={'center'}
                        cursor={'pointer'}
                        position={'fixed'}
                        top={'70%'}
                      >
                        <Img src={preloadedAssets.OkayBtn} h={'7vh'} className={'story_note_next_button'} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                
              </motion.div>
            </GridItem>
          </Grid>
        </Box>
        // <Box className='Thankyou-section'>
        //     <Img src={preloadedAssets.overview} className="bg-thankyou" />
        //   <Box className="thankyou-screen">
        //     <Box className="thankyou-screen-box">
        //     </Box>
        //     <Box
        //       w={'100%'}
        //       fontFamily={'content'}
        //       display={'flex'}
        //       justifyContent={'center'}
        //       alignItems={'center'}
        //       className="tq-msg"
        //     >
        //       <Box
        //         mt={{ base: '0px', sm: '0px', md: '20px', lg: '20px' }}
        //         lineHeight={1}
        //         textAlign={'center'}
        //         color="#D9C7A2"
        //         fontWeight="300"
        //       >
        //       <Text>{'StoryLine...'}</Text>
        //       <Text>{formData.gameStoryLine}</Text>
        //       </Box>
        //     </Box>
        //   </Box>
        //   <Img
        //       src={preloadedAssets.Close}
        //       className='close-btn'
        //       onClick={() => handleHome() }
        //     />
        // </Box>
      )}
    </>
  );
};
export default ThankYou;
