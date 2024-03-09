import { Box, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import rew from 'assets/img/screens/Reward Bar.png';
import back from 'assets/img/screens/back.png';
import point from 'assets/img/screens/points.png';
import next from 'assets/img/screens/next.png';
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
  setCurrentScreenId?: any;
  getData?: any;
  data?: any;
  screen?: any;
  // currentQuestNo: any;
  completionScreenQuestOptions: any;
  questOptions: any;
  currentQuestNo: any;
}> = ({
  setCurrentScreenId,
  preview,
  selectedBadge,
  formData,
  imageSrc,
  compliData,
  setCompliData,
  CompKeyCount,
  getData,
  data,
  screen,
  // currentQuestNo,
  completionScreenQuestOptions,
  questOptions,
  currentQuestNo,
}) => {
  const [imgb, setbImg] = useState<any>();
  const [showComplete, setShowComplete] = useState(false);
  const [curretQuestOptions, setCurrentQuestOptions] = useState(
    completionScreenQuestOptions.find(
      (quest: any) => quest.questNo == currentQuestNo,
    ),
  );
  const [questScores, setQuestScores] = useState(null);
  const { profile, setProfile } = useContext(ScoreContext);
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
      {/* <Box
        className="comple-screen"
        
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          <Img src={imageSrc} className="bg-img" />
        </motion.div>
      </Box>
      {!showComplete && (
        <>
         
          <Box className="title" 
        
          >
            <Text fontFamily={'AtlantisText'} textAlign={'center'}>
              {curretQuestOptions?.gameScreenTitle}
            </Text>
          </Box>
          <Box className="content-box">
          
            <Box
              className="content"
              transform="translate(0px,100px) !important"
            >
              {completionScreenQuestOptions[currentQuestNo]
                ?.gameIsSetCongratsSingleMessage != true &&
              completionScreenQuestOptions[currentQuestNo]
                ?.gameIsSetCongratsScoreWiseMessage != true
                ? completionScreenQuestOptions[currentQuestNo]
                    ?.gameCompletedCongratsMessage
                : completionScreenQuestOptions[currentQuestNo]
                    ?.gameIsSetCongratsScoreWiseMessage == true
                ? completionScreenQuestOptions[currentQuestNo]
                    ?.gameIsSetMinPassScore &&
                  completionScreenQuestOptions[currentQuestNo]?.gameMinScore &&
                  completionScreenQuestOptions[currentQuestNo]?.gameMinScore > 0
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
                        ?.gameIsSetCongratsSingleMessage == true &&
                      completionScreenQuestOptions[currentQuestNo]
                        ?.gameCompletedCongratsMessage
                  : completionScreenQuestOptions[currentQuestNo]
                      ?.gameCompletedCongratsMessage
                : completionScreenQuestOptions[currentQuestNo]
                    ?.gameCompletedCongratsMessage}
            </Box>
          </Box>
          <Box
            className="rewards-img-box"
            transform="translate(0px,200px) !important"
          >
            <Img className="rewards-arrow-img" src={rew} />
          </Box>
          <Box
            className="points-box"
            transform="translate(0px,200px) !important"
          >
            <Box className="box-1">
              <Img src={back} className="box-1_img" />
              <Text className="points-text" fontFamily={'content'}>
                points
              </Text>
              <Box className="inside-box-1">
                <Img src={point} className="inside-box-1_img" />
                <Text className="inside-points-text" fontFamily={'content'}>
                  {(profile &&
                    profile.score &&
                    profile.score.length > 0 &&
                    profile.score.reduce(
                      (accumulator: number, currentValue: any) => {
                        return currentQuestNo === currentValue.quest ?  accumulator + currentValue.score : accumulator;
                      },
                      0,
                    )) ||
                    0}
                  /{questScores && questScores[currentQuestNo]}
                </Text>
              </Box>
            </Box>
            {curretQuestOptions?.gameIsSetBadge === 'true' && (
              <Box className="box-2">
                <Img src={back} className="box-2_img" />
                <Text className="points-text" fontFamily={'content'}>
                  {curretQuestOptions?.gameBadgeName}
                </Text>
                {curretQuestOptions?.gameBadge && (
                  <Img className="inside-img" src={imgb} />
                )}{' '}
              </Box>
            )}
          </Box>
        
          <Box className="next-btn" transform="translate(0px,400px) !important">
            <Img src={next} onClick={() => getData(data)} cursor={'pointer'} />
          </Box>
          
        </>
      )} */}

      <Box
        position="relative"
        maxW="100%"
        w={'100vw'}
        height="100vh"
        backgroundImage={imageSrc}
        backgroundSize={'cover'}
        backgroundRepeat={'no-repeat'}
      >
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={4}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={'100%'}
          // className="story_complete_grid"
        >
          <GridItem colSpan={1} position={'relative'}>
            <Box position={'relative'} w={'100%'} display={'flex'} justifyContent={'center'}>
              <Img src={screen} className="story_completion_image" loading="lazy" />
              <Box className={'story_completion_image'}>

              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
export default Completion;
