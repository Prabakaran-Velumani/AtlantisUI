import { Box, Img, Text } from '@chakra-ui/react';
import rew from 'assets/img/screens/Reward Bar.png';
import back from 'assets/img/screens/back.png';
import point from 'assets/img/screens/points.png';
import next from 'assets/img/screens/next.png';
import { useEffect, useState } from 'react';
import { getImages } from 'utils/game/gameService';
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
  data
}) => {
  const [imgb, setbImg] = useState<any>();
  const [showComplete, setShowComplete] = useState(false);
  useEffect(() => {
    setShowComplete(true);
    setTimeout(() => {
      setShowComplete(false);
    }, 1000);
  }, []);
  useEffect(() => {
    const fetchDatass = async () => {
      if (formData?.gameBadge) {
        const result = await getImages(4);

        if (result?.status !== 'Success') {
          console.error('getbackground error:' + result?.message);
          return;
        }
        const selectedGasId = formData?.gameBadge;
        const selectedGasImage = result?.data.find(
          (gas: any) => gas.gasId === selectedGasId,
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
        style={{
          transform: `scale(${showComplete ? 0.5 : 1})`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        <Img src={imageSrc} className="bg-img" />
      </Box>
      {!showComplete && (
        <>
          <Box className="title">
            <Text fontFamily={'AtlantisText'} textAlign={'center'}>
              {formData?.gameScreenTitle}
            </Text>
          </Box>
          <Box className="congratulations">
            <Box className="content">
              {formData?.gameCompletedCongratsMessage}
            </Box>
            {formData?.gameIsSetCongratsScoreWiseMessage === 'true' && (
              <>
                {formData?.gameMinimumScoreCongratsMessage}
                {formData?.gameLessthanDistinctionScoreCongratsMessage}
                {formData?.gameAboveDistinctionScoreCongratsMessage}
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
                  {(formData?.gameMinScore || 100) +
                    '/' +
                    (formData?.gameTotalScore
                      ? formData?.gameTotalScore?.maxScore || 100
                      : '')}
                </Text>
              </Box>
            </Box>
            {formData?.gameIsSetBadge === 'true' && (
              <Box className="box-2">
                <Img src={back} className="box-2_img" />
                <Text className="points-text" fontFamily={'content'}>
                  {formData?.gameBadgeName}
                </Text>
                {formData?.gameBadge && (
                  <Img className="inside-img" src={imgb} />
                )}{' '}
              </Box>
            )}
          </Box>
          <Box className="next-btn">
            <Img
              src={next}
              onClick={()=>getData(data)}
              // cursor={'pointer'}
            />
          </Box>
        </>
      )}
    </>
  );
};
export default Completion;
