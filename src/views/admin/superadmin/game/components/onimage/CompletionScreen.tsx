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
const CompletionScreen: React.FC<{ formData: any; imageSrc: any; selectedBadge: any;compliData:any;
  setCompliData:any;
  CompKeyCount:any; }> = ({
  selectedBadge,
  formData,
  imageSrc,
  compliData,
  setCompliData,
  CompKeyCount,
}) => {
  const [imgb, setbImg] = useState<any>();
  useEffect(() => {
    const fetchDatass = async () => {
      if (compliData[CompKeyCount]?.gameBadge) {
        const result = await getImages(4);

        if (result?.status !== 'Success') {
          console.error('getbackground error:' + result?.message);
          return;
        }
        const selectedGasId = compliData[CompKeyCount]?.gameBadge;
        const selectedGasImage = result?.data.find(
          (gas: any) => gas.gasId === selectedGasId,
        );
        const imageUrl =
          selectedGasImage?.gasAssetImage || 'defaultImageURL.jpg';

        setbImg(imageUrl);
      }
    };

    fetchDatass(); // Call the asynchronous function
  }, [compliData]);

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
                {compliData[CompKeyCount]?.gameScreenTitle}
              </Text>              
          </Box>            
          <Box className='congratulations'>
            <Box className='content' h="100px" mt="0px">
              
           
             
             {/* {compliData[CompKeyCount]?.gameIsSetCongratsSingleMessage === 'true' && compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage === 'false' ? (
              <>{compliData[CompKeyCount]?.gameCompletedCongratsMessage}</>
            ): <></>}  */}
{(compliData[CompKeyCount]?.gameIsSetCongratsSingleMessage === 'true' && compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage === 'false') || (compliData[CompKeyCount]?.gameIsSetCongratsSingleMessage === 'false' && compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage === 'false') || (compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'false' && compliData[CompKeyCount]?.gameIsSetMinPassScore === 'false') ? (
            <>{compliData[CompKeyCount]?.gameCompletedCongratsMessage || "Congratulations! You have Completed..."}</>
            ): <></>} 
{compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage === 'true' && compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'true' && compliData[CompKeyCount]?.gameIsSetMinPassScore === 'false' ? (
              <>{compliData[CompKeyCount]?.gameAboveDistinctionScoreCongratsMessage}</>
            ): <></>} 
{compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage === 'true' && compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'true' && compliData[CompKeyCount]?.gameIsSetMinPassScore === 'true' ? (
              <>{compliData[CompKeyCount]?.gameAboveDistinctionScoreCongratsMessage} {compliData[CompKeyCount]?.gameAboveDistinctionScoreCongratsMessage === '' || compliData[CompKeyCount]?.gameaboveMinimumScoreCongratsMessage === '' ? '' : '&'} {compliData[CompKeyCount]?.gameaboveMinimumScoreCongratsMessage}</>
            ): <></>} 
{compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage === 'true' && compliData[CompKeyCount]?.gameIsSetMinPassScore === 'true' && compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'false' ? (
              <>{compliData[CompKeyCount]?.gameaboveMinimumScoreCongratsMessage}</>
            ): <></>} 



           {compliData[CompKeyCount]?.gameCompletedCongratsMessage === '' && (
              <><div style={{height:'100px'}}></div></>
            )} 
              </Box> 
          </Box>
          <Box className='rewards-img-box'>
            <Img className='rewards-arrow-img' src={rew}/>
          </Box>  
          <Box className='points-box'>
            <Box className='box-1'>
              <Img src={back} className='box-1_img' />
              <Text className='points-text' fontFamily={'content'}>
                Points
              </Text>
              <Box className='inside-box-1'>
                <Img src={point} className='inside-box-1_img' />
                <Text className='inside-points-text' fontFamily={'content'}>
                {(compliData[CompKeyCount]?.gameMinScore || 100) +
                    '/' +
                   (compliData[CompKeyCount]?.gameTotalScore ? (compliData[CompKeyCount]?.gameTotalScore[0]?.maxScore || 100) :'')}
                </Text>
              </Box>
            </Box>
            {/* {compliData[CompKeyCount]?.gameIsSetBadge === 'true' && (
              <Box className='box-2'>
                {compliData[CompKeyCount]?.gameBadgeName !== '' ? (
                <Img src={back} className='box-2_img' />
                  ): null }
                <Text className='points-text' fontFamily={'content'} >
                  {selectedBadge?.gasAssetName}
                </Text>
                <Img className='inside-img' src={selectedBadge?.gasAssetImage} />
              </Box>
            )}  */}
            {compliData[CompKeyCount]?.gameIsSetBadge === 'true' && (
                  <Box className='box-2'>
                     <Img src={back} className='box-2_img' />
                    <Text className='points-text' fontFamily={'content'}                        
                    >
                       {compliData[CompKeyCount]?.gameBadgeName}
                    </Text>
                    {compliData[CompKeyCount]?.gameBadge && (
                      <Img
                        className='inside-img'
                        src={imgb}
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
