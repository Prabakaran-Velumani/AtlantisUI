import { Img, Text, SimpleGrid, Box } from '@chakra-ui/react';
import React from 'react';

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
}> = ({ formData, reflectionQuestions, imageSrc, preview, getData, data }) => {
  return (
    <>
      {imageSrc && (
        <>
          <Box className="reflection-screen">
            <Box className="reflection-screen-box">
            <Img src={imageSrc} className="bg-ref" />
          </Box>
            <Box w={'100%'} display={'flex'} justifyContent={'center'} position={'relative'}>
              <Img src={question} w={'320px'} h={'100px'} />
              <Text
                fontFamily={'AtlantisText'}
                color={'##D9C7A2'}
                // className="text drop"
                position={'absolute'}
                top={'20px'}
                fontSize={'3rem'}
                style={{ whiteSpace: 'break-spaces' }}
              >
                reflection
              </Text>
            </Box>
            <Box className="content-ref">
              <SimpleGrid columns={{ base: 2 }} spacing={2} className="grid">
                {reflectionQuestions.map((item: any, index: number) => (
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
                        fontFamily={'AtlantisText'}
                        color={'black'}
                        className="text drop"
                        style={{ whiteSpace: 'break-spaces' }}
                        fontSize={'large'}
                      >
                        {item?.refQuestion}
                      </Text>
                    </Box>
                    <Img
                      w={'350px'}
                      h={{ base: '20px', sm: '30px', md: '50px', lg: '100px' }}
                      src={ref}
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
            <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
              position={'absolute'}
              bottom={'0'}
            >
              <Box w={'80%'} display={'flex'} justifyContent={'space-between'}>
                <Img src={left} w={'50px'} h={'50px'} cursor={'pointer'} />
                <Img
                  src={right}
                  w={'50px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => getData(data)}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default Reflection;
