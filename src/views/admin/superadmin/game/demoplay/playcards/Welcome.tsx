import {
  Box,
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
}> = ({ formData, imageSrc, preview, setCurrentScreenId, intro, screen }) => {
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

  return (
    <>
      {true && (
        <>
          <Box
            position="relative"
            maxW="100%"
            w={'100vw'}
            height="100vh"
            backgroundImage={imageSrc}
            backgroundSize={'cover'}
            backgroundRepeat={'no-repeat'}
            className="chapter_potrait"
          >
            <Grid
              templateColumns="repeat(1, 1fr)"
              gap={4}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              className="welcome_screen_grid"
            >
              <GridItem colSpan={1}>
                <Box
                  w={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
                  position={'relative'}
                >
                  <Img
                    src={screen}
                    className="welcome_screen_image"
                    loading="lazy"
                  />
                  <Box
                    className={'welcome_screen_image'}
                    position={'absolute'}
                    top={'22%'}
                    display={'flex'}
                    justifyContent={'center'}
                    h={{
                      base: '49% !important',
                      sm: '69% !important',
                      md: '77% !important',
                      '2xl': '50% !important',
                    }}
                  >
                    <Box w={'65%'}>
                      <Box
                        w={'100%'}
                        display={'flex'}
                        justifyContent={'center'}
                      >
                        <Box w={'50%'}>
                          <Text
                            color={'#D9C7A2'}
                            fontSize={{
                              base: '13px',
                              sm: '13px',
                              md: '15px',
                              lg: '20px',
                            }}
                            fontFamily={'AtlantisText'}
                            textAlign={'center'}
                          >
                            {formData.gameTitle}
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        w={'100%'}
                        display={'flex'}
                        justifyContent={'center'}
                      >
                        <Box w={'50%'}>
                          {formData.gameIsShowGameDuration === 'true' && (
                            <Text
                              fontSize={{
                                base: '11px',
                                sm: '12px',
                                md: '13px',
                                lg: '15px',
                              }}
                              fontFamily={'AtlantisContent'}
                              textAlign={'center'}
                            >
                              <>
                                {' '}
                                <Icon
                                  as={FaClock}
                                  style={customStylesicon}
                                />{' '}
                                <span style={customStylesicon}>
                                  {formData.gameDuration > 1
                                    ? formData.gameDuration + ' mins'
                                    : 'Few mins'}
                                </span>
                              </>
                            </Text>
                          )}
                        </Box>
                      </Box>
                      <Box w={'100%'} h={'auto'}>
                        {formData.gameIsShowStoryline === 'true' && (
                          <Text
                            fontSize={'1.5vw'}
                            fontFamily={'AtlantisText'}
                            color={'#D9C7A2'}
                            textAlign={'center'}
                          >
                            {formData.gameStoryLine}
                          </Text>
                        )}
                        <motion.div
                          initial={{ opacity: 0, scale: 1, y: 100 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Img
                            src={rew}
                            mt={{ base: '', sm: '10px', md: '25px' }}
                            alt="rew"
                            w={'100%'}
                            h={'20px'}
                          />
                        </motion.div>
                        <Box
                          w={'100%'}
                          display={'flex'}
                          justifyContent={'center'}
                        >
                          <Box
                            w={'70%'}
                            display={'flex'}
                            justifyContent={
                              formData.gameIsShowSkill === 'true' &&
                              formData.gameIsShowLearningOutcome === 'true'
                                ? 'space-between'
                                : 'center'
                            }
                          >
                            {formData.gameIsShowSkill === 'true' && (
                              <Box w={'50%'} h={'auto'} position={'relative'}>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                  <Img src={back} w={'100%'} h={'100%'} />
                                  <Box
                                    w={'100%'}
                                    h={'auto'}
                                    position={'absolute'}
                                    top={'4px'}
                                  >
                                    <Text
                                      // className="skill-text"
                                      style={{ textAlign: 'center' }}
                                      fontFamily={'AtlantisContent'}
                                      color={'black'}
                                      fontSize={'1.5vw'}
                                    >
                                      Skills
                                    </Text>
                                    <Box
                                      w={'100%'}
                                      className={'skill_content'}
                                      mt={{ base: '', md: '10px' }}
                                    >
                                      {authorArray
                                        .map((authorItem, index) => {
                                          const skillName =
                                            findSkillName(authorItem);
                                          return skillName;
                                        })
                                        .filter(
                                          (skillName) => skillName !== null,
                                        )
                                        .map((filteredSkillName, index) => (
                                          <Box
                                            display={'flex'}
                                            key={index}
                                            w={'100%'}
                                            justifyContent={'center'}
                                          >
                                            <Img
                                              src={write}
                                              w={{
                                                base: '25px',
                                                sm: '25px',
                                                md: '25px',
                                                lg: '35px',
                                              }}
                                              h={{
                                                base: '25px',
                                                sm: '25px',
                                                md: '25px',
                                                lg: '35px',
                                              }}
                                              mt={index === 0 ? '10px' : ''}
                                            />
                                            <Box>
                                              <Box
                                                display={'flex'}
                                                w={'50px'}
                                                h={'20px'}
                                                justifyContent={'space-between'}
                                                fontWeight={'300'}
                                                marginLeft={'5px'}
                                                lineHeight={0.9}
                                                mt={index === 0 ? '10px' : ''}
                                              >
                                                <Text
                                                  fontSize={'1.5vw'}
                                                  color={'#D9C7A2'}
                                                  fontFamily={'AtlantisContent'}
                                                >
                                                  {filteredSkillName}
                                                </Text>
                                              </Box>
                                            </Box>
                                          </Box>
                                        ))}
                                    </Box>
                                  </Box>
                                </motion.div>
                              </Box>
                            )}
                            {formData.gameIsShowLearningOutcome === 'true' && (
                              <Box w={'50%'} h={'auto'} position={'relative'}>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.5, delay: 1 }}
                                >
                                  <Img src={back} w={'100%'} h={'100%'} />
                                  <Box
                                    w={'100%'}
                                    h={'auto'}
                                    position={'absolute'}
                                    top={'4px'}
                                  >
                                    <Text
                                      // className="skill-text"
                                      style={{ textAlign: 'center' }}
                                      fontFamily={'AtlantisContent'}
                                      fontSize={'1.1vw'}
                                    >
                                      Learning Outcomes
                                    </Text>
                                    <Box
                                      w={'100%'}
                                      className={'skill_content'}
                                      ml={'20px'}
                                      mt={{ base: '', md: '10px' }}
                                      display={'flex'}
                                      justifyContent={'center'}
                                      flexDirection={'column'}
                                    >
                                      {data &&
                                        data.map((it: any, ind: number) => {
                                          const bulletIndex =
                                            it.indexOf('\u2022');
                                          const contentAfterBullet =
                                            bulletIndex !== -1
                                              ? it.slice(bulletIndex + 1).trim()
                                              : it;
                                          return (
                                            <Box
                                              display={'flex'}
                                              key={ind}
                                              w={'78%'}
                                              justifyContent={'center'}
                                              mt={ind === 0 ? '50px' : ''}
                                            >
                                              <Img
                                                src={write}
                                                w={{
                                                  base: '25px',
                                                  sm: '25px',
                                                  md: '25px',
                                                  lg: '35px',
                                                }}
                                                h={{
                                                  base: '25px',
                                                  sm: '25px',
                                                  md: '25px',
                                                  lg: '35px',
                                                }}
                                              />
                                              <Text
                                                color={'#D9C7A2'}
                                                fontFamily={'AtlantisContent'}
                                                fontSize={'1.5vw'}
                                              >
                                                {contentAfterBullet}
                                              </Text>
                                            </Box>
                                          );
                                        })}
                                    </Box>
                                  </Box>
                                </motion.div>
                              </Box>
                            )}
                          </Box>
                        </Box>
                        {formData.gameIsShowAdditionalWelcomeNote ===
                          'true' && (
                          <Box
                            w={'100%'}
                            h={'30px'}
                            position={'relative'}
                            className="renderContent"
                          >
                            <Text
                              fontSize={'1.5vw'}
                              fontFamily={'AtlantisText'}
                              color={'#D9C7A2'}
                              textAlign={'center'}
                            >
                              {renderContent()}
                            </Text>
                          </Box>
                        )}
                        {formData.gameIsShowAuhorName === 'true' && (
                          <Box
                            w={'100%'}
                            // h={'50px'}
                            position={'relative'}
                            className="author"
                          >
                            <Text
                              fontSize={'1.5vw'}
                              fontFamily={'AtlantisContent'}
                              color={'#D9C7A2'}
                              textAlign={'center'}
                              lineHeight={'1'}
                            >
                              *Author* <br /> {formData.gameAuthorName}
                            </Text>
                          </Box>
                        )}
                      </Box>
                      <Box
                        w={'64%'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'flex-end'}
                        position={'fixed'}
                        bottom={{ sm: '25px', md: '50px' }}
                      >
                        <Img
                          w={'100px'}
                          h={'41px'}
                          src={next}
                          // onClick={() => setCurrentScreenId(2)}
                          onClick={() => setCurrentScreenId(12)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};
export default Welcome;
