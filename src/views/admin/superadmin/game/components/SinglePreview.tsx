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

import bk from 'assets/img/games/17.png';
import note from 'assets/img/games/note.png';
import next from 'assets/img/screens/next.png';
import dial from 'assets/img/games/Dialogue.png';
import char from 'assets/img/games/charbox.png';
import right from 'assets/img/games/right.png';
import left from 'assets/img/games/left.png';
import parch from 'assets/img/games/parch.png';
import on from 'assets/img/games/on.png';
import off from 'assets/img/games/off.png';
import Screen6 from '../../../../../assets/img/screens/screen6.png';
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import SelectField from 'components/fields/SelectField';
import TakeAwaysContentScreen from './onimage/TakeAwaysScreen';
import InitialImg from 'assets/img/games/load.jpg';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
// import Sample from '../../../../assets/img/games/Character_sample.glb';
import Sample from 'assets/img/games/Character_sample.glb';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import feedi from 'assets/img/screens/feed.png';
import Screen5 from '../../../../../assets/img/screens/screen5.png';
import { AiFillMessage } from 'react-icons/ai';
import WelcomeContentScreen from './onimage/WelcomeContentScreen';
import Screen1 from '../../../../../assets/img/screens/screen1.png';
import CompletionContentScreen from './onimage/CompletionContentScreen';
import Screen2 from '../../../../../assets/img/screens/screen2.png';
import ReflectionContentScreen from './onimage/ReflectionScreen';
import RefScreen1 from '../../../../../assets/img/screens/refscreen1.png';
import Screen4 from '../../../../../assets/img/screens/screen4.png';
import TyContentScreen from './onimage/TyContentScreen';
import {
  getVoiceMessage,
  getPreview,
  getGameCreatorDemoData,
  getGameById,
} from 'utils/game/gameService';
import { useLocation, useParams } from 'react-router-dom';
import TypingEffect from '../demoplay/playcards/Typing';
import RefBg from 'assets/img/games/refbg.png';
import { API_SERVER } from 'config/constant';

