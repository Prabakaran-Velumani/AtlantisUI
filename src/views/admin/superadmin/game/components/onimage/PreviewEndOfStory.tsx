import React from 'react'
import {Box, Flex,Text,Img} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { updatePreviewData } from 'store/preview/previewSlice';
const PreviewEndOfStory : React.FC<{preloadedAssets: any, setEndOfQuest:any}>= ({preloadedAssets, setEndOfQuest}) => {
const dispatch = useDispatch();
  console.log("preloadedAssets");
console.log(preloadedAssets);

const replayQuest = ()=>{
  dispatch(updatePreviewData({activeBlockSeq: 1}));
  setEndOfQuest(false);
}

  return (
    <Flex className="end-of-quest" >
      <Img src={preloadedAssets?.backgroundImage} className='eoq-bg-img' />
      <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              position={'relative'}
            >
              <Box className="title" mt={'80px'}>
              <Text fontFamily={'AtlantisContent'} textAlign={'center'}>
                  End of the current Quest.!
                </Text>
                <Text fontFamily={'AtlantisContent'} textAlign={'center'}>
                  Do You Want Play Again ?
                </Text>
              </Box>
              <Box
              
                position={'fixed'}
                top={'360px'}
                w={'40%'}
                display={'flex'}
                justifyContent={'space-between'}
                className='eoq-replay-img'
              >
                <Img
                  src={preloadedAssets.replayBtn}
                  w={'200px'}
                  h={'60px'}
                  cursor={'pointer'}
                  onClick={replayQuest}
                />
              </Box>
            </Box>
    </Flex>
  )
}

export default PreviewEndOfStory