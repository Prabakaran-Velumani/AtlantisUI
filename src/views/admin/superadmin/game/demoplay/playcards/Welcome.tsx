import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Img,
  Text,

  // brindha end
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { getGameById, getSkills } from 'utils/game/gameService';
import { motion } from 'framer-motion';
import rew from 'assets/img/screens/Reward Bar.png';
import back from 'assets/img/screens/back.png';
import write from 'assets/img/screens/Writing.png';
import next from 'assets/img/screens/next.png';
import { useParams } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { MotionConfig } from 'framer-motion';
import { preloadedImages } from 'utils/hooks/function';
// import AudioEffect from './Audio';
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;

}

const extractLink = (text: any) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (text) {
    const urls = text?.match(urlRegex);

    return urls ? urls[0] : null;
  }
  return null;
};
const Welcome: React.FC<{
  setCurrentScreenId: any;
  formData: any;
  imageSrc: any;
  preview: any;
  intro: any;
  screen: any;
  preloadedAssets:any;
  setprevScreenId:any;
  currentScreenId:any;
  setPreLogDatas:any;
  getPrevLogDatas:any;
}> = ({ formData, imageSrc, preview, setCurrentScreenId, intro, screen, preloadedAssets,currentScreenId,setprevScreenId,setPreLogDatas,getPrevLogDatas }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>([]);
  const [apSkl, setApSkl] = useState([]);
  const [authorArray, setauthorArray] = useState<any[]>([]);
  const [showComplete, setShowComplete] = useState(false);
  useEffect(() => {
    setShowComplete(true);
    setTimeout(() => {
      setShowComplete(false);
    }, 1000);
  }, []);
  const fetch = async () => {
    const result = await getGameById(formData?.gameId);
    if (result?.status !== 'Success') {
      setProfile([]);
      return console.log('getbackruond error:' + result?.message);
    } else {
      setProfile(result.data);
    }
    const res = await getSkills();
    if (res?.status === 'Success') {
      setApSkl(res?.data);
    }
  };
  const customStylesicon = {
    cursor: 'pointer',
    color: '#D9C7A2',
    marginRight: '4px',
  };
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (profile.gameSkills) {
      const Array = profile.gameSkills?.split(',');
      setauthorArray(Array);
    }
  }, [profile]);

  const findSkillName = (authorNumber: any) => {
    const matchedSkill = apSkl.find(
      (option: any) => option.id === Number(authorNumber),
    );
    return matchedSkill ? matchedSkill.name : null;
  };
  const renderContent = () => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const parts = formData?.gameAdditionalWelcomeNote?.split(linkRegex);
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
  const [isPlay, setIsPlay] = useState(false);
  // const audioRef = React.useRef(null);

  const data =
    formData?.gameLearningOutcome !== ''
      ? formData?.gameLearningOutcome?.split('\n')
      : '';

  const extractLink = (text: any) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (text) {
      const urls = text?.match(urlRegex);

      return urls ? urls[0] : null;
    }
    return null;
  };
  const link = extractLink(formData.gameAdditionalWelcomeNote);
  const screenIdset = getPrevLogDatas.screenIdSeq[getPrevLogDatas.screenIdSeq.length -1];
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{delay: 0.5, duration: 1 }}
      >
        <Box className="welcome-screen">
          <Box className="welcome-screen-box">
            <Img src={screen} className="welcome-pad" />
          </Box>
          <Box className="top-title">
            <Text
              className="title"
              fontSize={{
                base: '13px',
                sm: '13px',
                md: '15px',
                lg: '20px',
              }}
            >
              {formData.gameTitle}
            </Text>
            {formData.gameIsShowGameDuration === 'true' && (
              <Text
                className="duration"
                fontSize={{
                  base: '11px',
                  sm: '12px',
                  md: '13px',
                  lg: '15px',
                }}
                mt={'2px'}
                fontFamily={'content'}
                position={'absolute'}
                display={'flex'}
                alignItems={'center'}
              >
                <>
                  {' '}
                  <Icon as={FaClock} style={customStylesicon} />{' '}
                  <span style={customStylesicon}>
                    {formData.gameDuration > 1
                      ? formData.gameDuration + ' mins'
                      : 'Few mins'}
                  </span>
                </>
              </Text>
            )}
          </Box>
          <Box className="content-box" fontFamily={'gametext'}>
            <Box w={'60%'} className="content">
              {formData.gameIsShowStoryline === 'true' && (
                <Text
                  className="text"
                  mt={'20px'}
                  fontSize={{
                    base: '11px',
                    sm: '12px',
                    md: '13px',
                    lg: '15px',
                  }}
                  fontFamily={'content'}
                >
                  {formData.gameStoryLine}
                </Text>
              )}
              {formData.gameIsShowSkill === 'true' ||
              formData.gameIsShowLearningOutcome === 'true' ? (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{delay: 1, duration: 0.5 }}
                >
                  <Img
                    className="rewards-arrow-img"
                    src={preloadedAssets.rew}
                    mt={'25px'}
                    alt="rew"
                    w={'100%'}
                    h={'20px'}
                  />
                </motion.div>
              ) : (
                ''
              )}
              <Box
                display={'flex'}
                className={
                  formData.gameIsShowSkill === 'true' ||
                  formData.gameIsShowLearningOutcome === 'true'
                    ? 'rewards-box'
                    : 'empty-rewards-box'
                }
              >
                {formData.gameIsShowSkill === 'true' && (
                  <>
                    <Box className="box-1">
                      <Img src={preloadedAssets.back} className="bg-img" />
                      <Text
                        className="skill-text"
                        style={{ textAlign: 'center' }}
                        fontFamily={'content'}
                        color={'black'}
                      >
                        Skills
                      </Text>
                      <Box
                        className="inside-box"
                        transform={'translate(-2px, -125px)'}
                        mt={'10px'}
                        w={'100%'}
                        h={'60px'}
                        overflowY={'scroll'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={'column'}
                      >
                        {authorArray
                          .map((authorItem, index) => {
                            const skillName = findSkillName(authorItem);
                            return skillName;
                          })
                          .filter((skillName) => skillName !== null)
                          .map((filteredSkillName, index) => (
                            <Box display={'flex'} key={index}>
                              <Img
                                src={preloadedAssets.write}
                                w={'25px'}
                                h={'25px'}
                              />
                              <Box>
                                <Box
                                  className="text-wrapper"
                                  display={'flex'}
                                  w={'50px'}
                                  h={'20px'}
                                  justifyContent={'space-between'}
                                  font-weight={'300'}
                                  margin-left={'5px'}
                                >
                                  <Text color={'#D9C7A2'}>
                                    {filteredSkillName}
                                  </Text>
                                  <Text></Text>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  </>
                )}
                {formData.gameIsShowLearningOutcome === 'true' && (
                  <>
                    <Box className="box-1">
                      <Img src={preloadedAssets.back} className="bg-img" />
                      <Text
                        className="skill-text"
                        style={{ textAlign: 'center' }}
                        fontFamily={'content'}
                        color={'black'}
                      >
                        Learning Outcomes
                      </Text>
                      <Box
                        className="inside-box"
                        transform={'translate(-2px, -125px)'}
                        mt={'10px'}
                        w={'100%'}
                        h={'60px'}
                        overflowY={'scroll'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={'column'}
                      >
                        {data &&
                          data.map((it: any, ind: number) => {
                            const bulletIndex = it.indexOf('\u2022');
                            const contentAfterBullet =
                              bulletIndex !== -1
                                ? it.slice(bulletIndex + 1).trim()
                                : it;
                            return (
                              <Box display={'flex'} key={ind}>
                                <Img
                                  src={preloadedAssets.write}
                                  w={'25px'}
                                  h={'25px'}
                                />
                                <Box>
                                  <Box
                                    className="text-wrapper"
                                    display={'flex'}
                                    w={'50px'}
                                    h={'20px'}
                                    justifyContent={'space-between'}
                                    font-weight={'300'}
                                    margin-left={'5px'}
                                  >
                                    <Text color={'#D9C7A2'}>
                                      {contentAfterBullet}
                                    </Text>
                                    <Text></Text>
                                  </Box>
                                </Box>
                              </Box>
                            );
                          })}
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
              {formData.gameIsShowAuhorName === 'true' && (
                <Box
                  w={'100%'}
                  h={'50px'}
                  position={'relative'}
                  className="author"
                >
                  <Text
                    position={'absolute'}
                    right={'0px'}
                    left={'0px'}
                    bottom={'0px'}
                    top={'20px'}
                    fontSize={{
                      base: '11px',
                      sm: '12px',
                      md: '13px',
                      lg: '15px',
                    }}
                    fontFamily={'content'}
                    color={'black'}
                  >
                    *Author* <br /> {formData.gameAuthorName}
                  </Text>
                </Box>
              )}
              {formData.gameIsShowAdditionalWelcomeNote === 'true' && (
                <Box
                  // w={'100%'}
                  // h={'50px'}
                  // position={'relative'}
                  className="renderContent"
                >
                  <Text
                    fontSize={{
                      base: '11px',
                      sm: '12px',
                      md: '13px',
                      lg: '15px',
                    }}
                    fontFamily={'content'}
                  >
                    {renderContent()}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
          <Box className="next-btn">
            <Img
              src={preloadedAssets.next}
              onClick={() =>{
                setCurrentScreenId(12); 
                if(screenIdset !==  currentScreenId)
                  {
                     setPreLogDatas((prev:any) => ({
                  ...prev,
                  screenIdSeq: [...prev.screenIdSeq, currentScreenId]
                   }));
                  }
               
            }}
            />
          </Box>
        </Box>
      </motion.div>
    </>
  );
};
export default Welcome;
