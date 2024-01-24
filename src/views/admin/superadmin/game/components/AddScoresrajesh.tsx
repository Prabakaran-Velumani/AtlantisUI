import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Img,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
  useTheme,
  useToast,
  Select 
} from '@chakra-ui/react';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import React, { useEffect, useRef, useState } from 'react';
import Card from 'components/card/Card';
import SelectField from 'components/fields/SelectField';

import { gameDuplicateQuestionEntirely, getImages } from 'utils/game/gameService';
import Dropzone from 'views/admin/main/ecommerce/settingsProduct/components/Dropzone';
import { MdClose, MdOutlineCloudUpload } from 'react-icons/md';

import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";


import Screen1 from "../../../../../assets/img/screens/screen1.png";
import Screen2 from "../../../../../assets/img/screens/screen2.png";
import Screen3 from "../../../../../assets/img/screens/screen3.png";
import Screen4 from "../../../../../assets/img/screens/screen4.png";
import Screen5 from "../../../../../assets/img/screens/screen5.png";
import Screen6 from "../../../../../assets/img/screens/screen6.png";
// brindha start
import BadgeImages from './BadgeImages';
import { useNavigate, useParams } from 'react-router-dom';

interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

// brindha end
interface OptionType {
  value: string;
  label: string;
}

