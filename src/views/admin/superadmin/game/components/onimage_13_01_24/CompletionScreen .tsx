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
import rew from 'assets/img/screens/Reward Bar.png';
import back from 'assets/img/screens/back.png';
import point from 'assets/img/screens/points.png';
import skill from 'assets/img/screens/skill.png';
import next from 'assets/img/screens/next.png';
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
const CompletionScreen: React.FC<{ formData: any; imageSrc: any; selectedBadge: any; }> = ({
  selectedBadge,
  formData,
  imageSrc,
}) => {
  return (
    <>
      {imageSrc && (
        // <SimpleGrid columns={1}>
        <>
          <Box className='comple-screen'>
            <Img src={imageSrc} className='bg-img' />
          </Box>
          <Box className='title'>             
              <Text>
                {formData.gameScreenTitle}
              </Text>              
          </Box>            
          <Box className='congratulations'>
            <Box className='content'>
              {formData.gameCompletedCongratsMessage}
            </Box>
            {formData.gameIsSetCongratsSingleMessage === 'true' && (
              <>{formData.gameCompletedCongratsMessage}</>
            )}
            {formData.gameIsSetCongratsScoreWiseMessage === 'true' && (
              <>
                {formData.gameMinimumScoreCongratsMessage}
                {formData.gameLessthanDistinctionScoreCongratsMessage}
                {formData.gameAboveDistinctionScoreCongratsMessage}
              </>
            )}
          </Box>
          <Box className='rewards-img-box'>
            <Img className='rewards-arrow-img' src={rew}/>
          </Box>  
          <Box className='points-box'>
            <Box className='box-1'>
              <Img src={back} className='box-1_img' />
              <Text className='points-text' fontFamily={'content'}>
                points
              </Text>
              <Box className='inside-box-1'>
                <Img src={point} className='inside-box-1_img' />
                <Text className='inside-points-text' fontFamily={'content'}>
                  {(formData.gameMinScore || 100) +
                    '/' +
                    (formData.gameTotalScore || 100)}
                </Text>
              </Box>
            </Box>
            {/* {formData.gameIsSetBadge === 'true' && (
              <Box className='box-2'>
                {formData.gameBadgeName !== '' ? (
                <Img src={back} className='box-2_img' />
                  ): null }
                <Text className='points-text' fontFamily={'content'} >
                  {selectedBadge?.gasAssetName}
                </Text>
                <Img className='inside-img' src={selectedBadge?.gasAssetImage} />
              </Box>
            )}  */}
            {formData.gameIsSetBadge === 'true' && (
                  <Box className='box-2'>
                     <Img src={back} className='box-2_img' />
                    <Text className='points-text' fontFamily={'content'}                        
                    >
                      {selectedBadge?.gasAssetName}
                    </Text>
                    {selectedBadge?.gasAssetImage && (
                      <Img
                        className='inside-img'
                        src={selectedBadge?.gasAssetImage}
                        // ml={'23px'}
                        // mt={'2px'}
                        // borderRadius={'10px'}
                        // w={'50px'}
                        // h={'50px'}
                        // alt="Selected Badge Image"
                      />
                    )}            </Box>
                )}
          </Box>  
          <Box className='next-btn'>
            <Img src={next}  />
          </Box>       
        </>  
        // </SimpleGrid>
      )}
    </>
  );
};
export default CompletionScreen;
