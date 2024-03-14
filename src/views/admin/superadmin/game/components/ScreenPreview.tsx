// Chakra Imports
import {
  Box,
  Flex,
  Text,
  Img,
  Grid,
  GridItem,
  Button
} from '@chakra-ui/react';
import React, {
  Suspense,
  useEffect,
  useState,
  useRef
} from 'react';
import TakeAwaysContentScreen from './onimage/TakeAwaysScreen';
// import Sample from '../../../../assets/img/games/Character_sample.glb';
// import WelcomeContentScreen from './onimage/WelcomeContentScreen';

import ReflectionContentScreen from './onimage/ReflectionScreen';
import TyContentScreen from './onimage/TyContentScreen';
import {
  getGameCreatorDemoData,
} from 'utils/game/gameService';
import TypingEffect from '../demoplay/playcards/Typing';
import { API_SERVER } from 'config/constant';
import { assetImageSrc } from 'utils/hooks/imageSrc';
import { lazy } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { preloadedImages } from 'utils/hooks/function';
import { updatePreviewData } from 'store/preview/previewSlice';

// const WelcomeContentScreen = lazy(() => import('./onimage/WelcomeContentScreen'));
const WelcomeContentScreen = lazy(() => import('./onimage/PreviewWelcomeScreen'));
const CompletionContentScreen = lazy(() => import ('./onimage/CompletionContentScreen'));
const PreviewEndOfStory = lazy(()=>import ('./onimage/PreviewEndOfStory'));
const ScreenPreview = () => {
  const {
    gameId: id,
    currentTab: currentTab,
    currentSubTab: currentSubTab,
    currentQuest: currentQuest,
    activeBlockSeq: activeBlockSeq,
    isDispatched: isDispatched,
    CompKeyCount: CompKeyCount,
    reflectionPageUpdated: reflectionPageUpdated
  } = useSelector((state: RootState) => state.preview);
  const dispatch = useDispatch();
  const [gameInfo, setGameInfo] = useState<any>();
  const [contentReady, setContentReady] = useState<boolean>(false);
  const [apiImageSet, setApiImageSet] = useState<any>();
  const [staticAssetImageUrls, setStaticAssetImageUrls] = useState<any>(null);
  const [apiUrlAssetImageUrls, setApiUrlAssetImageUrls] = useState<any>(null); //preloaded Api image urls
  const [preloadedAssets , setPreloadedAssets ] = useState<any>();
  const [demoBlocks, setDemoBlocks] = useState(null);
  const [navi, setNavi] = useState<string>('');
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNote, setShowNote] = useState(false),
    [first, setFirst] = useState(false);  /** Need to Handle this state for texture transition */
  const [data, setData] = useState(null);
  const [type, setType] = useState<string>('');
  const [resMsg, setResMsg] = useState<string>('');
  const [feed, setFeed] = useState<string>('');
  const [endOfQuest, setEndOfQuest] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [remainingSentences, setRemainingSentences] = useState<any[]>([]);
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
  const previewScreenRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   useEffect(() => {
    previewScreenRef.current.style.setProperty('--viewport-width', `${viewportWidth}px`);
    previewScreenRef.current.style.setProperty('--viewport-height', `${viewportHeight}px`);
  }, [viewportWidth, viewportHeight]);
  // console.log("viewportWidth",viewportWidth)
  // console.log("viewportHeight",viewportHeight)

  useEffect(() => {
    const fetchData = async () => {
      const resolvedResult: any = await preloadedImages(assetImageSrc);
      setStaticAssetImageUrls(resolvedResult);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (gameInfo) {
      setDemoBlocks(gameInfo?.blocks);
      const currentBlock = gameInfo?.blocks[currentQuest][activeBlockSeq]
      setType(currentBlock?.blockChoosen);
      if (currentBlock?.blockChoosen === 'Interaction') {
        setInteractionOptions(gameInfo, currentBlock);
      }
      setData(currentBlock);
    }
  }, [gameInfo, isDispatched, activeBlockSeq, currentQuest]);

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

        let reflectionData : any = [];
        for (let i = 0; i < gamedata?.resultReflection?.length ; i++)
        {
          let filteredValue = gamedata?.resultReflection.find((refRow:any) =>refRow?.refKey == `ref${i+1}`);
          reflectionData[filteredValue?.refKey]=filteredValue?.refQuestion;
        }
        setGameInfo({
          gameId: id,
          gameData: gameData,
          gameHistory: gameview,
          assets: image,
          blocks: sortBlockSequence(lmsblocks),
          gameQuest: gameQuest, //used for completion screen
          completionQuestOptions: completionOptions,
          questOptions: lmsquestionsoptions,
          reflectionQuestions: gamedata?.resultReflection.length > 0 ? reflectionData : reflectionQuestions,
          gamePlayers: gamedata?.assets?.playerCharectorsUrl,
          bgMusic:
            gamedata?.assets?.bgMusicUrl &&
            API_SERVER + '/' + gamedata?.assets?.bgMusicUrl,
          gameNonPlayerUrl:
            gamedata?.assets?.npcUrl &&
            API_SERVER + '/' + gamedata?.assets?.npcUrl,
          badges: await gamedata?.assets?.badges?.map(
            (path: string) => API_SERVER + '/' + path,
          ),
        });

        const apiImageSetArr: any = [
          { assetType: 'backgroundImage', src: image?.gasAssetImage },
          {
            assetType: 'nonplayerImage',
            src: API_SERVER + '/' + gamedata?.assets?.npcUrl,
          },
        ];

        let playerCharectorsUrls = gamedata?.assets?.playerCharectorsUrl.map(
          (item: any, index: number) => {
            let objValue = API_SERVER + '/' + item;
            let objKey = `playerCharacterImage_${index}`;
            apiImageSetArr.push({ assetType: objKey, src: objValue });
          },
        );
        let gameQuestBadges = await Promise.all(
          gamedata?.assets?.badges.map(async (item: Record<string, string>) => {
            Object.entries(item).forEach(([key, value]) => {
              let objkeyValue = key.split('_')[1];
              let objKey = `Quest_${objkeyValue}`;
              let objKeyValue = API_SERVER + '/' + value;
              apiImageSetArr.push({ assetType: objKey, src: objKeyValue });
            });
            setApiImageSet(apiImageSetArr);
            return true;
          }),
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const setInteractionOptions = (gameInfo: any, currentBlock: any) => {
    const optionsFiltered = gameInfo?.questOptions.filter(
      (key: any) => key?.qpSequence === currentBlock?.blockPrimarySequence,
    );
    if (gameInfo?.gameData?.gameShuffle) {
      for (let i = optionsFiltered.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsFiltered[i], optionsFiltered[j]] = [
          optionsFiltered[j],
          optionsFiltered[i],
        ];
      }
      setOptions(optionsFiltered);
    }
  }

  useEffect(() => {
    if (id && isDispatched) {
      fetchDataFromApi();
      dispatch(updatePreviewData({ isDispatched: false }));
    }
  }, [id, isDispatched]);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedResult: any = await preloadedImages(apiImageSet);
      setApiUrlAssetImageUrls(resolvedResult);
    };
    apiImageSet && fetchData();
  }, [apiImageSet]);

  useEffect(() => {
    if (apiUrlAssetImageUrls && staticAssetImageUrls) {
      setPreloadedAssets ({ ...apiUrlAssetImageUrls, ...staticAssetImageUrls });
    }
  }, [apiUrlAssetImageUrls, staticAssetImageUrls]);
  
  useEffect(() => {
    if (gameInfo && preloadedAssets ) {
      setContentReady(true);
    } else {
      setContentReady(false);
    }
  }, [gameInfo, preloadedAssets ]);

  useEffect(() => {
    dispatch(updatePreviewData({ isDispatched: false }));
  }, [CompKeyCount])
  const getData = (next: any) => {
    console.log('getDataSC--',next)
    const currentBlock = next
      ? parseInt(next?.blockPrimarySequence.split('.')[1])
      : null;
    const NextItem = currentBlock != null ? currentBlock + 1 : null;
    const nextSeq = next
      ? `${next?.blockPrimarySequence.split('.')[0]}.${NextItem}`
      : '';
    const quest = next ? next?.blockPrimarySequence.split('.')[0] : null;

    const nextLevel = currentQuest != null ? String(currentQuest + 1) : null;

    const nextBlock = next
      ? Object.keys(demoBlocks[quest] || {})
        .filter(
          (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === nextSeq,
        )
        .map((key: any) => demoBlocks[quest]?.[key])
      : [];

    {/* Check wheather has next block or not, if not then show End of Current Quest.
          Want to play next quest, then switch the current quest in game creation screen */}
    if (nextBlock.length == 0) {
      setEndOfQuest(true);
    }
    else {
      setEndOfQuest(false);
    }

    if (nextBlock[0]?.blockChoosen === 'Interaction') {
      setInteractionOptions(gameInfo, nextBlock[0]);
    }
    if (
      type === 'Interaction' &&
      resMsg !== ''
      //&& gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Each'
    ) {
      setType('response');
      return false;
    } else if (
      (type === 'Interaction' || type === 'response') &&
      feed !== ''
      // && gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Each'
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
        setSelectedOption(null);
        return false;
      } else if (navi === 'Complete') {
        if (demoBlocks.hasOwnProperty(nextLevel)) {
          setType(demoBlocks[nextLevel]['1']?.blockChoosen);
          setData(demoBlocks[nextLevel]['1']);
          return false;
        } else {
          setType(null);
          setData(null);
          return false;
        }
      } else {
        setType(nextBlock[0]?.blockChoosen);
        setData(nextBlock[0]);
        setSelectedOption(null);
        return false;
      }
    }

    if (nextBlock.length === 0) {
      if (demoBlocks.hasOwnProperty(nextLevel)) {
        setType(demoBlocks[nextLevel]['1']?.blockChoosen);
        setData(demoBlocks[nextLevel]['1']);
        return false;
      } else {
        setType(null);
        setData(null);
        return false;
      }
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
        setSelectedOption(null);
      } else if (next?.blockShowNavigate === 'Complete') {
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
    setSelectedOption(ind === selectedOption ? null : ind);
  };
  const handleEntirePrev = async () => {

    const url = ` /game/creator/demoplay/${id}`;
    // const url = `/screen/preview/${id}`;
    window.open(url, '_blank');
  }

  const getData1 = (data: any) => {
    const content = data?.blockText || '';
    const sentences = content.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
    const newRemainingSentences = sentences.slice(currentPosition);
   
    const concatenatedSentences = [];
    let totalLength = 0;
  
    for (let i = 0; i < newRemainingSentences.length; i++) {
      const sentence = newRemainingSentences[i];
      if (totalLength + sentence.length <= 100) {
        concatenatedSentences.push(sentence);
        totalLength += sentence.length;
      } else {
        concatenatedSentences.push(sentence);
        break;
      }
    }
    setRemainingSentences(concatenatedSentences);
    if (newRemainingSentences.length >= 1) {
      setCurrentPosition(currentPosition + concatenatedSentences.length);
    } else {
      if (data && type === 'Note') {
        getData(data);
      }
    }
  };
  
  useEffect(() => {
    if(data && type === 'Note')
      {
         getData1(data);
      }
  }, [data]);
  return (
    <Box id="container" ref={previewScreenRef}>
      <Suspense fallback={<h1>Component1 are loading please wait...</h1>}>
        {contentReady && (
          <motion.div
            initial={{ opacity: 0, background: '#000' }}
            animate={{ opacity: 1, background: '#0000' }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Box className="Images">
              <Flex >
              <Button
              className='demo-btn'
                bg="#11047a"
                _hover={{ bg: '#190793' }}
                color="#fff"
                style={{
                  position: 'absolute',
                  top: '2vh',
                  right: '0vw',
                  pointerEvents: 'auto',
                  zIndex: 99999999999999, // High z-index value
                  visibility: 'visible',
                }}
                mr={'17px'}
                mt={'6px'}
                ml={'11px'}
                onClick={handleEntirePrev}>Demo Play</Button>
                {currentTab == 3 && (
                  <Box
                  w={'100%'}
                  h={'100vh'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  position={'relative'}
                  overflow={'visible'}
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
                      >
                          {gameInfo && (
                            <WelcomeContentScreen
                              formData={gameInfo.gameData}
                              imageSrc={preloadedAssets?.Screen5}
                              preview={true}
                              preloadedAssets ={preloadedAssets}
                            />
                          )}
                      </Box>
                    </Box>
                )}
          
            {endOfQuest &&  <PreviewEndOfStory setEndOfQuest= {setEndOfQuest} preloadedAssets={preloadedAssets }/>}
              </Flex>
            </Box>
          </motion.div>
        )}
      </Suspense>
    </Box>
  );
};
export default ScreenPreview;
