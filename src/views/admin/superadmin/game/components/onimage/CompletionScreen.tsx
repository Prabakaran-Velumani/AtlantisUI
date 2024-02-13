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
const CompletionScreen: React.FC<{
  formData: any;
  imageSrc: any;
  selectedBadge: any;
}> = ({ selectedBadge, formData, imageSrc }) => {
  const [imgb, setbImg] = useState<any>();
  useEffect(() => {
    const fetchDatass = async () => {
      if (formData.gameBadge) {
        const result = await getImages(4);

        if (result?.status !== 'Success') {
          console.error('getbackground error:' + result?.message);
          return;
        }
        const selectedGasId = formData.gameBadge;
        const selectedGasImage = result?.data.find(
          (gas: any) => gas.gasId === selectedGasId,
        );
        const imageUrl =
          selectedGasImage?.gasAssetImage || 'defaultImageURL.jpg';
        setbImg(imageUrl);
      }
    };

    fetchDatass(); 
  }, [formData]);

  return (
    <>
      {imageSrc && (
        
        <>
          <Box className="comple-screen">
            <Img src={imageSrc} className="bg-img" />
          </Box>
          <Box className="title">
            <Text>{formData.gameScreenTitle}</Text>
          </Box>
          <Box className="congratulations">
            <Box className="content" h="100px" mt="0px">
              {formData.gameIsSetCongratsSingleMessage === 'true' &&
              formData.gameIsSetCongratsScoreWiseMessage === 'false' ? (
                <>{formData.gameCompletedCongratsMessage}</>
              ) : (
                <></>
              )}
              {formData.gameIsSetCongratsScoreWiseMessage === 'false' &&
              formData.gameIsSetDistinctionScore === 'false' &&
              formData.gameIsSetMinPassScore === 'false' ? (
                <>Congratulations! You have Completed...</>
              ) : (
                <></>
              )}
              {formData.gameIsSetCongratsScoreWiseMessage === 'true' &&
              formData.gameIsSetDistinctionScore === 'true' &&
              formData.gameIsSetMinPassScore === 'false' ? (
                <>{formData.gameAboveDistinctionScoreCongratsMessage}</>
              ) : (
                <></>
              )}
              {formData.gameIsSetCongratsScoreWiseMessage === 'true' &&
              formData.gameIsSetDistinctionScore === 'true' &&
              formData.gameIsSetMinPassScore === 'true' ? (
                <>
                  {formData.gameAboveDistinctionScoreCongratsMessage} &{' '}
                  {formData.gameaboveMinimumScoreCongratsMessage}
                </>
              ) : (
                <></>
              )}
              {formData.gameIsSetCongratsScoreWiseMessage === 'true' &&
              formData.gameIsSetMinPassScore === 'true' &&
              formData.gameIsSetDistinctionScore === 'false' ? (
                <>{formData.gameaboveMinimumScoreCongratsMessage}</>
              ) : (
                <></>
              )}

              {formData.gameCompletedCongratsMessage === '' && (
                <>
                  <div style={{ height: '100px' }}></div>
                </>
              )}
            </Box>
          </Box>
          <Box className="rewards-img-box">
            <Img className="rewards-arrow-img" src={rew} />
          </Box>
          <Box className="points-box">
            <Box className="box-1">
              <Img src={back} className="box-1_img" />
              <Text className="points-text" fontFamily={'content'}>
                Points
              </Text>
              <Box className="inside-box-1">
                <Img src={point} className="inside-box-1_img" />
                <Text className="inside-points-text" fontFamily={'content'}>
                  {(formData.gameMinScore || 100) +
                    '/' +
                    (formData.gameTotalScore || 100)}
                </Text>
              </Box>
            </Box>
          
            {formData.gameIsSetBadge === 'true' && (
              <Box className="box-2">
                <Img src={back} className="box-2_img" />
                <Text className="points-text" fontFamily={'content'}>
                  {formData.gameBadgeName}
                </Text>
                {formData.gameBadge && (
                  <Img
                    className="inside-img"
                    src={imgb}
                  />
                )}{' '}
              </Box>
            )}
          </Box>
          <Box className="next-btn">
            <Img src={next} />
          </Box>
        </>
        // </SimpleGrid>
      )}
    </>
  );
};
export default CompletionScreen;
