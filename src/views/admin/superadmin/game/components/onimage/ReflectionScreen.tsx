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
import ref from 'assets/img/screens/refquestions.png';
import qs from 'assets/img/screens/QS.png';
import question from 'assets/img/games/question.png';
import right from 'assets/img/games/right.png';
import left from 'assets/img/games/left.png';
import refsep from 'assets/img/games/refseparate.png';
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const ReflectionScreen: React.FC<{
  formData: any;
  reflectionQuestions: any;
  imageSrc: any;
  reflectionQuestionsdefault?: any;
  preview: any;
}> = ({
  formData,
  reflectionQuestions,
  imageSrc,
  reflectionQuestionsdefault,
  preview,
}) => {
  console.log('reflectionQuestions-123', formData.gameReflectionQuestion);
  const [answers, setAnswers] = useState<any>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const arrayInfo = [1, 2, 3, 4];
  let i = 0;
  useEffect(() => {
    if (
      formData?.gameIsLearnerMandatoryQuestion &&
      formData?.gameReflectionQuestion &&
      answers.length == formData?.gameReflectionQuestion
    ) {
      let validate = answers.some(
        (obj: any) => obj.text == undefined || obj.text == '',
      );
      validate ? setIsFormValid(false) : setIsFormValid(true);
    } else {
      formData?.gameIsLearnerMandatoryQuestion
        ? setIsFormValid(false)
        : setIsFormValid(true);
    }
  }, [answers]);

  const updateAnswer = (e: any, index: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = { ...updatedAnswers[index], text: e.target.value };
    setAnswers(updatedAnswers);
  };
  return (
    <>
      {imageSrc && (
        // <SimpleGrid columns={1}>
        <Box className="reflection-screen">
          <Box className="reflection-screen-box">
            {preview ? null : <Img src={imageSrc} className="bg-img" />}
          </Box>
          {preview ? (
            <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
              position={'relative'}
            >
              <Img src={question} w={'320px'} h={'100px'} />
              <Text
                fontFamily={'AtlantisText'}
                color={'##D9C7A2'}
                // className="text drop"
                position={'absolute'}
                top={'20px'}
                fontSize={'2.8rem'}
                style={{ whiteSpace: 'break-spaces' }}
              >
                reflection
              </Text>
            </Box>
          ) : null}
          <Box
            className={preview ? 'content-ref' : 'content-box'}
            position={'relative'}
          >
            <SimpleGrid columns={{ base: 2 }} spacing={2} className="grid">
              {Array.from(
                { length: formData.gameReflectionQuestion },
                (_, index) => (
                  <Box>
                    <Box
                      w={{
                        base: '150px',
                        sm: '100px',
                        md: '150px',
                        lg: '180px',
                      }}
                      lineHeight={1}
                      display={'flex'}
                      wordBreak="break-all"
                      fontFamily={'content'}
                      fontSize={{
                        base: '8px',
                        sm: '12px',
                        md: '13px',
                        lg: '15px',
                      }}
                    >
                      <Img src={qs} alt="ref" w={'20px'} h={'20px'} />
                      <Text
                        className="text drop"
                        style={{ whiteSpace: 'break-spaces' }}
                      >
                        {` ${
                          reflectionQuestions[`ref${index + 1}`]?.padEnd(
                            90,
                            ' ',
                          ) ||
                          reflectionQuestionsdefault[index]?.padEnd(90, ' ')
                        }`}
                      </Text>
                    </Box>
                    <Box position={'relative'}>
                      <Img
                        w={preview ? '350px' : '250px'}
                        h={{
                          base: '20px',
                          sm: '30px',
                          md: '50px',
                          lg: '100px',
                        }}
                        src={ref}
                      />
                      {preview ? (
                        <Textarea
                          bottom={0}
                          outline={'none'}
                          focusBorderColor="none"
                          border={'none'}
                          position={'absolute'}
                          w={'350px'}
                          color={'#D9C7A2'}
                          h={{
                            base: '20px',
                            sm: '30px',
                            md: '50px',
                            lg: '100px',
                          }}
                          _focus={{ boxShadow: 'none', border: 'none' }}
                          fontFamily={'AtlantisText'}
                          value={answers[index]?.text}
                          onChange={(e: any) => updateAnswer(e, index)}
                        />
                      ) : null}
                    </Box>
                  </Box>
                ),
              )}
            </SimpleGrid>
            {preview ? (
              <Img
                src={refsep}
                w={'10px'}
                h={'auto'}
                position={'absolute'}
                top={'0px'}
              />
            ) : null}
          </Box>
          {preview ? (
            <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
              position={'absolute'}
              bottom={'0'}
            >
              <Box w={'80%'} display={'flex'} justifyContent={'space-between'}>
                <Img src={left} w={'50px'} h={'50px'} cursor={'pointer'} />
                {isFormValid && (
                <Img
                  src={right}
                  w={'50px'}
                  h={'50px'}
                  cursor={'pointer'}
                  // onClick={() => getData(data)}
                />
                 )} 
              </Box>
            </Box>
          ) : null}
        </Box>
        // </SimpleGrid>
      )}
    </>
  );
};
export default ReflectionScreen;
