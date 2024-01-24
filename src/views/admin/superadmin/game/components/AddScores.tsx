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
  // brindha start
  
  Textarea,
  Link,
  Slider,
  Image,
  IconButton
  // brindha end
} from '@chakra-ui/react';
import Select from 'react-select';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import React, { useEffect, useRef, useState } from 'react';
import Card from 'components/card/Card';
import SelectField from 'components/fields/SelectField';
// brindha start 
// included updategame
import { gameDuplicateQuestionEntirely, getImages, updateGame } from 'utils/game/gameService';
// brindha end
import Dropzone from 'views/admin/main/ecommerce/settingsProduct/components/Dropzone';
import { MdClose, MdOutlineCloudUpload } from 'react-icons/md';

import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";



import Screen1 from "../../../../../assets/img/screens/screen1.png";
import Screen2 from "../../../../../assets/img/screens/screen2.png";
import Screen3 from "../../../../../assets/img/screens/screen3.png";
import Screen4 from "../../../../../assets/img/screens/screen4.png";
import Screen5 from "../../../../../assets/img/screens/screen5.png";
import Screen6 from "../../../../../assets/img/screens/screen6.png";
// brindha start

import { useNavigate, useParams } from 'react-router-dom';

import rew from '../../../../../assets/img/screens/Reward Bar.png';
import skill from '../../../../../assets/img/screens/skill.png';
import point from '../../../../../assets/img/screens/points.png';
import back from '../../../../../assets/img/screens/back.png';
import frag from '../../../../../assets/img/screens/frag.png';
import bar from '../../../../../assets/img/screens/Bar.png';
import fill from '../../../../../assets/img/screens/Fill.png';
import next from '../../../../../assets/img/screens/next.png';
import chapcomp from '../../../../../assets/img/screens/Chapter Complete Background.png';
import RefScreen1 from "../../../../../assets/img/screens/refscreen1.png";

import RefScreen2 from "../../../../../assets/img/screens/refquestions.png";
import upback from "../../../../../assets/img/screens/upback.png";
//new
import CompletionScreenRight from './screeenforms/CompletionScreenRight';
import ReflectionScreen from './screeenforms/ReflectionScreen';
import TakewayScreen from './screeenforms/TakewayScreen';
import WelcomeScreen from './screeenforms/WelcomeScreen';
import ThankyouScreen from './screeenforms/ThankyouScreen';

