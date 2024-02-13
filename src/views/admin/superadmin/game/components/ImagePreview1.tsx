
import React from 'react'
// Chakra Imports
import {
  Button,
  Badge,
  Box,
  Flex,
  Icon,
  Text,
  Image,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useBreakpointValue,  
  DrawerProps,
  Img
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Light from '../../../../../assets/img/layout/Light.png';
import { HSeparator } from '../../../../../components/separator/Separator';




const ImagePreview: React.FC<{ fetchImg?: any, isOpen?: any, onOpen?: any, onClose?: any, values?: any, setValues?: any, selectedCardIndex?: any, handleBackground?: any}> = ({fetchImg,isOpen, onOpen, onClose, values, setValues,selectedCardIndex,handleBackground}) => {


  //eslint-disable-next-line
  const { colorMode, toggleColorMode } = useColorMode();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [active, setActive] = useState('Purple');
  const [contrast, setContrast] = useState(false);
  const [toggleBtn, setToggleBtn] = useState<any>();

  // const drawerSize = useBreakpointValue({ base: '100%', lg: '400px' });

 
  console.log('fetech', fetchImg);
  console.log('onOpen', onOpen);
  
  const [showFullText, setShowFullText] = useState(false);
  const maxTextLength = 80; // Maximum characters to display before truncating

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  // const textContent =fetchImg.stroyline;

  // const truncatedText = showFullText ? textContent : `${textContent.slice(0, maxTextLength)}...`;
  const textContent =fetchImg.stroyline;

  const truncatedText = textContent;

//////////////Changes - 12-Dec-23//////////////////
// function handle() {
//   // console.log('valuesImagePreview--',values);
//   if(values === 'Selected'){
//     setValues('Select')
//   } 
//   else if(values === 'Select'){
//     setValues('Selected')
//   }
// }

//////////
const handle = () => {
  if (!selectedCardIndex) {
setValues('Selected')
    onClose(); 
    console.log('if---',selectedCardIndex);
    console.log('if2---',values);
    
  }
  else if(selectedCardIndex){
    onClose();
    setValues('Select')
    console.log('ifELSE',values);
    console.log('ifELSE2---',selectedCardIndex);
  }
  
};
/////////


//////////////Changes - 12-Dec-23//////////////////


  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}  size="lg">
      <ModalOverlay />
      <ModalContent
        maxW="1150px"  // Set the width manually
      
      >
        <ModalHeader p={2}>Preview</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody p={0}>
        {/* <HSeparator my="30px" bg={bgSeparator} /> */}
          
            <Img src={fetchImg.gasAssetImage} alt="Your Image" height="600px !important" width={'100%'} />

{/* <HSeparator my="5px" bg={bgSeparator} /> */}

			{/* <HSeparator my="30px" bg={bgSeparator} /> */}

      <Flex flexDirection={{ base: 'column', lg: 'row' }} alignItems={{ lg: 'center' }} justifyContent="space-between" m={2}>
  <Box mt={{ base: 2, lg: 0 }} mb={{ base: 2, lg: 0 }} mr={{ lg: 2 }}>
    <Text fontSize={{ base: '16px', lg: '18px' }} fontWeight={'800'} color={'#555'}>
      {fetchImg?.title}
    </Text>
    {/* Truncated Text */}
    <Text
      fontSize={'14px'}
      fontWeight={'500'}
      color={'#555'}
      overflow={'hidden'}
      textOverflow={'ellipsis'}
      whiteSpace={'pre-line'} // Use 'pre-line' for line-by-line display
      cursor="pointer"
      onClick={toggleShowFullText}
    >
      {truncatedText}
    </Text>
  </Box>
  
</Flex>

        </ModalBody>
        <ModalFooter>

        <Button
    bg="#3311db"
    _hover={{ bg: '#3311db' }}
    color="#fff"
    fontSize={{ base: '14px', lg: '16px' }}
    mt={{ base: 2, lg: 0 }}
    onClick={() => handleBackground(fetchImg, fetchImg.i)}
  >
    <Text>{selectedCardIndex === fetchImg.i ? 'Selected' : 'Select'}</Text>
  </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

    </>
    
  )
}

export default ImagePreview