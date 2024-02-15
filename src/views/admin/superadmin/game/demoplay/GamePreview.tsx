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
  useToast,
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
  useMemo,
  useRef,
  useState,
} from 'react';

// import ModelViewer from "../three/ModelViewer";
import { json, useParams } from 'react-router-dom';
import { getGameDemoData, SubmitReview } from 'utils/game/gameService';
// import NoAuth from './NoAuth';
// import NoAuth from './NoAuth';
import EntirePreview from './EntirePreview';
import { API_SERVER } from 'config/constant';

// const gameScreens = ['GameIntro','Welcome','Story','Reflection',"Leaderboard", "ThanksScreen", "Completion","TakeAway"];
const gameScreens = [
  'Completion',
  'Leaderboard',
  'Reflection',
  'TakeAway',
  'Welcome',
  'ThanksScreen',
];
// const gameScreens = ['GameIntro', "4": 'Welcome', "2": 'Reflection',"1": "Leaderboard", "" : "5": "ThanksScreen", "0": "Completion","3": "TakeAway"];

// const Tab5attribute = [{'attribute': 0,"currentScreenName": "Completion", "currentScreenId": 6} ];
// const Tab5attribute = [6, 4,3, 7, 1,5 ];

const GamePreview = () => {
  const { uuid } = useParams();
  const [gameInfo, setGameInfo] = useState<any | null>();
  const [currentScreenId, setCurrentScreenId] = useState<number>(0);
  const toast = useToast();
  // const [toastObj, setToastObj] = useState<any>();

  useEffect(() => {
    uuid && fetchGameData();
  }, [uuid]);

  // useEffect(() => {
  //   setTimeout(()=>{
  //     setCurrentScreenId(1);
  //   },3000)
  // }, []);

  /*** Collect details of a game based on uuid not gameId
   * This API took gameId based on uuid
   */
  const fetchGameData = async () => {
    const gamedata = await getGameDemoData(uuid);

    if (!gamedata.error && gamedata) {
      updateGameInfo(gamedata);
    }
  };

  /** THis function used to update gameInfo state on initial render and after every submition of a review
   *
   * Should update game info after update, delete, new review submition using this function updateGameInfo
   */
  const updateGameInfo = (info: any) => {
    const {
      gameReviewerId,
      creatorId,
      emailId,
      activeStatus,
      reviews,
      ReviewingCreator,
    } = info?.result?.lmsgamereviewer;
    const { gameview, image, lmsblocks, lmsquestionsoptions, ...gameData } =
      info?.result?.lmsgame;
    const sortBlockSequence = (blockArray: []) => {
      const transformedArray = blockArray.reduce((result: any, obj: any) => {
        const groupKey = obj?.blockQuestNo.toString();
        const seqKey = obj?.blockSecondaryId;
        if (!result[groupKey]) {
          result[groupKey] = {};
        }
        result[groupKey][seqKey] = obj;
        return result;
      }, {});
      return transformedArray;
    };
    setGameInfo({
      gameId: info?.result?.gameId,
      gameData: gameData,
      reviewer: {
        ReviewerId: gameReviewerId,
        ReviewerName:
          ReviewingCreator === null ? null : ReviewingCreator?.ctName,
        ReviewerEmailId: emailId,
        ReviewerGender: ReviewingCreator ? ReviewingCreator?.ctGender : null,
        ReviewerStatus: activeStatus,
        ReviewerDeleteStatus: ReviewingCreator
          ? ReviewingCreator?.ctDeleteStatus
          : null,
      },
      reviews: reviews,
      gameHistory: gameview,
      assets: image,
      blocks: sortBlockSequence(lmsblocks),
      questOptions: lmsquestionsoptions,
      reflectionQuestions: info?.resultReflection,
      gamePlayers: info?.assets?.playerCharectorsUrl,
      bgMusic: API_SERVER+"/"+info?.assets?.bgMusicUrl,
      gameNonPlayerUrl: API_SERVER+"/"+info?.assets?.npcUrl,
    });
  };
  
  const element = document.getElementById('container');
  if (element) {
    try {
      if (document.fullscreenEnabled) { // Check if fullscreen is supported
        if (!document.fullscreenElement) { // Check if not already in fullscreen
          // Request fullscreen
          element.requestFullscreen()
            .then(() => {
              console.log('Entered fullscreen mode');
              // Perform additional actions after entering fullscreen mode
            })
            .catch((error) => {
              console.error('Error entering fullscreen mode:', error);
              // Handle errors related to entering fullscreen mode
            });
        } else {
          console.warn('Document is already in fullscreen mode');
          // Handle scenario where document is already in fullscreen mode
        }
      } else {
        console.error('Fullscreen mode is not supported');
        // Handle scenario where fullscreen mode is not supported by the browser
      }
    } catch (error) {
      console.error('Error requesting fullscreen:', error);
      // Handle other errors related to requesting fullscreen mode
    }
  }
  const handleSubmitReview = async (inputdata: any) => {
    /** Sample post data
   * {"data" :{
    "reviewerId": 4,
    "reviewGameId": 3,
    "review": "Character Tab",
    "tabId": 2,
    "tabAttribute": null,
    "tabAttributeValue": ""
   }
} 
   */
    if (!inputdata.reviewerId || !inputdata.reviewGameId) {
      toast({
        title: 'You are Unauthorized..!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return false;
    } else if (!inputdata.tabId) {
      toast({
        title: 'Select Feedback Options',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return false;
    } else if (!inputdata.review) {
      toast({
        title: 'Review Field is Empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return false;
    }

    const addReviewResponse = await SubmitReview(
      JSON.stringify({ data: inputdata, id: uuid }),
    );
    console.log("addReviewResponse",addReviewResponse);
    if (addReviewResponse?.status === 'Failure') {
      toast({
        title: 'Failed to Add Review',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return false;
    }
    if (addReviewResponse?.status === 'Success') {
      toast({
        title: 'Review added Successfully..!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      fetchGameData();
      return true;
    }
  };

  return (
    <>
      {gameInfo?.reviewer?.ReviewerStatus === 'Inactive' ||
      gameInfo?.reviewer?.ReviewerDeleteStatus === 'YES' ? (
        <h1> {'Your are Not Authorized....'}</h1>
      ) : (
        gameInfo?.gameId && (
          <Box id="container">
            <EntirePreview
              gameScreens={gameScreens}
              currentScreenId={currentScreenId}
              setCurrentScreenId={setCurrentScreenId}
              gameInfo={gameInfo}
              handleSubmitReview={handleSubmitReview}
            />
          </Box>
        )
      )}
    </>
  );
};

export default GamePreview;
