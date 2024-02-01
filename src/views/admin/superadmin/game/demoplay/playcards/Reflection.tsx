import {
    Img,
    Text,
    SimpleGrid,
    Box,
} from '@chakra-ui/react';
import React from 'react';

/* for reflection question inside the image */
import ref from 'assets/img/screens/refquestions.png';
import qs from 'assets/img/screens/QS.png';


const Reflection: React.FC<{
    formData: any;
    reflectionQuestions: any; imageSrc: any; reflectionQuestionsdefault: any, preview: any
}> = ({ formData, reflectionQuestions, imageSrc, reflectionQuestionsdefault, preview }) => {


    return (
        <>
            {imageSrc && (    
                <Box className='reflection-screen' >  
                    <Box className='reflection-screen-box'
                    >
                        <Img src={imageSrc} className='bg-img' />
                    </Box>
                    <Box className='content-box' >
                        <SimpleGrid columns={{ base: 2 }} spacing={2} className='grid'>
                            {Array.from({ length: formData.gameReflectionQuestion }, (_, index) => (
                                <Box>
                                    <Box w={{ base: '150px', sm: '100px', md: '150px', lg: '180px' }} lineHeight={1} display={'flex'} wordBreak="break-all" fontFamily={'content'} fontSize={{ base: '8px', sm: '12px', md: '13px', lg: '15px' }}>
                                        <Img src={qs} alt='ref' w={'20px'} h={'20px'} />
                                        <Text fontFamily={'AtlantisText'} color={'#D9C7A2'} className='text drop' style={{ whiteSpace: 'break-spaces' }}>{` ${reflectionQuestions[`ref${index + 1}`]?.padEnd(90, ' ') || reflectionQuestionsdefault[index]?.padEnd(90, ' ')}`}</Text>
                                    </Box>
                                    <Img w={'200px'} h={{ base: '20px', sm: '30px', md: '50px', lg: '50px' }} src={ref} />
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>
                </Box>
            )}
        </>
    );
}
export default Reflection;