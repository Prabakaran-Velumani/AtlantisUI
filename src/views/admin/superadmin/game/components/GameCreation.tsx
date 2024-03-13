// ALTER TABLE `lmsgame` ADD `gameQuestNo` INT(100) NULL AFTER `gameId`;
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Img,
  SimpleGrid,
  Text,
  keyframes,
  useToast,
  useColorModeValue,
  HStack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { MdOutlineSubtitles } from 'react-icons/md';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import CharacterPreview from './CharacterPreview';
import {
  GoCodeReview,
GoEye,
  GoEyeClosed		
} from 'react-icons/go';
import Card from 'components/card/Card';
import GameCard from './gameCard';
import {
  getImages,
  updateGame,
  getGameById,
  addgame,
  createSkills,
  createCategories,
  createReflection,
  getCreatorBlocks,
  getBadge,
  getAudio,
  getVoices,
  getStory,
  getBlocks,
  getListStory,
  getDefaultSkill,
  getReflection,
  setStory,
  QuestDeletion,
  getCompletionScreen,
  UpdateCompletionScreen,
  getTotalMinofWords,
  getStoryValidtion,
  getGameCreatorDemoData,
  getSelectedLanguages,
  getMaxBlockQuestNo
} from 'utils/game/gameService';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import AboutStory from './AboutStory';
import GreetingsForm from './GreetingsForm';
import Customization from './Customize';
import IconBox from 'components/icons/IconBox';
import { TbView360 } from 'react-icons/tb';
import { FaRobot } from 'react-icons/fa';
import { GiBlackBook } from 'react-icons/gi';
import { FaCubes } from 'react-icons/fa';
import { MdTune } from 'react-icons/md';
import { IoArrowBackCircle } from 'react-icons/io5';
import { BsShareFill } from 'react-icons/bs';
import AddScores from './AddScores';
import CompletionScreen from './Completion';

import pro from 'assets/img/crm/pro.png';
// import endflag from 'assets/img/stepper/endflag.png'
import OrderStep from 'components/dataDisplay/OrderStep';
import ImagePreview from './ImagePreview';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import routes from 'routes';
import { IoIosPersonAdd } from 'react-icons/io';
import ShareReviewTable from './ShareReview';
import tableDataCheck from 'views/admin/dashboards/rtl/variables/tableDataCheck';
// import EntirePreview from './EntirePreview';
import { AiFillMessage } from 'react-icons/ai';
import { getAllReviews } from 'utils/reviews/reviews';
import { API_SERVER } from 'config/constant';
import { useDispatch } from 'react-redux';
import { updatePreviewData } from '../../../../../store/preview/previewSlice';
import { Dispatch } from '@reduxjs/toolkit'; // Import Dispatch type from @reduxjs/toolkit
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";

