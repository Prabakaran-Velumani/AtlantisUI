// ALTER TABLE `lmsgame` ADD `gameQuestNo` INT(100) NULL AFTER `gameId`;
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Img,
  Input,
  List,
  ListIcon,
  ListItem,
  Progress,
  SimpleGrid,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  VStack,
  useSteps,
  keyframes,
  useToast,
  Heading,
  Collapse,
  StepDescription,
  useColorModeValue,
  HStack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { MdOutlineSubtitles } from 'react-icons/md';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import CharacterPreview from './CharacterPreview';
import { motion } from 'framer-motion';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { GoVerified, GoUnverified, GoDotFill, GoCodeReview } from 'react-icons/go';
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import Log from 'assets/img/games/log.png';
import Level from 'assets/img/games/new-level-final.png';
import Character from 'assets/img/games/select-character-final.png';
import Badges from 'assets/img/games/badges-game-read-format.png';
import GameCard from './gameCard';
import StepperBar from './StepperBar';
import {
  getImages,
  getNonPlayer,
  getPlayer,
  updateGame,
  getGameById,
  addgame,
  createSkills,
  createCategories,
  uploadAudio,
  uploadBadge,
  createReflection,
  getCreatorBlocks,
  getBadge,
  getAudio,
  getVoices,
  getStory,
  getBlocks,
  getListStory, getDefaultSkill,
  getReflection,
  setStory,
  getPreview,
  QuestDeletion,
  getCompletionScreen,
  UpdateCompletionScreen,
  getTotalMinofWords,
  getStoryValidtion,
} from 'utils/game/gameService';
import { useParams } from 'react-router-dom';
import AboutStory from './AboutStory';
import GreetingsForm from './GreetingsForm';
import Customization from './Customize';
import IconBox from 'components/icons/IconBox';
import { TbView360 } from 'react-icons/tb';
import { FaRobot } from 'react-icons/fa';
import { MdPageview } from 'react-icons/md';
import { GiBlackBook } from 'react-icons/gi';
import { FaCubes } from 'react-icons/fa';
import { MdTune } from 'react-icons/md';
import { MdRocketLaunch } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import {
  MdCheckCircle,
  MdSettings,
  MdMyLocation,
  MdImage,
  MdIncompleteCircle,
  MdArrowCircleRight,
  MdArrowCircleLeft,
  MdEdit,
  MdPointOfSale,
  MdShoppingBasket,
  MdArchive,
  MdLocalShipping,
} from 'react-icons/md';
import { TfiRulerPencil } from 'react-icons/tfi';
import { BsShareFill } from 'react-icons/bs';
import AddScores from './AddScores';
import CompletionScreen from './Completion';

import Background from 'assets/img/stepper/background.png';
import Block from 'assets/img/stepper/blocks.png';
import pose from 'assets/img/stepper/pose.png';
import stroy from 'assets/img/stepper/stroy.png';
import scores from 'assets/img/stepper/scores.png';
// import endflag from 'assets/img/stepper/endflag.png'
import endflag from 'assets/img/stepper/reached.png';
import summary from 'assets/img/stepper/summary.png';
import NftStepper from 'assets/img/nfts/NftStepper.png';
import Stepbg from 'assets/img/product/product-footer.png';
import Stepbg1 from 'assets/img/product/OverviewBanner.png';
import Stepbg2 from 'assets/img/ecommerce/Details.png';
import OrderStep from 'components/dataDisplay/OrderStep';
import { TbProgress } from "react-icons/tb";
import ImagePreview from './ImagePreview';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import routes from 'routes';
import { error } from 'console';
import { IoIosPersonAdd } from 'react-icons/io';
import ShareReviewTable from './ShareReview';
import tableDataCheck from 'views/admin/dashboards/rtl/variables/tableDataCheck';
import EntirePreview from './EntirePreview';
const steps = [
  { title: 'BackGround' },
  { title: 'Non Playing Charater' },
  { title: 'About Story' },
  { title: 'Blocks' },
  { title: 'Score' },
  { title: 'Summaries' },
  { title: 'Endpage' },
];
interface ReflectionQuestion {
  length(arg0: string, length: any): unknown;
  ref1: any;
  ref2: any;
  ref3: any;
  ref4: any;
}
interface MyObject {
  seqs: any;
  option: any;
  secondaryId: any;
}

