import { Box, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { useEffect, useState, useContext, useMemo } from 'react';
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
    const [geFinalscorequest, SetFinalscore] = useState(profile.playerGrandTotal?.questScores[parseInt(profile.currentQuest)]);
    const [questScores, setQuestScores] = useState(questWiseMaxTotal);
    const [quetCompletionMessage, setQuestCompletionMessage]= useState<string>("");

    useEffect(() => {
      setShowComplete(true);
      setTimeout(() => {
        setShowComplete(false);
      }, 1000);
const findQuestCompletionMessage=()=>{
      const playerCurrentQuestGrandTotal = profile.playerGrandTotal.questScores[parseInt(currentQuestNo)];
  let completionScreenMessage="";
  const currentQuesTGameData=completionScreenQuestOptions[getcompletionquest];
  if(currentQuesTGameData?.gameIsSetCongratsSingleMessage === 'true'){
    completionScreenMessage = currentQuesTGameData?.gameCompletedCongratsMessage;
  } 
  else if(currentQuesTGameData?.gameIsSetCongratsScoreWiseMessage ==='true'){
    if(playerCurrentQuestGrandTotal < currentQuesTGameData?.gameDistinctionScore)
      {
        completionScreenMessage =  currentQuesTGameData?.gameaboveMinimumScoreCongratsMessage;
      }
      else{
        completionScreenMessage = currentQuesTGameData?.gameAboveDistinctionScoreCongratsMessage; 
      }
  }
  else{
    completionScreenMessage = currentQuesTGameData?.gameCompletedCongratsMessage;
  }
  setQuestCompletionMessage(completionScreenMessage);
}
  findQuestCompletionMessage()
    }, []);
     
    const getcompletionquest = currentQuestNo - 1;

  /** This useEffect Only hanldes the total within the quest total */
useEffect(()=>{
let questTotalScore = Object.entries(profile?.playerGrandTotal?.questScores).reduce((totalScore: number, [key, value]: [any, any]) => {
  if (key == profile.currentQuest) {
      return totalScore + value;
  }
  return totalScore;
}, 0);
questTotalScore = questTotalScore <= 0 ? 0 : questTotalScore;
  SetFinalscore(questTotalScore);
},[profile.score])

const currentQuestScore = useMemo(() => {
  if (questScores && questScores[profile?.currentQuest]) {
    return questScores[profile?.currentQuest];
  } else {
    const totalFlowScore =profile.score?.reduce((acc: number, item: any)=>{
      if(item?.quest == profile?.currentQuest)
        {
          return  acc + parseInt(item.score);
        }
        return acc;
    },0)
    return totalFlowScore >0 ? totalFlowScore : (curretQuestOptions?.gameTotalScore[0]?.maxScore ?? 0);
  }
}, [questScores, profile?.currentQuest, gameInfoTotalScore]);

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
                      {quetCompletionMessage}
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
                      {/* {geFinalscorequest <= 0 ? 0 : geFinalscorequest}{'/'}{questScores && questScores[profile?.currentQuest] ? questScores[profile?.currentQuest] : Object.keys(gameInfoTotalScore).map(num => {
                        if (gameInfoTotalScore[num]?.questNo === parseInt(profile?.currentQuest)) {
                          return gameInfoTotalScore[num].gameTotalScore[0].maxScore;
                        } else {
                          return 0;
                        }
                      })} */}
                      {` ${geFinalscorequest}/${currentQuestScore}`}
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
