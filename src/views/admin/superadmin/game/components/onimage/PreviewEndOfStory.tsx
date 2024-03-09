// import {Box, Flex,Text,Img} from '@chakra-ui/react'
// import { useDispatch } from 'react-redux';
// import React, { useContext } from 'react';
// import { updatePreviewData } from 'store/preview/previewSlice';
// import ReplayBtn from 'assets/img/games/ReplayBtn.png';
// // import { ScoreContext } from './GamePreview';
// import { ScoreContext } from '../../demoplay/GamePreview';
// import next from 'assets/img/screens/next.png';

// const PreviewEndOfStory : React.FC<{preloadAssets: any, setEndOfQuest:any,formData: any;
//   imageSrc: any; 
// }>= ({preloadAssets, setEndOfQuest,formData,imageSrc}) => {
//   // const { profile } = useContext(ScoreContext);
// const dispatch = useDispatch();
//   console.log("preloadAssets");
// console.log(preloadAssets);

// const replayQuest = ()=>{
//   dispatch(updatePreviewData({activeBlockSeq: 1}));
//   setEndOfQuest(false);
// }

//   return (
//     <Flex className="end-of-quest" >
//       <Img src={preloadAssets?.backgroundImage} className='eoq-bg-img' />
//        {imageSrc && (
//         <>
//           <Box className="thankyou-screen">
//             <Box className="thankyou-screen-box">
//               <Img src={imageSrc} className="bg-Img" />
//             </Box>
//             <Box
//               w={'100%'}
//               display={'flex'}
//               justifyContent={'center'}
//               alignItems={'center'}
//               position={'relative'}
//             >
//               <Box className="title" mt={'80px'}>
//                 <Text fontFamily={'AtlantisContent'} textAlign={'center'}>
//                   Do You Want Play Again ?
//                 </Text>
//               </Box>
//               {/* <Box
//                 // onClick={() => getData(data)}
//                 position={'fixed'}
//                 top={'360px'}
//                 w={'40%'}
//                 display={'flex'}
//                 justifyContent={'space-between'}
//               >  */}
//               <Box
//               position={'fixed'}
//               top={'360px'}
//               w={'40%'}
//               display={'flex'}
//               justifyContent={'space-between'}
//               className='eoq-replay-img'
//             >
//                 <Img
//                   src={ReplayBtn}
//                   w={'200px'}
//                   h={'60px'}
//                   cursor={'pointer'}
//                   onClick={replayQuest}
//                 />
//                 {/* {formData?.gameMinScore < profile?.score ? (
//                   <Img
//                     src={next}
//                     w={'200px'}
//                     h={'60px'}
//                     cursor={'pointer'}
//                     // onClick={() => getData(data)}
//                   />
//                 ) : null} */}
//               </Box>
//             </Box>
//           </Box>
//         </>
//       )}
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
//                   src={preloadAssets.replayBtn}
//                   w={'200px'}
//                   h={'60px'}
//                   cursor={'pointer'}
//                   onClick={replayQuest}
//                 />
//               </Box>
//             </Box> */}
//     </Flex>
//   )
// }

// export default PreviewEndOfStory

// import { Box, Flex, Text, Img } from '@chakra-ui/react';
// import { useDispatch } from 'react-redux';
// import React from 'react';
// import { updatePreviewData } from 'store/preview/previewSlice';
// import ReplayBtn from 'assets/img/games/ReplayBtn.png';
// import { ScoreContext } from '../../demoplay/GamePreview';
// import next from 'assets/img/screens/next.png';

// const PreviewEndOfStory: React.FC<{
//   preloadAssets: any;
//   setEndOfQuest: any;
//   formData: any;
//   imageSrc: any;
// }> = ({ preloadAssets, setEndOfQuest, formData, imageSrc }) => {
//   const dispatch = useDispatch();

//   const replayQuest = () => {
//     dispatch(updatePreviewData({ activeBlockSeq: 1 }));
//     setEndOfQuest(false);
//   };

//   return (
//     <Flex className="end-of-quest" direction="column" align="center">
//       <Img src={preloadAssets?.backgroundImage} className="eoq-bg-img" />
//       {imageSrc && (
//         <Box className="thankyou-screen" textAlign="center">
//           <Box className="thankyou-screen-box">
//             <Img src={imageSrc} className="bg-Img" />
//             <Box w="100%" mt="0px">
//             <Text fontFamily="AtlantisContent" textAlign="center">
//               Do You Want to Play Again?
//             </Text>
//           </Box>
//           </Box>
//           <Flex
//             mt="1"
//             direction="column"
//             align="center"
//             justifyContent="center" // Center horizontally
//             className="eoq-replay-img"
//           >
//             <Img src={ReplayBtn}
//               w="200px"
//               h="60px"
//               cursor="pointer"
//               onClick={replayQuest}
//             />
//           </Flex>
//         </Box>
//       )}
//     </Flex>
//   );
// };

// export default PreviewEndOfStory;

import { Box, Flex, Text, Img } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import React from 'react';
import { updatePreviewData } from 'store/preview/previewSlice';
import ReplayBtn from 'assets/img/games/ReplayBtn.png';
import { ScoreContext } from '../../demoplay/GamePreview';
import next from 'assets/img/screens/next.png';

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
      {imageSrc && (
        <Box
          className="overlay-container"
          position="absolute"
          top="1110"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box className="thankyou-screen-box" zIndex="1">
            <Img src={imageSrc} className="bg-Img" />
            <Text fontFamily="AtlantisContent" textAlign="center"top={'-200px'} color="white" fontSize="2xl" zIndex="2">
              Do You Want to Play Again?
            </Text>
          </Box>
          <Flex
            mt="1"
            direction="column"
            align="center"
            justifyContent="center"
            className="eoq-replay-img"
            zIndex="2"
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
