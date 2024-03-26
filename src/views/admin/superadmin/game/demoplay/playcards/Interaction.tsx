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
    maxW="100%"
    w={'100vw'}
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
          <Img src={parch} w={'100%'} h={'100%'} loading="lazy" />
          <Box
            position={'absolute'}
            top={{ sm: '18px', md: '42px' }}
            h={'80% !important'}
            className="story_interaction_image"
          >
            <Box
              textAlign={'center'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              fontWeight={700}
              fontSize={{ sm: '1vw', md: '1.5vw', lg: '1.9vw' }}
              fontFamily={'AtlantisText'}
              lineHeight={1}
              w={'100%'}
              h={'5%'}
            >
              <Box w={'80%'}>
                Interactions...!{' '}
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
                w={'60%'}
                fontSize={{ md: '1.5vw', lg: '1.9vw' }}
                letterSpacing={1}
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
                        h={'30px'}
                        w={'100%'}
                      />
                      <Box
                        w={'100%'}
                        display={'flex'}
                        justifyContent={'center'}
                        fontSize={{
                          sm: '1.3vw',
                          md: '1.5vw',
                          lg: '1.9vw',
                        }}
                      >
                        {item?.qpOptionText}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
            <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Img
                src={left}
                w={'50px'}
                h={'50px'}
                cursor={'pointer'}
                onClick={() => prevData(data)}
              />
              {option !== null && (
                <Img
                  src={right}
                  w={'50px'}
                  h={'50px'}
                  cursor={'pointer'}
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