/********navin */
const AddScores: React.FC<{
  handleChange: (e: any) => void;
  formData: any;
  inputRef: any;
  updateHandleIntroMusic: (selectedOption: OptionType | null) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setReflection:any;
  reflection:any;
  setBadge:any;
  setTab:any;
  isOpen:any;
  onOpen:any;
   onClose:any;
  cancelRef:any;
  productTab:any;
  mediaTab:any;
  pricingTab:any;
  takeawayTab:any;
  welcomeTab:any;
  thankyouTab:any;
  showBadge:any;
  setShowBadge:any;
}> = ({
  showBadge,
  setShowBadge,
  handleChange,
  formData,
  reflection,
  setBadge,
  setReflection,
  inputRef,
  updateHandleIntroMusic,
  setFormData,setTab,
  // brindha start
  isOpen, onOpen, onClose,
  // brindha end
  cancelRef,productTab,mediaTab,pricingTab,takeawayTab,welcomeTab,thankyouTab,
}) => {
  /**********navin */
  // brindha start
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [badgeData, setBadgeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [showBadge,setShowBadge] = useState<string | null>(null);
  // const [showBadge,setShowBadge] = useState(null);
  // brindha end
  const [arra, setArra] = useState([]);
    const [img, setImg] = useState<any[]>([]);
    const [value, setValue] = React.useState('1');
    const [openQuest, setOpenQuest] = useState(false);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const [activeBullets, setActiveBullets] = useState({
      product: true,
      media: false,
      pricing: false,
    });
    console.log('showBadge',showBadge);
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const cancelRef = React.useRef();
    // const productTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    // const mediaTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    // const pricingTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    // const takeawayTab =
    //   React.useRef() as React.MutableRefObject<HTMLInputElement>;
    // const welcomeTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    // const thankyouTab =
    //   React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const comScreen =React.useRef(null) as React.MutableRefObject<HTMLInputElement>;
    const theme = useTheme();
    //eslint-disable-next-line
    const [lineColor, setLineColor] = useState(theme.colors.brand[500]);
    //eslint-disable-next-line
    const [lineColorDark, setLineColorDark] = useState(theme.colors.brand[400]);
    const brand = useColorModeValue(lineColor, lineColorDark);
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
    const [backgroundIndex, setBackgroundIndex] = useState<number>();
    const options = ['Private', 'Public'];
        
   
    ///////////////////////ScreenStates////////////////////////////////

    ///////ScreenState1/////////
    const [completionScreens, setcompletionScreens] = useState([
      { id: 1, url: Screen1 },
      { id: 2, url: Screen2 },
      { id: 3, url: Screen3 },
      { id: 4, url: Screen4 },
      { id: 5, url: Screen5 },
      { id: 6, url: Screen6 },
      // ... (add the rest of the images and IDs)
    ]);

    ///////ScreenState2/////////
    const [leaderboardScreens, setLeaderboardScreens] = useState([
      { id: 1, url: Screen1 },
      { id: 2, url: Screen2 },
      { id: 3, url: Screen3 },
      { id: 4, url: Screen4 },
      { id: 5, url: Screen5 },
      { id: 6, url: Screen6 },
      // ... (add the rest of the images and IDs)
    ]);

      ///////ScreenState3/////////
      const [reflectionScreens, setReflectionScreens] = useState([
        { id: 1, url: Screen1 },
        { id: 2, url: Screen2 },
        { id: 3, url: Screen3 },
        { id: 4, url: Screen4 },
        { id: 5, url: Screen5 },
        { id: 6, url: Screen6 },
        // ... (add the rest of the images and IDs)
      ]);

      ///////ScreenState4/////////
    const [takeawayScreens, setTakeawayScreens] = useState([
      { id: 1, url: Screen1 },
      { id: 2, url: Screen2 },
      { id: 3, url: Screen3 },
      { id: 4, url: Screen4 },
      { id: 5, url: Screen5 },
      { id: 6, url: Screen6 },
      // ... (add the rest of the images and IDs)
    ]);

      ///////ScreenState5/////////
      const [welcomeScreens, setWelcomeScreens] = useState([
        { id: 1, url: Screen1 },
        { id: 2, url: Screen2 },
        { id: 3, url: Screen3 },
        { id: 4, url: Screen4 },
        { id: 5, url: Screen5 },
        { id: 6, url: Screen6 },
        // ... (add the rest of the images and IDs)
      ]);

    ///////ScreenState6/////////
    const [thankyouScreens, setThankyouScreens] = useState([
      { id: 1, url: Screen1 },
      { id: 2, url: Screen2 },
      { id: 3, url: Screen3 },
      { id: 4, url: Screen4 },
      { id: 5, url: Screen5 },
      { id: 6, url: Screen6 },
      // ... (add the rest of the images and IDs)
    ]);


    ///////////////////////////////////////////////////////////////////
    const musicOptions = [
      { value: '1', label: 'Jazz' },
      { value: '2', label: 'Melodic Harmony' },
      { value: '3', label: 'Rhythmic Serenity' },
      { value: '4', label: 'Echoes of Euphoria' },
      { value: '5', label: 'Sonic Reverie' },
      { value: '6', label: 'Tranquil Melodies' },
      { value: '7', label: 'Harmonic Bliss' },
      { value: '8', label: 'Mystical Cadence' },
      { value: '9', label: 'Celestial Rhythms' },
      { value: '10', label: 'Enchanted Sonata' },
      { value: '11', label: 'Symphony of Dreams' },
    ];
    const handleFileChange = (e: any) => {
      const file = e.target.files[0];
      console.log('Selected file:', file);
    };
    const addReflection = () => {
      setReflection([...reflection, '']);
    };
  
    const fetchData = async () => {
      const result = await getImages(6);
      if (result?.status !== 'Success')
        return alert('getbackruond error:' + result?.message);
      setImg(result?.data);
    };
    const handleSetBackground = (i: any) => {
      setBackgroundIndex(i);
      setFormData((prev: any) => ({
        ...prev,
        gameReflectionpageBackground: i,
      }));
    };
// useEffect(()=>{
//   setFormData((prev:any) => ({
//     ...prev,
//     gameReflectionPageId:'',
//     gameCompletionScreenId:'',
//     gameLeaderboardScreenId:'',
//     gameTakeawayScreenId:'',
//     gameWelcomepageBackgroundScreenId:'',
//     gameThankYouScreenId:''
//   }));
 
// },[]);






    useEffect(() => {
      fetchData();
      console.log('formData', formData);
    }, [backgroundIndex]);
    
    const handleAdd = () => {
      onClose();
      setTimeout(() => {
        setOpenQuest(true);
      }, 500);
    };
    const toast = useToast()
    const navigate = useNavigate();
    // const [screens, setScreens] = useState([
    //   { id: 1, url: Screen1 },
    //   { id: 2, url: Screen2 },
    //   { id: 3, url: Screen3 },
    //   { id: 4, url: Screen4 },
    //   { id: 5, url: Screen5 },
    //   { id: 6, url: Screen6 },
    //   // ... (add the rest of the images and IDs)
    // ]);




    // console.log('FD--',formData);

    // const toast = useToast();
    // const showToast = () => {
    //   if (!formData.gameMinScore) {
    //     toast({
    //       title: 'Please Enter Min Score',
    //       status: 'error',
    //       duration: 3000,
    //       isClosable: true,
    //     });
  
    //     return false;
    //   }
    // };

//Rajesh
const handleBadge = (e:any) =>{
  console.log('welcome');
  e.preventDefault();
  let selectedFile;
  if (e.target.files) {
    selectedFile = e.target.files[0];
  }
  else if (e.dataTransfer && e.dataTransfer.files) {
    selectedFile = e.dataTransfer.files[0];
  }
  console.log('selectedFile',selectedFile);
  if (selectedFile) {
    setBadge(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      // setShowBadge(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }

};

// brindha start
const handleBadgeImages = async () => {
  const result = await getImages(4);
  if (result?.status !== 'Success')
    return console.log('getbackruond error:' + result?.message);
  else {
    setBadgeData(result?.data);
    setIsModalOpen(true);
  }
  setImg(result?.data);
}
const handleModalClose = () => {
  setIsModalOpen(false);
};
const handleBadgeSelection = (badge: Badge) => {
  // setShowBadge(badge.gasAssetImage);
  setSelectedBadge(badge);
  setIsModalOpen(false);
  console.log('Selected Image:', badge);
};
// brindha end
const handleInputChange = (index: number, value: any) => {
  const updatedRows = [...arra];
  updatedRows[index].value = value;
  setReflection(updatedRows);
};
const handleClear = () => {
  setSelectedBadge(null);
  setBadge(null);
};

const handleArra = (e:any) =>{
  setArra(Array.from({ length: e.target.value }, (_, index) => ({id:index + 1,value:''})));
  setReflection(['']);
  }
  const {id} = useParams();
  const handleCopy = async () =>{
    if(!value){ 
      toast({
        title: 'Please select option',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
      return false;
    }
      let crump = {
        key:value,
      }
      let data = JSON.stringify(crump);
      const result = await gameDuplicateQuestionEntirely(id,data);
      if(result && result?.status === 'Success')
      {
        toast({
          title: 'Question Duplicated',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
        setOpenQuest(false);
        navigate(`/admin/superadmin/game/creation/${result.data.gameId}`);
      } 
     
   }

// afrith
  const [currentCompletionScreenIndex, setCurrentCompletionScreenIndex] = useState(0);
  const [currentLeaderboardScreenIndex, setCurrentLeaderboardScreenIndex] = useState(1);
  const [currentReflectionScreenIndex, setCurrentReflectionScreenIndex] = useState(2);
  const [currentTakeawayScreenIndex, setCurrentTakeawayScreenIndex] = useState(3);
  const [currentWelcomeScreenIndex, setCurrentWelcomeScreenIndex] = useState(4);
  const [currentThankyouScreenIndex, setCurrentThankyouScreenIndex] = useState(5);

  console.log('currCompScrID--',currentCompletionScreenIndex);



  const goToPreviousCompletionScreen = () => {
    setCurrentCompletionScreenIndex((prevIndex) => (prevIndex === 0 ? completionScreens.length - 1 : prevIndex - 1));
    let currCompIndexPrev=currentCompletionScreenIndex==0 ? completionScreens.length-1 : currentCompletionScreenIndex - 1 ;
    let compIncrementPrev='compScreen-'+currCompIndexPrev;
    let compid =(document.getElementById(`${compIncrementPrev}`) as HTMLInputElement)?.value;
   
     setFormData((prev: any) => ({
      ...prev,
      gameCompletionScreenId: compid,
    }));
    
      console.log('comscrren', compid);

  };

  const goToNextCompletionScreen = () => {
    setCurrentCompletionScreenIndex((prevIndex) => (prevIndex === completionScreens.length - 1 ? 0 : prevIndex + 1));
    let currCompIndexNext = currentCompletionScreenIndex === completionScreens.length - 1 ? 0 : currentCompletionScreenIndex + 1;
    let compIncrementNext = 'compScreen-' + currCompIndexNext;
    let compid = (document.getElementById(`${compIncrementNext}`) as HTMLInputElement)?.value;
  
    setFormData((prev: any) => ({
      ...prev,
      gameCompletionScreenId: compid,
    }));
  
    console.log('comscrren', compid);
    
 
  };

  const goToPreviousLeaderboardScreen = () => {
    setCurrentLeaderboardScreenIndex((prevIndex) => (prevIndex === 0 ? leaderboardScreens.length - 1 : prevIndex - 1));

    let currLeaderIndexPrev=currentLeaderboardScreenIndex==0 ? leaderboardScreens.length-1 : currentLeaderboardScreenIndex - 1 ;
    let leaderIncrementPrev='leaderScreen-'+currLeaderIndexPrev;
    let leaderid =(document.getElementById(`${leaderIncrementPrev}`) as HTMLInputElement)?.value;
   
     setFormData((prev: any) => ({
      ...prev,
      gameLeaderboardScreenId: leaderid,
    }));
    
      console.log('comscrren', leaderid);
  };

  const goToNextLeaderboardScreen = () => {
    setCurrentLeaderboardScreenIndex((prevIndex) => (prevIndex === leaderboardScreens.length - 1 ? 0 : prevIndex + 1));
    
    let currLeaderIndexNext = currentLeaderboardScreenIndex === leaderboardScreens.length - 1 ? 0 : currentLeaderboardScreenIndex + 1;
    let leaderIncrementNext='leaderScreen-'+currLeaderIndexNext;
    let leaderid =(document.getElementById(`${leaderIncrementNext}`) as HTMLInputElement)?.value;
   
     setFormData((prev: any) => ({
      ...prev,
      gameLeaderboardScreenId: leaderid,
    }));
    
      console.log('comscrren', leaderid);
  };

  const goToPreviousReflectionScreen = () => {
    setCurrentReflectionScreenIndex((prevIndex) => (prevIndex === 0 ? reflectionScreens.length - 1 : prevIndex - 1));
  
    let currReflectionIndexPrev = currentReflectionScreenIndex === 0 ? reflectionScreens.length - 1 : currentReflectionScreenIndex - 1;
    let reflectionIncrementPrev = 'reflectionScreen-' + currReflectionIndexPrev;
    let reflectionId = (document.getElementById(`${reflectionIncrementPrev}`) as HTMLInputElement)?.value;
  
    setFormData((prev: any) => ({
      ...prev,
      gameReflectionScreenId: reflectionId,
    }));
  
    console.log('reflectionId', reflectionId);
  };
  
  const goToNextReflectionScreen = () => {
    setCurrentReflectionScreenIndex((prevIndex) => (prevIndex === reflectionScreens.length - 1 ? 0 : prevIndex + 1));
  
    let currReflectionIndexNext = currentReflectionScreenIndex === reflectionScreens.length - 1 ? 0 : currentReflectionScreenIndex + 1;
    let reflectionIncrementNext = 'reflectionScreen-' + currReflectionIndexNext;
    let reflectionId = (document.getElementById(`${reflectionIncrementNext}`) as HTMLInputElement)?.value;
  
    setFormData((prev: any) => ({
      ...prev,
      gameReflectionScreenId: reflectionId,
    }));
  
    console.log('reflectionId', reflectionId);
  };
  

  const goToPreviousTakeawayScreen = () => {
    setCurrentTakeawayScreenIndex((prevIndex) => (prevIndex === 0 ? takeawayScreens.length - 1 : prevIndex - 1));
  
    let currTakeawayIndexPrev = currentTakeawayScreenIndex === 0 ? takeawayScreens.length - 1 : currentTakeawayScreenIndex - 1;
    let takeawayIncrementPrev = 'takeawayScreen-' + currTakeawayIndexPrev;
    let takeawayId = (document.getElementById(`${takeawayIncrementPrev}`) as HTMLInputElement)?.value;
  
    setFormData((prev: any) => ({
      ...prev,
      gameTakeawayScreenId: takeawayId,
    }));
  
    console.log('takeawayId', takeawayId);
  };
  
  const goToNextTakeawayScreen = () => {
    setCurrentTakeawayScreenIndex((prevIndex) => (prevIndex === takeawayScreens.length - 1 ? 0 : prevIndex + 1));
  
    let currTakeawayIndexNext = currentTakeawayScreenIndex === takeawayScreens.length - 1 ? 0 : currentTakeawayScreenIndex + 1;
    let takeawayIncrementNext = 'takeawayScreen-' + currTakeawayIndexNext;
    let takeawayId = (document.getElementById(`${takeawayIncrementNext}`) as HTMLInputElement)?.value;
  
    setFormData((prev: any) => ({
      ...prev,
      gameTakeawayScreenId: takeawayId,
    }));
  
    console.log('takeawayId', takeawayId);
  };

  const goToPreviousWelcomeScreen = () => {
    setCurrentWelcomeScreenIndex((prevIndex) => (prevIndex === 0 ? welcomeScreens.length - 1 : prevIndex - 1));
  
    let currWelcomeIndexPrev = currentWelcomeScreenIndex === 0 ? welcomeScreens.length - 1 : currentWelcomeScreenIndex - 1;
    let welcomeIncrementPrev = 'welcomeScreen-' + currWelcomeIndexPrev;
    let welcomeId = (document.getElementById(`${welcomeIncrementPrev}`) as HTMLInputElement)?.value;
  
    setFormData((prev: any) => ({
      ...prev,
      gameWelcomepageBackgroundScreenId: welcomeId,
    }));
  
    console.log('welcomeId', welcomeId);
  };
  
  const goToNextWelcomeScreen = () => {
    setCurrentWelcomeScreenIndex((prevIndex) => (prevIndex === welcomeScreens.length - 1 ? 0 : prevIndex + 1));
  
    let currWelcomeIndexNext = currentWelcomeScreenIndex === welcomeScreens.length - 1 ? 0 : currentWelcomeScreenIndex + 1;
    let welcomeIncrementNext = 'welcomeScreen-' + currWelcomeIndexNext;
    let welcomeId = (document.getElementById(`${welcomeIncrementNext}`) as HTMLInputElement)?.value;
  
    setFormData((prev: any) => ({
      ...prev,
      gameWelcomepageBackgroundScreenId: welcomeId,
    }));
  
    console.log('welcomeId', welcomeId);
  };

  const goToPreviousThankyouScreen = () => {
    setCurrentThankyouScreenIndex((prevIndex) => (prevIndex === 0 ? thankyouScreens.length - 1 : prevIndex - 1));
  
    let currThankyouIndexPrev = currentThankyouScreenIndex === 0 ? thankyouScreens.length - 1 : currentThankyouScreenIndex - 1;
    let thankyouIncrementPrev = 'thankyouScreen-' + currThankyouIndexPrev;
    let thankyouId = (document.getElementById(`${thankyouIncrementPrev}`) as HTMLInputElement)?.value;
  
    setFormData((prev: any) => ({
      ...prev,
      gameThankYouScreenId: thankyouId,
    }));
  
    console.log('thankyouId', thankyouId);
  };
  
  const goToNextThankyouScreen = () => {
    setCurrentThankyouScreenIndex((prevIndex) => (prevIndex === thankyouScreens.length - 1 ? 0 : prevIndex + 1));
  
    let currThankyouIndexNext = currentThankyouScreenIndex === thankyouScreens.length - 1 ? 0 : currentThankyouScreenIndex + 1;
    let thankyouIncrementNext = 'thankyouScreen-' + currThankyouIndexNext;
    let thankyouId = (document.getElementById(`${thankyouIncrementNext}`) as HTMLInputElement)?.value;
  
    setFormData((prev: any) => ({
      ...prev,
      gameThankYouScreenId: thankyouId,
    }));
  
    console.log('thankyouId', thankyouId);
  };
  
  

  useEffect(() => {
    setFormData((prev:any) => ({
      ...prev,
      gameCompletionScreenId: 1,
      gameLeaderboardScreenId: 2,
      gameReflectionScreenId: 3,
      gameTakeawayScreenId: 4,
      gameWelcomepageBackgroundScreenId: 5,
      gameThankYouScreenId: 6,
    }));
  }, []);


    return (
      <>
        <Box width={'100%'}>
          <Tabs
            variant="unstyled"
            zIndex="0"
            display="flex"
            flexDirection="column"
          >
            <TabList
              display="none"
              alignItems="center"
              alignSelf="center"
              justifySelf="center"
            >
              <Tab
                _focus={{ border: '0px', boxShadow: 'unset' }}
                ref={productTab}
                w={{ sm: '120px', md: '250px', lg: '300px' }}
                onClick={() =>
                  setActiveBullets({
                    product: true,
                    media: false,
                    pricing: false,
                  })
                }
              >
                <Flex
                  direction="column"
                  // justify="center"
                  // align="center"
                  position="relative"
                  _before={{
                    content: "''",
                    width: { sm: '120px', md: '250px', lg: '300px' },
                    height: '3px',
                    bg: activeBullets.media ? 'white' : 'brand.400',
                    left: { sm: '12px', md: '40px' },
                    top: {
                      sm: activeBullets.product ? '6px' : '4px',
                      md: null,
                    },
                    position: 'absolute',
                    bottom: activeBullets.product ? '40px' : '38px',

                    transition: 'all .3s ease',
                  }}
                >
                  <Box
                    zIndex="1"
                    border="2px solid"
                    borderColor={activeBullets.product ? 'white' : 'brand.400'}
                    bgGradient="linear(to-b, brand.400, brand.600)"
                    w="16px"
                    h="16px"
                    mb="8px"
                    borderRadius="50%"
                  />
                  <Text
                    color={activeBullets.product ? 'white' : 'gray.300'}
                    fontWeight={activeBullets.product ? 'bold' : 'normal'}
                    display={{ sm: 'none', md: 'block' }}
                  >
                    Product Info
                  </Text>
                </Flex>
              </Tab>
              <Tab
                _focus={{ border: '0px', boxShadow: 'unset' }}
                ref={mediaTab}
                w={{ sm: '120px', md: '250px', lg: '300px' }}
                onClick={() =>
                  setActiveBullets({
                    product: true,
                    media: true,
                    pricing: false,
                  })
                }
              >
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  position="relative"
                  _before={{
                    content: "''",
                    width: { sm: '120px', md: '250px', lg: '300px' },
                    height: '3px',
                    bg: activeBullets.pricing ? 'white' : 'brand.400',
                    left: { sm: '12px', md: '28px' },
                    top: '6px',
                    position: 'absolute',
                    bottom: activeBullets.media ? '40px' : '38px',

                    transition: 'all .3s ease',
                  }}
                >
                  <Box
                    zIndex="1"
                    border="2px solid"
                    borderColor={activeBullets.media ? 'white' : 'brand.400'}
                    bgGradient="linear(to-b, brand.400, brand.600)"
                    w="16px"
                    h="16px"
                    mb="8px"
                    borderRadius="50%"
                  />
                  <Text
                    color={activeBullets.media ? 'white' : 'gray.300'}
                    fontWeight={activeBullets.media ? 'bold' : 'normal'}
                    display={{ sm: 'none', md: 'block' }}
                  >
                    Media
                  </Text>
                </Flex>
              </Tab>
              <Tab
                _focus={{ border: '0px', boxShadow: 'unset' }}
                ref={pricingTab}
                w={{ sm: '120px', md: '250px', lg: '300px' }}
                onClick={() =>
                  setActiveBullets({
                    product: true,
                    media: true,
                    pricing: true,
                  })
                }
              >
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  position="relative"
                >
                  <Box
                    zIndex="1"
                    border="2px solid"
                    borderColor={activeBullets.pricing ? 'white' : 'brand.400'}
                    bgGradient="linear(to-b, brand.400, brand.600)"
                    w="16px"
                    h="16px"
                    mb="8px"
                    borderRadius="50%"
                  />
                  <Text
                    color={activeBullets.pricing ? 'white' : 'gray.300'}
                    fontWeight={activeBullets.pricing ? 'bold' : 'normal'}
                    display={{ sm: 'none', md: 'block' }}
                  >
                    Pricing
                  </Text>
                </Flex>
              </Tab>
              <Tab
                _focus={{ border: '0px', boxShadow: 'unset' }}
                ref={takeawayTab}
                w={{ sm: '120px', md: '250px', lg: '300px' }}
                onClick={() =>
                  setActiveBullets({
                    product: true,
                    media: true,
                    pricing: true,
                  })
                }
              >
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  position="relative"
                >
                  <Box
                    zIndex="1"
                    border="2px solid"
                    borderColor={activeBullets.pricing ? 'white' : 'brand.400'}
                    bgGradient="linear(to-b, brand.400, brand.600)"
                    w="16px"
                    h="16px"
                    mb="8px"
                    borderRadius="50%"
                  />
                  <Text
                    color={activeBullets.pricing ? 'white' : 'gray.300'}
                    fontWeight={activeBullets.pricing ? 'bold' : 'normal'}
                    display={{ sm: 'none', md: 'block' }}
                  >
                    Pricing
                  </Text>
                </Flex>
              </Tab>
              <Tab
                _focus={{ border: '0px', boxShadow: 'unset' }}
                ref={welcomeTab}
                w={{ sm: '120px', md: '250px', lg: '300px' }}
                onClick={() =>
                  setActiveBullets({
                    product: true,
                    media: true,
                    pricing: true,
                  })
                }
              >
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  position="relative"
                >
                  <Box
                    zIndex="1"
                    border="2px solid"
                    borderColor={activeBullets.pricing ? 'white' : 'brand.400'}
                    bgGradient="linear(to-b, brand.400, brand.600)"
                    w="16px"
                    h="16px"
                    mb="8px"
                    borderRadius="50%"
                  />
                  <Text
                    color={activeBullets.pricing ? 'white' : 'gray.300'}
                    fontWeight={activeBullets.pricing ? 'bold' : 'normal'}
                    display={{ sm: 'none', md: 'block' }}
                  >
                    Pricing
                  </Text>
                </Flex>
              </Tab>
              <Tab
                _focus={{ border: '0px', boxShadow: 'unset' }}
                ref={thankyouTab}
                w={{ sm: '120px', md: '250px', lg: '300px' }}
                onClick={() =>
                  setActiveBullets({
                    product: true,
                    media: true,
                    pricing: true,
                  })
                }
              >
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  position="relative"
                >
                  <Box
                    zIndex="1"
                    border="2px solid"
                    borderColor={activeBullets.pricing ? 'white' : 'brand.400'}
                    bgGradient="linear(to-b, brand.400, brand.600)"
                    w="16px"
                    h="16px"
                    mb="8px"
                    borderRadius="50%"
                  />
                  <Text
                    color={activeBullets.pricing ? 'white' : 'gray.300'}
                    fontWeight={activeBullets.pricing ? 'bold' : 'normal'}
                    display={{ sm: 'none', md: 'block' }}
                  >
                    Pricing
                  </Text>
                </Flex>
              </Tab>
            </TabList>
            <TabPanels maxW={{ md: '90%', lg: '100%' }} mx="auto">
              <TabPanel w={'100%'} p="0px" mx="auto">
                <Box>
                  <Text
                    color={textColor}
                    fontSize={'21'}
                    fontWeight="700"

                  >
                    Completion Screen
                  </Text>
                  <Text
                    color={textColor}
                    fontSize={'14'}
                    fontWeight="700"

                  >
                    This screen shows in-game score and will appear at the end of the quest
                  </Text>
                  <Flex direction="column" w="100%">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                      <Stack direction="column" gap="20px">
                        {/* <Card h={'500px'}>
                          <Img src={Screen1} alt="Your Image" height="500px" width="100%" />
                        </Card> */}
                            {/* <div>
                    {screens.map((screen) => (
                      <Card key={screen.id} h={'500px'}>
                        <Img src={screen.url} alt={`Screen ${screen.id}`} height="500px" width="100%" />
                      </Card>
                    ))}
                          </div> */}
   
      {/* Completion Screens */}
      <div style={{ position: 'relative' }}>
        <button onClick={goToPreviousCompletionScreen} style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1 }}>
          <FaChevronCircleLeft style={{ fontSize: '40px' }} />
        </button>
        <button onClick={goToNextCompletionScreen} style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1 }}>
          <FaChevronCircleRight style={{ fontSize: '40px' }} />
        </button>
        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
          Screen ({currentCompletionScreenIndex + 1}/{completionScreens.length})
        </div>
        {completionScreens.map((screen, index) => (
          <div key={screen.id} style={{ display: index === currentCompletionScreenIndex ? 'block' : 'none' }}>
            {/* Your card or image component */}
            <Card key={screen.id} h={'500px'}>
            <Flex
                        justifyContent="center"
                        alignItems="center"
                        height="100%" // Ensures the Flex container takes the full height of the Card
                      >
                        <input type='hidden' ref={comScreen} value={screen.id} id={`compScreen-${index}`} />
                        <img
                          src={screen.url}
                          alt={`Screen ${screen.id}`}
                          height="400px"
                          width="80%"
                          
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </Flex>
                      </Card>
          </div>
        ))}
      </div>
     
                      </Stack>
                      <Stack direction="column" gap="20px">
                        <Card h={'500px'}>
                          {/* <Text fontSize={20} fontWeight={700}>
                          Screen Title
                        </Text>
                        <InputField
                          mb="0px"
                          id="Collection"
                          placeholder="eg. Modernary"
                          // label="Screen Title"
                        /> */}
                          <Text fontSize={18} fontWeight={700}>
                            Score
                          </Text>
                          <SimpleGrid columns={{ base: 1, md: 1 }} gap="20px" >
                            <Flex align="center">
                              <Text mr={2} fontSize="sm" fontWeight="bold" width="100px">
                              Total Score: <span style={{ color: 'red' }}>*</span>

                              </Text>
                              <InputField
                                mb="0px"
                                id="gameTotalScore"
                                type="number"
                                placeholder="eg. 1000"
                                name="gameTotalScore"
                                w="150px" // Adjust the width as needed
                                value={formData?.gameTotalScore}
                               onChange={handleChange}
                               
                              />
                            </Flex>
                          </SimpleGrid>


                          <SimpleGrid
                            columns={{ base: 1, md: 2 }}
                            gap="20px"
                           
                          >
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"

                            >
                              <FormLabel
                                htmlFor="email-"
                                mb="0"
                                fontSize="sm"
                                fontWeight="bold"
                                color={textColorPrimary}
                                mr="2" // Adjust the margin to reduce space
                              >
                                Set Minimum Pass Score
                              </FormLabel>
                              <Switch
                              isChecked={formData.gameIsSetMinPassScore==='true'? true :false}
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsSetMinPassScore"
                                name="gameIsSetMinPassScore"
                                onChange={handleChange}
                              />
                            </FormControl>


                            <Flex align="center">
                              <Text mr={2} fontSize="sm" fontWeight="bold" width="100px">
                                Minimum Score: {formData.gameIsSetMinPassScore === "true" && <span style={{ color: 'red' }}>*</span>}
                              </Text>
                              <InputField
                                mb="0px"
                                id="gameMinScore"
                                name="gameMinScore"
                                type="number"
                                disabled={formData?.gameIsSetMinPassScore ==='true'?false:true}
                                placeholder="eg. 1000"
                                w="150px" // Adjust the width as needed
                                value={formData?.gameMinScore}
                                onChange={handleChange}
                              />
                            </Flex>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                             
                            >
                              <FormLabel htmlFor="email-" mb="0" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Set Disticntion Score
                              </FormLabel>
                              <Switch
                              isChecked={formData.gameIsSetDistinctionScore==='true'? true :false}
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsSetDistinctionScore"
                                name="gameIsSetDistinctionScore"
                                onChange={handleChange}
                              />
                            </FormControl>
                            
                            <Flex align="center">
                              <Text mr={2} fontSize="sm" fontWeight="bold" width="100px">
                              Distinction Score: {formData.gameIsSetDistinctionScore === "true" && <span style={{ color: 'red' }}>*</span>}
                              </Text>
                              <InputField
                                mb="0px"
                                disabled={formData?.gameIsSetDistinctionScore ==='true' ?false:true}
                                id="gameDistinctionScore"
                                name="gameDistinctionScore"
                                type="number"
                                placeholder="eg. 1000"
                                w="150px" // Adjust the width as needed
                                value={formData?.gameDistinctionScore}
                                onChange={handleChange}
                              />
                            </Flex>
                          
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                            
                            >
                              <FormLabel htmlFor="email-" mb="0" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Skill Wise Score
                              </FormLabel>
                              <Switch
                              isChecked={formData.gameIsSetSkillWiseScore==='true'? true :false}
                               color="#fff"
                               colorScheme='brandScheme'
                               size='md'
                                // colorScheme="purple"
                                id="gameIsSetSkillWiseScore"
                                name="gameIsSetSkillWiseScore"
                                 onChange={handleChange}
                                // variant='main'
                              />
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                            
                            >
                              
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                            
                            >
                              <FormLabel htmlFor="email-" mb="0" fontSize='sm' fontWeight='bold' color={textColorPrimary} mt={'20px'}>
                              <Text fontSize={18} fontWeight={700}>
                              Badge
                          </Text>
                              </FormLabel>
                              <Switch
                               isChecked={formData.gameIsSetBadge==='true'? true :false}
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                // colorScheme="purple"
                                id="gameIsSetBadge"
                                name="gameIsSetBadge"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                            
                            >
                              
                            </FormControl>
                            <Flex alignItems="center">
  <Text
    fontSize="sm"
    fontWeight="bold"
    color={textColorPrimary}
    mb="10px"
    mr="45px" // Adjust the margin to your preference
    // brindha start
    onClick={handleBadgeImages}
    // brindha end
  >
    Select Badge: {formData.gameIsSetBadge === "true" && <span style={{ color: 'red' }}>*</span>}
  </Text>
  { !selectedBadge   ? <Dropzone
    content={
      <Box maxW="100%" textAlign="center">
        <Icon
          as={MdOutlineCloudUpload}
          w="30px" // Adjust the width to reduce the icon size
          h="30px" // Adjust the height to reduce the icon size
          color={textColor}
        />
        {/* Other content */}
      </Box>
    }
    style={{
      border: '2px dashed #A0AEC0', // Adjust the border style
      borderRadius: '4px', // Adjust the border radius (smaller value for a more rectangular shape)
      width: '140px', // Adjust the overall width for a more horizontal shape
      height: '50px', // Adjust the overall height for a more horizontal shape
    }}
    onClick={() => handleBadgeImages()}
    />
  :
  <Box position={'relative'}>
    <Img id={selectedBadge.gasId} src={selectedBadge.gasAssetImage} w={'50px'} h={'50px'}/>
    <Icon as={MdClose} bg={'#fff'} position={'absolute'} borderRadius={'50%'} top={'0'} right={'0'} cursor={'pointer'} onClick={handleClear}/>
  </Box> 
}
</Flex>
{/* brindha start */}
<BadgeImages
  isModalOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  badgeData={badgeData}
  handleBadgeSelection={handleBadgeSelection}
/>
{/* brindha end */}
<Flex align="center">
                              <Text mr={2} fontSize="sm" fontWeight="bold" width="100px">
                              Badge Name: {formData.gameIsSetBadge === "true" && <span style={{ color: 'red' }}>*</span>}
                             
                              </Text>
                              <InputField
                                mb="0px"
                                id="gameBadgeName"   
                                name="gameBadgeName"  
                                disabled={formData?.gameIsSetBadge ==='true' ? false:true}                                                                                                               
                                placeholder="eg. Bronze"
                                w="150px" // Adjust the width as needed
                                value={formData?.gameBadgeName}
                                onChange={handleChange}
                              />
                            </Flex>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="0" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Criteria For Badge
                              </FormLabel>
                              <Switch
                               isChecked={formData.gameIsSetCriteriaForBadge==='true'? true :false}
                               
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsSetCriteriaForBadge"
                                name="gameIsSetCriteriaForBadge"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <Flex align="center">
                              <Text mr={2} fontSize="sm" fontWeight="bold" width="100px">
                              Score Greater Than: {formData.gameIsSetCriteriaForBadge === "true" && <span style={{ color: 'red' }}>*</span>}
                             
                              </Text>
                              <InputField
                                mb="0px"
                                id="gameAwardBadgeScore"   
                                name="gameAwardBadgeScore"
                                disabled={formData?.gameIsSetCriteriaForBadge ==='true' ?false:true}                                                                   
                                placeholder="eg. 200"
                                w="150px" // Adjust the width as needed
                                value={formData?.gameAwardBadgeScore}
                                onChange={handleChange}
                              />
                            </Flex>
                          </SimpleGrid>
                        </Card>
                      </Stack>
                    </SimpleGrid>
                   
                    <SimpleGrid
                      columns={{ base: 1, md: 1 }}
                      gap="20px"
                      mt={'20px'}
                    >
                      <Card>
                      <SimpleGrid
                          columns={{ base: 1, md: 3 }}
                          gap="20px"
                          mt={'10px'}
                        >
                       <Flex direction="column" >
  <Text fontSize={18} fontWeight={700}>
    Screen Title
  </Text>
  <TextField
    mb="0px"   
    placeholder="eg. Modernary"
    width={'50%'}
    id="gameScreenTitle"
    name="gameScreenTitle"
    value={formData?.gameScreenTitle}
    onChange={handleChange}
    // label="Screen Title"
  />
  {/* Additional InputField below Screen Title */}
 
</Flex>
<Flex direction="column" >
                        <Text fontSize={18} fontWeight={700}>
                          Congratulatory Message
                        </Text>
                        <FormControl
                            display="flex"
                            alignItems="center"
                            justifyContent={'space-between'}
                            mt="20px"
                          >
                            <FormLabel htmlFor="email-" mb="0" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                              Single Message
                            </FormLabel>
                            <Switch
                              isChecked={formData.gameIsSetCongratsSingleMessage ==='true'? true:false }
                              color="#fff"
                              colorScheme='brandScheme'
                              size='md'
                              id="gameIsSetCongratsSingleMessage"
                              name="gameIsSetCongratsSingleMessage"
                              onChange={handleChange}
                            />
                          </FormControl>
                          <FormControl
                            display="flex"
                            alignItems="center"
                            justifyContent={'space-between'}
                            mt="20px"
                          >
                            <FormLabel htmlFor="email-" mb="0" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                              Score-Wise Message
                            </FormLabel>
                            <Switch
                              isChecked={formData.gameIsSetCongratsScoreWiseMessage ==='true'? true:false }
                              color="#fff"
                              colorScheme='brandScheme'
                              size='md'
                              id="gameIsSetCongratsScoreWiseMessage"
                              name="gameIsSetCongratsScoreWiseMessage"
                              onChange={handleChange}
                            />
                          </FormControl>
                        </Flex>
                        <TextField
                            mb="10px"
                            me="30px"
                            placeholder="eg. Congratulations! You have completed..."
                            mt="20px"
                            id="gameCompletedCongratsMessage"
                            name="gameCompletedCongratsMessage"
                            value={formData?.gameCompletedCongratsMessage}
                            onChange={handleChange}
                          />
                        <FormControl></FormControl>
                         
                          <FormControl></FormControl>
                         
                          <FormControl></FormControl>
                         
                          
                          <TextField
                            mb="10px"
                            me="30px"
                            label="For less than minimum score:"
                            placeholder="eg. You can do bette..."
                            id="gameMinimumScoreCongratsMessage"
                            name="gameMinimumScoreCongratsMessage"
                            value={formData?.gameMinimumScoreCongratsMessage}
                            onChange={handleChange}
                          />
                          <TextField
                            mb="10px"
                            me="30px"
                            label="For less than distinction score:"
                            placeholder="eg. Good performance! You..."
                            id="gameLessthanDistinctionScoreCongratsMessage"
                            name="gameLessthanDistinctionScoreCongratsMessage"
                            value={formData?.gameLessthanDistinctionScoreCongratsMessage}
                            onChange={handleChange}
                          />
                          <TextField
                            mb="10px"
                            me="30px"
                            label="For above distinction score:"                           
                            placeholder="eg. Fantastic performance! You..."
                            id="gameAboveDistinctionScoreCongratsMessage"
                            name="gameAboveDistinctionScoreCongratsMessage"
                            value={formData?.gameAboveDistinctionScoreCongratsMessage}
                            onChange={handleChange}
                          />
                        </SimpleGrid>
                      </Card>
                    </SimpleGrid>
                    <Flex justify="space-between" mt="24px">
                     
                    </Flex>
                  </Flex>
                </Box>
              </TabPanel>
              <TabPanel w={'100%'} p="0px" mx="auto">
                <Box p="30px">
                  <Text
                    color={textColor}
                    fontSize={'21'}
                    fontWeight="700"
                    mb="20px"
                  >
                    LeaderBoards Screen
                  </Text>
                  <Text
                    color={textColor}
                    fontSize={'14'}
                    fontWeight="700"

                  >
                   This screen encourages learners to improve their score
                  </Text>
                  <Flex direction="column" w="100%">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                      <Stack direction="column" gap="20px">
                        {/* <Card h={'500px'}>

                        </Card> */}
                    <div style={{ position: 'relative' }}>
                      <button onClick={goToPreviousLeaderboardScreen} style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1 }}>
                        <FaChevronCircleLeft style={{ fontSize: '40px' }} />
                      </button>
                      <button onClick={goToNextLeaderboardScreen} style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1 }}>
                        <FaChevronCircleRight style={{ fontSize: '40px' }} />
                      </button>
                      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                        Screen ({currentLeaderboardScreenIndex + 1}/{leaderboardScreens.length})
                      </div>
                      {leaderboardScreens.map((screen, index) => (
                        <div key={screen.id} style={{ display: index === currentLeaderboardScreenIndex ? 'block' : 'none' }}>
                          {/* Your card or image component */}
                          <Card key={screen.id} h={'500px'}>
                        <Flex
                        justifyContent="center"
                        alignItems="center"
                        height="100%" // Ensures the Flex container takes the full height of the Card
                      >
                          <input type='hidden' ref={comScreen} value={screen.id} id={`leaderScreen-${index}`} />
                        <img
                          src={screen.url}
                          alt={`Screen ${screen.id}`}
                          height="400px"
                          width="80%"
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </Flex>
                      </Card>
                        </div>
                      ))}
                    </div>
                
                      </Stack>
                      <Stack direction="column" gap="20px">
                        <Card>
                          <FormControl
                            display="flex"
                            alignItems="center"
                            justifyContent={'space-between'}
                            mt="20px"
                          >
                            <FormLabel htmlFor="email-" mb="0" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                              Show Leaderboard to Learners
                            </FormLabel>
                            <Switch
                             isChecked={formData.gameIsShowLeaderboard==='true'? true :false}
                              
                              color="#fff"
                              colorScheme='brandScheme'
                              size='md'
                              id="gameIsShowLeaderboard"
                              name="gameIsShowLeaderboard"
                              onChange={handleChange}
                            />
                          </FormControl>
                        </Card>
                      </Stack>
                    </SimpleGrid>
                    <Flex justify="space-between" mt="24px">
                     
                    </Flex>
                  </Flex>
                </Box>
              </TabPanel>
              <TabPanel w={'100%'} p="0px" mx="auto">
                <Box p="30px">
                  <Text
                    color={textColor}
                    fontSize={'21'}
                    fontWeight="700"
                    mb="20px"
                  >
                    Reflection Screen
                  </Text>
                  <Flex direction="column" w="100%">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                      <Stack direction="column" gap="20px">
                        {/* <Card h={'500px'}>

                        </Card> */}
      <div style={{ position: 'relative' }}>
        <button onClick={goToPreviousReflectionScreen} style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1 }}>
          <FaChevronCircleLeft style={{ fontSize: '40px' }} />
        </button>
        <button onClick={goToNextReflectionScreen} style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1 }}>
          <FaChevronCircleRight style={{ fontSize: '40px' }} />
        </button>
        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
          Screen ({currentReflectionScreenIndex + 1}/{reflectionScreens.length})
        </div>
        {reflectionScreens.map((screen, index) => (
          <div key={screen.id} style={{ display: index === currentReflectionScreenIndex ? 'block' : 'none' }}>
            {/* Your card or image component */}
            <Card key={screen.id} h={'500px'}>
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        height="100%" // Ensures the Flex container takes the full height of the Card
                      >
                        	  <input type='hidden' ref={comScreen} value={screen.id} id={`reflectionScreen-${index}`} />
                        <img
                          src={screen.url}
                          alt={`Screen ${screen.id}`}
                          height="400px"
                          width="80%"
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </Flex>
                      </Card>
          </div>
        ))}
      </div>
                      </Stack>
                      <Stack direction="column" gap="20px">
                        <Card>
                          <FormControl
                            display="flex"
                            alignItems="center"
                            justifyContent={'space-between'}
                            mt="20px"
                          >
                            <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                              Show Reflection Screen
                            </FormLabel>
                            <Switch
                            isChecked={formData.gameIsShowReflectionScreen==='true'? true :false}
                              
                              color="#fff"
                              colorScheme='brandScheme'
                              size='md'
                              id="gameIsShowReflectionScreen"
                              name="gameIsShowReflectionScreen"
                              onChange={handleChange}
                            />
                          </FormControl>
                          {/* brindha start */}
                          {formData.gameIsShowReflectionScreen === 'true' && (
                            <Select
                            mb="0px"
                            id="Collection"
                            isDisabled={formData?.gameIsShowReflectionScreen === 'true' ? false : true}
                            placeholder="How many questions would you like?"
                            value={formData.gameReflectionQuestion}
                            name="gameReflectionQuestion"
                            onChange={handleArra}
                            isRequired
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </Select>
                            // brindha end
                            // <InputField
                            //   mb="0px"
                            //   id="Collection"
                            //   disabled={formData?.gameIsShowReflectionScreen === 'true' ? false : true}
                            //   type="number"
                            //   placeholder="eg. 10"
                            //   label="How many questions would you like?"
                            //   name = "gameReflectionQuestion"
                            //   onChange={handleArra}
                            //   isRequired
                            // />
                            // brindha start
                          )}
                          {/* brindha end */}
                          <FormControl
                            display="flex"
                            alignItems="center"
                            justifyContent={'space-between'}
                            mt="20px"
                          >
                            <FormLabel htmlFor="email-" mb="0" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                              Make these questions mandatory for the learner
                            </FormLabel>
                            <Switch
                             isChecked={formData.gameIsLearnerMandatoryQuestion==='true'? true :false}
                              disabled={formData?.gameIsShowReflectionScreen === 'true' ? false:true}
                              color="#fff"
                              colorScheme='brandScheme'
                              size='md'
                              id="gameIsLearnerMandatoryQuestion"
                              name="gameIsLearnerMandatoryQuestion"
                              onChange={handleChange}
                              isRequired
                            />
                          </FormControl>
                        </Card>
                        {/* brindha start */}
                        <Card>
                          <Stack gap="20px">
                            {arra &&
                              formData?.gameIsShowReflectionScreen === 'true' &&
                              arra.map((it, i) => (
                                <TextField
                                  key={i}
                                  mb="0px"
                                  id={`reflectionQuestion${i}`}
                                  placeholder={`eg. How can you apply these learnings back at work? (${i + 1})`}
                                  label={`Reflection Question ${i + 1}`}
                                  onChange={(e: any) => handleInputChange(i, e.target.value)}
                                />
                              ))}
                          </Stack>
                        </Card>

                        {/* brindha end */}
                        {/* <SimpleGrid columns={{ base: 1, md: 1 }} mt={'20px'}>
                      {arra && formData?.gameIsShowReflectionScreen ==='true' && (
                        <Card>
                          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                            {arra.map((it, i) => (
                              <Stack key={i} gap="20px">
                                <TextField
                                  key={i}
                                  mb="0px"
                                  id="Collection"
                                  placeholder="eg. How can you apply these learnings back at work?"
                                  label={`Reflection Question ${i + 1}`}
                                  onChange={(e:any) => handleInputChange(i, e.target.value)}
                                />
                              </Stack>
                            ))}
                          </SimpleGrid>
                        </Card>
                      )}
                    </SimpleGrid> */}
                      </Stack>
                      
                    </SimpleGrid>
                    {/* <SimpleGrid columns={{ base: 1, md: 1 }} mt={'20px'}>
                      {arra && formData?.gameIsShowReflectionScreen ==='true' && (
                        <Card>
                          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                            {arra.map((it, i) => (
                              <Stack key={i} gap="20px">
                                <TextField
                                  key={i}
                                  mb="0px"
                                  id="Collection"
                                  placeholder="eg. How can you apply these learnings back at work?"
                                  label={`Reflection Question ${i + 1}`}
                                  onChange={(e:any) => handleInputChange(i, e.target.value)}
                                />
                              </Stack>
                            ))}
                          </SimpleGrid>
                        </Card>
                      )}
                    </SimpleGrid> */}
                    <Flex justify="space-between" mt="24px">
                     
                    </Flex>
                  </Flex>
                </Box>
              </TabPanel>
              <TabPanel w={'100%'} p="0px" mx="auto">
                <Box p="30px">
                  <Text
                    color={textColor}
                    fontSize={'21'}
                    fontWeight="700"
                    mb="20px"
                  >
                    Take Aways Screen
                  </Text>

                  <Flex direction="column" w="100%">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                      <Stack direction="column" gap="20px">
                        {/* <Card h={'500px'}>

                        </Card> */}
                    <div style={{ position: 'relative' }}>
                      <button onClick={goToPreviousTakeawayScreen} style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1 }}>
                        <FaChevronCircleLeft style={{ fontSize: '40px' }} />
                      </button>
                      <button onClick={goToNextTakeawayScreen} style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1 }}>
                        <FaChevronCircleRight style={{ fontSize: '40px' }} />
                      </button>
                      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                        Screen ({currentTakeawayScreenIndex + 1}/{takeawayScreens.length})
                      </div>
                      {takeawayScreens.map((screen, index) => (
                        <div key={screen.id} style={{ display: index === currentTakeawayScreenIndex ? 'block' : 'none' }}>
                          {/* Your card or image component */}
                          <Card key={screen.id} h={'500px'}>
                        <Flex
                        justifyContent="center"
                        alignItems="center"
                        height="100%" // Ensures the Flex container takes the full height of the Card
                      >
                          <input type='hidden' ref={comScreen} value={screen.id} id={`takeawayScreen-${index}`} />
                        <img
                          src={screen.url}
                          alt={`Screen ${screen.id}`}
                          height="400px"
                          width="80%"
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </Flex>
                      </Card>
                        </div>
                      ))}
                    </div>
                        
                      </Stack>
                      <Stack direction="column" gap="20px">
                        <Card>
                          <SimpleGrid columns={{ base: 1, md: 1 }} gap="20px">
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Show TakeAways
                              </FormLabel>
                              <Switch
                               isChecked={formData.gameIsShowTakeaway==='true'? true :false}
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsShowTakeaway"
                                name="gameIsShowTakeaway"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <TextField
                              mb="0px"
                              disabled={formData?.gameIsShowTakeaway === 'true' ? false : true}
                              placeholder="eg. Try to understand what went wrong before reacting"
                              label="TakeAways Content"
                              id="gameTakeawayContent"
                              name="gameTakeawayContent"
                              value={formData?.gameTakeawayContent}
                              onChange={handleChange}
                            />
                          </SimpleGrid>
                        </Card>
                      </Stack>
                    </SimpleGrid>
                    <Flex justify="space-between" mt="24px">
                     
                    </Flex>
                  </Flex>
                </Box>
              </TabPanel>
              <TabPanel w={'100%'} p="0px" mx="auto">
                <Box p="30px">
                  <Text
                    color={textColor}
                    fontSize={'21'}
                    fontWeight="700"
                    mb="20px"
                  >
                    Welcome Screen
                  </Text>
                  <Flex direction="column" w="100%">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                      <Stack direction="column" gap="20px">
                        {/* <Card h={'500px'}>

                        </Card> */}
      <div style={{ position: 'relative' }}>
        <button onClick={goToPreviousWelcomeScreen} style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1 }}>
          <FaChevronCircleLeft style={{ fontSize: '40px' }} />
        </button>
        <button onClick={goToNextWelcomeScreen} style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1 }}>
          <FaChevronCircleRight style={{ fontSize: '40px' }} />
        </button>
        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
          Screen ({currentWelcomeScreenIndex + 1}/{welcomeScreens.length})
        </div>
        {welcomeScreens.map((screen, index) => (
          <div key={screen.id} style={{ display: index === currentWelcomeScreenIndex ? 'block' : 'none' }}>
            {/* Your card or image component */}
            <Card key={screen.id} h={'500px'}>
            <Flex
                        justifyContent="center"
                        alignItems="center"
                        height="100%" // Ensures the Flex container takes the full height of the Card
                      >
                          <input type='hidden' ref={comScreen} value={screen.id} id={`welcomeScreen-${index}`} />
                        <img
                          src={screen.url}
                          alt={`Screen ${screen.id}`}
                          height="400px"
                          width="80%"
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </Flex>
                      </Card>
          </div>
        ))}
      </div>
                      </Stack>
                      <Stack direction="column" gap="20px">
                        <Card>
                          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Skills
                              </FormLabel>
                              <Switch
                              isChecked={formData.gameIsShowSkill==='true'? true :false}
                               
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsShowSkill"
                                name="gameIsShowSkill"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Story Line
                              </FormLabel>
                              <Switch
                               isChecked={formData.gameIsShowStoryline==='true'? true :false}
                              
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsShowStoryline"
                                name="gameIsShowStoryline"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Learning Outcome
                              </FormLabel>
                              <Switch
                              isChecked={formData.gameIsShowLearningOutcome==='true'? true :false}
                              
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsShowLearningOutcome"
                                name="gameIsShowLearningOutcome"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Game Duration
                              </FormLabel>
                              <Switch
                              isChecked={formData.gameIsShowGameDuration==='true'? true :false}
                               color="#fff"
                               colorScheme='brandScheme'
                               size='md'
                                id="gameIsShowGameDuration"
                                name="gameIsShowGameDuration"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Author Name
                              </FormLabel>
                              <Switch
                                isChecked={formData.gameIsShowAuhorName==='true'? true :false}
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsShowAuhorName"
                                name="gameIsShowAuhorName"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                               <Text> Additional Welcome Note </Text>
                              </FormLabel>
                              <Switch
                                isChecked={formData.gameIsShowAdditionalWelcomeNote==='true'? true :false}
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsShowAdditionalWelcomeNote"
                                name="gameIsShowAdditionalWelcomeNote"
                                onChange={handleChange}
                                // isRequired
                              />
                            </FormControl>
                          </SimpleGrid>
                          <SimpleGrid
                            columns={{ base: 1, md: 1 }}
                            gap="20px"
                            mt={'20px'}
                          >
                            {/* <Text>Additional WelcomeZ Note {formData?.gameIsShowAdditionalWelcomeNote === 'true' && <span style={{ color: 'red' }}>*</span>}</Text> */}
                            <TextField
                              disabled={formData?.gameIsShowAdditionalWelcomeNote === 'true' ? false : true}
                              mb="0px"
                              id="Collection"
                              name='gameAdditionalWelcomeNote'
                              placeholder="eg. Try to understand what went wrong before reacting"
                              label="Additional Welcome Note :
                              An additional Note can be used to set the context or share reference material after the Welcome Screen. "
                              onChange={handleChange}
                              isRequired = {true}
                              value={formData.gameAdditionalWelcomeNote}
                            />
                            
                          </SimpleGrid>
                        </Card>
                      </Stack>
                    </SimpleGrid>
                    <Flex justify="space-between" mt="24px">
                     
                    </Flex>
                  </Flex>
                </Box>
              </TabPanel>
              <TabPanel w={'100%'} p="0px" mx="auto">
                <Box p="30px">
                  <Text
                    color={textColor}
                    fontSize={'21'}
                    fontWeight="700"
                    mb="20px"
                  >
                    ThankYou Screen
                  </Text>
                  <Flex direction="column" w="100%">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                      <Stack direction="column" gap="20px">
                        {/* <Card h={'500px'}>

                        </Card> */}
                    <div style={{ position: 'relative' }}>
                      <button onClick={goToPreviousThankyouScreen} style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1 }}>
                        <FaChevronCircleLeft style={{ fontSize: '40px' }} />
                      </button>
                      <button onClick={goToNextThankyouScreen} style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1 }}>
                        <FaChevronCircleRight style={{ fontSize: '40px' }} />
                      </button>
                      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                        Screen ({currentThankyouScreenIndex + 1}/{thankyouScreens.length})
                      </div>
                      {thankyouScreens.map((screen, index) => (
                        <div key={screen.id} style={{ display: index === currentThankyouScreenIndex ? 'block' : 'none' }}>
                          {/* Your card or image component */}
                          <Card key={screen.id} h={'500px'}>
                        <Flex
                        justifyContent="center"
                        alignItems="center"
                        height="100%" // Ensures the Flex container takes the full height of the Card
                      >
                        	  <input type='hidden' ref={comScreen} value={screen.id} id={`thankyouScreen-${index}`} />
                        <img
                          src={screen.url}
                          alt={`Screen ${screen.id}`}
                          height="400px"
                          width="80%"
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </Flex>
                      </Card>
                        </div>
                      ))}
                    </div>
                      </Stack>
                      <Stack direction="column" gap="20px">
                        <Card>
                          <SimpleGrid columns={{ base: 1, md: 1 }} gap="20px">
                            <TextField
                              mb="0px"
                              onChange={handleChange}
                              name='gameThankYouMessage'
                              id="Collection"
                              placeholder="eg. Thank You For Playing"
                              label="Thank You Message"
                              value={formData.gameThankYouMessage}
                            />
                          </SimpleGrid>
                          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Collect Learner Feedback
                              </FormLabel>
                              <Switch
                               isChecked={formData.gameIsCollectLearnerFeedback==='true'? true :false}
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsCollectLearnerFeedback"
                                name="gameIsCollectLearnerFeedback"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Question 1
                              </FormLabel>
                              <Switch
                              isChecked={formData.gameReplayAllowed==='true'? true :false}
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameReplayAllowed"
                                name="gameReplayAllowed"
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl
                              display="flex"
                              alignItems="center"
                              justifyContent={'space-between'}
                              mt="20px"
                            >
                              <FormLabel htmlFor="email-" mb="10px" fontSize='sm' fontWeight='bold' color={textColorPrimary}>
                                Make Feedback Mandatory
                              </FormLabel>
                              <Switch
                              isChecked={formData.gameIsFeedbackMandatory==='true'? true :false}
                                color="#fff"
                                colorScheme='brandScheme'
                                size='md'
                                id="gameIsFeedbackMandatory"
                                name="gameIsFeedbackMandatory"
                                onChange={handleChange}
                              />
                            </FormControl>
                          </SimpleGrid>
                        </Card>
                      </Stack>
                    </SimpleGrid>

                    <Flex justify="space-between" mt="24px">
                      <Button
                        variant="light"
                        fontSize="sm"
                        borderRadius="16px"
                        w={{ base: '128px', md: '148px' }}
                        h="46px"
                        onClick={() => welcomeTab.current.click()}
                      >
                        Prev
                      </Button>
                      <Button
                       bg="#3311db"
                       _hover={{ bg: '#3311db' }}
                       color="#fff"
                       w="80px"

                        
                        onClick={onOpen}
                      >
                        Submit
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* <Box display={{base: 'block', md: 'flex', lg: 'flex'}}>
            <Card width={{sm: '100%', md:'80%', xl:'80%'}} mb={{base: '20px', xl: '20px'}} mr={{base: '0px', md: '20px', xl: '20px'}} boxShadow={'1px 3px 30px #8080801d'}>
                <Text fontSize={22} fontWeight={800} mb={'20px'}>
                  Score
                </Text>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} spacing={5} mb={{base: '10px', xl: '10px'}}>              
                    <InputField
                        mb="0px"
                        me="30px"
                        id="gameMinScore"
                        label="MinScore"
                        placeholder="eg. 10"
                        name="gameMinScore"                
                        isRequired
                        value={formData?.gameMinScore}
                        onChange={handleChange}                
                    />                            
                    <InputField
                        mb="0px"
                        me="30px"
                        id="gameMaxScore"
                        label="MaxScore"
                        placeholder="eg. 200"
                        name="gameMaxScore"
                        value={formData?.gameMaxScore}
                        onChange={handleChange}                
                    />                                                                   
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} spacing={1}>                                            
                  <InputField
                      mb="0px"
                      me="30px"                
                      id="gameTotalScore"
                      label="TotalScore"
                      placeholder="eg. 1000"
                      name="gameTotalScore"
                      value={formData?.gameTotalScore}
                      onChange={handleChange}                
                  />                             
                </SimpleGrid>
            </Card>
            <Card width={{sm: '100%', md:'20%', xl:'20%'}} mb={{base: '20px', xl: '20px'}} boxShadow={'1px 3px 30px #8080801d'}>
                <Text fontSize={22} fontWeight={500} mb={'20px'}>
                  Course Type
                </Text>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} spacing={5} mb={{base: '10px', xl: '10px'}}>              
                  <FormControl>
                    <FormLabel htmlFor="alerts">Course Type</FormLabel>
                    <RadioGroup                 
                      id="alerts"
                    >
                      <Stack direction={{base: "column", xl: 'row'}} spacing={5}>
                        {options.map((option) => (
                          <Radio key={option} value={option} colorScheme="green" name="gameCourseType" onChange={handleChange}>
                            {option}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </SimpleGrid>            
            </Card>
          </Box>
          <Box display={{base: 'block', md:'block', xl: 'flex'}}>                     
            <Card width={{sm: '100%', md:'100%', xl:'100%'}} mb={{base: '20px', xl: '20px'}} boxShadow={'1px 3px 30px #8080801d'}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={'30px'}>
                  <Text fontSize={22} fontWeight={500}>
                    Reflection
                  </Text>
                  <Button
                      bg="#3311db"
                      color="#fff"
                      boxShadow="5px 5px 20px grey"                
                      mr="10px"                  
                      onClick={addReflection}
                    >
                      Add Reflection
                  </Button>
                </Box>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 3 }} spacing={5} mb={{base: '10px', xl: '10px'}}>              
                  {reflection.map((value, index) => (                
                      <Box >
                        <TextField
                          mb="10px"
                          me="30px"
                          id="learningOutcome"                      
                          label={`Reflection Question ${index + 1}`}
                          placeholder="eg. Oliver"                      
                          value={value}                    
                        />                    
                      </Box>                
                  ))}
                </SimpleGrid>            
            </Card>                            
          </Box>  
          <Box display={{base: 'block', md:'block', xl: 'flex'}}>
            <Card width={{sm: '100%', md:'100%', xl:'50%'}} mb={{base: '20px', xl: '20px'}} mr={{base: '0px', md: '20px', xl: '20px'}} boxShadow={'1px 3px 30px #8080801d'}>
                <Text fontSize={22} fontWeight={500} mb={'20px'}>
                  Choose Image
                </Text>
                <SimpleGrid columns={{ base: 3, md: 3, xl: 3 }} spacing={5} mb={{base: '10px', xl: '10px'}}>                                
                    {img &&
                        img.map((img, i) => (
                            <Img
                            key={i}
                              src={img?.gasAssetImage}
                              onClick={() => handleSetBackground(img?.gasId)}
                              w="150px"
                              h="100px"
                              boxShadow={
                                backgroundIndex === i ? '5px 5px 20px grey' : ''
                              }
                              transform={backgroundIndex === i ?'scale(1.10)':''}
                              transition={'0.3s'}
                              borderRadius="8px"                        
                              cursor="pointer"
                            />
                        ))}                    
                </SimpleGrid>            
            </Card>

            <Box display={{base: 'block', md:'flex', xl: 'flex'}} width={{base: '100%', md: '100%', xl: '100%'}}>
              <Card width={{sm: '100%', md:'50%', xl:'50%'}} mb={{base: '20px', xl: '20px'}} mr={{base: '0px', md: '20px', xl: '20px'}} boxShadow={'1px 3px 30px #8080801d'}>
                      <Text fontSize={22} fontWeight={500} mb={'20px'}>
                        Game Audio / Upload
                      </Text>                          
                      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} spacing={5} mb={{base: '10px', xl: '10px'}}>                                                                
                          <SelectField
                            mb="10px"
                            me="30px"
                            id="gameIntroMusic"
                            name="gameIntroMusic"
                            label="Game Intro Music"
                            options={musicOptions}
                            value={
                              musicOptions.find(
                                (option) => option.value === formData?.gameIntroMusic,
                              ) || null
                            }
                            onChange={updateHandleIntroMusic}
                          />    
                          <Box mt={'15px'} display={{base: 'flex', xl: 'flex'}} width={'100%'}>
                            <audio src={'audio'} controls />
                          </Box>                                                           
                      </SimpleGrid> 
                      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} spacing={5}>
                        <input type='file' style={{display:'none', padding: '20px', border: '2px dashed #3311db'}}  ref={inputRef}  onChange={handleFileChange}/>  
                      </SimpleGrid>           
              </Card>
              <Card width={{sm: '100%', md:'50%', xl:'50%'}} mb={{base: '20px', xl: '20px'}} boxShadow={'1px 3px 30px #8080801d'}>
                  <Text fontSize={22} fontWeight={500} mb={'20px'}>
                    Switch On / Off
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} spacing={5} mb={{base: '10px', xl: '10px'}}>              
                    <FormControl display="flex" alignItems="center" justifyContent={'space-between'} mt="25px">
                        <FormLabel htmlFor="email-" mb="0">
                          Replay
                        </FormLabel>
                        <Switch colorScheme="purple" id="gameReplayAllowed" name="gameReplayAllowed" onChange={handleChange}/>
                    </FormControl>  
                    <FormControl display="flex" alignItems="center" justifyContent={'space-between'} mt="25px">
                      <FormLabel htmlFor="email-alerts" mb="0">
                        LeaderBoard
                      </FormLabel>
                      <Switch colorScheme="purple" id="gameLeaderboardAllowed" name="gameLeaderboardAllowed" onChange={handleChange}/>
                    </FormControl>   
                    <FormControl display="flex" alignItems="center" justifyContent={'space-between'} mt="25px">
                      <FormLabel htmlFor="email-alerts" mb="0">
                      Allowed Reflection
                      </FormLabel>
                      <Switch colorScheme="purple" id="gameReflectionpageAllowed" name="gameReflectionpageAllowed" onChange={handleChange} />
                    </FormControl>   
                    <FormControl display="flex" alignItems="center" justifyContent={'space-between'} mt="25px">
                      <FormLabel htmlFor="-alerts" mb="0">
                        FeedBack
                      </FormLabel>
                      <Switch colorScheme="purple" id="gameFeedbackQuestion" name="gameFeedbackQuestion" onChange={handleChange}/>
                    </FormControl>   
                    <FormControl display="flex" alignItems="center" justifyContent={'space-between'} mt="35px">
                      <FormLabel htmlFor="alerts" mb="0">
                        Shuffle
                      </FormLabel>
                      <Switch colorScheme="purple" size='lg' id="gameShuffle" name="gameShuffle" onChange={handleChange} />
                    </FormControl>                                                                                    
                  </SimpleGrid>            
              </Card> 
            </Box>
          </Box>     */}
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>Add Another Question</AlertDialogHeader>
              
              <AlertDialogBody>
                Would you like to add another question to this game?
              </AlertDialogBody>
              <AlertDialogFooter display={'flex'} justifyContent={'center'}>
                <Box w={'70%'} display={'flex'} justifyContent={'space-between'}>
                  <Button
                    p={'0px 30px'}
                    ref={cancelRef}
                    bg="#3311db"
                  _hover={{ bg: '#3311db' }}
                  color="#fff"
                  w="80px"
                    onClick={handleAdd}
                  >
                    Yes
                  </Button>
                  <Button
                    p={'0px 30px'}
                    bg="#3311db"
                    _hover={{ bg: '#3311db' }}
                    color="#fff"
                    w="80px"
                    onClick={() => {
                      onClose(); // Close the modal
                    setTab(6)
                      
                    }}
                    ml={3}
                  >
                    No
                  </Button>
                </Box>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {openQuest ? (
            <Box className="popup">
              <Flex
                _before={{
                  content: '""',
                  background: '#1b1b1c4a',
                  height: '100%',
                  width: '100%',
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  right: '0',
                }}
              >
                <Card
                  position="fixed"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  background="#fff"
                  marginLeft={'90px'}
                  width="500px"
                  display="flex"
                  alignItems="center"
                  boxShadow="1px 2px 17px #42414556"
                  p="20px"
                >
                  <Box w="100%" justifyContent={'center'}>
                    <Text
                      color={textColor}
                      fontSize="2xl"
                      fontWeight="700"
                      mb="20px"
                    >
                      Add Another Quest
                    </Text>
                    <Text color={textColor}>
                      How would you like to create another quest?
                    </Text>
                    <RadioGroup onChange={setValue} value={value} mt={'10px'}>
                      <Stack direction="column" spacing={5}>
                        <Radio value="1">
                          Duplicate existing question entirely
                        </Radio>
                        <Radio value="2">
                          Duplicate existing quest without story
                          <Text fontStyle={'italic'}>
                            {'(Same backgrounds, characters, overview)'}
                          </Text>
                        </Radio>
                        <Radio value="3">Create a new quest from scratch</Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                  <Flex justify="end" w="100%" marginTop="15px" p="0 15px">
                    <Button
                      color={'#fff'}
                      bg={'#11047a'}
                      _hover={{ color: '#fff', bg: '#11047a' }}
                      mr={'10px'}
                      onClick={() => {
                        setOpenQuest(false); // Close the quest
                        setTab(6)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color={'#fff'}
                      bg={'#11047a'}
                      _hover={{ color: '#fff', bg: '#11047a' }}
                      onClick={handleCopy}
                    >
                      Add Question?
                    </Button>
                  </Flex>
                </Card>
              </Flex>
            </Box>
          ) : null}
        </Box>
      </>
    );
  };
export default AddScores;
