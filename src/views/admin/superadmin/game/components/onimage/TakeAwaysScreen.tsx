

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Icon,
    Img,
    Radio,
    RadioGroup,
    SimpleGrid,
    Stack,
    Switch,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useColorModeValue,
    useDisclosure,
    useTheme,
    useToast,
    // brindha start
    Select,
    Textarea,
    Link,
    Slider,
    Image,
    IconButton
    // brindha end
  } from '@chakra-ui/react';
  import React, { useEffect, useRef, useState } from 'react';
  import { gameDuplicateQuestionEntirely, getImages, updateGame } from 'utils/game/gameService';
  import Card from 'components/card/Card';
  import InputField from 'components/fields/InputField';
  import BadgeImages from '../BadgeImages'
  import { MdClose, MdOutlineCloudUpload } from 'react-icons/md';
  import TextField from 'components/fields/TextField';
  import take from 'assets/img/screens/takeaway.png';
  import bull from 'assets/img/screens/bullet.png';
  import next from 'assets/img/screens/next.png';

  interface Badge {
    gasId: number;
    gasAssetImage: string;
    gasAssetName: string;
  }


    const TakewayScreen: React.FC<{formData: any;imageSrc:any; preview:any; preloadedAssets?:any}> = ({formData,imageSrc,preview, preloadedAssets}) => {
      const data = formData.gameTakeawayContent?.split('\n');
  
  return (
    <>
      {imageSrc && (
        <Box className='takeaway-screen'>
          <Box className='takeaway-screen-box'>
            <Img src={imageSrc} className='bg-img' />         
          <Box className='content-box' w={preview? '25%' : '76%'} overflowY={'scroll'}>
            {data && data.map((it: any, ind: number) => {
              const bulletIndex = it.indexOf('\u2022');
              const contentAfterBullet =
                bulletIndex !== -1 ? it.slice(bulletIndex + 1).trim() : it;
              return (
                <Box   className='content'>
                  <>
                    <Img src={bull} className='dot-img' w={'16px'} h={'16px'} />
                    {contentAfterBullet}
                  </>
                </Box>
              );
            })}
            </Box>
            <Box className='next-btn'>
              <Img src={next}  />
            </Box>
          </Box>
          
        </Box>
      )}
    </>
  );
}
export default TakewayScreen;