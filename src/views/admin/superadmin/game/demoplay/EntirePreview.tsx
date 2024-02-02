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
} from '@chakra-ui/react';
import Screen2 from 'assets/img/screens/screen2.png';
import Screen5 from 'assets/img/screens/screen5.png';
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
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import SelectField from 'components/fields/SelectField';
import InitialImg from 'assets/img/games/load.jpg';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
// import Sample from '../../../../assets/img/games/Character_sample.glb';
import Sample from 'assets/img/games/Character_sample.glb';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import feedi from 'assets/img/screens/feed.png';
import { AiFillMessage } from 'react-icons/ai';
import Story from './playcards/Story';
import Welcome from './playcards/Welcome';

const gameData: any = {
  gameId: 7,
  reviewer: {
    ReviewerId: 1,
    ReviewerName: 'brindha',
    ReviewerEmailId: null,
    ReviewerGender: 'Female',
    ReviewerStatus: 'YES',
    ReviewerDeleteStatus: 'NO',
  },
  reviews: [
    {
      reviewId: 1,
      gameReviewerId: 1,
      reviewGameId: 7,
      tabId: 1,
      tabAttribute: null,
      tabAttributeValue: null,
      review: 'Background',
      createdAt: '2024-01-23T04:21:48.000Z',
      updatedAt: '2024-01-23T04:21:48.000Z',
    },
  ],
  gameHistory: {
    gvId: 7,
    gvgameId: 25,
    gvViewUserId: 3,
    createdAt: '2024-01-04T10:35:19.000Z',
    updatedAt: null,
  },
  assets: {
    gasId: 1,
    gasAssetType: '1',
    gasAssetName: 'Forest',
    gasStatus: 'Active',
    gasDeleteStatus: 'NO',
    gasAssetImage:
      'http://192.168.1.29:5555/uploads/background/41524_1701765021527.jpg',
  },
  blocks: {
    '1': {
      '1': {
        blockGameId: 7,
        blockQuestNo: 1,
        blockId: 139,
        blockSecondaryId: 2,
        blockPrimarySequence: '1.1',
        blockDragSequence: '1.1',
        blockType: null,
        blockRoll: 'Narrator',
        blockResponseRoll: null,
        blockSkillTag: null,
        blockTitleTag: null,
        blockText: 'hi this is me',
        blockNoOfOptions: null,
        blockChoosen: 'Note',
        blockVoiceGender: null,
        blockVoiceEmotions: null,
        blockShowNavigate: null,
        blockLeadTo: null,
        blockVoiceAccents: null,
        blockCharacterposesId: null,
        blockAssetId: null,
        blockAnimationId: null,
        blockCreatedDatetime: '2024-02-01T05:01:33.000Z',
        blockEditedDatetime: null,
        blockDeleteStatus: 'No',
        blockActiveStatus: 'Active',
      },
      '2': {
        blockGameId: 7,
        blockQuestNo: 1,
        blockId: 8,
        blockSecondaryId: 1,
        blockPrimarySequence: '1.5',
        blockDragSequence: '1.2',
        blockType: null,
        blockRoll: '22',
        blockResponseRoll: null,
        blockSkillTag: null,
        blockTitleTag: null,
        blockText: 'hi how are you ?\n',
        blockNoOfOptions: null,
        blockChoosen: 'Interaction',
        blockVoiceGender: null,
        blockVoiceEmotions: null,
        blockShowNavigate: null,
        blockLeadTo: null,
        blockVoiceAccents: null,
        blockCharacterposesId: 'Anger',
        blockAssetId: null,
        blockAnimationId: null,
        blockCreatedDatetime: '2024-02-01T05:01:33.000Z',
        blockEditedDatetime: null,
        blockDeleteStatus: 'No',
        blockActiveStatus: 'Active',
      },
      '3': {
        blockGameId: 7,
        blockQuestNo: 1,
        blockId: 140,
        blockSecondaryId: 3,
        blockPrimarySequence: '1.2',
        blockDragSequence: '1.3',
        blockType: null,
        blockRoll: 'Narrator',
        blockResponseRoll: null,
        blockSkillTag: null,
        blockTitleTag: null,
        blockText: 'welcome to the game',
        blockNoOfOptions: null,
        blockChoosen: 'Note',
        blockVoiceGender: null,
        blockVoiceEmotions: null,
        blockShowNavigate: null,
        blockLeadTo: null,
        blockVoiceAccents: null,
        blockCharacterposesId: null,
        blockAssetId: null,
        blockAnimationId: null,
        blockCreatedDatetime: '2024-02-01T05:01:33.000Z',
        blockEditedDatetime: null,
        blockDeleteStatus: 'No',
        blockActiveStatus: 'Active',
      },
      '4': {
        blockGameId: 7,
        blockQuestNo: 1,
        blockId: 141,
        blockSecondaryId: 4,
        blockPrimarySequence: '1.3',
        blockDragSequence: '1.4',
        blockType: null,
        blockRoll: 'Narrator',
        blockResponseRoll: null,
        blockSkillTag: null,
        blockTitleTag: null,
        blockText: 'shall we start the game',
        blockNoOfOptions: null,
        blockChoosen: 'Note',
        blockVoiceGender: null,
        blockVoiceEmotions: null,
        blockShowNavigate: null,
        blockLeadTo: null,
        blockVoiceAccents: null,
        blockCharacterposesId: null,
        blockAssetId: null,
        blockAnimationId: null,
        blockCreatedDatetime: '2024-02-01T05:01:33.000Z',
        blockEditedDatetime: null,
        blockDeleteStatus: 'No',
        blockActiveStatus: 'Active',
      },
      '5': {
        blockGameId: 7,
        blockQuestNo: 1,
        blockId: 142,
        blockSecondaryId: 5,
        blockPrimarySequence: '1.4',
        blockDragSequence: '1.5',
        blockType: null,
        blockRoll: '22',
        blockResponseRoll: null,
        blockSkillTag: null,
        blockTitleTag: null,
        blockText: 'lets start the game ',
        blockNoOfOptions: null,
        blockChoosen: 'Dialog',
        blockVoiceGender: null,
        blockVoiceEmotions: '',
        blockShowNavigate: null,
        blockLeadTo: null,
        blockVoiceAccents: null,
        blockCharacterposesId: 'Anger',
        blockAssetId: null,
        blockAnimationId: null,
        blockCreatedDatetime: '2024-02-01T05:01:33.000Z',
        blockEditedDatetime: null,
        blockDeleteStatus: 'No',
        blockActiveStatus: 'Active',
      },
      '6': {
        blockGameId: 7,
        blockQuestNo: 1,
        blockId: 143,
        blockSecondaryId: 6,
        blockPrimarySequence: '1.6',
        blockDragSequence: '1.6',
        blockType: null,
        blockRoll: '22',
        blockResponseRoll: null,
        blockSkillTag: null,
        blockTitleTag: null,
        blockText: 'who is the king of the forest',
        blockNoOfOptions: null,
        blockChoosen: 'Interaction',
        blockVoiceGender: null,
        blockVoiceEmotions: null,
        blockShowNavigate: null,
        blockLeadTo: null,
        blockVoiceAccents: null,
        blockCharacterposesId: 'Anticipation',
        blockAssetId: null,
        blockAnimationId: null,
        blockCreatedDatetime: '2024-02-01T05:01:33.000Z',
        blockEditedDatetime: null,
        blockDeleteStatus: 'No',
        blockActiveStatus: 'Active',
      },
    },
    '2': {
      '1': {
        blockGameId: 7,
        blockQuestNo: 2,
        blockId: 41,
        blockSecondaryId: 1,
        blockPrimarySequence: '2.3',
        blockDragSequence: '2.1',
        blockType: null,
        blockRoll: '22',
        blockResponseRoll: null,
        blockSkillTag: null,
        blockTitleTag: null,
        blockText:
          "sffeWriting a brilliant 100-150 word article requires focus and conciseness. First, choose a clear and engaging topic that you can cover in a brief space. Start with a compelling opening sentence to grab the reader's attention. Then, develop your mai",
        blockNoOfOptions: null,
        blockChoosen: 'Interaction',
        blockVoiceGender: null,
        blockVoiceEmotions: null,
        blockShowNavigate: null,
        blockLeadTo: null,
        blockVoiceAccents: null,
        blockCharacterposesId: 'Joy',
        blockAssetId: null,
        blockAnimationId: null,
        blockCreatedDatetime: '2024-01-31T08:56:13.000Z',
        blockEditedDatetime: null,
        blockDeleteStatus: 'No',
        blockActiveStatus: 'Active',
      },
      '2': {
        blockGameId: 7,
        blockQuestNo: 2,
        blockId: 144,
        blockSecondaryId: 2,
        blockPrimarySequence: '2.1',
        blockDragSequence: '2.2',
        blockType: null,
        blockRoll: 'Narrator',
        blockResponseRoll: null,
        blockSkillTag: null,
        blockTitleTag: null,
        blockText: 'let start with one',
        blockNoOfOptions: null,
        blockChoosen: 'Note',
        blockVoiceGender: null,
        blockVoiceEmotions: null,
        blockShowNavigate: null,
        blockLeadTo: null,
        blockVoiceAccents: null,
        blockCharacterposesId: null,
        blockAssetId: null,
        blockAnimationId: null,
        blockCreatedDatetime: '2024-01-31T08:56:13.000Z',
        blockEditedDatetime: null,
        blockDeleteStatus: 'No',
        blockActiveStatus: 'Active',
      },
      '3': {
        blockGameId: 7,
        blockQuestNo: 2,
        blockId: 145,
        blockSecondaryId: 3,
        blockPrimarySequence: '2.2',
        blockDragSequence: '2.3',
        blockType: null,
        blockRoll: '22',
        blockResponseRoll: null,
        blockSkillTag: null,
        blockTitleTag: null,
        blockText: 'once a king lead the gen',
        blockNoOfOptions: null,
        blockChoosen: 'Dialog',
        blockVoiceGender: null,
        blockVoiceEmotions: '',
        blockShowNavigate: null,
        blockLeadTo: null,
        blockVoiceAccents: null,
        blockCharacterposesId: 'Surprise',
        blockAssetId: null,
        blockAnimationId: null,
        blockCreatedDatetime: '2024-01-31T08:56:13.000Z',
        blockEditedDatetime: null,
        blockDeleteStatus: 'No',
        blockActiveStatus: 'Active',
      },
    },
  },
  questOptions: [
    {
      qpOptionId: 12,
      qpGameId: 7,
      qpQuestionId: 8,
      qpSecondaryId: 1,
      qpQuestNo: 1,
      qpOptions: 'A',
      qpSequence: '1.5',
      qpOptionText: 'fine',
      qpResponse: '',
      qpResponseEmotion: '',
      qpBlockSecondaryId: '1',
      qpNavigateShow: '',
      qpTag: 'true',
      qpFeedback: '',
      qpSkillTag: null,
      qpScore: '455',
      qpTitleTag: '',
      qpEmotion: 'Fear',
      qpVoice: '',
      qpNextOption: '',
      qpCreatedDatetime: '2024-02-01T05:01:33.000Z',
      qpEditedDatetime: '2024-02-01T05:01:33.000Z',
      qpDeleteStatus: 'No',
      qpActiveStatus: 'Yes',
    },
    {
      qpOptionId: 13,
      qpGameId: 7,
      qpQuestionId: 8,
      qpSecondaryId: 2,
      qpQuestNo: 1,
      qpOptions: 'B',
      qpSequence: '1.5',
      qpOptionText: 'not fine',
      qpResponse: '',
      qpResponseEmotion: '',
      qpBlockSecondaryId: '1',
      qpNavigateShow: '',
      qpTag: 'true',
      qpFeedback: '',
      qpSkillTag: null,
      qpScore: '20',
      qpTitleTag: '',
      qpEmotion: 'Fear',
      qpVoice: '',
      qpNextOption: '',
      qpCreatedDatetime: '2024-02-01T05:01:33.000Z',
      qpEditedDatetime: '2024-02-01T05:01:33.000Z',
      qpDeleteStatus: 'No',
      qpActiveStatus: 'Yes',
    },
    {
      qpOptionId: 14,
      qpGameId: 7,
      qpQuestionId: 8,
      qpSecondaryId: 3,
      qpQuestNo: 1,
      qpOptions: 'C',
      qpSequence: '1.5',
      qpOptionText: 'noted',
      qpResponse: '',
      qpResponseEmotion: '',
      qpBlockSecondaryId: '1',
      qpNavigateShow: '',
      qpTag: 'true',
      qpFeedback: '',
      qpSkillTag: null,
      qpScore: '0',
      qpTitleTag: '',
      qpEmotion: 'Guilt',
      qpVoice: '',
      qpNextOption: '',
      qpCreatedDatetime: '2024-02-01T05:01:33.000Z',
      qpEditedDatetime: '2024-02-01T05:01:33.000Z',
      qpDeleteStatus: 'No',
      qpActiveStatus: 'Yes',
    },
    {
      qpOptionId: 146,
      qpGameId: 7,
      qpQuestionId: 41,
      qpSecondaryId: 4,
      qpQuestNo: 2,
      qpOptions: 'A',
      qpSequence: '2.3',
      qpOptionText: 'sfafasfa',
      qpResponse: '',
      qpResponseEmotion: '',
      qpBlockSecondaryId: '1',
      qpNavigateShow: 'New Block',
      qpTag: 'false',
      qpFeedback: '',
      qpSkillTag: null,
      qpScore: '0',
      qpTitleTag: '',
      qpEmotion: 'Joy',
      qpVoice: '',
      qpNextOption: '',
      qpCreatedDatetime: '2024-01-31T08:56:13.000Z',
      qpEditedDatetime: '2024-01-31T08:56:13.000Z',
      qpDeleteStatus: 'No',
      qpActiveStatus: 'Yes',
    },
    {
      qpOptionId: 147,
      qpGameId: 7,
      qpQuestionId: 41,
      qpSecondaryId: 5,
      qpQuestNo: 2,
      qpOptions: 'B',
      qpSequence: '2.3',
      qpOptionText: 'sfsf',
      qpResponse: '',
      qpResponseEmotion: '',
      qpBlockSecondaryId: '1',
      qpNavigateShow: 'New Block',
      qpTag: 'true',
      qpFeedback: '',
      qpSkillTag: null,
      qpScore: '34',
      qpTitleTag: '',
      qpEmotion: 'Joy',
      qpVoice: '',
      qpNextOption: '',
      qpCreatedDatetime: '2024-01-31T08:56:13.000Z',
      qpEditedDatetime: '2024-01-31T08:56:13.000Z',
      qpDeleteStatus: 'No',
      qpActiveStatus: 'Yes',
    },
    {
      qpOptionId: 148,
      qpGameId: 7,
      qpQuestionId: 41,
      qpSecondaryId: 6,
      qpQuestNo: 2,
      qpOptions: 'C',
      qpSequence: '2.3',
      qpOptionText: 'afa',
      qpResponse: '',
      qpResponseEmotion: '',
      qpBlockSecondaryId: '1',
      qpNavigateShow: 'New Block',
      qpTag: 'false',
      qpFeedback: '',
      qpSkillTag: null,
      qpScore: '0',
      qpTitleTag: '',
      qpEmotion: 'Surprise',
      qpVoice: '',
      qpNextOption: '',
      qpCreatedDatetime: '2024-01-31T08:56:13.000Z',
      qpEditedDatetime: '2024-01-31T08:56:13.000Z',
      qpDeleteStatus: 'No',
      qpActiveStatus: 'Yes',
    },
    {
      qpOptionId: 1110,
      qpGameId: 7,
      qpQuestionId: 143,
      qpSecondaryId: 7,
      qpQuestNo: 1,
      qpOptions: 'A',
      qpSequence: '1.6',
      qpOptionText: 'lion',
      qpResponse: '',
      qpResponseEmotion: '',
      qpBlockSecondaryId: '6',
      qpNavigateShow: 'New Block',
      qpTag: 'true',
      qpFeedback: '',
      qpSkillTag: null,
      qpScore: '70',
      qpTitleTag: '',
      qpEmotion: 'Anticipation',
      qpVoice: '',
      qpNextOption: '',
      qpCreatedDatetime: '2024-02-01T05:01:33.000Z',
      qpEditedDatetime: '2024-02-01T05:01:33.000Z',
      qpDeleteStatus: 'No',
      qpActiveStatus: 'Yes',
    },
    {
      qpOptionId: 1111,
      qpGameId: 7,
      qpQuestionId: 143,
      qpSecondaryId: 8,
      qpQuestNo: 1,
      qpOptions: 'B',
      qpSequence: '1.6',
      qpOptionText: 'tiger',
      qpResponse: '',
      qpResponseEmotion: '',
      qpBlockSecondaryId: '6',
      qpNavigateShow: 'New Block',
      qpTag: 'false',
      qpFeedback: '',
      qpSkillTag: null,
      qpScore: '10',
      qpTitleTag: '',
      qpEmotion: 'Anticipation',
      qpVoice: '',
      qpNextOption: '',
      qpCreatedDatetime: '2024-02-01T05:01:33.000Z',
      qpEditedDatetime: '2024-02-01T05:01:33.000Z',
      qpDeleteStatus: 'No',
      qpActiveStatus: 'Yes',
    },
    {
      qpOptionId: 1112,
      qpGameId: 7,
      qpQuestionId: 143,
      qpSecondaryId: 9,
      qpQuestNo: 1,
      qpOptions: 'C',
      qpSequence: '1.6',
      qpOptionText: 'bear',
      qpResponse: '',
      qpResponseEmotion: '',
      qpBlockSecondaryId: '6',
      qpNavigateShow: 'New Block',
      qpTag: 'false',
      qpFeedback: '',
      qpSkillTag: null,
      qpScore: '8',
      qpTitleTag: '',
      qpEmotion: 'Surprise',
      qpVoice: '',
      qpNextOption: '',
      qpCreatedDatetime: '2024-02-01T05:01:33.000Z',
      qpEditedDatetime: '2024-02-01T05:01:33.000Z',
      qpDeleteStatus: 'No',
      qpActiveStatus: 'Yes',
    },
  ],
};
const demoBlocks: any = gameData?.blocks;

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
  currentScreenId: Number;
  setCurrentScreenId: React.Dispatch<React.SetStateAction<Number>>;
  gameInfo: any;
  setToastObj: React.Dispatch<React.SetStateAction<any>>;
  handleSubmitReview: (data: any) => Promise<void>;
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

