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
  getFeedbackData:any;
  setCurrentScreenId?: any;
  getData?: any;
  gameInfo:any
  data?: any;
  setFeedbackNavigateNext:any;
  screen?: any;
  profile:any;
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
  gameInfo,
  compliData,
  setCompliData,
  setFeedbackNavigateNext,
  CompKeyCount,
  profile,
  getData,
  data,
  screen,
  getFeedbackData,
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
  const nextNavigation = (data:any)=>{

    const currentQuest = data?.blockPrimarySequence.split('.')[0]?? null;
    const currentGameData = gameInfo.gameQuest.find((row:any)=> row.gameQuestNo == profile?.currentQuest);
    const nextLevel = currentQuest != null ? String(currentQuest + 1) : null;
    const haveNextQuest = gameInfo.gameQuest.some((row:any)=> (row.gameQuestNo > profile?.currentQuest))
   const totalScore = profile?.score.forEach((item:any)=>{
    if (item && item.marks) {
      return item.marks.reduce((acc:any, mark:any) => acc + mark, 0);
   }
     
    }) 
    
  
  
    
    if(gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') 
    {
      getFeedbackData(data);
      setFeedbackNavigateNext(false);
      setCurrentScreenId(14);
    }
    else if(gameInfo?.gameData?.gameIsShowLeaderboard === 'true')
    {

      setCurrentScreenId(4);
    }
    else if (haveNextQuest) {
        if (currentGameData?.gameIsSetMinPassScore ==='true') {
          const  getminpassscore = currentGameData?.gameMinScore;
          const scores = profile?.score;
          const sums:any = {};
          scores.forEach((score:any) => {
              const quest = score.quest;
              if (!sums[quest]) {
                  sums[quest] = 0;
              }
              sums[quest] += score.score;
          });

          // const getFinalscores = Object.values(sums);
          const getFinalscores = Object.entries(sums).map(([quest, score]) => ({ quest, score }));
          const getscores = getFinalscores.find((row:any)=> row.quest == currentGameData.gameQuestNo);
          const finalscore = getscores?.score;
        //   if (profile?.score < currentGameData?.gameMinScore ) {
        //     const initialBlock = demoBlocks[currentQuest]['1'];
        //     console.log('**Mandatory Replay',initialBlock);
        //       // getData(initialBlock);
        //       //mandatory replay. need to prompt about to replay
        //   } else 
        if (finalscore >= getminpassscore && finalscore < currentGameData?.gameDistinctionScore && gameInfo.gameData?.gameDisableOptionalReplays ==='false') {
          
               setCurrentScreenId(8);
               //set to prompt it for replay the game
              }
    }
  }
  }



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
        className={'chapter_potrait'}
      >
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={4}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={'100%'}
        >
          <GridItem colSpan={1} position={'relative'}>
            <Box
              position={'relative'}
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
            >
              <Img
                src={screen}
                className="story_completion_image"
                loading="lazy"
              />
              <Box className={'story_completion_content'}>
                <Box
                  w={'70%'}
                  display={'flext'}
                  justifyContent={'space-between'}
                  flexDirection={'column'}
                >
                  <Box
                    h={'13%'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    className='completion_heading'
                  >
                    <Text fontFamily={'AtlantisText'} textAlign={'center'}  fontSize={'2vw'}>
                      {curretQuestOptions?.gameScreenTitle}
                    </Text>
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    h={'70%'}
                    className={'completion_content'}
                  >
                    <Box
                      className="content"
                      fontSize={'2vw'}
                      fontFamily={'AtlantisText'}
                      w={'80%'}
                      textAlign={'center'}
                      color={'#D9C7A2'}
                    >
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
                          completionScreenQuestOptions[currentQuestNo]
                            ?.gameMinScore > 0
                          ? profile?.score <
                            completionScreenQuestOptions[currentQuestNo]
                              ?.gameMinScore
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
                    <Img w={'100%'} src={rew} />
                    <Box
                      w={'100%'}
                      display={'flex'}
                      justifyContent={'space-between'}

                    >
                      <Box w="45%" position={'relative'} >
                        <Img src={back} w={'100%'} h={'auto'} />
                        <Box
                          w={'100%'}
                          position={'absolute'}
                          top={'0'}
                          h={'100%'}
                        >
                          <Box
                            w={'100%'}
                            display={'flex'}
                            justifyContent={'center'}
                          >
                            <Text
                              fontFamily={'AtlantisContent'}
                              textAlign={'center'}
                              fontSize={'1.8vw'}
                            >
                              points
                            </Text>
                          </Box>
                          <Box
                            w={'100%'}
                            position={'relative'}
                            h={{ md: '40%', xl: '60%', '2xl': '70%' }}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            flexDirection={'column'}
                          >
                            <Img src={point} w={'80%'} h={'auto'} />
                            <Text
                              position={'absolute'}
                              top={'33%'}
                              fontFamily={'AtlantisText'}
                              color={'#D9C7A2'}
                              fontSize={'1.6vw'}
                            >
                              {(profile &&
                                profile.score &&
                                profile.score.length > 0 &&
                                profile.score.reduce(
                                  (accumulator: number, currentValue: any) => {
                                    return currentQuestNo === currentValue.quest
                                      ? accumulator + currentValue.score
                                      : accumulator;
                                  },
                                  0,
                                )) ||
                                0}
                              /{questScores && questScores[currentQuestNo]}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                      {curretQuestOptions?.gameIsSetBadge === 'true' && (
                        <Box w={'45%'} position={'relative'}>
                          <Img src={back} w={'100%'} h={'auto'} />
                          <Box
                            w={'100%'}
                            position={'absolute'}
                            top={'0'}
                            h={'100%'}
                          >
                            <Box
                              w={'100%'}
                              display={'flex'}
                              justifyContent={'center'}
                            >
                              <Text
                                fontFamily={'AtlantisContent'}
                                textAlign={'center'}
                                fontSize={'1.8vw'}
                              >
                                {curretQuestOptions?.gameBadgeName}sdfaas
                              </Text>
                            </Box>
                            {curretQuestOptions?.gameBadge && (
                              <Img className="inside-img" src={imgb} />
                            )}{' '}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                    <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                      {/* <Img
                        src={next}
                        onClick={() => getData(data)}
                        cursor={'pointer'}
                        w={'50%'}
                      /> */}
                       <Img
                        src={next}
                        onClick={() => nextNavigation(data)}
                        cursor={'pointer'}
                        w={'50%'}
                      />
                    </Box>
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
export default Completion;
