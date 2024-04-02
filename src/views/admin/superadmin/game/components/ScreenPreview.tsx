// Chakra Imports
import {
  Box,
  Flex,
  Text,
  Img,
  Grid,
  GridItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from '@chakra-ui/react';
import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import TakeAwaysContentScreen from './onimage/TakeAwaysScreen';
// import Sample from '../../../../assets/img/games/Character_sample.glb';
// import WelcomeContentScreen from './onimage/WelcomeContentScreen';
import Screen1 from '../../../../../assets/img/screens/screen1.png';
import leaderboard from '../../../../../assets/img/screens/Leaderboard.png';

import ReflectionContentScreen from './onimage/ReflectionScreen';
import TyContentScreen from './onimage/TyContentScreen';
import { getGameCreatorDemoData } from 'utils/game/gameService';
import TypingEffect from '../demoplay/playcards/Typing';
import {
  API_SERVER,
  Notelength,
  Dialoglength,
  Responselength,
} from 'config/constant';
import { lazy } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { preloadedImages } from 'utils/hooks/function';
import { assetImageSrc } from 'utils/hooks/imageSrc';
import { updatePreviewData } from 'store/preview/previewSlice';
import LeaderBoard from '../demoplay/playcards/Leaderboard';

const WelcomeContentScreen = lazy(
  () => import('./onimage/WelcomeContentScreen'),
);
// const WelcomeContentScreen = lazy(
//   () => import('./onimage/PreviewWelcomeScreen'),
// );
const CompletionContentScreen = lazy(
  () => import('./onimage/CompletionContentScreen'),
);
const PreviewEndOfStory = lazy(() => import('./onimage/PreviewEndOfStory'));
const ScreenPreview = () => {
  const {
    gameId: id,
    currentTab: currentTab,
    currentSubTab: currentSubTab,
    currentQuest: currentQuest,
    activeBlockSeq: activeBlockSeq,
    isDispatched: isDispatched,
    CompKeyCount: CompKeyCount,
    reflectionPageUpdated: reflectionPageUpdated,
  } = useSelector((state: RootState) => state.preview);
  const dispatch = useDispatch();
  const [gameInfo, setGameInfo] = useState<any>();
  const [contentReady, setContentReady] = useState<boolean>(false);
  const [apiImageSet, setApiImageSet] = useState<any>();
  const [staticAssetImageUrls, setStaticAssetImageUrls] = useState<any>(null);
  const [apiUrlAssetImageUrls, setApiUrlAssetImageUrls] = useState<any>(null); //preloaded Api image urls
  // const [preloadedAssets, setPreloadedAssets] = useState<any>();
  const [demoBlocks, setDemoBlocks] = useState(null);
  const [navi, setNavi] = useState<string>('');
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionNavigation, setOptionNavigation] = useState(null);
  const [showNote, setShowNote] = useState(false),
    [first, setFirst] = useState(false);
  const [game3Position, setGame3Position] = useState({
    previousBlock: '',
    currentBlock: '',
    nextBlock: '',
  });
  const [data, setData] = useState(null);
  const [type, setType] = useState<string>('');
  const [resMsg, setResMsg] = useState<string>('');

  const [feed, setFeed] = useState<string>('');
  const [endOfQuest, setEndOfQuest] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [remainingSentences, setRemainingSentences] = useState<any[]>([]);
  const [showTypingEffect, setShowTypingEffect] = useState<any>(false);
  const [Navigatenext, setNavigateNext] = useState<any>(false);
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
  const [navTrack, setNavTrack] = useState([]);
  const [isPrevNavigation, setIsPrevNavigation] = useState(false);

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
      const currentBlock = gameInfo?.blocks[currentQuest][activeBlockSeq];
      setType(currentBlock?.blockChoosen);
      if (currentBlock?.blockChoosen === 'Interaction') {
        setInteractionOptions(gameInfo, currentBlock);
      }
      setData(currentBlock);
    }
    setCurrentPosition(0);
  }, [gameInfo, isDispatched, activeBlockSeq, currentQuest]);

  const replayQuest = () => {
    dispatch(updatePreviewData({ activeBlockSeq: 1, isDispatched: true }));
    setEndOfQuest(false);
  };
  const fetchDataFromApi = useCallback(async () => {
    try {
      if (id && isDispatched) {
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
              gameIsSetCongratsSingleMessage:
                qst.gameIsSetCongratsSingleMessage,
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

          let reflectionData: any = [];
          for (let i = 0; i < gamedata?.resultReflection?.length; i++) {
            let filteredValue = gamedata?.resultReflection.find(
              (refRow: any) => refRow?.refKey == `ref${i + 1}`,
            );
            reflectionData[filteredValue?.refKey] = filteredValue?.refQuestion;
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
            reflectionQuestions:
              gamedata?.resultReflection.length > 0
                ? reflectionData
                : reflectionQuestions,
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
            gamedata?.assets?.badges.map(
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
        }
      } else {
        console.log('game id is missing...');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [id, isDispatched]);
  const setInteractionOptions = (gameInfo: any, currentBlock: any) => {
    console.log('currentBlock', currentBlock);
    const optionsFiltered = gameInfo?.questOptions.filter(
      (key: any) => key?.qpSequence === currentBlock?.blockPrimarySequence,
    );
    console.log('optionsFiltered', optionsFiltered);
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

  useEffect(() => {
    dispatch(updatePreviewData({ isDispatched: false }));
  }, [CompKeyCount]);

  //   setCurrentPosition(0);
  //   const currentBlock = current
  //     ? parseInt(current?.blockPrimarySequence.split('.')[1])
  //     : null;
  //   const PrevItem = currentBlock != null ? currentBlock - 1 : null;

  //   const prevSeq =
  //     game3Position.previousBlock !== ''
  //       ? game3Position.previousBlock
  //       : current
  //         ? `${current?.blockPrimarySequence.split('.')[0]}.${PrevItem}`
  //         : '';

  //   const quest = current ? current?.blockPrimarySequence.split('.')[0] : null;
  //   const currentQuest = current
  //     ? parseInt(current?.blockPrimarySequence.split('.')[0])
  //     : null;
  //   const prevLevel = currentQuest != null ? String(currentQuest + 1) : null;
  //   const prevBlock = current
  //     ? Object.keys(demoBlocks[quest] || {})
  //       .filter(
  //         (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === prevSeq,
  //       )
  //       .map((key: any) => demoBlocks[quest]?.[key])
  //     : [];
  //   if (
  //     prevBlock.length !== 0 &&
  //     prevBlock[0]?.blockChoosen !== 'Interaction'
  //   ) {
  //     setType(prevBlock[0]?.blockChoosen);
  //     setData(prevBlock[0]);
  //   }
  // };
  const prevData = (current: any) => {
    console.log('current', current)
    const quest = current ? current?.blockPrimarySequence.split('.')[0] : null;
    const currentBlock = current
      ? parseInt(current?.blockPrimarySequence.split('.')[1])
      : null;
    console.log('navTrack.length', navTrack.length)
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
        console.log('prevBlock',prevBlock);
      console.log('newTrackSequence', newTrackSequence);
      if (
        prevBlock.length !== 0 &&
        prevBlock[0]?.blockChoosen !== 'Interaction'
      ) {
        /*** Handle the previous track */
        const removedElement = navTrack.pop();
        console.log('removedElement', removedElement);
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

const getData = (next: any) => {
  setIsPrevNavigation(false);

//get the next block details
const quest = next ? next?.blockPrimarySequence.split('.')[0] : null;
const currentBlock = next
  ? parseInt(next?.blockPrimarySequence.split('.')[1])
  : null;
const NextItem = currentBlock != null ? currentBlock + 1 : null;

const nextSeq = next
  ? `${next?.blockPrimarySequence.split('.')[0]}.${NextItem}`
  : '';
  const prevTrack = navTrack;
 
const currentQuest = next
  ? parseInt(next?.blockPrimarySequence.split('.')[0])
  : null;

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
if (option?.qpSequence ===  nextBlock[0]?.blockPrimarySequence) {
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

if (
  type === 'Interaction' &&
  resMsg !== ''
) {
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
  if (navi === 'Repeat Question') {
    const currentBlockinteraction = gameInfo?.blocks[currentQuest][currentBlock];
    setInteractionOptions(gameInfo, currentBlockinteraction);
    setType(next?.blockChoosen);
    setData(next);
    setSelectedOption(null);  
    return false;
  } else if (navi === 'New Block') {
    setType(nextBlock[0]?.blockChoosen);
    setData(nextBlock[0]);
    setSelectedOption(null);
    return false;
  } else if (navi === 'Replay Point') {
    setType(demoBlocks[quest]['1']?.blockChoosen);
    setData(demoBlocks[quest]['1']);
    setSelectedOption(null);
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

          if(selectedNext[0]?.blockChoosen === 'Interaction')
    {
      const optionsFiltered = [];
      for (const option of gameInfo.questOptions) {
          if (option?.qpSequence ===  selectedNext[0]?.blockPrimarySequence) {
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
    setData(selectedNext && selectedNext[0]);
    setSelectedOption(null);
    return false;
  }
  else {    
    setType(nextBlock[0]?.blockChoosen);
    if(nextBlock[0]?.blockChoosen === 'Interaction')
    {
      const optionsFiltered = [];
      for (const option of gameInfo.questOptions) {
          if (option?.qpSequence ===  nextBlock[0]?.blockPrimarySequence) {
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
    setData(nextBlock[0]);
    setSelectedOption(null);
    return false;
  }
  } else if (navi === 'Complete') {
    // if (demoBlocks.hasOwnProperty(nextLevel)) {
      setEndOfQuest(true);
      // setProfile((prev: any) => {
      //   const data = { ...prev };
      //   data.completedLevels = [...data.completedLevels, nextLevel];
      //   return data;
      // });
      // setType(demoBlocks[nextLevel]['1']?.blockChoosen);
      // setData(demoBlocks[nextLevel]['1']);
      return false;
    // } else {
    //   setType(null);
    //   setData(null);
    //   return false;
    // }
  } else {
    setType(nextBlock[0]?.blockChoosen);
    setData(nextBlock[0]);
    setSelectedOption(null);
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
            if(selectedNext[0]?.blockChoosen === 'Interaction')
        {
          const optionsFiltered = [];
          for (const option of gameInfo.questOptions) {
              if (option?.qpSequence ===  selectedNext[0]?.blockPrimarySequence) {
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
        setData(selectedNext && selectedNext[0]);
      }
      else {
        setType(nextBlock[0]?.blockChoosen);
        if(nextBlock[0]?.blockChoosen === 'Interaction')
        {
          const optionsFiltered = [];
          for (const option of gameInfo.questOptions) {
              if (option?.qpSequence ===  nextBlock[0]?.blockPrimarySequence) {
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
        setData(nextBlock[0]);
      }
      setGame3Position((prev: any) => ({
        ...prev,
        nextBlock: selectedNext[0]?.blockPrimarySequence,
      }));
      setSelectedOption(null);
        return false;
      } else if (next?.blockShowNavigate === 'Complete') {
        // setProfile((prev: any) => {
        //   const data = { ...prev };
        //   data.completedLevels = [...data?.completedLevels, nextLevel];
        //   return data;
        // });
        // setCurrentScreenId(13);
        setEndOfQuest(true);
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
    setOptionNavigation(item?.qpNextOption);
    console.log('item?.qpNextOption', item?.qpNextOption);
    setSelectedOption(ind === selectedOption ? null : ind);
  };
  const handleEntirePrev = async () => {
    const url = ` /game/creator/demoplay/${id}`;
    window.open(url, '_blank');
  };
  useEffect(() => {
    console.log('data', data);
    if (data && type) {
      
      /** this logic is used to hanlde the navigation options in both forward and backward navigation */
      if (gameInfo.hasOwnProperty('blocks')) {
        let previousPrimarySeq = navTrack[navTrack.length - 1];
        if (previousPrimarySeq) {
          let currentQuest = previousPrimarySeq.split('.')[0];
          let previousBlock: any = Object.values(
            gameInfo?.blocks[currentQuest],
          )?.find((row: any) => {
            return row.blockPrimarySequence == previousPrimarySeq;
          });
          if (data.blockPrimarySequence != previousPrimarySeq) {
            if (previousBlock?.blockChoosen === 'Interaction') {
              setNavTrack([data.blockPrimarySequence]);
            } else {
              const newArray = navTrack;
              newArray.push(data.blockPrimarySequence);
              setNavTrack(newArray);
            }
          }
        } else {
          setNavTrack([data.blockPrimarySequence]);
        }
        getDataSection(data);
      }
    }
  }, [data, type]);
  useEffect(() => {
    if (Navigatenext === true) {
      getData(data);
    }
  }, [Navigatenext]);
   const getDataSection = (data: any) => {
    setShowTypingEffect(false);
    setCurrentPosition(0);
    // Note and Dialog
    const content = data?.blockText || '';
    const sentences = content.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
    const newRemainingSentences = sentences.slice(currentPosition);
    
    // response
    const Responsecontent = resMsg || '';
    const Responsesentences = Responsecontent.split(
      /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/,
    );
    const newRemainingResponseSentences = Responsesentences.slice(currentPosition);
    const concatenatedSentences = [];
    let totalLength = 0;
    // Note and Dialog
        for (let i = 0; i < newRemainingSentences.length; i++) {
        const sentence = newRemainingSentences[i];
  
      if (data && type === 'Note') {
        if (totalLength + sentence.length <= Notelength) {
          concatenatedSentences.push(sentence);
          totalLength += sentence.length;
        } else {
          concatenatedSentences.push(sentence);
          break;
        }
      }
      if (data && type === 'Dialog') {
        if (totalLength + sentence.length <= Dialoglength) {
          concatenatedSentences.push(sentence);
          totalLength += sentence.length;
        } else {
          if (totalLength + sentence.length >= Dialoglength) {
            break;
          }
          concatenatedSentences.push(sentence);
          break;
        }
      }
    }
    // Response 
    for (let i = 0; i < newRemainingResponseSentences.length; i++) {
      const ressentence = newRemainingResponseSentences[i];
      if (data && type === 'response') {
        if (totalLength + ressentence.length <= Responselength) {
          concatenatedSentences.push(ressentence);
          totalLength += ressentence.length;
        } else {
          if (totalLength + ressentence.length >= Responselength) {
            break;
          }
          concatenatedSentences.push(ressentence);
          break;
        }
      }
    }
    setRemainingSentences(concatenatedSentences);
    if (newRemainingSentences.length > 0 ) {
      setCurrentPosition(currentPosition + concatenatedSentences.length);
      setNavigateNext(false);
    }
    else if (newRemainingResponseSentences.length > 0 ) {
      setCurrentPosition(currentPosition + concatenatedSentences.length);
      setNavigateNext(false);
    } 
    else {
        setNavigateNext(true);
        setIsPrevNavigation(false);
    }
  };
  
const Updatecontent = () => {
  console.log('*******showTypingEffect', showTypingEffect)
    if (showTypingEffect === false) {
    setShowTypingEffect(true);
  }
  else {
    getDataSection(data);
  }
}
  useEffect(() => {
    getDataSection(data);
  }, []);
  const handleCloseWindow = () => {
    window.close();
  };

  const SkipContentForBackNavigation = () => {
    if (showTypingEffect === false) {
      setShowTypingEffect(true);
    }
    else {
      setCurrentPosition(0);
      prevData(data)
    }
  }

  const getNoteNextData = ()=>{
    setIsPrevNavigation(false); 
    getDataSection(data)
  }

  console.log('navTrack', navTrack);

  return (
    <Box id="container">
      <Suspense fallback={<h1>Loading please wait...</h1>}>
        {contentReady && (
          <motion.div
            initial={{ opacity: 0, background: '#000' }}
            animate={{ opacity: 1, background: '#0000' }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Box id="EntirePreview-wrapper">
              <Box className="EntirePreview-content">
                <Box h={'100vh !important'} className="Images">
                  <Flex height="100vh" className="EntirePreview">
                  <Button
                      className="demo-btn"
                      bg="#11047a"
                      _hover={{ bg: '#190793' }}
                      color="#fff"
                      style={{
                        position: 'absolute',
                        top: '2vh',
                        right: '0vw',
                        pointerEvents: 'auto',
                        zIndex: 1, // High z-index value
                        visibility: 'visible',
                      }}
                      mr={'17px'}
                      mt={'6px'}
                      ml={'11px'}
                      onClick={handleEntirePrev}
                    >
                      Demo Play
                    </Button>
                    {currentTab === 3 && (
                      <Box
                        w={'100%'}
                        h={'100vh'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        position={'relative'}
                        overflow={'visible'}
                        style={{ perspective: '1000px' }}
                      >
                        <Box
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                          backgroundImage={preloadedAssets.backgroundImage}
                        >
                          <Box className="Images">
                            {gameInfo && (
                              <WelcomeContentScreen
                                // backgroundImage={preloadedAssets.backgroundImage}
                                formData={gameInfo.gameData}
                                imageSrc={preloadedAssets?.Screen5}
                                preview={true}
                                preloadedAssets={preloadedAssets}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {currentTab === 4 && data && type === 'Note' && (
                      <Box
                        position="relative"
                        w={'100%'}
                        height="100vh"
                        backgroundImage={preloadedAssets?.backgroundImage}
                        backgroundSize={'cover'}
                        backgroundRepeat={'no-repeat'}
                        className="chapter_potrait"
                      >
                        <Grid
                          templateColumns="repeat(1, 1fr)"
                          gap={4}
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          className="story_note_grid"
                        >
                          <GridItem colSpan={1} position={'relative'}>
                            <Box display={'flex'} justifyContent={'center'}>
                              <Img
                                src={preloadedAssets?.note}
                                className="story_note_image"
                                loading="lazy"
                              />
                              <Box
                                className={'story_note_content'}
                              >
                                <Box
                                  w={'100%'}
                                  display={'flex'}
                                  justifyContent={'center'}
                                >
                                  <Box className={'story_note_block'}>
                                    <Text textAlign={'center'}>
                                      {remainingSentences}
                                    </Text>
                                  </Box>
                                </Box>
                                <Box
                                  w={'100%'}
                                  onClick={() => getNoteNextData()}
                                  mt={'20px'}
                                  display={'flex'}
                                  justifyContent={'center'}
                                  cursor={'pointer'}
                                  position={'fixed'}
                                  top={'70%'}
                                >
                                  <Img
                                    src={preloadedAssets.next}
                                    h={'7vh'}
                                    className={'story_note_next_button'}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </GridItem>
                        </Grid>
                      </Box>
                    )}
                    {currentTab === 4 && data && type === 'Dialog' && (
                      <Box className="chapter_potrait">
                        <Img
                          src={preloadedAssets?.backgroundImage}
                          className="dialogue_screen"
                        />
                        <Img
                          className={'dialogue_image'}
                          src={preloadedAssets?.dial}
                        />
                        {!showNote && (
                          <>
                            <Box position={'relative'}>
                              <Img
                                src={preloadedAssets?.char}
                                position={'fixed'}
                                h={'100px'}
                                w={'30%'}
                                left={'5%'}
                                bottom={'93px'}
                              />
                              <Text
                                position={'fixed'}
                                left={{ base: '17%', md: '18%' }}
                                bottom={'118px'}
                                fontSize={{ base: '30px', xl: '2.2vw' }}
                                fontWeight={500}
                                textAlign={'center'}
                                fontFamily={'AtlantisText'}
                                color={'#312821'}
                              >
                                {data.blockRoll === 'Narrator'
                                  ? data.blockRoll
                                  : gameInfo?.gameData?.gameNonPlayerName}
                              </Text>
                            </Box>
                            <Box
                              display={'flex'}
                              position={'fixed'}
                              alignItems={'center'}
                              justifyContent={'space-between'}
                              h={'61px'}
                              overflowY={'scroll'}
                              w={'85%'}
                              fontSize={{ base: '30px', lg: '1.8vw' }}
                              bottom={'38px'}
                              fontFamily={'AtlantisContent'}
                            >
                              {showTypingEffect === false ? (
                                <TypingEffect
                                  text={remainingSentences.toString()}
                                  speed={50}
                                  setSpeedIsOver={setShowTypingEffect}
                                />
                              ) : (
                                remainingSentences
                              )}
                            </Box>
                            <Box
                              display={'flex'}
                              position={'fixed'}
                              justifyContent={navTrack.length > 1 ? 'space-between': 'end'}
                              w={'95%'}
                              bottom={'0'}
                            >
                            {navTrack.length > 1 &&
                              <Img
                                src={preloadedAssets?.left}
                                w={'70px'}
                                h={'50px'}
                                cursor={'pointer'}
                                onClick={() => SkipContentForBackNavigation()}
                              />
                            }
                              <Img
                                src={preloadedAssets?.right}
                                w={'70px'}
                                h={'50px'}
                                cursor={'pointer'}
                                onClick={() => Updatecontent()}
                              />
                            </Box>
                          </>
                        )}
                      </Box>
                    )}
                    {currentTab === 4 && data && type === 'Interaction' && (
                      <Box
                        position="relative"
                        w={'100%'}
                        height="100vh"
                        backgroundImage={preloadedAssets?.backgroundImage}
                        backgroundSize={'cover'}
                        backgroundRepeat={'no-repeat'}
                        className="chapter_potrait"
                      >
                        <Grid
                          templateColumns="repeat(1, 1fr)"
                          gap={4}
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          w={'90%'}
                        >
                          <GridItem colSpan={1} position={'relative'}>
                            <Box
                              position={'relative'}
                              className="story_interaction_image"
                            >
                              <Img
                                src={preloadedAssets?.parch}
                                w={'auto'}
                                h={'100%'}
                                loading="lazy"
                              />
                              <Box
                                position={'absolute'}
                                top={{ base: '5%', md: '6%' }}
                                className="story_interaction_content"
                              >
                                <Box
                                  textAlign={'center'}
                                  display={'flex'}
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                  fontWeight={500}
                                  fontSize={{ md: '3vw', lg: '2.5vw' }}
                                  fontFamily={'AtlantisText'}
                                  lineHeight={1}
                                  w={'100%'}
                                  h={'10%'}
                                  className={'interaction_heading_potrait'}
                                >
                                  <Box w={'80%'} color={'#312821'}>
                                    Interaction{' '}
                                  </Box>
                                </Box>
                                <Box
                                  textAlign={'center'}
                                  h={'25%'}
                                  display={'flex'}
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                  fontWeight={500}
                                  fontFamily={'AtlantisText'}
                                  lineHeight={1}
                                  w={'96%'}
                                  overflowY={'scroll'}
                                  marginTop={'15px'}
                                >
                                  <Box className={'story_intraction_question'}>
                                    {data?.blockText}
                                  </Box>
                                </Box>
                                <Box
                                  mt={'10px'}
                                  w={'100%'}
                                  h={'40%'}
                                  fontWeight={500}
                                  overflowY={'scroll'}
                                  display={'flex'}
                                  justifyContent={'center'}
                                >
                                  <Box w={'60%'}>
                                    {options &&
                                      options.map((item: any, ind: number) => (
                                        <Box
                                          w={'100%'}
                                          mb={'10px'}
                                          lineHeight={1}
                                          key={ind}
                                          color={
                                            selectedOption === ind
                                              ? 'purple'
                                              : ''
                                          }
                                          textAlign={'center'}
                                          cursor={'pointer'}
                                          onClick={() =>
                                            handleValidate(item, ind)
                                          }
                                          fontFamily={'AtlantisText'}
                                        >
                                          <Img
                                            src={
                                              selectedOption === ind
                                                ? preloadedAssets?.on
                                                : preloadedAssets?.off
                                            }
                                            h={'4vh'}
                                            w={'100%'}
                                          />
                                          <Box
                                            className={
                                              'story_interaction_option'
                                            }
                                          >
                                            {item?.qpOptionText}
                                          </Box>
                                        </Box>
                                      ))}
                                  </Box>
                                </Box>
                                <Box
                                  w={'98%'}
                                  display={'flex'}
                                  justifyContent={navTrack.length > 1 ? 'space-between': 'end'}
                                >
                                {navTrack.length > 1 &&
                                  <Img
                                    src={preloadedAssets?.left}
                                    className={'interaction_button'}
                                    onClick={() => prevData(data)}
                                  />
                                }
                                  {selectedOption !== null && (
                                    <Img
                                      src={preloadedAssets?.right}
                                      className={'interaction_button'}
                                      onClick={() => getData(data)}
                                    />
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          </GridItem>
                        </Grid>
                      </Box>
                    )}
                    {currentTab === 4 && data && type === 'response' && (
                      <Box className="chapter_potrait">
                        <Img
                          src={preloadedAssets?.backgroundImage}
                          className="dialogue_screen"
                        />
                        <Img
                          className={'dialogue_image'}
                          src={preloadedAssets?.dial}
                        />
                        {!showNote && (
                          <>
                            <Box position={'relative'}>
                              <Img
                                src={preloadedAssets?.char}
                                position={'fixed'}
                                h={'100px'}
                                w={'30%'}
                                left={'5%'}
                                bottom={'93px'}
                              />
                              <Text
                                position={'fixed'}
                                left={{ base: '17%', md: '18%' }}
                                bottom={'118px'}
                                fontSize={{ base: '30px', xl: '2.2vw' }}
                                fontWeight={500}
                                textAlign={'center'}
                                fontFamily={'AtlantisText'}
                                color={'#312821'}
                              >
                                {data.blockRoll === 'Narrator'
                                  ? data.blockRoll
                                  : gameInfo?.gameData?.gameNonPlayerName}
                              </Text>
                            </Box>
                            <Box
                              display={'flex'}
                              position={'fixed'}
                              alignItems={'center'}
                              justifyContent={'space-between'}
                              h={'61px'}
                              overflowY={'scroll'}
                              w={'85%'}
                              fontSize={{ base: '30px', lg: '1.8vw' }}
                              bottom={'38px'}
                              fontFamily={'AtlantisContent'}
                            >
                              {showTypingEffect === false ? (
                                <TypingEffect
                                  text={remainingSentences.toString()}
                                  speed={50}
                                  setSpeedIsOver={setShowTypingEffect}
                                />
                              ) : (
                                remainingSentences
                              )}
                            </Box>
                            <Box
                              display={'flex'}
                              position={'fixed'}
                              justifyContent={'end'}
                              w={'95%'}
                              bottom={'0'}
                            >
                              <Img
                                src={preloadedAssets?.right}
                                w={'70px'}
                                h={'50px'}
                                cursor={'pointer'}
                                onClick={() => Updatecontent()}
                              />
                            </Box>
                          </>
                        )}
                      </Box>
                    )}
                    {currentTab === 4 && data && type === 'feedback' && (
                      <Box
                        position="relative"
                        w={'100%'}
                        height="100vh"
                        backgroundImage={preloadedAssets?.backgroundImage}
                        backgroundSize={'cover'}
                        backgroundRepeat={'no-repeat'}
                        className="chapter_potrait"
                      >
                        <Grid
                          templateColumns="repeat(1, 1fr)"
                          gap={4}
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          className="story_note_grid"
                        >
                          <GridItem colSpan={1} position={'relative'}>
                            <Box display={'flex'} justifyContent={'center'}>
                              <Img
                                src={preloadedAssets?.feedi}
                                className="story_note_image"
                                loading="lazy"
                              />
                              <Box
                                className={'story_note_content'}
                                // bg={'blue.300'}
                              >
                                <Box
                                  w={'100%'}
                                  display={'flex'}
                                  justifyContent={'center'}
                                >
                                  <Box className={'story_note_block'}>
                                    <Text textAlign={'center'}>{feed}</Text>
                                  </Box>
                                </Box>
                                <Box
                                  w={'100%'}
                                  onClick={() => getData(data)}
                                  mt={'20px'}
                                  display={'flex'}
                                  justifyContent={'center'}
                                  cursor={'pointer'}
                                  position={'fixed'}
                                  top={'70%'}
                                >
                                  <Img
                                    src={preloadedAssets.next}
                                    h={'7vh'}
                                    className={'story_note_next_button'}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </GridItem>
                        </Grid>
                      </Box>
                    )}
                    {currentTab === 5 && currentSubTab === 0 && (
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
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                          backgroundImage={preloadedAssets.backgroundImage}
                        >
                          <Box className="Images">
                            <CompletionContentScreen
                              preview={true}
                              formData={gameInfo.gameData}
                              imageSrc={preloadedAssets.Completion}
                              compliData={gameInfo.completionQuestOptions}
                              CompKeyCount={CompKeyCount}
                              preloadedAssets={preloadedAssets}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {currentTab === 5 && currentSubTab === 1 && (
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
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                          backgroundImage={preloadedAssets.backgroundImage}
                        >
                          <Box className="Images">
                            <Box className="LearderBoards">
                              <LeaderBoard
                                formData={gameInfo?.gameData}
                                imageSrc={leaderboard}
                                getData={getData}
                                data={data}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {currentTab === 5 && currentSubTab === 2 && (
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
                            <ReflectionContentScreen
                              preview={true}
                              formData={gameInfo.gameData}
                              imageSrc={preloadedAssets?.RefBg}
                              reflectionQuestions={
                                gameInfo?.reflectionQuestions
                              }
                              reflectionQuestionsdefault={
                                reflectionQuestionsdefault
                              }
                              preloadedAssets={preloadedAssets}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {currentTab === 5 && currentSubTab === 3 && (
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
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                          backgroundImage={preloadedAssets.backgroundImage}
                        >
                          <Box className="Images">
                            <TakeAwaysContentScreen
                              preview={true}
                              formData={gameInfo.gameData}
                              imageSrc={preloadedAssets?.Screen4}
                              preloadedAssets={preloadedAssets}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {currentTab === 5 && currentSubTab === 4 && (
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
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                          backgroundImage={preloadedAssets.backgroundImage}
                        >
                          <Box className="Images">
                            <WelcomeContentScreen
                              formData={gameInfo.gameData}
                              imageSrc={preloadedAssets?.Screen5}
                              preview={true}
                              preloadedAssets={preloadedAssets}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {currentTab === 5 && currentSubTab === 5 && (
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
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                          backgroundImage={preloadedAssets.backgroundImage}
                        >
                          <Box className="Images">
                            <TyContentScreen
                              formData={gameInfo.gameData}
                              imageSrc={preloadedAssets?.Screen6}
                              preview={true}
                              preloadedAssets={preloadedAssets}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}

                    <Modal
                      isOpen={endOfQuest}
                      size="full"
                      onClose={handleCloseWindow}
                    >
                      <ModalOverlay />
                      <ModalContent backgroundColor="rgba(0, 0, 0, 0.9)">
                        <ModalCloseButton
                          color={'white'}
                        />
                        <ModalBody p={0}>
                          <PreviewEndOfStory
                            setEndOfQuest={setEndOfQuest}
                            preloadedAssets={preloadedAssets}
                            replayQuest={replayQuest}
                          />
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </Suspense>
    </Box>
  );
};
export default ScreenPreview;
