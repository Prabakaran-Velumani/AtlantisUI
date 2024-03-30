import React from 'react'
import { Box, Grid,GridItem,Img,Text } from '@chakra-ui/react';
import right from 'assets/img/games/right.png';
import left from 'assets/img/games/left.png';
import parch from 'assets/img/games/parch.png';
import on from 'assets/img/games/on.png';
import off from 'assets/img/games/off.png';

interface InteractionProps{
    backGroundImg: any;
    data: any;
    options: any;
    optionClick: any;
    prevData: any;
    InteractionFunction: ()=> void;
    option: any;
    isScreenshot?: boolean;
}

const  Interaction :  React.FC<InteractionProps> = ({backGroundImg,data,option, options,optionClick, prevData, InteractionFunction, isScreenshot })=> {

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
        <Box position={'relative'} className="story_interaction_image">
          <Img src={parch} w={'auto'} h={'100%'} loading="lazy" />
          <Box
            position={'absolute'}
            top={{ base: '5%', md: '6%' }}
            // h={'80% !important'}
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
                    >
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
                        src={option === ind ? on : off}
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
              justifyContent={'space-between'}
            >
              <Img
                src={left}
                className={'interaction_button'}
                onClick={() => prevData(data)}
              />
              {option !== null && (
                <Img
                  src={right}
                  className={'interaction_button'}
                  onClick={() => InteractionFunction()}
                />
              )}
            </Box>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  </Box>
  )
}

export default Interaction;