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
import Screen1 from 'assets/img/screens/screen1.png';
import Replay from 'assets/img/screens/Replay.png';
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
import ThankYou from './playcards/Thankyou';
import Screen6 from 'assets/img/screens/screen6.png';
import Reflection from './playcards/Reflection';
import RefScreen1 from 'assets/img/screens/refscreen1.png';
import Takeway from './playcards/Takeaway';
import Screen4 from 'assets/img/screens/screen4.png';
import Completion from './playcards/Completion';
import ReplayGame from './playcards/ReplayGame';
interface Review {
  // reviewId: Number;
  reviewerId: String | null;
  reviewGameId: String | null;
  review: String | null;
  tabId: Number;
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
const EntirePreview: React.FC<ShowPreviewProps> = ({
  gameScreens,
  currentScreenId,
  setCurrentScreenId,
  gameInfo,
  setToastObj,
  handleSubmitReview,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  
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
  const [review, setReview] = useState<Review>({
    reviewerId: null,
    reviewGameId: null,
    review: '',
    tabId: null,
    tabAttribute: '',
    tabAttributeValue: '',
  });
  const [backgroundScreenUrl, setBackgroundScreenUrl] = useState(null);
  const [demoBlocks,setDemoBlocks] = useState(null);
  useEffect(() => {
    switch (currentScreenId) {
      case 1 && gameInfo?.gameData?.gameWelcomepageBackground:
        setBackgroundScreenUrl(
          'http://192.168.1.29:5555/uploads/background/reflectionBg.png',
        );
        break;
      case 3 && gameInfo?.gameData?.gameReflectionpageBackground:
        setBackgroundScreenUrl(
          'http://192.168.1.29:5555/uploads/background/20252.jpg',
        );
        break;
      default:
        setBackgroundScreenUrl(
          'http://192.168.1.29:5555/uploads/background/41524_1701765021527.jpg',
        );
        break;
    }
  }, [currentScreenId]);

  useEffect(() => {
    console.log('gameInfo',gameInfo);
    setDemoBlocks(gameInfo?.blocks)
    setType(gameInfo?.blocks['1']['1']?.blockChoosen);
    setData(gameInfo?.blocks['1']['1']);
  }, []);


  // to handle the transition whenever the note,dialog or interaction change

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
      setCurrentScreenId(6);
      return false;
    }
    if (nextBlock[0]?.blockChoosen === 'Interaction') {
      const optionsFiltered = gameInfo?.questOptions.filter(
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
      }
      else if (navi === 'Complete') {
        setCurrentScreenId(6)
        return false;
      } 
      else {
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

  //no need for story
  const overOptions = [
    { value: 1, label: 'Background' },
    { value: 2, label: 'Non Playing Character' },
    { value: 3, label: 'Overview' },
    { value: 4, label: 'Story' },
    { value: 5, label: 'Design' },
  ];

  // const withNpc = [
  //   { value: 1, label: 'Background' },
  //   { value: 2, label: 'Non Playing Character' },
  //   {value: 4, label:'story'},
  // ];
  // const withOutNpc = [
  //   { value: 1, label: 'Background' },
  //   { value: 2, label: 'Non Playing Character' },
  //   {value: 4, label:'story'},
  // ];

  //no need for story
  const handleFeed = () => {
    setIsMenuOpen(false);
  };



  return (
    <>
      <Flex height="100vh" className={currentScreenId === 2 ? '' : 'AddScores'}>
        {/* <Box
        w={'100%'}
        h={'100vh'}
        display={currentScreenId === 2 ?'block':'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        position={'relative'}
        overflow={'visible'}
        style={{ perspective: '1000px' }}
      >
        {currentScreenId === 2 ? null :<Img
          src={backgroundScreenUrl}
          w={'100%'}
          h={'100%'}
          alt="background image"
        />}
        <Box
          className={currentScreenId === 2 ?'':"Game-Screen"}
          position={currentScreenId === 2 ?'inherit':'absolute'}
          top={0}
          display={currentScreenId === 2 ?'block':'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          w={'100%'}
          h={'100vh'}
        >
          <Box className={currentScreenId === 2 ?'':'Images'}> */}
        {(() => {
          switch (currentScreenId) {
            case 0:
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
                      backgroundImage={backgroundScreenUrl}
                      w={'100% !important'}
                      h={'100vh'}
                      backgroundRepeat={'no-repeat'}
                      backgroundSize={'cover'}
                      // when you import the component you can remove this property
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      className="Game-Screen"
                    >
                      <Box className="Images">
                        <h1>Game Introduction</h1>
                      </Box>
                    </Box>
                  </Box>
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
                        <Welcome
                          setCurrentScreenId={setCurrentScreenId}
                          formData={gameInfo?.gameData}
                          imageSrc={Screen5}
                          preview={true}
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
                    formData={gameInfo?.gameData}
                      backGroundImg={backgroundScreenUrl}
                      data={data}
                      type={type}
                      // first={first}
                      handleValidate={handleValidate}
                      // showNote={showNote}
                      resMsg={resMsg}
                      feed={feed}
                      getData={getData}
                      options={options}
                      option={selectedOption}
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
                    // display={'flex'}
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
                        <Reflection
                          // preview={true}
                          formData={gameInfo?.gameData}
                          imageSrc={RefScreen1}
                          // reflectionQuestions={reflectionQuestions}
                          // reflectionQuestionsdefault={reflectionQuestionsdefault}
                        />
                      </Box>
                    </Box>
                  </Box>
                </>
              );
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
                          setCurrentScreenId={setCurrentScreenId}
                          formData={gameInfo?.gameData}
                          imageSrc={Screen1}
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
                        <ReplayGame formData={gameInfo?.gameData} imageSrc={Replay}/>
                      </Box>
                    </Box>
                  </Box>
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
        {/* </Box>
        </Box>
      </Box> */}
      </Flex>
      <Menu closeOnSelect={false}>
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
              {/* {tab === 1
                    ? 'Background'
                    : tab === 2
                    ? 'Non playing Character'
                    : tab === 3
                    ? 'Overview'
                    : tab === 4
                    ? 'story'
                    : tab === 5
                    ? 'Design'
                    : 'Preference'} */}
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