const SinglePreview: React.FC<{
  // prevdata?: any;
  // isOpen?: any;
  // onOpen?: any;
  // onClose?: any;
  // show?: any;
  // tab?: any;
  // formData?: any;
  // currentTab?: any;
  // setSelectedBadge?: any;
  // setFormData?: any;
  // handleChange?: any;
  // setBadge?: any;
  // compliData?: any;
  // setCompliData?: any;
  // CompKeyCount?: any;
  // handlecompletion?: any;
  // selectedBadge?: any;
  // reflectionQuestions?: any;
  // reflectionQuestionsdefault?: any;
  //  / setPrevdata: any;
  // gameInfo?:any;
}> = (
  {
    // prevdata,
    // show,
    // isOpen,
    // onClose,
    // formData,
    // tab,
    // currentTab,
    // selectedBadge,
    // compliData,
    // setCompliData,
    // CompKeyCount,
    // reflectionQuestions,
    // reflectionQuestionsdefault,
    // setPrevdata,
    // gameInfo
  },
) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serializedObject = queryParams.get('data');
  const myObject = JSON.parse(decodeURIComponent(serializedObject));
  const {
    id,
    tab,
    currentTab,
    // prevdata,
    // formData,
    show,
    selectedBadge,
    compliData,
    CompKeyCount,
    reflectionQuestions,
    reflectionQuestionsdefault,
    ...gameIn
  } = myObject;
  const { colorMode, toggleColorMode } = useColorMode();
  const [showFullText, setShowFullText] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const maxTextLength = 80;
  const find =
    show && show.find((it: any) => it.gasId === formData?.gameBackgroundId);
  const img = find && find.gasAssetImage;
  const [option, setOption] = useState(null);
  const [item, setItem] = useState(null);
  const [data, setData] = useState(null);
  const [showNote, setShowNote] = useState(false),
    [first, setFirst] = useState(false);
  const [intOpt, setIntOpt] = useState([]);
  const [type, setType] = useState<string>('');
  const [resMsg, setResMsg] = useState<string>('');
  const [feed, setFeed] = useState<string>('');
  const [navi, setNavi] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [currentAudio, setCurrentAudio] = useState(null);
  const [voiceIds, setVoiceIds] = useState<any>();
  const [allowPointerEvents, setAllowPointerEvents] = useState<boolean>(true);
  // const audioRef = useRef(null);
  const [demoBlocks, setDemoBlocks] = useState(null);
  // const { id } = useParams();
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestNo, setCurrentQuestNo] = useState(1);
  const [gameInfo, setGameInfo] = useState<any | null>();
  const [optionNavigation,setOptionNavigation] = useState(null);
  const [game3Position, setGame3Position] = useState({
    previousBlock: '',
    currentBlock: '',
    nextBlock: '',
  });
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
    const firstBlock = sortBlockSequence(lmsblocks);
    setDemoBlocks(firstBlock);
    setType(firstBlock['1']['1']?.blockChoosen);
    setData(firstBlock['1']['1']);
  };
  useEffect(() => {
    const name = async () => {
      const gamedata = await getGameCreatorDemoData(id);
      if (!gamedata.error && gamedata) {
        updateCreatorGameInfo(gamedata);
      }
      const gameById = await getGameById(id);
      if (gameById?.status !== 'Success')
        return console.log('error:' + gameById?.message);
      setFormData(gameById?.data);
    };
    name();

  }, [id]);
 
  useEffect(() => {
    setShowNote(true);
    setTimeout(() => {
      setShowNote(false);
    }, 1000);
  }, [item, type]);

  const prevData = (current: any) => {
    const currentBlock = current
      ? parseInt(current?.blockPrimarySequence.split('.')[1])
      : null;
    const PrevItem = currentBlock != null ? currentBlock - 1 : null;
    const prevSeq = game3Position.previousBlock !== '' ? game3Position.previousBlock : current
      ? `${current?.blockPrimarySequence.split('.')[0]}.${PrevItem}`
      : '';
    const quest = current ? current?.blockPrimarySequence.split('.')[0] : null;
    const currentQuest = current
      ? parseInt(current?.blockPrimarySequence.split('.')[0])
      : null;

    setCurrentQuestNo(currentQuest);

    const prevLevel = currentQuest != null ? String(currentQuest + 1) : null;
    const prevBlock = current
      ? Object.keys(demoBlocks[quest] || {})
          .filter(
            (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === prevSeq,
          )
          .map((key: any) => demoBlocks[quest]?.[key])
      : [];
    if (
      prevBlock.length !== 0 &&
      prevBlock[0]?.blockChoosen !== 'Interaction'
    ) {
      setType(prevBlock[0]?.blockChoosen);
      setData(prevBlock[0]);
    }
  };
  const getData = (next: any) => {
    const currentBlock = next
      ? parseInt(next?.blockPrimarySequence.split('.')[1])
      : null;
    const NextItem = currentBlock != null ? currentBlock + 1 : null;
    const PreviousItem = currentBlock != null ? currentBlock - 1 : null;
    const previousSeq = next
      ? `${next?.blockPrimarySequence.split('.')[0]}.${PreviousItem}`
      : '';
    const nextSeq = next
      ? `${next?.blockPrimarySequence.split('.')[0]}.${NextItem}`
      : '';
    const quest = next ? next?.blockPrimarySequence.split('.')[0] : null;
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
      const optionsFiltered = gameInfo?.questOptions.filter(
        (key: any) => key?.qpSequence === nextBlock[0]?.blockPrimarySequence,
      );
      if (gameInfo?.gameData?.gameShuffle) {
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
    if (
      type === 'Interaction' &&
      resMsg !== '' &&
      gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Each'
    ) {
      setType('response');
      return false;
    } else if (
      (type === 'Interaction' || type === 'response') &&
      feed !== '' &&
      gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Each'
    ) {
      setType('feedback');
      return false;
    } else if (
      type === 'Interaction' ||
      type === 'response' ||
      type === 'feedback'
    ) {
      if (navi === 'Repeat Question') {
        setType('Interaction');
        setSelectedOption(null);
        return false;
      } else if (navi === 'New Block') {
        setType(nextBlock[0]?.blockChoosen);
        setData(nextBlock[0]);
        setSelectedOption(null);
        return false;
      } else if (navi === 'Replay Point') {
        setType(demoBlocks['1']['1']?.blockChoosen);
        setData(demoBlocks['1']['1']);
        setSelectedOption(null);
        return false;
      } else if (navi === 'Select Block') {
        const selectedNext = Object.keys(demoBlocks[currentQuest])
        .filter((item: any) => {
          return (
            demoBlocks[currentQuest][item].blockSecondaryId ===
            parseInt(optionNavigation)
          );
        })
        .map((item: any) => {
          return demoBlocks[currentQuest][item];
        });
        setType(selectedNext && selectedNext[0].blockChoosen);
        setData(selectedNext && selectedNext[0]);
        console.log(selectedNext);
        setGame3Position((prev:any)=>({...prev,nextBlock: selectedNext[0].blockPrimarySequence}))
      setSelectedOption(null);
      return false;
      } else if (navi === 'Complete') {
        setType(demoBlocks['1']['1']?.blockChoosen);
        setData(demoBlocks['1']['1']);
        setSelectedOption(null);
        return false;
      } else {
        setType(nextBlock[0]?.blockChoosen);
        setData(nextBlock[0]);
        setSelectedOption(null);
        return false;
      }
    }
    if (nextBlock.length === 0) {
      setType(demoBlocks['1']['1']?.blockChoosen);
      setData(demoBlocks['1']['1']);
      setSelectedOption(null);
      return false;
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
        const selectedNext = Object.keys(demoBlocks[currentQuest])
          .filter((item: any) => {
            return (
              demoBlocks[currentQuest][item].blockSecondaryId ===
              parseInt(next?.blockLeadTo)
            );
          })
          .map((item: any) => {
            return demoBlocks[currentQuest][item];
          });
          setType(selectedNext && selectedNext[0].blockChoosen);
          setData(selectedNext && selectedNext[0]);
          setGame3Position((prev:any)=>({...prev,nextBlock: selectedNext[0].blockPrimarySequence}))
        setSelectedOption(null);
        return false;
      } else if (next?.blockShowNavigate === 'Complete') {
        // setCurrentScreenId(6);
        setType(demoBlocks['1']['1']?.blockChoosen);
        setData(demoBlocks['1']['1']);
        setSelectedOption(null);
        return false;
      }
    }
    setType(nextBlock[0]?.blockChoosen);
    setData(nextBlock[0]);
    setSelectedOption(null);
  };

  const handleValidate = (item: any, ind: number) => {
    setResMsg(item?.qpResponse);
    setFeed(item?.qpFeedback);
    setNavi(item?.qpNavigateShow);
    setOptionNavigation(item?.qpNextOption)
    setSelectedOption(ind === selectedOption ? null : ind);

  };

  const handlePreviewPanelClose = () => {
    setResMsg('');
    setFeed('');
    setNavi('');
    setOption(null);
    // setCurrentAudio('');
    // setAllowPointerEvents(true);
    // onClose();
  };

  return (
    <Modal isOpen={true} onClose={handlePreviewPanelClose} size="full">
      <ModalOverlay />
      <ModalContent backgroundColor="rgba(0, 0, 0, 0.9)">
        <ModalCloseButton
          zIndex={99999999999}
          color={'white'}
          // onClick={handlePreviewPanelClose}
        />
        {/*<ModalBody p={0} pointerEvents={allowPointerEvents? null : 'none'}>*/}
        <ModalBody p={0}>
          <Flex height="100vh" className="AddScores">
            {tab === 3 && (
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
                    backgroundImage={img}
                    w={'100% !important'}
                    h={'100vh'}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'cover'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    className="Game-Screen"
                  >
                    <Box className="Images">
                      <WelcomeContentScreen
                        formData={formData}
                        imageSrc={Screen5}
                        preview={true}
                      />
                    </Box>
                  </Box>
                </Box>
              </>
            )}
            {tab === 4 && data && type === 'Note' && (
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
                  color={'rgba(0, 0, 0, 0.5)'}
                  backgroundImage={img}
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
                    // left={0}
                    right={'0px'}
                    bottom={0}
                    zIndex={999}
                    w={'300px'}
                  >
                    {/* <Canvas
                camera={{ position: [3, 3, 10] }}
                
              >
                <directionalLight
                  position={[5, 5, 5]}
                  intensity={0.8}
                  color={0xffccaa}
                  castShadow
                />
                <ambientLight intensity={5.5} />
                <pointLight
                  position={[5, 5, 5]}
                  color={0xff0000}
                  intensity={1}
                />
              
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -5, 0]}
                  receiveShadow
                >
                  <planeGeometry args={[100, 100]} />
                  <shadowMaterial opacity={0.5} />
                </mesh>
              </Canvas> */}
                  </Box>
                </Box>
                {/* <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          > */}
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
                  <Img w={'100%'} h={'80vh'} src={note} />
                  <Box
                    position={'fixed'}
                    overflowY={'scroll'}
                    transform={'translate(0px, 45px)'}
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
                      fontFamily: 'AtlantisContent',
                      lineHeight: 1,
                    }}
                  >
                    <Box
                      w={'100%'}
                      overflowY={'scroll'}
                      h={'100px'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      mt={'20px'}
                    >
                      {data?.blockText}
                    </Box>
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
                {/* </motion.div> */}
              </Box>
            )}
            {tab === 4 && data && type === 'Dialog' && (
              <Box
                w={'100%'}
                h={'100vh'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
              >
                <Img
                  src={img}
                  maxW={'100%'}
                  maxH={'100%'}
                  w={'100%'}
                  h={'100vh'}
                  transform={'scale(1.3}) translateY(-10%) translateX(-10%)'}
                  transition={'transform 0.9s ease-in-out'}
                />
                <Img
                  style={{
                    transform: `translateY(${showNote ? 200 : 0}px)`,
                    transition:
                      'transform 0.3s ease-in-out, translateY 0.3s ease-in-out',
                  }}
                  position={'fixed'}
                  maxW={'100%'}
                  maxH={'100%'}
                  w={'100%'}
                  h={'240px'}
                  bottom={'0'}
                  src={dial}
                />
                {!showNote && (
                  <>
                    <Box position={'relative'}>
                      <Img
                        src={char}
                        position={'fixed'}
                        h={'70px'}
                        w={'25%'}
                        left={'13%'}
                        bottom={'150px'}
                      />
                      <Text
                        position={'fixed'}
                        left={'24%'}
                        bottom={'167px'}
                        fontSize={'25'}
                        fontWeight={700}
                        textAlign={'center'}
                        fontFamily={'AtlantisText'}
                      >
                        {data.blockRoll === 'Narrator'
                          ? data.blockRoll
                          : formData.gameNonPlayerName}
                      </Text>
                    </Box>
                    <Box
                      display={'flex'}
                      position={'fixed'}
                      justifyContent={'space-between'}
                      w={'75%'}
                      bottom={'55px'}
                      fontFamily={'AtlantisContent'}
                      fontSize={'21px'}
                    >
                      <TypingEffect text={data?.blockText} speed={50} />
                    </Box>
                    <Box
                      display={'flex'}
                      position={'fixed'}
                      justifyContent={'space-between'}
                      w={'80%'}
                      bottom={'0'}
                    >
                      <Img
                        src={left}
                        w={'50px'}
                        h={'50px'}
                        cursor={'pointer'}
                        onClick={() => prevData(data)}
                      />
                      <Img
                        src={right}
                        w={'50px'}
                        h={'50px'}
                        cursor={'pointer'}
                        onClick={() => getData(data)}
                      />
                    </Box>
                  </>
                )}
              </Box>
            )}
            {tab === 4 && data && type === 'Interaction' && (
              <Box
                w={'100%'}
                h={'100vh'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
              >
                <Img
                  src={img}
                  maxW={'100%'}
                  maxH={'100%'}
                  w={'100%'}
                  h={'100vh'}
                  transform={`scale(1.5}) translateY(-10%) translateX(${
                    showNote ? -200 : 0
                  }px)`}
                  transition={'transform 0.9s ease-in-out'}
                />
                <Box
                  style={{
                    transform: `translateX(${
                      showNote ? -200 : 0
                    }px) scale(1.2)`,
                    transition:
                      'transform 0.3s ease-in-out, translateY 0.3s ease-in-out',
                  }}
                  backgroundImage={parch}
                  position={'fixed'}
                  w={{ sm: '350px', md: '500px' }}
                  h={{ sm: '50vh', md: ' 550px' }}
                  // top={'4vh'}
                  left={{ sm: '60px', md: '180px' }}
                  backgroundSize={'contain'}
                  backgroundRepeat={'no-repeat'}
                >
                  <Box
                    textAlign={'center'}
                    h={'100px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    fontWeight={700}
                    fontFamily={'AtlantisText'}
                    lineHeight={1}
                    w={'100%'}
                  >
                    <Box w={'50%'} fontSize={'21px'}>
                      Here You Can Answer the Interactions...!{' '}
                    </Box>
                  </Box>
                  <Box
                    textAlign={'center'}
                    h={'100px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    fontWeight={500}
                    fontFamily={'AtlantisText'}
                    lineHeight={1}
                    w={'96%'}
                    overflowY={'scroll'}
                  >
                    <Box w={'60%'} fontSize={'20px'} letterSpacing={1}>
                      {data?.blockText}
                    </Box>
                  </Box>
                  <Box
                    mt={'10px'}
                    w={{ sm: '200px', md: '400px' }}
                    fontWeight={500}
                    ml={'17%'}
                    h={'220px'}
                    overflowY={'scroll'}
                  >
                    {options &&
                      options.map((item: any, ind: number) => (
                        <Box
                          mb={'10px'}
                          w={'80%'}
                          lineHeight={1}
                          key={ind}
                          color={selectedOption === ind ? 'purple' : ''}
                          textAlign={'center'}
                          cursor={'pointer'}
                          onClick={() => handleValidate(item, ind)}
                          fontFamily={'AtlantisText'}
                          fontSize={'20px'}
                        >
                          <Img
                            src={selectedOption === ind ? on : off}
                            h={'30px'}
                            w={'95%'}
                          />
                          {item?.qpOptionText}
                        </Box>
                      ))}
                  </Box>
                  <Box
                    display={'flex'}
                    position={'fixed'}
                    justifyContent={'space-between'}
                    w={'508px'}
                    left={'-10px'}
                  >
                    <Img
                      src={left}
                      w={'50px'}
                      h={'50px'}
                      cursor={'pointer'}
                      onClick={() => prevData(data)}
                    />
                    {selectedOption !== null && (
                      <Img
                        src={right}
                        w={'50px'}
                        h={'50px'}
                        cursor={'pointer'}
                        onClick={() => getData(data)}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            )}
            {tab === 4 && data && type === 'response' && (
              <Box
                w={'100%'}
                h={'100vh'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
              >
                <Img
                  src={img}
                  maxW={'100%'}
                  maxH={'100%'}
                  w={'100%'}
                  h={'100vh'}
                  transform={'scale(1.3}) translateY(-10%) translateX(-10%)'}
                  transition={'transform 0.9s ease-in-out'}
                />
                <Img
                  style={{
                    transform: `translateY(${showNote ? 200 : 0}px)`,
                    transition:
                      'transform 0.3s ease-in-out, translateY 0.3s ease-in-out',
                  }}
                  position={'fixed'}
                  maxW={'100%'}
                  maxH={'100%'}
                  w={'100%'}
                  h={'240px'}
                  bottom={'0'}
                  src={dial}
                />
                {!showNote && (
                  <>
                    <Box position={'relative'}>
                      <Img
                        src={char}
                        position={'fixed'}
                        h={'70px'}
                        w={'25%'}
                        left={'13%'}
                        bottom={'150px'}
                      />
                      <Text
                        position={'fixed'}
                        left={'24%'}
                        bottom={'167px'}
                        fontSize={'25'}
                        fontWeight={700}
                        textAlign={'center'}
                        fontFamily={'AtlantisText'}
                      >
                        {data.blockRoll === 'Narrator'
                          ? data.blockRoll
                          : formData.gameNonPlayerName}
                      </Text>
                    </Box>
                    <Box
                      display={'flex'}
                      position={'fixed'}
                      justifyContent={'space-between'}
                      w={'75%'}
                      bottom={'55px'}
                      fontFamily={'AtlantisContent'}
                      fontSize={'21px'}
                    >
                      <TypingEffect text={resMsg} speed={50} />
                    </Box>
                    <Box
                      display={'flex'}
                      position={'fixed'}
                      justifyContent={'flex-end'}
                      w={'80%'}
                      bottom={'0'}
                    >
                      {/* <Img
                        src={left}
                        w={'50px'}
                        h={'50px'}
                        cursor={'pointer'}
                      /> */}
                      <Img
                        src={right}
                        w={'50px'}
                        h={'50px'}
                        cursor={'pointer'}
                        onClick={() => getData(data)}
                      />
                    </Box>
                  </>
                )}
              </Box>
              // <Box
              //   w={'100%'}
              //   h={'100vh'}
              //   display={'flex'}
              //   alignItems={'center'}
              //   justifyContent={'center'}
              //   position={'relative'}
              // >
              //   <Img
              //     src={backGroundImg}
              //     maxW={'100%'}
              //     maxH={'100%'}
              //     w={'100%'}
              //     h={'100vh'}
              //     transform={'scale(1.3}) translateY(-10%) translateX(-10%)'}
              //     transition={'transform 0.9s ease-in-out'}
              //   />
              //   <Img
              //     style={{
              //       transform: `translateY(${showNote ? 200 : 0}px)`,
              //       transition:
              //         'transform 0.3s ease-in-out, translateY 0.3s ease-in-out',
              //     }}
              //     position={'fixed'}
              //     maxW={'100%'}
              //     maxH={'100%'}
              //     w={'100%'}
              //     h={'240px'}
              //     bottom={'0'}
              //     src={dial}
              //   />
              //   {!showNote && (
              //     <>
              //       <Box
              //         backgroundImage={char}
              //         position={'fixed'}
              //         h={'70px'}
              //         w={'25%'}
              //         left={'13%'}
              //         fontSize={'25'}
              //         display={'flex'}
              //         alignItems={'center'}
              //         justifyContent={'center'}
              //         fontWeight={700}
              //         textAlign={'center'}
              //         bottom={'150px'}
              //         backgroundRepeat={'no-repeat'}
              //         backgroundSize={'contain'}
              //         fontFamily={'albuma'}
              //       >
              //         Logan
              //         {/* {data.character === '999999'
              //             ? 'Player'
              //             : data.character === '99999'
              //             ? 'Narrator'
              //             : formData.gameNonPlayerName} */}
              //       </Box>
              //       <Box
              //         display={'flex'}
              //         position={'fixed'}
              //         justifyContent={'space-between'}
              //         w={'75%'}
              //         bottom={'55px'}
              //         fontFamily={'cont'}
              //       >
              //         {resMsg}
              //       </Box>
              //       <Box
              //         display={'flex'}
              //         position={'fixed'}
              //         justifyContent={'space-between'}
              //         w={'80%'}
              //         bottom={'0'}
              //       >
              //         <Img src={left} w={'50px'} h={'50px'} cursor={'pointer'} />
              //         <Img
              //           src={right}
              //           w={'50px'}
              //           h={'50px'}
              //           cursor={'pointer'}
              //           onClick={() => getData(data)}
              //         />
              //       </Box>
              //     </>
              //   )}
              // </Box>
            )}
            {tab === 4 && data && type === 'feedback' && (
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
                  backgroundImage={img}
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
                  >
                    {/* <Canvas
                camera={{ position: [3, 3, 10] }}
                
              >
                <directionalLight
                  position={[5, 5, 5]}
                  intensity={0.8}
                  color={0xffccaa}
                  castShadow
                />
                <ambientLight intensity={5.5} />
                <pointLight
                  position={[5, 5, 5]}
                  color={0xff0000}
                  intensity={1}
                />
              
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -5, 0]}
                  receiveShadow
                >
                  <planeGeometry args={[100, 100]} />
                  <shadowMaterial opacity={0.5} />
                </mesh>
              </Canvas> */}
                  </Box>
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
                  <Img w={'90%'} h={'80vh'} src={feedi} />
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
                      transform={'translate(0px, 100px)'}
                    >
                      <Img src={next} w={'200px'} h={'60px'} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {tab === 5 && currentTab === 0 && (
              <Box
                w={'100%'}
                h={'100vh'}
                // display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
                overflow={'visible'}
                style={{ perspective: '1000px' }}
                className="Main-Content"
              >
                <Box
                  backgroundImage={img}
                  w={'100% !important'}
                  h={'100vh'}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'cover'}
                  // transform={`scale(${first ? 1 : 1.3}) translateY(${
                  //   first ? 0 : -10
                  // }%) translateX(${first ? 0 : -10}%)`}
                  // transition={'transform 0.9s ease-in-out'}
                  // display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  className="Game-Screen"
                >
                  <Box className="Images">
                    <CompletionContentScreen
                      preview={true}
                      selectedBadge={selectedBadge}
                      formData={formData}
                      imageSrc={Screen1}
                      compliData={compliData}
                      // setCompliData={setCompliData}
                      CompKeyCount={CompKeyCount}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {tab === 5 && currentTab === 1 && (
              <Box
                w={'100%'}
                h={'100vh'}
                // display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
                overflow={'visible'}
                style={{ perspective: '1000px' }}
                className="Main-Content"
              >
                <Box
                  backgroundImage={img}
                  w={'100% !important'}
                  h={'100vh'}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'cover'}
                  // transform={`scale(${first ? 1 : 1.3}) translateY(${
                  //   first ? 0 : -10
                  // }%) translateX(${first ? 0 : -10}%)`}
                  // transition={'transform 0.9s ease-in-out'}
                  // display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  className="Game-Screen"
                >
                  <Box className="Images">
                    <Box className="LearderBoards">
                      <Img
                        src={Screen2}
                        alt="Your Image"
                        className="LearderBoards-Img"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {tab === 5 && currentTab === 2 && (
              <Box
                w={'100%'}
                h={'100vh'}
                // display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
                overflow={'visible'}
                style={{ perspective: '1000px' }}
                className="Main-Content"
              >
                <Box
                  backgroundImage={RefBg}
                  w={'100% !important'}
                  h={'100vh'}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'cover'}
                  // transform={`scale(${first ? 1 : 1.3}) translateY(${
                  //   first ? 0 : -10
                  // }%) translateX(${first ? 0 : -10}%)`}
                  // transition={'transform 0.9s ease-in-out'}
                  // display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  className="Game-Screen"
                >
                  <Box className="Images">
                    <ReflectionContentScreen
                      preview={true}
                      formData={formData}
                      imageSrc={RefScreen1}
                      reflectionQuestions={reflectionQuestions}
                      reflectionQuestionsdefault={reflectionQuestionsdefault}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {tab === 5 && currentTab === 3 && (
              <Box
                w={'100%'}
                h={'100vh'}
                // display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
                overflow={'visible'}
                style={{ perspective: '1000px' }}
                className="Main-Content"
              >
                <Box
                  backgroundImage={img}
                  w={'100% !important'}
                  h={'100vh'}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'cover'}
                  // transform={`scale(${first ? 1 : 1.3}) translateY(${
                  //   first ? 0 : -10
                  // }%) translateX(${first ? 0 : -10}%)`}
                  // transition={'transform 0.9s ease-in-out'}
                  // display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  className="Game-Screen"
                >
                  <Box className="Images">
                    <TakeAwaysContentScreen
                      preview={true}
                      formData={formData}
                      imageSrc={Screen4}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {tab === 5 && currentTab === 4 && (
              <>
                <Box
                  w={'100%'}
                  h={'100vh'}
                  // display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  position={'relative'}
                  overflow={'visible'}
                  style={{ perspective: '1000px' }}
                  className="Main-Content"
                >
                  <Box
                    backgroundImage={img}
                    w={'100% !important'}
                    h={'100vh'}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'cover'}
                    // transform={`scale(${first ? 1 : 1.3}) translateY(${
                    //   first ? 0 : -10
                    // }%) translateX(${first ? 0 : -10}%)`}
                    // transition={'transform 0.9s ease-in-out'}
                    // display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    className="Game-Screen"
                  >
                    <Box className="Images">
                      <WelcomeContentScreen
                        formData={formData}
                        imageSrc={Screen5}
                        preview={true}
                      />
                    </Box>
                  </Box>
                </Box>
              </>
            )}
            {tab === 5 && currentTab === 5 && (
              <Box
                w={'100%'}
                h={'100vh'}
                // display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
                overflow={'visible'}
                style={{ perspective: '1000px' }}
                className="Main-Content"
              >
                <Box
                  backgroundImage={img}
                  w={'100% !important'}
                  h={'100vh'}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'cover'}
                  // transform={`scale(${first ? 1 : 1.3}) translateY(${
                  //   first ? 0 : -10
                  // }%) translateX(${first ? 0 : -10}%)`}
                  // transition={'transform 0.9s ease-in-out'}
                  // display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  className="Game-Screen"
                >
                  <Box className="Images">
                    <TyContentScreen
                      formData={formData}
                      imageSrc={Screen6}
                      preview={true}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {/* {currentAudio && (
              <audio ref={audioRef} controls style={{ display: 'none' }}>
                <source src={currentAudio} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            )} */}
          </Flex>
          {/* <Menu closeOnSelect={false}>
            <MenuButton
              p="0px"
              bg={'brandScheme'}
              position={'fixed'}
              bottom={'0'}
              right={'5px'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            >
              <SelectField
                mb="10px"
                me="30px"
                id="gameIntroMusic"
                name="gameIntroMusic"
                label="Feedback Options"
                options={overOptions}
                onChange={handleFeed}
              />
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
                  >
                    Submit
                  </Button>
                </Box>
              </MenuItem>
            </MenuList>
          </Menu> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Model: React.FC = () => {
  const groupRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, Sample);

  const mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);

  useFrame((state, delta) => {
    if (groupRef.current) {
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

export default SinglePreview;
