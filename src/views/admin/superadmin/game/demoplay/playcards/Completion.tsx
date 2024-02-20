import { Box, Img, Text } from '@chakra-ui/react';
import rew from 'assets/img/screens/Reward Bar.png';
import back from 'assets/img/screens/back.png';
import point from 'assets/img/screens/points.png';
import next from 'assets/img/screens/next.png';
import { useEffect, useState } from 'react';
import { getImages } from 'utils/game/gameService';
import { motion } from 'framer-motion';
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
  currentQuestNo: any;
  completionScreenQuestOptions: any;
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
  currentQuestNo,
  completionScreenQuestOptions
}) => {
  const [imgb, setbImg] = useState<any>();
  const [showComplete, setShowComplete] = useState(false);
  const [curretQuestOptions, setCurrentQuestOptions]= useState(completionScreenQuestOptions.find((quest:any)=> (quest.questNo == currentQuestNo)));
  useEffect(() => {
    setShowComplete(true);
    setTimeout(() => {
      setShowComplete(false);
    }, 1000);

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
        console.log("result", result)

        console.log("selectedGasImage", selectedGasImage)

        const imageUrl =
          selectedGasImage?.gasAssetImage || 'defaultImageURL.jpg';

        setbImg(imageUrl);
      }
    };
    fetchDatass();
  }, []);
console.log("***gameinfo", completionScreenQuestOptions)
console.log("***currentQuestNo", currentQuestNo);
console.log("****currnetQuest", completionScreenQuestOptions.find((quest:any)=> (quest.questNo == currentQuestNo)));

  return (
    <>
      <Box
        className="comple-screen"
        style={{
          transform: `scale(${showComplete ? 0.5 : 1})`,
          transition: 'transform 0.5s ease-in-out',
        }}
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
          <Box className="title">
            <Text fontFamily={'AtlantisText'} textAlign={'center'}>
              {curretQuestOptions?.gameScreenTitle}
            </Text>
          </Box>
          <Box className="congratulations">
            <Box className="content">
              {curretQuestOptions?.gameCompletedCongratsMessage}
            </Box>
            {curretQuestOptions?.gameIsSetCongratsScoreWiseMessage === 'true' && (
              <>
                {curretQuestOptions?.gameMinimumScoreCongratsMessage}
                {curretQuestOptions?.gameLessthanDistinctionScoreCongratsMessage}
                {curretQuestOptions?.gameAboveDistinctionScoreCongratsMessage}
              </>
            )}
          </Box>
          <Box className="rewards-img-box">
            <Img className="rewards-arrow-img" src={rew} />
          </Box>
          <Box className="points-box">
            <Box className="box-1">
              <Img src={back} className="box-1_img" />
              <Text className="points-text" fontFamily={'content'}>
                points
              </Text>
              <Box className="inside-box-1">
                <Img src={point} className="inside-box-1_img" />
                <Text className="inside-points-text" fontFamily={'content'}>
                  {(curretQuestOptions?.gameMinScore || 100) +
                    '/' +
                    (curretQuestOptions?.gameTotalScore
                      ? curretQuestOptions?.gameTotalScore?.maxScore || 100
                      : '')}
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
          <Box className="next-btn">
            <Img
              src={next}
              onClick={() => getData(data)}
              cursor={'pointer'}
            />
          </Box>
        </>
      )}
    </>
  );
};
export default Completion;
