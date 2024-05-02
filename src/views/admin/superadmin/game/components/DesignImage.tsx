import { Box, Img } from "@chakra-ui/react";
import CompletionContentScreen from './onimage/CompletionScreen';
import ReflectionContentScreen from './onimage/ReflectionScreen';
import TakeAwaysContentScreen from './onimage/TakeAwaysScreen';
import TyContentScreen from './onimage/TyContentScreen';
import WelcomeContentScreen from './onimage/WelcomeContentScreen';


const DesignImage:React.FC<{
    currentTab?:any,
    selectedBadge?:any,
    formData?:any,
    ScreenMainImages?:any,
    compliData?:any,
    setCompliData?:any,
    CompKeyCount?:any,
    reflectionQuestions?:any,
    reflectionQuestionsdefault?:any,
}> = ({
    currentTab,
    selectedBadge,
    formData,
    ScreenMainImages,
    compliData,
    setCompliData,
    CompKeyCount,
    reflectionQuestions,
    reflectionQuestionsdefault,

}) => {

    return (
        <Box className="Images">
        {currentTab === 0 && (
          <CompletionContentScreen
            selectedBadge={selectedBadge}
            formData={formData}
            imageSrc={ScreenMainImages[currentTab]}
            compliData={compliData}
            setCompliData={setCompliData}
            CompKeyCount={CompKeyCount}
          />
        )}
        {currentTab === 1 && (
          <Box className="LearderBoards">
            <Img
              src={ScreenMainImages[currentTab]}
              alt="Your Image"
              className="LearderBoards-Img"
            // Maintain aspect ratio and cover the container
            />
          </Box>
        )}
        {currentTab === 2 && (
          <ReflectionContentScreen
            preview={false}
            formData={formData}
            imageSrc={ScreenMainImages[currentTab]}
            reflectionQuestions={reflectionQuestions}
            reflectionQuestionsdefault={reflectionQuestionsdefault}
          />
        )}
        {currentTab === 3 && (
          <TakeAwaysContentScreen
            preview={false}
            formData={formData}
            imageSrc={ScreenMainImages[currentTab]}
          />
        )}
        {currentTab === 4 && (
          <WelcomeContentScreen
            preview={false}
            formData={formData}
            imageSrc={ScreenMainImages[currentTab]}
          />
        )}
        {currentTab === 5 && (
          <TyContentScreen
            preview={false}
            formData={formData}
            imageSrc={ScreenMainImages[currentTab]}
          />
        )}
      </Box>
    )
}

export default DesignImage;