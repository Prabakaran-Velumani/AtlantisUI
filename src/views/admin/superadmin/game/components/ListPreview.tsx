import React from 'react';
import { Box, Button, Flex, Heading, Icon, Img, SimpleGrid, Text,Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,useColorModeValue,Grid,  IconButton,
  InputGroup,
  InputLeftElement,Input } from '@chakra-ui/react'
  import Profile from './GameProfile';
const ListPreview:React.FC = () => {
  return (
    <>
    
    <Box className='testnew' width={'100%'}  alignItems={'center'} pt={{ base: '50%', md: '80px', xl: '20px' }} >
  <SimpleGrid
    mb="20px"
    columns={{ sm: 1, lg: 1 }}
    spacing={{ base: '20px', xl: '20px' }}
   
  >
    <Flex direction="column" width="100%">
      <Profile name="Vlad Mihalache" data={'GAME Title'} avatar={'http://192.168.1.51:5556/uploads/background/29977_1701772077260.jpg'} banner={'DASDAS'} />
      {/* <Info data={creator}/> */}
    </Flex>
    
  </SimpleGrid>
</Box>
    </>
   
  );
}

export default ListPreview