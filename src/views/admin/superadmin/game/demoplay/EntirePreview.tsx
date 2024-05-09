// case 0: // play info
// case 1: // case 1 welcome screen
// case 2: // case 2 Story
// case 3: // case 3 Reflection
// case 4: // case 4 LeaderBoard
// case 5: // case 5 Thankyou
// case 6: // case 6 Completion
// case 7: // case 7 takeaway
// case 8: // case 8 Replaygame
// case 9: // case 9 feedback
// case 10:// case 10 Game Intro / login
// case 11:// case 11 Profilescreen
// case 12:// case 12 Character select
// case 13:// case 13 Chapter select
// case 14:// case 14 feedback together
// case 15:// case 15 Chapter select
// case 16:// case 16 replay point prompt

import {
  Button,
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Img,
  Menu,
  MenuButton,
  MenuList,
  FormControl,
  FormLabel,
  Textarea,
  MenuItem,
  Select,
  GridItem,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { lazy } from 'react';
import { motion } from 'framer-motion';
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from 'react';
import SelectField from 'components/fields/SelectField';
import InitialImg from 'assets/img/games/load.jpg';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import Sample from 'assets/img/games/Character_sample.glb';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import feedi from 'assets/img/screens/feed.png';
import { AiFillMessage } from 'react-icons/ai';
import { getTestAudios, updatePreviewlogs } from 'utils/game/gameService';
import { MdClose } from 'react-icons/md';
import {
  getVoiceMessage,
  getPreview,
  getGameLanguages,
} from 'utils/game/gameService';
import { EnumType } from 'typescript';
import { ScoreContext } from './GamePreview';
import Profile from 'assets/img/games/profile.png';
import { FaDesktop, FaMobileAlt } from 'react-icons/fa';
import { IoMdTabletLandscape } from 'react-icons/io';
const Story = lazy(() => import('./playcards/Story'));
const Welcome = lazy(() => import('./playcards/Welcome'));
const ThankYou = lazy(() => import('./playcards/Thankyou'));
const Overview = lazy(() => import('./playcards/Overview'));
const Reflection = lazy(() => import('./playcards/Reflection'));
const Takeway = lazy(() => import('./playcards/Takeaway'));
const Completion = lazy(() => import('./playcards/Completion'));
const ReplayGame = lazy(() => import('./playcards/ReplayGame'));
const PlayInfo = lazy(() => import('./playcards/playinfo'));
const LeaderBoard = lazy(() => import('./playcards/Leaderboard'));
const ProfileScreen = lazy(() => import('./playcards/ProfileScreen'));
const Characterspage = lazy(() => import('./playcards/CharacterSelection'));
const ChapterPage = lazy(() => import('./playcards/Chapters'));
const FeedBackScreen = lazy(() => import('./playcards/FeedBackScreen'));
const TopMenuBar = lazy(() => import('./playcards/TopMenuBar'));
const GameIntroScreen = lazy(() => import('./playcards/GameIntroScreen'));
const ModelPopup = lazy(() => import('./playcards/ModelPopup'));
const ReplayPoints = lazy(() => import('./playcards/ReplayPoints'));
const LanguageSelectionPrompt = lazy(() => import('./playcards/LanguageSelectionPrompt'));
const PromptScreen = lazy(() => import('./playcards/PromptScreen'));
const CharacterModal = lazy(() => import ('./playcards/CharacterModal'));

interface Review {
  reviewerId: String | null;
  reviewGameId: String | null;
  review: String | null;
  tabId: Number | null;
  tabAttribute: String | null;
  tabAttributeValue: String | null;
}

interface ShowPreviewProps {
  gameInfo: any;
  handleSubmitReview: (data: any) => Promise<boolean>;
  isReviewDemo: boolean;
  currentScore: any;
  setCurrentScore: any;
  preloadedAssets: any;
  InitialScreenId: number;
  setprevScreenId?: any;
  setPreviewLogsId?: any;
  getPreviewLogsId?: any;
  setPreLogDatas?: any;
  getPrevLogDatas?: any;
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
  score?: any;
  allTimeScore?: any;
  content?: any;
  audioUrls?: any;
  textId?: any;
  fieldName?: any;
}
interface QuestState {
  [key: string]: string;
}

const skipScreenList = [0, 8, 11, 12, 13, 15];
export const ProfileContext = createContext<ProfileDataType>({
  name: '',
  gender: '',
  language: '',
  score: 350,
  allTimeScore: 950,
});
type QuestWiseMaxTotal = { [key: number]: number };
const EntirePreview: React.FC<ShowPreviewProps> = ({
  gameInfo,
  handleSubmitReview,
  isReviewDemo,
  currentScore,
  setCurrentScore,
  preloadedAssets,
  InitialScreenId,
  setprevScreenId,
  getPrevLogDatas,
  setPreLogDatas,
}) => {
  const user: any = JSON.parse(localStorage.getItem('user'));
  const { colorMode, toggleColorMode } = useColorMode();
  const maxTextLength = 80;
  const audioRef = React.useRef(null);

  // selected option color change
  const [selectedOption, setSelectedOption] = useState(null);
  // handle the item
  const [item, setItem] = useState(null);
  // handle the data to show
  const [data, setData] = useState(null);
  // handle the transition effect
  const [showNote, setShowNote] = useState(false),
    [first, setFirst] = useState(false);
  // type to render component ( conditional render)
  const [type, setType] = useState<string>('');
  // handle the choosed option's response message and feedback content and navigation
  const [resMsg, setResMsg] = useState<string>('');
  const [feed, setFeed] = useState<string>('');
  const [navi, setNavi] = useState<string>('');
  const [options, setOptions] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [optionNavigation, setOptionNavigation] = useState(null);
  const [getSelectedOptions, SetgetSelectedOptions] = useState<any>({});

  /** This state handles the Review Form Tab and Sub Tab options */
  const [reviewTabOptions, setReviewTabOptions] = useState([]);
  const [questState, setQuestState] = useState<QuestState>({});
  const [filteredTabOptions, setFilteredTabOptions] = useState([]);
  // Feed back after completion
  const [FeedbackcurrentPosition, setFeedbackCurrentPosition] = useState(0);
  const [interactionBlockArray, setInterActionBlockArray] = useState<any | []>(
    [],
  );
  const [FeedbackremainingSentences, setFeedbackRemainingSentences] = useState<
    any[]
  >([]);
  const [FeedbackNavigatenext, setFeedbackNavigateNext] = useState<any>(false);
  const [isScreenshot, setisScreenshot] = useState<any>(false);
  const [FeedBackoptionData, setFeedBackoptionData] = useState(null);
  const [FeedBackselectedoptionData, setFeedBackSelectedoptionData] =
    useState(null);
  const [isOptionalReplay, setisOptionalReplay] = useState<any>(false);
  const [isReplay, setisReplay] = useState<any>(false);
  const [profilescore, Setprofilescore] = useState(null);
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
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [audio, setAudio] = useState<string>('');
  // type EnumType = 'bgm' | 'api';
  // const [audioObj, setAudioObj] = useState<{
  //   url: string;
  //   type: EnumType;
  //   volume: string;
  //   loop: boolean;
  //   autoplay: boolean;
  // }>({
  //   url: '',
  //   type: 'bgm',
  //   volume: '0.5',
  //   loop: true,
  //   autoplay: true,
  // });


  const [audioVolume, setAudioVolume] = useState<any>(0.5);
  const [nextBlockAudioUrl, setNextBlockAudioUrl] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState(null);
  const [windowHeight, setWindowHeight] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [game3Position, setGame3Position] = useState({
    previousBlock: '',
    currentBlock: '',
    nextBlock: '',
  });
  const [currentStoryBlockSeq, setCurrentStoryBlockSeq] =
    useState<string>(null);
  const [demoBlocks, setDemoBlocks] = useState(null);
  const Tab5attribute = [6, 4, 3, 7, 1, 5];
  const userProfile = useContext(ProfileContext);
  const [currentQuestNo, setCurrentQuestNo] = useState(1);
  const [homeLeaderBoard, setHomeLeaderBoard] = useState(null);
  const { profile, setProfile } = useContext(ScoreContext);
  const tabAttributeSets: TabAttributeSet[] = [
    { '1': { tabAttribute: null, tabAttributeValue: null } },
    { '2': { tabAttribute: null, tabAttributeValue: null } },
    { '3': { tabAttribute: 'fieldName', tabAttributeValue: '' } },
    { '4': { tabAttribute: 'blockSeqId', tabAttributeValue: '' } },
    { '5': { tabAttribute: 'screenId', tabAttributeValue: '' } },
  ];
  const [isPrevNavigation, setIsPrevNavigation] = useState(false);
  const gameScore = useContext(ScoreContext);
  const scoreComp = profile?.score[0]?.score ? profile?.score[0]?.score : 0;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [questWiseMaxTotal, setQuestWiseMaxTotal] = useState<QuestWiseMaxTotal>();

  const [ModelControl, setModelControl] = useState<boolean>(false); // for model show
  const [LastModified, setLastModified] = useState<boolean>(false); // for last modified
  const [isStoryScreen, isSetStoryScreen] = useState<boolean>(false);
  const [OptionSelectId, setOptionSelectId] = useState(null);




  useEffect(() => {
    setProfileData((prev: any) => ({ ...prev, score: scoreComp }));
  }, [scoreComp]);
  useEffect(() => {
    const totalEarnScore = profile?.score.reduce(
      (acc: any, obj: any) => acc + parseInt(obj.score),
      0,
    );
    // setprevProfileData((prev: any) => ({ ...prev, score: totalEarnScore }));
    // const totalEarnScore = profile?.score.reduce((acc: any, obj: any) => acc + parseInt(obj.score), 0);
    setPreLogDatas((prev: any) => ({
      ...prev,
      previewProfile: { ...prev.previewProfile, score: totalEarnScore },
    }));
  }, [profile?.score]);

  const [profileData, setProfileData] = useState({
    name: '',
    gender: '',
    language: '',
    score: '',
    allTimeScore: 250,
    content: '',
    audioUrls: '',
    textId: '',
    fieldName: '',
    Audiogetlanguage: [],
  });

  const [voiceIds, setVoiceIds] = useState<any>();
  const [feedbackList, setFeedbackList] = useState([]);
  const [interactionCount, setinteractionCount] = useState(null);
  const [isGetsPlayAudioConfirmation, setIsGetsPlayAudioConfirmation] =
    useState<boolean>(false);
  const [reflectionAnswers, setReflectionAnswers] = useState([]);
  const [resolution, setResolution] = useState(null);
  const [navTrack, setNavTrack] = useState([]);
  const [currentTrackPointer, setCurrentTrackPointer] = useState(0);
  const [currentScreenId, setCurrentScreenId] = useState<number>(InitialScreenId);
  const [hasMulitLanguages, setHasMulitLanguages] = useState<boolean>(false); // This state to control the auto Initialization of the Language selection Modal popup
  const [isOpenCustomModal, setIsOpenCustomModal] = useState<boolean>(false); //This state to control the opening of Language selection Modal popup by click event 
  const [gameLanguages, setGameLanguages] = useState([]);
  const [NavigateBlockEmpty, setNavigateBlockEmpty] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [RepeatSelectOption, setRepeatSelectOption] = useState<boolean>(false);
  const [RepeatPrevOption, setRepeatPrevOption] = useState<any>([]);
  const [modelScreen, setModelScreen] = useState<Boolean>(false);

  /******************************This for controll backgroud bgm and voice 09.05.2024**********************************/
  const EnumType = {
    BGM: 'bgm',
    VOICE: 'voice',
  };
  const backgroundBgmRef = useRef<HTMLAudioElement>(null);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const [audioObj, setAudioObj] = useState<{
    url: string;
    type: string;
    volume: string;
    loop: boolean;
    autoplay: boolean;
  }>({
    url: '',
    type: EnumType.BGM,
    volume: '0.5',
    loop: true, // Background loops
    autoplay: true,
  });
  const fetchDefaultBgMusic = async () => {
    const res = await getTestAudios(); //default bg audio fetch
    if (res?.status === 'success' && res?.url) {
      console.log('currentscreenid 359',currentScreenId);
      setAudioObj({
        url: res?.url,
        type: EnumType.BGM,
        volume: '0.5',
        loop: true, // Voice doesn't loop
        autoplay: true,
      });
    }
    // setAudioObj({
    //   url: res?.url,
    //   type: 'bgm',
    //   volume: '0.5',
    //   loop: true,
    //   autoplay: true,
    // });

  };

  useEffect(() => {
    setDemoBlocks(gameInfo?.blocks);
    if (data === null) {
      setType(gameInfo?.blocks[profile?.currentQuest]['1']?.blockChoosen);
      setData(gameInfo?.blocks[profile?.currentQuest]['1']);
      if (
        gameInfo?.blocks[profile?.currentQuest]['1']?.blockChoosen ===
        'Interaction'
      ) {
        const optionsFiltered = [];
        const primarySequence =
          gameInfo.blocks[profile.currentQuest]['1'].blockPrimarySequence;

        for (const option of gameInfo.questOptions) {
          if (profileData?.Audiogetlanguage.length > 0) {
            if (option?.qpSequence === primarySequence) {
              const profilesetlan = profileData?.Audiogetlanguage.find(
                (key: any) => key?.textId === option.qpOptionId,
              );

              if (profilesetlan) {
                const languagecont = {
                  ...option,
                  qpOptionText: profilesetlan.content,
                };
                optionsFiltered.push(languagecont);
              } else {
                optionsFiltered.push(option);
              }
            }
          } else {
            if (option?.qpSequence === primarySequence) {
              optionsFiltered.push(option);
            }
          }
        }
        if (gameInfo?.gameData?.gameShuffle === 'true') {
          for (let i = optionsFiltered.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionsFiltered[i], optionsFiltered[j]] = [
              optionsFiltered[j],
              optionsFiltered[i],
            ]; // Swap elements at indices i and j
          }
        }
        setOptions(optionsFiltered);
      }
    }



    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause the audio when the page is hidden
        if (!audioRef.current?.paused) {
          audioRef.current?.pause();
        }
      } else {
        // Resume the audio when the page becomes visible again
        if (audioRef.current?.paused) {
          audioRef.current?.play();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [profile?.currentQuest]);

  useEffect(() => {
    const calculatePlayerGrandTotal = async () => {
      const scores =
        questState[profile?.currentQuest] == 'Started'
          ? profile?.score
          : profile?.replayScore.length > 0
          ? profile?.replayScore
          : profile?.score;
      let total: number = 0;

      if (currentScreenId == 13) {
        //For chapter Selection Screen
        if (scores.length > 0) {
          const total = scores.reduce((acc: any, row: any) => {
            const quest = profile?.currentQuest;
            if (row.quest == quest) {
              return acc + row.score;
            } else {
              return acc;
            }
          }, 0);

          setProfile((prev: any) => ({
            ...prev,
            playerGrandTotal: {
              ...prev?.playerGrandTotal,
              [profile?.currentQuest]: total,
            },
          }));
        }
      } else if ([2, 4, 6, 8, 9, 14].includes(currentScreenId)) {
        //for story, completion screen, feedback, replay etc.,
        const scoreArray =
          questState[parseInt(profile?.currentQuest)] == 'Started'
            ? profile?.score
            : profile?.replayScore;
        if (scoreArray?.length > 0) {
          total = scoreArray.reduce((acc: number, cur: any) => {
            if (cur.quest == profile.currentQuest) {
              return acc + cur.score;
            } else {
              return acc;
            }
          }, 0);
          setProfile((prev: any) => ({
            ...prev,
            playerGrandTotal: {
              ...prev?.playerGrandTotal,
              [profile?.currentQuest]: total,
            },
          }));
        }
      }
      return;
    };
    calculatePlayerGrandTotal();
  }, [profile.score, profile.replayScore, currentScreenId]);

  useEffect(() => {
    if (!gameInfo?.bgMusic) {
      fetchDefaultBgMusic();
    } else if (gameInfo?.bgMusic) {
      // currentScreenId > 0 &&
      //   currentScreenId === 1 &&
      //   isGetsPlayAudioConfirmation &&
      //   setAudioObj({
      //     url: gameInfo?.bgMusic,
      //     type: 'bgm',
      //     volume: '0.5',
      //     loop: true,
      //     autoplay: true,
      //   });
      const screens = [1, 3, 4, 5, 6, 7, 11, 12, 13]
      console.log('currentscreenid 589',currentScreenId);
      if (screens.includes(currentScreenId) && currentScreenId!== 2) {
        setAudioObj({
          url: gameInfo?.bgMusic,
          type: EnumType.BGM,
          volume: '0.5',
          loop: true, // Voice doesn't loop
          autoplay: true,
        });
      }
    }
  }, [gameInfo]);

  useEffect(() => {
    // setAudioObj({
    //   url: gameInfo?.bgMusic,
    //   type: 'bgm',
    //   volume: '0.5',
    //   loop: true,
    //   autoplay: true,
    // });
  }, [isGetsPlayAudioConfirmation]);

  useEffect(() => {
    // setAudioObj({
    //   url: audio,
    //   type: 'api',
    //   volume: '0.5',
    //   loop: false,
    //   autoplay: true,
    // });
    console.log('currentscreenid 620',currentScreenId);
    setAudioObj({
      url: audio,
      type: EnumType.BGM,
      volume: '0.5',
      loop: true, // Voice doesn't loop
      autoplay: true,
    });
  }, [audio]);

  useEffect(() => {
    /*
    // Check if audioRef exists and audioObj.url is not empty
    if (audioRef.current && audioObj.url !== '') {
      // Pause the audio playback if it's currently playing
      if (!audioRef.current?.paused) {
        audioRef.current.pause();
      }
      // Update the audio source and play if necessary
      audioRef.current.src = audioObj.url;
      try {
        if (audioObj.autoplay || isGetsPlayAudioConfirmation) {
          audioRef.current.play();
        }
      } catch {
        console.log('Error Required');
      }
    } else {
      // Stop the audio playback and set audioRef.current to null
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
    */
    const handleAudio = (audioRef: React.RefObject<HTMLAudioElement>, audio: any) => {
      if (audioRef.current) {
        audioRef.current.src = audio.url;
        audioRef.current.volume = parseFloat(audio.volume);
        audioRef.current.loop = audio.loop;
        audioRef.current.autoplay = audio.autoplay;
        console.log('audio.url',audio.url);

        // Play or pause audio based on the autoplay property
        if (audioObj.autoplay) {
          if (audioObj.type === EnumType.BGM && backgroundBgmRef.current) {
            backgroundBgmRef.current.play().catch(error => {
              // Handle play promise rejection
              console.error('Error playing background BGM:', error);
            });
          } else if (audioObj.type === EnumType.VOICE && voiceRef.current) {
            voiceRef.current.play().catch(error => {
              // Handle play promise rejection
              console.error('Error playing voice:', error);
            });
          }
        } else {
          if (audioObj.type === EnumType.BGM && backgroundBgmRef.current) {
            backgroundBgmRef.current.pause();
          } else if (audioObj.type === EnumType.VOICE && voiceRef.current) {
            voiceRef.current.pause();
          }
        }
      }
    };

    if (audioObj.type === EnumType.BGM) {
      handleAudio(backgroundBgmRef, audioObj);
    } else if (audioObj.type === EnumType.VOICE) {
      handleAudio(voiceRef, audioObj);
    }
  }, [audioObj]);

  // useEffect(() => {
  //   // Check if the audio type is 'api'
  //   if (audioObj.type === 'api') {
  //     // Check if the current audio reference exists
  //     if (audioRef.current) {
  //       // Add an event listener to the 'ended' event of the audio element
  //       audioRef.current.addEventListener('ended', handleAudioEnded);
  //     }
  //   }

  //   // Cleanup function to remove the event listener when the component unmounts or when the audioRef changes
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.removeEventListener('ended', handleAudioEnded);
  //     }
  //   };
  // }, [audioObj.type, audioRef.current]); // Watch for changes in audioObj.type and audioRef.current

  // Event handler for when the audio playback ends
  const handleAudioEnded = () => {
    // Set the current audio reference to null
    audioRef.current = null;
  };

  useEffect(() => {
    if (gameInfo) {
      setVoiceIds({
        narrator:
          gameInfo?.gameData?.gameNarratorVoice ?? 'D38z5RcWu1voky8WS1ja',
        playerMale:
          gameInfo?.gameData?.gamePlayerMaleVoice ?? '2EiwWnXFnvU5JabPnv8n',
        playerFemale:
          gameInfo?.gameData?.gamePlayerFemaleVoice ?? '21m00Tcm4TlvDq8ikWAM',
        NPC: gameInfo?.gameData?.gameNonPlayerVoice ?? '5Q0t7uMcjvnagumLfvZi',
        Intro: '', //Get the intro music for the game.gameBadge(Primary Key)
      });
    }
  }, [gameInfo?.gameData]);

  useEffect(() => {
    // currentScreenId > 0 &&
    //   currentScreenId === 1 &&
    //   isGetsPlayAudioConfirmation &&
    currentScreenId!== 2 &&
       setAudio(gameInfo?.bgMusic ?? '');


  }, [currentScreenId, gameInfo]);

  const prevData = (current: any) => {
    const quest = current ? current?.blockPrimarySequence.split('.')[0] : null;
    const currentBlock = current
      ? parseInt(current?.blockPrimarySequence.split('.')[1])
      : null;

    navTrack.pop(); //clears last index sequence
    if (navTrack.length > 0) {
      const newTrackSequence = navTrack[navTrack.length - 1];
      const prevBlock = current
        ? Object.keys(demoBlocks[quest] || {})
            .filter(
              (key) =>
                demoBlocks[quest]?.[key]?.blockPrimarySequence ==
                newTrackSequence,
            )
            .map((key: any) => demoBlocks[quest]?.[key])
        : [];

      const currentQuest = current
        ? parseInt(current?.blockPrimarySequence.split('.')[0])
        : null;
      setCurrentQuestNo(currentQuest);
      if (
        prevBlock.length !== 0
        &&
        prevBlock[0]?.blockChoosen !== 'Interaction'
      ) {
        /*** Handle the previous track */
        const removedElement = navTrack.pop();
        setNavTrack(navTrack);
        /*** End of Handle the previous track */

        setType(prevBlock[0]?.blockChoosen);
        setData(prevBlock[0]);

        setIsPrevNavigation(true);
        return false;
      }
    } else {
      return false;
    }
  };
  // This Function For LastModified Previous

  const checkAndUpdateScores = async () => {
    const currentQuest = profile.currentQuest;
    if (questState[currentQuest] !== 'Started') {
      const calcQuestGrandTotal = async (
        scores: any,
        currentQuestNo: any = null,
      ) => {
        if (scores?.length <= 0) {
          return 0;
        }
        if (currentQuestNo != null) {
          // Sum score of a quest
          const totalScore = scores.reduce((total: number, sc: any) => {
            if (sc.quest == currentQuestNo) {
              return total + sc.score;
            } else {
              return total;
            }
          }, 0);
          return totalScore; // Return the total score
        } else {
          //Sum up all the scores
          return scores.reduce((total: number, sc: any) => total + sc.score, 0);
        }
      };
      const scoreTotal = await calcQuestGrandTotal(
        profile.score,
        profile.currentQuest,
      );
      const replayScoreTotal = await calcQuestGrandTotal(
        profile.replayScore,
        profile.currentQuest,
      );
      if (scoreTotal < replayScoreTotal) {
        const currentQuestRemovedScoreArr = profile.score.filter(
          (item: any) => item.quest != profile.currentQuest,
        );
        let concatenatedScoreArr: any[] = [];
        if (profile.replayScore.length > 0) {
          concatenatedScoreArr = profile.replayScore.filter(
            (item: any) => item.quest == profile.currentQuest,
          );
        }
        if (currentQuestRemovedScoreArr.length > 0) {
          concatenatedScoreArr = [
            ...concatenatedScoreArr,
            ...currentQuestRemovedScoreArr,
          ];
        }
        const currentQuestRemovedReplayScoreArr = profile.replayScore.filter(
          (item: any) => item.quest != profile.currentQuest,
        );
        setProfile((prev: any) => ({
          ...prev,
          score: concatenatedScoreArr,
          replayScore: currentQuestRemovedReplayScoreArr,
        }));
      } else {
        const currentQuestRemovedReplayScoreArr = profile.replayScore.filter(
          (item: any) => item.quest != profile.currentQuest,
        );
        setProfile((prev: any) => ({
          ...prev,
          replayScore: currentQuestRemovedReplayScoreArr,
        }));
      }
    }
  };
  const LastModiPrevData = (current: any) => {
    const quest = current ? current?.blockPrimarySequence.split('.')[0] : null;
    const lastSeq = getPrevLogDatas.nevigatedSeq[current.blockQuestNo];
    const secondLastSeq = lastSeq[lastSeq.length - 2];
    const currentBlock = current
      ? parseInt(current?.blockPrimarySequence.split('.')[1])
      : null;
    const previousItem = currentBlock != null ? currentBlock - 1 : null;
    const prevSeq = current
      ? `${current?.blockPrimarySequence.split('.')[0]}.${previousItem}`
      : '';
    const currentQuest = current
      ? parseInt(current?.blockPrimarySequence.split('.')[0])
      : null;
    setCurrentQuestNo(currentQuest);
    if (type !== 'Interaction') {
      if (type === 'response' && resMsg !== '') {
        setType(current?.blockChoosen);
        setData(current);
        if (current?.blockChoosen === 'Interaction') {
          const optionsFiltered = [];
          for (const option of gameInfo.questOptions) {
            if (option?.qpSequence === current?.blockPrimarySequence) {
              optionsFiltered.push(option);
            }
          }
          if (gameInfo?.gameData?.gameShuffle === 'true') {
            for (let i = optionsFiltered.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [optionsFiltered[i], optionsFiltered[j]] = [
                optionsFiltered[j],
                optionsFiltered[i],
              ];
            }
          }
          setOptions(optionsFiltered);
          return false;
        }
      }
      if (type === 'feedback' && feed !== '' && resMsg !== '') {
        setType('response');
        setData(current);
        setResMsg(resMsg);
        return false;
      }
      if (type === 'feedback' && feed !== '' && resMsg === '') {
        setType(current?.blockChoosen);
        setData(current);
        if (current?.blockChoosen === 'Interaction') {
          const optionsFiltered = [];
          for (const option of gameInfo.questOptions) {
            if (option?.qpSequence === current?.blockPrimarySequence) {
              optionsFiltered.push(option);
            }
          }
          if (gameInfo?.gameData?.gameShuffle === 'true') {
            for (let i = optionsFiltered.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [optionsFiltered[i], optionsFiltered[j]] = [
                optionsFiltered[j],
                optionsFiltered[i],
              ];
            }
          }
          setOptions(optionsFiltered);
          return false;
        }
      }
    }
    const newTrackSequence = navTrack[navTrack.length - 1];
    // console.log('navPrevBlock[1].blockLeadTo == current.blockSecondaryId 767',newTrackSequence)
    const navPrevBlock = current
      ? Object.keys(demoBlocks[quest] || {})
        .filter(
          (key) =>
            demoBlocks[quest]?.[key]?.blockPrimarySequence ==
            newTrackSequence,
        )
        .map((key: any) => demoBlocks[quest]?.[key])
      : [];
    // console.log('navPrevBlock[1].blockLeadTo == current.blockSecondaryId 777',navPrevBlock)
    if (navPrevBlock.length !== 0 && navPrevBlock !== undefined) {
      // console.log('navPrevBlock[1].blockLeadTo == current.blockSecondaryId 780',navPrevBlock[0],'...',navPrevBlock[0].blockLeadTo == current.blockSecondaryId,'...',navPrevBlock[0].blockLeadTo ,'...', current.blockSecondaryId)

      if (navPrevBlock[0].blockLeadTo == current.blockSecondaryId) {
        navTrack.pop();
        const lastPrevNavTrack = navTrack[navTrack.length - 1];
        const prevousBlock = current
          ? Object.keys(demoBlocks[quest] || {})
            .filter(
              (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === lastPrevNavTrack,
            )
            .map((key: any) => demoBlocks[quest]?.[key])
          : [];
        if (prevousBlock.length !== 0) {
          setType(prevousBlock[0]?.blockChoosen);
          setData(prevousBlock[0]);
          if (prevousBlock[0]?.blockChoosen === 'Interaction') {
            const optionsFiltered = [];
            for (const option of gameInfo.questOptions) {
              if (option?.qpSequence === prevousBlock[0]?.blockPrimarySequence) {
                optionsFiltered.push(option);
              }
            }
            if (gameInfo?.gameData?.gameShuffle === 'true') {
              for (let i = optionsFiltered.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsFiltered[i], optionsFiltered[j]] = [
                  optionsFiltered[j],
                  optionsFiltered[i],
                ];
              }
            }
            setOptions(optionsFiltered);
          }

          let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[prevousBlock[0].blockQuestNo]];
          const lastElementSeq = updateNavigateSeq.pop();
          if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
            updateNavigateSeq.push(prevousBlock[0].blockPrimarySequence);
          }
          setPreLogDatas((prev: any) => ({
            ...prev,
            lastBlockModifiedDate: null,
            lastModifiedBlockSeq: null,
            lastActiveBlockSeq: prevousBlock[0].blockId,
            nevigatedSeq: { ...prev.nevigatedSeq, [prevousBlock[0].blockQuestNo]: updateNavigateSeq }
          }));
          return false;
        }
      }
      else {
        let getSeqprevious: any = [];
        const getdemoblocksseq: any = Object.entries(demoBlocks[quest]);
        for (const blocks of getdemoblocksseq) {
          const blockId = blocks[1].blockId;
          if (blocks[1].blockLeadTo == current.blockSecondaryId) {
            getSeqprevious.push(blocks[1].blockPrimarySequence);
          }

          for (const optionsnavi of gameInfo.questOptions) {
            if (optionsnavi.qpQuestionId == blockId) {
              if (optionsnavi.qpNextOption == current.blockSecondaryId) {
                getSeqprevious.push(blocks[1].blockPrimarySequence);
              }
            }

          }

        }

        if (getSeqprevious.length > 0) {
          getSeqprevious.push(current.blockPrimarySequence);
        }
        getSeqprevious.sort((a: any, b: any) => a - b);
        const currentIndex = getSeqprevious.indexOf(current.blockPrimarySequence);
        if (current.blockPrimarySequence !== gameInfo?.blocks[profile?.currentQuest]['1']?.blockPrimarySequence) {
          if (currentIndex !== -1) {
            if (currentIndex > 0) {
              // Retrieve the previous sequence value
              const previousSeq = getSeqprevious[currentIndex - 1];
              const prevousBlock = current
                ? Object.keys(demoBlocks[quest] || {})
                  .filter(
                    (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === previousSeq,
                  )
                  .map((key: any) => demoBlocks[quest]?.[key])
                : [];
              if (prevousBlock.length !== 0) {
                setType(prevousBlock[0]?.blockChoosen);
                setData(prevousBlock[0]);
                if (prevousBlock[0]?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (option?.qpSequence === prevousBlock[0]?.blockPrimarySequence) {
                      optionsFiltered.push(option);
                    }
                  }
                  if (gameInfo?.gameData?.gameShuffle === 'true') {
                    for (let i = optionsFiltered.length - 1; i > 0; i--) {
                      const j = Math.floor(Math.random() * (i + 1));
                      [optionsFiltered[i], optionsFiltered[j]] = [
                        optionsFiltered[j],
                        optionsFiltered[i],
                      ];
                    }
                  }
                  setOptions(optionsFiltered);
                }

                let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[prevousBlock[0].blockQuestNo]];
                const lastElementSeq = updateNavigateSeq.pop();
                if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                  updateNavigateSeq.push(prevousBlock[0].blockPrimarySequence);
                }
                setPreLogDatas((prev: any) => ({
                  ...prev,
                  lastBlockModifiedDate: null,
                  lastModifiedBlockSeq: null,
                  lastActiveBlockSeq: prevousBlock[0].blockId,
                  nevigatedSeq: { ...prev.nevigatedSeq, [prevousBlock[0].blockQuestNo]: updateNavigateSeq }
                }));
                return false;
              }
              else {
                let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[current.blockQuestNo]];
                const lastElementSeq = updateNavigateSeq.pop();
                if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                  updateNavigateSeq.push(current.blockPrimarySequence);
                }
                setPreLogDatas((prev: any) => ({
                  ...prev,
                  lastBlockModifiedDate: null,
                  lastModifiedBlockSeq: null,
                  lastActiveBlockSeq: current.blockId,
                  nevigatedSeq: { ...prev.nevigatedSeq, [current.blockQuestNo]: updateNavigateSeq }
                }));
                return false;
              }
            } else {
              // If no previous found, retrieve the next sequence
              const nextSeq = getSeqprevious[currentIndex + 1];
              const prevousBlock = current
                ? Object.keys(demoBlocks[quest] || {})
                  .filter(
                    (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === nextSeq,
                  )
                  .map((key: any) => demoBlocks[quest]?.[key])
                : [];
              if (prevousBlock.length !== 0) {
                setType(prevousBlock[0]?.blockChoosen);
                setData(prevousBlock[0]);
                if (prevousBlock[0]?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (option?.qpSequence === prevousBlock[0]?.blockPrimarySequence) {
                      optionsFiltered.push(option);
                    }
                  }
                  if (gameInfo?.gameData?.gameShuffle === 'true') {
                    for (let i = optionsFiltered.length - 1; i > 0; i--) {
                      const j = Math.floor(Math.random() * (i + 1));
                      [optionsFiltered[i], optionsFiltered[j]] = [
                        optionsFiltered[j],
                        optionsFiltered[i],
                      ];
                    }
                  }
                  setOptions(optionsFiltered);
                }

                let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[prevousBlock[0].blockQuestNo]];
                const lastElementSeq = updateNavigateSeq.pop();
                if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                  updateNavigateSeq.push(prevousBlock[0].blockPrimarySequence);
                }

                setPreLogDatas((prev: any) => ({
                  ...prev,
                  lastBlockModifiedDate: null,
                  lastModifiedBlockSeq: null,
                  lastActiveBlockSeq: prevousBlock[0].blockId,
                  nevigatedSeq: { ...prev.nevigatedSeq, [prevousBlock[0].blockQuestNo]: updateNavigateSeq }
                }));
                return false;
              }
              else {
                let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[current.blockQuestNo]];
                const lastElementSeq = updateNavigateSeq.pop();
                if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                  updateNavigateSeq.push(current.blockPrimarySequence);
                }
                setPreLogDatas((prev: any) => ({
                  ...prev,
                  lastBlockModifiedDate: null,
                  lastModifiedBlockSeq: null,
                  lastActiveBlockSeq: current.blockId,
                  nevigatedSeq: { ...prev.nevigatedSeq, [current.blockQuestNo]: updateNavigateSeq }
                }));
                return false;
              }
            }
          } else {
            const prevousBlock = current
              ? Object.keys(demoBlocks[quest] || {})
                .filter(
                  (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === prevSeq,
                )
                .map((key: any) => demoBlocks[quest]?.[key])
              : [];
            if (prevousBlock.length !== 0) {
              setType(prevousBlock[0]?.blockChoosen);
              setData(prevousBlock[0]);
              if (prevousBlock[0]?.blockChoosen === 'Interaction') {
                const optionsFiltered = [];
                for (const option of gameInfo.questOptions) {
                  if (option?.qpSequence === prevousBlock[0]?.blockPrimarySequence) {
                    optionsFiltered.push(option);
                  }
                }
                if (gameInfo?.gameData?.gameShuffle === 'true') {
                  for (let i = optionsFiltered.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [optionsFiltered[i], optionsFiltered[j]] = [
                      optionsFiltered[j],
                      optionsFiltered[i],
                    ];
                  }
                }
                setOptions(optionsFiltered);
              }

              let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[prevousBlock[0].blockQuestNo]];
              const lastElementSeq = updateNavigateSeq.pop();
              if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                updateNavigateSeq.push(prevousBlock[0].blockPrimarySequence);
              }

              setPreLogDatas((prev: any) => ({
                ...prev,
                lastBlockModifiedDate: null,
                lastModifiedBlockSeq: null,
                lastActiveBlockSeq: prevousBlock[0].blockId,
                nevigatedSeq: { ...prev.nevigatedSeq, [prevousBlock[0].blockQuestNo]: updateNavigateSeq }
              }));
              return false;
            }
            else {
              let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[current.blockQuestNo]];
              const lastElementSeq = updateNavigateSeq.pop();
              if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                updateNavigateSeq.push(current.blockPrimarySequence);
              }
              setPreLogDatas((prev: any) => ({
                ...prev,
                lastBlockModifiedDate: null,
                lastModifiedBlockSeq: null,
                lastActiveBlockSeq: current.blockId,
                nevigatedSeq: { ...prev.nevigatedSeq, [current.blockQuestNo]: updateNavigateSeq }
              }));
              return false;
            }
          }
        }
        else {
          setModelScreen(true);
          setCurrentScreenId(16);
          return false;
        }
      }
    }
    else {
      let getSeqprevious: any = [];
      const getdemoblocksseq: any = Object.entries(demoBlocks[quest]);
      for (const blocks of getdemoblocksseq) {
        const blockId = blocks[1].blockId;
        // console.log('navPrevBlock[1].blockLeadTo == current.blockSecondaryId 345',blockId);
        if (blocks[1].blockLeadTo == current.blockSecondaryId) {
          getSeqprevious.push(blocks[1].blockPrimarySequence);
        }

        for (const optionsnavi of gameInfo.questOptions) {
          if (optionsnavi.qpQuestionId == blockId) {
            if (optionsnavi.qpNextOption == current.blockSecondaryId) {
              getSeqprevious.push(blocks[1].blockPrimarySequence);
            }
          }

        }

      }

      if (getSeqprevious.length > 0) {
        getSeqprevious.push(current.blockPrimarySequence);
      }
      getSeqprevious.sort((a: any, b: any) => a - b);
      const currentIndex = getSeqprevious.indexOf(current.blockPrimarySequence);
      if (current.blockPrimarySequence !== gameInfo?.blocks[profile?.currentQuest]['1']?.blockPrimarySequence) {
        if (currentIndex !== -1) {
          if (currentIndex > 0) {
            // Retrieve the previous sequence value
            const previousSeq = getSeqprevious[currentIndex - 1];
            const prevousBlock = current
              ? Object.keys(demoBlocks[quest] || {})
                .filter(
                  (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === previousSeq,
                )
                .map((key: any) => demoBlocks[quest]?.[key])
              : [];
            if (prevousBlock.length !== 0) {
              setType(prevousBlock[0]?.blockChoosen);
              setData(prevousBlock[0]);
              if (prevousBlock[0]?.blockChoosen === 'Interaction') {
                const optionsFiltered = [];
                for (const option of gameInfo.questOptions) {
                  if (option?.qpSequence === prevousBlock[0]?.blockPrimarySequence) {
                    optionsFiltered.push(option);
                  }
                }
                if (gameInfo?.gameData?.gameShuffle === 'true') {
                  for (let i = optionsFiltered.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [optionsFiltered[i], optionsFiltered[j]] = [
                      optionsFiltered[j],
                      optionsFiltered[i],
                    ];
                  }
                }
                setOptions(optionsFiltered);
              }

              let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[prevousBlock[0].blockQuestNo]];
              const lastElementSeq = updateNavigateSeq.pop();
              if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                updateNavigateSeq.push(prevousBlock[0].blockPrimarySequence);
              }
              setPreLogDatas((prev: any) => ({
                ...prev,
                lastBlockModifiedDate: null,
                lastModifiedBlockSeq: null,
                lastActiveBlockSeq: prevousBlock[0].blockId,
                nevigatedSeq: { ...prev.nevigatedSeq, [prevousBlock[0].blockQuestNo]: updateNavigateSeq }
              }));
              return false;
            }
            else {
              let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[current.blockQuestNo]];
              const lastElementSeq = updateNavigateSeq.pop();
              if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                updateNavigateSeq.push(current.blockPrimarySequence);
              }
              setPreLogDatas((prev: any) => ({
                ...prev,
                lastBlockModifiedDate: null,
                lastModifiedBlockSeq: null,
                lastActiveBlockSeq: current.blockId,
                nevigatedSeq: { ...prev.nevigatedSeq, [current.blockQuestNo]: updateNavigateSeq }
              }));
              return false;
            }
          } else {
            // If no previous found, retrieve the next sequence
            const nextSeq = getSeqprevious[currentIndex + 1];
            const prevousBlock = current
              ? Object.keys(demoBlocks[quest] || {})
                .filter(
                  (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === nextSeq,
                )
                .map((key: any) => demoBlocks[quest]?.[key])
              : [];
            if (prevousBlock.length !== 0) {
              setType(prevousBlock[0]?.blockChoosen);
              setData(prevousBlock[0]);
              if (prevousBlock[0]?.blockChoosen === 'Interaction') {
                const optionsFiltered = [];
                for (const option of gameInfo.questOptions) {
                  if (option?.qpSequence === prevousBlock[0]?.blockPrimarySequence) {
                    optionsFiltered.push(option);
                  }
                }
                if (gameInfo?.gameData?.gameShuffle === 'true') {
                  for (let i = optionsFiltered.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [optionsFiltered[i], optionsFiltered[j]] = [
                      optionsFiltered[j],
                      optionsFiltered[i],
                    ];
                  }
                }
                setOptions(optionsFiltered);
              }

              let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[prevousBlock[0].blockQuestNo]];
              const lastElementSeq = updateNavigateSeq.pop();
              if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                updateNavigateSeq.push(prevousBlock[0].blockPrimarySequence);
              }

              setPreLogDatas((prev: any) => ({
                ...prev,
                lastBlockModifiedDate: null,
                lastModifiedBlockSeq: null,
                lastActiveBlockSeq: prevousBlock[0].blockId,
                nevigatedSeq: { ...prev.nevigatedSeq, [prevousBlock[0].blockQuestNo]: updateNavigateSeq }
              }));
              return false;
            }
            else {
              let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[current.blockQuestNo]];
              const lastElementSeq = updateNavigateSeq.pop();
              if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
                updateNavigateSeq.push(current.blockPrimarySequence);
              }
              setPreLogDatas((prev: any) => ({
                ...prev,
                lastBlockModifiedDate: null,
                lastModifiedBlockSeq: null,
                lastActiveBlockSeq: current.blockId,
                nevigatedSeq: { ...prev.nevigatedSeq, [current.blockQuestNo]: updateNavigateSeq }
              }));
              return false;
            }
          }
        } else {
          const prevousBlock = current
            ? Object.keys(demoBlocks[quest] || {})
              .filter(
                (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === prevSeq,
              )
              .map((key: any) => demoBlocks[quest]?.[key])
            : [];
          if (prevousBlock.length !== 0) {
            setType(prevousBlock[0]?.blockChoosen);
            setData(prevousBlock[0]);
            if (prevousBlock[0]?.blockChoosen === 'Interaction') {
              const optionsFiltered = [];
              for (const option of gameInfo.questOptions) {
                if (option?.qpSequence === prevousBlock[0]?.blockPrimarySequence) {
                  optionsFiltered.push(option);
                }
              }
              if (gameInfo?.gameData?.gameShuffle === 'true') {
                for (let i = optionsFiltered.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [optionsFiltered[i], optionsFiltered[j]] = [
                    optionsFiltered[j],
                    optionsFiltered[i],
                  ];
                }
              }
              setOptions(optionsFiltered);
            }

            let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[prevousBlock[0].blockQuestNo]];
            const lastElementSeq = updateNavigateSeq.pop();
            if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
              updateNavigateSeq.push(prevousBlock[0].blockPrimarySequence);
            }

            setPreLogDatas((prev: any) => ({
              ...prev,
              lastBlockModifiedDate: null,
              lastModifiedBlockSeq: null,
              lastActiveBlockSeq: prevousBlock[0].blockId,
              nevigatedSeq: { ...prev.nevigatedSeq, [prevousBlock[0].blockQuestNo]: updateNavigateSeq }
            }));
            return false;
          }
          else {
            let updateNavigateSeq: any = [...getPrevLogDatas.nevigatedSeq[current.blockQuestNo]];
            const lastElementSeq = updateNavigateSeq.pop();
            if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
              updateNavigateSeq.push(current.blockPrimarySequence);
            }
            setPreLogDatas((prev: any) => ({
              ...prev,
              lastBlockModifiedDate: null,
              lastModifiedBlockSeq: null,
              lastActiveBlockSeq: current.blockId,
              nevigatedSeq: { ...prev.nevigatedSeq, [current.blockQuestNo]: updateNavigateSeq }
            }));
            return false;
          }
        }
      }
      else {
        setModelScreen(true);
        setCurrentScreenId(16);
        return false;
      }
    }






  }
