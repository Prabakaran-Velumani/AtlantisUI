import { Box, Img, Text } from '@chakra-ui/react';
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
  completionScreenQuestOptions,
}) => {
  const [imgb, setbImg] = useState<any>();
  const [showComplete, setShowComplete] = useState(false);
  const [curretQuestOptions, setCurrentQuestOptions] = useState(
    completionScreenQuestOptions.find(
      (quest: any) => quest.questNo == currentQuestNo,
    ),
  );
  const { profile, setProfile } = useContext(ScoreContext);
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

        const imageUrl =
          selectedGasImage?.gasAssetImage || 'defaultImageURL.jpg';
        setbImg(imageUrl);
      }
    };
    fetchDatass();
  }, []);

  return (
    <>
      <Box
        className="comple-screen"
        // style={{
        //   transform: `scale(${showComplete ? 0.5 : 1})`,
        //   transition: 'transform 0.5s ease-in-out',
        // }}
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
          {/* <Box w={'500px'}> */}
          <Box className="title" transform="translate(650px,84px) !important">
            <Text fontFamily={'AtlantisText'} textAlign={'center'}>
              {curretQuestOptions?.gameScreenTitle}
            </Text>
          </Box>
          <Box className="content-box">
            {/* <Box className="congratulations"> */}
            {/* <Box className="content">
              {curretQuestOptions?.gameCompletedCongratsMessage}
            </Box> */}
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
          <Box className="points-box" transform="translate(0px,200px) !important">
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
          {/* </Box> */}
          <Box className="next-btn" transform="translate(0px,400px) !important">
            <Img src={next} onClick={() => getData(data)} cursor={'pointer'} />
          </Box>
          {/* </Box> */}
        </>
      )}
    </>
  );
};
export default Completion;
