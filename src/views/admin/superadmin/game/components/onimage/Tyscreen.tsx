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
  IconButton,
  // brindha end
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import {
  gameDuplicateQuestionEntirely,
  getImages,
  updateGame,
} from 'utils/game/gameService';
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import BadgeImages from '../BadgeImages';
import { MdClose, MdOutlineCloudUpload } from 'react-icons/md';
import TextField from 'components/fields/TextField';
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const TyScreen: React.FC<{ formData: any; imageSrc: any }> = ({
  formData,
  imageSrc,
}) => {
  return (
    <>
      {imageSrc && (
        <Box className='thankyou-screen'>
          <Box className='thankyou-screen-box'
            // w={{ base: '100%', sm: '100%', md: '100%', lg: '90%' }}
            // ml={{ base: '10px', sm: '10px', md: '20px', lg: '28px' }}
            // h={{ base: '150px', sm: '450px', md: '570px', lg: '450px' }}
            // backgroundImage={imageSrc}
            // backgroundRepeat={'no-repeat'}
            // backgroundSize={'contain'}
            // alignItems={'flex-end'}
          >
             <Img src={imageSrc} className='bg-img' />
            {/* <Box display={'flex'} justifyContent={'center'} w={'100%'}>
              <Box
                h={'90px'}
                
                fontFamily={'gametext'}
                mt={{ base: '0px', sm: '0px', md: '60px', lg: '20px' }}
                lineHeight={1}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'flex-end'}
                textAlign={{base: 'center', sm: 'center', md: 'start', lg: 'center'}}
              >
               
                Thank you For Playing
              </Box>
            </Box> */}
            {/* <Box
              h={'90px'}
            
              fontFamily={'gametext'}
              w={'100%'}
              mt={{ base: '0px', sm: '0px', md: '10px', lg: '20px' }}
              lineHeight={1}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'flex-end'}
              textAlign={'center'}
            >
             
              Thank you Screen
            </Box> */}
          </Box>
            <Box
              w={'100%'}
              fontFamily={'content'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box
                h={'100px'}
                w={'80%'}
                mt={{ base: '0px', sm: '0px', md: '20px', lg: '20px' }}
                lineHeight={1}
                textAlign={'center'}
                color="#D9C7A2"
                >
                {formData.gameThankYouMessage}
              </Box>
            </Box>
          </Box>
      )}
    </>
  );
};
export default TyScreen;
