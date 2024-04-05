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
  setQuestState: any;
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
}> = ({
  setCurrentScreenId,
  preview,
  selectedBadge,
  formData,
  imageSrc,
  gameInfo,
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
}) => {
  const [imgb, setbImg] = useState<any>();
  const [showComplete, setShowComplete] = useState(false);
  const [curretQuestOptions, setCurrentQuestOptions] = useState(
    completionScreenQuestOptions.find(
      (quest: any) => quest.questNo == profile?.currentQuest,
    ),
  );
  const [geFinalscorequest, SetFinalscore] = useState(null);
  const [questScores, setQuestScores] = useState(null);
  // const { profile, setProfile } = useContext(ScoreContext);
  useEffect(() => {
    setShowComplete(true);
    setTimeout(() => {
      setShowComplete(false);
    }, 1000);
  }, []);
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
  useEffect(() => {
    const scores = profile?.score;
    const sums: any = {};
    scores.forEach((score: any) => {
      const quest = score.quest;
      if (!sums[quest]) {
        sums[quest] = 0;
      }
      sums[quest] += score.score;
    });

    // const getFinalscores = Object.values(sums);
    const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
      quest,
      score,
    }));
    const getscores = getFinalscores.find(
      (row: any) => row.quest == profile?.currentQuest,
    );
    const finalscore = getscores?.score;
    if (finalscore !== undefined) {
      SetFinalscore(finalscore);
    }
    const fetchDatass = async () => {
      if (curretQuestOptions?.gameBadge) {
        /** here 4 is to refer gasAssetType at asset table */
        const result = await getImages(4);

        if (result?.status !== 'Success') {
          console.error('getbackground error:' + result?.message);
          return;
        }
        const selectedGasId = curretQuestOptions?.gameBadge;
        const selectedGasImage = result?.data.find(
          (gas: any) => gas.gasId == selectedGasId,
        );

        const imageUrl =
          selectedGasImage?.gasAssetImage || 'defaultImageURL.jpg';
        setbImg(imageUrl);
      }
    };
    fetchDatass();
  }, []);

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
                {completionScreenQuestOptions[currentQuestNo]
                  ?.gameIsSetCongratsSingleMessage !== true &&
                completionScreenQuestOptions[currentQuestNo]
                  ?.gameIsSetCongratsScoreWiseMessage !== true
                  ? completionScreenQuestOptions[currentQuestNo]
                      ?.gameCompletedCongratsMessage
                  : completionScreenQuestOptions[currentQuestNo]
                      ?.gameIsSetCongratsScoreWiseMessage === true
                  ? completionScreenQuestOptions[currentQuestNo]
                      ?.gameIsSetMinPassScore &&
                    completionScreenQuestOptions[currentQuestNo]
                      ?.gameMinScore &&
                    completionScreenQuestOptions[currentQuestNo]?.gameMinScore >
                      0
                    ? profile?.score <
                      completionScreenQuestOptions[currentQuestNo]?.gameMinScore
                      ? completionScreenQuestOptions[currentQuestNo]
                          ?.gameMinimumScoreCongratsMessage
                      : completionScreenQuestOptions[currentQuestNo]
                          ?.gameIsSetDistinctionScore &&
                        profile?.score <
                          completionScreenQuestOptions[currentQuestNo]
                            ?.gameDistinctionScore
                      ? completionScreenQuestOptions[currentQuestNo]
                          ?.gameaboveMinimumScoreCongratsMessage
                      : completionScreenQuestOptions[currentQuestNo]
                          ?.gameIsSetDistinctionScore &&
                        profile?.score >=
                          completionScreenQuestOptions[currentQuestNo]
                            ?.gameDistinctionScore
                      ? completionScreenQuestOptions[currentQuestNo]
                          ?.gameAboveDistinctionScoreCongratsMessage
                      : completionScreenQuestOptions[currentQuestNo]
                          ?.gameIsSetCongratsSingleMessage === true &&
                        completionScreenQuestOptions[currentQuestNo]
                          ?.gameCompletedCongratsMessage
                    : completionScreenQuestOptions[currentQuestNo]
                        ?.gameCompletedCongratsMessage
                  : completionScreenQuestOptions[currentQuestNo]
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
                       {geFinalscorequest ? geFinalscorequest : 0}{'/'}{questScores && questScores[profile?.currentQuest]}
                  </Text>
                </Box>
              </Box>

              {curretQuestOptions?.gameIsSetBadge === 'true' && (
                <Box className="box-2">
                  <Img src={preloadedAssets.back} className="box-2_img" />
                  <Text className="points-text" fontFamily={'content'}>
                    {curretQuestOptions?.gameBadgeName}
                  </Text>
                  {curretQuestOptions?.gameBadge && (
                    <Img className="inside-img" src={preloadedAssets[`Quest_${profile.currentQuest}`]} />
                  )}{' '}
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