/**Commneted function alreay in above area */

  // const checkAndUpdateScores = async () => {
  //   const currentQuest = profile.currentQuest;
  //   if (questState[currentQuest] !== 'Started') {
  //     const calcQuestGrandTotal = async (scores: any, currentQuestNo: any = null) => {
  //       if (scores?.length <= 0) {
  //         return 0;
  //       }
  //       if (currentQuestNo != null) {
  //         // Sum score of a quest
  //         const totalScore = scores.reduce((total: number, sc: any) => {
  //           if (sc.quest == currentQuestNo) {
  //             return total + sc.score;
  //           } else {
  //             return total;
  //           }
  //         }, 0);
  //         return totalScore; // Return the total score
  //       }
  //       else {
  //         //Sum up all the scores
  //         return scores.reduce((total: number, sc: any) => total + sc.score, 0);
  //       }
  //     }
  //     const scoreTotal = await calcQuestGrandTotal(profile.score, profile.currentQuest);
  //     const replayScoreTotal = await calcQuestGrandTotal(profile.replayScore, profile.currentQuest);
  //     if (scoreTotal < replayScoreTotal) {
  //       const currentQuestRemovedScoreArr = profile.score.filter((item: any) => (item.quest != profile.currentQuest));
  //       let concatenatedScoreArr: any[] = [];
  //       if (profile.replayScore.length > 0) {
  //         concatenatedScoreArr = profile.replayScore.filter((item: any) => (item.quest == profile.currentQuest));
  //       }
  //       if (currentQuestRemovedScoreArr.length > 0) {
  //         concatenatedScoreArr = [...concatenatedScoreArr, ...currentQuestRemovedScoreArr];
  //       }
  //       const currentQuestRemovedReplayScoreArr = profile.replayScore.filter((item: any) => (item.quest != profile.currentQuest));
  //       setProfile((prev: any) => ({ ...prev, score: concatenatedScoreArr, replayScore: currentQuestRemovedReplayScoreArr }))
  //     }
  //     else {
  //       const currentQuestRemovedReplayScoreArr = profile.replayScore.filter((item: any) => (item.quest != profile.currentQuest));
  //       setProfile((prev: any) => ({ ...prev, replayScore: currentQuestRemovedReplayScoreArr }))
  //     }
  //   }
  // }
  const getData = (next: any) => {
    setRepeatSelectOption(false);
    setIsPrevNavigation(false);
    if (next?.blockChoosen === 'Interaction') {
      const isDuplicate = feedbackList?.some(
        (item: any) =>
          item.Seq === next?.blockPrimarySequence &&
          item.Options === getSelectedOptions,
      );

      if (!isDuplicate) {
        if (feed !== '') {
          setFeedbackList((prevFeedbackList) => [
            ...prevFeedbackList,
            {
              feedbackcontent: feed,
              Seq: next?.blockPrimarySequence,
              Options: getSelectedOptions,
            },
          ]);
        }
      }
    }
    SetPreviouseStored(next);

    // setAudioObj((prev) => ({ ...prev, url: '', type: 'api', loop: false }));
    const currentBlock = next
      ? parseInt(next?.blockPrimarySequence.split('.')[1])
      : null;

    //get the next block details
    const quest = next ? next?.blockPrimarySequence.split('.')[0] : null;
    const NextItem = currentBlock != null ? currentBlock + 1 : null;

    const nextSeq = next
      ? `${next?.blockPrimarySequence.split('.')[0]}.${NextItem}`
      : '';
    const prevTrack = navTrack;

    const currentQuest = next
      ? parseInt(next?.blockPrimarySequence.split('.')[0])
      : null;
    setCurrentQuestNo(currentQuest);

    setGame3Position((prev: any) => ({
      ...prev,
      previousBlock: next?.blockPrimarySequence,
      currentBlock: nextSeq,
    }));
    const nextLevel = currentQuest != null ? String(currentQuest + 1) : null;
    const nextBlock = next
      ? Object.keys(demoBlocks[quest] || {})
          .filter(
            (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === nextSeq,
          )
          .map((key: any) => demoBlocks[quest]?.[key])
      : [];

    if (nextBlock[0]?.blockChoosen === 'Interaction') {
      const optionsFiltered = [];
      for (const option of gameInfo.questOptions) {
        if (profileData?.Audiogetlanguage.length > 0) {
          if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
            const profilesetlan = profileData?.Audiogetlanguage.find(
              (key: any) => key?.textId === option.qpOptionId,
            );
            if (profilesetlan) {
              const languagecont = {
                ...option,
                qpOptionText: profilesetlan.content,
              };
              optionsFiltered.push(languagecont);
            } else {
              optionsFiltered.push(option);
            }
          }
        } else {
          if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
            optionsFiltered.push(option);
          }
        }
      }
      if (gameInfo?.gameData?.gameShuffle === 'true') {
        for (let i = optionsFiltered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [optionsFiltered[i], optionsFiltered[j]] = [
            optionsFiltered[j],
            optionsFiltered[i],
          ];
        }
      }
      setOptions(optionsFiltered);
    }
    if (type === 'Interaction' && resMsg !== '') {
      setType('response');
      return false;
    } else if (
      (type === 'Interaction' || type === 'response') &&
      feed !== '' &&
      gameInfo?.gameData?.gameIsShowInteractionFeedBack !== 'Completion'
    ) {
      setType('feedback');
      return false;
    } else if (
      type === 'Interaction' ||
      type === 'response' ||
      type === 'feedback'
    ) {
      if (next?.blockChoosen === 'Interaction') {
        if (navi !== 'Repeat Question') {
          setRepeatPrevOption([]);
        }
      }
      if (navi === 'Repeat Question') {
        setRepeatSelectOption(true);
        RepeatPrevOption.push(getSelectedOptions.options);
        setRepeatPrevOption(RepeatPrevOption);
        setType(next?.blockChoosen);
        setData(next);
        if (next?.blockChoosen === 'Interaction') {
          const optionsFiltered = [];
          for (const option of gameInfo.questOptions) {
            if (option?.qpSequence === next?.blockPrimarySequence) {
              optionsFiltered.push(option);
            }
          }
          if (gameInfo?.gameData?.gameShuffle === 'true') {
            for (let i = optionsFiltered.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [optionsFiltered[i], optionsFiltered[j]] = [
                optionsFiltered[j],
                optionsFiltered[i],
              ];
            }
          }
          setOptions(optionsFiltered);
        }
        setSelectedOption(null);
        return false;
      } else if (navi === 'New Block') {
        setType(nextBlock[0]?.blockChoosen);
        setData(nextBlock[0]);
        setSelectedOption(null);
        return false;
      } else if (navi === 'Replay Point') {
        // setType(demoBlocks[quest]['1']?.blockChoosen);
        // setData(demoBlocks[quest]['1']);
        setSelectedOption(null);
        setCurrentScreenId(16);
        return false;
      } else if (navi === 'Select Block') {
        const selectedNext = Object.keys(demoBlocks[currentQuest])
          .filter((item: any) => {
            return (
              demoBlocks[currentQuest][item]?.blockSecondaryId ===
              parseInt(optionNavigation)
            );
          })
          .map((item: any) => {
            return demoBlocks[currentQuest][item];
          });
        if (selectedNext.length > 0) {
          setType(selectedNext && selectedNext[0]?.blockChoosen);
          if (selectedNext[0]?.blockChoosen === 'Interaction') {
            const optionsFiltered = [];
            for (const option of gameInfo.questOptions) {
              if (profileData?.Audiogetlanguage.length > 0) {
                if (
                  option?.qpSequence === selectedNext[0]?.blockPrimarySequence
                ) {
                  const profilesetlan = profileData?.Audiogetlanguage.find(
                    (key: any) => key?.textId === option.qpOptionId,
                  );

                  if (profilesetlan) {
                    const languagecont = {
                      ...option,
                      qpOptionText: profilesetlan.content,
                    };
                    optionsFiltered.push(languagecont);
                  } else {
                    optionsFiltered.push(option);
                  }
                }
              } else {
                if (
                  option?.qpSequence === selectedNext[0]?.blockPrimarySequence
                ) {
                  optionsFiltered.push(option);
                }
              }
            }
            if (gameInfo?.gameData?.gameShuffle === 'true') {
              for (let i = optionsFiltered.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsFiltered[i], optionsFiltered[j]] = [
                  optionsFiltered[j],
                  optionsFiltered[i],
                ];
              }
            }
            setOptions(optionsFiltered);
          }
          setData(selectedNext && selectedNext[0]);
          setGame3Position((prev: any) => ({
            ...prev,
            nextBlock: nextBlock[0]?.blockPrimarySequence,
          }));
          setSelectedOption(null);
          return false;
        } else {
          setType(nextBlock[0]?.blockChoosen);
          if (nextBlock[0]?.blockChoosen === 'Interaction') {
            const optionsFiltered = [];
            for (const option of gameInfo.questOptions) {
              if (profileData?.Audiogetlanguage.length > 0) {
                if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
                  const profilesetlan = profileData?.Audiogetlanguage.find(
                    (key: any) => key?.textId === option.qpOptionId,
                  );

                  if (profilesetlan) {
                    const languagecont = {
                      ...option,
                      qpOptionText: profilesetlan.content,
                    };
                    optionsFiltered.push(languagecont);
                  } else {
                    optionsFiltered.push(option);
                  }
                }
              } else {
                if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
                  optionsFiltered.push(option);
                }
              }
            }
            if (gameInfo?.gameData?.gameShuffle === 'true') {
              for (let i = optionsFiltered.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsFiltered[i], optionsFiltered[j]] = [
                  optionsFiltered[j],
                  optionsFiltered[i],
                ];
              }
            }
            setOptions(optionsFiltered);
          }
          setData(nextBlock[0]);
          setGame3Position((prev: any) => ({
            ...prev,
            nextBlock: nextBlock[0]?.blockPrimarySequence,
          }));
          setSelectedOption(null);
          return false;
        }
      } else if (navi === 'Complete') {
        //check the replay Quest score is higher than score in profile context
        checkAndUpdateScores();
        const Nextcurrentquest = next?.blockQuestNo;
        const getgameinfoquest = gameInfo?.gameQuest.find(
          (row: any) => row.gameQuestNo == Nextcurrentquest,
        );
        //this place no need to check this condition .....
        /*if (getgameinfoquest?.gameIsSetCongratsScoreWiseMessage === 'true') {
          if (demoBlocks.hasOwnProperty(nextLevel)) {
            setProfile((prev: any) => {
              const data = { ...prev };
              if (!profile.completedLevels.includes(currentQuest)) {
                data.completedLevels = [...data.completedLevels, nextLevel];
              }

              return data;
            });

            setType(demoBlocks[nextLevel]['1']?.blockChoosen);
            setData(demoBlocks[nextLevel]['1']);
            setCurrentScreenId(6);
            return false;
          } else {
            setCurrentScreenId(6);
            setType(null);
            setData(null);
            return false;
          }
        } else */
        if (getgameinfoquest?.gameIsSetMinPassScore === 'true') {
          const getminpassscore = getgameinfoquest?.gameMinScore;
          const scores = profile?.score;
          const sums: any = {};
          scores.forEach((score: any) => {
            const quest = score.quest;
            if (!sums[quest]) {
              sums[quest] = 0;
            }
            sums[quest] += score.score;
          });

          // const getFinalscores = Object.values(sums);
          const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
            quest,
            score,
          }));
          const getscores = getFinalscores.find(
            (row: any) => row.quest == getgameinfoquest.gameQuestNo,
          );
          const finalscore = getscores?.score;
          if (finalscore < getminpassscore) {
            setisReplay(true);
            Setprofilescore(finalscore);
            setisOptionalReplay(false);
            setCurrentScreenId(8);
            return false;
          } else {
            if (demoBlocks.hasOwnProperty(nextLevel)) {
              setProfile((prev: any) => {
                const data = { ...prev };
                if (!profile.completedLevels.includes(currentQuest)) {
                  data.completedLevels = [...data.completedLevels, nextLevel];
                }

                return data;
              });

              setType(demoBlocks[nextLevel]['1']?.blockChoosen);
              setData(demoBlocks[nextLevel]['1']);
              setCurrentScreenId(6);
              return false;
            } else {
              setCurrentScreenId(6);
              setType(null);
              setData(null);
              return false;
            }
          }
        } else {
          if (demoBlocks.hasOwnProperty(nextLevel)) {
            setProfile((prev: any) => {
              const data = { ...prev };
              if (!profile.completedLevels.includes(currentQuest)) {
                data.completedLevels = [...data.completedLevels, nextLevel];
              }

              return data;
            });

            setType(demoBlocks[nextLevel]['1']?.blockChoosen);
            setData(demoBlocks[nextLevel]['1']);
            setCurrentScreenId(6);
            return false;
          } else {
            setCurrentScreenId(6);
            setType(null);
            setData(null);
            return false;
          }
        }
        /*
        if (getgameinfoquest?.gameIsSetMinPassScore === 'true') {
          if (demoBlocks.hasOwnProperty(nextLevel)) {
            setProfile((prev: any) => {
              const data = { ...prev };
              if(!profile.completedLevels.includes(currentQuest))
                {
                  data.completedLevels = [...data.completedLevels, nextLevel];
                }
              
              return data;
            });
  
            setType(demoBlocks[nextLevel]['1']?.blockChoosen);
            setData(demoBlocks[nextLevel]['1']);
            setCurrentScreenId(6);
            return false;
          } else {
            setCurrentScreenId(6);
            setType(null);
            setData(null);
            return false;
          }
        }
        else{
          setisOptionalReplay(true);
          setCurrentScreenId(8);
          return false;
        }
        */
      } else {
        /** IF a block not has navi option then it leads to next block */
        if (nextBlock && nextBlock[0]?.blockChoosen) {
          setType(nextBlock[0]?.blockChoosen);
          setData(nextBlock[0]);
          setSelectedOption(null);
          return false;
        } else {
          /** else leads to first block of the quest */
          setNavigateBlockEmpty(true);
          setType(demoBlocks[quest]['1']?.blockChoosen);
          setData(demoBlocks[quest]['1']);
          setSelectedOption(null);
          return false;
        }
      }
    }

    if (currentScreenId === 6) {
      //Completion
      const {
        currentQuest,
        currentGameData,
        nextLevel,
        haveNextQuest,
        totalScore,
      } = calScore();
      // if (gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
      //   const Completionpage = Object.entries(questState).map(
      //     ([questId, status]) => ({ questId, status }),
      //   );
      //   const OpenStraigntCompletionPage = Completionpage.find(
      //     (row: any) =>
      //       row.questId === profile.currentQuest && row.status === 'completed',
      //   );
      //   if (OpenStraigntCompletionPage !== undefined) {
      //     setFeedbackList([]);
      //     setCurrentScreenId(13);
      //     return false;
      //   }
      //   if (feedbackList.length !== 0) {
      //     getFeedbackData(data);
      //     setFeedbackNavigateNext(false);
      //     setCurrentScreenId(14); //Navigate to together all feedback
      //     return false;
      //   } else {
      //     if (demoBlocks.hasOwnProperty(nextLevel)) {
      //       setProfile((prev: any) => {
      //         const data = { ...prev };
      //         if (!profile.completedLevels.includes(currentQuest)) {
      //           data.completedLevels = [...data.completedLevels, nextLevel];
      //         }

      //         return data;
      //       });

      //       setType(demoBlocks[nextLevel]['1']?.blockChoosen);
      //       setData(demoBlocks[nextLevel]['1']);
      //       setCurrentScreenId(13);
      //       return false;
      //     } else {
      //       if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
      //         setCurrentScreenId(4); //Navigate to leaderboard
      //         return false;
      //       } else if (
      //         gameInfo.gameData?.gameIsShowReflectionScreen === 'true' &&
      //         gameInfo?.reflectionQuestions.length > 0
      //       ) {
      //         setCurrentScreenId(3); //Navigate to Reflection screen
      //         return false;
      //       } else if (gameInfo.gameData?.gameIsShowTakeaway === 'true') {
      //         setCurrentScreenId(7); //Navigate to takeaway screen
      //         return false;
      //       } else {
      //         setType(null);
      //         setData(null);
      //         setCurrentScreenId(5);
      //         return false;
      //       }
      //     }
      //   }
      // } 
      if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
        setCurrentScreenId(4); //Navigate to leaderboard
        return false;
      } else if (haveNextQuest) {
        if (currentGameData?.gameIsSetMinPassScore === 'true') {
          const getminpassscore = currentGameData?.gameMinScore;
          const scores = profile?.score;
          const sums: any = {};
          scores.forEach((score: any) => {
            const quest = score.quest;
            if (!sums[quest]) {
              sums[quest] = 0;
            }
            sums[quest] += score.score;
          });

          // const getFinalscores = Object.values(sums);
          const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
            quest,
            score,
          }));
          const getscores = getFinalscores.find(
            (row: any) => row.quest == currentGameData.gameQuestNo,
          );
          const finalscore = getscores?.score;

          if (
            finalscore >= getminpassscore &&
            finalscore < currentGameData?.gameDistinctionScore &&
            gameInfo.gameData?.gameDisableOptionalReplays === 'false'
          ) {
            setCurrentScreenId(8); //Navigate to replaygame prompt screen
            return false;
            //set to prompt it for replay the game
          } else {
            setCurrentScreenId(13); //Navigate to Character Selection screen
            return false;
          }
        }
        // Dont Want to Check This Condition
        /*else if (gameInfo.gameData?.gameDisableOptionalReplays === 'false') {
          setCurrentScreenId(8); //Navigate to replaygame prompt screen
          return false;
        }*/
      } else if (
        gameInfo.gameData?.gameIsShowReflectionScreen === 'true' &&
        gameInfo?.reflectionQuestions.length > 0
      ) {
        setCurrentScreenId(3); //Navigate to Reflection screen
        return false;
      } else if (gameInfo.gameData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7); //Navigate to takeaway screen
        return false;
      } else {
        setCurrentScreenId(5); //Navigate to Thank you screen
        return false;
      }
      setCurrentScreenId(13); //Navigate Chapter Select page
      return false;
      // }
    }
    if (currentScreenId === 14) {
      const Nextcurrentquest = profile?.currentQuest;
      const getgameinfoquest = gameInfo?.gameQuest.find(
        (row: any) => row.gameQuestNo == Nextcurrentquest,
      );
      const haveNextQuest = gameInfo.gameQuest.some(
        (row: any) => row.gameQuestNo == Nextcurrentquest,
      );
      /* if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
         setCurrentScreenId(4); //leaderboard
         return false;
       } else */
      if (gameInfo?.gameData?.gameDisableOptionalReplays === 'false') {
        //   setCurrentScreenId(8); //replay game
        //   return false;
        // } else 
        if (haveNextQuest) {
          if (getgameinfoquest?.gameIsSetMinPassScore === 'true') {
            console.log('1584');
            const getminpassscore = getgameinfoquest?.gameMinScore;
            const scores = profile?.score;
            const sums: any = {};
            scores.forEach((score: any) => {
              const quest = score.quest;
              if (!sums[quest]) {
                sums[quest] = 0;
              }
              sums[quest] += score.score;
            });

            const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
              quest,
              score,
            }));
            const getscores = getFinalscores.find(
              (row: any) => row.quest == getgameinfoquest?.gameQuestNo,
            );
            const finalscore = getscores?.score;
            if (
              finalscore >= getminpassscore &&
              finalscore < getgameinfoquest?.gameDistinctionScore &&
              gameInfo.gameData?.gameDisableOptionalReplays === 'false'
            ) {
              console.log('1609');
              setisOptionalReplay(true);
              setisReplay(false);
              Setprofilescore(finalscore);
              setCurrentScreenId(8);
              return false;
            } else {
              if (demoBlocks.hasOwnProperty(nextLevel)) {
                console.log('1617');
                setProfile((prev: any) => {
                  const data = { ...prev };
                  if (!profile.completedLevels.includes(currentQuest)) {
                    data.completedLevels = [...data.completedLevels, nextLevel];
                  }

                  return data;
                });
                setType(demoBlocks[nextLevel]['1']?.blockChoosen);
                setData(demoBlocks[nextLevel]['1']);
                setCurrentScreenId(13);
                return false;
              }
              else {
                if (
                  gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' &&
                  gameInfo?.reflectionQuestions.length > 0
                ) {
                  setCurrentScreenId(3); //reflection screen
                  return false;
                } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
                  setCurrentScreenId(7); //takeaway
                  return false;
                } else {
                  setType(null);
                  setData(null);
                  setCurrentScreenId(5); //thank you screen
                  return false;
                }
              }
              // setCurrentScreenId(13); //Navigate to Chapter Selection screen
              // return false;
            }
          }
          else {
            if (data && type) {
              setFeedbackNavigateNext(false);
              setCurrentScreenId(13);
              return false;
            } else {
              if (
                gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' &&
                gameInfo?.reflectionQuestions.length > 0
              ) {
                setCurrentScreenId(3);
                return false;
              } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
                setCurrentScreenId(7);
                return false;
              } else {
                setType(null);
                setData(null);
                setCurrentScreenId(5);
                return false;
              }
            }
          }
        }
      } else if (demoBlocks.hasOwnProperty(nextLevel)) {
        setProfile((prev: any) => {
          const data = { ...prev };
          if (!profile.completedLevels.includes(currentQuest)) {
            data.completedLevels = [...data.completedLevels, nextLevel];
          }

          return data;
        });
        setType(demoBlocks[nextLevel]['1']?.blockChoosen);
        setData(demoBlocks[nextLevel]['1']);
        setCurrentScreenId(13);
        return false;
      } else if (
        gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' &&
        gameInfo?.reflectionQuestions.length > 0
      ) {
        setCurrentScreenId(3); //reflection screen
        return false;
      } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7); //takeaway
        return false;
      } else {
        setType(null);
        setData(null);
        setCurrentScreenId(5); //thank you screen
        return false;
      }
    }
    if (currentScreenId === 8) {
      if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
        setCurrentScreenId(4);
        return false;
      } else if (
        gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' &&
        gameInfo?.reflectionQuestions.length > 0
      ) {
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
      if (gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
        const Completionpage = Object.entries(questState).map(
          ([questId, status]) => ({ questId, status }),
        );
        // const OpenStraigntCompletionPage = Completionpage.find(
        //   (row: any) =>
        //     row.questId === profile.currentQuest && row.status === 'completed',
        // );
        // if (OpenStraigntCompletionPage !== undefined) {
        //   setFeedbackList([]);
        //   setCurrentScreenId(13);
        //   return false;
        // }
        if (feedbackList.length !== 0) {
          getFeedbackData(data);
          setFeedbackNavigateNext(false);
          setCurrentScreenId(14); //Navigate to together all feedback
          return false;
        }
      }

      const Nextcurrentquest = profile?.currentQuest;
      const getgameinfoquest = gameInfo?.gameQuest.find(
        (row: any) => row.gameQuestNo == Nextcurrentquest,
      );
      const haveNextQuest = gameInfo.gameQuest.some(
        (row: any) => row.gameQuestNo == Nextcurrentquest,
      );
      if (haveNextQuest) {
        if (getgameinfoquest?.gameIsSetMinPassScore === 'true') {
          const getminpassscore = getgameinfoquest?.gameMinScore;
          const scores = profile?.score;
          const sums: any = {};
          scores.forEach((score: any) => {
            const quest = score.quest;
            if (!sums[quest]) {
              sums[quest] = 0;
            }
            sums[quest] += score.score;
          });

          const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
            quest,
            score,
          }));
          const getscores = getFinalscores.find(
            (row: any) => row.quest == getgameinfoquest.gameQuestNo,
          );
          const finalscore = getscores?.score;
          if (
            finalscore >= getminpassscore &&
            finalscore < getgameinfoquest?.gameDistinctionScore &&
            gameInfo.gameData?.gameDisableOptionalReplays === 'false'
          ) {
            setisOptionalReplay(true);
            setisReplay(false);
            Setprofilescore(finalscore);
            setCurrentScreenId(8);
            return false;
          } else {
            if (data && type) {
              setFeedbackNavigateNext(false);
              setCurrentScreenId(13);
              return false;
            } else {
              if (
                gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' &&
                gameInfo?.reflectionQuestions.length > 0
              ) {
                setCurrentScreenId(3);
                return false;
              } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
                setCurrentScreenId(7);
                return false;
              } else {
                setType(null);
                setData(null);
                setCurrentScreenId(5);
                return false;
              }
            }
          }
        } else {
          if (data && type) {
            setFeedbackNavigateNext(false);
            setCurrentScreenId(13);
            return false;
          } else {
            if (
              gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' &&
              gameInfo?.reflectionQuestions.length > 0
            ) {
              setCurrentScreenId(3);
              return false;
            } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
              setCurrentScreenId(7);
              return false;
            } else {
              setType(null);
              setData(null);
              setCurrentScreenId(5);
              return false;
            }
          }
        }
      } else {
        if (data && type) {
          setFeedbackNavigateNext(false);
          setCurrentScreenId(13);
          return false;
        } else {
          if (
            gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' &&
            gameInfo?.reflectionQuestions.length > 0
          ) {
            setCurrentScreenId(3);
            return false;
          } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
            setCurrentScreenId(7);
            return false;
          } else {
            setType(null);
            setData(null);
            setCurrentScreenId(5);
            return false;
          }
        }
      }
    }
    if (currentScreenId === 7) {
      setCurrentScreenId(5);
      return false;
    }
    if (nextBlock.length === 0) {
      const Nextcurrentquest = next?.blockQuestNo;
      const getgameinfoquest = gameInfo?.gameQuest.find(
        (row: any) => row.gameQuestNo == Nextcurrentquest,
      );
      if (getgameinfoquest?.gameIsSetMinPassScore === 'true') {
        const getminpassscore = getgameinfoquest?.gameMinScore;
        const scores = profile?.score;
        const sums: any = {};
        scores.forEach((score: any) => {
          const quest = score.quest;
          if (!sums[quest]) {
            sums[quest] = 0;
          }
          sums[quest] += score.score;
        });

        // const getFinalscores = Object.values(sums);
        const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
          quest,
          score,
        }));
        const getscores = getFinalscores.find(
          (row: any) => row.quest == getgameinfoquest.gameQuestNo,
        );
        const finalscore = getscores?.score;

        if ((finalscore < getminpassscore)) {
          setisReplay(true);
          Setprofilescore(finalscore);
          setisOptionalReplay(false);
          setCurrentScreenId(8);
          return false;
        } else {
          if (demoBlocks.hasOwnProperty(nextLevel)) {
            setProfile((prev: any) => {
              const data = { ...prev };
              if (!profile.completedLevels.includes(currentQuest)) {
                data.completedLevels = [...data.completedLevels, nextLevel];
              }
              return data;
            });
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
      } else {
        if (demoBlocks.hasOwnProperty(nextLevel)) {
          setProfile((prev: any) => {
            const data = { ...prev };
            if (!profile.completedLevels.includes(currentQuest)) {
              data.completedLevels = [...data.completedLevels, nextLevel];
            }
            return data;
          });
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
    }
    if (next?.blockShowNavigate) {
      if (next?.blockShowNavigate === 'Repeat Question') {
        const currentBlockinteraction =
          gameInfo?.blocks[currentQuest][currentBlock];
        setInteractionOptions(gameInfo, currentBlockinteraction);
        setType(next?.blockChoosen);
        setData(next);
        setSelectedOption(null);
        return false;
      } else if (next?.blockShowNavigate === 'New Block') {
        setType(nextBlock[0]?.blockChoosen);
        setData(nextBlock[0]);
        // prevTrack.push(nextBlock[0].blockPrimarySequence);
        // setNavTrack(prevTrack)
        setSelectedOption(null);
        return false;
      } else if (next?.blockShowNavigate === 'Replay Point') {
        // setType(demoBlocks['1']['1']?.blockChoosen);
        // setData(demoBlocks['1']['1']);
        setSelectedOption(null);
        setCurrentScreenId(16);
        return false;
      } else if (next?.blockShowNavigate === 'Select Block') {
        const selectedNext = Object.keys(demoBlocks[currentQuest])
          .filter((item: any) => {
            return (
              demoBlocks[currentQuest][item]?.blockSecondaryId ===
              parseInt(next?.blockLeadTo)
            );
          })
          .map((item: any) => {
            return demoBlocks[currentQuest][item];
          });
        if (selectedNext.length > 0) {
          setType(selectedNext && selectedNext[0]?.blockChoosen);
          if (selectedNext[0]?.blockChoosen === 'Interaction') {
            const optionsFiltered = [];

            for (const option of gameInfo.questOptions) {
              if (profileData?.Audiogetlanguage.length > 0) {
                if (
                  option?.qpSequence === selectedNext[0]?.blockPrimarySequence
                ) {
                  const profilesetlan = profileData?.Audiogetlanguage.find(
                    (key: any) => key?.textId === option.qpOptionId,
                  );

                  if (profilesetlan) {
                    const languagecont = {
                      ...option,
                      qpOptionText: profilesetlan.content,
                    };
                    optionsFiltered.push(languagecont);
                  } else {
                    optionsFiltered.push(option);
                  }
                }
              } else {
                if (
                  option?.qpSequence === selectedNext[0]?.blockPrimarySequence
                ) {
                  optionsFiltered.push(option);
                }
              }
            }
            if (gameInfo?.gameData?.gameShuffle === 'true') {
              for (let i = optionsFiltered.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsFiltered[i], optionsFiltered[j]] = [
                  optionsFiltered[j],
                  optionsFiltered[i],
                ];
              }
            }
            setOptions(optionsFiltered);
          }
          setData(selectedNext && selectedNext[0]);
        } else {
          setType(nextBlock[0]?.blockChoosen);
          if (nextBlock[0]?.blockChoosen === 'Interaction') {
            const optionsFiltered = [];
            for (const option of gameInfo.questOptions) {
              if (profileData?.Audiogetlanguage.length > 0) {
                if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
                  const profilesetlan = profileData?.Audiogetlanguage.find(
                    (key: any) => key?.textId === option.qpOptionId,
                  );

                  if (profilesetlan) {
                    const languagecont = {
                      ...option,
                      qpOptionText: profilesetlan.content,
                    };
                    optionsFiltered.push(languagecont);
                  } else {
                    optionsFiltered.push(option);
                  }
                }
              } else {
                if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
                  optionsFiltered.push(option);
                }
              }
            }
            if (gameInfo?.gameData?.gameShuffle === 'true') {
              for (let i = optionsFiltered.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsFiltered[i], optionsFiltered[j]] = [
                  optionsFiltered[j],
                  optionsFiltered[i],
                ];
              }
            }
            setOptions(optionsFiltered);
          }
          setData(nextBlock[0]);
        }
        setGame3Position((prev: any) => ({
          ...prev,
          nextBlock: selectedNext[0]?.blockPrimarySequence,
        }));
        setSelectedOption(null);
        return false;
      } else if (next?.blockShowNavigate === 'Complete') {
        //check the replay Quest score is higher than score in profile context
        checkAndUpdateScores();

        const Nextcurrentquest = next?.blockQuestNo;
        const getgameinfoquest = gameInfo?.gameQuest.find(
          (row: any) => row.gameQuestNo == Nextcurrentquest,
        );
        //this place no need to check this condition .....
        /* if (getgameinfoquest?.gameIsSetCongratsScoreWiseMessage === 'true') {
           if (demoBlocks.hasOwnProperty(nextLevel)) {
             setProfile((prev: any) => {
               const data = { ...prev };
               if (!profile.completedLevels.includes(currentQuest)) {
                 data.completedLevels = [...data.completedLevels, nextLevel];
               }
               return data;
             });
             setType(demoBlocks[nextLevel]['1']?.blockChoosen);
             setData(demoBlocks[nextLevel]['1']);
             setFeedbackNavigateNext(false);
             setCurrentScreenId(6);
             return false;
           } else {
             setType(null);
             setData(null);
             setCurrentScreenId(6);
             return false;
           }
         } else */
        if (getgameinfoquest?.gameIsSetMinPassScore === 'true') {
          const getminpassscore = getgameinfoquest?.gameMinScore;
          const scores = profile?.score;
          const sums: any = {};
          scores.forEach((score: any) => {
            const quest = score.quest;
            if (!sums[quest]) {
              sums[quest] = 0;
            }
            sums[quest] += score.score;
          });

          // const getFinalscores = Object.values(sums);
          const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
            quest,
            score,
          }));
          const getscores = getFinalscores.find(
            (row: any) => row.quest == getgameinfoquest.gameQuestNo,
          );
          const finalscore = getscores?.score;
          if (finalscore < getminpassscore) {
            setisReplay(true);
            Setprofilescore(finalscore);
            setisOptionalReplay(false);
            setCurrentScreenId(8);
            return false;
          } else {
            if (demoBlocks.hasOwnProperty(nextLevel)) {
              setProfile((prev: any) => {
                const data = { ...prev };
                if (!profile.completedLevels.includes(currentQuest)) {
                  data.completedLevels = [...data.completedLevels, nextLevel];
                }
                return data;
              });
              setType(demoBlocks[nextLevel]['1']?.blockChoosen);
              setData(demoBlocks[nextLevel]['1']);
              setFeedbackNavigateNext(false);
              setCurrentScreenId(6);
              return false;
            } else {
              setType(null);
              setData(null);
              setCurrentScreenId(6);
              return false;
            }
          }
        } else {
          if (demoBlocks.hasOwnProperty(nextLevel)) {
            setProfile((prev: any) => {
              const data = { ...prev };
              if (!profile.completedLevels.includes(currentQuest)) {
                data.completedLevels = [...data.completedLevels, nextLevel];
              }
              return data;
            });
            setType(demoBlocks[nextLevel]['1']?.blockChoosen);
            setData(demoBlocks[nextLevel]['1']);
            setFeedbackNavigateNext(false);
            setCurrentScreenId(6);
            return false;
          } else {
            setType(null);
            setData(null);
            setCurrentScreenId(6);
            return false;
          }
        }
      } else {
        /** IF a block not has navi option then it leads to next block */
        if (nextBlock && nextBlock[0]?.blockChoosen) {
          setType(nextBlock[0]?.blockChoosen);
          setData(nextBlock[0]);
          setSelectedOption(null);
          return false;
        } else {
          /** else leads to first block of the quest */
          setNavigateBlockEmpty(true);
          setType(demoBlocks[quest]['1']?.blockChoosen);
          setData(demoBlocks[quest]['1']);
          setSelectedOption(null);
          return false;
        }
      }
    }
    else {
      setNavigateBlockEmpty(true);
      setType(demoBlocks[quest]['1']?.blockChoosen);
      setData(demoBlocks[quest]['1']);
      setSelectedOption(null);
      return false;
    }

  };

  const calScore = () => {
    const currentQuest = data?.blockPrimarySequence.split('.')[0] ?? null;
    const currentGameData = gameInfo.gameQuest.find(
      (row: any) => row.gameQuestNo == profile?.currentQuest,
    );
    const nextLevel = currentQuest != null ? String(currentQuest + 1) : null;
    const haveNextQuest = gameInfo.gameQuest.some(
      (row: any) => row.gameQuestNo > profile?.currentQuest,
    );
    const totalScore = profile?.score.forEach((item: any) => {
      if (item && item.marks) {
        return item.marks.reduce((acc: any, mark: any) => acc + mark, 0);
      }
    });
    return {
      currentQuest: currentQuest,
      currentGameData: currentGameData,
      nextLevel: nextLevel,
      haveNextQuest: haveNextQuest,
      totalScore: totalScore,
    };
  };

  let menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );

  const setInteractionOptions = (gameInfo: any, currentBlock: any) => {
    const optionsFiltered = [];
    for (const option of gameInfo.questOptions) {
      if (profileData?.Audiogetlanguage.length > 0) {
        if (option?.qpSequence === currentBlock?.blockPrimarySequence) {
          const profilesetlan = profileData?.Audiogetlanguage.find(
            (key: any) => key?.textId === option.qpOptionId,
          );

          if (profilesetlan) {
            const languagecont = {
              ...option,
              qpOptionText: profilesetlan.content,
            };
            optionsFiltered.push(languagecont);
          } else {
            optionsFiltered.push(option);
          }
        }
      } else {
        if (option?.qpSequence === currentBlock?.blockPrimarySequence) {
          optionsFiltered.push(option);
        }
      }
    }
    // const optionsFiltered = gameInfo?.questOptions.filter(
    //   (key: any) => key?.qpSequence === currentBlock?.blockPrimarySequence,
    // );
    if (gameInfo?.gameData?.gameShuffle === 'true') {
      for (let i = optionsFiltered.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsFiltered[i], optionsFiltered[j]] = [
          optionsFiltered[j],
          optionsFiltered[i],
        ];
      }
      setOptions(optionsFiltered);
    }
  };

  // validate the choosed option
  const handleValidate = (item: any, ind: number) => {
    setCurrentScore(parseInt(item?.qpScore));
    setResMsg(item?.qpResponse);
    setFeed(item?.qpFeedback);
    setNavi(item?.qpNavigateShow);
    setOptionNavigation(item?.qpNextOption);
    setSelectedOption(ind === selectedOption ? null : ind);
    const text = '..Option ' + item.qpOptions + ' -- ' + item.qpOptionText;
    SetgetSelectedOptions({
      options: item.qpOptions,
      optionText: item.qpOptionText,
    });
    setOptionSelectId(item.qpOptionId);
    const voiceId =
      // data?.blockRoll == '999999'
      //   ? voiceIds.NPC :
      profileData?.gender === 'Male'
        ? voiceIds?.playerMale
        : voiceIds?.playerFemale;
    // getAudioForText(text, voiceId);
  };

  useEffect(() => {
    if (voiceRef.current) {
      voiceRef.current.pause();
    }
    const backGroundBgmscreens = [1, 3, 4, 5, 6, 7, 11, 12, 13];
    if (currentScreenId !== 2 && backGroundBgmscreens.includes(currentScreenId)) {
      console.log('currentscreenid 2675',currentScreenId);
      if (backgroundBgmRef.current) {
        backgroundBgmRef.current.play(); // Play background BGM
      }
      if (voiceRef.current) {
        voiceRef.current.pause(); // Pause voice
      }

    }
    if(currentScreenId === 2 || currentScreenId === 0)
      {
        if (backgroundBgmRef.current) {
          backgroundBgmRef.current.pause(); // pause background BGM
        }
        if(voiceRef.current)
          {
            voiceRef.current.play();
          }
        
      }
 

    setFeedBackFromValue();

    const screens = [1, 10, 13, 12];
    if (!screens.includes(currentScreenId)) {
      const screenIdset =
        getPrevLogDatas.screenIdSeq[getPrevLogDatas.screenIdSeq.length - 1];
      if (screenIdset !== currentScreenId) {
        setPreLogDatas((prev: any) => ({
          ...prev,
          screenIdSeq: [...prev.screenIdSeq, currentScreenId],
        }));
      }
    }
  }, [currentScreenId]);

  const setFeedBackFromValue = () => {
    switch (currentScreenId) {
      case 0:
        setReviewTabOptions([1, 5]); //GameInto screen
        break;
      case 1:
        // setReviewTabOptions([1, 3, 5]); //Welcome
        setReviewTabOptions([1, 5]); //Welcome
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
      case 9:
        setReviewTabOptions([1, 2, 4]); //Feedback after Each interaction
        break;
      case 14:
        setReviewTabOptions([1, 2, 4]); //Feedback after Completion All together
        break;

      // default:
      //   setReviewTabOptions([1, 2, 3, 4, 5]); //All
    }
  };

  useEffect(() => {
    if (reviewTabOptions) {
      const filterTabOptionsList = tabOptions.filter((tabOption) =>
        reviewTabOptions.includes(tabOption.value),
      );

      setFilteredTabOptions(filterTabOptionsList);
    }
  }, [reviewTabOptions]);

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
    if (audioRef.current) {
      if (currentScreenId === 2) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setReviewInput((prev: any) => ({
      ...prev,
      review: '',
      tabId: null,
      tabAttribute: '',
      tabAttributeValue: '',
    }));
    isMenuOpen && setIsMenuOpen(false);
  }, [currentScreenId]);
  useEffect(() => {
    if (reviewInput?.tabId) {
      if (reviewInput?.tabId == 5) {
        if (currentScreenId === 6) {
          setReviewInput((prev: Review) => ({
            ...prev,
            tabAttribute: 'screenId',
            tabAttributeValue:
              Tab5attribute.indexOf(Number(currentScreenId)).toString() +
              '@' +
              profile?.currentQuest,
          }));
        } else {
          setReviewInput((prev: Review) => ({
            ...prev,
            tabAttribute: 'screenId',
            tabAttributeValue: Tab5attribute.indexOf(
              Number(currentScreenId),
            ).toString(),
          }));
        }

        setReviewSubTabOptions([]);
      } else if (reviewInput?.tabId == 4) {
        //for Story Tab *******
        if (currentScreenId == 9 || currentScreenId == 14) {
          const blockSeqId =
            currentScreenId == 9
              ? data.blockQuestNo + '@' + data.blockSecondaryId
              : FeedBackoptionData[
                  FeedbackcurrentPosition > 0
                    ? FeedbackcurrentPosition - 1
                    : FeedbackcurrentPosition
                ].blockQuestNo +
                '@' +
                FeedBackoptionData[
                  FeedbackcurrentPosition > 0
                    ? FeedbackcurrentPosition - 1
                    : FeedbackcurrentPosition
                ].blockSecondaryId;
          setReviewInput((prev: Review) => ({
            ...prev,
            tabAttribute: 'blockSeqId',
            tabAttributeValue: blockSeqId,
          }));
        } else {
          const blockSeqId = data.blockQuestNo + '@' + data.blockSecondaryId;
          setReviewSubTabOptions([]);
          setReviewInput((prev: Review) => ({
            ...prev,
            tabAttribute: 'blockSeqId',
            tabAttributeValue: blockSeqId,
          }));
        }
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

  const handleSubTabSelection = (e: any) => {
    const selectedTabFileds = tabAttributeSets.find(
      (item) => Object.keys(item)[0] === reviewInput?.tabId.toString(),
    );
    setReviewInput((prev: Review) => ({
      ...prev,
      tabAttribute: e.target.value
        ? selectedTabFileds[reviewInput?.tabId.toString()]?.tabAttribute
        : null,
      tabAttributeValue: e.target.value ?? null,
    }));
  };

  const handleMenubtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpen(true);
  };

  // const toast = useToast();
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
    onClose1();
    setCurrentScreenId(10);
  };

  const replayGame = () => {
    setType(gameInfo?.blocks[profile?.currentQuest]['1']?.blockChoosen);
    setData(gameInfo?.blocks[profile?.currentQuest]['1']);
    setCurrentScreenId(2);
  };
  const replayNextHandler = (data: any) => {
    // const currentQuest = data
    //   ? parseInt(data?.blockPrimarySequence.split('.')[0])
    //   : null;
    // const nextLevel = currentQuest != null ? currentQuest === Object.keys(demoBlocks).length ? currentQuest : String(currentQuest + 1) : null;
    // if (demoBlocks.hasOwnProperty(nextLevel)) {
    //   setProfile((prev: any) => {
    //     const data = { ...prev };
    //     if (!profile.completedLevels.includes(currentQuest)) {
    //       data.completedLevels = [...data.completedLevels, nextLevel];
    //     }

    //     return data;
    //   });
    //   setType(demoBlocks[nextLevel]['1']?.blockChoosen);
    //   setData(demoBlocks[nextLevel]['1']);
    //   setCurrentScreenId(13);
    //   return false;
    // } else {
    //   if (
    //     gameInfo.gameData?.gameIsShowReflectionScreen !== 'false' &&
    //     gameInfo?.reflectionQuestions.length > 0
    //   ) {
    //     setCurrentScreenId(3); //Navigate to Reflection screen
    //     return false;
    //   } else if (gameInfo.gameData?.gameIsShowTakeaway !== 'false') {
    //     setCurrentScreenId(7); //Navigate to Takeaway screen
    //     return false;
    //   } else {
    //     setType(null);
    //     setData(null);
    //     setCurrentScreenId(5); //Navigate to Thank you screen
    //     return false;
    //   }
    // }
    setCurrentScreenId(4);
    return false;
  };
 
  const handleAudioError = () => {
    console.error(
      'Failed to load video because no supported source was found.',
    );
  };

  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      if (gameInfo?.gameData?.gameId > 0) {
        const resLang = await getGameLanguages(gameInfo?.gameData?.gameId);
        if (resLang?.status === 'Success') {
          if (resLang?.data.length > 0) {
            const data = resLang?.data;
            // const data =[{value: 1, label: 'Tamil'}, {value: 2, label: 'French'}, {value: 5, label: 'Chinesh'}];
            setGameLanguages(data);
            // setProfileData((prev: any) => ({
              data.unshift({ value: 0, label: 'English' });
              //   ...prev,
            //   language: data[0]?.value,
            // }));
            // setPreLogDatas((prev: any) => ({
            //   ...prev,
            //   previewProfile: {
            //     ...prev.previewProfile,
            //     language: data[0]?.value,
            //   },
            // }));
           
            setHasMulitLanguages(true);
            // setIsOpenCustomModal(true);
          } else {
            setProfileData((prev: any) => ({
              ...prev,
              language: 'English',
            }));
          }
        }
      }
    };
    fetchSupportedLanguages();
  }, []);
  


  // Afrith-modified-starts-13/Mar/24

  const getCurrentResolution = () => {
    // Logic to get current screen resolution
    // You can use window.innerWidth and window.innerHeight
    // return {
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // };

    const body = document.getElementById('body');
    body.style.width = `${window.innerWidth}px`;
    body.style.height = `${window.innerHeight}px`;

    return body;
  };
  // const getMobileResolution = () => {

  // };

  const getCurrScreen = (screenType: any) => {
    // Perform any other actions based on the screen type
    if (screenType == 'Desktop') {
      setResolution(getCurrentResolution());
    } else if (screenType == 'Mobile') {
      // getMobileResolution();
      setResolution({ width: 430, height: 932 });
    } else if (screenType == 'Tablet') {
      setResolution({ width: 768, height: 1024 });
    }
  };

  const dontShowTopMenu = !([3,4,5,6,7,10].includes(currentScreenId));
    // currentScreenId !== 7 &&
    // currentScreenId !== 6 &&
    // currentScreenId !== 5 &&
    // currentScreenId !== 4 &&
    // currentScreenId !== 3 &&
    // currentScreenId !== 10;

  useEffect(() => {
    if (FeedbackNavigatenext === true) {
      getData(data);
    }
    console.log('FeedbackNavigatenext 9', FeedbackNavigatenext)
  }, [FeedbackNavigatenext]);

  const getFeedbackData = (getdata: any) => {
    setisScreenshot(true);
    const groupedFeedback: { [key: string]: any[] } = {};
    feedbackList.forEach((feedback) => {
      if (!(feedback.Seq in groupedFeedback)) {
        groupedFeedback[feedback.Seq] = [];
      }
      groupedFeedback[feedback.Seq].push(feedback);
    });
    const firstPageFeedback: any[] = [];
    Object.keys(groupedFeedback).forEach((seq) => {
      const lastIndex = groupedFeedback[seq].length - 1;
      firstPageFeedback.push(groupedFeedback[seq][lastIndex]);
    });

    let newRemainingSentences;
    if (FeedbackcurrentPosition < firstPageFeedback.length) {
      newRemainingSentences =
        firstPageFeedback[FeedbackcurrentPosition].feedbackcontent;
      // getOption for FeedBack
      const getgameinfoblockchoosen = gameInfo?.blocks[profile?.currentQuest];
      const getArray = [];
      for (const key in getgameinfoblockchoosen) {
        if (getgameinfoblockchoosen[key].blockChoosen === 'Interaction') {
          getArray.push(getgameinfoblockchoosen[key]);
        }
      }
      setInterActionBlockArray(getArray); //Prabakaran worked. Newly added

      const GetSeqData = getArray.filter((item: any) => {
        return (
          item?.blockPrimarySequence ===
          firstPageFeedback[FeedbackcurrentPosition].Seq
        );
      });
      const optionsFiltered = gameInfo?.questOptions.filter(
        (key: any) => key?.qpSequence === GetSeqData[0]?.blockPrimarySequence,
      );
      if (gameInfo?.gameData?.gameShuffle === 'true') {
        for (let i = optionsFiltered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [optionsFiltered[i], optionsFiltered[j]] = [
            optionsFiltered[j],
            optionsFiltered[i],
          ];
        }
      }

      const SelectedoptionsFiltered = optionsFiltered.filter(
        (key: any) =>
          key?.qpOptions ==
          firstPageFeedback[FeedbackcurrentPosition].Options['options'],
      );
      const selectoptionfeed = SelectedoptionsFiltered[0].qpOptions
        ? SelectedoptionsFiltered[0].qpOptions
        : 'null';
      setOptions(optionsFiltered);
      setFeedBackSelectedoptionData(selectoptionfeed);
      setFeedBackoptionData(GetSeqData);
      setFeedbackCurrentPosition(FeedbackcurrentPosition + 1);
      setFeedbackRemainingSentences(newRemainingSentences);
    } else {
      console.log('FeedbackNavigatenext', FeedbackNavigatenext);
      setFeedbackList([]);
      setFeedbackCurrentPosition(0);
      setFeedbackNavigateNext(true);
    }
  };

  const handleHome = () => {
    setCurrentScreenId(1);
    return true;
  };
  useEffect(() => {
    const updatepreviousdatas = async () => {
      const data = {
        previewLogId: getPrevLogDatas.previewLogId,
        playerId: gameInfo?.reviewer?.ReviewerId ?? user?.data?.id,
        playerType: gameInfo?.reviewer?.ReviewerId
          ? 'reviewer'
          : user?.data?.id
          ? 'creator'
          : null,
        previewGameId: gameInfo?.gameId ?? null,
        nevigatedSeq: getPrevLogDatas.nevigatedSeq,
        screenIdSeq: getPrevLogDatas.screenIdSeq,
        lastActiveBlockSeq: getPrevLogDatas.lastActiveBlockSeq,
        selectedOptions: getPrevLogDatas.selectedOptions,
        previewProfile: getPrevLogDatas.previewProfile,
        lastBlockModifiedDate: getPrevLogDatas.lastBlockModifiedDate,
        lastModifiedBlockSeq: getPrevLogDatas.lastModifiedBlockSeq,
      };

      const previousDataString = JSON.stringify(data);
      const updatePreviewLogsResponse = await updatePreviewlogs(
        previousDataString,
      );
    };
    updatepreviousdatas();
  }, [getPrevLogDatas]);


