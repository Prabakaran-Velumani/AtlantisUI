import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Img,
  SimpleGrid,
  Step,
  Stepper,
  StepIndicator,
  Text,
  Tooltip,
  StepNumber,
  StepIcon,
  StepStatus,
  StepSeparator,
  StepTitle,
  TabPanels,
  Tab,
  Tabs,
  TabList,
  useColorModeValue,
  TabPanel,
  RadioGroup,
  Stack,
  Radio,
  Icon,
  useToast,
} from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import SelectField from 'components/fields/SelectField';
import { Switch } from '@chakra-ui/react';
import logo from 'assets/img/games/log.png';
import badge from 'assets/img/games/new-level-final.png';
import { getImages, getAudio,getLanguages,getCreatedLanguages,updatelanguages } from 'utils/game/gameService';
import Dropzone from 'views/admin/main/ecommerce/settingsProduct/components/Dropzone';
import { MdClose, MdOutlineCloudUpload,MdOutlineCheck } from 'react-icons/md';
import BadgeImages from './BadgeImages';
import PreferenceAudio from './PreferenceAudio';
import { FaMusic, FaPause, FaPlay, FaStop } from "react-icons/fa6";

interface OptionType {
  value: string;
  label: string;
}
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}
const GreetingsForm: React.FC<{
  handleChange: (e: any, selectedOption?: OptionType) => void;
  formData: any;
  updateSummaryState: (isOpen: any) => void;
  updateLanguage: (selectedOption: OptionType | null) => void;
  updateImageBackGround: (e: any) => void;
  setFormData: any;
  setSentAud:any;
  setBadge: any;
  selectedAud:any;
  setSelectedAud:any;
}> = ({
  selectedAud,
  setSelectedAud,
  handleChange,
  formData,
  setBadge,
  updateSummaryState,
  updateLanguage,
  updateImageBackGround,
  setFormData,
  setSentAud,
}) => {
    const [isOpenSummary, setIsOpenSummary] = useState<any>(false);
    const [tab, setTab] = useState<number>(1);
    const [img, setImg] = useState<any[]>([]);
    let [tabState, setTabState] = useState('Preferences');
    // const [selectedAud, setSelectedAud] = useState(null);
    const [backgroundIndex, setBackgroundIndex] = useState<number>();
    const [languageOptions, setLanguageOptions] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [defaultLang, setDefaultLang] = useState('');

const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
const textColorTertiary = useColorModeValue('secondaryGray.600', 'secondaryGray.500');
    // const languageOptions = [
    //   {
    //     value: '1',
    //     label: 'English',
    //   },
    //   {
    //     value: '2',
    //     label: 'Italy',
    //   },
    // ];
    const { id } = useParams();
  // alert(id);
  const isEmptyObject = (obj:any) => {
  return Object.keys(obj).length === 0;
};
  const [updateData, setUpdateData] = useState({});
    const toast = useToast()
    const mappedlanguageOptions = Array.isArray(languageOptions)
      ? languageOptions.map((language) => ({
        value: language.value,
        label: language.label,
      }))
      : [];
    const options = [
      { value: 'Each', name: 'Immediately After Each Interaction' },
      { value: 'Completion', name: ' Together After Completion Screen' },
    ];
    const steps = [
      { title: 'BackGround' },
      { title: 'Non Playing Charater' },
      { title: 'About Story' },
      { title: 'Customzation' },
      { title: 'Score' },
      { title: 'Summaries' },
      { title: 'Endpage' },
    ];
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
    const textColor = useColorModeValue('secondaryGray.900', 'white');


    const [selectedBadge, setSelectedBadge] = useState(null);
    const [badgeData, setBadgeData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean|null>(null);
    const [isPaused, setIsPaused] = useState<boolean|null>(null);
    

    const navigate = useNavigate();
    

    useEffect(() => {
      if (selectedAud) {
        updateAudioUrl(selectedAud);
      }
    }, [selectedAud]);
  
    useEffect(() => {
      const audioElement = audioRef.current;
      console.log("audioElement", audioElement);
      if (audioElement) {
        audioElement.addEventListener('ended', handleEndedBtnClick);
        
        return () => {
          audioElement.removeEventListener('ended', handleEndedBtnClick);
        };
      }
    }, [audioRef.current]);

    
    const handleSummary = () => {
      setIsOpenSummary(!isOpenSummary);
      updateSummaryState(!isOpenSummary);
    };
    const fetchData = async () => {
      const result = await getImages(5);
      if (result?.status !== 'Success')
        return alert('getbackruond error:' + result?.message);
      setImg(result?.data);
    };
    const handleSetBackground = (i: any) => {
      setBackgroundIndex(i);
      // setFormData((prev:any) => ({
      //   ...prev,
      //   gameReflectionpageBackground:i
      // }));
    };
    const fetchData2 = async () => {
   
      const result = await getLanguages();
      if (result?.status !== 'Success') return console.log('getLanguages Error :', result?.message);
      setLanguageOptions(result?.data);
      };
      const fetchData3 = async () => {
        // alert(id);
          let data = JSON.stringify({gameId:id});
          // alert(data);
      const result = await getCreatedLanguages(data);
      if (result?.status !== 'Success') return console.log('getCreatedLanguages Error :', result?.message);
      setDefaultLang(result?.lngchoosen);
      setSelectedLanguages(result?.data);
      
      // console.log(result);
      };
      // const isEnglish = (selectedLanguages.length == 0) || (selectedLanguages.length == 1 && defaultLang === selectedLanguages[0]?.translationId);
      const defaultLanguage = { value: 1, label: 'English' };
      const getLanguageLabel = (translationId:any) => {
          const selectedLanguage = languageOptions.find(lang => lang.value === translationId);
          return selectedLanguage ? selectedLanguage.label : defaultLanguage.label;
        };
        const fetchData4 =async (updataData:any) =>{
      // alert(id);
      if(isEmptyObject(updateData))
      {
        console.log(updateData);
      }
      else{
          let data = JSON.stringify(updateData);
          // alert(data);
      const result = await updatelanguages(data);
      if (result?.status !== 'Success') return console.log('updatelanguages Error :', result?.message);
      if(result?.status == 'Success'){
      setDefaultLang(result?.lngchoosen);
      setSelectedLanguages(result?.data);      
      }
      if(result?.status == 'AlreadyExist'){
        setDefaultLang(result?.lngchoosen);
        setSelectedLanguages(result?.data); 
      }
      }
        };
          useEffect(() => {
            fetchData();
            fetchData2();
            fetchData3();
            fetchData4(updateData);
            console.log('formData', formData);
            console.log(updateData);
      
      
          }, [backgroundIndex,updateData]);

    const handleChan = (e: any) => {
      setFormData((prev: any) => ({ ...prev, gameIsShowInteractionFeedBack: e }))
    }
    const handleAud = (e: any) => {
      e.preventDefault();
      let selectedFile;
      if (e.target.files) {
        selectedFile = e.target.files[0];
      }
      else if (e.dataTransfer && e.dataTransfer.files) {
        selectedFile = e.dataTransfer.files[0];
      }
      if (selectedFile) {
        setSentAud(selectedFile);
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedAud(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
    const handleClear = () => {
      setFormData((prev: any) => ({
        ...prev, gameBadgeName: '',
        gameBadge: ''
      }))
      setSelectedBadge(null);
      setBadge(null);
      setIsPlaying(null);
      setIsPaused(null);
    };
    const handleBadgeImages = async () => {
      const result = await getImages(7);
      if (result?.status !== 'Success')
        return console.log('getbackruond error:' + result?.message);
      else {
        setBadgeData(result?.data);
        setIsModalOpen(true);
      }
      setImg(result?.data);
    }
    
    const handleBadgeSelection = (badge: Badge) => {    
      setFormData((prev: any) => ({
        ...prev,
        gameBadge: badge.gasId,
        gameBadgeName: badge.gasAssetName
      }))
      setSelectedBadge(badge);
      setIsModalOpen(false);
      updateAudioUrl(badge.gasAssetImage);
    };
 
    const updateAudioUrl = (url: string)=>{
      if(url)
      {
        const audio = new Audio(url);
        audioRef.current = audio;
        setAudioUrl(url);
      }
      else{
        setAudioUrl(null);
        audioRef.current = null;
      }
    }

    const playAudio = ()=>{
      if (audioUrl) {
        if (audioRef.current?.paused) {
          audioRef.current.play();
          setIsPlaying(true);
          setIsPaused(false);
        }
      else{
        audioRef.current.pause();
        setIsPaused(true);
        setIsPlaying(false);
      }
    }
  }



const handlePlay= ()=>{
  // if(audioUrl){
  //   audioRef.current.play();
    setIsPlaying(true);
  // }
  playAudio();
}
const handlePause= ()=>{
  if (audioRef.current) {
    audioRef.current.pause();
    setIsPlaying(false);
    setIsPaused(true);
  }
}

    useEffect(()=>{
      if(audioUrl && isPlaying)
      {
        audioRef.current.play();
      }
      // else if(isPaused){
      //   audioRef.current.pause();
      //   setIsPaused(true);
      //   !audioUrl && setAudioUrl(null);//url
      // }
    },[isPlaying])

  useEffect(()=>{
    console.log("isPaused", isPaused)
    // console.log("isPaused", isPaused)
    if(isPaused)
    {
      audioRef.current.pause();
    }      
  },[isPaused]) 

    const handleEndedBtnClick = ()=>{
      if(audioRef?.current && audioRef.current?.currentTime !=0)
      {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(null);
      setIsPaused(null);
    }


const handleLanguageChangeGPT = (selectedOption: OptionType) => {
      
  setUpdateData({ gameId:id, translationId: selectedOption.value, lng: selectedOption.label}); // Update both gameId and selectedOption in state
   // alert(updatedata);
  };
    
    return (
      <>
       <Card mt='20px' p={{ base: '20px', md: '20px 40px' }}>
     <Box w='100%' mb='40px'>
        <Flex direction={{ base: 'column', '3xl': 'row' }}>
        <Box me={{ md: '40px', '3xl': '40px' }}>
            <Tabs variant='soft-rounded' colorScheme='brandTabs' mb='60px'>
              <TabList overflowX={{ sm: 'scroll', lg: 'unset' }}>
              <Flex>
      
                <Tab
                    pb='0px'
                    flexDirection='column'
                    onClick={function() {
                      setTabState('Preferences');
                    }}
                    bg='unset'
                    _selected={{
                      bg: 'none'
                    }}
                    _focus={{ border: 'none' }}
                    minW='max-content'><Flex align='center'>
                      <Text
                        color={tabState === 'Preferences' ? textColor : textColorTertiary}
                        fontSize='lg'
                        fontWeight='500'>Preferences</Text>
                    </Flex>
<Box
                      height='4px'
                      w='100%'
                      transition='0.1s linear'
                      bg={tabState === 'Preferences' ? 'brand.500' : 'transparent'}
                      mt='15px'
                      borderRadius='30px'
                    />
                    </Tab>
                    <Tab
                    onClick={function() {
                      setTabState('Translations');
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
                      <Text
                        color={tabState === 'Translations' ? textColor : textColorTertiary}
                        fontSize='lg'
                        fontWeight='500'>
                        Translations
                      </Text>
                    </Flex>
                    <Box
                      height='4px'
                      w='100%'
                      transition='0.1s linear'
                      bg={tabState === 'Translations' ? 'brand.500' : 'transparent'}
                      mt='15px'
                      borderRadius='30px'
                    />
                  </Tab>
               </Flex>
              </TabList>
              <TabPanels pt='30px'>
                <TabPanel>
                  <Box w={'65%'}>
                    <SimpleGrid
                      columns={{ sm: 1, md: 1, xl: 1 }}
                      spacing={{ base: '20px', xl: '20px' }}
                    >
                      <FormControl mt="20px">
                        <FormLabel
                          htmlFor="alerts"
                          mb="0"
                          fontSize="sm"
                          fontWeight="bold"
                          color={textColorPrimary}
                          mr="2"
                        >
                          Show Interaction Feedback
                        </FormLabel>
                        <RadioGroup
                          name="gameIsShowInteractionFeedBack"
                          id="alerts"
                          onChange={handleChan}
                        // value={chosen}
                        >
                          <Stack direction="row" spacing={5}>
                            {options.map((option) => (
                              <Radio
                                key={option?.value}
                                value={option?.value}
                                colorScheme="green"
                              >
                                {option?.name}
                              </Radio>
                            ))}
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                      <FormControl
                        display="flex"
                        alignItems="center"
                        justifyContent={'space-between'}
                        mt={'20px'}
                      >
                        <FormLabel
                          htmlFor="summaryScreen"
                          fontSize="sm"
                          fontWeight="bold"
                          color={textColorPrimary}
                          mr="2"
                        >
                          Shuffle option
                        </FormLabel>
                        <Switch
                          id="gameShuffle"
                          name="gameShuffle"
                          colorScheme={'brandScheme'}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl
                        display="flex"
                        alignItems="center"
                        justifyContent={'space-between'}
                        mt={'20px'}
                      >
                        <FormLabel
                          htmlFor="summaryScreen"
                          fontSize="sm"
                          fontWeight="bold"
                          color={textColorPrimary}
                          mr="2"
                        >
                          Disable optional replays
                        </FormLabel>
                        <Switch
                          id="gameDisableOptionalReplays"
                          name="gameDisableOptionalReplays"
                          colorScheme={'brandScheme'}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <Flex alignItems="center" justifyContent={'space-between'}>
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color={textColorPrimary}
                          mb="10px"
                          mr="45px"
                        >
                          Change introductory music <span style={{ color: 'red' }}>*</span>
                        </Text>
                        {/* <Flex alignItems="center">

                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color={textColorPrimary}
                            mb="10px"
                            mr="45px"
                          >
                            Select Music
                          </Text>
                          {!selectedAud ?
                            <Dropzone
                              accept='.mp3'
                              onChange={handleAud}
                              onDrop={handleAud}
                              content={
                                <Box maxW="100%" textAlign="center">
                                  <Icon
                                    as={MdOutlineCloudUpload}
                                    w="30px"
                                    h="30px"
                                    color={textColor}
                                  />
                                </Box>
                              }
                              style={{
                                border: '2px dashed #A0AEC0',
                                borderRadius: '4px',
                                width: '140px',
                                height: '50px',
                              }}
                            /> :
                            <>
                            <audio controls>
                              <source src={selectedAud} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                            <Icon ml={'10px'} as={MdClose} borderRadius={'50%'} bg={'#e2e8f0'} w={'30px'} h={'30px'} cursor={'pointer'} onClick={()=>setSelectedAud(null)}/>
                            </>
                            }
                        </Flex> */}
  <Flex alignItems="center">
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent={'space-between'}
      width={'35%'}
      mt={'10px'}
      mb="10px"
      gap="10px"
    >
      <FormLabel
        fontSize="sm"
        fontWeight="bold"
        color={textColorPrimary}
        mb="10px"
        whiteSpace={'nowrap'}
        onClick={handleBadgeImages}
      >
        Select Audio: {formData.gameIsSetBadge === "true" && <span style={{ color: 'red' }}>*</span>}
      </FormLabel>
      <PreferenceAudio
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        badgeData={badgeData}
        handleBadgeSelection={handleBadgeSelection}
      />

    </FormControl>
    {!formData.gameBadge || formData.gameBadge === '' || formData.gameBadge === null ?
      <>
        <input type='file' style={{ display: 'none' }} />
        
        <Box
          w={'100%'}
          border={'1px solid #e0e5f2'}
          padding={'5px'}
          display={'flex'}
          cursor={'pointer'}
          onClick={() => handleBadgeImages()}
          alignItems={'center'}
          className="Box00"
        >
          <Box
            h={'40px'}
            width={'65%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            className="Box1"
            >
          <Text ml={'5px'} textOverflow={'ellipsis'} whiteSpace="nowrap" overflow="hidden" fontSize="sm">No File Chosen</Text>
          </Box>
          <Box
            h={'40px'}
            width={'35%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            bg={'#3311db'}
            borderRadius="20%"
            padding="10px"
            
          >
            <Text color={'#fff'} textAlign={'center'} fontSize="md">Choose</Text>
          </Box>
        </Box>
      </>
      :
      
      <Box position={'relative'} display={'flex'} alignItems={"center"} className={"Box12"} justifyContent={'space-between'} w={'100%'} ml={"10px"} mb={"10px"}>
        <Box>    
          <Text  color={'#3311db'} textAlign={'center'} verticalAlign={'center'} fontSize="md" overflow="hidden"
      textOverflow="ellipsis" whiteSpace="nowrap">{formData.gameBadge && formData.gameBadgeName+".mp3"}</Text>
          <Icon
            as={MdClose}
            bg={'#fff'}
            color={"red"}
            position={'absolute'}
            borderRadius={'50%'}
            top={'-0'}    
            right={'0'}
            cursor="pointer"
            onClick={()=>{handleClear(); handleEndedBtnClick()}}
          />{}
        </Box>
        {(isPlaying === null || (!isPlaying && isPaused)) ?
        <>
        <Box
          w={'30px'}
          h={'30px'}
          borderRadius={'50%'}
          bg={'#3311db'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          mr={'10px'} 
          ml={'10px'} 
          onClick={() => handlePlay()}
        >
         (<FaPlay size={15} color={'#fff'} />)
        </Box> 
        {(isPaused || isPlaying) &&
        <Box
        w={'30px'}
        h={'30px'}
        borderRadius={'50%'}
        bg={'#3311db'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        mr={'10px'} 
        onClick={() => handleEndedBtnClick()}
      >
        <FaStop size={15} color='#fff' />
      </Box>}
        </>
        :
          <>
          <Box
          w={'30px'}
          h={'30px'}
          borderRadius={'50%'}
          bg={'#3311db'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          mr={'10px'} 
          ml={'10px'} 
          onClick={() => handlePause()}
          >
          <FaPause size={15} color='#fff' />
          </Box>
        
        <Box
          w={'30px'}
          h={'30px'}
          borderRadius={'50%'}
          bg={'#3311db'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          mr={'10px'} 
          onClick={() => handleEndedBtnClick()}
        >
          <FaStop size={15} color='#fff' />
        </Box>
        </>
        }
        </Box>
    }
  </Flex>

                      </Flex>
                      <FormControl
                        display="flex"
                        alignItems="center"
                        justifyContent={'space-between'}
                        mt={'20px'}
                      >
                        <FormLabel
                          htmlFor="summaryScreen"
                          fontSize="sm"
                          fontWeight="bold"
                          color={textColorPrimary}
                          mr="2"
                        >
                          Track Question Wise Answers
                        </FormLabel>
                        <Switch
                          id="gameTrackQuestionWiseAnswers"
                          name="gameTrackQuestionWiseAnswers"
                          colorScheme={'brandScheme'}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl
                        display="flex"
                        alignItems="center"
                        justifyContent={'space-between'}
                        mt={'20px'}
                      >
                        <FormLabel
                          htmlFor="summaryScreen"
                          fontSize="sm"
                          fontWeight="bold"
                          color={textColorPrimary}
                          mr="2"
                        >
                          Disable Learner Email Notifications
                        </FormLabel>
                        <Switch
                          id="gameDisableLearnerMailNotifications"
                          name="gameDisableLearnerMailNotifications"
                          colorScheme={'brandScheme'}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </SimpleGrid>
                  </Box>
                </TabPanel>
                <TabPanel>
                  
                      
                  <Box w={'65%'}>
                   <SimpleGrid
                     columns={{ sm: 1, md: 1, xl: 1 }}
                     spacing={{ base: '20px', xl: '20px' }}
                   >
                   
                     <FormControl
                       display="flex"
                       alignItems="center"
                       justifyContent={'space-between'}
                       mt={'20px'}
                     >
                       <FormLabel
                         htmlFor="summaryScreen"
                         fontSize="sm"
                         fontWeight="bold"
                         color={textColorPrimary}
                         mr="2"
                       >
               Select Languages for Game Translation</FormLabel>
            <SelectField
                               mb="0px"
                               me="30px"
                               
                               name="gameLanguageId"
                               options={mappedlanguageOptions}
                               value={
                                   mappedlanguageOptions.find(
                                     (option) => option.value === defaultLang,
                                   ) || null
                                 }
                               onChange={handleLanguageChangeGPT}
                                                 
                           />
              
                     </FormControl>
                   </SimpleGrid>
             </Box>
                 <Box w={'100%'} mt="20px" p="20px">
                   <SimpleGrid
                     columns={{ sm: 1, md: 2, xl: 4 }}
                     spacing={{ base: '20px', xl: '20px' }}
                   >

              {selectedLanguages.length === 0 ? (
         <Flex
           key={defaultLanguage.value}
           direction="column"
          bg={parseInt(defaultLang)===defaultLanguage.value ? boxBg : 'transparent'}
           p="16px 20px"
position="relative"
           borderRadius="14px"
           mb="38px"
           border={parseInt(defaultLang)===defaultLanguage.value ? "2px solid #11047a" : 'none'}
           boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
           
         >
         {parseInt(defaultLang) === defaultLanguage.value && (
       <Flex
         position="absolute"
         top="-10px"
         right="-10px"
         width="20px"
         height="20px"
         borderRadius="50%"
         bg={parseInt(defaultLang) === defaultLanguage.value ? '#11047a' : 'transparent'}
         alignItems="center"
         justifyContent="center"
         zIndex="1"
         overflow="hidden"
       >
        <Icon
                                   as={MdOutlineCheck}
                                   w="15px"
                                   h="15px"

                                   color="white"

                                 />
       </Flex>
     )}
           <Text fontSize="sm" fontWeight="700" color={'black'}>
             {defaultLanguage.label}
           </Text>
           <Text fontSize="sm" fontWeight="500" color="secondaryGray.600">
             Your Content Now in {defaultLanguage.label} Language
           </Text>
         </Flex>
       ) : (
       <>
       <Flex
           key={defaultLanguage.value}
           direction="column"
          bg={parseInt(defaultLang)===defaultLanguage.value ? boxBg : 'transparent'}
           p="16px 20px"
           position="relative"
           borderRadius="14px"
           mb="38px"
           border={parseInt(defaultLang)===defaultLanguage.value ? "2px solid #11047a" : 'none'}
           boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
           
         >
         {parseInt(defaultLang) === defaultLanguage.value && (
       <Flex
         position="absolute"
         top="-10px"
         right="-10px"
         width="20px"
         height="20px"
         borderRadius="50%"
         bg={parseInt(defaultLang) === defaultLanguage.value ? '#11047a' : 'transparent'}
         alignItems="center"
         justifyContent="center"
         zIndex="1"
         overflow="hidden"
       >
        <Icon
                                   as={MdOutlineCheck}
                                   w="15px"
                                   h="15px"

                                   color="white"

                                 />
       </Flex>
     )}
           <Text fontSize="sm" fontWeight="700" color={'black'}>
             {defaultLanguage.label}
           </Text>
           <Text fontSize="sm" fontWeight="500" color="secondaryGray.600">
             Your Content Now in {defaultLanguage.label} Language
           </Text>
         </Flex>

         {selectedLanguages.map(({ translationId }) => (
           <Flex
             key={translationId}
             direction="column"
             bg={parseInt(defaultLang)===translationId ? boxBg: 'transparent'}
             p="16px 20px"
             borderRadius="14px"
             mb="38px"
             border={parseInt(defaultLang)===translationId ? "2px solid #11047a" : 'none'}
             position="relative" // Position relative for pseudo-element
  
             boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
           >
           {parseInt(defaultLang) === translationId && (
       <Flex
         position="absolute"
         top="-10px"
         right="-10px"
         width="20px"
         height="20px"
         borderRadius="50%"
         bg={parseInt(defaultLang) === translationId ? '#11047a' : 'transparent'}
         alignItems="center"
         justifyContent="center"
         zIndex="1"
         overflow="hidden"
       >
        <Icon
                                   as={MdOutlineCheck}
                                   w="15px"
                                   h="15px"

                                   color="white"

                                 />
       </Flex>
     )}
             <Text fontSize="sm" fontWeight="700" color={'black'}>
               {getLanguageLabel(translationId)}
             </Text>
             <Text fontSize="sm" fontWeight="500" color="secondaryGray.600">
               Your Content Now in {getLanguageLabel(translationId)} Language
             </Text>
           </Flex>

         )
         )}</>
       )}
     </SimpleGrid>
     
</Box>                </TabPanel>
             </TabPanels>
           </Tabs>
         
         {/* <Card>
         <Flex gridArea='1 / 1 / 2 / 2' display={{ base: 'block', lg: 'flex' }}>
           <Tabs variant='soft-rounded' colorScheme='brandTabs'>
             <TabList mx={{ base: '10px', lg: '30px' }} overflowX={{ sm: 'scroll', lg: 'unset' }}>
               <Flex>
                 <Tab>
                   <Flex align='center'>
                     <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                       Preferences
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
                       Translation
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
               </Flex>
             </TabList>
             <TabPanels maxW={{ md: '90%', lg: '100%' }} mx="auto">
               <TabPanel>
                
               </TabPanel>
             </TabPanels>
             </Tabs>
          </Flex>
             </Card> */}
         {/* <Flex mb={'30px'} flexDirection={{sm: 'column', md:'column', xl:'row'}}>          
           <Box display={'flex'} flexDirection={'column'} width={{sm: '100%',xl:'100%'}}>
               <Box display={'flex'} flexDirection={{sm: 'column-reverse', md:'row', xl:'row'}} mb={'20px'}>
                   <Card width={{sm: '100%', md:'60%', xl:'60%'}} mr={'30px'}>
                       <Text fontSize={20} fontWeight={800} mb={'20px'}>
                           Preferences
                        </Text>
                       <SimpleGrid columns={{ sm: 1, md: 1, xl: 2 }} spacing={{ base: '20px', xl: '20px' }}>
                           { isOpenSummary ? 
                           <TextField
                               mb="0px"
                               me="30px"
                               name="gameSummarizes"                   
                               label="Summary"
                               placeholder="eg. Summary"
                               isRequired={true}
                               value={formData?.gameSummarizes}
                               onChange={handleChange}
                           /> : null }                            
                           <TextField
                               mb="0px"
                               me="30px"
                               name="gamWelcomePageText"                   
                               label="Welcome Page"
                               placeholder="eg. Welcome Page"
                               isRequired={true}
                               value={formData?.gamWelcomePageText}
                               onChange={handleChange}
                           />
                           <TextField
                               mb="0px"
                               me="30px"
                               name="gameThankYouPage"                   
                               label="Thankyou Page"
                               placeholder="eg. Thankyou Page"
                               isRequired={true}
                               value={formData?.gameThankYouPage}
                               onChange={handleChange}
                           />                          
                           <TextField
                               mb="0px"
                               me="30px"
                               name="gameScormVersion"                   
                               label="Scorm Version"
                               placeholder="eg. 2.0"
                               isRequired={true}
                               value={formData?.gameScormVersion}
                               onChange={handleChange}
                           />
                           <SelectField
                               mb="0px"
                               me="30px"
                               label="Language"
                               name="gameLanguageId"
                               options={mappedlanguageOptions}
                               value={
                                   mappedlanguageOptions.find(
                                     (option) => option.value === formData?.gameLanguageId,
                                   ) || null
                                 }
                               onChange={updateLanguage}
                                                 
                           />
                       </SimpleGrid>
                   </Card>
                   <Card width={{sm: '100%', md: '40%', xl:'40%'}} mb={{sm: '30px', md: '30px', xl: '0'}} className='for-switch' alignItems={'stretch'}>                
                       <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={{ base: '40px', xl: '60px' }} >
                           <FormControl display='flex' alignItems='center' justifyContent={'space-between'}>
                               <FormLabel htmlFor='summaryScreen' mb='0'>
                                   Summary Screen
                               </FormLabel>
                               <Switch id='gameSummaryScreen' name='gameSummaryScreen' colorScheme={'brandScheme'} onChange={handleSummary} />
                           </FormControl>
                           <FormControl display='flex' alignItems='center'  justifyContent={'space-between'}>
                               <FormLabel htmlFor='launchPlatform' mb='0'>
                                   Launched within Platform
                               </FormLabel>
                               <Switch id='gameLaunchedWithinPlatform' name='gameLaunchedWithinPlatform' value={1} onChange={handleChange} colorScheme={'brandScheme'} />
                           </FormControl>
                           <FormControl display='flex'  onChange={handleChange} alignItems='center'  justifyContent={'space-between'}>
                               <FormLabel htmlFor='downloadScorm' mb='0'>
                                   Downloaded as Scorm
                               </FormLabel>
                               <Switch id='gameDownloadedAsScorm' name='gameDownloadedAsScorm' onChange={handleChange} value={1} colorScheme={'brandScheme'} />
                           </FormControl>
                           <FormControl display='flex' alignItems='center'  justifyContent={'space-between'}>
                               <FormLabel htmlFor='defaultFeedback' mb='0'>
                                   Default Feedback Form
                               </FormLabel>
                               <Switch id='gameDefaultFeedbackForm' name='gameDefaultFeedbackForm'  onChange={handleChange} colorScheme={'brandScheme'} />
                           </FormControl>
                       </SimpleGrid>
                   </Card>
               </Box>
               <Box>
                   <Card>
                       <Text fontSize={18} fontWeight={800} mb={'20px'} >Welcome Page Background</Text>
                       <Flex overflowX={'auto'} width={'100%'} pb={'20px'}>       
                       {img &&
                       img.map((img, i) => (                                                  
                               
                                   <Img src={img?.gasAssetImage} h={'80px'} w={'80px'} mr={20} borderRadius={'8px'} boxShadow={'6px 5px 6px #4a4844ad'}   id={i.toString()} onClick={(e) => updateImageBackGround(e)}/>
                                 
                             
                                 ))}                            
                                                              
                       </Flex>
                   </Card>
               </Box>
           </Box>                       
       </Flex>            */}
       </Box>
       </Flex>
      </Box>
   </Card>
     </>
   );
 };

export default GreetingsForm;