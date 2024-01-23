// new file PreferenceAudio.tsx by brindha to display badge images

import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Image } from "@chakra-ui/react";
import { FaMusic,FaPlay,FaPause } from "react-icons/fa6";
import { GiMusicalNotes } from "react-icons/gi";
import { getAudio,getIntroAudio } from 'utils/game/gameService';

interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

interface BadgeImagesProps {
  isModalOpen: boolean;
  onClose: () => void;
  badgeData: Badge[];
  handleBadgeSelection: (badge: Badge) => void;
}

const PreferenceAudio: React.FC<BadgeImagesProps> = ({ isModalOpen, onClose, badgeData, handleBadgeSelection }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
const [audioBlobUrl, setAudioBlobUrl] = useState<string|null>(null);
useEffect(()=>{
if(hoveredIndex || hoveredIndex===0 ){
//start playing the corresponding music
setAudioBlobUrl(badgeData[hoveredIndex].gasAssetImage);//url
}
else{
  // stop music play
  console.log("stop music play", hoveredIndex);
  if(audioBlobUrl)
  {
    audioRef.current.pause();
    setAudioBlobUrl(null);//url
  }
}
  },[hoveredIndex])


  const toggleSelection = (imageUrl: string) => {
    setSelectedImage(selectedImage === imageUrl ? null : imageUrl);
  };

  
  return (
    <Modal isOpen={isModalOpen} onClose={onClose} size='4xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Badge</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Render images from badgeData in the modal */}
          {/* {badgeData.map((badge, index) => (
            <img key={index} src={badge.gasAssetImage} alt={`Badge ${index + 1}`} onClick={() => handleBadgeSelection(badge.gasAssetImage)} />
          ))} */}
          
        
          <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
          {badgeData &&
        badgeData.map((badge, index) => (
          <Box
            key={index}
            m={4}
            textAlign="center"
            position="relative"
            border={selectedImage === badge.gasAssetImage ? '2px solid blue' : '2px solid transparent'}
            borderRadius="md"
            cursor="pointer"
            onClick={() => {
              toggleSelection(badge.gasAssetImage);
              handleBadgeSelection(badge);
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <FaMusic size={50} color="blue" opacity={hoveredIndex === index ? 0.1: 0.5} />
            {hoveredIndex === index && (
              <Box
                position="absolute"
                top="40%"
                left="62%"
                transform="translate(-50%, -50%)"
              >
                <FaPlay size={30} color="red" />
              </Box>
            )}
          <p>{badge.gasAssetName}</p>
          </Box>
        ))}
      
      
</Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
  {/*Hidden Audio Player */}
<div>
<audio ref={audioRef} hidden={true} autoPlay={true} src={audioBlobUrl} />
</div>
    </Modal>

);
};
export default PreferenceAudio;

//   <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
//             {badgeData && badgeData.map((badge, index) => (
//               <Box
//                 key={index}
//                 m={4}
//                 textAlign="center"
//                 border={selectedImage === badge.gasAssetImage ? '2px solid blue' : '2px solid transparent'}
//                 borderRadius="md"
//                 cursor="pointer"
//                 onClick={() => {
//                   toggleSelection(badge.gasAssetImage);
//                   handleBadgeSelection(badge);
//                 }}
//               >
//                 <Image
//                   src={badge.gasAssetImage}
//                   alt={`Badge ${index + 1}`}
//                   boxSize="100px"
//                   objectFit="cover"
//                   // cursor="pointer"
//                   // onClick={() => handleBadgeSelection(badge)}
//                   borderRadius="md"
//                   mb={2}
//                   _hover={{
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                   }}
//                 />
                
//                 <p>{badge.gasAssetName}</p>
//               </Box>
//             ))}
//           </Box>