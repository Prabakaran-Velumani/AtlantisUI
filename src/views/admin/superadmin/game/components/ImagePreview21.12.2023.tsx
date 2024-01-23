
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
        <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent backgroundColor="rgba(0, 0, 0, 0.9)">
        <ModalCloseButton color={'white'} />
          <ModalBody p={0}>
            <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            
              background="rgba(0, 0, 0, 0.15)" // Adjust the opacity as needed
            >
               <Box mt={4}>
              {/* Top Content */}
              <Text color="white" fontWeight="bold" fontSize="xl" >
              {fetchImg?.title}
              </Text>
            </Box>

            <Image
              src={fetchImg.gasAssetImage}
              alt="Preview"
              maxW="90%"
              maxH="80%"
            />

<Box mt={4}>
                {/* Truncated Text Content */}
              
                <Text color="white" fontWeight="bold" fontSize="l"  style={{ whiteSpace: 'pre-wrap' }}>
                  {truncatedText}
                </Text>
              </Box>
              <Box mt={4} alignSelf="flex-end"> {/* Align the button to the right */}
              {/* Button */}
              <Button  bg="#3311db"
    _hover={{ bg: '#3311db' }}
    color="#fff" 
    onClick={() => handleBackground(fetchImg, fetchImg.i)}>
                 <Text>{selectedCardIndex === fetchImg.i ? 'Selected' : 'Select'}</Text>
              </Button>
              
            </Box>
           
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ImagePreview;