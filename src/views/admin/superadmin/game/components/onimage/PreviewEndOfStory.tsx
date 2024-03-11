// import React, {useState} 
// from 'react'
// import {Box, Flex,Text,Img} from '@chakra-ui/react'
// import { useDispatch } from 'react-redux';
// import { updatePreviewData } from 'store/preview/previewSlice';
// import Replay from 'assets/img/screens/Replay.png';
// import ReplayGame from '../../demoplay/playcards/ReplayGame';

// const PreviewEndOfStory : React.FC<{preloadedAssets: any, setEndOfQuest:any}>= ({preloadedAssets, setEndOfQuest}) => {
// const dispatch = useDispatch();
//   console.log("preloadedAssets");
// console.log(preloadedAssets);

// const replayQuest = ()=>{
//   dispatch(updatePreviewData({activeBlockSeq: 1}));
//   setEndOfQuest(false);
// }
// const [backgroundScreenUrl, setBackgroundScreenUrl] = useState(null);

//   return (
//     <Flex className="end-of-quest" >
//       {/* <Img src={preloadedAssets?.backgroundImage} className='eoq-bg-img' /> */}
//       {/* <Box
//               w={'100%'}
//               display={'flex'}
//               justifyContent={'center'}
//               alignItems={'center'}
//               position={'relative'}
//             >
//               <Box className="title" mt={'80px'}>
//               <Text fontFamily={'AtlantisContent'} textAlign={'center'}>
//                   End of the current Quest.!
//                 </Text>
//                 <Text fontFamily={'AtlantisContent'} textAlign={'center'}>
//                   Do You Want Play Again ?
//                 </Text>
//               </Box>
//               <Box
              
//                 position={'fixed'}
//                 top={'360px'}
//                 w={'40%'}
//                 display={'flex'}
//                 justifyContent={'space-between'}
//                 className='eoq-replay-img'
//               >
//                 <Img
//                   src={preloadedAssets.ReplayBtn}
//                   w={'200px'}
//                   h={'60px'}
//                   cursor={'pointer'}
//                   onClick={replayQuest}
//                 />
//               </Box>
//             </Box> */}

// <Box
//                     w={'100%'}
//                     h={'100vh'}
//                     alignItems={'center'}
//                     justifyContent={'center'}
//                     position={'relative'}
//                     overflow={'visible'}
//                     style={{ perspective: '1000px' }}
//                     className="Main-Content"
//                   >
//                     <Box
//                       backgroundImage={backgroundScreenUrl}
//                       w={'100% !important'}
//                       h={'100vh'}
//                       backgroundRepeat={'no-repeat'}
//                       backgroundSize={'cover'}
//                       alignItems={'center'}
//                       justifyContent={'center'}
//                       className="Game-Screen"
//                     >
//                       <Box className="Images">
//                         <ReplayGame
//                           replayGame={replayQuest}
//                           setCurrentScreenId={5}
//                           formData={FormData}
//                           imageSrc={Replay}
//                           // getData={getData}
//                           // data={data}
//                         />
//                       </Box>
//                     </Box>
//                   </Box>    </Flex>
//   )
// }

// export default PreviewEndOfStory
import { Box, Flex, Text, Img } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import React from 'react';
import { updatePreviewData } from 'store/preview/previewSlice';
import ReplayBtn from 'assets/img/games/ReplayBtn.png';
import { ScoreContext } from '../../demoplay/GamePreview';
import next from 'assets/img/screens/next.png';
import Replay from 'assets/img/screens/Replay.png';
import { relative } from 'path';

const PreviewEndOfStory: React.FC<{
  preloadAssets: any;
  setEndOfQuest: any;
  formData: any;
  imageSrc: any;
}> = ({ preloadAssets, setEndOfQuest, formData, imageSrc }) => {
  const dispatch = useDispatch();

  const replayQuest = () => {
    dispatch(updatePreviewData({ activeBlockSeq: 1 }));
    setEndOfQuest(false);
  };

  return (
    <Flex className="end-of-quest" direction="column" align="center" position="relative">
      <Img src={preloadAssets?.backgroundImage} className="eoq-bg-img" />
      {Replay && (
        <Box
          className="overlay-container"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          
          <Box className="thankyou-screen-box" zIndex="1">
            <Img src={Replay} className="bg-Img" />
            {/* <Text  position={'relative'} fontFamily="AtlantisContent" textAlign="center" bottom={'390px'} color="white" fontSize="2xl" zIndex="999999">
              Do You Want to Play Again?
            </Text> */}
            <Box  position={'relative'} fontSize={'3xl'} fontFamily="AtlantisContent" textAlign="center" bottom={'390px'} color="white"  zIndex="999999"> <Text fontFamily={'AtlantisContent'} textAlign={'center'} mb="4">
                  End of the current Quest.!
                </Text>
                <Text fontFamily={'AtlantisContent'} textAlign={'center'}>
                  Do You Want Play Again ?
                </Text></Box>
           
          </Box>
          <Flex
            mt="1"
            direction="column"
            align="center"
            justifyContent="center"
            className="eoq-replay-img"
            zIndex="999999"
            bottom={'350px'}
            position={'relative'}
          >
            <Img
              src={ReplayBtn}
              w="200px"
              h="60px"
              cursor="pointer"
              onClick={replayQuest}
            />
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default PreviewEndOfStory;