//  Newly Added  for prviouse stored
  const SetPreviouseStored = (currentdata: any) => {
    if (currentdata !== null) {
      const currentQuest = currentdata
        ? parseInt(currentdata?.blockPrimarySequence.split('.')[0])
        : null;
      if (currentdata?.blockChoosen === 'Interaction') {
        if (currentQuest === parseInt(profile.currentQuest)) {
          if (getPrevLogDatas.selectedOptions[profile?.currentQuest]) {
            const existingIndex = getPrevLogDatas.selectedOptions[profile?.currentQuest]?.findIndex((item: any) => item.blockId === currentdata.blockId);

            if (existingIndex !== -1) {
              const updatedOptions = [...getPrevLogDatas.selectedOptions[profile?.currentQuest]];

              updatedOptions[existingIndex] = { blockId: currentdata.blockId, optionId: OptionSelectId };
              setPreLogDatas((prev: any) => ({
                ...prev,
                selectedOptions: {
                  ...prev.selectedOptions,
                  [profile?.currentQuest]: updatedOptions,
                },
              }));
            }
            else {
              setPreLogDatas((prev: any) => ({
                ...prev,
                selectedOptions: { ...prev.selectedOptions, [profile?.currentQuest]: [...prev.selectedOptions[profile?.currentQuest], { blockId: currentdata.blockId, optionId: [OptionSelectId] }] }
              }));
            }
          } else {
            setPreLogDatas((prev: any) => ({
              ...prev,
              selectedOptions: { ...prev.selectedOptions, [profile?.currentQuest]: [{ blockId: currentdata.blockId, optionId: [OptionSelectId] }] }
            }));

          }
        } else {
          setPreLogDatas((prev: any) => ({
            ...prev,
            selectedOptions: {
              [profile?.currentQuest]: [
                { blockId: currentdata.blockId, optionId: OptionSelectId },
              ],
            },
          }));
        }
      }
    }
  };

