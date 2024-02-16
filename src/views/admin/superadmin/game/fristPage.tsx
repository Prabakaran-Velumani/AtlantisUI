import {
  Box, Button, Flex, Heading, Icon, Img, SimpleGrid, Text, Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel, useColorModeValue, Grid, IconButton,
  InputGroup,
  InputLeftElement, Input,InputRightElement
} from '@chakra-ui/react'

import { Navigate, useNavigate } from 'react-router-dom';
import Card from 'components/card/Card';
import AddCourse from './components/AddCourse';
import { FaRegFolderOpen } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { GiJoystick } from "react-icons/gi";
import { getImages, getAllGame, countByStage, getDuplicate, getLaunch, getAssign, getPublic, gameDelete } from 'utils/game/gameService';
import { CiMenuKebab } from "react-icons/ci";
import { IoMdHeart } from 'react-icons/io';
// import GameBG from 'assets/img/account/InvoiceBg.png'
import Navbar from 'assets/img/crm/navbar.png'
import NFTBanner from 'assets/img/auth/topbg.jpg'
import NFT from 'assets/img/nfts/Nft3.png'
import GameBG from 'assets/img/auth/banner.png'
import Rocket from 'assets/img/games/rocket1-removebg-preview.png'
import { MdArrowCircleRight, MdMoreVert } from 'react-icons/md';
import { VSeparator } from 'components/separator/Separator';
import GameCard from './components/gameCard';
import { SearchIcon,CloseIcon } from '@chakra-ui/icons';
import Preview from './components/perview';
import Popup from 'components/alerts/Popup';
import OnToast from 'components/alerts/toast';
import LeanerList from './components/LeanersList'
import TexttoVoice from './components/SpeeachKit'
interface Counting {
  draftCount: any;
  internalCount: any;
  publicCount: any;
}

