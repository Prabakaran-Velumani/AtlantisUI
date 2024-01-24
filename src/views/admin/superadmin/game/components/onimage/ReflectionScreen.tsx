

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
  import ref from 'assets/img/screens/refquestions.png';
  import qs from 'assets/img/screens/QS.png';
  interface Badge {
    gasId: number;
    gasAssetImage: string;
    gasAssetName: string;
  }

 
    const ReflectionScreen: React.FC<{formData: any;
      reflectionQuestions:any;imageSrc:any;reflectionQuestionsdefault:any}> = ({formData,reflectionQuestions,imageSrc,reflectionQuestionsdefault}) => {
     console.log("reflectionQuestions-123",formData.gameReflectionQuestion)

     const arrayInfo = [1,2,3,4]
     let i=0;
     

  return (
   <>
    {imageSrc && (
        // <SimpleGrid columns={1}>
        <Box className='reflection-screen'>
          <Box  className='reflection-screen-box'
            // w={{base:'100%',sm:'100%',md:'100%',lg:'90%'}}
            // ml={{base:'10px',sm:'10px',md:'20px',lg:'28px'}} 
            // h={{base:'250px',sm:'450px',md:'550px',lg:'450px'}}
            // backgroundImage={imageSrc}
            // backgroundRepeat={'no-repeat'}
            // backgroundSize={'contain'}
            // display={'flex'}
            // justifyContent={'center'}
            // alignItems={'center'}
          >
            <Img src={imageSrc} className='bg-img' />           
          </Box>
          <Box className='content-box' >
            <SimpleGrid columns={{base:2}} spacing={2} className='grid'>
              {Array.from({ length: formData.gameReflectionQuestion }, (_, index) => (

                <Box>
                <Box w={{base:'150px',sm:'100px',md:'150px',lg:'180px'}} lineHeight={1} display={'flex'} wordBreak="break-all" fontFamily={'content'} fontSize={{base:'8px',sm:'12px',md:'13px',lg:'15px'}}>                  
                  <Img src={qs} alt='ref' w={'20px'} h={'20px'} />
                  <Text className='text drop' style={{ whiteSpace: 'break-spaces' }}>{` ${reflectionQuestions[`ref${index + 1}`]?.padEnd(90, ' ') || reflectionQuestionsdefault[index]?.padEnd(90, ' ')}`}</Text>
                  </Box>
                  <Img w={'200px'} h={{base:'20px',sm:'30px',md:'50px',lg:'50px'}} src={ref} />
                  </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>        
      // </SimpleGrid>
    )}
   </>
  );
}
export default ReflectionScreen;