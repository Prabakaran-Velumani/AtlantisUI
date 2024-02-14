// Chakra Imports
import {
  Button,
  Badge,
  Box,
  Flex,
  Icon,
  Text,
  Image,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useBreakpointValue,
  DrawerProps,
  Img,
  Menu,
  MenuButton,
  MenuList,
  FormControl,
  FormLabel,
  Textarea,
  MenuItem,
  Select
} from '@chakra-ui/react';
import next from 'assets/img/screens/next.png';
import Screen2 from 'assets/img/screens/screen2.png';
import Screen5 from 'assets/img/screens/screen5.png';
import Screen1 from 'assets/img/screens/screen1.png';
import Replay from 'assets/img/screens/Replay.png';
import Lead from 'assets/img/screens/Leaderboard.png';
import Login from 'assets/img/games/log_non.png';
// import bk from 'assets/img/games/17.png';
// import note from 'assets/img/games/note.png';
// import next from 'assets/img/screens/next.png';
// import dial from 'assets/img/games/Dialogue.png';
// import char from 'assets/img/games/charbox.png';
// import right from 'assets/img/games/right.png';
// import left from 'assets/img/games/left.png';
// import parch from 'assets/img/games/parch.png';
// import on from 'assets/img/games/on.png';
// import off from 'assets/img/games/off.png';
import { motion } from 'framer-motion';
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  createContext,
} from 'react';
import SelectField from 'components/fields/SelectField';
import InitialImg from 'assets/img/games/load.jpg';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import Sample from 'assets/img/games/Character_sample.glb';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import feedi from 'assets/img/screens/feed.png';
import { AiFillMessage } from 'react-icons/ai';
import Story from './playcards/Story';
import Welcome from './playcards/Welcome';
import ThankYou from './playcards/Thankyou';
import Screen6 from 'assets/img/screens/screen6.png';
import Reflection from './playcards/Reflection';
import RefScreen1 from 'assets/img/screens/refscreen1.png';
import Takeway from './playcards/Takeaway';
import Screen4 from 'assets/img/screens/screen4.png';
import Completion from './playcards/Completion';
import ReplayGame from './playcards/ReplayGame';
import { API_SERVER } from 'config/constant';
import { getTestAudios } from 'utils/game/gameService';
import PlayInfo from './playcards/playinfo';
import LeaderBoard from './playcards/Leaderboard';
import RefBg from 'assets/img/games/refbg.png';
import { MdClose } from 'react-icons/md';
import ProfileScreen from './playcards/ProfileScreen';
import Characterspage from './playcards/CharacterSelection';
import ChapterPage from './playcards/Chapters';
// import Select from 'react-select';

interface Review {
  // reviewId: Number;
  reviewerId: String | null;
  reviewGameId: String | null;
  review: String | null;
  tabId: Number | null;
  tabAttribute: String | null;
  tabAttributeValue: String | null;
}

interface ShowPreviewProps {
  gameScreens: string[];
  currentScreenId: number;
  setCurrentScreenId: React.Dispatch<React.SetStateAction<number>>;
  gameInfo: any;
  // setToastObj?: React.Dispatch<React.SetStateAction<any>>;
  handleSubmitReview: (data: any) => Promise<boolean>;
}

type TabAttributeSet = {
  [key: string]: {
    tabAttribute: string | null;
    tabAttributeValue: string | null;
  };
};
//no need for story
const overOptions = [
  { value: 1, label: 'Background' },
  { value: 2, label: 'Characters' },
  { value: 3, label: 'Game Overview' },
  { value: 4, label: 'Story' },
  { value: 5, label: 'Design' },
];

const tabOptions = [
  { value: 1, label: 'Background' },
  { value: 2, label: 'Characters' },
  { value: 3, label: 'Game Overview' },
  { value: 4, label: 'Story' },
  { value: 5, label: 'Design' },
];

interface ProfileDataType {
  name?: string;
  gender?: string;
  language?: any;
}

export const ProfileContext = createContext<ProfileDataType>({
  name: '',
  gender: '',
  language: '',
});

