
import {
  Box, Button, Flex, Heading, Icon, Img, SimpleGrid, Text, Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel, useColorModeValue, Grid, IconButton,
  InputGroup,
  InputLeftElement, Input,InputRightElement
} from '@chakra-ui/react'
import { MdCheck, MdClose, MdTimer ,MdDelete} from 'react-icons/md';
import React, { useEffect, useState } from 'react';
interface PropsNote {
    listQuest?:any;
    handleGet?:any;
    fetchBlocks?:any;
    questTabState?:any;
     setQuestTabState?:any;
     deleteQuest?:any;
}

const QuestTab: React.FC<PropsNote> = ({listQuest,handleGet,fetchBlocks,questTabState, setQuestTabState,deleteQuest  }) => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
   
    const handleNavigation = (nid: number) => {
		
		if(nid){
      setQuestTabState(nid);
			handleGet(nid);
			fetchBlocks();
		}
	  }
    return (
        <>
        <Tabs variant='soft-rounded' colorScheme='brandTabs'>
              <TabList mx={{ base: '10px', lg: '30px' }} overflowX={{ sm: 'scroll', lg: 'unset' }}>
                <Flex>
                {listQuest ? ( listQuest.map((item: any, index: number) => (
                  <Tab
                    // onClick={function () {
                    //   setTabState('Review');
                    // }}
                    onClick={() => handleNavigation(item.gameQuestNo)}
                    pb='0px'
                    me='10px'
                    bg='unset'
                    _selected={{
                      bg: 'none'
                    }}
                    _focus={{ border: 'none' }}
                    minW='max-content'
                    flexDirection='column'>
                    <Flex align='center'>
                      <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                      Quest {item.gameQuestNo}
                      </Text>
                      <Icon as={MdDelete} fontSize={'md'} color={'grey'} cursor={'pointer'}   onClick={() => deleteQuest(item.gameId,item.gameQuestNo)}   />
                    </Flex>
                    <Box
                      height='4px'
                      w='100%'
                      transition='0.1s linear'
                      bg={questTabState === item.gameQuestNo ? 'brand.500' : 'transparent'}
                      mt='15px'
                      borderRadius='30px'
                    />
                  </Tab>
                ))):(null)}
				
                </Flex>
              </TabList>
              {/* <TabPanels>
						<TabPanel px='0px'>{panelExample}</TabPanel>
						<TabPanel px='0px'>{panelExample}</TabPanel>
						<TabPanel px='0px'>{panelExample}</TabPanel>
					</TabPanels> */}
            </Tabs>

        </>

        );
    };
    
    export default QuestTab;