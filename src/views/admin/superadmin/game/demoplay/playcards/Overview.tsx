import { Box, Button, Icon, Img, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ImHappy } from 'react-icons/im';
import { TfiFaceSad } from 'react-icons/tfi';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { FaRegFaceMehBlank } from 'react-icons/fa6';
import { BsEmojiNeutral } from 'react-icons/bs';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { FaRegTired } from 'react-icons/fa';
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
}> = ({ formData, imageSrc, preloadedAssets,setCurrentScreenId,homeLeaderBoard}) => {
  
  const handleHome = () =>{
   console.log("homeLeaderBoard",homeLeaderBoard);
    if(homeLeaderBoard)
    {
      setCurrentScreenId(homeLeaderBoard);
    }
  }

  return (
    <>
      {imageSrc && (
        <Box className='Thankyou-section'>
            <Img src={preloadedAssets.overview} className="bg-thankyou" />
          <Box className="thankyou-screen"> 
            <Box className="thankyou-screen-box">
            </Box>
            <Box
              w={'100%'}
              fontFamily={'content'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              className="tq-msg"
            >
              <Box
                mt={{ base: '0px', sm: '0px', md: '20px', lg: '20px' }}
                lineHeight={1}
                textAlign={'center'}
                color="#D9C7A2"
                fontWeight="300"
              >
              <Text>{'StoryLine...'}</Text> 
              <Text>{formData.gameStoryLine}</Text> 
              </Box>
            </Box>
          </Box>
          <Img
              src={preloadedAssets.Close}                   
              className='close-btn'
              onClick={() => handleHome() }
            />    
        </Box>
      )}
    </>
  );
};
export default ThankYou;