import CompletionContentScreen from './onimage/CompletionScreen';
import ReflectionContentScreen from './onimage/ReflectionScreen';
import TakeAwaysContentScreen from './onimage/TakeAwaysScreen';
import TyContentScreen        from './onimage/TyContentScreen';
// import WelcomeContentScreen   from './onimage/WelcomeScreen';
import WelcomeContentScreen from './onimage/WelcomeContentScreen';


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
  setReflection: any;
  reflection: any;
  setBadge: any;
  setTab: any
  defaultskills: any,
  isOpen: any;
  onOpen: any;
  onClose: any;
  showBadge: any;
  setShowBadge: any;
  setShowFunction: any;
  showFunction: any;
  reflectionQuestions: any;
  reflectionQuestionsdefault:any;
  setReflectionQuestions: any;
  handleReflectionInput: any;
  handlesaveReflection: any;
  currentTab:any;
  setCurrentTab:any;
  openQuest:any;
  setOpenQuest:any;
  serias?:any;
  handleGet?:any;
  fetchBlocks?:any;
  setQuestTabState?:any;
  listQuest?:any;
  Completion?:any;
  compliData?:any;
  setCompliData?:any;
  CompKeyCount?:any;
  setCompKeyCount?:any;
  handleCompletionScreen?:any;
  handlecompletion?:any;
}> = ({
  setShowFunction,
  setShowBadge,
  showBadge,
  handleChange,
  defaultskills,
  formData,
  reflection,
  setBadge,
  setReflection,
  inputRef,
  updateHandleIntroMusic,
  setFormData, setTab,
  // brindha start
  isOpen, onOpen, onClose,
  // brindha end
  
  showFunction, reflectionQuestions
  ,reflectionQuestionsdefault,
  setReflectionQuestions,
  handleReflectionInput,
  handlesaveReflection,
  currentTab,
  setCurrentTab,
  openQuest, 
   setOpenQuest,
   serias,
   handleGet,
  fetchBlocks, 
  setQuestTabState,
  listQuest,
  Completion,
  compliData,
  setCompliData,
  CompKeyCount,
  setCompKeyCount,
  handleCompletionScreen,
  handlecompletion,
}) => {
    /**********navin */
    // brindha start
    // const { isOpen, onOpen, onClose } = useDisclosure();
    
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [showBadge, setShowBadge] = useState<string | null>(null);
    // const [showBadge,setShowBadge] = useState(null);
    // brindha end
    const [showSecondContent, setShowSecondContent] = useState(false);
    const[isQuestDrop,setQuestDrop]=useState([]);
    const[getQuest,setQuest]=useState();
    const [showQuest,setShowQuest]=useState(false)
    const customStyles = {
      menuPortal: (base: any) => ({ ...base, zIndex: 9999, }), control: (provided: any, state: any) => ({
          ...provided,
          borderRadius: '15px',
          borderColor: 'inherit',
          background: 'transparent',
          // height: '45px',
          width: '130px',
          padding: '0 !important',
      }),
  }
   
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [value, setValue] = React.useState('');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const [activeBullets, setActiveBullets] = useState({
      product: true,
      media: false,
      pricing: false,
    });
    
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
    const comScreen = React.useRef(null) as React.MutableRefObject<HTMLInputElement>;
    const theme = useTheme();
    //eslint-disable-next-line
    const [lineColor, setLineColor] = useState(theme.colors.brand[500]);
    //eslint-disable-next-line
    const [lineColorDark, setLineColorDark] = useState(theme.colors.brand[400]);
    const brand = useColorModeValue(lineColor, lineColorDark);
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
    const [backgroundIndex, setBackgroundIndex] = useState<number>();
    const options = ['Private', 'Public'];

    

    /////////////////////
    useEffect(() => {

      const selectQuestoptions = listQuest?.map((item: any) => ({
        value: item.gameQuestNo,
        label: `Quest${item.gameQuestNo}`,
      }));
      setQuestDrop(selectQuestoptions)
    }, [listQuest]) 

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
      { id: 1, url: RefScreen1 },
      { id: 2, url: RefScreen2 },
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

   
    const handleSetBackground = (i: any) => {
      setBackgroundIndex(i);
      setFormData((prev: any) => ({
        ...prev,
        gameReflectionpageBackground: i,
      }));
    };

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
    const handleBadge = (e: any) => {
      console.log('welcome');
      e.preventDefault();
      let selectedFile;
      if (e.target.files) {
        selectedFile = e.target.files[0];
      }
      else if (e.dataTransfer && e.dataTransfer.files) {
        selectedFile = e.dataTransfer.files[0];
      }
      console.log('selectedFile', selectedFile);
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
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
    
    // brindha end
    // const handleInputChange = (index: number, value: any) => {
    //   const updatedRows = [...arra];
    //   updatedRows[index].value = value;
    //   setReflection(updatedRows);
    // };
   

   

   
    ////////////////////////////////////////////////////////

    ///Afrith-Modified-26-Dec-23

  

    const [textRef1, setTextRef1] = React.useState('');
    const [textRef2, setTextRef2] = React.useState('');
    const [textRef3, setTextRef3] = React.useState('');
    const [textRef4, setTextRef4] = React.useState('');


    const handleTextRefChange = (i: any, value: any) => {
      setFormData((prev: any) => ({
        ...prev,
        [`gameRefQuestion${i + 1}`]: value // Dynamically set the key based on the index (i)
      }));
      const updatedReflection = [...reflection];
      updatedReflection[i] = value;
      setReflection(updatedReflection);
      switch (i) {
        case 0:
          setTextRef1(value);
          break;
        case 1:
          setTextRef2(value);
          break;
        case 2:
          setTextRef3(value);
          break;
        case 3:
          setTextRef4(value);
          break;
        default:
          break;
      }
    };


    // afrith
    const [currentCompletionScreenIndex, setCurrentCompletionScreenIndex] = useState(0);
    const [currentLeaderboardScreenIndex, setCurrentLeaderboardScreenIndex] = useState(1);
    const [currentReflectionScreenIndex, setCurrentReflectionScreenIndex] = useState(2);
    const [currentTakeawayScreenIndex, setCurrentTakeawayScreenIndex] = useState(3);
    const [currentWelcomeScreenIndex, setCurrentWelcomeScreenIndex] = useState(4);
    const [currentThankyouScreenIndex, setCurrentThankyouScreenIndex] = useState(5);

  


    const toast = useToast();

    const navigate = useNavigate();
    // welcome
   

   


    // thank you
   
  

    const detectLinks = (text: any) => {
      // Regular expression to detect links in the text
      const linkRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi;
      const links = text.match(linkRegex) || [];
      return links;
    };

    const { id } = useParams();
    useEffect(() => {
      setFormData((prev: any) => ({
        ...prev,
        gameCompletionScreenId: 1,
        gameLeaderboardScreenId: 2,
        gameReflectionScreenId: 3,
        gameTakeawayScreenId: 4,
        gameWelcomepageBackgroundScreenId: 5,
        gameThankYouScreenId: 6,
      }));


    }, []);
    const [img, setImg] = useState<any[]>([]);
    const fetchData = async () => {
      const result = await getImages(6);
      if (result?.status !== 'Success')
        return alert('getbackruond error:' + result?.message);
      setImg(result?.data);
    };

    // rajesh changes

    const handleCopy = async () => {
      if (!value) {
        toast({
          title: 'Please select option',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
        return false;
      }
      if(value==='Entire' && !getQuest && isQuestDrop.length>1){
        toast({
          title: 'Please select  Quest ',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
        return false;
      }
      let crump = {
        key: value,
        questNo:getQuest ? getQuest : 1,
      }
      let data = JSON.stringify(crump);
      const result = await gameDuplicateQuestionEntirely(id, data);
      if (result && result?.status === 'Success') {
        toast({
          title: 'Quest Added',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
        setOpenQuest(false);
        setTab(4);
        setQuestTabState(result.data.gameQuestNo)
        handleGet(result.data.gameQuestNo)
  fetchBlocks()
  handleCompletionScreen(1)
  setCurrentTab(0);
        // navigate(`/admin/superadmin/game/creation/${result.data.gameId}`);
      }else {

       
        toast({
          title: 'Quest Not Created',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
    }


    
    // new navin
    



    const handleNext = () => {

      if(currentTab === 0){
        if(!compliData[CompKeyCount]?.gameTotalScore[0]?.maxScore){
          toast({
            title: 'Please Enter Total Score.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return false
        }
        if(compliData[CompKeyCount]?.gameIsSetMinPassScore === 'true'){
          if(!compliData[CompKeyCount]?.gameMinScore){
            toast({
              title: 'Please Enter Minium Score.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false
      
          }
        }
        if(compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'true'){
          if(!compliData[CompKeyCount]?.gameDistinctionScore){
            toast({
              title: 'Please Enter Distinction  Score.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false
      
          }
      
        }
        if(compliData[CompKeyCount]?.gameIsSetBadge === 'true'){
      if(!compliData[CompKeyCount]?.gameBadge){
        toast({
          title: 'Please Select Badge.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false
      
      }
      if(!compliData[CompKeyCount]?.gameBadgeName){
        toast({
          title: 'Please Fill Badge Name.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false
      
      }
      if(compliData[CompKeyCount]?.gameIsSetCriteriaForBadge === 'true'){
        if(!compliData[CompKeyCount]?.gameAwardBadgeScore){
          toast({
            title: 'Please Set Criteria for Badge .',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return false
        }
      
      }
      if(!compliData[CompKeyCount]?.gameScreenTitle){
        toast({
          title: 'Please Screen Title.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false
      }
      if(compliData[CompKeyCount]?.gameIsSetCongratsSingleMessage === 'true'){
        if(!compliData[CompKeyCount]?.gameCompletedCongratsMessage){
      
          toast({
            title: 'Please Set CongratsMessage.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return false
      
        }
      }
      if(compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage=== 'true'){
      
        if(compliData[CompKeyCount]?.gameIsSetMinPassScore === 'true'){
          if(!compliData[CompKeyCount]?.gameMinimumScoreCongratsMessage){
            toast({
              title: 'Please Enter Minium Score Congrats Message.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false
      
          }
          if(!formData?.gameaboveMinimumScoreCongratsMessage){
            toast({
              title: 'Please Enter Above Minimum Score CongratsMessage.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false
      
          }
        }
        if(compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'true'){
          if(!compliData[CompKeyCount]?.gameLessthanDistinctionScoreCongratsMessage){
            toast({
              title: 'Please Enter Distinction  Score.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false
      
          }
          if(!compliData[CompKeyCount]?.gameAboveDistinctionScoreCongratsMessage){
            toast({
              title: 'Please Enter Above Distinction Score CongratsMessage.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false
      
          }
          
        }
      
      
      }
        } 
if(Object.keys(Completion).length-1 !==CompKeyCount){
  
  // setCompliData(Completion[CompKeyCount+1]);
  console.log('compliDatas',Completion[CompKeyCount+1],Completion,'CompKeyCount',CompKeyCount);
  setCompKeyCount(CompKeyCount+1)
  return false

}

       
      
      }
      
      if(currentTab === 2){
           
      if(formData.gameIsShowReflectionScreen === 'true')
      { 
        console.log("form length"+ formData.gameReflectionQuestion);
      
        if (typeof reflectionQuestions === 'object' && reflectionQuestions !== null) {
         
          var keys = Object.keys(reflectionQuestions);
          
          // Assuming formData.gameReflectionQuestion is the number of questions to check
          for (var i = 0; i < formData.gameReflectionQuestion; i++) {
            var key = keys[i];
            var value = reflectionQuestions[key];
            if(key == 'ref1') {
                var question = "Question1";
            }
            if(key == 'ref2'){
              var question = "Question2";
            }
            if(key == 'ref3'){
              var question = "Question3";
            }
            if(key == 'ref4'){
              var question = "Question4";
            }
             
             
            if (!value) {
              toast({
                title: `${question} is empty. Please fill in the ${question} question.`,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            
              return false;
            }
          }
         
        }
      }
        
      }
      if(currentTab === 3){
        if (formData.gameIsShowTakeaway === "true" && (formData.gameTakeawayContent === null || formData.gameTakeawayContent === undefined || formData.gameTakeawayContent === '')) {
          toast({
            title: 'Please Enter TakeAway Content',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      
          return false;
        }
      }
      if(currentTab === 4){
        if (formData.gameIsShowAdditionalWelcomeNote === "true" && (formData.gameAdditionalWelcomeNote === null || formData.gameAdditionalWelcomeNote === undefined || formData.gameAdditionalWelcomeNote === '')) {
          toast({
            title: 'Please Add Welcome Note',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      
          return false;
        }
      }
      if(currentTab === 5) {
        if (formData.gameIsFeedbackMandatory === "true"){
          if(formData.gameQuestion1 === 'true' && formData.gameQuestionValue1 === '') {
            toast({
              title: 'Please Enter Question 1',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            return false;
          } else if(formData.gameQuestion2 === 'true' && formData.gameQuestionValue2 === '') {
            toast({
              title: 'Please Enter Question 2',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            return false;
          } else if (formData.gameQuestionValue3 === '' || formData.gameQuestionValue4 === '') {
            toast({
              title: 'Please Enter Rating Questions',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;
          }
        }    
      }
      
      
      
             setCurrentTab((prevTab:any) => Math.min(prevTab + 1, 5)); // Limit tabs to 6 (0 to 5)
          };
          console.log('compliDatas',compliData,Completion,'CompKeyCount',CompKeyCount);
    const handleBack = () => {

if(currentTab===0 ){
 
  if(CompKeyCount!==0){
   
    setCompKeyCount(CompKeyCount-1)
    // setCompliData(Completion[CompKeyCount-1]);
    
  }
  else{
    // setCompliData(Completion[0]);
    setCurrentTab((prevTab:any) => Math.max(prevTab - 1, 0)); // Prevent going below 0
}
  
}else{
  setCurrentTab((prevTab:any) => Math.max(prevTab - 1, 0)); // Prevent going below 0
}

     
    };
    const ScreenTitle = ['Completion Screen', 'LeaderBoards Screen', 'Reflection Screen', 'Take Aways Screen', 'Welcome Screen', 'ThankYou Screen'];
    const ScreenMainImages = [Screen1, Screen2, RefScreen1, Screen4, Screen5, Screen6];
    const ScreenSubTitle = ['This screen shows in-game score and will appear at the end of the quest', 'This screen encourages learners to improve their score', 'This screen encourages learners to reflect on their learnings', 'This screen helps summarise the learnings at the end of the quest', 'This is the first screen that the learner will see after entering the game', 'This is the last screen that the learners will see at the end of the game'];
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
 const handleKeyPress = (e:any) => {
            const charCode = e.which ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
              e.preventDefault();
            }
        };
        const maxCharacters = 15;
        const maxCharacters2 = 80;
  const handledropquest = (name:any) => {
    if(name==='Entire'){
      if(isQuestDrop.length>1){
        setShowQuest(true);
      }
      
    }else{ 
      setShowQuest(false);
    }
    
    
};
const handleQuestNo = (selectedOption: any) => {
 
  if (selectedOption) {
    setQuest(selectedOption.value);
  }
};
  


        return (
          <>
             <Box className='AddScores'>
              <Box  className='Heading'               
                p={4}
              >
                <Text color="black" fontSize={'18'} fontWeight="700" mb="0px">
                  {ScreenTitle[currentTab]} 
                  {currentTab==0 &&(
                         `- Quest${CompKeyCount+1}`
                  )}
                
                </Text>
                <Text color="black" fontSize={'14'} fontWeight="700" mb={'10px'}>
                  {ScreenSubTitle[currentTab]}
                </Text>
              </Box>
              <Flex className='Main-Content' mb={'15px'} flexDirection={{ base: 'column', md: currentTab === 0 ? 'row':'column',lg:'row', }} alignItems="start">
                <Box className='Game-Screen'>
                   <Text
                  color="black"
                  fontSize="14"
                  fontWeight="700"
                  mb="10px"
                  textAlign="center"
                >
                Screen({
  Object.keys(Completion).length-1 !== CompKeyCount
    ? CompKeyCount + 1
    : CompKeyCount + currentTab+1
}/{Object.keys(Completion).length + 5})

                  </Text>
                  <Box className='Images'>
                    {/* <Img
                      src={ScreenMainImages[currentTab]}
                      alt="Your Image"
                      width="100%"
                      height="100%"
                      objectFit="cover" // Maintain aspect ratio and cover the container
                      /> */}
      
                    {currentTab === 0 && (
                      <CompletionContentScreen      
                        selectedBadge={selectedBadge}
                        formData={formData}
                        imageSrc={ScreenMainImages[currentTab]}
                        compliData={compliData}
                        setCompliData={setCompliData}
                        CompKeyCount={CompKeyCount}
                      />
                    )}
                  {currentTab === 1 && (
                      <Box className='LearderBoards'>
                        <Img
                          src={ScreenMainImages[currentTab]}
                          alt="Your Image"
                          className='LearderBoards-Img'                          
                          // Maintain aspect ratio and cover the container
                        /> 
                    </Box>
                    )}
                    {currentTab === 2 && (
                      <ReflectionContentScreen formData={formData}  imageSrc={ScreenMainImages[currentTab]} reflectionQuestions={reflectionQuestions} reflectionQuestionsdefault={reflectionQuestionsdefault}/>
                    )}
                    {currentTab === 3 && (
                      <TakeAwaysContentScreen formData={formData} imageSrc={ScreenMainImages[currentTab]}/>
                    )}
                    {currentTab === 4 && (
                      <WelcomeContentScreen formData={formData} imageSrc={ScreenMainImages[currentTab]} />
                    )}
                    {currentTab === 5 && <TyContentScreen formData={formData} imageSrc={ScreenMainImages[currentTab]}/>}
                    {
  (currentTab !== 0 || CompKeyCount !== 0) && (
    <Box className='left-icon'>
      <Icon
        as={FaChevronCircleLeft}
        fontSize="25px"
        onClick={handleBack}
      />
    </Box>
  )
}
                    {currentTab !== 5 && (
                      <Box className='right-icon'>
                        <Icon
                          as={FaChevronCircleRight}
                          // position="absolute"
                          // top={currentTab === 0 ? '325px' : currentTab === 1 ? "325px" :"325px"}
                          // right="10px"
                        
                          // transform="translate(0, -50%)"
                          // aria-label="Slide Right"
                          fontSize="25px" // Increase icon size here
                          onClick={handleNext}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box className='Switch-btns'
                  flex={{ md: '1' }}
                  mt={{ base: '20px', md: '0' }}
                  ml={{ md: '20px' }}
                  width={{ base: '100%', md: '100%' }}
                >
                  {currentTab === 0 && (
                    <CompletionScreenRight
                      setSelectedBadge={setSelectedBadge}
                      setFormData={setFormData}
                      formData={formData}
                      handleChange={handleChange}
                      setBadge={setBadge}
                      compliData={compliData}
                      setCompliData={setCompliData}
                      CompKeyCount={CompKeyCount}
                      handlecompletion={handlecompletion}
                    />
                  )}
                  {currentTab === 1 && (
                    <Stack direction="column" gap="20px">
                      <Card>
                        <FormControl
                          display="flex"
                          alignItems="center"
                          justifyContent={'space-between'}
                          mt="20px"
                        >
                          <FormLabel
                            htmlFor="email-"
                            mb="0"
                            fontSize="sm"
                            fontWeight="bold"
                            color={textColorPrimary}
                          >
                            Show Leaderboard to Learners
                          </FormLabel>
                          <Switch
                            isChecked={
                              formData.gameIsShowLeaderboard === 'true'
                                ? true
                                : false
                            }
                            color="#fff"
                            colorScheme="brandScheme"
                            size="md"
                            id="gameIsShowLeaderboard"
                            name="gameIsShowLeaderboard"
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Card>
                    </Stack>
                  )}
                  {currentTab === 2 && (
                    <ReflectionScreen
                      setFormData={setFormData}
                      formData={formData}
                      handleChange={handleChange}
                      setReflection={setReflection}
                      handleReflectionInput={handleReflectionInput}
                      reflectionQuestions={reflectionQuestions}
                      reflectionQuestionsdefault={reflectionQuestionsdefault}
                      handlesaveReflection={handlesaveReflection}
                    />
                  )}
                  {currentTab === 3 && (
                    <TakewayScreen
                      setFormData={setFormData}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  )}
    
                  {currentTab === 4 && (
                    <WelcomeScreen
                      setFormData={setFormData}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  )}
    
                  {currentTab === 5 && (
                    <ThankyouScreen
                      setFormData={setFormData}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  )}
                </Box>
              </Flex>
              {currentTab === 0 && (
                <Card boxShadow={'0px 0px 100px #e2e8f0'}>
                <SimpleGrid columns={{ base: 1, md: 4 }} gap="20px" mt={'10px'}>
                    <Flex direction="column">
                      <Text fontSize={18} fontWeight={700}>
                        Screen Title
                      </Text>
                      <InputField
                        mb="0px"
                        mt="30px"
                        placeholder="eg. Quest Complete"
                        width={'100%'}
                        // width="480px"
                        id="gameScreenTitle"
                        name="gameScreenTitle"
                        value={compliData[CompKeyCount]?.gameScreenTitle}
                        onChange={handlecompletion}
                        maxLength="15"
                        // label="Screen Title"
                      />
                       <Text fontSize={14} ml="2.5px" color={compliData[CompKeyCount]?.gameScreenTitle?.length > maxCharacters ? 'red' : 'gray'}>
         {maxCharacters - (compliData[CompKeyCount]?.gameScreenTitle?.length || 0)} Character left
      </Text>
                      {/* Additional InputField below Screen Title */}
                    </Flex>
                    {/**********Afrith-Modified-20-12-23********************/}
                    <>
                    {(compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'false' &&
                    compliData[CompKeyCount]?.gameIsSetMinPassScore === 'false')}
{(compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'false' &&
                    compliData[CompKeyCount]?.gameIsSetMinPassScore === 'false') ? null: (
                     
                      <Flex direction="column">
                        <Text fontSize={18} fontWeight={700}>
                          Congratulatory Message
                        </Text>
                        <FormControl
                          display="flex"
                          alignItems="center"
                          justifyContent={'space-between'}
                          mt="30px"
                          // ml="150px"
                        >
                          <FormLabel
                            htmlFor="email-"
                            mb="0"
                            fontSize="sm"
                            fontWeight="bold"
                            color={textColorPrimary}
                            whiteSpace={'nowrap'}
                          >
                            Single Message
                          </FormLabel>
                          <Switch
                            // mr="200px"
                            // isChecked={
                            //   compliData[CompKeyCount]?.gameIsSetCongratsSingleMessage === 'true' && compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage ===
                            //   'false'
                            //     ? true
                            //     : false
                            // }
                            isChecked={(compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'false' &&
                            compliData[CompKeyCount]?.gameIsSetMinPassScore === 'false') || compliData[CompKeyCount]?.gameIsSetCongratsSingleMessage === 'true' || (compliData[CompKeyCount]?.gameIsSetCongratsSingleMessage === 'false' && compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage ===
                            'false') ? true : false}
                            color="#fff"
                            colorScheme="brandScheme"
                            size="md"
                            id="gameIsSetCongratsSingleMessage"
                            name="gameIsSetCongratsSingleMessage"
                            onChange={handlecompletion}
                          />
                        </FormControl>
                        <FormControl
                          display="flex"
                          alignItems="center"
                          justifyContent={'space-between'}
                          mt="20px"
                          // ml="150px"
                        >
                          <FormLabel
                            htmlFor="email-"
                            mb="0"
                            fontSize="sm"
                            fontWeight="bold"
                            color={textColorPrimary}
                            whiteSpace={'nowrap'}
                          >
                            Score-Wise Message
                          </FormLabel>
                          <Switch
                            // mr="200px"
                            isChecked={
                              compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage ===
                              'true'
                                ? true
                                : false
                            }
                            color="#fff"
                            colorScheme="brandScheme"
                            size="md"
                            id="gameIsSetCongratsScoreWiseMessage"
                            name="gameIsSetCongratsScoreWiseMessage"
                            onChange={handlecompletion}
                          />
                        </FormControl>
                      </Flex>
                    )}
                      {(compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'false' &&
                    compliData[CompKeyCount]?.gameIsSetMinPassScore === 'false') || compliData[CompKeyCount]?.gameIsSetCongratsSingleMessage === 'true' || (compliData[CompKeyCount]?.gameIsSetCongratsSingleMessage === 'false' && compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage ===
                    'false') ? (
                      <>
                      
                      <FormControl>
                        <TextField
                          // mb="30px"
                          // me="30px"
                          w={'100%'}
                          // width="380px"
                          placeholder="eg. Congratulations! You have completed..."
                          mt="30px"
                          id="gameCompletedCongratsMessage"
                          name="gameCompletedCongratsMessage"
                          value={compliData[CompKeyCount]?.gameCompletedCongratsMessage}
                          onChange={handlecompletion}
                          maxlength="80"
                          mb="0px"
                        />
                         <Text fontSize={14} ml="2.5px" color={compliData[CompKeyCount]?.gameCompletedCongratsMessage?.length > maxCharacters2 ? 'red' : 'gray'}>
                        {maxCharacters2 - (compliData[CompKeyCount]?.gameCompletedCongratsMessage?.length || 0)} Character left
                        </Text>
                        </FormControl>
                        </>
                      ) : null}

                      {compliData[CompKeyCount]?.gameIsSetCongratsScoreWiseMessage === 'true' && (
                        <>
                          {compliData[CompKeyCount]?.gameIsSetMinPassScore === 'true' && (
                            <>
                            <Box>
                            <FormControl>
                              <FormLabel
                                mt="30px"
                                htmlFor="email-"
                                mb="0"
                                fontSize="sm"
                                fontWeight="bold"
                                color={textColorPrimary}
                                

                                whiteSpace="pre"
                                
                              >
                                For less than minimum score:
                              </FormLabel>
                              <TextField
                                me="30px"
                                // label=""
                                placeholder="eg. You can do bette..."
                                id="gameMinimumScoreCongratsMessage"
                                name="gameMinimumScoreCongratsMessage"
                                value={compliData[CompKeyCount]?.gameMinimumScoreCongratsMessage}
                                onChange={handlecompletion}
                                 maxlength="80"
                              />
                               <Text fontSize={14} ml="2.5px" color={compliData[CompKeyCount]?.gameMinimumScoreCongratsMessage?.length > maxCharacters2 ? 'red' : 'gray'}>
                              {maxCharacters2 - (compliData[CompKeyCount]?.gameMinimumScoreCongratsMessage?.length || 0)} Character left
                              </Text>
                            </FormControl>
                            <FormControl>
                              <FormLabel
                                mt="30px"
                                htmlFor="email-"
                                mb="0"
                                fontSize="sm"
                                fontWeight="bold"
                                color={textColorPrimary}
                                 whiteSpace="pre"
                              >
                                For above than minimum score:
                              </FormLabel>
                              <TextField
                                me="30px"
                                // label=""
                                placeholder="eg. Great job congrats!"
                                id="gameaboveMinimumScoreCongratsMessage"
                                name="gameaboveMinimumScoreCongratsMessage"
                                value={compliData[CompKeyCount]?.gameaboveMinimumScoreCongratsMessage}
                                onChange={handlecompletion}
                                 maxlength="80"
                              />
                                <Text fontSize={14} ml="2.5px" color={compliData[CompKeyCount]?.gameaboveMinimumScoreCongratsMessage?.length > maxCharacters2 ? 'red' : 'gray'}>
                              {maxCharacters2 - (compliData[CompKeyCount]?.gameaboveMinimumScoreCongratsMessage?.length || 0)} Character left
                              </Text>
                            </FormControl>
                            </Box>
                            </>
                          )}
                          {compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'true' && (
                            <>
                            <Box>
                              <FormControl>
                                <FormLabel
                                  mt="30px"
                                  htmlFor="email-"
                                  mb="0"
                                  fontSize="sm"
                                  fontWeight="bold"
                                  color={textColorPrimary}
                                   whiteSpace="pre"
                                >
                                  For less than distinction score:
                                </FormLabel>
                                <TextField
                                  me="30px"
                                  // label=""
                                  placeholder="eg. Good performance! You..."
                                  id="gameLessthanDistinctionScoreCongratsMessage"
                                  name="gameLessthanDistinctionScoreCongratsMessage"
                                  value={
                                    compliData[CompKeyCount]?.gameLessthanDistinctionScoreCongratsMessage
                                  }
                                  onChange={handlecompletion}
                                  maxlength="80"
                                />
                                 <Text fontSize={14} ml="2.5px" color={compliData[CompKeyCount]?.gameLessthanDistinctionScoreCongratsMessage?.length > maxCharacters2 ? 'red' : 'gray'}>
                                {maxCharacters2 - (compliData[CompKeyCount]?.gameLessthanDistinctionScoreCongratsMessage?.length || 0)} Character left
                                </Text>
                              </FormControl>
                              <FormControl>
                                <FormLabel
                                  mt="30px"
                                  htmlFor="email-"
                                  mb="0"
                                  fontSize="sm"
                                  fontWeight="bold"
                                  color={textColorPrimary}
                                   whiteSpace="pre"
                                >
                                  For above distinction score:
                                </FormLabel>
                                <TextField
                                  me="30px"
                                  // label=""
                                  placeholder="eg. Fantastic performance! You..."
                                  id="gameAboveDistinctionScoreCongratsMessage"
                                  name="gameAboveDistinctionScoreCongratsMessage"
                                  value={
                                    compliData[CompKeyCount]?.gameAboveDistinctionScoreCongratsMessage
                                  }
                                  maxlength="80"
                                  onChange={handlecompletion}
                                />
                                 <Text fontSize={14} ml="2.5px" color={compliData[CompKeyCount]?.gameAboveDistinctionScoreCongratsMessage?.length > maxCharacters2 ? 'red' : 'gray'}>
                                 {maxCharacters2 - (compliData[CompKeyCount]?.gameAboveDistinctionScoreCongratsMessage?.length || 0)} Character left
                                 </Text>
                              </FormControl>
                              </Box>
                            </>
                          )}
                        </>
                      )}
                    </>
    
                  {/*  {formData.gameIsSetDistinctionScore === 'false' &&
                    formData.gameIsSetMinPassScore === 'false' ? (
                      <FormControl>
                        <TextField
                          // mb="30px"
                          // me="30px"
                          w={'100%'}
                          // width="380px"
                          placeholder="eg. Congratulations! You have completed..."
                          mt="30px"
                          id="gameCompletedCongratsMessage"
                          name="gameCompletedCongratsMessage"
                          value={formData?.gameCompletedCongratsMessage}
                          onChange={handleChange}
                        />
                      </FormControl>
                    ) : null}*/}
                  </SimpleGrid>
                </Card>
              )}
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
                  zIndex={99}
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
                    <Text color={textColor} fontSize="18px" fontWeight="600"
                      mb="20px" letterSpacing="0.5px" >
                      Would you like to add another quest to this game?
                    </Text>


                    <Text color="#888" fontSize="18px" fontWeight="600"
                      mb="20px" fontStyle="italic" >

                      Adding a quest will enable you to add another chapter to the story of this game, while keeping the same backgrounds, characters and overview



                    </Text>

                    <Box display={showQuest ? 'block' : 'none'} mt={'10px'}>
                      <Flex alignItems="center">
                        <label htmlFor="quest">Select a Quest:</label>
                        <Select
                          placeholder="Quest..."
                          id="quest"
                          name="Quests"
                          menuPortalTarget={document.body}
                          styles={customStyles}
                          options={isQuestDrop}
                          isSearchable={true}
                          className="react-select"
                          value={isQuestDrop.find((option: any) => option.value === getQuest) || null}
                          onChange={(selectedOption: any) => handleQuestNo(selectedOption)}
                        />
                      </Flex>

                    </Box>

                  </Box>
                  <Flex justify="space-between" w="50%" marginTop="15px" p="0 15px" display="flex" >

                    <Button
                      color={'#fff'}
                      bg={'#11047a'}
                      _hover={{ color: '#fff', bg: '#11047a' }}
                      mr={'10px'}
                      onClick={() => {
                        if (showSecondContent) {
                          setOpenQuest(false);
                          setTab(6);
                        } else {                        
                          setShowSecondContent(true);
                          setOpenQuest(false);
                        }
                      }}>
                      Yes
                    </Button>
                    <Button
                      color={'#fff'}
                      bg={'#11047a'}
                      _hover={{ color: '#fff', bg: '#11047a' }}
                      onClick={() => {
                        setOpenQuest(false); // Close the quest
                        setTab(6);
                      }}                    >
                      No
                    </Button>
                  </Flex>
                </Card>
              </Flex>
            </Box>
          ) : null}
           {showSecondContent ? (
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
                  zIndex={99}
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
                        <Radio value="Entire" onClick={() => handledropquest('Entire')}>

                          By creating a copy of the existing story and
                          modifying it
                        </Radio>
                        {/* <Radio value="Without">
                              Duplicate existing quest without story
                              <Text fontStyle={'italic'}>
                                {'(Same backgrounds, characters, overview)'}
                              </Text>
                            </Radio> */}
                        <Radio value="Scratch" onClick={() => handledropquest('Scratch')}>
                          By creating a new story{' '}
                        </Radio>
                        <Text color="#888" fontSize="18px" fontWeight="600"
                      mb="20px" fontStyle="italic" >
Please note changes on account of additional quests will happen only from story onwards—backgrounds, characters and overview are common for the entire game and any modifications to them will apply to all quests.
                    </Text>
                      </Stack>
                    </RadioGroup>
                    <Box display={showQuest ? 'block' : 'none'} mt={'10px'}>
                      <Flex alignItems="center">
                        <label htmlFor="quest">Select a Quest:</label>
                        <Select
                          placeholder="Quest..."
                          id="quest"
                          name="Quests"
                          menuPortalTarget={document.body}
                          styles={customStyles}
                          options={isQuestDrop}
                          isSearchable={true}
                          className="react-select"
                          value={isQuestDrop.find((option: any) => option.value === getQuest) || null}
                          onChange={(selectedOption: any) => handleQuestNo(selectedOption)}
                        />
                      </Flex>

                    </Box>

                  </Box>
                  <Flex justify="end" w="100%" marginTop="15px" p="0 15px">
                    <Button
                      color={'#fff'}
                      bg={'#11047a'}
                      _hover={{ color: '#fff', bg: '#11047a' }}
                      mr={'10px'}
                      onClick={() => {
                        setOpenQuest(false); // Close the quest
                        setTab(6);
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

