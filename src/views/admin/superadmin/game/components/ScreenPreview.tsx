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
  useCallback,
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
// import WelcomeContentScreen from './onimage/WelcomeContentScreen';
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
} from 'utils/game/gameService';
import { useParams } from 'react-router-dom';
import TypingEffect from '../demoplay/playcards/Typing';
import RefBg from 'assets/img/games/refbg.png';
import { API_SERVER } from 'config/constant';
import useImagePreloader from 'utils/hooks/useImagePreLoader';
import {assetImageSrc} from 'utils/hooks/imageSrc';
import { lazy } from "react";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import {preloadedImages} from "utils/hooks/function"
import { FaLeaf } from 'react-icons/fa';
const WelcomeContentScreen = React.lazy(() => import("./onimage/WelcomeContentScreen"));

const ScreenPreview = () => {
  const { gameId : id, currentTab : currentTab, currentSubTab : currentSubTab, currentQuest: currentQuest } = useSelector((state : RootState)=> state.preview);

  const [gameInfo, setGameInfo] = useState<any>();
  const [questSequence, setQuestSequence] = useState<any>();
  const [bgImg, setBgImg] = useState<string>();
  const [contentReady, setContentReady] = useState<boolean>(false);
  const [apiImageSet, setApiImageSet] =useState<any>();
  const [localStorageData, setLocalStorageData] = useState(null);
  const [staticAssetImageUrls, setStaticAssetImageUrls] = useState<any>(null);
  const [apiUrlAssetImageUrls, setApiUrlAssetImageUrls] = useState<any>(null); //preloaded image url
  const [preloadAssets, setPreloadAssets] = useState<any>(); 
  
  useEffect(()=>{
    const fetchData = async () => {
      const resolvedResult : any = await preloadedImages(assetImageSrc);
      setStaticAssetImageUrls(resolvedResult);
    };
    
    fetchData();
  },[])

  const fetchDataFromApi = async () => {
    try {
      const gamedata = await getGameCreatorDemoData(id);
      if (!gamedata.error && gamedata) {
        const {
          gameview,
          image,
          lmsblocks,
          lmsquestionsoptions,
          gameQuest,
          ...gameData
        } = gamedata?.result;
        const sortBlockSequence = (blockArray: []) => {
          const transformedArray = blockArray.reduce(
            (result: any, obj: any) => {
              const groupKey = obj?.blockQuestNo.toString();
              const seqKey = obj?.blockPrimarySequence
                .toString()
                ?.split('.')[1];
              if (!result[groupKey]) {
                result[groupKey] = {};
              }
              result[groupKey][seqKey] = obj;
              return result;
            },
            {},
          );
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
            gameMinimumScoreCongratsMessage:
              qst.gameMinimumScoreCongratsMessage,
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
          gameId: id,
          gameData: gameData,
          gameHistory: gameview,
          assets: image,
          blocks: sortBlockSequence(lmsblocks),
          gameQuest: gameQuest, //used for completion screen
          completionQuestOptions: completionOptions,
          questOptions: lmsquestionsoptions,
          reflectionQuestions: gamedata?.resultReflection,
          gamePlayers: gamedata?.assets?.playerCharectorsUrl,
          bgMusic:
            gamedata?.assets?.bgMusicUrl &&
            API_SERVER + '/' + gamedata?.assets?.bgMusicUrl,
          gameNonPlayerUrl:
            gamedata?.assets?.npcUrl &&
            API_SERVER + '/' + gamedata?.assets?.npcUrl,
            badges: await gamedata?.assets?.badges?.map((path:string)=> (API_SERVER + '/' + path))
        });
        const apiImageSetArr: any=[
        {assetType: 'backgroundImage', src: image?.gasAssetImage},
        {assetType: 'nonplayerImage', src : API_SERVER + '/' +gamedata?.assets?.npcUrl},
       ]
       
       let playerCharectorsUrls = gamedata?.assets?.playerCharectorsUrl.map((item:any, index:number)=>{
          let objValue = API_SERVER + '/' +item;
          let objKey =`playerCharacterImage_${index}`;
            apiImageSetArr.push({assetType: [objKey], src: objValue});
          });
          let gameQuestBadges =await Promise.all(gamedata?.assets?.badges.map( async(item: Record<string, string>)=>{
            Object.entries(item).forEach(([key, value])=>{
            let objkeyValue = key.split('_')[1];
            let objKey =`Quest_${objkeyValue}`;
            let objKeyValue = API_SERVER + '/' + value;
            apiImageSetArr.push({assetType: [objKey], src: objKeyValue});
          })
          setApiImageSet(apiImageSetArr);
          return true;
        }));

        // const { imagesPromiseList, imagesPreloaded } = useImagePreloader(apiImageSet);
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
   // Call the fetchDataFromApi function whenever currentTab, currentSubTab, or id changes
  useEffect(() => {
    if(id){
      fetchDataFromApi();
    }
    console.log("id", id)
    console.log("currentTab", currentTab)
    console.log("currentSubTab", currentSubTab)
    console.log("currentQuest",currentQuest)
  }, [id, currentTab, currentSubTab, currentQuest]);

  
  
  useEffect(()=>{
    const fetchData = async () => {
      const resolvedResult : any = await preloadedImages(apiImageSet);
      setApiUrlAssetImageUrls(resolvedResult);
    };
    apiImageSet && fetchData();
  },[apiImageSet])


useEffect(()=>{
  if(apiUrlAssetImageUrls && staticAssetImageUrls){
    console.log('apiUrlAssetImageUrls',apiUrlAssetImageUrls)
    console.log('staticAssetImageUrls',staticAssetImageUrls)
    setContentReady(true);
    setPreloadAssets({...apiUrlAssetImageUrls, ...staticAssetImageUrls});
  }
},[apiUrlAssetImageUrls, staticAssetImageUrls])


  useEffect(() => {
    if (gameInfo) {
      const QuestCount = gameInfo.completionQuestOptions.length;
      const backgroundImageUrl = gameInfo.assets?.gasAssetImage;

      /**set background image */
      currentTab == 5
        ? QuestCount > 0
          ? QuestCount + 2 == currentSubTab &&
            setBgImg(`${API_SERVER}/uploads/background/previewrefscreen.png`)
          : setBgImg(backgroundImageUrl)
        : setBgImg(backgroundImageUrl); 
      }

  }, [gameInfo]);


  return (
    <Box id="container">
      <motion.div initial={{ opacity: 0, background: '#000' }} animate={{ opacity: 1, background: '#0000' }} transition={{ duration: 0.5, delay: 0.5 }} >
    
    { contentReady && 
      <Suspense fallback=
          {<div>Component1 are loading please wait...</div>}>
      
            <Box  h={'100vh !important'} className="Images">
              <Flex height="100vh" className="AddScores">
                {currentTab == 3 && (
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
                        backgroundImage={preloadAssets.left?.src}
                        w={'100% !important'}
                        h={'100vh'}
                        backgroundRepeat={'no-repeat'}
                        backgroundSize={'cover'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        className="Game-Screen"
                      >
                        <Box className="Images">
                        {gameInfo &&

                          <WelcomeContentScreen
                            formData={gameInfo.gameData}
                            imageSrc={preloadAssets?.Screen5?.src}
                            preview={true}
                          />}
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
    
              </Flex>
            </Box>
        </Suspense>
      }
       </motion.div>
        </Box>
        );
};
export default ScreenPreview;
