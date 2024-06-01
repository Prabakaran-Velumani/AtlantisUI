import { Box, Button, Grid, GridItem, Icon, Img, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
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
import { AnyARecord } from 'dns';

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

    // scroll bar states {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScrollHeight, setMaxScrollHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLInputElement>(null);
    // }

    // take the initial scroll content height {
    useEffect(() => {

      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        console.log('scrollHeight-clientHeight', scrollHeight - clientHeight)
        setMaxScrollHeight(scrollHeight - clientHeight);
      }
    }, [formData]);
    // }


    // handle the range meter functionality {
    const handleSliderChange = (value: number) => {
      setScrollPosition(value);
      const newScrollPosition = maxScrollHeight - (value / 100) * maxScrollHeight;
      if (containerRef.current) {
        containerRef.current.scrollTop = newScrollPosition;
      }
    };
   // }

   // handle the onscroll inside the content {
    useEffect(() => {
      const handleScroll = () => {
        if (containerRef.current && sliderRef.current) {
          const { scrollTop, clientHeight } = containerRef.current;
          const newScrollPosition = (scrollTop / maxScrollHeight) * maxScrollHeight;
          setScrollPosition(Math.floor(maxScrollHeight - newScrollPosition));
          sliderRef.current.value = newScrollPosition.toString();
        }
      };

      if (containerRef.current) {
        containerRef.current.addEventListener('scroll', handleScroll);
      }

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);
     // }

    const handleHome = () => {
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
                      <Text className='story_overview_title'>Story Line...</Text>
                      <Box
                        w={'100%'}
                        display={'flex'}
                        justifyContent={'center'}
                      >
                        <Box h={'auto'} w='auto' position={'relative'} display={'flex'}>
                          <Box className={'story_overview_block'} ref={containerRef} >
                            <Text textAlign={'center'}>{formData.gameStoryLine}</Text>
                          </Box>
                          <Box h={'100%'} w={'2vw'} position={'absolute'} right={'-22px'}>
                            <Slider
                              aria-label="slider-ex-3"
                              defaultValue={30}
                              orientation="vertical"
                              onChange={handleSliderChange}
                              minH="32"
                              value={scrollPosition}
                              ref={sliderRef}
                              min={0}
                              max={maxScrollHeight}
                            >
                              <SliderTrack
                                w={'2vw'}
                                bg="none"
                                backgroundImage={preloadedAssets.scroll}
                                backgroundSize="contain"
                                backgroundRepeat={'no-repeat'}
                                backgroundPosition={'center'}
                              >
                                <SliderFilledTrack bg="transparent" />
                              </SliderTrack>
                              <SliderThumb
                                _focus={{ outline: 'none', border: 'none' }}
                                className={'thumb_scroll'}
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                                bg="none"
                                boxSize={6}>
                                <Img src={preloadedAssets.Cross} w={'100%'} h={'100%'} />
                              </SliderThumb>
                            </Slider>
                          </Box>
                        </Box>
                        <Box
                          w={'100%'}
                          onClick={() => handleHome()}
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
