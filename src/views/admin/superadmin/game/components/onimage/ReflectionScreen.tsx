import {
  Box,
  Img,
  SimpleGrid,
  Text,
  Textarea,
  GridItem
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ref from 'assets/img/screens/refquestions.png';
import qs from 'assets/img/screens/QS.png';
import question from 'assets/img/games/question.png';
import right from 'assets/img/games/right.png';
import left from 'assets/img/games/left.png';
import refsep from 'assets/img/games/refseparate.png';
import next from 'assets/img/screens/next.png';

interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const ReflectionScreen: React.FC<{
  formData: any;
  reflectionQuestions: any;
  imageSrc: any;
  reflectionQuestionsdefault: any;
  preview: any;
  preloadedAssets?: any;
}> = ({
  formData,
  reflectionQuestions,
  imageSrc,
  reflectionQuestionsdefault,
  preview,
  preloadedAssets,
}) => {
  const [answers, setAnswers] = useState<any>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const arrayInfo = [1, 2, 3, 4];
  let i = 0;
  useEffect(() => {
    if (formData?.gameIsLearnerMandatoryQuestion == 'false') {
      setIsFormValid(true);
    } else if (formData.gameIsLearnerMandatoryQuestion == 'true'){
      if(formData?.gameReflectionQuestion &&
      answers.length == formData?.gameReflectionQuestion
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    }
    else{
      setIsFormValid(true);
    }
  }, [answers, formData.gameIsLearnerMandatoryQuestion]);

  const updateAnswer = (e: any, index: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = { ...updatedAnswers[index], text: e.target.value };
    setAnswers(updatedAnswers);
  };
  const arrayInfoQn = formData.gameReflectionQuestion;
  const styleflex = {};

if (arrayInfoQn === 1) {
Object.assign(styleflex, {
 display: 'flex',
 justifyContent: 'center',
});
} else if (arrayInfoQn === 3) {
// Apply your styling for arrayInfo 3, for example:
Object.assign(styleflex, {
 display: 'grid',
 gridTemplateColumns: 'repeat(2, 1fr)', // Two columns
 gap: '2px',
 placeItems: 'center',
});
}

  return (
    <>
      {imageSrc && (
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
                position={'absolute'}
                top={'20px'}
                fontSize={'2.8rem'}
                style={{ whiteSpace: 'break-spaces' }}
              >
                REFLECTION
              </Text>
            </Box>
          ) : null}
          <Box
            className={preview ? 'content-ref' : 'content-box'}
            position={'relative'}
          >
            <SimpleGrid
              columns={{ base: 2 }}
              spacing={2}
              className="grid"
              gap="20"
            >
              {Array.from(
                { length: formData.gameReflectionQuestion },
                (_, index) => (
                  <GridItem key={index} colSpan={(arrayInfoQn === 3 && index === 2) || (arrayInfoQn === 1 && index === 0) ? { base: 2 } : {}}>
                    <Box
                      w={(arrayInfoQn === 3 && index === 2) || (arrayInfoQn === 1 && index === 0) ? {base:'150px',sm:'300px',md:'350px',lg:'380px'} : {base:'150px',sm:'100px',md:'150px',lg:'180px'}} 
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
                      {preview ? (
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
                      ) : (
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
                      )}
                    </Box>
                    <Box position={'relative'}>
                      <Img
                        w={(arrayInfoQn === 3 && index === 2) || (arrayInfoQn === 1 && index === 0) ?  '420px'  : '200px'} 
                        h={{
                          base: '20px',
                          sm: '40px',
                          md: '70px',
                          lg: '150px',
                        }}
                        padding-top={'20px'}
                        src={ref}
                      />
                      {preview ? (
                        <Textarea
                          padding-top={'20px'}
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
                  </GridItem>
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
                  />
                )}
              </Box>
            </Box>
            
          ) : null}
        </Box>
      )}
    </>
  );
};
export default ReflectionScreen;