const GameCreation = () => {
  ///////////////////Navin 15-12///////////////////////////////////
  //stroy//
  const [questTabState, setQuestTabState] = useState<number>(1);
  const [currentTab, setCurrentTab] = useState(0);
  const [openQuest, setOpenQuest] = useState(false);
  const [input, setInput] = useState<any>({});
  const [items, setItems] = useState<any>([]);
  const [alphabet, setAlphabet] = useState<any>([]);
  const [showFunction, setShowFunction] = useState<any>('');
  const [interactionBlock, setInteractionBlock] = useState<any>();

  const [countalphabet, setAlphabetCount] = useState<any>(0);
  const [count, setCount] = useState<any>(1);
  const [sequence, setSequence] = useState<any>([]);
 
  const [dummySequence, setDummySequence] = useState<any>([]);
  //////////////////navin/////////////////////////
  const [BlockItems, setBlockItems] = useState<any>(null);
  const [isDeleteSeq, setDeleteseq] = useState<any>(false);
  const reflectionQuestionsdefault = ["What were your biggest learnings?", "How can you apply these learnings back at work?", "'What's one thing you learned about your mindset?",
    "What's one thing you are committing to change?"];
  const [reflectionQuestions, setReflectionQuestions] = useState({
    ref1: 'What were your biggest learnings?',
    ref2: 'How can you apply these learnings back at work?',
    ref3: 'What\'s one thing you learned about your mindset?',
    ref4: 'What\'s one thing you are committing to change?',
  })

  const [Defaultstatus, setDefaultstatus] = useState(false);
  const [listBlockItems, setListBlockItems] = useState(null);
  const [listQuest, setListQuest] = useState(null);
  const [serias, setserias] = useState(1);
  const [targetSequence, setTargetSequence] = useState<any>();
  const [copySequence, setCopySequence] = useState<any>();
  const [badge, setBadge] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const [tab, setTab] = useState<number>(1);
  const [img, setImg] = useState<any[]>([]),
    [hoveredStates, setHoveredStates] = useState(Array(img.length).fill(false)),
    [showFullTextStates, setShowFullTextStates] = useState(
      Array(img.length).fill(false),
    ),
    [toggle, setToggle] = useState<any>(),
    [values, setValues] = useState<any>('Select'),
    [preview, setPreview] = useState<any>(),
    [players, setPlayers] = useState<any[]>([]);
  const [reflection, setReflection] = useState([]);
  const [showSelectBlock, setSelectBlock] = useState<any>([]);



  /** To stop load data after naviagte from another game based on Extension*/
  const [extensiveNavigation, setExtensiveNavigation] =
    useState<number | null>(null);


  ///////reflectionQuestions///////////////

  const handleReflectionInput = (e: any, i?: any) => {

    setReflectionQuestions((prevref: any) => {
      // const noteKey = `Note`;       
      const refkey = `ref${i - 1}`;
      const reflecation = e.target.id === `reflectionQuestion${i - 1}` ? e.target.value : null;
      return {
        ...prevref,
        [refkey]: reflecation
      }
    })
    console.log('reflectionQuestions', reflectionQuestions)

  }

  const handlesaveReflection = async () => {
    const data = {
      reflectionQuestions: reflectionQuestions,
      gameReflectionQuestion: formData.gameReflectionQuestion,
      gameId: id,
    }
    console.log('handlesaveReflection', data)
    const datas = JSON.stringify(data);
    const resu = await createReflection(datas);

    if (resu.status !== 'Success') {
      toast({
        title: 'Question not processed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    else {

    }



  }

  const textHover = useColorModeValue(
    { color: 'secondaryGray.900', bg: 'unset' },
    { color: 'secondaryGray.500', bg: 'unset' },
  );
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgList = useColorModeValue('white', 'whiteAlpha.100');
  const bgShadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset',
  );
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' },
  );
  const bgFocus = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' },
  );


  ////////////////////////////////////////////



  const [show, setShow] = useState(null);
  enum SummaryState {
    Yes = 'yes',
    No = 'no',
  }

  enum feedBackForm {
    Yes = 'yes',
    No = 'no',
  }

  const [isOpenSummary, setIsOpenSummary] = useState<SummaryState>(
    SummaryState.No,
  );
  const [cblocks, setCblocks] = useState([]);
  const [quest, setQuest] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [autosave, setAtuoSave] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [isSave, setIsSave] = useState(false);
  //////////////////////Changes-14/12/23///////////////////////////////////////
  const [selections, setSelections] = useState(Array(img.length).fill(false));
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  ////////////////////////////////////////////////////////////////////////////
  //navin
  const [showBadge, setShowBadge] = useState(null);
  const [selectedAud, setSelectedAud] = useState(null);
  const [previewId, setPreviewId] = useState(null);
  //navin  
  const [fetchImg, setFetchImg] = useState<any>(''),
    [upNextCount, setUpNextCount] = useState<any>([]),
    [upNext, setUpNext] = useState<any>(),
    [number, setNumber] = useState<any>([]),
    [fetchPlayerImg, setFetchPlayerImg] = useState<any>(''),
    [selectedPlayer, setSelectedPlayer] = useState<any>(''),
    [backgroundIndex, setBackgroundIndex] = useState<any>(),
    [sentAud, setSentAud] = useState(null),
    [defaultskills, setDefaultSkills] = useState([]),
    [tags, setTags] = useState<any[]>([]),
    [nonPlayer, setNonPlayer] = useState(),
    [clicked, setClicked] = useState(false),
    [cat, setCat] = useState([]),
    [enter, setEnter] = useState(false),
    [entire, setEntire] = useState(false),
    [share, setShare] = useState(false),
    [bgIndex, setBgIndex] = useState<number>(),
    [formData, setFormData] = useState({
      gameQuestNo: null,
      gameCategoryId: null,
      gameabstract: null,
      gameBibliography: null,


      gameMaxScore: null,
      gameBackgroundId: null,
      gameCourseType: 'Public',
      gameNonPlayingCharacterId: null,

      //navin
      gameNonPlayerName: null,
      gameNonPlayerVoice: null,
      gamePlayerMaleVoice: null,
      gamePlayerFemaleVoice: null,
      gameNarratorVoice: null,

      //navin
      ///Afrith
      gameStoryLine: '',
      gameReflectionQuestion: 4,
      gameRefQuestion1: '',
      gameRefQuestion2: '',
      gameRefQuestion3: '',
      gameRefQuestion4: '',
      ///
      gameAnimationId: null,
      gameTitle: '',
      // gameStoryLine: '',
      gameSkills: '',
      gameLearningOutcome: '',
      gameDuration: null,
      gameAuthorName: '',
      gameIsShowLeaderboard: 'false', //indu --from
      gameIsShowReflectionScreen: 'false',
      gameTakeawayContent: '',
      gameAdditionalWelcomeNote: '',
      gameThankYouMessage: '',
      gameIsCollectLearnerFeedback: 'false',
      gameIsFeedbackMandatory: 'false',
      gameIsLearnerMandatoryQuestion: 'false',
      // gameIsAddanotherQuestions:'',


      // gameScreenTitle: 'Quest Complete',
      gameIsSetCongratsSingleMessage: 'false',






      gameIsShowTakeaway: 'false',
      gameIsShowSkill: 'false',
      gameIsShowStoryline: 'false',
      gameIsShowLearningOutcome: 'false',
      gameIsShowGameDuration: 'false',
      gameIsShowAuhorName: 'false',
      gameIsShowAdditionalWelcomeNote: 'false',
      gameReplayAllowed: null,
      gameReflectionpageAllowed: null,
      gameLeaderboardAllowed: null,
      gameReflectionPageId: null,
      gamelanguageId: '',
      gameSummarizes: null,
      gameThankYouPage: null,
      gamWelcomePageText: null,
      gameScormVersion: null,
      gameSummaryScreen: null,
      gameLaunchedWithinPlatform: null,
      gameLastTab: null,
      gameLastTabArray: null,
      refQuestion: [],
      gameDownloadedAsScorm: null,
      gameDefaultFeedbackForm: null,
      gameFeedbackQuestion: null,
      gameLanguageId: null,
      gameShuffle: 'false',
      // gameIsShowInteractionFeedBack: '',
      gameDisableOptionalReplays: 'false',
      gameTrackQuestionWiseAnswers: 'false',
      gameDisableLearnerMailNotifications: 'false',
      gameIntroMusic: null,
      gameIntroMusicName: null,
      gameGameStage: 'Creation',
      gameCompletionScreenId: null,
      gameLeaderboardScreenId: null,
      // gameReflectionPageId: null,
      gameReflectionScreenId: null,
      gameTakeawayScreenId: null,
      gameWelcomepageBackgroundScreenId: null,
      gameThankYouScreenId: null,
      //navin 16-12

      // gameCompletionScreenId:null,
      // gameLeaderboardScreenId:null,
      // gameTakeawayScreenId:null,
      // gameWelcomepageBackgroundScreenId:null,
      // gameThankYouScreenId:null,
      //navin
      gameQuestion1: 'false',
      gameQuestion2: 'false',
      gameQuestionValue1: '',
      gameQuestionValue2: '',
      gameQuestionValue3: '',
      gameQuestionValue4: '',
      gameContent: 'false',
      gameRelevance: 'false',
      gameBehaviour: 'false',
      gameOthers: 'false',
      gameGamification: 'false',
      gameRecommendation: 'false',
      gameFeedBack: 'false',
      gameFeedBackLink: '',
    });
  const [compliData, setCompliData] = useState({
    0: {
      gameQuestNo: null,

      gameTotalScore: 0,
      gameIsSetMinPassScore: null,
      gameMinScore: null,
      gameIsSetDistinctionScore: null,
      gameDistinctionScore: null,
      gameIsSetSkillWiseScore: null,
      gameIsSetBadge: null,
      gameBadge: null,
      gameBadgeName: null,
      gameIsSetCriteriaForBadge: null,
      gameAwardBadgeScore: null,
      gameScreenTitle: null,
      gameCompletedCongratsMessage: null,
      gameIsSetCongratsScoreWiseMessage: null,
      gameMinimumScoreCongratsMessage: null,
      gameaboveMinimumScoreCongratsMessage: null,
      gameLessthanDistinctionScoreCongratsMessage: null,
      gameAboveDistinctionScoreCongratsMessage: null,


    },


  });
  const [Completion, setCompletion] = useState<any>({});
  const [CompKeyCount, setCompKeyCount] = useState<any>(0);
  const [prevdata, setPrevdata] = useState();
  const { id } = useParams();
  const inputRef = useRef<HTMLButtonElement>(null);
  const [voices, setVoices] = useState([]);
  // console.log('gameSkills',formData.gameSkills)
  const voic = async () => {
    const result = await getVoices();

    if (result) {
      setVoices(result?.voices)
    };
  }
  ////////////////Over view //////////////
  const fetchDefaultSkill = async () => {

    const result = await getDefaultSkill(id);
    if (result?.status !== 'Success') return console.log('getSkills Error :', result?.error)
    // console.log('getSkills',result?.data)
    if (result?.data) {
      console.log('result.data', result?.data)
      setDefaultSkills(result?.data);
    } else {
      setDefaultSkills([]);
    }

  }
  useEffect(() => {

    if (defaultskills.length === 0 && id) {

      fetchDefaultSkill();
    }

  }, [id])
  /////////////////////////////////
  useEffect(() => {
    voic();
  }, [])
  const fetchData = async () => {
    const result = await getImages(1);
    if (result?.status !== 'Success')
      return console.log('getbackruond error:' + result?.message);

    setImg(result?.data);
    const players = await getImages(2);
    if (players?.status !== 'Success')
      return console.log('getbackruond error:' + players?.message);
    setPlayers(players?.data);
  };
  interface OptionType {
    value: string;
    label: string;
  }
  useEffect(() => {

    const setAudioInPage = async () => {
      const res = await getAudio(parseInt(id));
      if (res?.status === 'Success') {
        console.log(res.data);
        setSelectedAud(res?.data)
      }
    }
    if (tab == 6) {
      setAudioInPage();
    }
    setFormData((prev) => ({ ...prev, gameLastTab: tab }));

    if (tab == 5) {
      handleCompletionScreen(1);
    }
  }, [tab]);
  const handleBackGroundImage = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      gameWelcomepageBackground: e.target.id,
    }));
  };
  {/**************Changes-14/12/23**********************/ }
  const handleH = (i: any) => {
    setBackgroundIndex(i);
  }
  const handleL = () => {
    // setIsHovered(false)
    setBackgroundIndex('');
  }
  {/****************************************************/ }
  //////Changes-14/Dec/23//////////////////////
  const handlePreview = (img: any, backgroundIndex: any, i: any) => {

    setPreview(true)
    setFetchImg((prev: any) => {
      return { ...prev, gasId: img?.gasId, gasAssetImage: img?.gasAssetImage, gasAssetName: img?.gasAssetName, backgroundIndex, i, temp: { tempTitle: img.temp.tempTitle, tempStoryLine: img.temp.tempStoryLine } }
    });
    onOpen();


    // console.log('SavedSTATE--',savedState);
  }
  ///////////////////////////////////////////////
  const fetch = async () => {
    const result = await getBadge(parseInt(id));
    if (result?.status === 'Success') {
      setShowBadge(result?.data)
    };
    const res = await getAudio(parseInt(id));
    if (res?.status === 'Success') {
      setSelectedAud(res?.data)
    }
  }
  //////////////Changes - 12-Dec-23/////////////////////
  const handlePreviewPlayer = (player: any, backgroundIndex: any, i: any) => {
    setPreview(true);
    setFetchPlayerImg((prev: any) => {
      return {
        ...prev,
        pid: player?.gasId,
        pimg: player?.gasAssetImage,
        pname: player?.gasAssetName,
        backgroundIndex,
        i,
      };
    });
    onOpen();
    // console.log('BackgroundIndex--',backgroundIndex);
  };
  const fetchGameId = async () => {
    const images = await getCreatorBlocks(id);
    if (images?.status !== 'Success') {
      console.log(images.message);
    }
    else {
      setCblocks(images.data);
      setQuest(images.quest)

    }

    const prev = await getPreview(id);
    if (prev && prev?.status !== 'Success') {
      console.log(prev.message);
    } else {
      setPrevdata(prev?.data);
    }

    const gameById = await getGameById(id);
    if (gameById?.status !== 'Success')
      return console.log('error:' + gameById?.message);
    setDefaultstatus(true);
    setFormData(gameById?.data);
    // const lastTab = gameById?.data?.gameLastTabArray[gameById.data.gameLastTabArray.length - 2];
    // const lastTab = gameById?.data?.gameLastTabArray[gameById.data.gameLastTabArray.length - 2];
    const stringContainingNumbers = gameById?.data?.gameLastTabArray;
    const stringGameLastTab = gameById?.data?.gameLastTab;
    // alert(stringGameLastTab);
    if (gameById?.data?.gameGameStage === null || gameById?.data?.gameGameStage === '') {
      alert(gameById?.data?.gameGameStage)
      setFormData((prev) => ({ ...prev, gameGameStage: 'Creation' }));
    }
    if (stringGameLastTab === 111) {
      setTab(1);
      setFormData((prev) => ({ ...prev, gameLastTab: 1 }));
    }

    else if (stringContainingNumbers) {
      const numbersArray = stringContainingNumbers?.match(/\d+/g);
      const lastValue = numbersArray[numbersArray?.length - 1];
      console.log('parseInt(lastValue)', numbersArray?.length);
      if (numbersArray?.length === 1) {


        setTab(2);
        setFormData((prev) => ({ ...prev, gameLastTab: 2 }));

      } else {
        setTab(parseInt(lastValue));
      }

    }


    const storedSelectedIndex = localStorage.getItem('selectedCardIndex');
    if (storedSelectedIndex !== null) {
      setSelectedCardIndex(parseInt(storedSelectedIndex));
    }


    const storedReflection = await getReflection(id);
    if (storedReflection?.status !== 'Success')
      // return alert('error:' + gameById?.message);
      console.log('storedReflection', storedReflection.data)

    setReflectionQuestions(storedReflection.data);
    setAtuoSave(true);

    // setTab(gameById?.data?.gameLastTab)
  };

  const handleGet = async (quest: number) => {
    setAtuoSave(false);
    console.log('handleGet');
    // return false;
    try {
      const data = {
        quest: quest,
      }
      const result = await getStory(id, JSON.stringify(data));

      if (result?.status !== 'Success') {
        return console.log('updateBackground error :' + result?.err);

      }
      else {

        setserias(result.serias)
        setCount(result.count);
        if (result.alpacount) {
          setAlphabetCount(result.alpacount)
        }
        if (result.maxInput) {
          // console.log('result.nextserios',result.nextserios);
          // console.log('result1', result.items)
          const itemsArray = Object.values(result.items);
          let sequance = itemsArray.map((it: any) => it.id);
          let upNext = itemsArray.map((it: any) => it.upNext);
          console.log('sequancesequance', itemsArray)
          setSequence(sequance);
          setUpNextCount(upNext);
          setDummySequence(sequance);
          // console.log('result.maxInput',result.maxInput)
          setItems(itemsArray);
          setInput(result.input);
          setAlphabet(Object.values(result.alp));
          setInteractionBlock(result.intra);
          setBlockItems(result.items);
        } else {
          console.log('else part')
          setItems([]);
          setSequence([]);
          setUpNextCount([]);
          setDummySequence([]);
          setInput([]);
          setInteractionBlock([]);
          setBlockItems([]);
        }
        setTimeout(() => {
          setAtuoSave(true);
        }, 2000);

        // const itemsData = Object.values(itemsArray)
        // const itemDataArr = itemsData.map((item: any) => item)
        // const data = itemDataArr.slice(-1).find((item: any) => item)?.upNext
        // setUpNext(data);
        // console.log('data', itemsData);
        // console.log('getInput', input)
        // itemsData.forEach((item: any, i: number) => {
        //     console.log('well', item);
        //     setSequence((prev: any) => [...prev, item.id]);
        //     setDummySequence((prev: any) => [...prev, item.id]);
        // })

        // const data = getSequence
        // console.log('data',  data);
        // console.log('getInput', result)
      }

    } catch (error) {
      setAtuoSave(true);
      console.error('An error occurred while sending the request:', error);
    }

  }
  const handleCompletionScreen = async (quest: number) => {
    setAtuoSave(false);

    // return false;
    try {
      const data = {
        quest: 1,
      }
      const result = await getCompletionScreen(id, JSON.stringify(data));

      if (result?.status !== 'Success') {
        setAtuoSave(true);
        console.log('updateBackground error :' + result?.err);
        return false;
      }
      else {

        setCompletion(result?.data);
        setCompliData(result?.data);
        console.log('Completion', Object.keys(result?.data).length);
        setCompKeyCount(Object.keys(result?.data).length - 1)
        setCurrentTab(0);
        console.log('handleGet');
        setAtuoSave(true);
      }
    }
    catch (error) {


      setAtuoSave(true);
      console.error('An error occurred while sending the request:', error);
    }

  }
  const handleCompliStore = async () => {

    console.log('handleCompliStore', compliData);
    try {
      let data = JSON.stringify(compliData);


      const result = await UpdateCompletionScreen(id, data);
      if (result?.status !== 'Success') {
        console.log('data not updated')
      }


    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }

  }
  const getDuration = async () => {

    try {



      const result = await getTotalMinofWords(id);
      if (result?.status !== 'Success') {
        console.log('data not updated')
        return false;
      }

      setFormData({
        ...formData,
        gameDuration: result.totalMinutes,
      });
      console.log('getDuration', formData.gameDuration)

    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }
  }
  console.log('compliData', compliData);
  const fetchGameIdUpdate = async () => {
    const gameById = await getGameById(id);
    if (gameById?.status !== 'Success')
      console.log('error:' + gameById?.message);


    const storedSelectedIndex = localStorage.getItem('selectedCardIndex');
    if (storedSelectedIndex !== null) {
      setSelectedCardIndex(parseInt(storedSelectedIndex));
    }
    // setTab(gameById?.data?.gameLastTab)
  };
  const [intercount, setIntercount] = useState(0);
  const fetchBlockCount = async () => {

    const getblockcount = await getBlocks(id);
    //alert(id);
    if (getblockcount?.status === 'Success') {
      setIntercount(getblockcount?.count);

      //alert(getblockcount?.count);
    }
  }
  const fetchBlocks = async () => {

    // const result1 = await getStory(id);
    // if (result1?.status !== 'Success') {de
    //   console.log(result1.message);


    // }
    // else {

    //   setBlockItems(result1.items);
    //   setserias(result1.serias);
    // }
    const result2 = await getListStory(id);

    if (result2?.status !== 'Success') {

      console.log(result2?.message);
    }
    else {
      setListBlockItems(result2.BlockObject)
      console.log('result2.gameIn', result2.gameIn);
      setListQuest(result2.gameIn)


    }

  };

  useEffect(() => {
    fetchData();
    if (id) {
      setAtuoSave(false);
      fetchGameId();
      fetchBlocks();
      handleGet(1);
      fetchBlockCount();
      setExtensiveNavigation(null);
      handleCompletionScreen(1)
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      fetchBlocks();
    }
  }, [id, items])

  console.log('navin testing :', formData)
  const handleEntirePrev = () => {
    setEntire(true);
    onOpen();
  };
  const handleShareReview = () => {
    setEntire(false);
    setShare(true);
    onOpen();
  };

  const handleTrans = (tabs: number) => {
    let tabArray: number[] = [];


    if (!formData?.gameLastTabArray?.includes(tabs)) {
      const stringContainingNumbers = formData.gameLastTabArray;
      if (typeof stringContainingNumbers === 'string') {
        tabArray = (stringContainingNumbers.match(/\d+/g) || []).map(Number);
      }
    } else {
      tabArray = formData.gameLastTabArray;
    }

    let lastValue: number;
    if (tabArray.length > 0) {
      lastValue = tabArray[tabArray.length - 1];
      console.log('Last value in tabArray:', lastValue);
    } else {
      console.log('tabArray is empty');
    }


    // console.log('formData.gameLastTabArray', formData.gameLastTabArray, '--tabs--', tabs);


    // console.log("formData.gameSkills", formData.gameSkills);//crSkillName
    console.log('tab < tabs', tab > tabs);
    if (tab > tabs) {

      setTab(tabs);

    }


    if (tab < tabs) {

      if (tabArray.includes(tabs) || tabs === lastValue + 1) {

        if (tab === 1) {
          if (!formData.gameBackgroundId) {
            toast({
              title: 'Please Select a background image.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;
          }
        }
        if (tab === 2) {
          if (!formData.gameNonPlayerName) {
            toast({
              title: 'Please Enter a NonplayerName.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;
          }
          if (!formData.gameNonPlayingCharacterId) {
            toast({
              title: 'Please Select a Character image.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;
          }
          if (!formData.gameNonPlayerVoice) {
            toast({
              title: 'Please Select a NonPlayer Voice.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;
          }
          if (!formData.gamePlayerMaleVoice) {
            toast({
              title: 'Please Select a Male Voice.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;
          }
          if (!formData.gamePlayerFemaleVoice) {
            toast({
              title: 'Please Select a Female Voice.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;
          }
          if (!formData.gameNarratorVoice) {
            toast({
              title: 'Please Select a Narrator Voice.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;
          }
        }

        if (tab === 3) {
          if (!formData.gameTitle) {
            toast({
              title: 'Please Enter The Story Title',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });

            return false;
          }
          if (!formData.gameSkills || formData.gameSkills.length === 0) {
            toast({
              title: 'Please Enter The Skills',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });

            return false;
          }
          if (!formData.gameCategoryId || formData.gameCategoryId.length === 0) {
            toast({
              title: 'Please Enter The Category',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });

            return false;
          }
        }


        if (tab === 4) {
          console.log("inputDataitems", items, items.length);
          if (items.length !== 0) {
            if (typeof items === 'object' && items !== null) {
              var inputData = items;
              console.log("inputData", inputData);


              for (var i = 0; i < inputData.length; i++) {
                var key = inputData[i];
                var inputkey = key.type + key.input;

                console.log("key", key);

                if (key.type === "Note") {
                  var note = input[inputkey]?.note;

                  if (!note) {

                    toast({
                      title: `Note is Empty On This Sequence ${key.id} `,
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                    return false;

                  }

                }
                if (key.type === "Dialog") {
                  console.log('dialogue', input[inputkey]?.dialog);
                  var Dialog = input[inputkey]?.dialog;
                  var animation = input[inputkey]?.animation;
                  var voice = input[inputkey]?.voice;

                  if (!Dialog) {

                    toast({
                      title: `Dialogue is Empty On This Sequence ${key.id} `,
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                    return false;

                  }
                  if (!animation) {

                    toast({
                      title: `Animation is Empty On This Sequence ${key.id} `,
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                    return false;

                  }


                }
                if (key.type === "Interaction") {

                  console.log("keyinput", key.type + key.input);
                  var QuestionsEmotion = input[inputkey]?.QuestionsEmotion;
                  var blockRoll = input[inputkey]?.blockRoll;
                  var interaction = input[inputkey]?.interaction;
                  console.log("QuestionsEmotion", QuestionsEmotion);
                  console.log("blockRoll", blockRoll);
                  console.log("interaction", interaction);
                  if (!interaction) {
                    toast({
                      title: `Interaction is Empty On This Sequence ${key.id} `,
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                    return false;


                  }
                  if (!QuestionsEmotion || QuestionsEmotion === undefined) {
                    toast({
                      title: `Questions is Empty On This Sequence ${key.id} `,
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                    return false;

                  }
                  if (!blockRoll) {
                    toast({
                      title: `BlockRoll is Empty On This Sequence ${key.id} `,
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                    return false;

                  }
                  if (typeof alphabet === 'object' && alphabet !== null) {
                    var alphabetData = alphabet;

                    // alphabetData?.filter((alp: any) => key.id === alp.seqs).map((alp: any, i: number, arr: any[]) => {
                    for (const alp of alphabetData?.filter((alp: any) => key.id === alp.seqs) || []) {
                      console.log("alpha", input[inputkey]?.optionsObject[alp.option]);
                      if (!input[inputkey]?.optionsObject[alp.option]) {
                        var option = alp.option;
                        toast({
                          title: `${option} is Empty On This Sequence ${key.id} `,
                          status: 'error',
                          duration: 3000,
                          isClosable: true,
                        });
                        return false;
                      }
                      if (!input[inputkey]?.optionsemotionObject[alp.option]) {
                        var option = alp.option;
                        toast({
                          title: `${option} is Empty On This Sequence ${key.id} Please Select`,
                          status: 'error',
                          duration: 3000,
                          isClosable: true,
                        });
                        return false;

                      }
                      let isAtLeastOneTrue = false;

                      for (const option of alphabet.map((alp: any) => alp.option)) {
                        if (input[inputkey]?.ansObject[option] === 'true' || input[inputkey]?.ansObject[option] === true) {
                          const ansValue = input[inputkey]?.ansObject[option];
                          console.log("ansValue", ansValue)
                          console.log("hit2")
                          isAtLeastOneTrue = true;
                          if (!input[inputkey]?.scoreObject[option]) {
                            console.log("hit3")
                            toast({
                              title: `${option} Score is Empty On This Sequence ${key.id}`,
                              status: 'error',
                              duration: 3000,
                              isClosable: true,
                            });
                            return false;
                          }
                        }
                      }
                      if (!isAtLeastOneTrue) {
                        console.log("hit1")
                        toast({
                          title: `At least one option must be selected on this sequence ${key.id}`,
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



            }
          }
          else {
            toast({
              title: `Create Your Story !!`,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;

          }

        }

        setTab(tabs);

      }



    }



    // if (tab != tabs) {
    //   if (formData.gameLastTabArray.includes(tabs)) {
    //     setTab(tabs);
    //   } else {
    //     console.log('tabs2', tabs);
    //     const stringContainingNumbers = formData.gameLastTabArray;
    //     if (typeof stringContainingNumbers === 'string') {
    //       const numbersArray = (stringContainingNumbers as string).match(/\d+/g);
    //       const lastValue = numbersArray ? parseInt(numbersArray[numbersArray.length - 1], 10) : null;
    //       if (tabs === lastValue + 1) {
    //         setTab(tabs);
    //       }
    //     }
    //   }
    // }
  }
  ///navin 15-12

  //navin
  const handleNext = async () => {
    const selectedOptions = [
      formData.gameContent,
      formData.gameRecommendation,
      formData.gameRelevance,
      formData.gameGamification,
      formData.gameBehaviour,
      formData.gameOthers,
    ];
    const countSelectedOptions = selectedOptions.filter(option => option !== '' && option !== 'false' && option !== undefined && option !== null).length;
    if (formData.gameIsCollectLearnerFeedback === "true") {
      if (countSelectedOptions === 0 || countSelectedOptions > 4) {
        toast({
          title: 'Please select atleast one option and maximum 4 options',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return false;
      }
      if (formData.gameFeedBack === 'true' && formData.gameFeedBackLink === '') {
        toast({
          title: 'Please Enter Feedback Link',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return false;
      }
    }
    let data = JSON.stringify(formData);
    // alert("cn"+tab);
    const result = await updateGame(id, data);
    if (result?.status !== 'Success') {
      toast({
        title: 'Data Not Updated.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return console.log('updateBackground error :' + result?.err);
    }
    if (tab === 5 && result.status === 'Success') {
      // alert("comnex"+tab);
      // setOpenQuest(true);
      toast({
        title: 'All Screens are Updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });

      const { gameLastTab, ...formDataWithoutLastTab } = result?.data;
      setFormData(formDataWithoutLastTab);

      // setTab(tab + 1);
      // setTimeout(() => {

      setOpenQuest(true);
    }
  }
  console.log('formdata', formData.gameLastTabArray)
  const commonNextFunction = async () => {

    if (tab === 1 && !formData.gameBackgroundId) {
      toast({
        title: 'Please Select a background image.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (tab === 2) {

      console.log('formdata', formData.gameLastTabArray)
      if (!formData.gameNonPlayerName) {
        toast({
          title: 'Please Enter a NonplayerName.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      if (!formData.gameNonPlayingCharacterId) {
        toast({
          title: 'Please Select a Character image.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      if (!formData.gameNonPlayerVoice) {
        toast({
          title: 'Please Select a NonPlayer Voice.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      if (!formData.gamePlayerMaleVoice) {
        toast({
          title: 'Please Select a Male Voice.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      if (!formData.gamePlayerFemaleVoice) {
        toast({
          title: 'Please Select a Female Voice.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      if (!formData.gameNarratorVoice) {
        toast({
          title: 'Please Select a Narrator Voice.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      // return false;
    }
    if (tab === 3) {

      if (!formData.gameTitle) {
        toast({
          title: 'Please Enter The Story Title',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

        return false;
      }
      if (!formData.gameSkills || formData.gameSkills.length === 0) {
        toast({
          title: 'Please Enter The Skills',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

        return false;
      }
      if (!formData.gameCategoryId || formData.gameCategoryId.length === 0) {
        toast({
          title: 'Please Enter The Category',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

        return false;
      }
      let cate = JSON.stringify(cat);
      let da = JSON.stringify(tags);
      const res = await createSkills(id, da);
      const cats = await createCategories(id, cate);
      if (res?.status !== 'Success' && res?.data.length === 0) return toast({
        title: 'Cannot Skills',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      if (cats?.status !== 'Success' && cats?.data.length === 0)
        return toast({
          title: 'Cannot Skills',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
    }
    if (tab === 4) {

      if (items.length !== 0) {
        console.log("items567", items);
        if (items.some((item: any) => item.type === 'Interaction')) {

          if (typeof items === 'object' && items !== null) {
            var inputData = items;
            console.log("inputData", inputData);


            for (var i = 0; i < inputData.length; i++) {
              var key = inputData[i];
              var inputkey = key.type + key.input;

              console.log("key", key);

              if (key.type === "Note") {
                var note = input[inputkey].note;

                if (!note) {

                  toast({
                    title: `Note is Empty On This Sequence ${key.id} `,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return false;

                }

              }
              if (key.type === "Dialog") {
                console.log('dialogue', input[inputkey]?.dialog);
                var Dialog = input[inputkey]?.dialog;
                var animation = input[inputkey]?.animation;
                var voice = input[inputkey]?.voice;

                if (!Dialog) {

                  toast({
                    title: `Dialogue is Empty On This Sequence ${key.id} `,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return false;

                }
                if (!animation) {

                  toast({
                    title: `Animation is Empty On This Sequence ${key.id} `,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return false;

                }


              }
              if (key.type === "Interaction") {

                console.log("keyinput", key.type + key.input);
                var QuestionsEmotion = input[inputkey]?.QuestionsEmotion;
                var blockRoll = input[inputkey]?.blockRoll;
                var interaction = input[inputkey]?.interaction;
                console.log("QuestionsEmotion", QuestionsEmotion);
                console.log("blockRoll", blockRoll);
                console.log("interaction", interaction);
                if (!interaction) {
                  toast({
                    title: `Interaction is Empty On This Sequence ${key.id} `,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return false;


                }
                if (!QuestionsEmotion || QuestionsEmotion === undefined) {
                  toast({
                    title: `Questions is Empty On This Sequence ${key.id} `,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return false;

                }
                if (!blockRoll) {
                  toast({
                    title: `BlockRoll is Empty On This Sequence ${key.id} `,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return false;

                }
                if (typeof alphabet === 'object' && alphabet !== null) {
                  var alphabetData = alphabet;

                  // alphabetData?.filter((alp: any) => key.id === alp.seqs).map((alp: any, i: number, arr: any[]) => {
                  for (const alp of alphabetData?.filter((alp: any) => key.id === alp.seqs) || []) {
                    console.log("alpha", input[inputkey]?.optionsObject[alp.option]);
                    if (!input[inputkey]?.optionsObject[alp.option]) {
                      var option = alp.option;
                      toast({
                        title: `${option} is Empty On This Sequence ${key.id} `,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                      });
                      return false;
                    }
                    if (!input[inputkey]?.optionsemotionObject[alp.option]) {
                      var option = alp.option;
                      toast({
                        title: `${option} is Empty On This Sequence ${key.id} Please Select`,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                      });
                      return false;

                    }
                    let isAtLeastOneTrue = false;

                    for (const option of alphabet.map((alp: any) => alp.option)) {
                      if (input[inputkey]?.ansObject[option] === 'true' || input[inputkey]?.ansObject[option] === true) {
                        const ansValue = input[inputkey]?.ansObject[option];
                        console.log("ansValue", ansValue)
                        console.log("hit2")
                        isAtLeastOneTrue = true;
                        if (!input[inputkey]?.scoreObject[option]) {
                          console.log("hit3")
                          toast({
                            title: `${option} Score is Empty On This Sequence ${key.id}`,
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                          });
                          return false;
                        }
                      }
                    }
                    if (!isAtLeastOneTrue) {
                      console.log("hit1")
                      toast({
                        title: `At least one option must be selected on this sequence ${key.id}`,
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

            const apiValidationResult = await getStoryValidtion(id);

            console.log('apiValidationResult', apiValidationResult);

            if (apiValidationResult?.status === "Failure") {
              // There are empty fields, show an error message
              toast({
                title: ` ${apiValidationResult?.message}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
              return false;
            }

          }

        }
        else {
          toast({
            title: "No Interaction in items.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return false;
          // console.log("Success: No Interaction in items.");
        }


      } else {
        toast({
          title: `Create Your Story !!`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;

      }



    }
    if (tab === 6) {
      setFormData({
        ...formData,
        gameGameStage: 'Review',
      });
    }
    // if(tab<tab)
    // {
    //   arrange.gameLastTab = tab;
    // }
    // else{
    //   arrange.gameLastTab= formData?.gameLastTab
    // }
    let data = JSON.stringify(formData);
    // console.log('data',tab);
    // return false;
    if (tab === 1 && !id) {
      try {

        const result = await addgame(formData);

        if (result?.status !== 'Success') {
          toast({
            title: 'Data Not Created.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return console.log('updateBackground error :' + result?.err);
        } else {


          if (tab === 1 && result.status === 'Success') {
            toast({
              title: 'Background Image Stored',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'bottom-right',
            });
            setTab(tab + 1);
            const parsedGameLastTabArray = JSON.parse(result.data.gameLastTabArray);
            console.log('formdata', parsedGameLastTabArray)

            // Update formData with the parsed array
            setFormData({
              ...formData,
              gameLastTabArray: parsedGameLastTabArray,
            });
            navigate(`/admin/superadmin/game/creation/${result.data.gameId}`);
            //  window.location.reload();
          }
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }
    } else {
      try {
        const result = await updateGame(id, data);
        if (result?.status !== 'Success') {
          toast({
            title: 'Data Not Updated.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return console.log('updateBackground error :' + result?.err);
        }

        if (tab === 1 && result.status === 'Success') {
          toast({
            title: 'Background Image Updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
          });
          console.log('result?.data', result?.data);
          const { gameLastTab, ...formDataWithoutLastTab } = result?.data;

          setFormData(formDataWithoutLastTab);
          setTab(tab + 1);


          // setFormData((prev)=>({...prev,gameLastTab:formData.gameLastTab+1}));
        }

        if (tab === 2 && result.status === 'Success') {

          toast({
            title: 'Non-Playing Character Updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
          });
          const { gameLastTab, ...formDataWithoutLastTab } = result?.data;

          setFormData(formDataWithoutLastTab);
          setTab(tab + 1);

        }

        if (tab === 3 && result.status === 'Success') {
          toast({
            title: 'Game Overview Updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
          });
          // console.log('asbasflknafkanfknapnakndakndaknkanpAFPAofhEPEFPEAOFPAOEFPAEOHFAOJ[ALMAIGHPIWH  ke]pk3-it=0w4-tw0kfakf]ie0rgjsjg')
          const { gameLastTab, ...formDataWithoutLastTab } = result?.data;

          setFormData(formDataWithoutLastTab);
          setTab(tab + 1);

          // setFormData((prev)=>({...prev,gameLastTab:formData.gameLastTab+1}));
        }

        if (tab === 4 && result.status === 'Success') {
          toast({
            title: 'Story  Updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
          });

          const { gameLastTab, ...formDataWithoutLastTab } = result?.data;
          setFormData(formDataWithoutLastTab);
          setTab(tab + 1);

          // setFormData((prev)=>({...prev,gameLastTab:formData.gameLastTab+1}));
        }

        // if (tab === 5 && result.status === 'Success') {
        //   toast({
        //     title: 'Score Updated',
        //     status: 'success',
        //     duration: 3000,
        //     isClosable: true,
        //     position: 'bottom-right',
        //   });
        //   const { gameLastTab, ...formDataWithoutLastTab } = result?.data;
        //   setFormData(formDataWithoutLastTab);
        //   setTab(tab + 1);

        //   // setFormData((prev)=>({...prev,gameLastTab:formData.gameLastTab+1}));
        // }

        if (tab === 6 && result.status === 'Success') {
          toast({
            title: 'Summary Updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
          });
          const { gameLastTab, ...formDataWithoutLastTab } = result?.data;
          setFormData(formDataWithoutLastTab);
          // setTab(tab + 1);
          navigate(`/admin/superadmin/game/home`);

          // setFormData((prev)=>({...prev,gameLastTab:formData.gameLastTab+1}));
        }
        if (tab === 7 && result.status === 'Success') {
          toast({
            title: 'Ready To Launch',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
          });
          const { gameLastTab, ...formDataWithoutLastTab } = result?.data;
          setFormData(formDataWithoutLastTab);
          setTab(7);


          // setFormData((prev)=>({...prev,gameLastTab:formData.gameLastTab+1}));
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }
    }
  };
  function truncateText(text: any, maxLength: any, maxLineLength: 10) {
    if (text.length <= maxLength) {
      return text;
    } else {
      let truncatedText = text.slice(0, maxLength);

      // Break lines after maxLineLength characters
      truncatedText = truncatedText.replace(new RegExp(`(.{${maxLineLength}})`, 'g'), '$1\n');

      return truncatedText + '........';
    }
  }
  ////////////////////////////Changes-11/01/2024//////////////////////
  const handleBackground = (img: any, i: any) => {
    setDefaultstatus(false)
    // alert(i);
    // alert(img);

    // setIsSelected(!isSelected);
    setBackgroundIndex((prevIndex: any) => (prevIndex === i ? null : i));
    // setFetchImg(img?.aniId);
    setFetchImg((prev: any) => {
      return { ...prev, gasId: img?.gasId, gasAssetImage: img?.gasAssetImage, gasAssetName: img?.gasAssetName, i, title: img?.temp.tempTitle, stroyline: img.temp.tempStoryLine }
    });

    ///
    console.log("selectedCardIndex", selectedCardIndex, i);

    if (selectedCardIndex !== i) {
      console.log("selectedCardIndex1", selectedCardIndex, i);
      // Select new card and deselect the previously selected one (if any)
      setSelectedCardIndex(i);
      setFormData((prev) => ({
        ...prev,
        gameBackgroundId: img.gasId,
        gameTitle: img?.temp.tempTitle,
        gameStoryLine: img?.temp.tempStoryLine
        // gameTitle:img?.gasAssetName

      }));
      localStorage.setItem('selectedCardIndex', i);
    }

    setBackgroundIndex((prevIndex: any) => (prevIndex === i ? null : i));

    const updatedSelections = [...selections];
    updatedSelections[i] = !updatedSelections[i];
    setSelections(updatedSelections);

    onClose();


    console.log('Function3-', selectedCardIndex);
    if (selectedCardIndex === i) {
      return;
    } else {

      // setTimeout(() => {
      //   
      // }, 1000);

    }

  };
  //1998
  useEffect(() => {
    if (!Defaultstatus) {

      if (formData.gameBackgroundId) {
        setPreview(false)
        commonNextFunction();
      }
    }
  }, [formData.gameBackgroundId]);
  /////////////////////////////////////////////////////////////////

  const handlePlayer = (player: any, i: any) => {
    setNonPlayer((prevIndex: any) => (prevIndex === i ? null : i));

    setSelectedPlayer((prev: any) => {
      return {
        ...prev,
        id: player?.gasId,
        img: player?.gasAssetImage,
        name: player?.gasAssetName,
      };
    });

  };
  const handleChange = (e: any) => {

    const inputValue = e.target.value;
    const { name, value, checked } = e.target;
    if (name === 'gameDuration') {

      // let duration =
      //   parseInt(value.split(':')[0], 10) * 60 +
      //   parseInt(value.split(':')[1], 10);
      // setFormData((prev) => ({ ...prev, gameDuration: String(duration) }));
    }
    else if (
      name === 'gameIsSetMinPassScore' ||
      name === 'gameIsSetDistinctionScore' ||
      name === 'gameIsSetSkillWiseScore' ||
      name === 'gameIsSetBadge' ||
      name === 'gameIsSetCriteriaForBadge' ||
      name === 'gameIsSetCongratsSingleMessage' ||
      name === 'gameIsSetCongratsScoreWiseMessage' ||
      name === 'gameIsShowLeaderboard' ||
      name === 'gameIsShowReflectionScreen' ||
      name === 'gameIsLearnerMandatoryQuestion' ||
      name === 'gameIsShowTakeaway' ||
      name === 'gameIsShowSkill' ||
      name === 'gameIsShowStoryline' ||
      name === 'gameIsShowLearningOutcome' ||
      name === 'gameIsShowGameDuration' ||
      name === 'gameIsShowAuhorName' ||
      name === 'gameIsShowAdditionalWelcomeNote' ||
      name === 'gameIsCollectLearnerFeedback' ||
      name === 'gameIsFeedbackMandatory' ||
      name === 'gameShuffle' ||
      name === 'gameDisableOptionalReplays' ||
      name === 'gameTrackQuestionWiseAnswers' ||
      name === 'gameDisableLearnerMailNotifications' || name === 'gameQuestion1' || name === 'gameQuestion2' ||
      name === 'gameContent' ||
      name === 'gameRelevance' ||
      name === 'gameBehaviour' ||
      name === 'gameOthers' ||
      name === 'gameGamification' ||
      name === 'gameRecommendation' ||
      name === 'gameFeedBack') {
      setFormData((prev) => ({ ...prev, [name]: String(checked) }))
    }
    else if (e.target.id === 'gameLaunchedWithinPlatform') {
      e.target.checked
        ? setFormData((prev) => ({ ...prev, [name]: value }))
        : setFormData((prev) => ({ ...prev, [name]: 0 }));
    } else if (name === 'gameDownloadedAsScorm') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
      console.log('gameDownloadedAsScorm', formData.gameDownloadedAsScorm);
    } else if (name === 'gameDefaultFeedbackForm') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? feedBackForm.Yes : feedBackForm.No,
      }));
      console.log('gameDefaultFeedbackForm', formData.gameDefaultFeedbackForm);
    } else if (name === 'gameReplayAllowed') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      console.log('gameReplayAllowed', formData.gameReplayAllowed);
    } else if (name === 'gameLeaderboardAllowed') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      console.log('gameLeaderboardAllowed', formData.gameLeaderboardAllowed);
    } else if (name === 'gameReflectionpageAllowed') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      console.log(
        'gameReflectionpageAllowed',
        formData.gameReflectionpageAllowed,
      );
    } else if (name === 'gameFeedbackQuestion') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      console.log('gameFeedbackQuestion', formData.gameFeedbackQuestion);
    } else if (name === 'gameShuffle') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      console.log('gameShuffle', formData.gameShuffle);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    ///Afrith-modified-29-Dec-23
    ///Completion Screen
    if (name === 'gameIsSetCongratsSingleMessage' && !checked) {
      // Reset the value when switch is turned off
      setFormData(prevData => ({
        ...prevData,
        gameCompletedCongratsMessage: '' // Set to an empty string or any default value
      }));
    }
    else if (name === 'gameIsSetCongratsScoreWiseMessage' && !checked) {
      // Reset the value when switch is turned off

    }

    ///TakeAway Screen
    else if (name === 'gameIsShowTakeaway' && !checked) {
      // Reset the value when switch is turned off
      setFormData(prevData => ({
        ...prevData,
        gameTakeawayContent: '',
        // Set to an empty string or any default value
      }));
    }

    ///Welcome Screen
    else if (name === 'gameIsShowAdditionalWelcomeNote' && !checked) {
      // Reset the value when switch is turned off
      setFormData(prevData => ({
        ...prevData,
        gameAdditionalWelcomeNote: '',
        // Set to an empty string or any default value
      }));
    }
    ////////////////////////////////////

    console.log('formdata', formData);
  };


  const handlecompletion = (e: any) => {
    const inputValue = e.target.value;
    const { name, value, checked } = e.target;
    if (
      //       gameIsSetMinPassScore
      // gameIsSetDistinctionScore
      // gameIsSetBadge
      // gameIsSetCriteriaForBadge
      // gameIsSetCongratsSingleMessage
      // gameIsSetCongratsScoreWiseMessage

      name === 'gameIsSetMinPassScore' ||
      name === 'gameIsSetDistinctionScore' ||
      name === 'gameIsSetSkillWiseScore' ||
      name === 'gameIsSetBadge' ||
      name === 'gameIsSetCriteriaForBadge' ||
      name === 'gameIsSetCongratsScoreWiseMessage' ||
      name === 'gameIsSetCongratsSingleMessage'
    ) {

      setCompliData((prevInput: any) => {
        return {
          ...prevInput,
          [CompKeyCount]: {
            ...prevInput[CompKeyCount],
            [name]: String(checked),

          }
        }
      })






    } else {

      setCompliData((prevInput: any) => {
        return {
          ...prevInput,
          [CompKeyCount]: {
            ...prevInput[CompKeyCount],
            [name]: value
          }
        }
      })



    }
    if (name === 'gameIsSetCongratsSingleMessage' && checked === true) {
      setCompliData((prevInput: any) => {
        return {
          ...prevInput,
          [CompKeyCount]: {
            ...prevInput[CompKeyCount],
            gameIsSetCongratsScoreWiseMessage: 'false',

          }
        }
      })
    }

    if (name === 'gameIsSetCongratsScoreWiseMessage' && checked === true) {
      setCompliData((prevInput: any) => {
        return {
          ...prevInput,
          [CompKeyCount]: {
            ...prevInput[CompKeyCount],
            gameIsSetCongratsSingleMessage: 'false',

          }
        }
      })
    }

  }
  // const handleMouse = (i: number) => {
  //   setEnter(true);
  //   setBgIndex(i);
  // };
  // const handleMouseLeave = () => {
  //   setEnter(false);
  //   setBgIndex(null);
  // };

  const handleHover = (index: number, isHovered: boolean) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = isHovered;
    setHoveredStates(newHoveredStates);
  };
  const handleSummaryState = (isOpen: any) => {
    setIsOpenSummary(isOpen);
    setFormData((prev) => ({
      ...prev,
      gameSummaryScreen: !isOpen ? SummaryState.No : SummaryState.Yes,
    }));

    // console.log('isOpenSummary',isOpenSummary);
    // console.log('formData',formData);
  };

  const handleLanguageChange = (selectedOption: OptionType | null) => {
    setFormData({ ...formData, gameLanguageId: selectedOption.value });
    console.log('formData', selectedOption.value);
  };
  const handleIntroMusic = (selectedOption: OptionType | null) => {
    setFormData({ ...formData, gameIntroMusic: selectedOption.value });
    console.log('formData', selectedOption.value);
  };

  const myBlink = keyframes`
  0% {
    filter: drop-shadow(2px 4px 6px #0000);
  }
  50% {
    filter: drop-shadow(2px 4px 6px #411ab3);
  }
  100% {
    filter: drop-shadow(2px 4px 6px #0000);
  }
  `;

  const blink = `${myBlink} 0.5s linear infinite`;
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('#36c136', 'white');
  // const brandColor = useColorModeValue('brand.500', 'white');
  const completeBg = useColorModeValue(
    'white',
    'linear-gradient(180deg, #1F2A4F 0%, #18224D 50.63%, #111C44 100%)',
  );
  // const completeShadow = useColorModeValue(
  //   '0px 18px 40px rgba(112, 144, 176, 0.12)',
  //   'inset 0px 4px 4px rgba(255, 255, 255, 0.2)',
  // );
  const incompleteColor = useColorModeValue(
    'secondaryGray.600',
    'whiteAlpha.200',
  );
  const completeShadow = "rgba(112, 144, 176, 0.1) 0px 18px 22px inset";
  const incompleteShadow = "rgba(112, 144, 176, 0.12) 0px 18px 40px";
  // const incompleteShadow = useColorModeValue(
  //   'inset 0px 18px 22px rgba(112, 144, 176, 0.1)',
  //   'inset 0px 4px 4px #0B1437',
  // );
  const lineColor = useColorModeValue('%23a3aed0', '%23FFFFFF1A');
  console.log(formData.gameLastTabArray);
  // SET BORDER IN IMAGE
  const stepImgActiveBorder = 'done';
  const stepImgBorder = '';


  const tab1 = formData && formData?.gameLastTabArray?.includes(1) ? stepImgActiveBorder : stepImgBorder;
  const tab2 = formData && formData?.gameLastTabArray?.includes(2) ? stepImgActiveBorder : stepImgBorder;
  const tab3 = formData && formData?.gameLastTabArray?.includes(3) ? stepImgActiveBorder : stepImgBorder;
  const tab4 = formData && formData?.gameLastTabArray?.includes(4) ? stepImgActiveBorder : stepImgBorder;
  const tab5 = formData && formData?.gameLastTabArray?.includes(5) ? stepImgActiveBorder : stepImgBorder;
  const tab6 = formData && formData?.gameLastTabArray?.includes(6) ? stepImgActiveBorder : stepImgBorder;
  const tab7 = formData && formData?.gameLastTabArray?.includes(7) ? stepImgActiveBorder : stepImgBorder;

  // set height and width for stepper image based on tab
  const stepImgActiveHeight = '110px';
  const stepImgHeight = '78px';
  const stepBgImg = tab == 1 ? stepImgActiveHeight : stepImgHeight;
  const stepNonPlaying = tab == 2 ? stepImgActiveHeight : stepImgHeight;
  const stepAbtStory = tab == 3 ? stepImgActiveHeight : stepImgHeight;
  const stepBlocks = tab == 4 ? stepImgActiveHeight : stepImgHeight;
  const stepScore = tab == 5 ? stepImgActiveHeight : stepImgHeight;
  const stepSummaries = tab == 6 ? stepImgActiveHeight : stepImgHeight;
  const stepEnd = tab == 7 ? stepImgActiveHeight : stepImgHeight;

  // SET ACTIVE STATUS BASED ON TAB
  const stepIconActiveColor = completeShadow;
  const stepIconColor = incompleteShadow;
  // const stepPoseIcon = tab >= 2 ? stepIconActiveColor : stepIconColor;
  // const stepAboutStoryIcon = tab >= 3 && intercount > 0  ? stepIconActiveColor : stepIconColor;
  // const stepBlockIcon = tab >= 4  ? stepIconActiveColor : stepIconColor;
  // const stepScoreIcon = tab >= 5 ? stepIconActiveColor : stepIconColor;
  // const stepSummariesIcon = tab >= 6 ? stepIconActiveColor : stepIconColor;
  // const stepCompleteIcon = tab >= 7 ? stepIconActiveColor : stepIconColor;

  const stepPoseIcon = tab === 1 ? stepIconActiveColor : stepIconColor;
  const stepAboutStoryIcon = tab === 2 ? stepIconActiveColor : stepIconColor;
  const stepBlockIcon = tab === 3 ? stepIconActiveColor : stepIconColor;
  const stepScoreIcon = tab === 4 ? stepIconActiveColor : stepIconColor;
  const stepSummariesIcon = tab === 5 ? stepIconActiveColor : stepIconColor;
  const stepCompleteIcon = tab === 6 ? stepIconActiveColor : stepIconColor;

  // SET ACTIVE CHECK BASED ON TAB
  const stepCheckActiveColor = brandColor;
  const stepCheckColor = incompleteColor;
  const stepbgCheck = formData?.gameLastTabArray?.includes(1) ? stepCheckActiveColor : (tab === 1 ? 'brand.500' : stepCheckColor);
  const stepPoseCheck = formData?.gameLastTabArray?.includes(2) ? stepCheckActiveColor : (tab === 2 ? 'brand.500' : stepCheckColor);
  const stepAboutStoryCheck = formData?.gameLastTabArray?.includes(3) ? stepCheckActiveColor : (tab === 3 ? 'brand.500' : stepCheckColor);
  const stepBlockCheck = formData?.gameLastTabArray?.includes(4) ? stepCheckActiveColor : (tab === 4 ? 'brand.500' : stepCheckColor);
  const stepScoreCheck = formData?.gameLastTabArray?.includes(5) ? stepCheckActiveColor : (tab === 5 ? 'brand.500' : stepCheckColor);
  const stepSummariesCheck = formData?.gameLastTabArray?.includes(6) ? stepCheckActiveColor : (tab === 6 ? 'brand.500' : stepCheckColor);
  const stepCompleteCheck = formData?.gameLastTabArray?.includes(7) ? stepCheckActiveColor : (tab === 7 ? 'brand.500' : stepCheckColor);

  const steps = [
    {
      title: 'Background',
      description:
        'Contact Info sddfaf asfasf  fASAF dad  EDsd dA dADda DDEde Dd DEWe Q QW OIH OIHO HIUG G 8G 8G 8 UG8 G8 G8 G 8G GEwgeg',
    },
    { title: 'Character', description: 'Date & Time' },
    { title: 'Overview', description: 'Select Rooms' },
    { title: 'Story', description: 'Select Rooms' },
    { title: 'Prefrences', description: 'Select Rooms' },
    { title: 'Design', description: 'Select Rooms' },
    { title: 'Launch', description: 'Select Rooms' },
  ];
  const [activeStep, setActiveStep] = useState(1);

  const handleStepChange = (step: any) => {
    setActiveStep(step);
  };

  const handleReadMore = (index: number) => {
    const newShowFullTextStates = [...showFullTextStates];
    newShowFullTextStates[index] = true;
    setShowFullTextStates(newShowFullTextStates);
  };

  const handleEditClick = (player: any, i: any) => {
    // setInputValue(player?.gasAssetName);
    setInputValue((prev: any) => {
      return {
        ...prev,
        pid: player?.gasId,
        pimg: player?.gasAssetImage,
        pname: player?.gasAssetName,
        i,
      };
    });
    setIsEditing(true);
    setIsSave(false);

  };

  console.log('input--', inputValue);

  const handleSave = () => {
    setIsSave(true);
    setIsEditing(false);
  };
  //navin 16-12

  useEffect(() => {

    if (formData.gameIsSetCongratsSingleMessage === 'true') {

      setFormData((prev) => ({
        ...prev,
        gameIsSetCongratsSingleMessage: 'true',
        gameIsSetCongratsScoreWiseMessage: 'false'
      }));
    }
  }, [formData.gameIsSetCongratsSingleMessage]);


  //navin 16-12
  //priyaDharshini
  //   useEffect(() => {
  //     const getTotalScore = () => {
  //       let wordCount=[];
  //       if (typeof items === 'object' && items !== null) {
  //         var inputData = items;
  //         console.log("inputData", inputData);
  //         let maxArray = [];

  //   let words;
  //         for (var i = 0; i < inputData.length; i++) {
  //           var key = inputData[i];
  //           var inputkey = key.type + key.input;

  //           if(key.type === 'Note'){
  //   if(input[inputkey]?.note){
  //     words =input[inputkey]?.note.trim().split(/\s+/);
  //     wordCount.push(words.length)
  //   }

  //           }
  //           if(key.type === 'Dialog'){
  //             if(input[inputkey]?.dialog){
  //              words = input[inputkey].dialog.trim().split(/\s+/);

  //              wordCount.push(words.length)
  //             }


  //           }
  //           if (key.type === "Interaction") {
  //             //  words = sentence.trim().split(/\s+/);
  //             console.log("scoreObject", input[inputkey]?.scoreObject);
  //              //{ A: "2355", B: "22", C: "1000" }
  //         var wordInteraction= input[inputkey]?.interaction
  //         words = wordInteraction.trim().split(/\s+/);
  //         wordCount.push(words.length)





  //     for (const key in input[inputkey]?.optionsObject) {

  //       if (input[inputkey]?.optionsObject.hasOwnProperty(key)) {



  //         var wordOptionsObject = input[inputkey]?.optionsObject[key];
  //         if(wordOptionsObject){
  //           words = wordOptionsObject?.trim().split(/\s+/);
  //           wordCount.push(words.length)
  //         }


  //         var wordfeedbackObject = input[inputkey]?.feedbackObject[key];
  //         if(wordfeedbackObject){
  //           words = wordfeedbackObject?.trim().split(/\s+/);
  //           wordCount.push(words.length)
  //         }


  //        var wordresponseObject= input[inputkey]?.responseObject[key];
  //        if(wordresponseObject){
  //         words = wordresponseObject?.trim().split(/\s+/);
  //         wordCount?.push(words.length)
  //        }


  //        var  wordoptionTitleObject = input[inputkey]?.optionTitleObject[key];
  //        if(wordoptionTitleObject){
  //         words = wordoptionTitleObject.trim().split(/\s+/);
  //         wordCount.push(words.length)
  //        }



  //       }
  //     }




  //   // if(input[inputkey]?.ansObject==='true'){

  //     var scoreObject = input[inputkey]?.scoreObject;

  //     const objArray = scoreObject;

  //     // Find the max value across all keys (A, B, C)
  //     const maxValue = Math.max.apply(null, Object.values(objArray));

  //     console.log("Max value:", maxValue);
  //     maxArray.push(maxValue);
  //   // }

  //           }
  //         }


  //         console.log("maxArray", maxArray);
  //         const numericValues = maxArray.map(Number);
  //         const numericWord=wordCount.map(Number);
  //         const sum = numericValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  //   const sumWordLength=numericWord.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  //   const totalmintues =sumWordLength/100
  //         console.log("Sum of array values:", totalmintues);
  //         setFormData((prev) => ({
  //           ...prev,
  //           gameTotalScore: sum,
  //           gameDuration:totalmintues,
  //         }));
  //       }


  //     };
  //     if(input.length>0){
  //       getTotalScore();
  //     }


  // }, [input]);
  //navin
  const playerPerview = (id: any) => {

    setPreview(true)
    setPreviewId(id)
  }
  const makeInputFiled = (id: any, name: any) => {
    if (formData.gameNonPlayingCharacterId !== id) {
      setFormData((prev) => ({
        ...prev,
        gameNonPlayingCharacterId: id,
        gameNonPlayerName: name,
        gameNonPlayerVoice: null,
        gamePlayerMaleVoice: null,
        gamePlayerFemaleVoice: null,
        gameNarratorVoice: null

      }));
      setPreview(true);
    } else {
      setFormData((prev) => ({
        ...prev,
        gameNonPlayingCharacterId: '',
        gameNonPlayerName: name,
        gameNonPlayerVoice: null,
        gamePlayerMaleVoice: null,
        gamePlayerFemaleVoice: null,
        gameNarratorVoice: null
      }));
    }
  }
  const reducePercentage = 16 * tab - 16;
  console.log(reducePercentage);
  // alert(reducePercentage)
  useEffect(() => {
    if (formData.gameNonPlayingCharacterId) {
      playerPerview(formData.gameNonPlayingCharacterId)

    }

  }, [formData.gameNonPlayingCharacterId]);
  // navin

  // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',img);

  //// debounced for auto upload when onchange for reflection

  const debouncedSubmit = useCallback(
    debounce(async (data: any) => {
      try {
        console.log('handlesaveReflection', data);
        const datas = JSON.stringify(data);
        const resu = await createReflection(datas);
        if (resu.status !== 'Success') {
          return false;
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }
    }, 500),
    [id] // Empty dependency array to ensure that the function is only created once
  );






  useEffect(() => {
    if (id && autosave) {
      if (formData.gameIsShowReflectionScreen === 'true' && tab === 5) {
        if (reflectionQuestions && formData.gameReflectionQuestion) {
          const data = {
            reflectionQuestions: reflectionQuestions,
            gameReflectionQuestion: formData.gameReflectionQuestion,
            gameId: id,
          }
          console.log('datas', data)
          debouncedSubmit(data);

        }
      }
    }

  }, [reflectionQuestions, formData.gameReflectionQuestion, id])


  //// debounce for game table 
  const debouncedSubmitGame = useCallback(
    debounce(async (data: any) => {
      try {

        console.log('debouncedSubmitGame', data)

        const result = await updateGame(id, data);
        if (result?.status !== 'Success') {
          console.log('data not updated')
        }


      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }
    }, 500),
    [id] // Empty dependency array to ensure that the function is only created once
  );




  useEffect(() => {
    if (id && autosave) {


      // if (formData) {

      //   let data = JSON.stringify(formData);

      //   debouncedSubmitGame(data);
      //   setExtensiveNavigation(null);
      // }
      if (formData && formData.gameQuestNo) {
        const newFormData = { ...formData };
        delete newFormData['gameLastTabArray'];
        delete newFormData['gameLastTab'];
        let data = JSON.stringify(newFormData);
        // let data = JSON.stringify(formData);
        //alert("de"+tab);
        debouncedSubmitGame(data);
        setExtensiveNavigation(null);
      }
    }

  }, [formData])

  //// debounced for auto upload when onchange 
  const debouncedStorySubmit = useCallback(
    debounce(async (data: any) => {


      try {
        console.log('debouncedSubmit', data)
        const result = await setStory(id, JSON.stringify(data));
        if (result?.status !== 'Success') {

          return console.log('updateBackground error :' + result?.err);
        } else {
          console.log('result data', result.data);


        }


      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }
      console.log('save', JSON.stringify(input));
    }, 500),
    [id] // Empty dependency array to ensure that the function is only created once
  );


  const debouncedCompliSubmit = useCallback(
    debounce(async (data: any) => {


      try {
        let datas = JSON.stringify(data);


        const result = await UpdateCompletionScreen(id, datas);
        if (result?.status !== 'Success') {
          console.log('data not updated')
        }


      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }

    }, 500),
    [id] // Empty dependency array to ensure that the function is only created once
  );



  function debounce(func: any, wait: any) {
    let timeout: any;
    return function executedFunction(...args: any) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  useEffect(() => {
    if (id && autosave) {

      if (input.length !== 0 && items.length !== 0) {
        const data = {
          items: items,
          input: input,
          alphabet: alphabet,
          interactionBlock: interactionBlock
        }

        debouncedStorySubmit(data);
      }
      handleCompletionScreen(1)
      getDuration();
    }



  }, [input, items])


  useEffect(() => {
    if (id && autosave) {


      if (Object.keys(Completion).length)
        debouncedCompliSubmit(compliData);

      // handleCompletionScreen(1)
    }



  }, [compliData])



  ////handleCompliStore



  useEffect(() => {

    const selectBlockoptions = items.map((item: any) => ({
      value: item.input,
      label: item.id,
    }));
    setSelectBlock(selectBlockoptions)
  }, [items])

  // onClick Func
  const duplicateSeq = (seq: any, i: any, name: any) => {
    // const id = `${Math.floor(count / 10) + 1}.${count % 10 || 1}`;
    // const upNext = `${Math.floor(count / 10) + 1}.${(count + 1) % 10 || 1}`;
    const sequencial = `${count / 10 + 1}`;
    const upNextSequencial = `${(count + 1) / 10 + 1}`
    const floatRegex = /^[-+]?(\d*\.\d+|\.\d+)$/;
    // const id = floatRegex.test(sequencial) ? sequencial : `${count / 10 + 1}.${0}`          
    // const upNext = floatRegex.test(upNextSequencial) ? upNextSequencial : `${(count + 1) / 10 + 1}.${0}` 
    const id = `${serias}.${count}`
    const upNext = `${serias}.${count + 1}`
    // setShowBox(true);       
    setUpNext(upNext);
    setCount(count + 1);
    const newArr = { id, type: name, upNext, input: count, questNo: serias };

    setItems((prevArray: any) => {
      const nextIndex = i + 1;
      console.log('prevArray', newArr.input);
      setNumber([...number, newArr.input])
      return [
        ...prevArray.slice(0, nextIndex),
        newArr,
        ...prevArray.slice(nextIndex).map((item: any) => ({ ...item, upNext: id })),
      ];
    });

    setSequence([...sequence, id]);
    setDummySequence([...dummySequence, id]);
    setUpNextCount([...upNextCount, upNext])
    if (name === 'Interaction') {



      const currentAlpha = alphabet
        .slice()
        //  .reverse() // Reverse the array to start searching from the end
        .find((item: any) => item.seqs === id);
      if (id !== currentAlpha?.seqs) {

        let secondaryArray: any = [];
        let makcount = countalphabet;

        for (let i = 0; i < 3; i++) {
          // Insert data into the array
          let inc = makcount + i + 1;
          console.log('secondaryArray', countalphabet, '--', inc)
          secondaryArray.push(inc);



        }
        setAlphabetCount(secondaryArray[2]);
        console.log('secondaryArray', secondaryArray);
        setAlphabet((prev: any) => [
          ...prev,
          { seqs: id, option: 'A', secondaryId: secondaryArray[0] },
          { seqs: id, option: 'B', secondaryId: secondaryArray[1] },
          { seqs: id, option: 'C', secondaryId: secondaryArray[2] }
        ]);
      }
    }
    setInput((prevInput: any) => {
      const noteKey = `Note${count}`;
      const dialogKey = `Dialog${count}`;
      const interactionKey = `Interaction${count}`;

      // Previous Data Object
      const oldNoteKey = prevInput?.[`Note${seq.input}`]
      const oldDialogKey = prevInput?.[`Dialog${seq.input}`]
      const oldInteractionKey = prevInput?.[`Interaction${seq.input}`]


      // Activate RFST
      if (oldInteractionKey?.responseObject?.A !== '' || null) {
        setInteractionBlock((prev: any) => {
          return { ...prev, [`Resp${[count]}`]: count };
        });
      }
      if (oldInteractionKey?.feedbackObject?.A !== '' || null) {
        setInteractionBlock((prev: any) => {
          return { ...prev, [`Feedbk${[count]}`]: count };
        });
      }
      if (oldInteractionKey?.SkillTag !== '' || null) {
        setInteractionBlock((prev: any) => {
          return { ...prev, [`Skills${[count]}`]: count };
        });
      }
      if (oldInteractionKey?.optionTitleObject?.A !== '' || null) {
        setInteractionBlock((prev: any) => {
          return { ...prev, [`Title${[count]}`]: count };
        });
      }


      if (seq.type === 'Note') {
        return {
          ...prevInput,
          [noteKey]: {
            ...prevInput?.noteKey,
            id: id,
            note: oldNoteKey?.note,
          }
        }
      }
      if (seq.type === 'Dialog') {
        return {
          ...prevInput,
          [dialogKey]: {
            ...prevInput[dialogKey],
            id: id,
            dialog: oldDialogKey?.dialog,
            character: oldDialogKey?.character,
            animation: oldDialogKey?.animation,
            voice: "",


          }
        }
      }
      if (seq.type === 'Interaction') {
        console.log('prevInput', oldInteractionKey)
        //Previous Object Data's
        const optionsObject = oldInteractionKey?.optionsObject;
        const ansObject = oldInteractionKey?.ansObject;
        const feedbackObject = oldInteractionKey?.feedbackObject;
        const responseObject = oldInteractionKey?.responseObject;
        const optionTitleObject = oldInteractionKey?.optionTitleObject;
        const optionsemotionObject = oldInteractionKey?.optionsemotionObject;
        const optionsvoiceObject = oldInteractionKey?.optionsvoiceObject;
        const scoreObject = oldInteractionKey?.scoreObject;
        const navigateObjects = oldInteractionKey?.navigateObjects;
        const filterNullFields = (obj: Record<string, any>): Record<string, any> => {
          return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== null));
        };

        return {
          ...prevInput,
          [interactionKey]: {
            ...prevInput[interactionKey],
            id: id,
            interaction: oldInteractionKey?.interaction,
            blockRoll: oldInteractionKey?.blockRoll,
            QuestionsEmotion: oldInteractionKey?.QuestionsEmotion,
            QuestionsVoice: oldInteractionKey?.QuestionsVoice,      
            SkillTag: (oldInteractionKey?.SkillTag),
            quesionTitle: (oldInteractionKey?.quesionTitle),
            optionsObject: { A: optionsObject?.A, B: optionsObject?.B, C: optionsObject?.C },
            ansObject: { A: ansObject?.A, B: ansObject?.B, C: ansObject?.C },
            // feedbackObject:{A: feedbackObject?.A,   B: feedbackObject?.B,    C: feedbackObject?.C},
            feedbackObject: filterNullFields({
              A: feedbackObject?.A,
              B: feedbackObject?.B,
              C: feedbackObject?.C,
            }),
            // responseObject:{A: responseObject?.A,    B: responseObject?.B,    C: responseObject?.C},
            responseObject: filterNullFields({
              A: responseObject?.A,
              B: responseObject?.B,
              C: responseObject?.C,
            }),
            optionTitleObject: { A: optionTitleObject?.A, B: optionTitleObject?.B, C: optionTitleObject?.C },
            optionsemotionObject: { A: optionsemotionObject?.A, B: optionsemotionObject?.B, C: optionsemotionObject?.C },
            optionsvoiceObject: { A: optionsvoiceObject?.A, B: optionsvoiceObject?.B, C: optionsvoiceObject?.C },
            scoreObject: { A: scoreObject?.A ? scoreObject?.A : null, B: scoreObject?.B ? scoreObject?.B : null, C: scoreObject?.C ? scoreObject?.C : null },
            navigateObjects: { A: navigateObjects?.A, B: navigateObjects?.B, C: navigateObjects?.C },
          }
        }
      }
    })
  };

  const delSeq = (seq: any, i: any, name: any) => {

    // removeDataBySeqs(seq.id);        
    console.log('delSeq', seq);

    if (name === 'Interaction') {
      setAlphabet((prevAlphabet: any) => {
        // Use filter to create a new array without items that match the condition
        const updatedAlphabet = prevAlphabet?.filter((item: any) => item.seqs !== seq.id);
        return updatedAlphabet;
      });

      console.log('roll', seq);

    }
    setItems((previtems: any) => {
      // Use filter to create a new array without items that match the condition
      const updatedItems = previtems?.filter((item: any) => item.input !== seq.input);
      return updatedItems;
    });
    // setItems(items.filter((_: any, index: any) => {
    //     console.log('datadata', _)
    //     return index !== i;
    // }));
    // setItems((prevItem: any)=> 
    //     prevItem.map((item: any) =>
    //     item.id === seq.id ? { ...item, status: 'no' } : item
    // ))      

    // setSequence(sequence.filter((_: any, index: any) => { return index !== i }))
    // setTimeout(() => {
    //     handleGet();
    // }, 3000);
    setDeleteseq(true);
  };
  const deleteQuest = async (gameid: any, questNo: any) => {
    console.log()
    const data = {
      quest: questNo,
      exid: id,
    }
    const result = await QuestDeletion(gameid, JSON.stringify(data));
    if (result?.status !== 'Success') {
      return console.log('updateBackground error :' + result?.err);
    }
    else {
      fetchBlocks();
      handleGet(1);
      setQuestTabState(1);

    }
    // QuestDeletion
  };


  let tarSeqRef;
  const handleTargetQuest = (progressItem: any, progressIndex: number) => {

    setTargetSequence(progressItem)
    tarSeqRef = document.getElementById(`tarSeqRef${progressItem?.id}`);

    if (tarSeqRef) {
      tarSeqRef.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
      console.log('progressBlockItems', tarSeqRef);
    }

  }


  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();


  let arrowSeqRef: any;
  let focusSeqRef: any;
  // const handleKeyDown = (event:any, seq:any) => {

  //   let indexToFind;

  // setTargetSequence(seq);
  // console.log('event.code',targetSequence.id)


  // if(targetSequence){
  //   indexToFind = items.findIndex((item:any) => (
  //     item.id === targetSequence.id 
  //   ));
  // }else{
  //   indexToFind=0;
  // }

  //   if (indexToFind >= 0 && indexToFind < items.length) {
  //     console.log('Index:', indexToFind);
  //     if (
  //       event.key &&
  //       (event.type === 'click' ||
  //         event.key !== 'Escape' ||
  //         event.key !== 'Delete' ||
  //         event.key !== 'Backspace')
  //     ){
  //       console.log('event.code',event)
  //       if(seq){
  //         setTargetSequence(seq);
  //       }
  //     }
  //   if(event.key ==='Escape'){
  //     setTargetSequence(null);
  //   }



  //   switch (event.code) {

  //     case 'ArrowUp':
  //       setTargetSequence(items[indexToFind===0? 0 : indexToFind-1])
  //       arrowSeqRef = document.getElementById(`tarSeqRef${items[indexToFind===0? 0 : indexToFind-1]?.id}`); 
  //       if (arrowSeqRef) { 
  //         arrowSeqRef.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
  //         console.log('arrowSeqRef', arrowSeqRef);
  //       }   

  //       break;
  //     case 'ArrowDown':
  //       setTargetSequence(items[indexToFind=== items.length-1 ? items.length :indexToFind+1])
  //       arrowSeqRef = document.getElementById(`tarSeqRef${items[indexToFind=== items.length ? 0 :indexToFind+1]?.id}`); 
  //       if (arrowSeqRef) { 
  //         arrowSeqRef.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
  //         console.log('arrowSeqRef', arrowSeqRef);
  //       }   
  //       break;


  //     default:
  //       // Handle other key presses if needed
  //       break;
  //   }
  // }
  // };



  const handleKeyDown = (event: any, i: any, seq: any) => {

    console.log('event.code', event.code)
    console.log('event.key', event.key)
    console.log('event.type', event.type)
    console.log('event.type', seq)
    let indexToFind: any;
    setTargetSequence(seq);
    if (targetSequence) {
      indexToFind = items.findIndex((item: any) => (
        item.id === targetSequence.id
      ));
    } else {
      indexToFind = 0;
    }
    if (indexToFind >= 0 && indexToFind < items.length) {
      console.log('Index:', indexToFind);
      if (
        event.key &&
        (event.type === 'click' ||
          event.key !== 'Escape' ||
          event.key !== 'Delete' ||
          event.key !== 'Backspace' || event.ctrlKey === true)
      ) {
        if (seq) {
          setTargetSequence(seq);
        }
      }
      if (event.key === 'Escape') {
        setTargetSequence(null);
      }
      switch (event.code) {
        case 'ArrowUp':
          setTargetSequence(items[indexToFind === 0 ? 0 : indexToFind - 1])
          setTimeout(() => {
            arrowSeqRef = document.getElementById(`tarSeqRef${items[indexToFind === 0 ? 0 : indexToFind - 1]?.id}`);
            focusSeqRef = document.getElementsByClassName(`${items[indexToFind === 0 ? 0 : indexToFind - 1]?.id}`);
            focusSeqRef?.[0].classList.add('non-caret');
            focusSeqRef?.[0].focus();
            focusSeqRef?.[0].setAttribute('readonly', 'true');
          }, 200)

          if (arrowSeqRef) {
            arrowSeqRef.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
            console.log('event.----------------', focusSeqRef?.[0]);
          }
          break;
        case 'ArrowDown':
          setTargetSequence(items[indexToFind === items.length - 1 ? items.length : indexToFind + 1])
          setTimeout(() => {
            arrowSeqRef = document.getElementById(`tarSeqRef${items[indexToFind === items.length ? 0 : indexToFind + 1]?.id}`);
            focusSeqRef = document.getElementsByClassName(`${items[indexToFind === items.length ? 0 : indexToFind + 1]?.id}`);
            focusSeqRef?.[0]?.classList?.add('non-caret');
            focusSeqRef?.[0]?.focus();
            focusSeqRef?.[0]?.setAttribute('readonly', 'true');
          }, 200)
          if (arrowSeqRef) {
            arrowSeqRef.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
            console.log('event.----------------', focusSeqRef?.[0]);
          }
          break;

        default:
          break;
      }

      if (event.type == 'click') {
        if (targetSequence?.id !== seq?.id) {
          focusSeqRef = document.getElementsByClassName(seq.id);
          focusSeqRef?.[0].classList.remove('non-caret');
          focusSeqRef?.[0].focus();
          console.log('event.----------------Click', focusSeqRef?.[0]);
        }

      }

      if (event.code == 'Enter') {
        focusSeqRef = document.getElementsByClassName(seq.id);
        focusSeqRef?.[0].removeAttribute('readonly');
        focusSeqRef?.[0].classList.remove('non-caret');
        focusSeqRef?.[0].focus();
        console.log('event.----------------Enter', focusSeqRef?.[0]);
      }

      if (event.key === 'Backspace' || event.key === 'Delete') {
        focusSeqRef = document.getElementsByClassName(seq.id);
        var isFieldFocused = document.activeElement.classList.contains(seq.id);
        var isFormFieldFocused = ['input', 'textarea', 'select'].includes(document.activeElement.tagName.toLowerCase());

        console.log('focusSeqRef?.[0].focus()', focusSeqRef?.[0].readOnly);

        if (focusSeqRef?.[0].readOnly) {
          delSeq(seq, Number(0), seq.type);
        }

      }

      if (event.ctrlKey === true && event.code === 'KeyC'
      ) {
        focusSeqRef = document.getElementsByClassName(seq.id);
        var isFieldFocused = document.activeElement.classList.contains(seq.id);
        var isFormFieldFocused = ['input', 'textarea', 'select'].includes(document.activeElement.tagName.toLowerCase());

        console.log('focusSeqRef?.[0].focus()', focusSeqRef?.[0].readOnly);

        console.log("test45");
        if (focusSeqRef?.[0].readOnly) {
          setCopySequence(seq);
        }
      }

      if (event.code === 'KeyV' && event.ctrlKey === true) {
        focusSeqRef = document.getElementsByClassName(seq.id);
        var isFieldFocused = document.activeElement.classList.contains(seq.id);
        var isFormFieldFocused = ['input', 'textarea', 'select'].includes(document.activeElement.tagName.toLowerCase());

        console.log('focusSeqRef?.[0].focus()', focusSeqRef?.[0].readOnly);

        console.log("test45");
        if (focusSeqRef?.[0].readOnly) {
          if (copySequence) {
            duplicateSeq(copySequence, i, copySequence.type);
          }
        }
      }

      if (event.ctrlKey === true && event.code === 'KeyD') {
        focusSeqRef = document.getElementsByClassName(seq.id);
        var isFieldFocused = document.activeElement.classList.contains(seq.id);
        var isFormFieldFocused = ['input', 'textarea', 'select'].includes(document.activeElement.tagName.toLowerCase());

        console.log('focusSeqRef?.[0].focus()', focusSeqRef?.[0].readOnly);

        console.log("test45");
        if (focusSeqRef?.[0].readOnly) {

          duplicateSeq(seq, i, seq.type);
        }
      }

      if (event.ctrlKey && event.shiftKey) {
        if (event.code === 'ArrowUp') {
          setTimeout(() => {
            focusSeqRef = document.getElementsByClassName(`${items[indexToFind === 0 ? 0 : indexToFind - 1]?.id}`);
            focusSeqRef?.[0]?.focus();
          }, 200)
          console.log('event.----------------ShiftArrowUp', focusSeqRef?.[0]);
          moveItem(i, i - 1, seq);
        } else if (event.code === 'ArrowDown') {
          setTimeout(() => {
            focusSeqRef = document.getElementsByClassName(`${items[indexToFind === items.length ? 0 : indexToFind + 1]?.id}`);
            focusSeqRef?.[0]?.focus();
          }, 200)
          console.log('event.----------------ShiftArrowDown', focusSeqRef?.[0]);
          moveItem(i, i + 1, seq);
        }
      }

    }
  };
 

  const moveItem = (startIndex: number, endIndex: number, seq: any) => {
    // Ensure endIndex is within the bounds of the array
    endIndex = Math.max(0, Math.min(items.length - 1, endIndex));
    focusSeqRef = document.getElementsByClassName(seq.id);
    focusSeqRef?.[0]?.focus();

    // Perform the move
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(startIndex, 1);
    updatedItems.splice(endIndex, 0, movedItem);

    const updatedMovingItems = updatedItems.map((item: any, index) => {
      return { ...item, id: dummySequence[index] || item.id, upNext: upNextCount[index] };
    });

    const updateInteraction = updatedItems.map((item, index) => {  
      if (item?.type === 'Interaction') {
        return { ...item, from: item.id, to: sequence[index] };
      }
      return null; // Return null for items that don't meet the condition
    }).filter(item => item !== null);

    const updatedAlphabet = alphabet.map((item: { seqs: string; }) => {
        // Find the corresponding updateInteraction item
        const correspondingUpdate = updateInteraction.find(updateItem => updateItem.from === item.seqs);
      
        // If a corresponding updateInteraction item is found, update the seqs value
        if (correspondingUpdate) {
          return { ...item, seqs: correspondingUpdate.to };
        }
      
        // If no corresponding updateInteraction item is found, return the original item
        return item;
    });
    // Update the state with the new order
    setItems(updatedMovingItems);
    setAlphabet(updatedAlphabet);
    setBlockItems(updatedItems)
  };

  // COnsole's
  console.log('Copied sequence:', copySequence);
  console.log('Pasted sequence:', copySequence);

  const updateExtensiveNavigation = (id: number) => {
    setExtensiveNavigation(id);
  };


  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={2}>
        <GridItem colSpan={{ sm: 1, md: 1, lg: 1 }} display={{ base: 'none', lg: 'block' }}>
          {/* <Card width={'290px'} h={'700px'} mt={{ base: '90px', xl: '90px' }} alignItems={'center'} bg={'linear-gradient(to bottom, #7551ff, #3311db)'}> */}
          <HStack
            borderRadius={'20px'}
            width={'280px'}
            overflow={'auto'}
          >

            <Card
              position="fixed"
              flexDirection="column"
              bg={'linear-gradient(315deg, #f1f2f6 0%, #c9c6c6 74%)'}
              w="18%"
              top={'2%'}
              mb={'20px'}
              h="95vh"
              borderColor="#11047a"
              border="3px solid #11047a"
              overflowX={'auto'}
              style={{
                backgroundImage: 'linear-gradient(315deg, #f1f2f6 0%, #c9c6c6 74%)',
              }}
            >

              <Flex display={'flex'} justifyContent={'space-around'} alignItems={'center'}>

                <Text color={'black'} fontSize={25} fontWeight={800} letterSpacing={'2px'} mr={'px'} ml={'0px'}>ATLANTIS</Text>
                <Box ml={'10px'} transform={'scale(1.3)'} borderRadius={'50%'} >
                  <SidebarResponsive routes={routes} />
                </Box>
              </Flex>
              <Flex><Box display="flex"
                height="1px"
                width="100%"
                background="rgba(135, 140, 189, 0.3)"
                marginTop="20px"></Box></Flex>
              {/* <Box w={'100%'} borderBottom={'1px solid #e4e9ef'} mb={'10px'}></Box> */}
              <Flex position="relative" mt={"49px"} direction="column" justifyContent="space-between">
                <Flex
                  position="absolute"
                  left="32.5px"
                  h="100%"
                  w="2px"
                  // bg={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${lineColor}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}
                  bg={stepbgCheck ? `linear-gradient(to top, white ${100 - reducePercentage}%,green 0%);
` : 'white'}
                  zIndex={1}
                />
                <OrderStep
                  cursor={'pointer'}
                  onClick={() => handleTrans(1)}
                  mb="30px"
                  name="BackGround"
                  status={tab1}
                  BlockItems={BlockItems}
                  icon={
                    <IconBox
                      h="46px"
                      w="46px"
                      ml="8px"
                      bg="#FFFFFF"
                      transition="all 0.2s linear 0s"
                      boxShadow={stepPoseIcon}
                      icon={
                        <Icon
                          as={TbView360}
                          color={tab === 1 ? 'brand.500' : stepbgCheck}//icon color
                          h="24px"
                          w="24px"
                        />
                      }
                    />
                  }
                />
                <OrderStep
                  cursor={'pointer'}
                  onClick={() => handleTrans(2)}
                  mb="30px"
                  name="Character"
                  status={tab2}
                  BlockItems={BlockItems}
                  icon={
                    <IconBox
                      h="46px"
                      w="46px"
                      ml="8px"
                      // color='#fff'
                      boxShadow={stepAboutStoryIcon}
                      bg="#FFFFFF"
                      transition="all 0.2s linear 0s"
                      icon={
                        <Icon
                          as={FaRobot}
                          color={tab === 2 ? 'brand.500' : stepPoseCheck}//icon color{}
                          h="24px"
                          w="24px"
                        />
                      }
                    />
                  }
                />
                <OrderStep
                  cursor={'pointer'}
                  onClick={() => handleTrans(3)}
                  mb="30px"
                  name="Overview"
                  status={tab3}
                  BlockItems={BlockItems}
                  icon={
                    <IconBox
                      h="46px"
                      w="46px"
                      ml="8px"
                      boxShadow={stepBlockIcon}
                      bg="#FFFFFF"
                      transition="all 0.2s linear 0s"
                      icon={
                        <Icon
                          as={MdOutlineSubtitles}
                          color={tab === 3 ? 'brand.500' : stepAboutStoryCheck}//icon color{}{}
                          h="24px"
                          w="24px"
                        />
                      }
                    />
                  }
                />
                <OrderStep
                  data={cblocks}
                  quest={quest}
                  cursor={'pointer'}
                  onClick={() => handleTrans(4)}
                  mb="30px"
                  name="Story"
                  status={tab4}
                  handleTargetQuest={handleTargetQuest}
                  updateExtensiveNavigation={(id: number | null) => updateExtensiveNavigation(id)}
                  extensiveNavigation={extensiveNavigation}
                  icon={
                    <IconBox
                      h="46px"
                      w="46px"
                      ml="8px"
                      boxShadow={stepAboutStoryCheck}
                      bg="#FFFFFF"
                      transition="all 0.2s linear 0s"

                      icon={
                        <Icon
                          as={GiBlackBook}
                          color={tab === 4 ? 'brand.500' : stepBlockCheck}//icon color{}{}{}
                          h="24px"
                          w="24px"
                        />
                      }

                    />
                  }
                  BlockItems={BlockItems}
                  listBlockItems={listBlockItems}
                  listQuest={listQuest}
                  id={id}
                  handleGet={handleGet}
                  fetchBlocks={fetchBlocks}
                  questTabState={questTabState}
                  setQuestTabState={setQuestTabState}
                  deleteQuest={deleteQuest}
                  delSeq={delSeq}
                />
                <OrderStep
                  cursor={'pointer'}
                  onClick={() => handleTrans(5)}
                  mb="30px"
                  name="Design"
                  status={tab5}
                  BlockItems={BlockItems}
                  icon={
                    <IconBox
                      h="46px"
                      w="46px"
                      ml="8px"
                      boxShadow={stepScoreIcon}
                      bg="#FFFFFF"
                      transition="all 0.2s linear 0s"
                      icon={
                        <Icon
                          as={FaCubes}
                          color={tab === 5 ? 'brand.500' : stepScoreCheck}//icon color{}{}{}{}
                          h="24px"
                          w="24px"
                        />
                      }
                    />
                  }
                />
                <OrderStep
                  cursor={'pointer'}
                  onClick={() => handleTrans(6)}
                  // mb="30px"
                  name="Preferences"
                  status={tab6}
                  BlockItems={BlockItems}
                  icon={
                    <IconBox
                      h="46px"
                      w="46px"
                      ml="8px"
                      // bg="radial-gradient(circle at 50% 40%, #fcfcfc, #efeff1 66%, #422afb 100%)"
                      boxShadow={stepSummariesIcon}
                      bg="#FFFFFF"
                      transition="all 0.2s linear 0s"
                      icon={
                        <Icon
                          as={MdTune}
                          color={tab === 6 ? 'brand.500' : stepSummariesCheck}//icon color{}{}{}{}{}
                          h="24px"
                          w="24px"
                        />
                      }
                    />
                  }
                />
                {/* <OrderStep
                  cursor={'pointer'}
                  onClick={() => handleTrans(7)}
                  name="Launch"
                  status={tab7}
                  BlockItems={BlockItems}
                  icon={
                    <IconBox
                      h="46px"
                      w="46px"
                      ml="8px"
                      bg="radial-gradient(circle at 50% 40%, #fcfcfc, #efeff1 66%, #422afb 100%)"
                      boxShadow={stepCompleteIcon}
                      icon={
                        <Icon
                          as={MdRocketLaunch}
                          color={stepCompleteCheck}
                          h="30px"
                          w="30px"
                        />
                      }
                    />
                  }
                /> */}
              </Flex>
            </Card>
          </HStack>
          {/* { options.map((it,i)=>(
           <Box key={i} p={'20px'}>
            <Text fontSize={20} fontWeight={700} color={'#fff'}><Icon mt={'10px'} as={MdEdit}/>{it}</Text>
            </Box>
           ))
           }  */}
          {/* </Card> */}
        </GridItem>
        <GridItem colSpan={{ sm: 5, md: 5, lg: 4 }}>
          <Box className="game-creation" mt={{ base: '100px', xl: '100px' }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>

              <GridItem w="100%" colSpan={2}>

                {/*******************Changes-14/12/23*************************/}
                {preview && <ImagePreview
                  fetchImg={fetchImg}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  values={values}
                  setValues={setValues}
                  selectedCardIndex={selectedCardIndex}
                  handleBackground={handleBackground} // Ensure this prop is included
                />}

                {tab === 1 ? (
                  <Box className='background-step' display={{ base: 'block', md: 'flex', lg: 'flex' }}>
                    <Box className='bg-img-list' width={'100%'}>
                      <Box display={'flex'} flexDir={'column'} justifyContent={'start'} alignItems={'start'}>
                        <Text fontSize={'20px'} fontWeight={800} m={'10px 10px 10px 20px'}>
                          Select a Background
                        </Text>
                      </Box>
                      <Divider mb={'0px'} />
                      <Box height={'700px'} overflowY={'auto'} borderRadius={'70px'} padding={'30px 0'}>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                          {img &&
                            img.map((img, i) => (
                              <Box key={i} position={'relative'}>
                                <Card
                                  //  backgroundColor={selections[i] ? '#11047a' : 'white'}
                                  backgroundColor={selectedCardIndex === i ? '#11047a' : 'white'}
                                  mb={{ base: '0px', xl: '10px', sm: '20px' }}
                                  padding={'13px'}
                                  key={i}
                                  position="relative"
                                  // onMouseEnter={() => handleMouseEnter(i)}
                                  // onMouseLeave={() => handleMouseLeaves(i)}
                                  onMouseEnter={() => handleH(i)}
                                  onMouseLeave={() => handleL()}
                                  // _hover={{opacity: 1}}
                                  boxShadow={
                                    backgroundIndex === i ? '1px 4px 29px #44445429' : '1px 4px 29px #44445429'
                                  }
                                  transition={'0.3s'}
                                  overflow="hidden"
                                >
                                  <Box position={'relative'} overflow={'hidden'} borderRadius={'10px'}>
                                    <Img src={img?.gasAssetImage} w="100%" h={'250px'} borderRadius="20px" cursor="pointer" />

                                    {backgroundIndex === i ? (
                                      <Flex
                                        position='absolute'
                                        bottom='0px'

                                        transform='translate(-50%, 0)'
                                        flexDirection='row'
                                        alignItems='center'
                                        justifyContent='space-between'
                                        width='100%'
                                        style={{
                                          opacity: '1',
                                          transform: 'translateY(0)',
                                          transition: 'transform 0.5s ease, opacity 0.5s ease'
                                        }}
                                      >
                                        <Box
                                          bg='white'
                                          width='50%'
                                          height='35px'
                                          borderBottomLeftRadius='10px'
                                          display='flex'
                                          alignItems='center'
                                          justifyContent='center'
                                          cursor='pointer'
                                          _hover={{
                                            bg: '#f0f0f0',
                                          }}
                                        // onClick={() => handlePreview(img, backgroundIndex, i)}

                                        >
                                          <span style={{ color: 'black' }}>Preview</span>
                                        </Box>
                                        <Box
                                          bg='#11047a'
                                          width='50%'
                                          height='35px'
                                          borderBottomRightRadius='10px'
                                          display='flex'
                                          alignItems='center'
                                          justifyContent='center'
                                          cursor='pointer'
                                          _hover={{
                                            bg: '#11047ae3',
                                          }}
                                          // onClick={() => handleButtonTwo(id)}
                                          onClick={() => handleBackground(img, i)}
                                        >
                                          <span style={{ color: 'white' }}>{selectedCardIndex === i ? 'Selected' : 'Select'}</span>

                                        </Box>

                                      </Flex>

                                    ) : (
                                      <Flex
                                        position='absolute'
                                        bottom='0'

                                        transform='translate(-50%, 0)'
                                        flexDirection='row'
                                        alignItems='center'
                                        justifyContent='space-between'
                                        width='100%'
                                        style={{
                                          opacity: '0',
                                          transform: 'translateY(20px)',
                                          transition: 'transform 0.5s ease, opacity 0.5s ease'
                                        }}
                                      >
                                        <Box
                                          bg='white'
                                          width='50%'
                                          height='35px'
                                          borderBottomLeftRadius='10px'
                                          display='flex'
                                          alignItems='center'
                                          justifyContent='center'
                                          cursor='pointer'
                                        >
                                          <span style={{ color: 'black' }}>Preview</span>
                                        </Box>
                                        <Box bg='#11047a' width='50%' height='35px' borderBottomRightRadius='10px' display='flex'
                                          alignItems='center'
                                          justifyContent='center'
                                          cursor='pointer'>
                                          {/* <span style={{ color: 'white' }}>{selections[i] ? 'Selected' : 'Select'}</span> */}
                                          <span style={{ color: 'white' }}>{selectedCardIndex === i ? 'Selected' : 'Select'}</span>
                                        </Box>
                                      </Flex>
                                    )}

                                  </Box>
                                  <Flex justifyContent={'space-between'} margin={'10px 0'} flexDirection={'column'}>
                                    <Box>
                                      <Text
                                        color={selectedCardIndex === i ? 'white' : 'black'}
                                        // fontSize={'16px'} 
                                        // fontWeight={'800'} 
                                        textTransform={'capitalize'}
                                        fontSize='md'
                                        // fontWeight={'200'}
                                        fontWeight='bold'
                                        fontFamily="DM Sans, sans-serif"
                                      >

                                        {img?.temp.tempTitle}
                                      </Text>
                                    </Box>
                                    <Box mt={2}>
                                      {/* <Text fontSize={'12px'} fontWeight={'800'} color={'#555'}>
                                        Test Title
                                      </Text> */}

                                      {backgroundIndex === i ? (<Text
                                        fontSize={'12px'}
                                        fontWeight={'500'}
                                        color={selectedCardIndex === i ? 'white' : 'black'}
                                        maxH={showFullTextStates[i] ? 'none' : '1.5em'} // Limit to one line (adjust height as needed)
                                        overflow={'hidden'}
                                        textOverflow={'ellipsis'}
                                        whiteSpace={'nowrap'}
                                      >  {truncateText(img.temp.tempStoryLine, 60, 10)}
                                      </Text>
                                      ) : ('')}

                                    </Box>
                                    <Flex
                                      justifyContent={'space-between'}
                                      margin={'0'}
                                      flexDirection={'column'}
                                      style={{ opacity: hoveredStates[i] ? 1 : 0, height: hoveredStates[i] ? 'auto' : 0, overflow: 'hidden' }}
                                    >
                                      <Box display={'flex'} alignItems={'flex-end'}>
                                      </Box>
                                      {/**TEXT**/}
                                      {/**TEXT**/}
                                    </Flex>
                                  </Flex>
                                </Card>
                              </Box>
                            ))}
                        </SimpleGrid>
                      </Box>
                    </Box>
                  </Box>
                ) : tab === 2 ? (

                  ///////////////////////Non-Player IMAGE/////////////////////////////////
                  <>
                    {preview && <CharacterPreview voices={voices} prev={preview} show={img} players={players} setPreview={setPreview} makeInputFiled={makeInputFiled} onClose={onClose} values={values} setValues={setValues} previewId={previewId} setFormData={setFormData} formData={formData} commonNextFunction={commonNextFunction} />}

                    <Box className='character-step' display={{ base: 'block', md: 'flex', lg: 'flex' }}>
                      <Box className='character-img-list' width={'100%'}>
                        <Box display={'flex'} flexDir={'column'} justifyContent={'start'} alignItems={'start'}>
                          {/* brindha included 'select a' text */}
                          <Text fontSize={'20px'} fontWeight={800} m={'10px 10px 10px 20px'}>Select a Non-Playing Character</Text>
                          {/* <Text fontSize={'14px'} fontWeight={500} m={'0px 10px 20px 20px'} color={'#8b8b8bd9'} letterSpacing={'0.5px'}>Here is the Non-Playing Character from which you can choose any one</Text>                      */}
                        </Box>
                        <Divider mb={'0px'} />
                        <Box height={'700px'} overflowY={'auto'} borderRadius={'70px'} padding={'30px 0'}>
                          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                            {players &&
                              players.map((player, i) => {
                                // Capitalize the name before passing it to the GameCard component
                                const capitalizedPlayerName = player.gasAssetName.charAt(0).toUpperCase() + player.gasAssetName.slice(1).toLowerCase();

                                return (
                                  <GameCard
                                    name={capitalizedPlayerName} // Use the capitalized name
                                    author={''}
                                    // image={game.gameBackgroundId && game?.image.gasAssetImage}
                                    image={player.gasId && player?.gasAssetImage}
                                    tabState={'charater'}
                                    id={player.gasId}
                                    handleButtonOne={playerPerview}
                                    handleButtonTwo={makeInputFiled}
                                    handelDuplicate={setFormData}
                                    handelLaunch={''}
                                    handelAssign={formData}
                                    handelMakePublic={''}
                                    handelDelete={''}
                                  />
                                );
                              })}
                          </SimpleGrid>
                        </Box>
                      </Box>
                      <Box width={'1px'} background={'#dddddd87'} marginInline={'20px'} display={'flex'}></Box>

                    </Box>
                  </>

                ) : tab === 3 ? (
                  <>
                    <AboutStory
                      defaultskills={defaultskills}
                      setDefaultSkills={setDefaultSkills}
                      setCat={setCat}
                      setFormData={setFormData}
                      setTags={setTags}
                      formData={formData}
                      handleChange={handleChange}
                      id={id}
                    />
                  </>
                ) : tab === 4 ? (
                  <>
                    <Customization id={id} formData={formData} setBlockItems={setBlockItems} serias={serias} setserias={setserias} setInput={setInput} input={input} setItems={setItems} items={items}
                      alphabet={alphabet} setAlphabet={setAlphabet}
                      interactionBlock={interactionBlock} setInteractionBlock={setInteractionBlock}
                      countalphabet={countalphabet}
                      setAlphabetCount={setAlphabetCount}
                      count={count}
                      setCount={setCount}
                      sequence={sequence}
                      setSequence={setSequence}
                      dummySequence={dummySequence}
                      setDummySequence={setDummySequence}
                      showSelectBlock={showSelectBlock}
                      setSelectBlock={setSelectBlock}
                      targetSequence={targetSequence}
                      handleKeyDown={handleKeyDown}
                      isDeleteSeq={isDeleteSeq}
                      setDeleteseq={setDeleteseq}
                      handleGet={handleGet}
                      fetchBlocks={fetchBlocks}
                      listQuest={listQuest}
                      questTabState={questTabState}
                      setQuestTabState={setQuestTabState}
                      deleteQuest={deleteQuest}
                      upNextCount={upNextCount}
                       setUpNextCount={setUpNextCount}
                    />
                  </>
                ) : tab === 5 ? (
                  <>
                    <AddScores
                      defaultskills={defaultskills}
                      setShowFunction={setShowFunction}
                      showBadge={showBadge}
                      setShowBadge={setShowBadge}
                      reflection={reflection}
                      setReflection={setReflection}
                      setBadge={setBadge}
                      formData={formData}
                      inputRef={inputRef}
                      handleChange={handleChange}
                      updateHandleIntroMusic={handleIntroMusic}
                      setFormData={setFormData}
                      setTab={setTab}
                      onOpen={onOpen}
                      isOpen={isOpen}
                      onClose={onClose}
                      serias={serias}
                      showFunction={showFunction}
                      reflectionQuestions={reflectionQuestions}
                      reflectionQuestionsdefault={reflectionQuestionsdefault}
                      setReflectionQuestions={setReflectionQuestions}
                      handleReflectionInput={handleReflectionInput}

                      handlesaveReflection={handlesaveReflection}
                      currentTab={currentTab}
                      setCurrentTab={setCurrentTab}
                      openQuest={openQuest}
                      setOpenQuest={setOpenQuest}
                      handleGet={handleGet}
                      fetchBlocks={fetchBlocks}

                      setQuestTabState={setQuestTabState}
                      listQuest={listQuest}
                      CompKeyCount={CompKeyCount}
                      setCompKeyCount={setCompKeyCount}

                      Completion={Completion}
                      compliData={compliData}
                      setCompliData={setCompliData}
                      handleCompletionScreen={handleCompletionScreen}
                      handlecompletion={handlecompletion}
                    />
                  </>
                ) : tab === 6 ? (
                  <>
                    <GreetingsForm
                      selectedAud={selectedAud}
                      setSelectedAud={setSelectedAud}
                      formData={formData}
                      setBadge={setBadge}
                      handleChange={handleChange}
                      updateSummaryState={handleSummaryState}
                      updateLanguage={handleLanguageChange}
                      updateImageBackGround={handleBackGroundImage}
                      setFormData={setFormData}
                      setSentAud={setSentAud}
                    />
                  </>
                ) : tab === 7 ? (
                  <CompletionScreen
                    formData={formData}
                    handleChange={handleChange}
                    inputRef={inputRef}
                  />
                ) : null}
              </GridItem>
            </Grid>
            <Flex justify="center">
              <Card
                display={'flex'}
                justifyContent={tab === 1 || tab === 2 ? 'end' : 'flex-end'}
                // w="350px"
                flexDirection="row"
                h="95px"
                w="500px"
                position={'fixed'}
                boxShadow={'1px 3px 14px #0000'}
                top={'24px'}
                right={'8px'}
                zIndex={99}
                background={'#0000 !important'}
              // alignItems="flex-end"
              >

                <Menu isOpen={isOpen1} onClose={onClose1}>
                  <MenuButton
                    alignItems="center"
                    justifyContent="center"
                    // bg={bgButton}
                    // _hover={bgHover}
                    // _focus={bgFocus}
                    // _active={bgFocus}
                    w="37px"
                    h="37px"
                    lineHeight="100%"
                    onClick={onOpen1}
                    borderRadius="10px"
                  // {...rest}
                  >
                    <Icon
                      as={BsShareFill}
                      color="#11047a"
                      mt="18px"
                      cursor={'pointer'}
                      w={'22px'}
                      h={'22px'}
                      mr={'9px'}
                    />
                  </MenuButton>
                  <Box
                    position="absolute"
                    left="0"
                    top="0"
                    w="150px"
                    minW="unset"
                    maxW="150px !important"
                    border="transparent"
                    // backdropFilter="blur(63px)"
                    // boxShadow={bgShadow}
                    borderRadius="20px"
                    bg="transparent"
                    p="15px"
                    zIndex="1000"
                  ><MenuList
                    w="150px"
                    minW="unset"
                    maxW="150px !important"
                    border="transparent"
                    backdropFilter="blur(63px)"
                    boxShadow={bgShadow}
                    borderRadius="20px"
                    position="absolute"
                    p="15px"
                    zIndex="1000" // Set a higher z-index value
                  >
                      <MenuItem
                        transition="0.2s linear"
                        color={textColor}
                        _hover={textHover}
                        p="0px"
                        borderRadius="8px"
                        _active={{
                          bg: 'transparent',
                        }}
                        _focus={{
                          bg: 'transparent',
                        }}
                        mb="10px"
                      // onClick={() => menu.key(props.id)}
                      >
                        <Flex align="center" >
                          <Icon as={IoIosPersonAdd} h="16px" w="16px" me="8px" />
                          <Text fontSize="sm" fontWeight="400">
                            Add Creator
                          </Text>
                        </Flex>
                      </MenuItem>
                      <MenuItem
                        transition="0.2s linear"
                        color={textColor}
                        _hover={textHover}
                        p="0px"
                        borderRadius="8px"
                        _active={{
                          bg: 'transparent',
                        }}
                        _focus={{
                          bg: 'transparent',
                        }}
                        mb="10px"
                      // onClick={() => menu.key(props.id)}
                      >
                        <Flex align="center" onClick={handleShareReview}>
                          <Icon as={GoCodeReview} h="16px" w="16px" me="8px" />
                          <Text fontSize="sm" fontWeight="400">
                            share review
                          </Text>
                        </Flex>
                      </MenuItem>
                    </MenuList>
                  </Box>
                </Menu>



                {tab !== 1 && tab !== 2 ? (
                  <Button
                    bg="#11047a"
                    _hover={{ bg: '#190793' }}
                    color="#fff"
                    h={"46px"}
                    w={"128px"}
                    display={tab === 7 ? 'none' : 'block'}
                    mr={"17px"}
                    mt={"6px"}
                    ml={"11px"}
                    onClick={handleEntirePrev}
                  >
                    Preview
                  </Button>
                ) : null}
                {/* {tab <= 1 ? null : (
                  <Button
                    bg={'#f4f7fe'}
                    color={'#000'}
                    _hover={{ bg: '#e9edf7' }}
                    w="80px"
                    mr="10px"
                    onClick={() => setTab(tab - 1)}
                  >
                    Back
                  </Button>
                )} */}
                {/* navin 15-12 */}
                {tab === 5 && currentTab === 5 ? (
                  <Button
                    bg="#11047a"
                    _hover={{ bg: '#190793' }}
                    color="#fff"
                    h={"46px"}
                    w={"128px"}
                    // onClick={() => handleButtonClick(showFunction)}
                    onClick={() => handleNext()}
                    mr={"33px"}
                    mt={"7px"}

                  >
                    Next
                  </Button>
                ) : (
                  tab !== 1 && tab !== 2 && tab !== 5 && (
                    <Button
                      bg="#11047a"
                      _hover={{ bg: '#190793' }}
                      color="#fff"
                      h={"46px"}
                      w={"128px"}
                      onClick={commonNextFunction}
                      mr={"33px"}
                      mt={"7px"}
                    >
                      {tab === 6 || tab === 7 ? 'Launch' : 'Next'}
                    </Button>
                  )
                )}

                {/* navin */}
              </Card>
            </Flex>
            {tab !== 1 && (
              <Flex justify={"flex-start"}>
                <IoArrowBackCircle
                  onClick={() => {
                    setTab(tab - 1);
                  }}
                  size={46} // Adjust the size as needed
                  color="#11047a"
                  style={{
                    position: "fixed",
                    top: "43px",
                    left: "350px",
                    zIndex: 99,
                    cursor: "pointer",
                  }}
                />
              </Flex>
            )}
            {share && tableDataCheck && (
              <ShareReviewTable isOpen={isOpen} onClose={onClose} onOpen={onOpen} tableData={tableDataCheck} />
            )}
            {entire && (
              <EntirePreview
                prevdata={prevdata}
                formData={formData}
                show={img}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
              />
            )}


          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default GameCreation;