// @ts-ignore
import loadingImage from 'assets/img/games/loading.gif';
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
interface SelectedLanguageEntry {
  translationId: number;
  lmsMultiLanguageSupport: {
    language_name: string;
  };
  'lmsMultiLanguageSupport.language_name': string;
  // 'lmsMultiLanguageSupport.language_code': string;
}
const GameCreation = () => {
  ///////////////////Navin 15-12///////////////////////////////////
  //stroy//

  // const history = useHistory();
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
  const reflectionQuestionsdefault = [
    'What were your biggest learnings?',
    'How can you apply these learnings back at work?',
    "'What's one thing you learned about your mindset?",
    "What's one thing you are committing to change?",
  ];
  const [reflectionQuestions, setReflectionQuestions] = useState({
    ref1: 'What were your biggest learnings?',
    ref2: 'How can you apply these learnings back at work?',
    ref3: "What's one thing you learned about your mindset?",
    ref4: "What's one thing you are committing to change?",
  });

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
  const [heightOfTab, setHeightOfTab] = useState<any>();
  const previewStoreData = useSelector((state: RootState) => state.preview);
  const [validation, setValidation] = useState<any>({
    note: false,
    dialog: false,
    dialogAnimation: false,
    interaction: false,
    options: false,
  });

  /** To stop load data after naviagte from another game based on Extension*/
  const [extensiveNavigation, setExtensiveNavigation] = useState<number | null>(
    null,
  );

  ///////reflectionQuestions///////////////

  const handleReflectionInput = (e: any, i?: any) => {
    setReflectionQuestions((prevref: any) => {
      // const noteKey = `Note`;
      const refkey = `ref${i - 1}`;
      const reflecation =
        e.target.id === `reflectionQuestion${i - 1}` ? e.target.value : null;
      return {
        ...prevref,
        [refkey]: reflecation,
      };
    });
  };

  const handlesaveReflection = async () => {
    const data = {
      reflectionQuestions: reflectionQuestions,
      gameReflectionQuestion: formData.gameReflectionQuestion,
      gameId: id,
    };
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
    } else {
    }
  };

  const textHover = useColorModeValue(
    { color: 'secondaryGray.900', bg: 'unset' },
    { color: 'secondaryGray.500', bg: 'unset' },
  );
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgList = useColorModeValue('white', 'whiteAlpha.100');
  const Menupreview = { 
    zIndex: 100000000 
  };
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
  const [loading, setLoading] = useState(false);
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
	[ShowReview, setShowReview] = useState(false),											  
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


      gameNonPlayerName: null,
      gameNonPlayerVoice: null,
      gamePlayerMaleVoice: null,
      gamePlayerFemaleVoice: null,
      gameNarratorVoice: null,

			 
			   
      gameStoryLine: '',
      gameReflectionQuestion: 4,
      gameRefQuestion1: '',
      gameRefQuestion2: '',
      gameRefQuestion3: '',
      gameRefQuestion4: '',
      ///
      gameAnimationId: null,
      gameTitle: '',

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
      gamelanguageCode: '',
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
      gameIsShowAdditionalWelcomeNoteInvalid: 'false',
      isCategoryIdInvalid: false,
      //newlyadded start 
      isStoryTitleInvalid: false,
      isSkillsInvalid: false,
      isfeedbackthankyou:false,
      //newlyadded end 

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
      gameIsSetCongratsSingleMessage: 'false',

    },
  });
  const [reviews, setReviews] = useState<any[]>([]);
  const [gameId, setGameId] = useState();
  const [reviewers, setReviewers] = useState<any[]>([]);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [Completion, setCompletion] = useState<any>({});
  // const [selectedBadge, setSelectedBadge] = useState(null);
  const [CompKeyCount, setCompKeyCount] = useState<any>(0);
  const [prevdata, setPrevdata] = useState();
  const [gameInfo, setGameInfo] = useState<any | null>();
  // const [gameId, setGameId] = useState();
  // const [reviewers, setReviewers] = useState<any[]>([]);
  const { id } = useParams();
  const inputRef = useRef<HTMLButtonElement>(null);
  const [voices, setVoices] = useState([]);
  const dispatch: Dispatch<any> = useDispatch();
  const [dispatched, setDispatched] = useState(false);
  const voic = async () => {
    const result = await getVoices();

    if (result) {
      setVoices(result?.voices);
    }
  };
  let menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  ////////////////Over view //////////////
  const fetchDefaultSkill = async () => {
    const result = await getDefaultSkill(id);
    if (result?.status !== 'Success')
      return console.log('getSkills Error :', result?.error);
    // console.log('getSkills',result?.data)
    if (result?.data) {
      // console.log('result.data', result?.data);
      setDefaultSkills(result?.data);
    } else {
      setDefaultSkills([]);
    }
  };

 
  useEffect(() => {
    if (defaultskills.length === 0 && id) {
      fetchDefaultSkill();
    }

      if (id) {
        let previewData: { [key: string]: any } = {
            gameId: parseInt(id),
        };
    
        if (tab > 2 && tab < 6) {
            previewData = { ...previewData, currentTab: tab };
        }
        else{
            previewData = { ...previewData, currentTab: 3 };
        }
    
        if (currentTab) {
            previewData = { ...previewData, currentSubTab: currentTab };
        }
    
        if (questTabState) {
            previewData = { ...previewData, currentQuest: questTabState };
        }
    
        dispatch(updatePreviewData(previewData));
    }
    else{
      dispatch(updatePreviewData(null));
    }
  }, [id]);
  /////////////////////////////////
  useEffect(() => {
    voic();
  }, []);
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
        // console.log(res.data);
        setSelectedAud(res?.data);
      }
    };
    if (tab == 6) {
      setAudioInPage();
    }
    setFormData((prev) => ({ ...prev, gameLastTab: tab }));

    if (tab == 5) {
      handleCompletionScreen(1);
    }
  }, [tab]);
  let borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');
  const [languageOptions, setLanguageOptions] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [languages, setLanguage] = useState('');
  const defaultLanguageOption = { label: 'English', value: '' };
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const selectedLanguagesResult = await getSelectedLanguages(id);

        if (
          selectedLanguagesResult &&
          selectedLanguagesResult.data &&
          selectedLanguagesResult.data.selectedLanguages
        ) {
          const options = selectedLanguagesResult.data.selectedLanguages.map(
            (language: SelectedLanguageEntry) => ({
              value: language['translationId'],
              label: language['lmsMultiLanguageSupport.language_name'],
            })
          );

          setLanguageOptions(options);
        } else {
          console.error('Error: Selected languages data is missing or in unexpected format.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (isMenuOpen && (tab !== 1 )) {
      fetchLanguages();
      setMenuOpen(false); // Close the menu after fetching
    }
  }, [id, isMenuOpen, tab]);
  const handleSelectChange = (selectedOption: { value: any; label: string }) => {
    // Do something with the selected option
    console.log('Selected Option:', selectedOption);

    // Update the state and access the updated value inside a useEffect hook
    setFormData((prevFormData) => ({
      ...prevFormData,
      gamelanguageCode: selectedOption.value, // Replace 'gamelanguageId' with the appropriate property name
    }));

    setLanguage(selectedOption.value);
  };

  const handleBackGroundImage = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      gameWelcomepageBackground: e.target.id,
    }));
  };
 
														  
   
  const handleH = (i: any) => {
    setBackgroundIndex(i);
  };
  const handleL = () => {
    // setIsHovered(false)
    setBackgroundIndex('');
  };

														  
   
											   
  const handlePreview = (img: any, backgroundIndex: any, i: any) => {
    setPreview(true);
    setFetchImg((prev: any) => {
      return {
        ...prev,
        gasId: img?.gasId,
        gasAssetImage: img?.gasAssetImage,
        gasAssetName: img?.gasAssetName,
        backgroundIndex,
        i,
        temp: {
          tempTitle: img.temp.tempTitle,
          tempStoryLine: img.temp.tempStoryLine,
        },
      };
    });
    onOpen();

   
  };

  const fetch = async () => {
    const result = await getBadge(parseInt(id));
    if (result?.status === 'Success') {
      setShowBadge(result?.data);
    }
    const res = await getAudio(parseInt(id));
    if (res?.status === 'Success') {
      setSelectedAud(res?.data);
    }
  };
 
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
  const updateCreatorGameInfo = (info: any) => {
    const {
      gameview,
      image,
      lmsblocks,
      lmsquestionsoptions,
      gameQuest,
      ...gameData
    } = info?.result;
    const sortBlockSequence = (blockArray: []) => {
      const transformedArray = blockArray.reduce((result: any, obj: any) => {
        const groupKey = obj?.blockQuestNo.toString();
        // const seqKey = obj?.blockSecondaryId;
        // const SplitArray = obj?.blockPrimarySequence.toString()?.split(".")[1];
        const seqKey = obj?.blockPrimarySequence.toString()?.split('.')[1];
        if (!result[groupKey]) {
          result[groupKey] = {};
        }
        result[groupKey][seqKey] = obj;
        return result;
      }, {});
      return transformedArray;
    };
    const completionOptions = gameQuest.map((qst: any, i: number) => {
      const item = {
        gameId: qst.gameId,
        questNo: qst.gameQuestNo,
        gameIsSetMinPassScore: qst.gameIsSetMinPassScore,
        gameIsSetDistinctionScore: qst.gameIsSetDistinctionScore,
        gameDistinctionScore: qst.gameDistinctionScore,
        gameIsSetSkillWiseScore: qst.gameIsSetSkillWiseScore,
        gameIsSetBadge: qst.gameIsSetBadge,
        gameBadge: qst.gameBadge,
        gameBadgeName: qst.gameBadgeName,
        gameIsSetCriteriaForBadge: qst.gameIsSetCriteriaForBadge,
        gameAwardBadgeScore: qst.gameAwardBadgeScore,
        gameScreenTitle: qst.gameScreenTitle,
        gameIsSetCongratsSingleMessage: qst.gameIsSetCongratsSingleMessage,
        gameIsSetCongratsScoreWiseMessage:
          qst.gameIsSetCongratsScoreWiseMessage,
        gameCompletedCongratsMessage: qst.gameCompletedCongratsMessage,
        gameMinimumScoreCongratsMessage: qst.gameMinimumScoreCongratsMessage,
        gameaboveMinimumScoreCongratsMessage:
          qst.gameaboveMinimumScoreCongratsMessage,
        gameLessthanDistinctionScoreCongratsMessage:
          qst.gameLessthanDistinctionScoreCongratsMessage,
        gameAboveDistinctionScoreCongratsMessage:
          qst.gameAboveDistinctionScoreCongratsMessage,
      };
      return item;
    });
  
    setGameInfo({
      gameId: info?.result?.gameId,
      gameData: gameData,
      gameHistory: gameview,
      assets: image,
      blocks: sortBlockSequence(lmsblocks),
      gameQuest: gameQuest, //used for completion screen
      completionQuestOptions: completionOptions,
      questOptions: lmsquestionsoptions,
      reflectionQuestions: info?.resultReflection,
      gamePlayers: info?.assets?.playerCharectorsUrl,
      bgMusic:
        info?.assets?.bgMusicUrl && API_SERVER + '/' + info?.assets?.bgMusicUrl,
      gameNonPlayerUrl:
        info?.assets?.npcUrl && API_SERVER + '/' + info?.assets?.npcUrl,
    });
  };

  const fetchGameId = async () => {
    setLoading(true);
    const reviews = await getAllReviews(id);
    if (reviews && reviews?.status !== 'Success')
      return console.log(reviews?.message);
    setReviewers(reviews?.reviewerDetails);
    setReviews(reviews?.reviewlist);
    const images = await getCreatorBlocks(id);
    if (images?.status !== 'Success') {
      console.log(images.message);
    } else {
      setCblocks(images.data);
      setQuest(images.quest);
    }
    const gamedata = await getGameCreatorDemoData(id);
    if (!gamedata.error && gamedata) {
      updateCreatorGameInfo(gamedata);
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
    if (
      gameById?.data?.gameGameStage === null ||
      gameById?.data?.gameGameStage === ''
    ) {
      alert(gameById?.data?.gameGameStage);
      setFormData((prev) => ({ ...prev, gameGameStage: 'Creation' }));
    }
    if (stringGameLastTab === 111) {
      setTab(1);
      setFormData((prev) => ({ ...prev, gameLastTab: 1 }));
    } else if (stringContainingNumbers) {
      const numbersArray = stringContainingNumbers?.match(/\d+/g);
      const lastValue = numbersArray[numbersArray?.length - 1];
      // console.log('parseInt(lastValue)', numbersArray?.length);
      if (numbersArray?.length === 1) {
        setTab(2);
        setFormData((prev) => ({ ...prev, gameLastTab: 2 }));
      } else {
        // setTab(parseInt(lastValue));
        // if(tab === 6)
        // {setTab(6);}
        // else{setTab(parseInt(lastValue)+1);}
        if(tab === 6)
        {setTab(6);console.log('parseinthi');}
        else{
          if((parseInt(lastValue)+1)>=6){
            setTab(6);
          }else{
            setTab(parseInt(lastValue)+1);
          };console.log('parseinthi1',tab);}
      }
    }

    const storedSelectedIndex = localStorage.getItem('selectedCardIndex');
    if (storedSelectedIndex !== null) {
      setSelectedCardIndex(parseInt(storedSelectedIndex));
    }

    const storedReflection = await getReflection(id);
    if (storedReflection?.status !== 'Success')
      // return alert('error:' + gameById?.message);
      // console.log('storedReflection', storedReflection.data)

      setReflectionQuestions(storedReflection.data);
    setAtuoSave(true);

    // setTab(gameById?.data?.gameLastTab)

    const review = await getAllReviews(id);
    if (review && review?.status !== 'Success')
      return console.log(review?.message);
    setReviewers(review?.reviewerDetails);
    setReviews(review?.reviewlist);
    // console.log('you should read this reviews', review?.reviewlist[4]);
    setLoading(false);
  };

  const handleGet = async (quest: number) => {
				 
    setAtuoSave(false);
    // console.log('handleGet');
    // return false;
    try {
      const data = {
        quest: quest,
      };
      const result = await getStory(id, JSON.stringify(data));

      if (result?.status !== 'Success') {
        return console.log('updateBackground error :' + result?.err);
      } else {
        setserias(result.serias);
        setCount(result.count);
        if (result.alpacount) {
          setAlphabetCount(result.alpacount);
        }
        if (result.maxInput) {
          // console.log('result.nextserios',result.nextserios);
          // console.log('result1', result.items)
          const itemsArray = Object.values(result.items);
          let sequance = itemsArray.map((it: any) => it.id);
          let upNext = itemsArray.map((it: any) => it.upNext);
          // console.log('sequancesequance', itemsArray);
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
          // console.log('else part');
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
  };
  const handleCompletionScreen = async (quest: number) => {
    setAtuoSave(false);

    // return false;
    try {
      const data = {
        quest: 1,
      };
      const result = await getCompletionScreen(id, JSON.stringify(data));

      if (result?.status !== 'Success') {
        setAtuoSave(true);
        return false;
      } else {
        setCompletion(result?.data);
        setCompliData(result?.data);
        setCompKeyCount(Object.keys(result?.data).length - 1);
        if (formData && formData.gameLastTabArray) {
          const tabformArray = formData.gameLastTabArray;
          const findArrayValue = tabformArray.includes(5);
          if (findArrayValue) {
            setCurrentTab(5);
          }
          else{
            setCurrentTab(0);
          }
        }
        else{
          setCurrentTab(0);
        }
        setAtuoSave(true);
      }
    } catch (error) {
      setAtuoSave(true);
      console.error('An error occurred while sending the request:', error);
    }
  };
  const handleCompliStore = async () => {
    try {
      let data = JSON.stringify(compliData);

      const result = await UpdateCompletionScreen(id, data);
      if (result?.status !== 'Success') {
        console.log('data not updated');
      }
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }
  };
  const getDuration = async () => {
    try {
      const result = await getTotalMinofWords(id);
      if (result?.status !== 'Success') {
        console.log('data not updated');
        return false;
      }

      setFormData({
        ...formData,
        gameDuration: result.totalMinutes,
      });
      // console.log('getDuration', formData.gameDuration);
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }
  };
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
  };
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
    } else {
      setListBlockItems(result2.BlockObject);
      console.log('result2.gameIn', result2.gameIn);
      setListQuest(result2.gameIn);
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
      handleCompletionScreen(1);
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      fetchBlocks();
    }
  }, [id, items]);