const Game: React.FC = () => {


  const searchIconColor = useColorModeValue('gray.700', 'white');
  const [showcount, setcount] = useState<Counting>({
    draftCount: 0,
    internalCount: 0,
    publicCount: 0,

  });
  const navigate = useNavigate();
  const [openCourse, setOpenCourse] = useState(false);
  const [img, setImg] = useState<any[]>([]),
    [fil, setFil] = useState<string>(''),
    [gamelist, setGameList] = useState<any[]>([]),
    [enter, setEnter] = useState(false),
    [bgIndex, setBgIndex] = useState<number>();
  const [deleteId, setDeleteId] = useState<number>(0);
  const [publicId, setPublicId] = useState<number>(0);
  const [launchId, setLaunchId] = useState<number>(0);
  const [duplicateId, setDuplicate] = useState<number>(0);
  const [msg, setMsg] = useState<string>('');
  const [msgtwo, setMsgtwo] = useState<string>('');
  const [toastStatus, setToastStatus] = useState<string>('');
  const [alert, setAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openLearner, setOpenLearner] = useState(false);
  const [assignGameId, setAssignGameId] = useState<number>();
  const [isConfirm, setIsConfirm] = useState(false); 
  const [tabState, setTabState] = useState('Creation');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const handleCourse = () => {
    navigate('/admin/superadmin/game/template');
  }
  const fetchData = async () => {
    const result = await getImages(1);
    if (result?.status !== 'Success')
      return console.log('getbackruond error:' + result?.message);
    setImg(result?.data);

  };
  const fetchCount = async () => {

    const result = await countByStage();
    if (result?.status !== 'Success') {
      return console.log('getbackruond error:' + result?.message);
    }
    else {
      setcount({
        ...showcount, draftCount: result?.creationCount || 0,
        internalCount: result?.reviewCount || 0, publicCount: result?.PublicCount || 0
      });
    }
    // setcount(result?.data[0]);
      



  };

  // const gameList = async (type: string) => {
  //   const data = '';
  //   const result = await getAllGame(data, type);
  //   if (result?.status !== 'Success') {
  //     setGameList([]);
  //     return console.log('getbackruond error:' + result?.message);
  //   }

  //   console.log('gameList :', result);
  //   setGameList(result.data);
  // };




  useEffect(() => {
    gameLists(tabState);  
  }, [tabState]);

  useEffect(() => {
    fetchData();

    fetchCount();
  }, []);
  const handleMouse = (i: number) => {
    setEnter(true)
    setBgIndex(i)
  }
  const handleMouseLeave = () => {
    setEnter(false)
    setBgIndex(null)
  }
  const handleButtonOne = (id: any) => {
    console.log('handleButtonOne', id)
    const newTab = window.open('', '_blank');

    // Navigate the new tab to the desired URL
    newTab.location.assign(`/admin/game/preview/${id}`);

  }
  const handleButtonTwo = (id: any) => {

    console.log('handleButtonTwo', id)
    navigate(`/admin/superadmin/game/creation/${id}`)
  }


  const handelDuplicate = (id: any) => {
    console.log('handelDuplicate', id);
    setDuplicate(id)
    setMsgtwo('Are you certain that you create a duplicate of this game?')
    setIsOpen(true)
  }
  const handelLaunch = (id: any) => {
    console.log('handelLaunch', id);
    setLaunchId(id);
    setMsgtwo('Are you sure that you initiated the launch of this game?')
    setIsOpen(true);
  }
  const handelAssign = (id: any) => {
    console.log('handelAssign', id);
    setAssignGameId(id);
    setOpenLearner(true)
  }
  const handelMakePublic = async (id: any) => {
    setMsgtwo("Are you sure you've made this game public?")
    console.log('handelMakePublic', id);
    setPublicId(id)
    setIsOpen(true);


  }

  const handelDelete = (id: any) => {
    console.log('handelDelete', id);
    setDeleteId(id);
    setIsOpen(true);

  }
  useEffect(() => {
    const deleteData = async () => {
      if (isConfirm) {
        if (deleteId !== 0) {
          const result = await gameDelete(deleteId);
          if (result?.status !== 'Success') {
            setIsOpen(false);
            setMsg('Game Not Deleted');
            setToastStatus('error');
            setAlert(true);
            setIsConfirm(false);
            setDeleteId(0);
            return;
          } else {
            setDeleteId(0);
            setIsOpen(false);
            setMsg('Game Deleted');
            setToastStatus('success');
            setAlert(true);
            setIsConfirm(false);
            fetchCount();
            gameLists(tabState);
          }


        }
      }
    }
    deleteData()

  }, [isConfirm, deleteId]);


  useEffect(() => {

    const makePublic = async () => {
      if (isConfirm) {
        if (publicId !== 0) {

          const result = await getPublic(publicId);
          if (result?.status !== 'Success') {
            setMsgtwo('');
            setPublicId(0);
            setIsOpen(false);
            setMsg('Game Not Published');
            setToastStatus('error');
            setAlert(true);
            setIsConfirm(false);
            return;
          } else {
            setMsgtwo('');
            setPublicId(0);
            setIsOpen(false);
            setMsg('Game Published');
            setToastStatus('success');
            setAlert(true);
            setIsConfirm(false);
            setTabState('Launched');
            fetchCount();
            gameLists(tabState);
          }
        }
      }
    }


    makePublic()

  }, [isConfirm, publicId]);


  useEffect(() => {
    const launchGame = async () => {
      if (isConfirm) {
        if (launchId !== 0) {

          const result = await getLaunch(launchId);
          if (result?.status !== 'Success') {
            setLaunchId(0);
            setMsgtwo('');
            setIsOpen(false);
            setMsg('Game Not Launch ');
            setToastStatus('error');
            setAlert(true);
            setIsConfirm(false);
            return;
          } else {
            setMsgtwo('');
            setLaunchId(0);
            setIsOpen(false);
            setMsg('Game Launch Sucessfuly');
            setToastStatus('success');
            setAlert(true);
            setIsConfirm(false);
            setTabState('Review');
            fetchCount();
            gameLists(tabState);

          }
        }
      }
    }


    launchGame()
  }, [isConfirm, launchId]);


  useEffect(() => {
    const gameDuplicate = async () => {
      if (isConfirm) {
        if (duplicateId !== 0) {

          const result = await getDuplicate(duplicateId);
          if (result?.status !== 'Success') {
            setMsgtwo('');
            setDuplicate(0);
            setIsOpen(false);
            setMsg('Game Not Duplicated ');
            setToastStatus('error');
            setAlert(true);
            setIsConfirm(false);
            return;
          } else {
            setMsgtwo('');
            setDuplicate(0);
            setIsOpen(false);
            setMsg('Game Duplicated Sucessfuly');
            setToastStatus('success');
            setAlert(true);          
            setIsConfirm(false);
            setTabState("Creation");
            fetchCount();
            gameLists(tabState);
          }
        }
      }
    }
    gameDuplicate()

  }, [isConfirm, duplicateId]);

  const gameLists = async (type: string) => {
    const data = '';
    const result = await getAllGame(data, type);
    if (result?.status !== 'Success') {
      setGameList([]);
      return console.log('getbackruond error:' + result?.message);
    }else{

      setGameList(result.data);
    }
 
    
   
  };





  return (
    <>
      <Box className='Game' position={'relative'}>
        <Box mb={{ base: '130px', md: '100px', xl: '100px' }} className='box'></Box>
        <Card backgroundImage={NFTBanner} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} height={'150px'} width={'100%'} overflow={{ sm: 'auto', xl: 'unset' }}>
          <Box display={{ base: 'block', xl: 'flex' }} justifyContent="space-between" alignItems={'end'} padding={'20px'}>
            <Box display={'flex'} flexDirection={'column'} width={'700px'}>
              <Heading color={'#fff'} pb={'20px'} display={'flex'} alignItems={'center'} >Your Creations<Img src={Rocket} height={'50px'} width={'50px'} ml={'20px'} transform={'rotate(40deg)'} /></Heading>
              <Text fontSize={'15px'} color={'#fff'} letterSpacing={'1px'}>Developing games that ignite curiosity, turning every challenge into a lesson.</Text>
            </Box>
            <Button
              mt="10px"
              mb="15px"
              mr="10px"
              padding={5}
              bg="#fff"
              color="#3311db"
              // w={150}
              onClick={handleCourse}
            >
              Create Game
            </Button>
            {/* <Button mt='10px' mb='15px' padding={2} background='#3311db' color='#fff' w={70} onClick={handleNavigate}>New</Button> */}
          </Box>

        </Card>
        <Card>
          <Flex gridArea='1 / 1 / 2 / 2' display={{ base: 'block', lg: 'flex' }}>
            <Tabs variant='soft-rounded' colorScheme='brandTabs'>
              <TabList mx={{ base: '10px', lg: '30px' }} overflowX={{ sm: 'scroll', lg: 'unset' }}>
                <Flex>
                  <Tab
                    pb='0px'
                    flexDirection='column'
                    onClick={function () {
                      setTabState('Creation');
                    }}
                    me='10px'
                    bg='unset'
                    _selected={{
                      bg: 'none'
                    }}
                    _focus={{ border: 'none' }}
                    minW='max-content'>
                    <Flex align='center'>
                      <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                        Draft
                      </Text>
                      <Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
                        {showcount.draftCount}
                      </Text>
                    </Flex>
                    <Box
                      height='4px'
                      w='100%'
                      transition='0.1s linear'
                      bg={tabState === 'Creation' ? 'brand.500' : 'transparent'}
                      mt='15px'
                      borderRadius='30px'
                    />
                  </Tab>
                  <Tab
                    onClick={function () {
                      setTabState('Review');
                    }}
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
                        Launched
                      </Text>
                      <Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
                        {showcount.internalCount}
                      </Text>
                    </Flex>
                    <Box
                      height='4px'
                      w='100%'
                      transition='0.1s linear'
                      bg={tabState === 'Review' ? 'brand.500' : 'transparent'}
                      mt='15px'
                      borderRadius='30px'
                    />
                  </Tab>
                  <Tab
                    pb='0px'
                    flexDirection='column'
                    onClick={function () {
                      setTabState('Launched');
                    }}
                    bg='unset'
                    _selected={{
                      bg: 'none'
                    }}
                    _focus={{ border: 'none' }}
                    minW='max-content'>
                    <Flex align='center'>
                      <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                        public
                      </Text>
                      <Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
                        {showcount.publicCount}
                      </Text>
                    </Flex>
                    <Box
                      height='4px'
                      w='100%'
                      transition='0.1s linear'
                      bg={tabState === 'Launched' ? 'brand.500' : 'transparent'}
                      mt='15px'
                      borderRadius='30px'
                    />
                  </Tab>
                </Flex>
              </TabList>
              {/* <TabPanels>
						<TabPanel px='0px'>{panelExample}</TabPanel>
						<TabPanel px='0px'>{panelExample}</TabPanel>
						<TabPanel px='0px'>{panelExample}</TabPanel>
					</TabPanels> */}
            </Tabs>
            <VSeparator mx='30px' h='100%' />


            <InputGroup w={{ base: '100%', md: '300px' }} ml="auto">
  <InputLeftElement
    children={
      <IconButton
        aria-label="search"
        bg="inherit"
        borderRadius="inherit"
        _active={{
          bg: 'inherit',
          transform: 'none',
          borderColor: 'transparent',
        }}
        _hover={{
          background: 'none',
        }}
        _focus={{
          background: 'none',
          boxShadow: 'none',
        }}
        icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
      />
    }
  />
  <Input
    type="text"
    placeholder="Search..."
    value={fil || ''}
    onChange={(e) => setFil(e.target.value)}
    bg={'#f9f9f9'}
    borderRadius={'14px'}
    w={{ base: '200px', xl: '300px' }}
  />
  {fil && (
    <InputRightElement
      children={
        <IconButton
          aria-label="clear"
          bg="inherit"
          borderRadius="inherit"
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _hover={{
            background: 'none',
          }}
          _focus={{
            background: 'none',
            boxShadow: 'none',
          }}
          icon={<CloseIcon color="gray.500"  w="10px" h="10px"/>}
          onClick={() => setFil('')} // Clear the input field
        />
      }
    />
  )}
</InputGroup>
          </Flex>
        </Card>
        <Grid
          mb='20px'
          gridTemplateColumns={{ xl: 'repeat(4, 1fr)', '1xl': '1fr 0.46fr' }}
          gap={{ base: '20px', xl: '20px' }}
          display={{ base: 'block', xl: 'grid' }}
          mt={'10px'}
        >



          {/* <Text mt="10px" mb="10px" fontSize={20} fontWeight={500} color={'#fff'}>
          Games
        </Text> */}
          {/* <Text fontSize={22} fontWeight={800} mb={'20px'}>
          Games
        </Text> */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap='40px'>

            {gamelist &&
              gamelist
              .filter((item) => {
                const lowerCaseFilter = fil?.toLowerCase();
                const lowerCaseGameTitle = item?.gameTitle?.toLowerCase();
                
                // Skip filter if gameTitle is null or empty
                if (!lowerCaseGameTitle || lowerCaseGameTitle === '') {
                 
                  return true; // Include the item in the result
                }
              
                return lowerCaseGameTitle.includes(lowerCaseFilter);
              })
              
            .map((game, i) => (
              // Your map logic here
        
                  <GameCard
                    name={game.gameTitle}
                    author={game.gameSkills}
                    // image={game.gameBackgroundId && game?.image.gasAssetImage}
                    image={'http://35.183.46.127:5555/uploads/background/29977_1701772077260.jpg'}
                    tabState={tabState}
                    id={game.gameId}
                    game={game}
                    handleButtonOne={handleButtonOne}
                    handleButtonTwo={handleButtonTwo}
                    handelDuplicate={handelDuplicate}
                    handelLaunch={handelLaunch}
                    handelAssign={handelAssign}
                    handelMakePublic={handelMakePublic}
                    handelDelete={handelDelete}
                   
                  /> 
                ))}
          </SimpleGrid>
        </Grid>
        {openCourse ? <AddCourse setOpenCourse={setOpenCourse} /> : null}
      </Box>
      {isOpen ? <Popup setIsConfirm={setIsConfirm} setIsOpen={setIsOpen} msg={msgtwo} setmsg={setMsgtwo} /> : null}
      {alert ? <OnToast msg={msg} status={toastStatus} setAlert={setAlert}
      /> : null}
      {openLearner ? <LeanerList setOpenLearner={setOpenLearner} assignGameId={assignGameId} setMsg={setMsg} setToastStatus={setToastStatus} setAlert={setAlert} /> : null}
      {/* <TexttoVoice />   */}
    </>
  );
}

export default Game