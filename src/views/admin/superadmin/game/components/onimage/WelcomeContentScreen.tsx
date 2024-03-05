import {
  Box,
  Img,
  Icon,
  Text,
  // brindha end
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  getGameById,
  getSkills,
} from 'utils/game/gameService';
import rew from 'assets/img/screens/Reward Bar.png';
import back from 'assets/img/screens/back.png';
import write from 'assets/img/screens/Writing.png';
import { useParams } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

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
const WelcomeContentScreen: React.FC<{
  formData: any;
  imageSrc: any;
  preview: any;
  preloadedAssets?: any;
}> = ({ formData, imageSrc, preview, preloadedAssets}) => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>([]);
  const [apSkl, setApSkl] = useState([]);
  const [authorArray, setauthorArray] = useState<any[]>([]);
  const {currentTab } = useSelector((state: RootState) => state.preview);

  const [data,setData] = useState<any[]>([]);
  const fetch = async () => {
    const result = await getGameById(id);
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
    const dataLearn =
    formData?.gameLearningOutcome !== null
      ? formData?.gameLearningOutcome?.split('\n')
      : [];
      setData(dataLearn);
      console.log(formData?.gameLearningOutcome)
  }, []);

  useEffect(() => {
    if (profile.gameSkills) {
      const Array = profile.gameSkills.split(',');
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
  
  return (
    <>
        <motion.div
          initial={{ opacity: 0, background: '#000' }}
          animate={{ opacity: 1, background: '#0000' }}
          transition={{ duration: .5, delay: 0.5 }}
        >
     
     {imageSrc && preview && currentTab == 3 ? (
          <Box className="welcome-screen">
            <Box className="welcome-screen-box">
              <Img src={imageSrc} className="bg-img" />
            </Box>
            <Box className="content-box" fontFamily={'gametext'}>
              <Text
                className="title"
                fontSize={{
                  base: '13px',
                  sm: '13px',
                  md: '15px',
                  lg: '20px',
                }}
              >
                {formData?.gameTitle}
              </Text>
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
              <Box w={'60%'} className="content">
                  <Text
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
                  <Img src={rew} mt={'25px'} alt="rew" w={'100%'} h={'20px'} />
                
                <Box
                  display={'flex'}
                  className={
                       'rewards-box'
                  }
                >
                    <>
                      <Box className="box-1">
                        <Img src={back} className="bg-img" />
                        <Text
                          className="skill-text"
                          style={{ textAlign: 'center' }}
                          fontFamily={'content'}
                          color={'black'}
                        >
                          Skills
                        </Text>
                        <Box
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
                                <Img src={write} w={'25px'} h={'25px'} />
                                <Box>
                                  <Box
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
                    <>
                      <Box className="box-1">
                        <Img src={back} className="bg-img" />
                        <Text
                          className="skill-text"
                          style={{ textAlign: 'center' }}
                          fontFamily={'content'}
                          color={'black'}
                        >
                          Learning Outcomes
                        </Text>
                        <Box
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
                                  <Img src={write} w={'25px'} h={'25px'} />
                                  <Box>
                                    <Box
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
                </Box>

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
                  <Box
                    w={'100%'}
                    h={'50px'}
                    position={'relative'}
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
              </Box>
            </Box>
       </Box>
      ) : (
          <Box className="welcome-screen">
            <Box className="welcome-screen-box">
              <Img src={imageSrc} className="bg-img" />
            </Box>
            <Box className="content-box" fontFamily={'gametext'}>
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
              <Box w={'60%'} className="content">
                {formData.gameIsShowStoryline === 'true' && (
                  <Text
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
                  <Img src={rew} mt={'25px'} alt="rew" w={'100%'} h={'20px'} />
                ) : (
                  ''
                )}
                <Box
                  display={'flex'}
                  className={
                    formData.gameIsShowSkill == 'true' ||
                    formData.gameIsShowLearningOutcome === 'true'
                      ? 'rewards-box'
                      : 'empty-rewards-box'
                  }
                >
                  {formData.gameIsShowSkill === 'true' && (
                    <>
                      <Box className="box-1">
                        <Img src={back} className="bg-img" />
                        <Text
                          className="skill-text"
                          style={{ textAlign: 'center' }}
                          fontFamily={'content'}
                          color={'black'}
                        >
                          Skills
                        </Text>
                        <Box
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
                                <Img src={write} w={'25px'} h={'25px'} />
                                <Box>
                                  <Box
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
                        <Img src={back} className="bg-img" />
                        <Text
                          className="skill-text"
                          style={{ textAlign: 'center' }}
                          fontFamily={'content'}
                          color={'black'}
                        >
                          Learning Outcomes
                        </Text>
                        <Box
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
                                  <Img src={write} w={'25px'} h={'25px'} />
                                  <Box>
                                    <Box
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
                    w={'100%'}
                    h={'50px'}
                    position={'relative'}
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
          </Box>
      )}
      </motion.div>
    </>
  );
};
export default WelcomeContentScreen;