useEffect(()=>{
  dispatch(updatePreviewData({isDispatched:true, CompKeyCount: CompKeyCount}))
},[CompKeyCount])

  useEffect(() => {    
    if (id) {
      const previewData = {
        gameId: parseInt(id),
        currentTab: tab,
        currentSubTab: currentTab,
        currentQuest: questTabState,
      };
      dispatch(updatePreviewData(previewData));
    }
  }, [id, tab, currentTab, questTabState]);

  const handleEntirePrev = async () => {
 
      const previewData = {
        gameId: parseInt(id),
        currentTab: tab,
        currentSubTab: currentTab,
        currentQuest: questTabState,
        isDispatched: true,
      };
      dispatch(updatePreviewData(previewData));
      const url = `/screen/preview/${id}`;
      window.open(url, '_blank');
    }

  const handleShareReview = () => {
    setEntire(false);
    setShare(true);
    onOpen();
  };
	 const handleShowReview = () => {
    setShowReview(!ShowReview);
   
  };							  

  
  const handleTrans = (tabs: number) => {
    let tabArray: number[] = [];

    // Watching Stepper Height for Green Progress
    const tab1 = document.getElementById(`tab1`)
    const title1 = tab1?.getAttribute('title');
    const getfirstElementHgt = tab1?.clientHeight;

    //tab2
    const tab2 = document.getElementById(`tab2`)
    const title2 = tab2?.getAttribute('title');
    const getsecondElementHgt = tab2?.clientHeight;
    //tab3
    const tab3 = document.getElementById(`tab3`)
    const title3 = tab3?.getAttribute('title');
    const getThirdElementHgt = tab3?.clientHeight;
    //tab4
    
    const tab4 = document.getElementById(`tab4`)    
    const title4 = tab4?.getAttribute('title');
    const getFourElementHgt = tab4?.clientHeight + getfirstElementHgt;
    const tab4Height = tabs == 4 && (getFourElementHgt + getfirstElementHgt)
    
    //tab5
    const tab5 = document.getElementById(`tab5`)
    const title5 = tab5?.getAttribute('title');
    const getFifthElementHgt = tab5?.clientHeight;
    //tab6
    const tab6 = document.getElementById(`tab6`)
    const title6 = tab6?.getAttribute('title');
    const getSixthElementHgt = tab6?.clientHeight;
    
    if(title6 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + getThirdElementHgt + getFourElementHgt + getFifthElementHgt + getSixthElementHgt + 150);
    } else if (title5 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + getThirdElementHgt + getFourElementHgt + getFifthElementHgt + 120 );
    } else if (title4 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + getThirdElementHgt + getFourElementHgt + 90 );
    } else if (title3 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + getThirdElementHgt + 60 );
    } else if (title2 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + 30);
    } else if (title1 === 'done') {
      setHeightOfTab(getfirstElementHgt);
    }

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
    } else {
      // console.log('tabArray is empty');
    }

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
            setFormData({
              ...formData,
              isStoryTitleInvalid: true,
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
            setFormData({
              ...formData,
              isSkillsInvalid: true,
            });
            return false;
          }
          if (
            !formData.gameCategoryId ||
            formData.gameCategoryId.length === 0
          ) {
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
          // console.log('inputDataitems', items, items.length);
          if (items.length !== 0) {
            if (typeof items === 'object' && items !== null) {
              var inputData = items;
              // console.log('inputData', inputData);

              for (var i = 0; i < inputData.length; i++) {
                var key = inputData[i];
                var inputkey = key.type + key.input;

                // console.log('key', key);

                if (key.type === 'Note') {
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
                if (key.type === 'Dialog') {
                  // console.log('dialogue', input[inputkey]?.dialog);
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
                if (key.type === 'Interaction') {
                  // console.log('keyinput', key.type + key.input);
                  var QuestionsEmotion = input[inputkey]?.QuestionsEmotion;
                  var blockRoll = input[inputkey]?.blockRoll;
                  var interaction = input[inputkey]?.interaction;
                  console.log('QuestionsEmotion1', QuestionsEmotion);
                  //console.log('blockRoll', blockRoll);
                  //console.log('interaction', interaction);
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

                    for (const alp of alphabetData?.filter(
                      (alp: any) => key.id === alp.seqs,
                    ) || []) {
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

                      for (const option of alphabet.map(
                        (alp: any) => alp.option,
                      )) {
                        if (
                          input[inputkey]?.ansObject[option] === 'true' ||
                          input[inputkey]?.ansObject[option] === true
                        ) {
                          const ansValue = input[inputkey]?.ansObject[option];
                          //console.log('ansValue', ansValue);
                          //console.log('hit2');
                          isAtLeastOneTrue = true;
                          if (!input[inputkey]?.scoreObject[option]) {
                            //console.log('hit3');
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
                        //console.log('hit1');
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
  };
  ///navin 15-12

  useEffect(()=> { // Watching Stepper Height

    const tab1 = document.getElementById(`tab1`)
    const title1 = tab1?.getAttribute('title');
    const getfirstElementHgt = tab1?.clientHeight;
    //tab2
    const tab2 = document.getElementById(`tab2`)
    const title2 = tab2?.getAttribute('title');
    const getsecondElementHgt = tab2?.clientHeight;
    //tab3
    const tab3 = document.getElementById(`tab3`)
    const title3 = tab3?.getAttribute('title');
    const getThirdElementHgt = tab3?.clientHeight;
    //tab4
    const tab4 = document.getElementById(`tab4`)
    const taby4 = document.getElementById(`taby4`)
    const title4 = taby4?.getAttribute('title');
    const getFourElementHgt = tab4?.clientHeight + getfirstElementHgt;
    const tab4Height = tab == 4 && (getFourElementHgt + getfirstElementHgt)
    console.log('getFourElementHgttab',questTabState);
    console.log('getFourElementHgt',getFourElementHgt)
    //tab5
    const tab5 = document.getElementById(`tab5`)
    const title5 = tab5?.getAttribute('title');
    const getFifthElementHgt = tab5?.clientHeight;
    //tab6
    const tab6 = document.getElementById(`tab6`)
    const title6 = tab6?.getAttribute('title');
    const getSixthElementHgt = tab6?.clientHeight;
    
    if(title6 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + getThirdElementHgt + getFourElementHgt + getFifthElementHgt + getSixthElementHgt + 150);
    } else if (title5 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + getThirdElementHgt + getFourElementHgt + getFifthElementHgt + 120 );
    } else if (title4 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + getThirdElementHgt + getFourElementHgt + 90 );
    } else if (title3 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + getThirdElementHgt + 60 );
    } else if (title2 === 'done') {
      setHeightOfTab(getfirstElementHgt + getsecondElementHgt + 30);
    } else if (title1 === 'done') {
      setHeightOfTab(getfirstElementHgt);
    }     
  },[tab,listQuest?.length])

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
     // Completion Screen Validation
const complidatalength = Object.keys(compliData).length;
const getcompliData = Object.keys(compliData);
console.log('getcompliData',getcompliData);

if (complidatalength !== 0) {
  for (let i = 0; i < complidatalength; i++) {
    const compkey = getcompliData[i] as unknown as keyof typeof compliData; 
    const compkeyNumber = Number(compkey);
    console.log('formDatagameThankYouMessage123Key for entry', i, ':', compkey);
    const getgameTotalScore = compliData[compkey].gameTotalScore;
    if (Array.isArray(getgameTotalScore) && getgameTotalScore.length > 0) {
      const maxScore = getgameTotalScore[0].maxScore;
      if (!maxScore) {
        toast({
          title: 'Please Enter Total Score.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setCompKeyCount(compkeyNumber);
        return false
      }
    }
    if (compliData[compkey]?.gameIsSetMinPassScore === 'true') {
      if (!compliData[compkey]?.gameMinScore) {
        toast({
          title: 'Please Enter Minimum Score.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setCompliData((prevInput: any) => ({
          ...prevInput,
          [CompKeyCount]: {
            ...prevInput[CompKeyCount],
            redBorderForMinScore: true,
          },
        }));
        setCompKeyCount(compkeyNumber);
        return false;
      }

      // Reset the red border style for the InputField
      setCompliData((prevInput: any) => ({
        ...prevInput,
        [CompKeyCount]: {
          ...prevInput[CompKeyCount],
          redBorderForMinScore: false,
        },
      }))
    }
    if (compliData[compkey]?.gameIsSetDistinctionScore === 'true') {
      if (!compliData[compkey]?.gameDistinctionScore) {
        toast({
          title: 'Please Enter Distinction  Score.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setCompKeyCount(compkeyNumber);
        return false

      }

    }
    if (compliData[compkey]?.gameIsSetBadge === 'true') {
      if (!compliData[compkey]?.gameBadge) {
        toast({
          title: 'Please Select Badge.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setCompKeyCount(compkeyNumber);
        return false

      }
      if (!compliData[compkey]?.gameBadgeName) {
        toast({
          title: 'Please Fill Badge Name.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setCompKeyCount(compkeyNumber);
        return false

      }
      if (compliData[compkey]?.gameIsSetCriteriaForBadge === 'true') {
        if (!compliData[compkey]?.gameAwardBadgeScore) {
          toast({
            title: 'Please Set Criteria for Badge .',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setCompKeyCount(compkeyNumber);
          return false
        }

      }
      if (!compliData[compkey]?.gameScreenTitle) {
        toast({
          title: 'Please Screen Title.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setCompKeyCount(compkeyNumber);
        return false
      }
      if (compliData[compkey]?.gameIsSetCongratsSingleMessage === 'true') {
        if (!compliData[compkey]?.gameCompletedCongratsMessage) {

          toast({
            title: 'Please Set CongratsMessage.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setCompKeyCount(compkeyNumber);
          return false

        }
      }
      if (compliData[compkey]?.gameIsSetCongratsScoreWiseMessage === 'true') {

        if (compliData[compkey]?.gameIsSetMinPassScore === 'true') {
          if (!compliData[compkey]?.gameMinimumScoreCongratsMessage) {
            toast({
              title: 'Please Enter Minium Score Congrats Message.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            setCompKeyCount(compkeyNumber);
            return false

          }
          if (!compliData[compkey]?.gameaboveMinimumScoreCongratsMessage) {
            toast({
              title: 'Please Enter Above Minimum Score CongratsMessage.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            setCompKeyCount(compkeyNumber);
            return false

          }
        }
        if (compliData[compkey]?.gameIsSetDistinctionScore === 'true') {
          if (!compliData[compkey]?.gameLessthanDistinctionScoreCongratsMessage) {
            toast({
              title: 'Please Enter Distinction  Score.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            setCompKeyCount(compkeyNumber);
            return false

          }
          if (!compliData[compkey]?.gameAboveDistinctionScoreCongratsMessage) {
            toast({
              title: 'Please Enter Above Distinction Score CongratsMessage.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            setCompKeyCount(compkeyNumber);
            return false

          }

        }


      }
    }
    // setCurrentTab(compkey);
    // setCurrentTab(CompKeyCount);
    setCompKeyCount(compkeyNumber);
    setCurrentTab(0);
    setCompliData((prevInput: any) => ({
      ...prevInput,
      [CompKeyCount]: {
        ...prevInput[CompKeyCount],
    
      },
    }))
  }
}
// refelection Screen Validation
if (formData.gameIsShowReflectionScreen === 'true') {
  console.log("form length" + formData.gameReflectionQuestion);
console.log('reflectionQuestions1pri',reflectionQuestions);
  if (typeof reflectionQuestions === 'object' && reflectionQuestions !== null) {

    var keys = Object.keys(reflectionQuestions);

    //newlyadded start
    if (!keys) {
      var keys1 = Object.keys(reflectionQuestions);
    }
    else {
      var keys1 = ['ref1', 'ref2', 'ref3', 'ref4'];
    }

    console.log('keysref', keys1);
    //newlyadded end
    // Assuming formData.gameReflectionQuestion is the number of questions to check
    for (var i = 0; i < formData.gameReflectionQuestion; i++) {
      var key = keys1[i] as unknown as keyof typeof reflectionQuestions; //changes keys1[i] instead of keys[i]
      var value = reflectionQuestions[key];
      if (key == 'ref1') {
        var question = "Question1";
      }
      if (key == 'ref2') {
        var question = "Question2";
      }
      if (key == 'ref3') {
        var question = "Question3";
      }
      if (key == 'ref4') {
        var question = "Question4";
      }


      if (!value) {
        toast({
          title: `${question} is empty. Please fill in the ${question} question.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setCurrentTab(2);
        return false;
      }
    }

  }
}
// Takeaway Screen Validation
if (formData.gameIsShowTakeaway === "true" && (formData.gameTakeawayContent === null || formData.gameTakeawayContent === undefined || formData.gameTakeawayContent === '')) {
  toast({
    title: 'Please Enter TakeAway Content',
    status: 'error',
    duration: 3000,
    isClosable: true,
  });
  setCurrentTab(3);
  return false;
}
// Welcome  Screen Validation
if (formData.gameIsShowAdditionalWelcomeNote === "true" && (formData.gameAdditionalWelcomeNote === null || formData.gameAdditionalWelcomeNote === undefined || formData.gameAdditionalWelcomeNote === '')) {
  toast({
    title: 'Please Add Welcome Note',
    status: 'error',
    duration: 3000,
    isClosable: true,
  });
  //newlyadded start 
  setFormData({
    ...formData,
    gameIsShowAdditionalWelcomeNoteInvalid: 'true',
  });
  setCurrentTab(4);
  //newlyadded End 
  return false;
}
// Thankyou Screen Validation
if(formData.gameThankYouMessage ==='' || formData.gameThankYouMessage ===null ||formData.gameThankYouMessage ===undefined)
{
  toast({
    title: 'Please Fill The ThankYou Box',
    status: 'error',
    duration: 3000,
    isClosable: true,
  })
  setFormData({
    ...formData,
    isfeedbackthankyou: true,
  });
  setCurrentTab(5)
return false;
}
// Feedback Screen Validation

if (formData.gameIsFeedbackMandatory === "true") {
  if (formData.gameQuestion1 === 'true' && formData.gameQuestionValue1 === '') {
    toast({
      title: 'Please Enter Question 1',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
    return false;
  } else if (formData.gameQuestion2 === 'true' && formData.gameQuestionValue2 === '') {
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
    const countSelectedOptions = selectedOptions.filter(
      (option) =>
        option !== '' &&
        option !== 'false' &&
        option !== undefined &&
        option !== null,
    ).length;
    if (formData.gameIsCollectLearnerFeedback === 'true') {
      if (countSelectedOptions === 0 || countSelectedOptions > 4) {
        toast({
          title: 'Please select atleast one option and maximum 4 options',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      if (
        formData.gameFeedBack === 'true' &&
        formData.gameFeedBackLink === ''
      ) {
        toast({
          title: 'Please Enter Feedback Link',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
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
      dispatch(updatePreviewData({isDispatched: true}));
      setOpenQuest(true);
      const MaxBlockQuestNumber = await getMaxBlockQuestNo(id); // Assuming this function returns a promise
      if (result.status === 'Success') {
        const maxQuestNo = MaxBlockQuestNumber?.data?.maxBlockQuestNo;
        console.log('Max QuestNo:', maxQuestNo);
        if (maxQuestNo < 5) {
          setOpenQuest(true);
        } else {
          setOpenQuest(false);
          setTab(6);
        }
      } else {
        console.error('Error:', result.message);
      }
    }
  };
  

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
      //console.log('formdata', formData.gameLastTabArray);
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
        setFormData({
          ...formData,
          isStoryTitleInvalid: true,
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
        setFormData({
          ...formData,
          isSkillsInvalid: true,
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
        setFormData({
          ...formData,
          isCategoryIdInvalid: true,
        });
        return false;
      }
      let cate = JSON.stringify(cat);
      let da = JSON.stringify(tags);
      const res = await createSkills(id, da);
      const cats = await createCategories(id, cate);
      if (res?.status !== 'Success' && res?.data.length === 0)
        return toast({
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
        if (items.some((item: any) => item.type === 'Interaction')) {
          if (typeof items === 'object' && items !== null) {
            var inputData = items;

            for (var i = 0; i < inputData.length; i++) {
              var key = inputData[i];
              var inputkey = key.type + key.input;
              var inputget = input;
              var inputdataget = Object.values(inputget);

              if (key.type === 'Note') {
                var note = input[inputkey].note;

                if (!note) {
                  setValidation({ ...validation, [`Note${key.input}`]: true })
                  toast({
                    title: `Note is Empty On This Sequence ${key.id} `,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return false;
                }
              }
              if (key.type === 'Dialog') {
                var Dialog = input[inputkey]?.dialog;
                var animation = input[inputkey]?.animation;
                var voice = input[inputkey]?.voice;

                if (!Dialog) {
                  setValidation({ ...validation, [`Dialog${key.input}`]: true })
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
              if (key.type === 'Interaction') {
                var QuestionsEmotion = input[inputkey]?.QuestionsEmotion;
                var blockRoll = input[inputkey]?.blockRoll;
                var interaction = input[inputkey]?.interaction;
                if (!interaction) {
                  setValidation({ ...validation, [`Interaction${key.input}`]: true })
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
                  for (const alp of alphabetData?.filter(
                    (alp: any) => key.id === alp.seqs,
                  ) || []) {
                    if (!input[inputkey]?.optionsObject[alp.option]) {
                      var option = alp.option;
                      setValidation({ ...validation, [`options${key.input}${option}`]: true })
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
                      setValidation({ ...validation, [`optionsEmotion${key.input}${option}`]: true })
                      toast({
                        title: `${option} is Empty On This Sequence ${key.id} Please Select`,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                      });
                      return false;
                    }
                    let isAtLeastOneTrue = false;

                    for (const option of alphabet.map(
                      (alp: any) => alp.option,
                    )) {
                      if (
                        input[inputkey]?.ansObject[option] === 'true' ||
                        input[inputkey]?.ansObject[option] === true
                      ) {
                        const ansValue = input[inputkey]?.ansObject[option];
                        isAtLeastOneTrue = true;
                        if (!input[inputkey]?.scoreObject[option]) {
                          setValidation({ ...validation, [`score${key.input}`]: true })
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
                      setValidation({ ...validation, [`checkbox${key.input}`]: true })
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
              var hasComplete = inputdataget.some((item: any) => {
                return (
                  item &&(item.Notenavigate === 'Complete' || item.Dialognavigate === 'Complete' || (item.navigateObjects && Object.values(item.navigateObjects).includes('Complete')))
                );
              });
                if (!hasComplete) {
                  toast({
                    title:`At least Any One of the  Select Block as Complete`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return false;
                }
            }

            const apiValidationResult = await getStoryValidtion(id);

            if (apiValidationResult?.status === 'Failure') {
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
        } else {
          toast({
            title: 'No Interaction in items.',
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
      if(formData.gameIntroMusic ==='' || formData.gameIntroMusic ===null ||formData.gameIntroMusic ===undefined)
{
  toast({
    title: 'Please Select Intro music Audio',
    status: 'error',
    duration: 3000,
    isClosable: true,
  })
 
  setCurrentTab(6)
return false;
} else{
  setFormData((formdata) => ({ ...formdata, gameGameStage: 'Review' }))
  localStorage.setItem('gameGameStage','Review');
}
    }
   
    let data = JSON.stringify(formData);
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
            const parsedGameLastTabArray = JSON.parse(
              result.data.gameLastTabArray,
            );

            // Update formData with the parsed array
            setFormData({
              ...formData,
              gameLastTabArray: parsedGameLastTabArray,
            });
            navigate(`/admin/superadmin/game/creation/${result.data.gameId}`);
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
          const { gameLastTab, ...formDataWithoutLastTab } = result?.data;
          setFormData(formDataWithoutLastTab);
          setTab(tab + 1);
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
          const { gameLastTab, ...formDataWithoutLastTab } = result?.data;

          setFormData(formDataWithoutLastTab);
          setTab(tab + 1);
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
      truncatedText = truncatedText.replace(
        new RegExp(`(.{${maxLineLength}})`, 'g'),
        '$1\n',
      );

      return truncatedText + '........';
    }
  }
  ////////////////////////////Changes-11/01/2024//////////////////////
  const handleBackground = (img: any, i: any) => {
    setDefaultstatus(false);
    // alert(i);
    // alert(img);

    // setIsSelected(!isSelected);
    setBackgroundIndex((prevIndex: any) => (prevIndex === i ? null : i));
    // setFetchImg(img?.aniId);
    setFetchImg((prev: any) => {
      return {
        ...prev,
        gasId: img?.gasId,
        gasAssetImage: img?.gasAssetImage,
        gasAssetName: img?.gasAssetName,
        i,
        title: img?.temp.tempTitle,
        stroyline: img.temp.tempStoryLine,
      };
    });


    if (selectedCardIndex !== i) {
      // Select new card and deselect the previously selected one (if any)
      setSelectedCardIndex(i);
      setFormData((prev) => ({
        ...prev,
        gameBackgroundId: img.gasId,
        gameTitle: img?.temp.tempTitle,
        gameStoryLine: img?.temp.tempStoryLine,
      }));
      localStorage.setItem('selectedCardIndex', i);
    }

    setBackgroundIndex((prevIndex: any) => (prevIndex === i ? null : i));

    const updatedSelections = [...selections];
    updatedSelections[i] = !updatedSelections[i];
    setSelections(updatedSelections);

    onClose();

    //console.log('Function3-', selectedCardIndex);
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
        setPreview(false);
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
    const feedbackselectedOptions = [
      formData.gameContent,
      formData.gameRecommendation,
      formData.gameRelevance,
      formData.gameGamification,
      formData.gameBehaviour,
      formData.gameOthers,
    ];
    const countfbSelectedOptions = feedbackselectedOptions.filter(option => option !== '' && option !== 'false' && option !== undefined && option !== null).length;

    if (checked && countfbSelectedOptions >= 4) {
      return ;
    } 
    if (name === 'gameDuration') {
      // let duration =
      //   parseInt(value.split(':')[0], 10) * 60 +
      //   parseInt(value.split(':')[1], 10);
      // setFormData((prev) => ({ ...prev, gameDuration: String(duration) }));
    } else if (
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
      name === 'gameDisableLearnerMailNotifications' ||
      name === 'gameQuestion1' ||
      name === 'gameQuestion2' ||
      name === 'gameContent' ||
      name === 'gameRelevance' ||
      name === 'gameBehaviour' ||
      name === 'gameOthers' ||
      name === 'gameGamification' ||
      name === 'gameRecommendation' ||
      name === 'gameFeedBack'
    ) {
      setFormData((prev) => ({ ...prev, [name]: String(checked) }));
    } else if (e.target.id === 'gameLaunchedWithinPlatform') {
      e.target.checked
        ? setFormData((prev) => ({ ...prev, [name]: value }))
        : setFormData((prev) => ({ ...prev, [name]: 0 }));
    } else if (name === 'gameDownloadedAsScorm') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
      //console.log('gameDownloadedAsScorm', formData.gameDownloadedAsScorm);
    } else if (name === 'gameDefaultFeedbackForm') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? feedBackForm.Yes : feedBackForm.No,
      }));
      //console.log('gameDefaultFeedbackForm', formData.gameDefaultFeedbackForm);
    } else if (name === 'gameReplayAllowed') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      //console.log('gameReplayAllowed', formData.gameReplayAllowed);
    } else if (name === 'gameLeaderboardAllowed') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      //console.log('gameLeaderboardAllowed', formData.gameLeaderboardAllowed);
    } else if (name === 'gameReflectionpageAllowed') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      // console.log(
      //   'gameReflectionpageAllowed',
      //   formData.gameReflectionpageAllowed,
      // );
    } else if (name === 'gameFeedbackQuestion') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      //console.log('gameFeedbackQuestion', formData.gameFeedbackQuestion);
    } else if (name === 'gameShuffle') {
      setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
      //console.log('gameShuffle', formData.gameShuffle);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    ///Afrith-modified-29-Dec-23
    ///Completion Screen
    if (name === 'gameIsSetCongratsSingleMessage' && !checked) {
      // Reset the value when switch is turned off
      setFormData((prevData) => ({
        ...prevData,
        gameCompletedCongratsMessage: '', // Set to an empty string or any default value
      }));
    } else if (name === 'gameIsSetCongratsScoreWiseMessage' && !checked) {
      // Reset the value when switch is turned off
    }

    ///TakeAway Screen
    else if (name === 'gameIsShowTakeaway' && !checked) {
      // Reset the value when switch is turned off
      setFormData((prevData) => ({
        ...prevData,
        gameTakeawayContent: '',
        // Set to an empty string or any default value
      }));
    }

    ///Welcome Screen
    else if (name === 'gameIsShowAdditionalWelcomeNote' && !checked) {
      // Reset the value when switch is turned off
      setFormData((prevData) => ({
        ...prevData,
        gameAdditionalWelcomeNote: '',
        // Set to an empty string or any default value
      }));
    }
    ////////////////////////////////////

    //console.log('formdata', formData);
  };

  const handlecompletion = (e: any) => {
    const inputValue = e.target.value;
    const { name, value, checked } = e.target;
    if((name === 'gameIsSetMinPassScore'  && checked === true) || (name === 'gameIsSetDistinctionScore' && checked === true)){
      setCompliData((prevInput: any) => {
        return {
          ...prevInput,
          [CompKeyCount]: {
            ...prevInput[CompKeyCount],
            gameIsSetCongratsSingleMessage: 'true',
            gameIsSetCongratsScoreWiseMessage: 'false',
          },
        };
      });
    }
    if (
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
          },
        };
      });
    } else {
      setCompliData((prevInput: any) => {
        return {
          ...prevInput,
          [CompKeyCount]: {
            ...prevInput[CompKeyCount],
            [name]: value,
          },
        };
      });
    }
    if (name === 'gameIsSetCongratsSingleMessage' && checked === true) {
      setCompliData((prevInput: any) => {
        return {
          ...prevInput,
          [CompKeyCount]: {
            ...prevInput[CompKeyCount],
            gameIsSetCongratsScoreWiseMessage: 'false',
          },
        };
      });
    }

    if (name === 'gameIsSetCongratsScoreWiseMessage' && checked === true) {
      setCompliData((prevInput: any) => {
        return {
          ...prevInput,
          [CompKeyCount]: {
            ...prevInput[CompKeyCount],
            gameIsSetCongratsSingleMessage: 'false',
          },
        };
      });
    }
  };
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
    //console.log('formData', selectedOption.value);
  };
  const handleIntroMusic = (selectedOption: OptionType | null) => {
    setFormData({ ...formData, gameIntroMusic: selectedOption.value });
    //console.log('formData', selectedOption.value);
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
  const completeShadow = 'rgba(112, 144, 176, 0.1) 0px 18px 22px inset';
  const incompleteShadow = 'rgba(112, 144, 176, 0.12) 0px 18px 40px';
  // const incompleteShadow = useColorModeValue(
  //   'inset 0px 18px 22px rgba(112, 144, 176, 0.1)',
  //   'inset 0px 4px 4px #0B1437',
  // );
  const lineColor = useColorModeValue('%23a3aed0', '%23FFFFFF1A');
  //console.log(formData.gameLastTabArray);
  // SET BORDER IN IMAGE
  const stepImgActiveBorder = 'done';
  const stepImgBorder = '';

  const tab1 =
    formData && formData?.gameLastTabArray?.includes(1)
      ? stepImgActiveBorder
      : stepImgBorder;
  const tab2 =
    formData && formData?.gameLastTabArray?.includes(2)
      ? stepImgActiveBorder
      : stepImgBorder;
  const tab3 =
    formData && formData?.gameLastTabArray?.includes(3)
      ? stepImgActiveBorder
      : stepImgBorder;
  const tab4 =
    formData && formData?.gameLastTabArray?.includes(4)
      ? stepImgActiveBorder
      : stepImgBorder;
  const tab5 =
    formData && formData?.gameLastTabArray?.includes(5)
      ? stepImgActiveBorder
      : stepImgBorder;
  const tab6 =
    formData && formData?.gameLastTabArray?.includes(6)
      ? stepImgActiveBorder
      : stepImgBorder;
  const tab7 =
    formData && formData?.gameLastTabArray?.includes(7)
      ? stepImgActiveBorder
      : stepImgBorder;

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
  const stepbgCheck = formData?.gameLastTabArray?.includes(1)
    ? stepCheckActiveColor
    : tab === 1
    ? 'brand.500'
    : stepCheckColor;
  const stepPoseCheck = formData?.gameLastTabArray?.includes(2)
    ? stepCheckActiveColor
    : tab === 2
    ? 'brand.500'
    : stepCheckColor;
  const stepAboutStoryCheck = formData?.gameLastTabArray?.includes(3)
    ? stepCheckActiveColor
    : tab === 3
    ? 'brand.500'
    : stepCheckColor;
  const stepBlockCheck = formData?.gameLastTabArray?.includes(4)
    ? stepCheckActiveColor
    : tab === 4
    ? 'brand.500'
    : stepCheckColor;
  const stepScoreCheck = formData?.gameLastTabArray?.includes(5)
    ? stepCheckActiveColor
    : tab === 5
    ? 'brand.500'
    : stepCheckColor;
  const stepSummariesCheck = formData?.gameLastTabArray?.includes(6)
    ? stepCheckActiveColor
    : tab === 6
    ? 'brand.500'
    : stepCheckColor;
  const stepCompleteCheck = formData?.gameLastTabArray?.includes(7)
    ? stepCheckActiveColor
    : tab === 7
    ? 'brand.500'
    : stepCheckColor;

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

  //console.log('input--', inputValue);

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
        gameIsSetCongratsScoreWiseMessage: 'false',
      }));
    }
  }, [formData.gameIsSetCongratsSingleMessage]);

  
  //navin
  const playerPerview = (id: any) => {
    setPreview(true);
    setPreviewId(id);
  };
  const makeInputFiled = (id: any, name: any) => {
    if (formData.gameNonPlayingCharacterId !== id) {
      setFormData((prev) => ({
        ...prev,
        gameNonPlayingCharacterId: id,
        gameNonPlayerName: name,
      }));
      setPreview(true);
    } else {
      setFormData((prev) => ({
        ...prev,
        gameNonPlayingCharacterId: '',
        gameNonPlayerName: name,
      }));
    }
  };
  const reducePercentage = 16 * tab - 16;
  
  useEffect(() => {
    if (formData.gameNonPlayingCharacterId) {
      playerPerview(formData.gameNonPlayingCharacterId);
    }
  }, [formData.gameNonPlayingCharacterId]);
  // navin

  // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',img);

  //// debounced for auto upload when onchange for reflection

  const debouncedSubmit = useCallback(
    debounce(async (data: any) => {
      try {
        const datas = JSON.stringify(data);
        const resu = await createReflection(datas);
        if (resu.status !== 'Success') {
          return false;
        }
        if(resu.status == 'Success')
        {
          dispatch(updatePreviewData({isDispatched: true, reflectionPageUpdated: true}));
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }
    }, 500),
    [id], // Empty dependency array to ensure that the function is only created once
  );

  useEffect(() => {
    if (id && autosave) {
      if (formData.gameIsShowReflectionScreen === 'true' && tab === 5) {
        if (reflectionQuestions && formData.gameReflectionQuestion) {
          const data = {
            reflectionQuestions: reflectionQuestions,
            gameReflectionQuestion: formData.gameReflectionQuestion,
            gameId: id,
          };
          debouncedSubmit(data);
          
        }
      }
    }
  }, [reflectionQuestions, formData.gameReflectionQuestion, id]);

  //// debounce for game table
  const debouncedSubmitGame = useCallback(
    debounce(async (data: any) => {
      try {
        const result = await updateGame(id, data);
        if (result?.status !== 'Success') {
        }
        else{
          dispatch(updatePreviewData({isDispatched: true}));
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }
    }, 500),
    [id], // Empty dependency array to ensure that the function is only created once
  );

  useEffect(() => {
    if (id && autosave) {
      if (formData && formData.gameQuestNo) {
        const newFormData = { ...formData };
        delete newFormData['gameLastTabArray'];
        delete newFormData['gameLastTab'];
        let data = JSON.stringify(newFormData);
        debouncedSubmitGame(data);
        setExtensiveNavigation(null);
      }
    }
  }, [formData]);

  //// debounced for auto upload when onchange
  const debouncedStorySubmit = useCallback(
    debounce(async (data: any) => {
      try {
        const result = await setStory(id, JSON.stringify(data));
        if (result?.status !== 'Success') {
          return console.log('updateBackground error :' + result?.err);
        } else {
          console.log('result data', result.data);
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }
    }, 500),
    [id], // Empty dependency array to ensure that the function is only created once
  );



  const debouncedCompliSubmit = useCallback(
    debounce(async (data: any) => {
      try {
        let datas = JSON.stringify(data);

        const result = await UpdateCompletionScreen(id, datas);
        if (result?.status !== 'Success') {
          console.log('data not updated');
        }
        else{

          dispatch(updatePreviewData({isDispatched: true}));
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      }
    }, 500),
    [id], // Empty dependency array to ensure that the function is only created once
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
          interactionBlock: interactionBlock,
        };

        debouncedStorySubmit(data);
      }
      handleCompletionScreen(1);
      getDuration();
    }
  }, [input, items]);

  useEffect(() => {
    if (id && autosave) {
      if (Object.keys(Completion).length) debouncedCompliSubmit(compliData);
    }
											   
														 
  }, [compliData]);

  ////handleCompliStore

  useEffect(() => {
    const selectBlockoptions = items.map((item: any) => ({
      value: item.input,
      label: item.id,
    }));
    setSelectBlock(selectBlockoptions);
  }, [items]);

  // onClick Func
  const duplicateSeq = (seq: any, i: any, name: any) => {
    const sequencial = `${count / 10 + 1}`;
    const upNextSequencial = `${(count + 1) / 10 + 1}`;
    const floatRegex = /^[-+]?(\d*\.\d+|\.\d+)$/;
    const id = `${serias}.${count}`;
    const upNext = `${serias}.${count + 1}`;
    setUpNext(upNext);
    setCount(count + 1);
    const newArr = { id, type: name, upNext, input: count, questNo: serias };

    setItems((prevArray: any) => {
      const nextIndex = i + 1;
      setNumber([...number, newArr.input]);
      return [
        ...prevArray.slice(0, nextIndex),
        newArr,
        ...prevArray
          .slice(nextIndex)
          .map((item: any) => ({ ...item, upNext: id })),
      ];
    });

    setSequence([...sequence, id]);
    setDummySequence([...dummySequence, id]);
    setUpNextCount([...upNextCount, upNext]);
    if (name === 'Interaction') {
      const currentAlpha = alphabet
        .slice()
        .find((item: any) => item.seqs === id);
      if (id !== currentAlpha?.seqs) {
        let secondaryArray: any = [];
        let makcount = countalphabet;

        for (let i = 0; i < 3; i++) {
          // Insert data into the array
          let inc = makcount + i + 1;
          secondaryArray.push(inc);
        }
        setAlphabetCount(secondaryArray[2]);
        setAlphabet((prev: any) => [
          ...prev,
          { seqs: id, option: 'A', secondaryId: secondaryArray[0] },
          { seqs: id, option: 'B', secondaryId: secondaryArray[1] },
          { seqs: id, option: 'C', secondaryId: secondaryArray[2] },
        ]);
      }
    }
    setInput((prevInput: any) => {
      const noteKey = `Note${count}`;
      const dialogKey = `Dialog${count}`;
      const interactionKey = `Interaction${count}`;

      // Previous Data Object
      const oldNoteKey = prevInput?.[`Note${seq.input}`];
      const oldDialogKey = prevInput?.[`Dialog${seq.input}`];
      const oldInteractionKey = prevInput?.[`Interaction${seq.input}`];

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
          },
        };
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
            voice: '',
          },
        };
      }
      if (seq.type === 'Interaction') {
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
        const filterNullFields = (
          obj: Record<string, any>,
        ): Record<string, any> => {
          return Object.fromEntries(
            Object.entries(obj).filter(([key, value]) => value !== null),
          );
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
            SkillTag: oldInteractionKey?.SkillTag,
            quesionTitle: oldInteractionKey?.quesionTitle,
            optionsObject: {
              A: optionsObject?.A,
              B: optionsObject?.B,
              C: optionsObject?.C,
            },
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
            optionTitleObject: {
              A: optionTitleObject?.A,
              B: optionTitleObject?.B,
              C: optionTitleObject?.C,
            },
            optionsemotionObject: {
              A: optionsemotionObject?.A,
              B: optionsemotionObject?.B,
              C: optionsemotionObject?.C,
            },
            optionsvoiceObject: {
              A: optionsvoiceObject?.A,
              B: optionsvoiceObject?.B,
              C: optionsvoiceObject?.C,
            },
            scoreObject: {
              A: scoreObject?.A ? scoreObject?.A : null,
              B: scoreObject?.B ? scoreObject?.B : null,
              C: scoreObject?.C ? scoreObject?.C : null,
            },
            navigateObjects: {
              A: navigateObjects?.A,
              B: navigateObjects?.B,
              C: navigateObjects?.C,
            },
          },
        };
      }
    });
  };

  const delSeq = (seq: any, i: any, name: any) => {
    const filteredNotes = Object.keys(input)
        .filter(noteKey => input[noteKey].Notenavigate === seq.input)
        .map(noteKey => {
            input[noteKey].Notenavigate = null;
            input[noteKey].NoteleadShow = null;
            return input[noteKey];
        });
    const filteredDialog = Object.keys(input)
        .filter(dialogKey => input[dialogKey].Dialognavigate === seq.input)
        .map(dialogKey => {
            input[dialogKey].Dialognavigate = null;
            input[dialogKey].DialogleadShow = null;
            return input[dialogKey];
        });
        const filteredInteraction = Object.keys(input)
        .filter(interactionkey => input[interactionkey].navigateObjects && Object.values(input[interactionkey].navigateObjects).includes(seq.input))
        .map(interactionkey => {
            Object.keys(input[interactionkey].navigateObjects).forEach(option => {
                if (input[interactionkey].navigateObjects[option] === seq.input) {
                  input[interactionkey].navigateObjects[option] = null;
                  input[interactionkey].navigateshowObjects[option] = null;
                  
                }
              });
            return input[interactionkey];
        });
    if (name === 'Interaction') {
      setAlphabet((prevAlphabet: any) => {
        // Use filter to create a new array without items that match the condition
        const updatedAlphabet = prevAlphabet?.filter(
          (item: any) => item.seqs !== seq.id,
        );
        return updatedAlphabet;
      });
    }
    setItems((previtems: any) => {
      // Use filter to create a new array without items that match the condition
      const updatedItems = previtems?.filter(
        (item: any) => item.input !== seq.input,
      );
      return updatedItems;
    });
    setDeleteseq(true);
  };
  const deleteQuest = async (gameid: any, questNo: any) => {
    const data = {
      quest: questNo,
      exid: id,
    };
    const result = await QuestDeletion(gameid, JSON.stringify(data));
    if (result?.status !== 'Success') {
      return console.log('updateBackground error :' + result?.err);
    } else {
      fetchBlocks();
      handleGet(1);
      setQuestTabState(1);
    }
  };

  let tarSeqRef;
  const handleTargetQuest = (progressItem: any, progressIndex: number) => {
    setTargetSequence(progressItem);
    tarSeqRef = document.getElementById(`tarSeqRef${progressItem?.id}`);

    if (tarSeqRef) {
      tarSeqRef.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  };

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  let arrowSeqRef: any;
  let focusSeqRef: any;

  const handleKeyDown = (event: any, i: any, seq: any) => {
    let indexToFind: any;
    setTargetSequence(seq);
    if (targetSequence) {
      indexToFind = items.findIndex(
        (item: any) => item.id === targetSequence.id,
      );
    } else {
      indexToFind = 0;
    }
    if (indexToFind >= 0 && indexToFind < items.length) {
      if (
        event.key &&
        (event.type === 'click' ||
          event.key !== 'Escape' ||
          event.ctrlKey === true)
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
          setTargetSequence(items[indexToFind === 0 ? 0 : indexToFind - 1]);
          setTimeout(() => {
            arrowSeqRef = document.getElementById(
              `tarSeqRef${items[indexToFind === 0 ? 0 : indexToFind - 1]?.id}`,
            );
            focusSeqRef = document.getElementsByClassName(
              `${items[indexToFind === 0 ? 0 : indexToFind - 1]?.id}`,
            );
            focusSeqRef?.[0].classList.add('non-caret');
            focusSeqRef?.[0].focus();
            focusSeqRef?.[0].setAttribute('readonly', 'true');
          }, 200);

          if (arrowSeqRef) {
            arrowSeqRef.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            });
          }
          break;
        case 'ArrowDown':
          setTargetSequence(
            items[
              indexToFind === items.length - 1 ? items.length : indexToFind + 1
            ],
          );
          setTimeout(() => {
            arrowSeqRef = document.getElementById(
              `tarSeqRef${
                items[indexToFind === items.length ? 0 : indexToFind + 1]?.id
              }`,
            );
            focusSeqRef = document.getElementsByClassName(
              `${
                items[indexToFind === items.length ? 0 : indexToFind + 1]?.id
              }`,
            );
            focusSeqRef?.[0]?.classList?.add('non-caret');
            focusSeqRef?.[0]?.focus();
            focusSeqRef?.[0]?.setAttribute('readonly', 'true');
          }, 200);
          if (arrowSeqRef) {
            arrowSeqRef.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            });
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
        }
      }

      if (event.code == 'Enter') {
        focusSeqRef = document.getElementsByClassName(seq.id);
        focusSeqRef?.[0].removeAttribute('readonly');
        focusSeqRef?.[0].classList.remove('non-caret');
        // focusSeqRef?.[0].focus();
      }

      if (event.ctrlKey === true && event.code === 'KeyC') {
        focusSeqRef = document.getElementsByClassName(seq.id);
        var isFieldFocused = document.activeElement.classList.contains(seq.id);
        var isFormFieldFocused = ['input', 'textarea', 'select'].includes(
          document.activeElement.tagName.toLowerCase(),
        );
        if (focusSeqRef?.[0].readOnly) {
          setCopySequence(seq);
        }
      }

      if (event.code === 'KeyV' && event.ctrlKey === true) {
        focusSeqRef = document.getElementsByClassName(seq.id);
        var isFieldFocused = document.activeElement.classList.contains(seq.id);
        var isFormFieldFocused = ['input', 'textarea', 'select'].includes(
          document.activeElement.tagName.toLowerCase(),
        );

        if (focusSeqRef?.[0].readOnly) {
          if (copySequence) {
            duplicateSeq(copySequence, i, copySequence.type);
          }
        }
      }

      if (event.ctrlKey === true && event.code === 'KeyD') {
        focusSeqRef = document.getElementsByClassName(seq.id);
        var isFieldFocused = document.activeElement.classList.contains(seq.id);
        var isFormFieldFocused = ['input', 'textarea', 'select'].includes(
          document.activeElement.tagName.toLowerCase(),
        );

        if (focusSeqRef?.[0].readOnly) {
          duplicateSeq(seq, i, seq.type);
        }
      }

      if (event.ctrlKey && event.shiftKey) {
        if (event.code === 'ArrowUp') {
          setTimeout(() => {
            focusSeqRef = document.getElementsByClassName(
              `${items[indexToFind === 0 ? 0 : indexToFind - 1]?.id}`,
            );
            focusSeqRef?.[0]?.focus();
          }, 200);
          moveItem(i, i - 1, seq);
        } else if (event.code === 'ArrowDown') {
          setTimeout(() => {
            focusSeqRef = document.getElementsByClassName(
              `${
                items[indexToFind === items.length ? 0 : indexToFind + 1]?.id
              }`,
            );
            focusSeqRef?.[0]?.focus();
          }, 200);
          moveItem(i, i + 1, seq);
        }
      }
    }
    dispatch(updatePreviewData({activeBlockSeq: parseInt(seq.id.split('.')[1])}));
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
      return {
        ...item,
        id: dummySequence[index] || item.id,
        upNext: upNextCount[index],
      };
    });

    const updateInteraction = updatedItems
      .map((item, index) => {
        if (item?.type === 'Interaction') {
          return { ...item, from: item.id, to: sequence[index] };
        }
        return null; // Return null for items that don't meet the condition
      })
      .filter((item) => item !== null);

    const updatedAlphabet = alphabet.map((item: { seqs: string }) => {
      // Find the corresponding updateInteraction item
      const correspondingUpdate = updateInteraction.find(
        (updateItem) => updateItem.from === item.seqs,
      );

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
    setBlockItems(updatedItems);
  };

  const updateExtensiveNavigation = (id: number) => {
    setExtensiveNavigation(id);
  };

  return (
    <>
      {loading && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
          <img src={loadingImage} alt="Loading" style={{ width: '25%', maxWidth: '200px', backgroundColor: 'transparent' }}/>
        </div>
      )}

      <Grid templateColumns="repeat(5, 1fr)" gap={2}>
        <GridItem
          colSpan={{ sm: 1, md: 1, lg: 1 }}
          display={{ base: 'none', lg: 'block' }}
        >
          <HStack borderRadius={'20px'} width={'280px'} overflow={'auto'}>
          <Card
              position="fixed"
              flexDirection="column"
              bg={'#E2E8F0'}
              w="18%"
              top={'2%'}
              mb={'20px'}
              h="95vh"
              borderColor="#11047a"
              boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
              overflowX={'auto'}
            >
              <Flex
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
              >
                <Text
                  color={'black'}
                  fontSize={25}
                  fontWeight={800}
                  letterSpacing={'2px'}
                  mr={'px'}
                  ml={'0px'}
                >
                  ATLANTIS
                </Text>
                <Box ml={'10px'} transform={'scale(1.3)'} borderRadius={'50%'}>
                  <SidebarResponsive routes={routes} />
                </Box>
              </Flex>
              <Flex>
                <Box
                  display="flex"
                  height="1px"
                  width="100%"
                  background="rgba(135, 140, 189, 0.3)"
                  marginTop="20px"
                ></Box>
              </Flex>
              <Flex
                position="relative"
                mt={'49px'}
                direction="column"
                justifyContent="space-between"
              >
                <Flex
                  _after={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    height: `${heightOfTab ? heightOfTab : '0px'}`,
                    bg: 'green',
                    transition: '0.5s linear',
                    zIndex: -1,
                    opacity: 1,
                  }}
                  position="absolute"
                  left="32.5px"
                  h="100%"
                  w="2px"
                  bg={'white'}
                  transition={'background 2.5s ease !important'}
                  zIndex={1}
                />
                <OrderStep
                  cursor={'pointer'}
                  onClick={() => handleTrans(1)}
                  mb="30px"
                  name="BackGround"
                  tabNo={1}
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
                          color={tab === 1 ? 'brand.500' : stepbgCheck} //icon color
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
                  tabNo={2}
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
                          color={tab === 2 ? 'brand.500' : stepPoseCheck} //icon color{}
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
                  tabNo={3}
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
                          color={tab === 3 ? 'brand.500' : stepAboutStoryCheck} //icon color{}{}
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
                  tabNo={4}
                  status={tab4}
                  handleTargetQuest={handleTargetQuest}
                  updateExtensiveNavigation={(id: number | null) =>
                    updateExtensiveNavigation(id)
                  }
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
                          color={tab === 4 ? 'brand.500' : stepBlockCheck} //icon color{}{}{}
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
                  tabNo={5}
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
                          color={tab === 5 ? 'brand.500' : stepScoreCheck} //icon color{}{}{}{}
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
                  tabNo={6}
                  status={tab6}
                  BlockItems={BlockItems}
                  icon={
                    <IconBox
                      h="46px"
                      w="46px"
                      ml="8px"
                      boxShadow={stepSummariesIcon}
                      bg="#FFFFFF"
                      transition="all 0.2s linear 0s"
                      icon={
                        <Icon
                          as={MdTune}
                          color={tab === 6 ? 'brand.500' : stepSummariesCheck} //icon color{}{}{}{}{}
                          h="24px"
                          w="24px"
                        />
                      }
                    />
                  }
                />
              </Flex>
            </Card>
          </HStack>
        </GridItem>
        <GridItem colSpan={{ sm: 5, md: 5, lg: 4 }}>
          <Box className="game-creation" mt={{ base: '100px', xl: '100px' }}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <GridItem w="100%" colSpan={2}>
                {/*******************Changes-14/12/23*************************/}
                {preview && (
                  <ImagePreview
                    fetchImg={fetchImg}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    values={values}
                    setValues={setValues}
                    selectedCardIndex={selectedCardIndex}
                    handleBackground={handleBackground} // Ensure this prop is included
                  />
                )}

                {tab === 1 ? (
                  <Box
                    className="background-step"
                    display={{ base: 'block', md: 'flex', lg: 'flex' }}
                  >
                    <Box className="bg-img-list" width={'100%'}>
                      <Box
                        display={'flex'}
                        flexDir={'column'}
                        justifyContent={'start'}
                        alignItems={'start'}
                      >
                        <Text
                          fontSize={'20px'}
                          fontWeight={800}
                          m={'10px 10px 10px 20px'}
                        >
                          Select a Background
                        </Text>
                      </Box>
                      <Divider mb={'0px'} />
                      <Box
                        height={'700px'}
                        overflowY={'auto'}
                        borderRadius={'70px'}
                        padding={'30px 0'}
                      >
                        <SimpleGrid
                          columns={{ base: 1, md: 2, lg: 3 }}
                          spacing={6}
                        >
                          {img &&
                            img.map((img, i) => (
                              <Box key={i} position={'relative'}>
                                <Card
                                  backgroundColor={
                                    selectedCardIndex === i
                                      ? '#11047a'
                                      : 'white'
                                  }
                                  mb={{ base: '0px', xl: '10px', sm: '20px' }}
                                  padding={'13px'}
                                  key={i}
                                  position="relative"
                                  onMouseEnter={() => handleH(i)}
                                  onMouseLeave={() => handleL()}
                                  boxShadow={
                                    backgroundIndex === i
                                      ? '1px 4px 29px #44445429'
                                      : '1px 4px 29px #44445429'
                                  }
                                  transition={'0.3s'}
                                  overflow="hidden"
                                >
                                  <Box
                                    position={'relative'}
                                    overflow={'hidden'}
                                    borderRadius={'10px'}
                                  >
                                    <Img
                                      src={img?.gasAssetImage}
                                      w="100%"
                                      h={'250px'}
                                      borderRadius="20px"
                                      cursor="pointer"
                                    />

                                    {backgroundIndex === i ? (
                                      <Flex
                                        position="absolute"
                                        bottom="0px"
                                        transform="translate(-50%, 0)"
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        width="100%"
                                        style={{
                                          opacity: '1',
                                          transform: 'translateY(0)',
                                          transition:
                                            'transform 0.5s ease, opacity 0.5s ease',
                                        }}
                                      >
                                        <Box
                                          bg="white"
                                          width="50%"
                                          height="35px"
                                          borderBottomLeftRadius="10px"
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="center"
                                          cursor="pointer"
                                          _hover={{
                                            bg: '#f0f0f0',
                                          }}
                                        >
                                          <span style={{ color: 'black' }}>
                                            Preview
                                          </span>
                                        </Box>
                                        <Box
                                          bg="#11047a"
                                          width="50%"
                                          height="35px"
                                          borderBottomRightRadius="10px"
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="center"
                                          cursor="pointer"
                                          _hover={{
                                            bg: '#11047ae3',
                                          }}
                                          onClick={() =>
                                            handleBackground(img, i)
                                          }
                                        >
                                          <span style={{ color: 'white' }}>
                                            {selectedCardIndex === i
                                              ? 'Selected'
                                              : 'Select'}
                                          </span>
                                        </Box>
                                      </Flex>
                                    ) : (
                                      <Flex
                                        position="absolute"
                                        bottom="0"
                                        transform="translate(-50%, 0)"
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        width="100%"
                                        style={{
                                          opacity: '0',
                                          transform: 'translateY(20px)',
                                          transition:
                                            'transform 0.5s ease, opacity 0.5s ease',
                                        }}
                                      >
                                        <Box
                                          bg="white"
                                          width="50%"
                                          height="35px"
                                          borderBottomLeftRadius="10px"
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="center"
                                          cursor="pointer"
                                        >
                                          <span style={{ color: 'black' }}>
                                            Preview
                                          </span>
                                        </Box>
                                        <Box
                                          bg="#11047a"
                                          width="50%"
                                          height="35px"
                                          borderBottomRightRadius="10px"
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="center"
                                          cursor="pointer"
                                        >
                                          <span style={{ color: 'white' }}>
                                            {selectedCardIndex === i
                                              ? 'Selected'
                                              : 'Select'}
                                          </span>
                                        </Box>
                                      </Flex>
                                    )}
                                  </Box>
                                  <Flex
                                    justifyContent={'space-between'}
                                    margin={'10px 0'}
                                    flexDirection={'column'}
                                  >
                                    <Box>
                                      <Text
                                        color={
                                          selectedCardIndex === i
                                            ? 'white'
                                            : 'black'
                                        }
                                        textTransform={'capitalize'}
                                        fontSize="md"
                                        fontWeight="bold"
                                        fontFamily="DM Sans, sans-serif"
                                      >
                                        {img?.temp.tempTitle}
                                      </Text>
                                    </Box>
                                    <Box mt={2}>
                                      {backgroundIndex === i ? (
                                        <Text
                                          fontSize={'12px'}
                                          fontWeight={'500'}
                                          color={
                                            selectedCardIndex === i
                                              ? 'white'
                                              : 'black'
                                          }
                                          maxH={
                                            showFullTextStates[i]
                                              ? 'none'
                                              : '1.5em'
                                          } // Limit to one line (adjust height as needed)
                                          overflow={'hidden'}
                                          textOverflow={'ellipsis'}
                                          whiteSpace={'nowrap'}
                                        >
                                          {' '}
                                          {truncateText(
                                            img.temp.tempStoryLine,
                                            60,
                                            10,
                                          )}
                                        </Text>
                                      ) : (
                                        ''
                                      )}
                                    </Box>
                                    <Flex
                                      justifyContent={'space-between'}
                                      margin={'0'}
                                      flexDirection={'column'}
                                      style={{
                                        opacity: hoveredStates[i] ? 1 : 0,
                                        height: hoveredStates[i] ? 'auto' : 0,
                                        overflow: 'hidden',
                                      }}
                                    >
                                      <Box
                                        display={'flex'}
                                        alignItems={'flex-end'}
                                      ></Box>
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
                    {preview && (
                      <CharacterPreview
                      id={id}
                      languages={languages}
                        voices={voices}
                        prev={preview}
                        show={img}
                        players={players}
                        setPreview={setPreview}
                        makeInputFiled={makeInputFiled}
                        onClose={onClose}
                        values={values}
                        setValues={setValues}
                        previewId={previewId}
                        setFormData={setFormData}
                        formData={formData}
                        commonNextFunction={commonNextFunction}
                      />
                    )}

                    <Box
                      className="character-step"
                      display={{ base: 'block', md: 'flex', lg: 'flex' }}
                    >
                      <Box className="character-img-list" width={'100%'}>
                        <Box
                          display={'flex'}
                          flexDir={'column'}
                          justifyContent={'start'}
                          alignItems={'start'}
                        >
                          {/* brindha included 'select a' text */}
                          <Text
                            fontSize={'20px'}
                            fontWeight={800}
                            m={'10px 10px 10px 20px'}
                          >
                            Select a Non-Playing Character
                          </Text>
                        </Box>
                        <Divider mb={'0px'} />
                        <Box
                          height={'700px'}
                          overflowY={'auto'}
                          borderRadius={'70px'}
                          padding={'30px 0'}
                        >
                          <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 3 }}
                            spacing={6}
                          >
                            {players &&
                              players.map((player, i) => {
                                // Capitalize the name before passing it to the GameCard component
                                const capitalizedPlayerName =
                                  player.gasAssetName.charAt(0).toUpperCase() +
                                  player.gasAssetName.slice(1).toLowerCase();

                                return (
                                  <GameCard
                                    name={capitalizedPlayerName} // Use the capitalized name
                                    author={''}
                                    image={
                                      player.gasId && player?.gasAssetImage
                                    }
                                    tabState={'charater'}
                                    id={player.gasId}
                                    handleButtonOne={playerPerview}
                                    handleButtonTwo={makeInputFiled}
                                    handelDuplicate={setFormData}
                                    handelLaunch={''}
                                    handelAssign={formData}
                                    handelMakePublic={''}
                                    handelDelete={''}
                                    handleDownload={''}
                                  />
                                );
                              })}
                          </SimpleGrid>
                        </Box>
                      </Box>
                      <Box
                        width={'1px'}
                        background={'#dddddd87'}
                        marginInline={'20px'}
                        display={'flex'}
                      ></Box>
                    </Box>
                  </>
                ) : tab === 3 ? (
                  <>
                    <AboutStory
                    languages={languages}
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
                    <Customization
                      reviewers={reviewers && reviewers}
                      reviews={reviews && reviews[4]}
                      id={id}
                      formData={formData}
                      setBlockItems={setBlockItems}
                      serias={serias}
                      setserias={setserias}
                      setInput={setInput}
                      input={input}
                      setItems={setItems}
                      items={items}
                      alphabet={alphabet}
                      setAlphabet={setAlphabet}
                      interactionBlock={interactionBlock}
                      setInteractionBlock={setInteractionBlock}
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
					            ShowReview={ShowReview}						 
                      validation={validation}
                      setValidation={setValidation}
                    />
                  </>
                ) : tab === 5 ? (
                  <>
                    <AddScores
                    languages={languages}
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
             {(tab !== 4 && tab !== 6) && ShowReview && (
			   
              <Menu>
                <MenuButton
                  p="0px"
                  bg={'brandScheme'}
                  position={'fixed'}
                  bottom={'0'}
                  right={'5px'}
                  className='menureviewshow'
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
                  zIndex={'100000000'}
                >
                  <FormControl >
                    <FormLabel fontSize={18} fontWeight={700}>
                      Feedback For{' '}
                      {tab === 1
                        ? 'BackGround'
                        : tab === 2
                        ? 'Non Playing Character'
                        : tab === 3
                        ? 'Overview'
                        : tab === 5
                        ? 'Design'
                        : 'Preference'}
                    </FormLabel>
                    <Box w={'360px'} maxH={'50vh'} overflowY={'scroll'}>
                      {reviews && reviews[tab] && reviews[tab]?.length !== 0 ? (
                        reviews[tab]
                          .filter((item: any) =>
                            tab === 5
                              ? item?.tabAttributeValue === String(currentTab)
                              : true,
                          )
                          .map((it: any, ind: number) => {
                            const reviewer =
                              reviewers &&
                              reviewers.find(
                                (rev: any) =>
                                  rev?.gameReviewerId === it?.gameReviewerId,
                              );
                            return (
                              <React.Fragment key={ind}>
                                <Box
                                  w={'100%'}
                                  display={'flex'}
                                  justifyContent={'space-between'}
                                >
                                  <Box
                                    w={'100%'}
                                    display={'flex'}
                                    alignItems={'center'}
                                  >
                                    <Img
                                      src={pro}
                                      w={'40px'}
                                      h={'40px'}
                                      alt="pro"
                                      borderRadius={'50%'}
                                    />
                                    <Text ml={'15px'}>
                                      {reviewer?.emailId === null
                                        ? reviewer?.ReviewingCreator?.ctMail
                                        : reviewer?.emailId}
                                    </Text>
                                  </Box>
                                  <Box whiteSpace={'nowrap'}>
                                    <Text fontSize={'14'}>
                                      Posted On :{' '}
                                      {it?.updatedAt
                                        ? new Date(
                                            it.updatedAt,
                                          ).toLocaleDateString()
                                        : ''}
                                    </Text>
                                  </Box>
                                </Box>
                                <Box mb={'10px'} mt={'10px'}>
                                  {it?.review}
                                </Box>
                              </React.Fragment>
                            );
                          })
                      ) : (
                        <Box mb={'10px'} mt={'10px'}>
                          No Feedback For{' '}
                          {tab === 1
                            ? 'Background'
                            : tab === 2
                            ? 'Non Playing Character'
                            : tab === 3
                            ? 'Overview'
                            : tab === 5
                            ? 'Design'
                            : 'Preference'}
                        </Box>
                      )}
                    </Box>
                  </FormControl>
                  <MenuItem>
                    <Box
                      w={'100%'}
                      display={'flex'}
                      justifyContent={'flex-end'}
                    >
                      <Button
                        bg="#11047a"
                        _hover={{ bg: '#190793' }}
                        color="#fff"
                        h={'46px'}
                        w={'128px'}
                        mr={'33px'}
                        mt={'7px'}
                      >
                        Close
                      </Button>
                    </Box>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
            <Flex justify="center">
              <Card
                display={'flex'}
                justifyContent={tab === 1 || tab === 2 ? 'end' : 'flex-end'}
                flexDirection="row"
                h="95px"
                w="500px"
                position={'fixed'}
                boxShadow={'1px 3px 14px #0000'}
                top={'24px'}
                right={'8px'}
                zIndex={99}
                background={'#0000 !important'}
              >
                <Menu isOpen={isOpen1} onClose={onClose1}>
                  <MenuButton
                    alignItems="center"
                    justifyContent="center"
                    w="37px"
                    h="37px"
                    lineHeight="100%"
                    onClick={onOpen1}
                    borderRadius="10px"
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
                    w="170px"
                    minW="unset"
                    maxW="170px !important"
                    border="transparent"
                    borderRadius="20px"
                    bg="transparent"
                    p="15px"
                    zIndex="1000"
                  >
                    <MenuList
                      w="170px"
                      minW="unset"
                      maxW="170px !important"
                      border="transparent"
                      backdropFilter="blur(63px)"
                      boxShadow={bgShadow}
                      borderRadius="20px"
                      position="absolute"
                      p="15px"
                      zIndex="1000" // Set a higher z-index value
                      right="0"
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
                      >
                        <Flex align="center">
                          <Icon
                            as={IoIosPersonAdd}
                            h="16px"
                            w="16px"
                            me="8px"
                          />
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
                      >
                        <Flex align="center" onClick={handleShareReview}>
                          <Icon as={GoCodeReview} h="16px" w="16px" me="8px" />
                          <Text fontSize="sm" fontWeight="400">
                            Share for Review
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
                      >
                        <Flex align="center" onClick={handleShowReview}>
                          <Icon as={ShowReview ?AiOutlineEyeInvisible:AiOutlineEye} h="16px" w="16px" me="8px" />
                          <Text fontSize="sm" fontWeight="400">
                            {ShowReview ? "Hide Review" : "Show Review"}
                          </Text>
                        </Flex>
                       
                      </MenuItem>		   
                    </MenuList>
                  </Box>
                </Menu>
                {tab !== 1 && tab !== 6 ? (
                  <Select
                    options={[defaultLanguageOption, ...languageOptions]}
                    // options={languageOptions}
                    isSearchable
                    placeholder="Language.."
                    onChange={handleSelectChange}
                    onMenuOpen={() => setMenuOpen(true)}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: '12px',
                        // borderColor: formData.isCategoryIdInvalid ? 'red' : '#ccc',
                        _focus: { borderColor: 'teal.300' },
                        minHeight: '42px',
                        cursor: 'pointer',
                        fontSize: 'sm',
                        marginRight: '17px',
                        marginTop: '6px',
                        marginLeft: '11px',
                        width: '150px'
                      }),
                    }}
                  />
                ) : null}

                {tab !== 1 && tab !== 2 ? (
                  <Button
                    bg="#11047a"
                    _hover={{ bg: '#190793' }}
                    color="#fff"
                    h={'46px'}
                    w={'128px'}
                    display={tab === 7 || tab === 6 ? 'none' : 'block'}
                    mr={'17px'}
                    mt={'6px'}
                    ml={'11px'}
                    onClick={handleEntirePrev}
                  >
                    Preview
                  </Button>
                ) : null}
                {tab === 5  ? (
                  <Button
                    bg="#11047a"
                    _hover={{ bg: '#190793' }}
                    color="#fff"
                    h={"46px"}
                    w={"128px"}
                    onClick={() => handleNext()}
                    mr={"33px"}
                    mt={"7px"}
                  >
                    Next
                  </Button>
):(
  tab !== 1 &&
  tab !== 2 &&
  tab !== 5 && (
    <Button
      bg="#11047a"
      _hover={{ bg: '#190793' }}
      color="#fff"
      h={'46px'}
      w={'128px'}
      onClick={commonNextFunction}
      mr={'33px'}
      mt={'7px'}
    >
      {tab === 6 || tab === 7 ? 'Launch' : 'Next'}
    </Button>
  )
)}

                {/* navin */}
              </Card>
            </Flex>
            {tab !== 1 && (
              <Flex justify={'flex-start'}>
                <IoArrowBackCircle
                  onClick={() => {
                    setTab(tab - 1);
                  }}
                  size={46} // Adjust the size as needed
                  color="#11047a"
                  style={{
                    position: 'fixed',
                    top: '43px',
                    left: '350px',
                    zIndex: 99,
                    cursor: 'pointer',
                  }}
                />
              </Flex>
            )}
            {share && tableDataCheck && (
              <ShareReviewTable
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                tableData={tableDataCheck}
              />
            )}
         
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default GameCreation;
