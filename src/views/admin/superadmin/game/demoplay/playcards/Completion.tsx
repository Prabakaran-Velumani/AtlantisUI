import { Box, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { getImages } from 'utils/game/gameService';
import { motion } from 'framer-motion';
import { ScoreContext } from '../GamePreview';

const Completion: React.FC<{
  formData: any;
  imageSrc: any;
  selectedBadge?: any;
  compliData?: any;
  setCompliData?: any;
  CompKeyCount?: any;
  preview?: any;
  questState: any;
  setType: any;
  setData: any;
  setQuestState: any;
  type: any
  getFeedbackData: any;
  setCurrentScreenId?: any;
  getData?: any;
  gameInfo: any;
  data?: any;
  setFeedbackNavigateNext: any;
  screen?: any;
  profile: any;
  completionScreenQuestOptions: any;
  questOptions: any;
  currentQuestNo: any;
  preloadedAssets: any;
  questWiseMaxTotal: any;
  gameInfoTotalScore: any;
}> = ({
  setCurrentScreenId,
  preview,
  selectedBadge,
  formData,
  imageSrc,
  gameInfo,
  setType,
  setData,
  type,
  questState,
  setQuestState,
  compliData,
  setCompliData,
  setFeedbackNavigateNext,
  CompKeyCount,
  profile,
  getData,
  data,
  screen,
  getFeedbackData,
  completionScreenQuestOptions,
  questOptions,
  currentQuestNo,
  preloadedAssets,
  questWiseMaxTotal,
  gameInfoTotalScore,
}) => {
    const [imgb, setbImg] = useState<any>();
    const [showComplete, setShowComplete] = useState(false);
    const [curretQuestOptions, setCurrentQuestOptions] = useState(
      completionScreenQuestOptions.find(
        (quest: any) => quest.questNo == profile?.currentQuest,
      ),
    );


    const [geFinalscorequest, SetFinalscore] = useState(profile.playerGrandTotal.questScores[parseInt(profile.currentQuest)]);
    const [questScores, setQuestScores] = useState(questWiseMaxTotal);
    // const { profile, setProfile } = useContext(ScoreContext);
    useEffect(() => {
      setShowComplete(true);
      setTimeout(() => {
        setShowComplete(false);
      }, 1000);
    }, []);
    const playedSeqId: any = [];
    profile?.score.forEach((item: any) => {
      playedSeqId.push(item.seqId);
    });
    console.log('playedSeqId', playedSeqId);
    useEffect(() => {
      const groupedByQuest: any = {};
      questOptions.forEach((item: any) => {
        const questNo = item.qpQuestNo;
        if (!groupedByQuest[questNo]) {
          groupedByQuest[questNo] = [];
        }
        groupedByQuest[questNo].push(item);
      });
      console.log('groupedByQuest', groupedByQuest);
      const playedSeqId: any = [];
      const playedOptionId: any = [];
      profile?.score.forEach((item: any) => {
        playedSeqId.push(item.seqId);
      });
      console.log('playedSeqId', playedSeqId);
      if (playedSeqId.length > 0) {
        for (const key in gameInfo.blocks[profile?.currentQuest]) {
          const data = gameInfo.blocks[profile?.currentQuest][key];
          const  seqIdFilter = playedSeqId.filter((item:any,num:number) => parseInt(item[num]))
          if(seqIdFilter[0] === data.blockPrimarySequence)
            {
              playedOptionId.push(data.blockId);
            }
        }
      }
      console.log('playedOptionId',playedOptionId)
      const maxScoresByQuest:any ={};
      for (const questNo in groupedByQuest) {
        // if(questNo === parseInt(profile?.currentQuest))
        //   {

        //   }
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
     /* const maxScoresByQuest: any = {};
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
      */
      setQuestScores(maxScoresByQuest);
    }, []);
    // useEffect(() => {
    //   /** this functionality moves to parent component */

    //   const scores = questState =='Started' ? profile?.score : profile?.replayScore;
    //   const sums: any = {};
    //   scores.forEach((score: any) => {
    //     const quest = score.quest;
    //     if (!sums[quest]) {
    //       sums[quest] = 0;
    //     }
    //     sums[quest] += score.score;
    //   });

    //   // const getFinalscores = Object.values(sums);
    //   const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
    //     quest,
    //     score,
    //   }));
    //   const getscores = getFinalscores.find(
    //     (row: any) => row.quest == profile?.currentQuest,
    //   );
    //   const finalscore = getscores?.score;
    //   if (finalscore !== undefined) {
    //     SetFinalscore(finalscore);
    //   }

    //   /** Already has badge images in preloadedAssets as Quest_1 or Quest_1-shadow */
    //   const fetchDatass = async () => {
    //     if (curretQuestOptions?.gameBadge) {
    //       /** here 4 is to refer gasAssetType at asset table */
    //       const result = await getImages(4);

    //       if (result?.status !== 'Success') {
    //         console.error('getbackground error:' + result?.message);
    //         return;
    //       }
    //       const selectedGasId = curretQuestOptions?.gameBadge;
    //       const selectedGasImage = result?.data.find(
    //         (gas: any) => gas.gasId == selectedGasId,
    //       );

    //       const imageUrl =
    //         selectedGasImage?.gasAssetImage || 'defaultImageURL.jpg';
    //       setbImg(imageUrl);
    //     }
    //   };
    //   fetchDatass();
    // }, []);

    const getcompletionquest = currentQuestNo - 1;


    /** This useEffect Only hanldes the total within the quest total */
    useEffect(() => {
      const questTotalScore = Object.entries(profile?.playerGrandTotal?.questScores).reduce((totalScore: number, [key, value]: [any, any]) => {
        if (key == profile.currentQuest) {
          return totalScore + value;
        }
        return totalScore;
      }, 0);
      SetFinalscore(questTotalScore);
    }, [profile.score])

    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box className="comple-screen">
            <Img src={preloadedAssets.Screen1} className="bg-img" />
            <Box className="title">
              <Text fontFamily={'AtlantisText'} textAlign={'center'}>
                {curretQuestOptions?.gameScreenTitle}
              </Text>
            </Box>
            <Box className="content-box">
              <Box className="congratulations">
                <Box className="content" mt="0px">
                  {
                    completionScreenQuestOptions[getcompletionquest]
                      ?.gameIsSetCongratsSingleMessage !== 'true' &&
                      completionScreenQuestOptions[getcompletionquest]
                        ?.gameIsSetCongratsScoreWiseMessage !== 'true'
                      ? completionScreenQuestOptions[getcompletionquest]
                        ?.gameCompletedCongratsMessage
                      : completionScreenQuestOptions[getcompletionquest]
                        ?.gameIsSetCongratsScoreWiseMessage === 'true'
                        ? completionScreenQuestOptions[getcompletionquest]
                          ?.gameIsSetMinPassScore &&
                          completionScreenQuestOptions[getcompletionquest]
                            ?.gameMinScore &&
                          completionScreenQuestOptions[getcompletionquest]?.gameMinScore >
                          0
                          ? (geFinalscorequest ? geFinalscorequest : 0) <
                            completionScreenQuestOptions[getcompletionquest]?.gameMinScore
                            ? completionScreenQuestOptions[getcompletionquest]
                              ?.gameMinimumScoreCongratsMessage
                            : completionScreenQuestOptions[getcompletionquest]
                              ?.gameIsSetDistinctionScore &&
                              (geFinalscorequest ? geFinalscorequest : 0) <
                              completionScreenQuestOptions[getcompletionquest]
                                ?.gameDistinctionScore
                              ? completionScreenQuestOptions[getcompletionquest]
                                ?.gameaboveMinimumScoreCongratsMessage
                              : completionScreenQuestOptions[getcompletionquest]
                                ?.gameIsSetDistinctionScore &&
                                (geFinalscorequest ? geFinalscorequest : 0) >=
                                completionScreenQuestOptions[getcompletionquest]
                                  ?.gameDistinctionScore
                                ? completionScreenQuestOptions[getcompletionquest]
                                  ?.gameAboveDistinctionScoreCongratsMessage
                                : completionScreenQuestOptions[getcompletionquest]
                                  ?.gameIsSetCongratsSingleMessage === 'true' &&
                                completionScreenQuestOptions[getcompletionquest]
                                  ?.gameCompletedCongratsMessage
                          : completionScreenQuestOptions[getcompletionquest]
                            ?.gameCompletedCongratsMessage
                        : completionScreenQuestOptions[getcompletionquest]
                          ?.gameCompletedCongratsMessage}
                </Box>
              </Box>
              <Box className="rewards-img-box">
                <Img className="rewards-arrow-img" src={preloadedAssets.rew} />
              </Box>
              <Box className="points-box">
                <Box className="box-1">
                  <Img src={preloadedAssets.back} className="box-1_img" />
                  <Text className="points-text" fontFamily={'content'}>
                    points
                  </Text>
                  <Box className="inside-box-1">
                    <Img
                      src={preloadedAssets.point}
                      className="inside-box-1_img"
                    />
                    <Text className="inside-points-text" fontFamily={'content'}>
                      {geFinalscorequest <= 0 ? 0 : geFinalscorequest}{'/'}{questScores && questScores[profile?.currentQuest] ? questScores[profile?.currentQuest] : Object.keys(gameInfoTotalScore).map(num => {
                        if (gameInfoTotalScore[num]?.questNo === parseInt(profile?.currentQuest)) {
                          return gameInfoTotalScore[num].gameTotalScore[0].maxScore;
                        } else {
                          return 0;
                        }
                      })}
                    </Text>
                  </Box>
                </Box>

                {curretQuestOptions?.gameIsSetBadge === 'true' && (
                  <Box className="box-2">
                    <Img src={preloadedAssets.back} className="box-2_img" />
                    <Text className="points-text" fontFamily={'content'}>
                      {curretQuestOptions?.gameBadgeName}
                    </Text>
                    {curretQuestOptions?.gameBadge &&
                      curretQuestOptions?.gameIsSetCriteriaForBadge === 'true' && curretQuestOptions?.gameAwardBadgeScore <= profile.score.reduce((acc: any, cur: any) => {
                        if (cur.quest === currentQuestNo) {
                          return acc + cur.score;
                        } else {
                          return acc;
                        }
                      }, 0) ?
                      (
                        <Img className="inside-img" src={preloadedAssets[`Quest_${profile.currentQuest}`]} />
                      )
                      : <Img className="inside-img" src={preloadedAssets[`Quest_${profile.currentQuest}-shadow`]} />

                    }{' '}
                  </Box>
                )}
              </Box>
            </Box>
            <Box className="next-btn">
              <Img src={preloadedAssets.next} onClick={() => getData(data)} />
            </Box>
          </Box>
        </motion.div>
      </>
    );
  };
export default Completion;