const EntirePreview: React.FC<ShowPreviewProps> = ({
  gameScreens,
  currentScreenId,
  setCurrentScreenId,
  gameInfo,
  handleSubmitReview,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const maxTextLength = 80;
  const audioRef = React.useRef(null);
  // const find = show.find((it: any) => it.gasId === formData.gameBackgroundId);
  // const img = find.gasAssetImage;

  // selected option color change
  const [selectedOption, setSelectedOption] = useState(null);
  // handle the item
  const [item, setItem] = useState(null);
  // handle the data to show
  const [data, setData] = useState(null);
  // handle the transition effect
  const [showNote, setShowNote] = useState(false),
    [first, setFirst] = useState(false);
  const [intOpt, setIntOpt] = useState([]);
  // type to render component ( conditional render)
  const [type, setType] = useState<string>('');
  // handle the choosed option's response message and feedback content and navigation
  const [resMsg, setResMsg] = useState<string>('');
  const [feed, setFeed] = useState<string>('');
  const [navi, setNavi] = useState<string>('');
  const [options, setOptions] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /** This state handles the Review Form Tab and Sub Tab options */
  const [reviewTabOptions, setReviewTabOptions] = useState([]);
  const [filteredTabOptions, setFilteredTabOptions] = useState([]);

  const [reviewSubTabOptions, setReviewSubTabOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [reviewInput, setReviewInput] = useState<Review>({
    reviewerId: gameInfo?.reviewer?.ReviewerId ?? null,
    reviewGameId: gameInfo?.gameId ?? null,
    review: '',
    tabId: null,
    tabAttribute: '',
    tabAttributeValue: '',
  });
  const [backgroundScreenUrl, setBackgroundScreenUrl] = useState(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [audio, setAudio] = useState();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentStoryBlockSeq, setCurrentStoryBlockSeq] =
    useState<string>(null);
  const [demoBlocks, setDemoBlocks] = useState(null);
  const Tab5attribute = [6, 4, 3, 7, 1, 5];

  const tabAttributeSets: TabAttributeSet[] = [
    { '1': { tabAttribute: null, tabAttributeValue: null } },
    { '2': { tabAttribute: null, tabAttributeValue: null } },
    { '3': { tabAttribute: 'fieldName', tabAttributeValue: '' } },
    { '4': { tabAttribute: 'blockSeqId', tabAttributeValue: '' } },
    { '5': { tabAttribute: 'screenId', tabAttributeValue: '' } },
  ];

  const [profileData, setProfileData] = useState({
    name: '',
    gender: '',
    language: '',
  });

  const fetchDefaultBgMusic = async () => {
    const res = await getTestAudios(); //default bg audio fetch
    if (res?.status === 'success') setAudio(res?.url);
  };

  useEffect(() => {
    setDemoBlocks(gameInfo?.blocks);
    setType(gameInfo?.blocks['1']['1']?.blockChoosen);
    setData(gameInfo?.blocks['1']['1']);
  }, []);

  useEffect(() => {
    if (!gameInfo?.bgMusic) {
      console.log('gameInfo.bgMusic Effct', gameInfo?.bgMusic);
      fetchDefaultBgMusic();
    } else {
      console.log('currentScreenId', currentScreenId);
      console.log('gameInfo.bgMusic Else', gameInfo?.bgMusic);
      currentScreenId > 0 && setAudio(gameInfo.bgMusic);
    }
  }, [gameInfo]);

  useEffect(() => {
    console.log('Audio Updated');
    if (audio) {
      if(audioRef.current){
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audio);
      audioRef.current.play();
    }
  }, [audio]);

  useEffect(() => {
    switch (currentScreenId) {
      case 1 && gameInfo?.gameData?.gameWelcomepageBackground:
        setBackgroundScreenUrl(API_SERVER + '/uploads/background/20252.jpg');
        break;
      case 3 && gameInfo?.gameData?.gameReflectionpageBackground:
        setBackgroundScreenUrl(
          API_SERVER + '/uploads/background/reflectionBg.png',
        );
        break;
      default:
        setBackgroundScreenUrl(
          API_SERVER + '/uploads/background/41524_1701765021527.jpg',
        );
        currentScreenId > 0 && setAudio(gameInfo.bgMusic);
        break;
    }
  }, [currentScreenId]);

  const getData = (next: any) => {
    const isPreference = gameInfo?.gameData?.gameIsShowInteractionFeedBack;
    const currentBlock = next
      ? parseInt(next?.blockPrimarySequence.split('.')[1])
      : null;
    const NextItem = currentBlock != null ? currentBlock + 1 : null;
    const nextSeq = next
      ? `${next?.blockPrimarySequence.split('.')[0]}.${NextItem}`
      : '';
    const quest = next ? next?.blockPrimarySequence.split('.')[0] : null;
    const currentQuest = next
      ? parseInt(next?.blockPrimarySequence.split('.')[0])
      : null;
    const nextLevel = currentQuest != null ? String(currentQuest + 1) : null;
    const nextBlock = next
      ? Object.keys(demoBlocks[quest] || {})
          .filter(
            (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === nextSeq,
          )
          .map((key) => demoBlocks[quest]?.[key])
      : ['completed'];
    if (nextBlock.length === 0) {
      if (demoBlocks.hasOwnProperty(nextLevel)) {
        setType(demoBlocks[nextLevel]['1']?.blockChoosen);
        setData(demoBlocks[nextLevel]['1']);
        setCurrentScreenId(6);
        return false;
      } else {
        setType(null);
        setData(null);
        setCurrentScreenId(6);
        return false;
      }
    }
    if (currentScreenId === 6) {
      if (
        next?.gameIsShowInteractionFeedBack &&
        next?.gameIsShowInteractionFeedBack === 'Complete'
      ) {
        setCurrentScreenId(9);
        return false;
      } else if (gameInfo?.gameData?.gameReplayAllowed === 'false') {
        setCurrentScreenId(8);
        return false;
      } else if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
        setCurrentScreenId(4);
        return false;
      } else if (gameInfo?.gameData?.gameIsShowReflectionScreen === 'true') {
        setCurrentScreenId(3);
        return false;
      } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7);
        return false;
      } else {
        if (data && type) {
          setCurrentScreenId(2);
          return false;
        } else {
          setType(null);
          setData(null);
          setCurrentScreenId(5);
          return false;
        }
      }
    }
    if (currentScreenId === 9) {
      if (gameInfo?.gameData?.gameReplayAllowed === 'false') {
        setCurrentScreenId(8);
        return false;
      } else if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
        setCurrentScreenId(4);
        return false;
      } else if (gameInfo?.gameData?.gameIsShowReflectionScreen === 'true') {
        setCurrentScreenId(3);
        return false;
      } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7);
        return false;
      } else {
        if (data && type) {
          setCurrentScreenId(2);
          return false;
        } else {
          setType(null);
          setData(null);
          setCurrentScreenId(5);
          return false;
        }
      }
    }
    if (currentScreenId === 8) {
      if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
        setCurrentScreenId(4);
        return false;
      } else if (gameInfo?.gameData?.gameIsShowReflectionScreen === 'true') {
        setCurrentScreenId(3);
        return false;
      } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7);
        return false;
      } else {
        if (data && type) {
          setCurrentScreenId(2);
          return false;
        } else {
          setType(null);
          setData(null);
          setCurrentScreenId(5);
          return false;
        }
      }
    }
    if (currentScreenId === 4) {
      if (gameInfo?.gameData?.gameIsShowReflectionScreen === 'true') {
        setCurrentScreenId(3);
        return false;
      } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7);
        return false;
      } else {
        if (data && type) {
          setCurrentScreenId(2);
          return false;
        } else {
          setType(null);
          setData(null);
          setCurrentScreenId(5);
          return false;
        }
      }
    }
    if (currentScreenId === 3) {
      if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7);
        return false;
      } else {
        if (data && type) {
          setCurrentScreenId(2);
          return false;
        } else {
          setType(null);
          setData(null);
          setCurrentScreenId(5);
          return false;
        }
      }
    }
    if (currentScreenId === 7) {
      if (data && type) {
        setCurrentScreenId(2);
        return false;
      } else {
        setType(null);
        setData(null);
        setCurrentScreenId(5);
        return false;
      }
    }
    if (next?.blockShowNavigate) {
      if (next?.blockShowNavigate === 'Repeat Question') {
        setType(next?.blockChoosen);
        setData(next);
        return false;
      } else if (next?.blockShowNavigate === 'New Block') {
        setType(nextBlock[0]?.blockChoosen);
        setData(nextBlock[0]);
        setSelectedOption(null);
        return false;
      } else if (next?.blockShowNavigate === 'Replay Point') {
        setType(demoBlocks['1']['1']?.blockChoosen);
        setData(demoBlocks['1']['1']);
        setSelectedOption(null);
        return false;
      } else if (next?.blockShowNavigate === 'Select Block') {
        setSelectedOption(null);
      } else if (next?.blockShowNavigate === 'Complete') {
        setCurrentScreenId(6);
        return false;
      }
    }
    if (nextBlock[0]?.blockChoosen === 'Interaction') {
      const optionsFiltered = gameInfo?.questOptions.filter(
        (key: any) => key?.qpSequence === nextBlock[0]?.blockPrimarySequence,
      );
      setOptions(optionsFiltered);
    }
    if (
      type === 'Interaction' &&
      resMsg !== '' &&
      next?.gameIsShowInteractionFeedBack &&
      next?.gameIsShowInteractionFeedBack === 'Each'
    )
      setType('response');
    else if (
      (type === 'Interaction' || type === 'response') &&
      feed !== '' &&
      next?.gameIsShowInteractionFeedBack &&
      next?.gameIsShowInteractionFeedBack === 'Each'
    )
      setType('feedback');
    else if (
      type === 'Interaction' ||
      type === 'response' ||
      type === 'feedback'
    ) {
      if (navi === 'Repeat Question') {
        setType('Interaction');
        setSelectedOption(null);
      } else if (navi === 'New Block') {
        setType(nextBlock[0]?.blockChoosen);
        setData(nextBlock[0]);
        setSelectedOption(null);
      } else if (navi === 'Replay Point') {
        setType(demoBlocks['1']['1']?.blockChoosen);
        setData(demoBlocks['1']['1']);
        setSelectedOption(null);
      } else if (navi === 'Select Block') {
        setSelectedOption(null);
      } else if (navi === 'Complete') {
        setCurrentScreenId(6);
        return false;
      } else {
        setType(demoBlocks[nextLevel]['1']?.blockChoosen);
        setData(demoBlocks[nextLevel]['1']);
        if (demoBlocks[nextLevel]['1']?.blockChoosen === 'Interaction') {
          const optionsFiltered = gameInfo?.questOptions.filter(
            (key: any) =>
              key.qpSequence ===
              demoBlocks[nextLevel]['1']?.blockPrimarySequence,
          );
          setOptions(optionsFiltered);
        }
        setSelectedOption(null);
        if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
          setCurrentScreenId(7);
        } else {
          setCurrentScreenId(5);
        }
      }
    } else {
      setType(nextBlock[0]?.blockChoosen);
      setData(nextBlock[0]);
      setSelectedOption(null);
    }
  };

  let menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );

  // validate the choosed option
  const handleValidate = (item: any, ind: number) => {
    setResMsg(item?.qpResponse);
    setFeed(item?.qpFeedback);
    setNavi(item?.qpNavigateShow);
    setSelectedOption(ind === selectedOption ? null : ind);
  };
  useEffect(() => {
    setFeedBackFromValue();
  }, [currentScreenId]);

  const setFeedBackFromValue = () => {
    switch (currentScreenId) {
      case 0:
        setReviewTabOptions([1, 3, 5]); //GameInto screen
        break;
      case 1:
        setReviewTabOptions([1, 3, 5]); //Welcome
        break;
      case 2:
        setReviewTabOptions([1, 2, 4]); //Story
        break;
      case 3:
        setReviewTabOptions([1, 5]); //Reflection
        break;
      case 4:
        setReviewTabOptions([1, 5]); //Leaderboard
        break;
      case 5:
        setReviewTabOptions([1, 5]); //ThanksScreen
        break;
      case 6:
        setReviewTabOptions([1, 5]); //Completion
        break;
      case 7:
        setReviewTabOptions([1, 5]); //TakeAway
        break;
      default:
        setReviewTabOptions([1, 2, 3, 4, 5]); //All
    }
  };

  useEffect(() => {
    console.log('***currentScreenId', currentScreenId);
    console.log('***reviewTabOptions', reviewTabOptions);
    console.log('***tabOptions', tabOptions);
    if (reviewTabOptions) {
      const filterTabOptionsList = tabOptions.filter((tabOption) =>
        reviewTabOptions.includes(tabOption.value),
      );
      console.log('***filterTabOptions in ', filterTabOptionsList);

      setFilteredTabOptions(filterTabOptionsList);
    }
  }, [reviewTabOptions]);
  console.log('***filterTabOptions', filteredTabOptions);
  const subTabOptionsForTabIds: Array<{
    [key: string]: Array<{ value: string; label: string }> | null;
  }> = [
    { '1': null },
    { '2': null },
    {
      '3': [
        { value: 'Title', label: 'Title' },
        { value: 'Skill', label: 'Skill' },
        { value: 'Storyline', label: 'Storyline' },
        { value: 'Outcomes', label: 'Outcomes' },
        { value: 'Category', label: 'Category' },
        { value: 'Author', label: 'Author' },
      ],
    },
    { '4': null },
    {
      '5': [
        { value: '0', label: 'Completion' },
        { value: '1', label: 'Leaderboard' },
        { value: '2', label: 'Reflection' },
        { value: '3', label: 'Takeaway' },
        { value: '4', label: 'Welcome' },
        { value: '5', label: 'Thanks' },
      ],
    },
  ];

  useEffect(() => {
    console.log("reviewInput?.tabId",reviewInput?.tabId);
    if (reviewInput?.tabId) {
      if (reviewInput?.tabId === 5) {
        setReviewSubTabOptions([]);
        setReviewInput((prev: Review) => ({
          ...prev,
          tabAttribute: 'screenId',
          tabAttributeValue: Tab5attribute.indexOf(
            Number(currentScreenId),
          ).toString(),
        }));
      } else if (reviewInput?.tabId === 4) {
        //for Story Tab
        const blockSeqId = data.blockQuestNo + '@' + data.blockSecondaryId;
        setReviewSubTabOptions([]);
        setReviewInput((prev: Review) => ({
          ...prev,
          tabAttribute: 'blockSeqId',
          tabAttributeValue: blockSeqId,
        }));
      } else {
        const subOptions = subTabOptionsForTabIds.find(
          (item: any) => Object.keys(item)[0] === reviewInput?.tabId.toString(),
        );
        setReviewSubTabOptions(subOptions[reviewInput?.tabId.toString()]);
      }
      /** To hide the sub tab options and set the subtab selection based on the current screen it here */
    }
  }, [reviewInput.tabId]);

  useEffect(() => {
    /**Validate form */
    if (
      reviewInput.reviewGameId &&
      reviewInput.reviewerId &&
      reviewInput.tabId &&
      reviewInput.review
    ) {
      if (reviewInput.tabId === 3 || reviewInput.tabId === 5) {
        if (reviewInput.tabAttribute && reviewInput.tabAttributeValue) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
      } else {
        setIsFormValid(true);
      }
    } else {
      setIsFormValid(false);
    }
  }, [reviewInput]);

  const handleClose = () => {
    const element = document.getElementById('container');
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          alert(`${err.message}`);
        });
      }
    }
  };
  //no need for story
  const handleTabSelection = (e: any) => {
    e.preventDefault();
    
    if (e.target.value) {
      setReviewInput((prev: Review) => ({
        ...prev,
        tabId: e.target.value ?? null,
        tabAttribute: '',
        tabAttributeValue: '',
      }));
      setIsMenuOpen(true);
    } else {
      setReviewInput((prev: Review) => ({
        ...prev,
        tabId: selectedOption?.value ? selectedOption?.value : null,
        tabAttribute: '',
        tabAttributeValue: '',
      }));
      setReviewSubTabOptions([]);
    }
  };

  
  const handleSubTabSelection = (selectedOption: any) => {
    const selectedTabFileds = tabAttributeSets.find(
      (item) => Object.keys(item)[0] === reviewInput?.tabId.toString(),
    );
    setReviewInput((prev: Review) => ({
      ...prev,
      tabAttribute: selectedOption?.value
        ? selectedTabFileds[reviewInput?.tabId.toString()].tabAttribute
        : null,
      tabAttributeValue: selectedOption?.value ? selectedOption?.value : null,
    }));
  };

  const handleMenubtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpen(true);
  };

  const handleReview = (e: any) => {
    setReviewInput((prev: Review) => ({ ...prev, review: e.target.value }));
  };
  const resetInputFields = () => {
    setReviewInput((prev) => ({
      ...prev,
      review: '',
      tabId: null,
      tabAttribute: '',
      tabAttributeValue: '',
    }));
  };
  const hanldeSubmit = async (data: any) => {
    const response = handleSubmitReview(data); //returns true or false
    if (response) {
      setIsMenuOpen(false);
      resetInputFields();
    }
  };
  const hanldeClose = () => {
    setIsFormValid(false);
    resetInputFields();
    setIsMenuOpen(false);
  };
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const startDemo = () => {
    const aud = new Audio(audio);
    aud.loop = true;
    aud.play();
    onClose1();
    setCurrentScreenId(10);
  };

  const replayGame = () => {
    setType(gameInfo?.blocks['1']['1']?.blockChoosen);
    setData(gameInfo?.blocks['1']['1']);
    setCurrentScreenId(2);
  };

  console.log('Audio', audio);
  console.log('audioRef', audioRef);
  return (
    <ProfileContext.Provider value={profileData}>
      <Flex height="100vh" className={currentScreenId === 2 ? '' : 'AddScores'}>
        {(() => {
          switch (currentScreenId) {
            case 0:
              return (
                <>
                  {
                    <PlayInfo
                      onOpen={onOpen1}
                      onClose={onClose1}
                      isOpen={true}
                      startDemo={startDemo}
                    />
                  }
                </>
              );
            case 1:
              return (
                <>
                  <motion.div
                    initial={{ opacity: 0, background: '#000' }}
                    animate={{ opacity: 1, background: '#0000' }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Box
                      w={'100%'}
                      h={'100vh'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      position={'relative'}
                      overflow={'visible'}
                      style={{ perspective: '1000px' }}
                      className="Main-Content"
                    >
                      <Box
                        backgroundImage={backgroundScreenUrl}
                        w={'100% !important'}
                        h={'100vh'}
                        backgroundRepeat={'no-repeat'}
                        backgroundSize={'cover'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        className="Game-Screen"
                      >
                        <Box className="Images" h={'100vh !important'}>
                          <Welcome
                            intro={audio}
                            setCurrentScreenId={setCurrentScreenId}
                            formData={gameInfo?.gameData}
                            imageSrc={Screen5}
                            preview={true}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </>
              );
            case 2:
              return (
                <>
                  {/* <motion.div
                    initial={{ opacity: 0, background: '#000' }}
                    animate={{ opacity: 1, background: '#0000' }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  > */}
                  {data && type && (
                    <Story
                      selectedNpc={gameInfo?.nonPlayer}
                      selectedPlayer={selectedPlayer}
                      formData={gameInfo?.gameData}
                      backGroundImg={backgroundScreenUrl}
                      data={data}
                      type={type}
                      setCurrentScreenId={setCurrentScreenId}
                      handleValidate={handleValidate}
                      resMsg={resMsg}
                      feed={feed}
                      getData={getData}
                      options={options}
                      option={selectedOption}
                      setAudio={setAudio}
                    />
                  )}
                  {/* </motion.div> */}
                </>
              );
            case 3:
              return (
                <>
                  {/* <motion.div
                    initial={{ opacity: 0, background: '#000' }}
                    animate={{ opacity: 1, background: '#0000' }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  > */}
                  <Box
                    w={'100%'}
                    h={'100vh'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'relative'}
                    overflow={'visible'}
                    style={{ perspective: '1000px' }}
                    className="Main-Content"
                  >
                    <Box
                      // backgroundImage={backgroundScreenUrl}
                      w={'100% !important'}
                      h={'100vh'}
                      // backgroundRepeat={'no-repeat'}
                      // backgroundSize={'cover'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      className="Game-Screen"
                      backgroundColor={'#D9C7A2'}
                    >
                      <Box className="Images">
                        <Reflection
                          formData={gameInfo?.gameData}
                          imageSrc={RefBg}
                          getData={getData}
                          data={data}
                          reflectionQuestions={gameInfo?.reflectionQuestions}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* </motion.div> */}
                </>
              );
            case 4:
              return (
                // <motion.div
                //   initial={{ opacity: 0, background: '#000' }}
                //   animate={{ opacity: 1, background: '#0000' }}
                //   transition={{ duration: 0.3, delay: 0.5 }}
                // >
                <Box
                  w={'100%'}
                  h={'100vh'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  position={'relative'}
                  overflow={'visible'}
                  style={{ perspective: '1000px' }}
                  className="Main-Content"
                >
                  <Box
                    backgroundImage={backgroundScreenUrl}
                    w={'100% !important'}
                    h={'100vh'}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'cover'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    className="Game-Screen"
                  >
                    <Box className="Images">
                      <LeaderBoard
                        formData={gameInfo?.gameData}
                        imageSrc={Lead}
                        getData={getData}
                        data={data}
                      />
                    </Box>
                  </Box>
                </Box>
                // </motion.div>
              );
            case 5:
              return (
                <>
                  {/* <motion.div
                    initial={{ opacity: 0, background: '#000' }}
                    animate={{ opacity: 1, background: '#0000' }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  > */}
                  <Box
                    w={'100%'}
                    h={'100vh'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'relative'}
                    overflow={'visible'}
                    style={{ perspective: '1000px' }}
                    className="Main-Content"
                  >
                    <Box
                      backgroundImage={backgroundScreenUrl}
                      w={'100% !important'}
                      h={'100vh'}
                      backgroundRepeat={'no-repeat'}
                      backgroundSize={'cover'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      className="Game-Screen"
                    >
                      <Box className="Images">
                        <ThankYou
                          formData={gameInfo?.gameData}
                          imageSrc={Screen6}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* </motion.div> */}
                </>
              );
            case 6:
              return (
                <>
                  {/* <motion.div
                    initial={{ opacity: 0, background: '#000' }}
                    animate={{ opacity: 1, background: '#0000' }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  > */}
                  <Box
                    w={'100%'}
                    h={'100vh'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'relative'}
                    overflow={'visible'}
                    style={{ perspective: '1000px' }}
                    className="Main-Content"
                  >
                    <Box
                      backgroundImage={backgroundScreenUrl}
                      w={'100% !important'}
                      h={'100vh'}
                      backgroundRepeat={'no-repeat'}
                      backgroundSize={'cover'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      className="Game-Screen"
                    >
                      <Box className="Images">
                        <Completion
                          getData={getData}
                          data={data}
                          setCurrentScreenId={setCurrentScreenId}
                          formData={gameInfo?.gameData}
                          imageSrc={Screen1}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* </motion.div> */}
                </>
              );
            case 7:
              return (
                <>
                  {/* <motion.div
                    initial={{ opacity: 0, background: '#000' }}
                    animate={{ opacity: 1, background: '#0000' }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  > */}
                  <Box
                    w={'100%'}
                    h={'100vh'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'relative'}
                    overflow={'visible'}
                    style={{ perspective: '1000px' }}
                    className="Main-Content"
                  >
                    <Box
                      backgroundImage={backgroundScreenUrl}
                      w={'100% !important'}
                      h={'100vh'}
                      backgroundRepeat={'no-repeat'}
                      backgroundSize={'cover'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      className="Game-Screen"
                    >
                      <Box className="Images">
                        <Takeway
                          formData={gameInfo?.gameData}
                          imageSrc={Screen4}
                          getData={getData}
                          data={data}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* </motion.div> */}
                </>
              );
            case 8:
              return (
                <>
                  {/* <motion.div
                    initial={{ opacity: 0, background: '#000' }}
                    animate={{ opacity: 1, background: '#0000' }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  > */}
                  <Box
                    w={'100%'}
                    h={'100vh'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'relative'}
                    overflow={'visible'}
                    style={{ perspective: '1000px' }}
                    className="Main-Content"
                  >
                    <Box
                      backgroundImage={backgroundScreenUrl}
                      w={'100% !important'}
                      h={'100vh'}
                      backgroundRepeat={'no-repeat'}
                      backgroundSize={'cover'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      className="Game-Screen"
                    >
                      <Box className="Images">
                        <ReplayGame
                          replayGame={replayGame}
                          setCurrentScreenId={setCurrentScreenId}
                          formData={gameInfo?.gameData}
                          imageSrc={Replay}
                          getData={getData}
                          data={data}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* </motion.div> */}
                </>
              );
            case 9:
              return (
                <>
                  {/* <motion.div
                    initial={{ opacity: 0, background: '#000' }}
                    animate={{ opacity: 1, background: '#0000' }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  > */}
                  <Box
                    w={'100%'}
                    h={'100vh'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'relative'}
                    overflow={'visible'}
                    style={{ perspective: '1000px' }}
                  >
                    <Box
                      backgroundImage={backgroundScreenUrl}
                      w={'100%'}
                      h={'100vh'}
                      backgroundRepeat={'no-repeat'}
                      backgroundSize={'cover'}
                      transform={`scale(${first ? 1 : 1.3}) translateY(${
                        first ? 0 : -10
                      }%) translateX(${first ? 0 : -10}%)`}
                      transition={'transform 0.9s ease-in-out'}
                    >
                      <Box
                        position={'fixed'}
                        top={'200px'}
                        right={'0px'}
                        bottom={0}
                        zIndex={999}
                        w={'300px'}
                      ></Box>
                    </Box>
                    <Box
                      style={{
                        transform: `scale(${showNote ? 0.2 : 1})`,
                        transition: 'transform 0.5s ease-in-out',
                      }}
                      position={'fixed'}
                      w={'40%'}
                      h={'80vh'}
                      display={'flex'}
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <Img w={'80%'} h={'80vh'} src={feedi} />
                      <Box
                        position={'fixed'}
                        w={'50%'}
                        mt={'10px'}
                        display={'flex'}
                        flexDirection={'column'}
                        textAlign={'center'}
                        justifyContent={'center'}
                        style={{
                          fontWeight: '900',
                          color: '#D9C7A2',
                          fontSize: '18px',

                          lineHeight: 1,
                          fontFamily: 'cont',
                        }}
                      >
                        {feed}
                        <Box
                          w={'100%'}
                          onClick={() => getData(data)}
                          mt={'20px'}
                          display={'flex'}
                          justifyContent={'center'}
                          cursor={'pointer'}
                        >
                          <Img src={next} w={'200px'} h={'60px'} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* </motion.div> */}
                </>
              );
            case 10:
              return (
                <>
                  <Box className="Play-game First-Screen">
                    <Box
                      position={'fixed'}
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      zIndex={999}
                    >
                      <motion.div
                        initial={{ opacity: 0, background: '#000' }}
                        animate={{ opacity: 1, background: '#0000' }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <Box className="img-box" position={'relative'}>
                          {/* <Img className='img-bg' src={`${API_SERVER}/${useData?.Response?.[0]?.gasAssetImage}`} />  */}
                          <Img className="img-bg" src={backgroundScreenUrl} />
                          <Img className="img" src={Login} loading="lazy" />
                          <Text className="heading">Atlantis</Text>
                          <Text className="welcome-text">Welcome To</Text>
                          <Text
                            className="welcome-text-name"
                            textTransform={'capitalize'}
                          >
                            The Demo Play
                          </Text>
                          <Button
                            className="btn"
                            onClick={() => setCurrentScreenId(11)}
                          ></Button>
                        </Box>
                        {/* <Button
                          position={'absolute'}
                          top={0}
                          right={0}
                          onClick={() => setCurrentScreenId(1)}
                        >
                          <Icon as={MdClose} />
                        </Button> */}
                      </motion.div>
                    </Box>
                  </Box>
                </>
              );
            case 11:
              return (
                <>
                  <ProfileScreen
                    imageSrc={backgroundScreenUrl}
                    setCurrentScreenId={setCurrentScreenId}
                    profileData={profileData}
                    setProfileData={setProfileData}
                  />
                </>
              );
            case 12:
              return (
                <>
                  <Characterspage
                    setSelectedPlayer={setSelectedPlayer}
                    players={gameInfo?.gamePlayers}
                    imageSrc={backgroundScreenUrl}
                    setCurrentScreenId={setCurrentScreenId}
                  />
                </>
              );
            case 13:
              return (
                <>
                  <ChapterPage
                    imageSrc={backgroundScreenUrl}
                    demoBlocks={demoBlocks}
                    setCurrentScreenId={setCurrentScreenId}
                  />
                </>
              );
            default:
              console.log(
                'game details of the data',
                gameInfo?.gameData,
                currentScreenId,
              );
              return <h1>Loading Screen </h1>;
          }
        })()}
      </Flex>

      <Menu isOpen={isMenuOpen}>
        <MenuButton
          p="0px"
          bg={'brandScheme'}
          position={'fixed'}
          bottom={'0'}
          right={'5px'}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleMenubtn(e)}
        >
          <Icon
            as={AiFillMessage}
            bg={'#3311db'}
            color={'#fff'}
            w="70px"
            h="70px"
            borderRadius={'50%'}
            p={'15px'}
            me="10px"
          />
        </MenuButton>
        {isMenuOpen && (
          <MenuList
            boxShadow={shadow}
            p="20px"
            me={{ base: '30px', md: 'unset' }}
            borderRadius="20px"
            bg={menuBg}
            border="none"
            mt="10px"
            minW={{ base: '360px' }}
            maxW={{ base: '360px', md: 'unset' }}
          >
            <FormLabel
              display="flex"
              ms="10px"
              // htmlFor={id}
              fontSize="sm"
              // color={textColorPrimary}
              fontWeight="bold"
            >
              {/* // _hover={{ cursor: 'pointer' }}>
				//  {label} */}
              <Text fontSize="sm" fontWeight="400" ms="2px">
                {'Feedback Options'}
                <Text as="span" color="red.500">
                  *
                </Text>
              </Text>
            </FormLabel>
            <Select
              mb="10px"
              me="30px"
              id="tab"
              name="tab"
              onChange={handleTabSelection}
            ><option value={''}>Select</option>
              {filteredTabOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>

            {/* <SelectField
              mb="10px"
              me="30px"
              id="tab"
              name="tab"
              label="Feedback Options"
              // labelStyle={{ fontSize: 18, fontWeight: 700 }}
              options={filteredTabOptions}
              onChange={handleTabSelection}
              style={{ fontSize: '18px' }}
              isRequired={true}
            /> */}
            {reviewInput?.tabId !== null &&
              reviewInput?.tabId !== undefined &&
              reviewSubTabOptions?.length > 0 && (
                <SelectField
                  mb="10px"
                  me="30px"
                  id="subtab"
                  name="subtab"
                  label="Secondary Options"
                  fontSize={'md'}
                  options={reviewSubTabOptions}
                  onChange={handleSubTabSelection}
                  isRequired={true}
                />
              )}
            <FormControl>
              <FormLabel fontSize={'sm'} fontWeight={700} pl="4">
                Feedback
              </FormLabel>
              <Textarea
                resize="none"
                w="100%"
                h="200px"
                border="1px solid #CBD5E0"
                borderRadius="20px"
                p="4"
                placeholder="Please Share your Thoughts..."
                onChange={handleReview}
              />
              <Text color="#CBD5E0" fontSize={{ base: 'sm', '2xl': 'md' }}>
                {'Maximum of 250 characters...'}
              </Text>
            </FormControl>
            <MenuItem>
              <Box w={'100%'} display={'flex'} justifyContent={'flex-start'}>
                <Button
                  bg="#11047a"
                  _hover={{ bg: '#190793' }}
                  color="#fff"
                  h={'46px'}
                  w={'128px'}
                  mr={'33px'}
                  mt={'7px'}
                  onClick={() => hanldeClose()}
                >
                  close
                </Button>
              </Box>

              <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
                <Button
                  bg="#11047a"
                  _hover={{ bg: '#190793' }}
                  color="#fff"
                  h={'46px'}
                  w={'128px'}
                  mr={'33px'}
                  mt={'7px'}
                  onClick={() => hanldeSubmit(reviewInput)}
                  isDisabled={!isFormValid}
                >
                  Submit
                </Button>
              </Box>
            </MenuItem>
          </MenuList>
        )}
      </Menu>
      {audio && (
        <audio ref={audioRef} controls style={{ display: 'none' }}>
          <source src={audio} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </ProfileContext.Provider>
  );
};

export default EntirePreview;
