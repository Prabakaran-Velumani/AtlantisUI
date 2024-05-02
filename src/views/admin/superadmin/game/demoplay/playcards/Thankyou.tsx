import { Box, Button, Icon, Img, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ImHappy } from 'react-icons/im';
import { TfiFaceSad } from 'react-icons/tfi';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { FaRegFaceMehBlank } from 'react-icons/fa6';
import { BsEmojiNeutral } from 'react-icons/bs';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { FaRegTired } from 'react-icons/fa';
import next from 'assets/img/screens/next.png'
import Feedback from 'assets/img/screens/Feedback.png';
import {
  FaHatCowboy,
  FaRegCommentDots,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from 'react-icons/fa';
import { debounce } from 'lodash';

// import { updatePreviewLogs } from 'utils/game/gameService';

interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const ThankYou: React.FC<{
  setCurrentScreenId: any;
  formData: any;
  imageSrc: any;
  preloadedAssets: any;
}> = ({ formData, imageSrc, setCurrentScreenId, preloadedAssets }) => {
  const renderContentTy = () => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;

    const parts = formData.gameThankYouMessage?.split(linkRegex);

    const contentWithLinks = parts?.map((part: any, index: any) => {
      if (linkRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            style={{ color: '#caa784', textDecoration: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      } else {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
    });

    return <React.Fragment>{contentWithLinks}</React.Fragment>;
  };
  const feedbackOptions = [
    formData.gameContent,
    formData.gameRecommendation,
    formData.gameRelevance,
    formData.gameGamification,
    formData.gameBehaviour,
    formData.gameOthers,
  ];
  const countfbOptions = feedbackOptions.filter(option => option !== '' && option !== 'false' && option !== undefined && option !== null).length;
    // ------------------------------------------Mohana

  const propertiesToCheck = [
    'gameContent',
    'gameRelevance',
    'gameBehaviour',
    'gameRecommendation',
    'gameGamification',
    'gameOthers',
  ];

  // Filter properties where the value is 'true'
  const trueValuesArray = propertiesToCheck.filter(property => formData[property] === 'true');
  const  [playerInputs,setPlayerInputs] = useState<string>(null);

  var thirdValue = "";
  if (trueValuesArray.length >= 3) {
    thirdValue = trueValuesArray[2];
    // console.log("Third Positioned Value:", thirdValue);
  }
  // alert(thirdValue);
  // ----------------------------------------------------
  const styleflex = {};

  if (countfbOptions === 1) {
    Object.assign(styleflex, {
      display: 'flex',
      flexDirection: 'row', // Display in a column for 1 or 3 divs
      justifyContent: 'center',
    });
  }

//  const updateDatabase = async () => {
//   try { 
//     const apiResponse = await updatePreviewLogs(playerInputs);
//     if(apiResponse.status == 200){
//       console.log("Player's manual Feedback updated");
//     }
//     else{
//       console.log("failed - ",apiResponse?.message);
//     }
//     // if (apiResponse) {
//     //   setPlayerInputs((prevState) => ({
//     //     ...prevState,
//     //     reflection: apiResponse.reflection,
//     //   }));
//     // }
//   } catch (error) {
//     console.error('Error during API call kishore:', error);
//     console.log("playerInputs",playerInputs);

//   }
// };

useEffect(()=>{
  /***
  const debouncedUpdateDatabase = debounce(updateDatabase, 500); 
  return ()=>{
    debouncedUpdateDatabase.cancel();
  };
   */
},[playerInputs])
  return (
    <>
      {preloadedAssets.Thankyou && (
        <Box className='section-thankyou-screen Thankyou-section'>
          <Img src={preloadedAssets.Thankyou} className="bg-img bg-thankyou" />
          {/* <Box className="thankyou-screen-box">
         </Box> */}
          <Box className="thankyou-screen">
            <Box className='content'>
              <Box
                w={'100%'}
                fontFamily={'content'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                className="tq-msg"
              >
                <Box
                  w={'80%'}
                  mt={{ base: '0px', sm: '0px', md: '20px', lg: '20px' }}
                  lineHeight={1}
                  textAlign={'center'}
                  color="#D9C7A2"
                  fontWeight="300"
                >
                  {renderContentTy()}
                </Box>
              </Box>

              {formData.gameIsCollectLearnerFeedback === 'true' && (
                <>
                  <Text
                    className="about-experience"
                    fontSize={18}
                    fontWeight="300"
                    textAlign="center"
                  >
                    <Img src={Feedback} alt="rew" w={'82%'} h={'23px'} />
                    How do you feel about the experience?
                  </Text>
                  <Box className="collect-learner-feedback">
                    <Box className="grid" style={styleflex}>
                      {formData.gameContent === 'true' && (
                        <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameContent' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>

                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Content
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              marginTop: '5px',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel" >
                              <p>
                                &#128522; I learned something useful
                              </p>
                            </div>
                            <div className="buttonfeel2" >
                              <p>
                                &#128542; It wasn't useful
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {formData.gameRelevance === 'true' && (
                        <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameRelevance' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>

                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Relevance
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel" >
                              {/* &#127891; */}
                              <p>
                                <Icon as={FaHatCowboy} /> I'll apply what I
                                learned
                              </p>
                            </div>
                            <div className="buttonfeel2" >
                              <p>
                                &#128542; It's not relevant to
                                me
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {formData.gameBehaviour === 'true' && (
                        <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameBehaviour' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>

                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Behaviour
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel" >
                              <p>
                                &#128526; I understood what
                                I can do differently
                              </p>
                            </div>
                            <div className="buttonfeel2" >
                              <p>
                                {' '}
                                &#128566; I am not sure
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {formData.gameRecommendation === 'true' && (
                        <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameRecommendation' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>

                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Recommendation
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel" >
                              <p>
                                {' '}
                                &#128522; I would recommend
                                this game to others
                              </p>
                            </div>
                            <div className="buttonfeel2" >
                              <p>
                                {' '}
                                &#128542; I wouldn't recommend
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {formData.gameGamification === 'true' && (
                        <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameGamification' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>

                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Gamification
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel" >
                              <p>
                                &#128077; I would like to learn
                                via games
                              </p>
                            </div>
                            <div className="buttonfeel2" >
                              <p>
                                {' '}
                                &#128078; I don't like this
                                format
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.gameOthers === 'true' && (
                        <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameOthers' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>

                          <Text
                            fontSize={16}
                            fontWeight="300"
                            letterSpacing="0px"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Anything else you'd like to share
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              border: '2px solid #b3a484',
                            }}
                          >
                            <div className="buttonfeel3">
                              {/* <p>
                                <Icon as={FaRegCommentDots} />
                              </p> */}

                              <Textarea
                                    paddingTop="20px"
                                    outline="none"
                                    focusBorderColor="none"
                                    border="none"
                                    width="350px"
                                    color="#D9C7A2"
                                    height={{
                                      base: '20px',
                                      sm: '30px',
                                      md: '50px',
                                      lg: '100px',
                                    }}
                                    _focus={{ boxShadow: 'none', border: 'none' }}
                                    fontFamily="AtlantisText"
                                    // onBlur={updateDatabase}
                                    onChange={(e:any)=>setPlayerInputs(e.target.value)}
                                  />
                            </div>
                          </div>
                        </div>
                      )}
                      {formData.gameFeedBack === 'true' && (
                        <>
                          <div className="last-item">
                            <Text
                              className=""
                              fontSize={18}
                              fontWeight="300"
                              textAlign="center"
                            >
                              {' '}
                              Could you please share your feedback with us on the
                              below link:
                            </Text>
                            <Text
                              className=""
                              fontSize={18}
                              fontWeight="300"
                              textAlign="center"
                            >
                              <a
                                href={formData.gameFeedBackLink}
                                style={{
                                  color: '#caa784',
                                  textDecoration: 'underline',
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {formData.gameFeedBackLink}
                              </a>
                            </Text>
                          </div>

                        </>
                      )}
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Box className='next-btn'>
            <Img src={next} onClick={() => setCurrentScreenId(13)} />
          </Box>
          {/* <Box className='next-btn' style={{ position: 'absolute', display:'flex', top:'100px', right:'0' , justifyContent:'center'}}>
           <Img src={next} />
         </Box> */}
          {/* <Box className='next-btn' style={{ position: 'fixed', bottom: '-1', right: '100' }}>
           <Img src={next} />
         </Box> */}
        </Box>
      )}
    </>
  );
};
export default ThankYou;