console.log("isSpeaking --->>", isSpeaking);
  return (
    <ProfileContext.Provider value={profileData}>
      <Box id="EntirePreview-wrapper">
        <Box className="EntirePreview-content">
          <Box id="container" className="Play-station">
            <TopMenuBar
              dontShowTopMenu={dontShowTopMenu}
              preloadedAssets={preloadedAssets}
              currentScreenId={currentScreenId}
              setCurrentScreenId={setCurrentScreenId}
              isSettingOpen={isSettingOpen}
              setIsSettingOpen={setIsSettingOpen}
              setHomeLeaderBoard={setHomeLeaderBoard}
              profileData={profileData}
              gameInfo={gameInfo}
              demoBlocks={demoBlocks}
              data={data}
              setAudioObj={setAudioObj}
              audioObj={audioObj}
              questState={questState}
              setIsOpenCustomModal={setIsOpenCustomModal}
            />
          </Box>
          <Flex
            height="100vh"
            className={
              currentScreenId === 2 || currentScreenId === 15
                ? ''
                : 'EntirePreview'
            }
          >
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
                          setIsGetsPlayAudioConfirmation={
                            setIsGetsPlayAudioConfirmation
                          }
                        />
                      }
                    </>
                  );
                case 1:
                  return (
                    <>
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
                          backgroundImage={preloadedAssets.backgroundImage}
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
                              currentScreenId={currentScreenId}
                              setprevScreenId={setprevScreenId}
                              setCurrentScreenId={setCurrentScreenId}
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.backgroundImage}
                              screen={preloadedAssets.Screen5}
                              preview={true}
                              preloadedAssets={preloadedAssets}
                              setPreLogDatas={setPreLogDatas}
                              getPrevLogDatas={getPrevLogDatas}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                case 2:
                  return (
                    <>
                      {data && type && (
                        <Story
                          selectedNpc={gameInfo?.gameNonPlayerUrl}
                          selectedPlayer={selectedPlayer}
                          formData={gameInfo?.gameData}
                          backGroundImg={preloadedAssets.backgroundImage}
                          data={data}
                          type={type}
                          handleValidate={handleValidate}
                          resMsg={resMsg}
                          feed={feed}
                          getData={getData}
                          options={options}
                          option={selectedOption}
                          profileData={profileData}
                          voiceIds={voiceIds}
                          setAudioObj={setAudioObj}
                          setIsGetsPlayAudioConfirmation={
                            setIsGetsPlayAudioConfirmation
                          }
                          setIsPrevNavigation={setIsPrevNavigation}
                          setNavTrack={setNavTrack}
                          navTrack={navTrack}
                          gameInfo={gameInfo}
                          preloadedAssets={preloadedAssets}
                          questState={questState}
                          LastModiPrevData={LastModiPrevData}
                          setPreLogDatas={setPreLogDatas}
                          getPrevLogDatas={getPrevLogDatas}
                          RepeatSelectOption={RepeatSelectOption}
                          RepeatPrevOption={RepeatPrevOption}
                        />
                      )}
                    </>
                  );
                case 3:
                  return (
                    <>
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
                        <Box className="Game-Screen">
                          <Box className="Images">
                            <Reflection
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.RefBg}
                              reflectionQuestions={
                                gameInfo?.reflectionQuestions
                              }
                              gameInfo={gameInfo}
                              setCurrentScreenId={setCurrentScreenId}
                              preloadedAssets={preloadedAssets}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                case 4:
                  return (
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
                        backgroundImage={preloadedAssets.backgroundImage}
                        w={'100% !important'}
                        h={'100vh'}
                        backgroundRepeat={'no-repeat'}
                        backgroundSize={'cover'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        className="Game-Screen"
                      >
                        <Box className="Images" zIndex={99}>
                          <LeaderBoard
                            homeLeaderBoard={homeLeaderBoard}
                            setHomeLeaderBoard={setHomeLeaderBoard}
                            setCurrentScreenId={setCurrentScreenId}
                            formData={gameInfo?.gameData}
                            imageSrc={preloadedAssets.Lead}
                            getData={getData}
                            data={data}
                            gameInfo={gameInfo}
                            preloadedAssets={preloadedAssets}
                          />
                        </Box>
                      </Box>
                    </Box>
                  );
                case 5:
                  return (
                    <>
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
                          backgroundImage={preloadedAssets.backgroundImage}
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
                              setCurrentScreenId={setCurrentScreenId}
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.ThankYou}
                              preloadedAssets={preloadedAssets}
                              getPrevLogDatas={getPrevLogDatas}
                              setPreLogDatas={setPreLogDatas}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                case 6:
                  return (
                    <>
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
                          backgroundImage={preloadedAssets.backgroundImage}
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
                              questOptions={gameInfo?.questOptions}
                              getData={getData}
                              questState={questState}
                              setQuestState={setQuestState}
                              data={data}
                              setFeedbackNavigateNext={setFeedbackNavigateNext}
                              getFeedbackData={getFeedbackData}
                              gameInfo={gameInfo}
                              setCurrentScreenId={setCurrentScreenId}
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.backgroundImage}
                              screen={preloadedAssets.Screen1}
                              profile={profile}
                              currentQuestNo={currentQuestNo}
                              completionScreenQuestOptions={
                                gameInfo.completionQuestOptions
                              }
                              preloadedAssets={preloadedAssets}
                              setType={setType}
                              setData={setData}
                              type={type}
                              questWiseMaxTotal={questWiseMaxTotal}/// Pass questWiseMaxTotal as a prop
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                case 7:
                  return (
                    <>
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
                          backgroundImage={preloadedAssets.backgroundImage}
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
                              imageSrc={preloadedAssets.Screen4}
                              getData={getData}
                              data={data}
                              preloadedAssets={preloadedAssets}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                case 8:
                  return (
                    <>
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
                          backgroundImage={preloadedAssets.backgroundImage}
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
                              replayNextHandler={replayNextHandler}
                              type={type}
                              gameInfo={gameInfo}
                              setType={setType}
                              setData={setData}
                              isOptionalReplay={isOptionalReplay}
                              setisOptionalReplay={setisOptionalReplay}
                              setisReplay={setisReplay}
                              profilescore={profilescore}
                              isReplay={isReplay}
                              setCurrentScreenId={setCurrentScreenId}
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.Replay}
                              getData={getData}
                              data={data}
                              preloadedAssets={preloadedAssets}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                case 9:
                  return (
                    <FeedBackScreen
                      backgroundScreenUrl={preloadedAssets.backgroundImage}
                      first={first}
                      showNote={showNote}
                      isScreenshot={isScreenshot}
                      FeedbackremainingSentences={FeedbackremainingSentences}
                      options={options}
                      setisScreenshot={setisScreenshot}
                      FeedBackselectedoptionData={FeedBackselectedoptionData}
                      FeedBackoptionData={FeedBackoptionData}
                      getFeedbackData={getFeedbackData}
                      data={data}
                      feed={feed}
                      currentScreenId={currentScreenId}
                      getData={getData}
                      profile={profile}
                      preloadedAssets={preloadedAssets}
                      FeedbackcurrentPosition={FeedbackcurrentPosition}
                      interactionBlockArray={interactionBlockArray}
                    />
                  );
                case 10:
                  return (
                    <GameIntroScreen
                      preloadedAssets={preloadedAssets}
                      setCurrentScreenId={setCurrentScreenId}
                      setIsGetsPlayAudioConfirmation={
                        setIsGetsPlayAudioConfirmation
                      }
                      setPreLogDatas={setPreLogDatas}
                      getPrevLogDatas={getPrevLogDatas}
                      setprevScreenId={setprevScreenId}
                      currentScreenId={currentScreenId}
                      setModelControl={setModelControl}
                      gameInfo={gameInfo.gameData}
                      setLastModified={setLastModified}
                      hasMulitLanguages={hasMulitLanguages}
                      setIsOpenCustomModal={setIsOpenCustomModal}
                      // CharacterModal={CharacterModal}
                    ></GameIntroScreen>
                  );
                case 11:
                  return (
                    <>
                      <ProfileScreen
                        imageSrc={preloadedAssets.backgroundImage}
                        setCurrentScreenId={setCurrentScreenId}
                        profileData={profileData}
                        formData={gameInfo?.gameData}
                        setProfileData={setProfileData}
                        setPreLogDatas={setPreLogDatas}
                        preloadedAssets={preloadedAssets}
                        getPrevLogDatas={getPrevLogDatas}
                      />
                    </>
                  );
                case 12:
                  return (
                    <>
                      <Characterspage
                        profileData={profileData}
                        setProfileData={setProfileData}
                        setprevScreenId={setprevScreenId}
                        currentScreenId={currentScreenId}
                        setSelectedPlayer={setSelectedPlayer}
                        players={gameInfo?.gamePlayers}
                        formData={gameInfo?.gameData}
                        imageSrc={preloadedAssets.backgroundImage}
                        setCurrentScreenId={setCurrentScreenId}
                        demoBlocks={demoBlocks}
                        preloadedAssets={preloadedAssets}
                        setPreLogDatas={setPreLogDatas}
                        getPrevLogDatas={getPrevLogDatas}
                      />
                    </>
                  );
                case 13:
                  return (
                    <>
                      <ChapterPage
                        setCurrentQuestNo={setCurrentQuestNo}
                        questState={questState}
                        setQuestState={setQuestState}
                        currentQuestNo={currentQuestNo}
                        formData={gameInfo?.gameData}
                        imageSrc={preloadedAssets.backgroundImage}
                        demoBlocks={demoBlocks}
                        questOptions={gameInfo?.questOptions}
                        setCurrentScreenId={setCurrentScreenId}
                        setData={setData}
                        setType={setType}
                        setOptions={setOptions}
                        gameQuest={gameInfo?.gameQuest}
                        setFeedbackList={setFeedbackList}
                        preloadedAssets={preloadedAssets}
                        setprevScreenId={setprevScreenId}
                        currentScreenId={currentScreenId}
                        setPreLogDatas={setPreLogDatas}
                        getPrevLogDatas={getPrevLogDatas}
                      />
                    </>
                  );
                case 14:
                  return (
                    <FeedBackScreen
                      backgroundScreenUrl={preloadedAssets.backgroundImage}
                      first={first}
                      showNote={showNote}
                      isScreenshot={isScreenshot}
                      FeedbackremainingSentences={FeedbackremainingSentences}
                      setisScreenshot={setisScreenshot}
                      options={options}
                      FeedBackselectedoptionData={FeedBackselectedoptionData}
                      FeedBackoptionData={FeedBackoptionData}
                      getFeedbackData={getFeedbackData}
                      data={data}
                      currentScreenId={currentScreenId}
                      getData={getData}
                      profile={profile}
                      preloadedAssets={preloadedAssets}
                    />
                  );

                case 15:
                  return (
                    <Overview
                      formData={gameInfo?.gameData}
                      imageSrc={preloadedAssets.overview}
                      preloadedAssets={preloadedAssets}
                      homeLeaderBoard={homeLeaderBoard}
                      setCurrentScreenId={setCurrentScreenId}
                      backGroundImg={preloadedAssets.backgroundImage}
                    />
                  );
                  break;

                case 16:
                  return (
                    <ReplayPoints
                      setData={setData}
                      setType={setType}
                      preloadedAssets={preloadedAssets}
                      demoBlocks={demoBlocks}
                      profile={profile}
                      setCurrentScreenId={setCurrentScreenId}
                      setModelScreen={setModelScreen}
                      modelScreen={modelScreen}
                    />
                  );
                  break;

                default:
                  console.log(
                    'game details of the data',
                    gameInfo?.gameData,
                    currentScreenId,
                  );
                  return <h1>Loading Screen .... Default case </h1>;
              }
            })()}
            {ModelControl === true || NavigateBlockEmpty === true ?

              <>
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
                    backgroundImage={preloadedAssets.backgroundImage}
                    w={'100% !important'}
                    h={'100vh'}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'cover'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    className="Game-Screen"
                  >
                    <Box className="Images">
                      <ModelPopup ModelControl={ModelControl} setModelControl={setModelControl} backGroundImg={preloadedAssets.backgroundImage} preloadedAssets={preloadedAssets} getPrevLogDatas={getPrevLogDatas} setCurrentScreenId={setCurrentScreenId} setLastModified={setLastModified} LastModified={LastModified} setData={setData} setType={setType} gameInfo={gameInfo.blocks} setOptions={setOptions} gameInfoquest={gameInfo.questOptions} gameinfodata={gameInfo.gameData.gameShuffle} isSetStoryScreen={isSetStoryScreen} isStoryScreen={isStoryScreen} setPreLogDatas={setPreLogDatas} NavigateBlockEmpty={NavigateBlockEmpty} setNavigateBlockEmpty={setNavigateBlockEmpty}
                      />
                    </Box>
                  </Box>
                </Box>
              </>
            ) : null}
          </Flex>
          {/* Anonymous User's Review Form Menu
           * It works when uuid has UUID
           */}
          {isReviewDemo && !skipScreenList?.includes(currentScreenId) && (
            <Menu isOpen={isMenuOpen}>
              <MenuButton
                p="0px"
                bg={'brandScheme'}
                position={'fixed'}
                bottom={'35px'}
                right={'5px'}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleMenubtn(e)
                }
              >
                <Icon
                  as={AiFillMessage}
                  bg={'#3311db'}
                  color={'#fff'}
                  w="60px"
                  h="60px"
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
                    fontSize="sm"
                    fontWeight="bold"
                  >
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
                  >
                    <option value={''}>Select</option>
                    {filteredTabOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                  {reviewInput?.tabId !== null &&
                    reviewInput?.tabId !== undefined &&
                    reviewSubTabOptions?.length > 0 && (
                      <>
                        <FormLabel
                          display="flex"
                          ms="10px"
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          <Text fontSize="sm" fontWeight="400" ms="2px">
                            {'Secondary Options'}
                            <Text as="span" color="red.500">
                              *
                            </Text>
                          </Text>
                        </FormLabel>
                        <Select
                          mb="10px"
                          me="30px"
                          id="subtab"
                          name="subtab"
                          onChange={handleSubTabSelection}
                        >
                          <option value={''}>Select</option>
                          {reviewSubTabOptions.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Select>
                      </>
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
                    <Text
                      color="#CBD5E0"
                      fontSize={{ base: 'sm', '2xl': 'md' }}
                    >
                      {'Maximum of 250 characters...'}
                    </Text>
                  </FormControl>
                  <MenuItem>
                    <Box
                      w={'100%'}
                      display={'flex'}
                      justifyContent={'flex-start'}
                    >
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
          )}
          {/* Audio Play Ref */}
          {/* {audioObj?.url && (
            <audio
              ref={audioRef}
              controls
              style={{ display: 'none' }}
              loop={audioObj?.loop}
              onError={handleAudioError}
            >
              <source src={audioObj?.url} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}*/ }
          {audioObj.type === EnumType.BGM && (
            <audio ref={backgroundBgmRef} loop={audioObj.loop} style={{ display: 'none' }}>
              <source src={audioObj.url} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}

          {/* Voice */}
          {audioObj.type === EnumType.VOICE && (
            <audio ref={voiceRef} style={{ display: 'none' }}>
              <source src={audioObj.url} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
          {/* Language Transaltion Modal popup */}

          {/* <LanguageSelectionPrompt
            gameLanguages={gameLanguages}
            formData={gameInfo?.gameData}
            preloadedAssets={preloadedAssets}
            hasMulitLanguages={hasMulitLanguages}
            setHasMulitLanguages={setHasMulitLanguages}
            profileData={profileData}
            setProfileData={setProfileData}
            setIsOpenCustomModal={setIsOpenCustomModal}
            isOpenCustomModal={isOpenCustomModal}
          /> */}
          
            <PromptScreen preloadedAssets={preloadedAssets} setIsOpenCustomModal={setIsOpenCustomModal} isOpenCustomModal={isOpenCustomModal} hasMulitLanguages={hasMulitLanguages} setHasMulitLanguages={setHasMulitLanguages} profileData={profileData}
            setProfileData={setProfileData}  gameLanguages={gameLanguages} formData={gameInfo?.gameData} setPreLogDatas={setPreLogDatas} getPrevLogDatas={getPrevLogDatas} currentScreenId={currentScreenId}/>
            <Canvas>
            <CharacterModal preloadedAssets={preloadedAssets} isSpeaking={isSpeaking}/>
            </Canvas>
            <Button onClick={()=>setIsSpeaking(!!!isSpeaking)}>isSpeaking</Button>
        </Box>
      </Box>
    </ProfileContext.Provider>
  );
};

export default EntirePreview;
