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
import { useParams } from 'react-router-dom';
import { getGameDemoData,SubmitReview } from 'utils/game/gameService';
// import NoAuth from './NoAuth';
// import NoAuth from './NoAuth';
import EntirePreview from './EntirePreview';


const gameScreens = ['GameIntro','Welcome','Story','Reflection',"Leaderboard", "ThanksScreen", "Completion","TakeAway"];

const GamePreview = () => {
  const { uuid } = useParams();
  const [gameInfo, setGameInfo] = useState<any | null>();
  const [currentScreenId, setCurrentScreenId] = useState<Number>(8);
  const toast = useToast();
  const [toastObj, setToastObj] = useState<any>();
    
  useEffect(() => {
    uuid && fetchGameData();
  }, [uuid]);

  useEffect(() => {
    setTimeout(()=>{
      setCurrentScreenId(8);
    },3000)
  }, []);
   
  /*** Collect details of a game based on uuid not gameId
   * This API took gameId based on uuid
  */
  const fetchGameData = async () => {
    const gamedata = await getGameDemoData(uuid);
    if(gamedata)
    {
      updateGameInfo(gamedata)
    }
  };

  /** THis function used to update gameInfo state on initial render and after every submition of a review 
   * 
   * Should update game info after update, delete, new review submition using this function updateGameInfo
  */
const updateGameInfo = (info: any)=>{

  const {
    gameReviewerId,
    creatorId,
    emailId,
    activeStatus,
    reviews,
    ReviewingCreator,
  } = info?.result?.lmsgamereviewer;

  const { 
  gameview,
  image,
  lmsblocks,
  lmsquestionsoptions,
  ...gameData
  } = info?.result?.lmsgame;

  const sortBlockSequence = (blockArray: []) =>{

      const transformedArray = blockArray.reduce((result: any, obj: any) => {
        const groupKey = obj?.blockQuestNo.toString();
        const seqKey = obj?.blockDragSequence ? obj?.blockDragSequence?.split(".")[1] : obj?.blockPrimarySequence?.split(".")[1];
        if (!result[groupKey]) {
          result[groupKey] = {};
        }
        result[groupKey][seqKey] = obj;  
        return result;
      }, {});
    return transformedArray;
  }

  setGameInfo({  
    gameId: info?.result?.gameId,
    gameData: gameData,
    reviewer: {
      ReviewerId: gameReviewerId,
      ReviewerName: ReviewingCreator.ctName,
      ReviewerEmailId: emailId,
      ReviewerGender: ReviewingCreator.ctGender,
      ReviewerStatus: activeStatus,
      ReviewerDeleteStatus: ReviewingCreator.ctDeleteStatus,
    },
    reviews: reviews,
    gameHistory:gameview,
    assets: image,
    blocks: sortBlockSequence(lmsblocks),
    questOptions: lmsquestionsoptions
  })
}


const handleSubmitReview= async(data: any)=>{
/* Sample post data
    {"data" :{
    "reviewerId": 4,
    "reviewGameId": 3,
    "review": "Character Tab",
    "tabId": 2,
    "tabAttribute": null,
    "tabAttributeValue": ""
   }
} 
*/

const addReviewResponse = await SubmitReview(data);

if(addReviewResponse?.status ==="Failure")
{
  setToastObj((prev:any) => {return {...prev, status: "failure", title: "Failed to add Review"}});
  return ;
}
setToastObj((prev:any) => {return {...prev, status: "success", title: "Review Added Successfully..!"}});
}

/** Handle Toast for this Component and childs too */
toastObj?.status && toast({
      title: toastObj.title,
      status: toastObj.status,
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    })
  
  return (
    <>
      {(gameInfo?.reviewer?.ReviewerStatus === 'Inactive') ||
      (gameInfo?.reviewer?.ReviewerDeleteStatus === 'YES')  ? 
        (<h1> {"Your are Not Authorized...."}</h1>)
       :
       gameInfo?.gameId &&
        <EntirePreview gameScreens={gameScreens} currentScreenId={currentScreenId} setCurrentScreenId={setCurrentScreenId} gameInfo={gameInfo} setToastObj={setToastObj} handleSubmitReview={handleSubmitReview}/>
      }
    </>
  );
};

export default GamePreview;
