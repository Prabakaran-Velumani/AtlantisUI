

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
  interface Badge {
    gasId: number;
    gasAssetImage: string;
    gasAssetName: string;
  }


    const TakewayScreen: React.FC<{formData: any;imageSrc:any}> = ({formData,imageSrc}) => {
      const data = formData.gameTakeawayContent?.split('\n');
      
  return (
    <>
      {imageSrc && (
        <Box className='takeaway-screen'>
          <Box className='takeaway-screen-box'
            // w={{base:'100%',sm:'100%',md:'100%',lg:'90%'}}
            // ml={{base:'10px',sm:'10px',md:'20px',lg:'28px'}} 
            // h={{base:'150px',sm:'450px',md:'550px',lg:'450px'}}
            // backgroundImage={imageSrc}
            // backgroundRepeat={'no-repeat'}
            // backgroundSize={'contain'}
            // fontFamily={'content'}
            // color="#D9C7A2"
            // display={'flex'}
            // justifyContent={'center'}
            // alignItems={'center'}
          >
            <Img src={imageSrc} className='bg-img' />         
          <Box className='content-box'>
            {data && data.map((it: any, ind: number) => {
              const bulletIndex = it.indexOf('\u2022');
              const contentAfterBullet =
                bulletIndex !== -1 ? it.slice(bulletIndex + 1).trim() : it;
              return (
                <Box   className='content'             
                  // mt={{ base: '0px', sm: '0px', md: '10px', lg: '50px' }}
                  // lineHeight={1}
                  // display={'flex'}
                  // listStyleType={'none'}
                >
                  <>
                    <Img src={bull} className='dot-img' w={'16px'} h={'16px'} />
                    {contentAfterBullet}
                  </>
                </Box>
              );
            })}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
export default TakewayScreen;