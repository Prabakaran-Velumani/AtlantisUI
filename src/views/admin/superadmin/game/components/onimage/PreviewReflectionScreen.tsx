import React, { useEffect, useState } from 'react';
import {
    Box,
    Img,
    SimpleGrid,
    Text,
    Textarea,
    GridItem
  } from '@chakra-ui/react';

const PreviewReflectionScreen: React.FC<{
    formData: any;
    reflectionQuestions: any;
    imageSrc: any;
    reflectionQuestionsdefault: any;    
    preloadedAssets?: any;
    RefelectionAnswer?:any;
    answers?:any;
    updateAnswer?:any;
    isFormValid?:any;
  }> = ({
    formData,
    reflectionQuestions,
    imageSrc,
    reflectionQuestionsdefault,    
    preloadedAssets,
    RefelectionAnswer,
    answers,
    updateAnswer,
    isFormValid,
  }) => {
  return (
    <>
        <Box className="reflection-screen">
            <Img src={imageSrc} className="bg-img" />
            {/* <Box className="reflection-screen-box">
            </Box> */}
            <Box className='title'>
                <Img src={preloadedAssets.question} />
                <Text> Reflection </Text>
            </Box>
            <Box className="content-ref">
                <SimpleGrid columns={{ base: 2 }} spacing={2} className="grid">
                {Array.from(
                      { length: formData.gameReflectionQuestion },
                      (_, index) => (
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
                        <Img src={preloadedAssets.qs} alt="ref" w={'20px'} h={'20px'} />
                        <Text
                            fontFamily={'AtlantisText'}
                            color={'black'}
                            className="text drop"
                            style={{ whiteSpace: 'break-spaces' }}
                            fontSize={'large'}
                        >
                            {` ${reflectionQuestions[`ref${index + 1}`]?.padEnd(
                                90,
                                ' ',
                            ) ||
                                reflectionQuestionsdefault[index]?.padEnd(90, ' ')
                                }`}
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
                            src={preloadedAssets.ref}
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
                <Img src={preloadedAssets.left} w={'50px'} h={'50px'} cursor={'pointer'}/>
                {isFormValid && (
                    <Img
                    src={preloadedAssets.right}
                    w={'50px'}
                    h={'50px'}                                   
                    />
                )}
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default PreviewReflectionScreen