const EntirePreview: React.FC<ShowPreviewProps> = ({
  gameScreens,
  currentScreenId,
  setCurrentScreenId,
  gameInfo,
  setToastObj,
  handleSubmitReview,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [showFullText, setShowFullText] = useState(false);
  const maxTextLength = 80;

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
  const [backgroundScreenUrl, setBackgroundScreenUrl] = useState(null);
  /** This state handles the Review Form Tab and Sub Tab options */
  const [reviewTabOptions, setReviewTabOptions] = useState([]);
  const [filteredTabOptions, setFilteredTabOptions] = useState([]);
  const [reviewSubTabOptions, setReviewSubTabOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [reviewInput, setReviewInput] = useState<Review>({
    reviewerId: gameInfo?.reviewer?.ReviewerId ?? null,
    reviewGameId: gameInfo?.gameId ?? null,
    review: '',
    tabId: null,
    tabAttribute: '',
    tabAttributeValue: '',
  });

  const tabAttributeSets: TabAttributeSet[] = [
    { '1': { tabAttribute: null, tabAttributeValue: null } },
    { '2': { tabAttribute: null, tabAttributeValue: null } },
    { '3': { tabAttribute: 'fieldName', tabAttributeValue: '' } },
    { '4': { tabAttribute: 'blockSeqId', tabAttributeValue: '' } },
    { '5': { tabAttribute: 'screenId', tabAttributeValue: '' } },
  ];

  useEffect(() => {
    setShowNote(true);
    setFirst(true);
    setTimeout(() => {
      setFirst(false);
      setShowNote(false);
    }, 1000);
    // to set the first data for the game
    setType(demoBlocks['1']['1']?.blockChoosen);
    setData(demoBlocks['1']['1']);
  }, []);

  useEffect(() => {
    switch (currentScreenId) {
      case 1 && gameInfo?.gameData?.gameWelcomepageBackground:
        setBackgroundScreenUrl(
          'http://192.168.1.29:5555/uploads/background/20252.jpg',
        );
        break;
      case 3 && gameInfo?.gameData?.gameReflectionpageBackground:
        setBackgroundScreenUrl(
          'http://192.168.1.29:5555/uploads/background/reflectionBg.png',
        );
        break;
      default:
        setBackgroundScreenUrl(
          'http://192.168.1.29:5555/uploads/background/41524_1701765021527.jpg',
        );
        break;
    }
  }, [currentScreenId]);

  // to handle the transition whenever the note,dialog or interaction change
  useEffect(() => {
    setShowNote(true);
    setTimeout(() => {
      setShowNote(false);
    }, 1000);
  }, [item, type]);

  // story inside next button function for the blocks

  const getData = (next: any) => {
    const currentBlock = parseInt(next?.blockDragSequence.split('.')[1]);
    const NextItem = currentBlock + 1;
    const nextSeq = `${next?.blockDragSequence.split('.')[0]}.${NextItem}`;
    const quest = next?.blockDragSequence.split('.')[0];
    const currentQuest = parseInt(next?.blockDragSequence.split('.')[0]);
    const nextLevel = String(currentQuest + 1);
    const nextBlock = Object.keys(demoBlocks[quest])
      .filter((key) => demoBlocks[quest][key]?.blockDragSequence === nextSeq)
      .map((key) => demoBlocks[quest][key]);
    if (nextBlock.length === 0) {
      setType(demoBlocks['1']['1']?.blockChoosen);
      setData(demoBlocks['1']['1']);
    }
    if (nextBlock[0]?.blockChoosen === 'Interaction') {
      const optionsFiltered = gameData?.questOptions.filter(
        (key: any) => key.qpSequence === nextBlock[0]?.blockPrimarySequence,
      );
      setOptions(optionsFiltered);
    }
    if (type === 'Interaction' && resMsg !== '') setType('response');
    else if ((type === 'Interaction' || type === 'response') && feed !== '')
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
      } else {
        setType(demoBlocks[nextLevel]['1']?.blockChoosen);
        setData(demoBlocks[nextLevel]['1']);
        if (demoBlocks[nextLevel]['1']?.blockChoosen === 'Interaction') {
          const optionsFiltered = gameData?.questOptions.filter(
            (key: any) =>
              key.qpSequence ===
              demoBlocks[nextLevel]['1']?.blockPrimarySequence,
          );
          setOptions(optionsFiltered);
        }
        setSelectedOption(null);
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
  /***
   * @param currentScreenId ->Number
   * @param isInteraction ->Boolean
   * @param
   *
   */
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
    if (reviewTabOptions) {
      const filterTabOptions = tabOptions.filter((tabOption) =>
        reviewTabOptions.includes(tabOption.value),
      );
      setFilteredTabOptions(filterTabOptions);
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
        { value: '1', label: 'Completion' },
        { value: '2', label: 'Leaderboard' },
        { value: '3', label: 'Reflection' },
        { value: '4', label: 'Takeaway' },
        { value: '5', label: 'Welcome' },
        { value: '6', label: 'Thanks' },
      ],
    },
  ];

  useEffect(() => {
    if(reviewInput?.tabId){
      const subOptions= subTabOptionsForTabIds.find((item:any )=> Object.keys(item)[0] == reviewInput?.tabId.toString());      
      setReviewSubTabOptions(subOptions[reviewInput?.tabId.toString()]);
    }
  
  }, [reviewInput]);

  //no need for story
  const handleTabSelection = (selectedOption:any) => {    
    if(selectedOption?.value){
      setReviewInput((prev: Review) => ({
        ...prev,
        tabId: selectedOption?.value ? selectedOption?.value : null,
        tabAttribute: '',
        tabAttributeValue: '',
      }));
      setIsMenuOpen(true);
    }
    else{
      setReviewInput((prev: Review) => ({
        ...prev,
        tabId: selectedOption?.value ? selectedOption?.value : null,
        tabAttribute: '',
        tabAttributeValue: '',
      }));
      setReviewSubTabOptions([]);
    }
    }

  const handleSubTabSelection = (selectedOption:any) => {
      const selectedTabFileds = tabAttributeSets.find((item) => Object.keys(item)[0] == reviewInput?.tabId.toString());
      
      setReviewInput((prev: Review)=> ({...prev, tabAttribute: selectedOption?.value ? selectedTabFileds[reviewInput?.tabId.toString()].tabAttribute : null, tabAttributeValue: selectedOption?.value ? selectedOption?.value: null }));

      // setIsMenuOpen(true);
  }

  const handleMenubtn = (e: React.MouseEvent<HTMLButtonElement>)=>{
      e.stopPropagation();
      setIsMenuOpen(true)
}

const handleReview = (e: any)=>{
setReviewInput((prev: Review)=>({...prev, review: e.target.value}));
}

const hanldeSubmit =(data: any)=>{
  handleSubmitReview(data);
  setIsMenuOpen(false);
}
  console.log("reviewInput", reviewInput);
 
  return (
    <>
      <Box
        w={'100%'}
        h={'100vh'}
        display={currentScreenId === 2 ? 'block' : 'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        position={'relative'}
        overflow={'visible'}
        style={{ perspective: '1000px' }}
      >
        {currentScreenId === 2 ? null : (
          <Img
            src={backgroundScreenUrl}
            w={'100%'}
            h={'100%'}
            alt="background image"
          />
        )}
        <Box
          className={currentScreenId === 2 ? '' : 'Game-Screen'}
          position={currentScreenId === 2 ? 'inherit' : 'absolute'}
          top={0}
          display={currentScreenId === 2 ? 'block' : 'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          w={'100%'}
          h={'100vh'}
        >
          <Box className={currentScreenId === 2 ? '' : 'Images'}>
            {(() => {
              switch (currentScreenId) {
                case 0:
                  return <h1>Game Introduction</h1>;
                case 1:
                  return (
                    <>
                      <Welcome
                        formData={gameInfo?.gameData}
                        imageSrc={Screen5}
                        preview={true}
                      />
                    </>
                  );
                case 2:
                  return (
                    <>
                      <Story
                        data={data}
                        type={type}
                        first={first}
                        handleValidate={handleValidate}
                        showNote={showNote}
                        resMsg={resMsg}
                        feed={feed}
                        getData={getData}
                        options={options}
                        option={selectedOption}
                      />
                    </>
                  );
                case 3:
                  return <h1>Reflection</h1>;
                //     return  <Reflection
                //     preview={true}
                //     formData={gameInfo?.gameData}
                //     imageSrc={RefScreen1}
                //     reflectionQuestions={reflectionQuestions}
                //     reflectionQuestionsdefault={reflectionQuestionsdefault}
                //   />;
                case 4:
                  return (
                    <Box className="LearderBoards" position={'relative'}>
                      <Img
                        src={Screen2}
                        alt="Your Image"
                        className="LearderBoards-Img"
                      />
                    </Box>
                  );
                case 5:
                  return <h1>Thanks Screen</h1>;
                case 6:
                  return <h1>Completion</h1>;
                case 7:
                  return <h1>TakeAway</h1>;
                default:
                  console.log(
                    'game details of the data',
                    gameInfo?.gameData,
                    currentScreenId,
                  );
                  return <h1>Loading Screen </h1>;
              }
            })()}
          </Box>
        </Box>
      </Box>

      <Menu  isOpen={isMenuOpen}>
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
            <SelectField
              mb="10px"
              me="30px"
              id="tab"
              name="tab"
              label="Feedback Options"
              options={filteredTabOptions}
              onChange={ handleTabSelection}
            />
        {reviewInput?.tabId !==null && reviewInput?.tabId !==undefined && reviewSubTabOptions?.length > 0 &&
            <SelectField
              mb="10px"
              me="30px"
              id="subtab"
              name="subtab"
              label="Secondary Options"
              options={reviewSubTabOptions}
              onChange={ handleSubTabSelection}
            />}
            <FormControl>
              <FormLabel fontSize={18} fontWeight={700}>
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
            </FormControl>
            <MenuItem>
              <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
                <Button
                  bg="#11047a"
                  _hover={{ bg: '#190793' }}
                  color="#fff"
                  h={'46px'}
                  w={'128px'}
                  mr={'33px'}
                  mt={'7px'}
                  onClick={()=>hanldeSubmit(reviewInput)}
                >
                  Submit
                </Button>
              </Box>
            </MenuItem>
          </MenuList>
        )}
      </Menu>
    </>
  );
};

const Model: React.FC = () => {
  const groupRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, Sample);

  const mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);

  useFrame((state, delta) => {
    // Rotate the model on the Y-axis
    if (groupRef.current) {
      // groupRef.current.rotation.y += 0.01;
      groupRef.current.castShadow = true;
    }

    mixer.update(delta);
  });
  action.play();

  useLayoutEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
    }
  }, []);

  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.color.set(0xffccaaf0); // Set your desired color
      child.material.roughness = 0.4; // Adjust roughness as needed
      child.material.metalness = 0.8; // Adjust metalness as needed
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export default EntirePreview;
