import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Img,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

// Images
import Background from 'assets/img/games/fristscreenBackground.jpg';
import QueueBackground from 'assets/img/games/Quest_background.png';
import QueueScreen from 'assets/img/games/Queue_screen.png';
import Demo from 'assets/img/games/1700.jpg';
import Lock from 'assets/img/games/lock.png';
import { BiMoney } from 'react-icons/bi';
import { GiCoins } from 'react-icons/gi';
import { ScoreContext } from '../GamePreview';
import rib from 'assets/img/games/ribbon.png';
const ChapterPage: React.FC<{
  formData?: any;
  imageSrc: any;
  questState: any;
  setQuestState: any;
  demoBlocks: any;
  setCurrentScreenId: any;
  questOptions?: any;
  currentQuestNo?: any;
  setCurrentQuestNo?: any;
  gameQuest?: any;
  setData?: any;
  setType?: any;
  setOptions?: any;
  setFeedbackList?: any;
  preloadedAssets?: any;
}> = ({
  imageSrc,
  demoBlocks,
  setCurrentScreenId,
  formData,
  questOptions,
  currentQuestNo,
  setCurrentQuestNo,
  gameQuest,
  questState,
  setQuestState,
  setData,
  setType,
  setOptions,
  setFeedbackList,
  preloadedAssets,
}) => {
  const [questScores, setQuestScores] = useState(null);

  const [AllowedReplayOption, setAllowedReplayOption] = useState(null);

  useEffect(() => {
    const groupedByQuest: any = {};
    questOptions.forEach((item: any) => {
      const questNo = item.qpQuestNo;
      if (!groupedByQuest[questNo]) {
        groupedByQuest[questNo] = [];
      }
      groupedByQuest[questNo].push(item);
    });
    const maxScoresByQuest: any = {};
    for (const questNo in groupedByQuest) {
      const questData = groupedByQuest[questNo];
      const maxScoresBySequence: any = {};

      questData.forEach((item: any) => {
        const sequence = item.qpSequence;
        const score = parseInt(item.qpScore);

        if (
          !maxScoresBySequence[sequence] ||
          score > maxScoresBySequence[sequence]
        ) {
          maxScoresBySequence[sequence] = score;
        }
      });
      const maxScoreForQuest = Object.values(maxScoresBySequence).reduce(
        (acc: any, score: any) => acc + score,
        0,
      );
      maxScoresByQuest[questNo] = maxScoreForQuest;
    }
    setQuestScores(maxScoresByQuest);
  }, []);
  const { profile, setProfile } = useContext(ScoreContext);
  useEffect(() => {
    // if (profile.completedLevels.length !== 0) {
    //   const completedLevels = profile.completedLevels.map(
    //     (item: any) => item,
    //   );
    //   setCompleted(completedLevels);
    // }
    const currentQuest = profile.currentQuest;
    gameQuest.map((item: any, index: number) => {
      const questNoAsString = item.gameQuestNo.toString();
      if (profile.completedLevels.includes(questNoAsString)) {
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
          (row: any) => row.quest == item.gameQuestNo,
        );
        const finalscore = getscores?.score;
        if (formData?.gameDisableOptionalReplays === 'false') {
          if (item?.gameIsSetMinPassScore === 'true') {
            const getminpassscore = item?.gameMinScore;

            if (
              finalscore >= getminpassscore &&
              finalscore < item?.gameDistinctionScore
            ) {
              setQuestState((prevquestdataList: any) => ({
                ...prevquestdataList,
                [item.gameQuestNo]: 'replayallowed',
              }));
            } else {
              if (finalscore !== undefined) {
                setQuestState((prevquestdataList: any) => ({
                  ...prevquestdataList,
                  [item.gameQuestNo]: 'replayallowed',
                }));
                return false;
              } else {
                setQuestState((prevquestdataList: any) => ({
                  ...prevquestdataList,
                  [item.gameQuestNo]: 'Started',
                }));
                return false;
              }
            }
          } else {
            // setQuestState((prevquestdataList: any) => ({
            //   ...prevquestdataList,
            //   [item.gameQuestNo]: 'replayallowed'
            // }));

            if (finalscore !== undefined) {
              setQuestState((prevquestdataList: any) => ({
                ...prevquestdataList,
                [item.gameQuestNo]: 'completed',
              }));
              return false;
            } else {
              setQuestState((prevquestdataList: any) => ({
                ...prevquestdataList,
                [item.gameQuestNo]: 'Started',
              }));
              return false;
            }
          }
        } else {
          //Mandatory replay, even though formData?.gameDisableOptionalReplays is false, could allow when the min scroe is not set, or if has min score, then score less than minscore, it could navaigate to replay point
          if (finalscore !== undefined) {
            setQuestState((prevquestdataList: any) => ({
              ...prevquestdataList,
              [item.gameQuestNo]: 'completed',
            }));
          } else {
            setQuestState((prevquestdataList: any) => ({
              ...prevquestdataList,
              [item.gameQuestNo]: 'Started',
            }));
          }
        }
      } else {
        setQuestState((prevquestdataList: any) => ({
          ...prevquestdataList,
          [item.gameQuestNo]: 'locked',
        }));
      }
    });
  }, [profile]);

  const handleChapter = (it: any) => {
    /**** Control the Chapter selection based on the quest Status and replay allowed and mandatatory replay etc., 
     * For Preview and Review it doesn't require this. Allow to navigate to any available quests
     *
     * Commant line starts here
    const Completionpage = Object.entries(questState).map(
      ([questId, status]) => ({ questId, status }),
    );
    const OpenStraigntCompletionPage = Completionpage.find(
      (row: any) => row.questId === it && row.status === 'completed',
    );

    if (OpenStraigntCompletionPage !== undefined) {
          setProfile((prev: any) => ({
            ...prev,
            currentQuest: it,
          }));
     
      setFeedbackList([]);
      setCurrentScreenId(6);
    } else {
    
       if (profile.completedLevels.includes(it)) {
          
      * Commant line ends here
      */
        setType(demoBlocks[it]['1']?.blockChoosen);
        setData(demoBlocks[it]['1']);
        setFeedbackList([]);
        const updatedCompletedLevels = new Set([...profile.completedLevels, it])      
        setProfile((prev: any) => ({
          ...prev,
          currentQuest: it,
          completedLevels: [...updatedCompletedLevels]
        }));
        setCurrentScreenId(2);
    /**  }
    * Uncomment this line when uncomment restrict the quest entry logic} */
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  
  return (
    <>
      <Box
        position="relative"
        maxW="100%"
        w={'100vw'}
        height="100vh"
        backgroundImage={imageSrc}
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
          width="75%"
        >
          <GridItem colSpan={1} position={'relative'}>
            <Img
              src={preloadedAssets.QueueBackground}
              h={'auto'}
              maxW={'100%'}
              loading="lazy"
            />
            <Box className="chapter_title">Quest</Box>
            <Box className={'chapters_list_box'}>
              <Box w={'90%'}>
                <motion.div
                  className="container"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={2}>
                    {demoBlocks &&
                      Object.keys(demoBlocks).map((it: any, num: number) => {
                        return (
                          <motion.div
                            key={num}
                            className="item"
                            variants={item}
                          >
                            <Box
                              position={'relative'}
                              onClick={() => handleChapter(it)}
                            >
                              <Img src={preloadedAssets.Demo} width={'98%'} />
                              <Img
                                className="queue-screen"
                                position={'absolute'}
                                left={'-2px'}
                                top={'-2px'}
                                src={preloadedAssets.QueueScreen}
                                zIndex={999}
                              />
                              <Box w={'100%'} position={'absolute'} top={'0'}>
                                <Text
                                  textAlign={'center'}
                                  right={'65px'}
                                  fontFamily={'AtlantisText'}
                                  color={'#D9C7A2'}
                                  zIndex={999999}
                                  fontSize={'5vh'}
                                  className={'quest_title'}
                                  textShadow="-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                                >
                                  Quest {num + 1}
                                </Text>
                              </Box>
                              {/* {profile.completedLevels.includes(it) ? ( */}
                              {(questState[it] === 'completed' || questState[it] === 'replayallowed') ? (
                                <Box className={'completed_level'}>
                                  <Box position={'relative'} display={'flex'} justifyContent={'center'}> 
                                    <Img w={'40%'} h={'auto'} src={preloadedAssets?.Completed} />
                                    {/* <Text
                                      position={'absolute'}
                                      textAlign={'center'}
                                      fontFamily={'AtlantisText'}
                                      color={'#D9C7A2'}
                                      zIndex={999999}
                                      right={'43%'}
                                      bottom={'52%'}
                                      fontSize={'2.8vh'}
                                      className={'quest_complete'}
                                      textShadow="-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                                    >
                                      Completed
                                    </Text> */}
                                  </Box>
                                </Box>
                              ) : (
                                ''
                              )}
                              <Box
                                w={'100%'}
                                position={'absolute'}
                                bottom={'0'}
                                color={'#D9C7A2'}
                                fontFamily={'AtlantisText'}
                                zIndex={999999}
                              >
                                <Text
                                  className="amount-score"
                                  textAlign={'center'}
                                >
                                  {/* {(profile &&
                                    profile.score &&
                                    profile.score.length > 0 &&
                                    profile.score.reduce(
                                      (
                                        accumulator: number,
                                        currentValue: any,
                                      ) => {
                                        return currentValue.quest ===
                                          parseInt(it)
                                          ? accumulator + currentValue.score
                                          : accumulator;
                                      },
                                      0,
                                    )) ||
                                    0} */}
                                  {profile.playerGrandTotal[it] ?? 0}/{questScores && questScores[it]}{' '}
                                  <Icon as={BiMoney} />
                                  <Img src={preloadedAssets.MoneyIcon} zIndex={5}/>
                                </Text>
                              </Box>

                              {profile.completedLevels.includes(it) ? (
                                Object.entries(questState).map(
                                  ([questId, status], index) =>
                                    questId === it && status === 'completed' ? (
                                      <Img
                                        key={index}
                                        src={preloadedAssets.Lock}
                                        className="lock"
                                        width={'97%'}
                                        position={'absolute'}
                                        bg={'#2b2828d6'}
                                        top={'0'}
                                      />
                                    ) : questId === it &&
                                      status ===
                                        'replayallowed' ? null : questId ===
                                        it && status === 'locked' ? (
                                      <Img
                                        key={index}
                                        src={preloadedAssets.Lock}
                                        className="lock"
                                        width={'97%'}
                                        position={'absolute'}
                                        bg={'#2b2828d6'}
                                        top={'0'}
                                      />
                                    ) : questId === it &&
                                      status === 'Started' ? null : null,
                                )
                              ) : (
                                <Img
                                  src={preloadedAssets.Lock}
                                  className="lock"
                                  width={'97%'}
                                  position={'absolute'}
                                  bg={'#2b2828d6'}
                                  top={'0'}
                                />
                              )}
                            </Box>
                          </motion.div>
                        );
                      })}
                  </SimpleGrid>
                </motion.div>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ChapterPage;
