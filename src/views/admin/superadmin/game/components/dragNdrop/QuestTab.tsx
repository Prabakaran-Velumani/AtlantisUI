import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Img,
  SimpleGrid,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Grid,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import { MdCheck, MdClose, MdTimer, MdDelete } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
interface PropsNote {
  listQuest?: any;
  handleGet?: any;
  fetchBlocks?: any;
  questTabState?: any;
  setQuestTabState?: any;
  deleteQuest?: any;
}

const QuestTab: React.FC<PropsNote> = ({
  listQuest,
  handleGet,
  fetchBlocks,
  questTabState,
  setQuestTabState,
  deleteQuest,
}) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedQuestNo, setSelectedQuestNo] = useState<number | null>(null); // Initialize as null

  const handleNavigation = (nid: number) => {
    if (nid) {
      setQuestTabState(nid);
      handleGet(nid);
      fetchBlocks();
    }
  };
  const handleDeleteClick = (item: any) => {
    setSelectedQuestNo(item.gameQuestNo); // Set the selected quest number
    console.log('selectedQuestNo', item.gameQuestNo, item.gameId);
    onOpen();
  };

  const handleCancelDelete = () => {
    // Close the modal without deleting
    setSelectedQuestNo(null); // Set the selected quest number

    onClose();
  };

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="brandTabs">
        <TabList
          mx={{ base: '10px', lg: '30px' }}
          overflowX={{ sm: 'scroll', lg: 'unset' }}
        >
          <Flex>
            {listQuest
              ? listQuest.map((item: any, index: number) => (
                  <Tab
                    // onClick={function () {
                    //   setTabState('Review');
                    // }}
                    onClick={() => handleNavigation(item.gameQuestNo)}
                    pb="0px"
                    me="10px"
                    bg="unset"
                    _selected={{
                      bg: 'none',
                    }}
                    _focus={{ border: 'none' }}
                    minW="max-content"
                    flexDirection="column"
                  >
                    {/* <Flex align='center'>
                      <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                      Quest {item.gameQuestNo}
                      </Text>
                      <Icon as={MdDelete} fontSize={'md'} color={'grey'} cursor={'pointer'}   onClick={() => deleteQuest(item.gameId,item.gameQuestNo)}   />
                    </Flex> */}
                    <Flex align="center">
                      <Text
                        color={textColor}
                        fontSize="lg"
                        fontWeight="500"
                        me="12px"
                      >
                        Quest {item.gameQuestNo}
                      </Text>
                      {/* indu modified on 06-02-2024 for ask confirmation for delete */}
                      <Tooltip hasArrow label={`Delete Quest ${item.gameQuestNo}`}>
                        <div>
                          <Icon
                            as={MdDelete}
                            fontSize={'md'}
                            color={'grey'}
                            cursor={'pointer'}
                            onClick={() => handleDeleteClick(item)}
                          />
                        </div>
                      </Tooltip>
                      {/* Confirmation Modal */}
                      <Modal isOpen={isOpen} onClose={onClose} size="md">
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Confirm Deletion</ModalHeader>
                          <ModalBody>
                            <Text
                              color={textColor}
                              fontSize="18px"
                              fontWeight="600"
                            >
                              Are you sure you want to delete Quest{' '}
                              {selectedQuestNo}?
                            </Text>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color={'#fff'}
                              bg={'#11047a'}
                              _hover={{ color: '#fff', bg: '#11047a' }}
                              mr={'10px'}
                              onClick={() => {
                                deleteQuest(item.gameId, selectedQuestNo);
                                onClose();
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              color={'#fff'}
                              bg={'#11047a'}
                              _hover={{ color: '#fff', bg: '#11047a' }}
                              mr={'10px'}
                              onClick={handleCancelDelete}
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Flex>
                    <Box
                      height="4px"
                      w="100%"
                      transition="0.1s linear"
                      bg={
                        questTabState === item.gameQuestNo
                          ? 'brand.500'
                          : 'transparent'
                      }
                      mt="15px"
                      borderRadius="30px"
                    />
                  </Tab>
                ))
              : null}
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
