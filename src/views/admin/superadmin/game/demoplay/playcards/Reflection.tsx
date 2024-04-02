import { Img, Text, SimpleGrid, Box, Input, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

/* for reflection question inside the image */
import ref from 'assets/img/screens/refquestions.png';
import qs from 'assets/img/screens/QS.png';
import right from 'assets/img/games/right.png';
import left from 'assets/img/games/left.png';
import question from 'assets/img/games/question.png';
const Reflection: React.FC<{
  formData: any;
  reflectionQuestions?: any;
  imageSrc: any;
  preview?: any;
  getData?: any;
  data?: any;
  gameInfo?:any;
  setCurrentScreenId?: any;
}> = ({ formData, reflectionQuestions, imageSrc, preview, getData, data, gameInfo , setCurrentScreenId}) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([]);

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

  const nextNavigation = ()=>{
    console.log('gameInfo?.gameData?.gameIsShowTakeaway == true', gameInfo?.gameData?.gameIsShowTakeaway==='true');
    if(gameInfo?.gameData?.gameIsShowTakeaway === 'true'){
      setCurrentScreenId(7);//Navigate to Takeaway screen
    }
    else{
      setCurrentScreenId(5);//Navigate to Thank you screen
    }
  }
  return (
    <>
      {imageSrc && (
        <>
          <Box className="reflection-screen"> 
              <Img src={imageSrc} className="bg-img" />
            {/* <Box className="reflection-screen-box">
            </Box> */}
            <Box className='title'>
              <Img src={question} />
              <Text> reflection </Text>
            </Box>
            <Box className="content-ref">
              <SimpleGrid columns={{ base: 2 }} spacing={2} className="grid">
                {reflectionQuestions.map((item: any, index: number) => (
                  <>
                  <Box key={index}>
                    <Box className='heading-wrapper'
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
                        fontFamily={'AtlantisText'}
                        color={'black'}
                        className="text drop"
                        style={{ whiteSpace: 'break-spaces' }}
                        fontSize={'large'}
                      >
                        {item?.refQuestion}
                      </Text>
                    </Box>
                    <Box position={'relative'} className='input-wrapper'>
                      <Img
                        w={'350px'}
                        h={{
                          base: '20px',
                          sm: '30px',
                          md: '50px',
                          lg: '100px',
                        }}
                        src={ref}
                      />
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
                    </Box>
                  </Box>
                  </>
                ))}
              </SimpleGrid>
            </Box>
            <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
              position={'absolute'}
              bottom={'0'}
              className='left-right-btn'
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
                    onClick={() => nextNavigation()}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default Reflection;
