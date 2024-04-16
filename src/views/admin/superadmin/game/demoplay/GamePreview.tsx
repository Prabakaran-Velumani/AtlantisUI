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
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { preloadedImages } from 'utils/hooks/function';
import { assetImageSrc } from 'utils/hooks/imageSrc';

import { json, useParams } from 'react-router-dom';
import {
  getGameDemoData,
  SubmitReview,
  getGameCreatorDemoData,
} from 'utils/game/gameService';
import EntirePreview from './EntirePreview';
import { API_SERVER } from 'config/constant';
import { IoIosRefresh } from 'react-icons/io';
import PlayInfo from './playcards/playinfo';

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

export const ScoreContext = createContext<any>(null);

const GamePreview = () => {
  const { uuid } = useParams();
  const { id } = useParams();
  const InitialScreenId = id ? 10 : 1; //replace 10 by which screen you want to play
  const [gameInfo, setGameInfo] = useState<any | null>();
  const [timeout, setTimer] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentScreenId, setCurrentScreenId] =
    useState<number>(InitialScreenId);
      // useState<number>(5);
  const [profile, setProfile] = useState({
    score: [],
    completedLevels: ['1'],
    currentQuest: 1,
  });
  const [currentScore, setCurrentScore] = useState(0);
  const toast = useToast();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [contentReady, setContentReady] = useState<boolean>(false);
  const [apiImageSet, setApiImageSet] = useState<any>();
  const [staticAssetImageUrls, setStaticAssetImageUrls] = useState<any>(null);
  const [apiUrlAssetImageUrls, setApiUrlAssetImageUrls] = useState<any>(null); //preloaded Api image urls

  useEffect(() => {
    const fetchData = async () => {
      const resolvedResult: any = await preloadedImages(assetImageSrc);
      setStaticAssetImageUrls(resolvedResult);
    };
    fetchData();
  }, []);

  useEffect(() => {
    uuid && fetchGameData();
  }, [uuid]);
  useEffect(() => {
    id && fetchCreatorDemoData();
    handleFullScreen()
  }, [id]);

  const element = document.getElementById('root');
  const handleFullScreen = () => {
    if (element) {
      try {
        if (document.fullscreenEnabled) {
          if (!document.fullscreenElement) {
            element.requestFullscreen()
              .catch((error) => {
                console.log('Error entering fullscreen mode:', error.message);
              });
          } else {
            console.warn('Document is already in fullscreen mode');
          }
        } else {
          console.error('Fullscreen mode is not supported');
          // Handle scenario where fullscreen mode is not supported by the browser
        }
      } catch (error) {
        console.error('Error requesting fullscreen:', error);
      }
    }
  }

  /*** Collect details of a game based on uuid not gameId
   * This API took gameId based on uuid
   */
  const fetchGameData = async () => {
    const gamedata = await getGameDemoData(uuid);

    if (!gamedata?.error && gamedata) {
      updateGameInfo(gamedata);
    }
  };
  const fetchCreatorDemoData = async () => {
    const gamedata = await getGameCreatorDemoData(id);

    if (!gamedata?.error && gamedata) {
      updateCreatorGameInfo(gamedata);
    }
  };


  const updateCreatorGameInfo = async (info: any) => {
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
    const apiImageSetArr: any = [
      { assetType: 'backgroundImage', src: image?.gasAssetImage },
      {
        assetType: 'nonplayerImage',
        src: API_SERVER + '/' + info?.assets?.npcUrl,
      },
    ];

    let playerCharectorsUrls = info?.assets?.playerCharectorsUrl.map(
      (item: any, index: number) => {
        let objValue = API_SERVER + '/' + item;
        let objKey = `playerCharacterImage_${index}`;
        apiImageSetArr.push({ assetType: objKey, src: objValue });
      },
    );
    let gameQuestBadges = await Promise.all(
      info?.assets?.badges.map(
        async (item: Record<string, string>) => {
          Object.entries(item).forEach(([key, value]) => {
            let objkeyValue = key.split('_')[1];
            let objKey = `Quest_${objkeyValue}`;
            let objKeyValue = API_SERVER + '/' + value;
            apiImageSetArr.push({ assetType: objKey, src: objKeyValue });
          });
          setApiImageSet(apiImageSetArr);
          return true;
        },
      ),
    );
  };

  /** THis function used to update gameInfo state on initial render and after every submition of a review
   *
   * Should update game info after update, delete, new review submition using this function updateGameInfo
   */
  const updateGameInfo = async (info: any) => {
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
      gameQuest,
      ...gameData
    } = info?.result?.lmsgame;
    const sortBlockSequence = (blockArray: []) => {
      const transformedArray = blockArray.reduce((result: any, obj: any) => {
        const groupKey = obj?.blockQuestNo.toString();
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
        gameQuest: gameQuest, //used for completion screen
        completionQuestOptions: completionOptions,
      },
      reviews: reviews,
      gameHistory: gameview,
      assets: image,
      blocks: sortBlockSequence(lmsblocks),
      questOptions: lmsquestionsoptions,
      reflectionQuestions: info?.resultReflection,
      gamePlayers: info?.assets?.playerCharectorsUrl,
      bgMusic:
        info?.assets?.bgMusicUrl && API_SERVER + '/' + info?.assets?.bgMusicUrl,
      gameNonPlayerUrl:
        info?.assets?.npcUrl && API_SERVER + '/' + info?.assets?.npcUrl,
    });

    const apiImageSetArr: any = [
      { assetType: 'backgroundImage', src: image?.gasAssetImage },
      {
        assetType: 'nonplayerImage',
        src: API_SERVER + '/' + info?.assets?.npcUrl,
      },
    ];

    let playerCharectorsUrls = info?.assets?.playerCharectorsUrl.map(
      (item: any, index: number) => {
        let objValue = API_SERVER + '/' + item;
        let objKey = `playerCharacterImage_${index}`;
        apiImageSetArr.push({ assetType: objKey, src: objValue });
      },
    );
    let gameQuestBadges = await Promise.all(
      info?.assets?.badges.map(
        async (item: Record<string, string>) => {
          Object.entries(item).forEach(([key, value]) => {
            let objkeyValue = key.split('_')[1];
            let objKey = `Quest_${objkeyValue}`;
            let objKeyValue = API_SERVER + '/' + value;
            apiImageSetArr.push({ assetType: objKey, src: objKeyValue });
          });
          setApiImageSet(apiImageSetArr);
          return true;
        },
      ),
    );
  };

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
  const handleMouseMove = () => {
    setIsHovered(true);
    clearTimeout(timeout);
    setTimer(setTimeout(() => setIsHovered(false), 2000)); // Adjust the timeout duration as needed
  };

  useEffect(() => {
    return () => clearTimeout(timeout); // Cleanup the timer on component unmount
  }, [timeout]);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedResult: any = await preloadedImages(apiImageSet);
      setApiUrlAssetImageUrls(resolvedResult);
    };
    apiImageSet && fetchData();
  }, [apiImageSet]);

  const preloadedAssets = useMemo(() => {
    return { ...apiUrlAssetImageUrls, ...staticAssetImageUrls };
  }, [apiUrlAssetImageUrls, staticAssetImageUrls]);

  useEffect(() => {
    if (gameInfo && preloadedAssets) {
      setContentReady(true);
    } else {
      setContentReady(false);                                                
    }
  }, [gameInfo, preloadedAssets]);

  return (
    <>
      {/* <Suspense fallback={<h1>Loading please wait...</h1>}> */}
      {contentReady && (
        gameInfo?.reviewer?.ReviewerStatus === 'Inactive' ||
          gameInfo?.reviewer?.ReviewerDeleteStatus === 'YES' ? (
          <h1> {'Your are Not Authorized....'}</h1>
        ) : (
          gameInfo?.gameId &&
          (
            // !showGame ? 
            //   (
            //   <PlayInfo />
            // ) :
            (
              <ScoreContext.Provider value={{ profile, setProfile }}>
                <Box id="container" >
                  {isHovered && (
                    <Icon
                      as={IoIosRefresh}
                      position={'fixed'}
                      top={'20px'}
                      left={'48%'}
                      color={'white'}
                      zIndex={999999}
                      width={'60px'}
                      height={'60px'}
                      padding={'20px'}
                      borderRadius={'50%'}
                      bg={'grey'}
                      cursor={'pointer'}
                      onClick={() => window.location.reload()}
                    />
                  )}
                  <EntirePreview
                    currentScore={currentScore}
                    setCurrentScore={setCurrentScore}
                    gameScreens={gameScreens}
                    currentScreenId={currentScreenId}
                    setCurrentScreenId={setCurrentScreenId}
                    gameInfo={gameInfo}
                    handleSubmitReview={handleSubmitReview}
                    isReviewDemo={id ? false : true}
                    preloadedAssets={preloadedAssets}
                  />
                </Box>
              </ScoreContext.Provider>
            ))
        )
      )}
      {/* </Suspense> */}
    </>
  );
};

export default GamePreview;
