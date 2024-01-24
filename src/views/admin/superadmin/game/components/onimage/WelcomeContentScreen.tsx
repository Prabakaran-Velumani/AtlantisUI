import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Img,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
  useTheme,
  useToast,
  // brindha start
  Select,
  Textarea,
  Link,
  Slider,
  Image,
  IconButton,
  // brindha end
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import {
  gameDuplicateQuestionEntirely,
  getGameById,
  getImages,
  getSkills,
  updateGame,
} from 'utils/game/gameService';
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import BadgeImages from '../BadgeImages';
import { MdClose, MdOutlineCloudUpload } from 'react-icons/md';
import rew from 'assets/img/screens/Reward Bar.png';
import back from 'assets/img/screens/back.png';
import write from 'assets/img/screens/Writing.png';
import bar from 'assets/img/screens/Bar.png';
import fill from 'assets/img/screens/Fill.png';
import bull from 'assets/img/screens/bullet.png';
import batch from 'assets/img/screens/upback.png';
import TextField from 'components/fields/TextField';
import { useParams } from 'react-router-dom';
import { FaClock } from "react-icons/fa";
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const extractLink = (text: any) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
if(text){
  const urls = text?.match(urlRegex);

  return urls ? urls[0] : null;
}
return null
};
const WelcomeContentScreen: React.FC<{ formData: any; imageSrc: any }> = ({
  formData,
  imageSrc,
}) => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>([]);
  const [apSkl, setApSkl] = useState([]);
  const [authorArray, setauthorArray] = useState<any[]>([]);
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

  const parts = formData.gameAdditionalWelcomeNote?.split(linkRegex);

  const contentWithLinks = parts?.map((part:any, index:any) => {
    if (linkRegex?.test(part)) {
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
  // const link = extractLink(formData.gameAdditionalWelcomeNote);

  const data =
    formData.gameLearningOutcome !== ''
      ? formData.gameLearningOutcome?.split('\n')
      : '';

  return (
    <>
      { imageSrc && (
        <Box className='welcome-screen'>
          <Box className='welcome-screen-box'
            // w={{ base: '100%', sm: '100%', md: '100%', lg: '90%' }}
            // ml={{ base: '10px', sm: '10px', md: '20px', lg: '28px' }}
            // h={{ base: '150px', sm: '450px', md: '550px', lg: '450px' }}
            // backgroundImage={imageSrc}
            // backgroundRepeat={'no-repeat'}
            // backgroundSize={'contain'}
            // fontFamily={'content'}
            // // color="#D9C7A2"
            // display={'flex'}
            // justifyContent={'center'}
            // alignItems={'center'}
          >
             <Img src={imageSrc} className='bg-img' />
          </Box>
          <Box className='content-box'
            // h={'250px'}
            // color="#D9C7A2"
            fontFamily={'gametext'}
            // w={'100%'}
            // mt={{ base: '0px', sm: '0px', md: '10px', lg: '20px' }}
            // lineHeight={1}
            // display={'flex'}
            // justifyContent={'center'}
            // alignItems={'flex-start'}
            // textAlign={'center'}
          >
             <Text className='title'
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
                    fontSize={{
                      base: '11px',
                      sm: '12px',
                      md: '13px',
                      lg: '15px',
                    }}
                    mt={'2px'}
                    fontFamily={'content'}
                    position={'absolute'}
                    display= {'flex'}
                    alignItems= {'center'}

                  >
                   {/* Game Duration : {(formData.gameDuration > 1)?formData.gameDuration+"mins":"1mins"}*/}
                     <> <Icon as={FaClock} style={customStylesicon} /> <span style={customStylesicon}>{(formData.gameDuration > 1)?formData.gameDuration+" mins":"Few mins"}</span></>
                  </Text>
                )}
            <Box w={'60%'}  className='content'>             

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
                {formData.gameIsShowSkill === 'true' || formData.gameIsShowLearningOutcome === 'true' ? (
                  <Img src={rew} mt={'25px'} alt="rew" w={'100%'} h={'20px'} />
                ):''}
                <Box display={'flex'} className={formData.gameIsShowSkill == 'true' || formData.gameIsShowLearningOutcome === 'true' ? 'rewards-box' : 'empty-rewards-box'}>
                  {formData.gameIsShowSkill === 'true' && (
                    <>
                      <Box className='box-1'
                        // width={'105px'}
                        // backgroundImage={back}
                        // backgroundSize={'contain'}
                        // backgroundRepeat={'no-repeat'}
                        // h={'95px'}
                        // fontWeight={'600'}
                        // fontSize={'13px'}
                        // color={'#D9C7A2'}
                      >
                        <Img src={back} className='bg-img' />
                        <Text
                          className='skill-text'
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
                                    margin-left= {'5px'}
                                  >
                                    <Text color={'#D9C7A2'}>
                                      {filteredSkillName}
                                    </Text>
                                    <Text></Text>
                                  </Box>
                                  {/*<Box
                                    backgroundImage={bar}
                                    w={'50px'}
                                    h={'20px'}
                                    backgroundSize={'cover'}
                                    backgroundRepeat={'no-repeat'}
                                  >
                                   <Img
                                      src={fill}
                                      w={'20%'}
                                      h={'10px'}
                                      alt="fill"
                                    />
                                  </Box>*/}
                                </Box>
                              </Box>
                            ))}
                          {/*<Box display={'flex'}>
                            <Img src={write} w={'25px'} h={'25px'} />
                            <Box>
                              <Box
                                display={'flex'}
                                w={'50px'}
                                h={'20px'}
                                justifyContent={'space-between'}
                              >
                                <Text color={'#D9C7A2'}>tested</Text>
                                <Text>20%</Text>
                              </Box>
                              <Box
                                backgroundImage={bar}
                                w={'50px'}
                                h={'20px'}
                                backgroundSize={'cover'}
                                backgroundRepeat={'no-repeat'}
                              >
                                <Img
                                  src={fill}
                                  w={'20%'}
                                  h={'20px'}
                                  alt="fill"
                                />
                              </Box>
                            </Box>
                          </Box>*/}
                        </Box>
                      </Box>
                    </>
                  )}
{formData.gameIsShowLearningOutcome === 'true' && (
                    <>
                      <Box className='box-1'
                        // width={'105px'}
                        // backgroundImage={back}
                        // backgroundSize={'contain'}
                        // backgroundRepeat={'no-repeat'}
                        // h={'95px'}
                        // fontWeight={'600'}
                        // fontSize={'13px'}
                        // color={'#D9C7A2'}
                      >
                        <Img src={back} className='bg-img' />
                        <Text
                          className='skill-text'
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
                              return(
                             <Box display={'flex'} key={ind}>
                                <Img src={write} w={'25px'} h={'25px'} />
                                <Box>
                                  <Box
                                    display={'flex'}
                                    w={'50px'}
                                    h={'20px'}
                                    justifyContent={'space-between'}
                                     font-weight={'300'}
                                    margin-left= {'5px'}
                                  >
                                    <Text color={'#D9C7A2'}>
                                      {contentAfterBullet}
                                    </Text>
                                    <Text></Text>
                                  </Box>
                                  {/*<Box
                                    backgroundImage={bar}
                                    w={'50px'}
                                    h={'20px'}
                                    backgroundSize={'cover'}
                                    backgroundRepeat={'no-repeat'}
                                  >
                                   <Img
                                      src={fill}
                                      w={'20%'}
                                      h={'10px'}
                                      alt="fill"
                                    />
                                  </Box>*/}
                                </Box>
                              </Box>
                              )
                            })}
                          {/*<Box display={'flex'}>
                            <Img src={write} w={'25px'} h={'25px'} />
                            <Box>
                              <Box
                                display={'flex'}
                                w={'50px'}
                                h={'20px'}
                                justifyContent={'space-between'}
                              >
                                <Text color={'#D9C7A2'}>tested</Text>
                                <Text>20%</Text>
                              </Box>
                              <Box
                                backgroundImage={bar}
                                w={'50px'}
                                h={'20px'}
                                backgroundSize={'cover'}
                                backgroundRepeat={'no-repeat'}
                              >
                                <Img
                                  src={fill}
                                  w={'20%'}
                                  h={'20px'}
                                  alt="fill"
                                />
                              </Box>
                            </Box>
                          </Box>*/}
                        </Box>
                      </Box>
                    </>
                  )}
                  {/*{formData.gameIsShowLearningOutcome === 'true' && (
                    <Box className='box-2'
                      ml={'25px'}
                      h={{
                        base: '80px',
                        sm: '100px',
                        md: '100px',
                        lg: '100px',
                      }}
                      w={'80%'}
                      // overflowY={'scroll'}
                    > 
                      <Box>
                       <Text className='learner-outcomes'>Learner Outcomes</Text>
                      </Box>
                      <Box mt={'10px'}>
                      {data &&
                        data.map((it: any, ind: number) => {
                          const bulletIndex = it.indexOf('\u2022');
                          const contentAfterBullet =
                            bulletIndex !== -1
                              ? it.slice(bulletIndex + 1).trim()
                              : it;
                          return (
                            <Box
                              lineHeight={1}
                              display={'flex'}
                              listStyleType={'none'}
                              // fontFamily={'content'}
                            >
                              <>
                                <Img
                                  src={bull}
                                  w={'15px'}
                                  h={'15px'}
                                  mr={'5px'}
                                  mt={'5px'}
                                />
                                {contentAfterBullet}
                              </>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  )}*/}
                </Box>

                {formData.gameIsShowAuhorName === 'true' && (
                  <Box w={'100%'} h={'50px'} position={'relative'} className='author'>
                    {/* <Img src={batch} w={'100%'} h={'50px'} /> */}
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
                      *Author* <br/> {formData.gameAuthorName}
                    </Text>
                  </Box>
                )}
                {formData.gameIsShowAdditionalWelcomeNote === 'true' && (
                  <Box w={'100%'} h={'50px'} position={'relative'} className='renderContent'>
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

      {/* {formData.gameIsShowSkill === "true" && (
      
        <Text color="black" fontSize={'14'} fontWeight="700" mb={'100px'}>
          {formData.gameSkills}
        </Text>
      
    )}
    {formData.gameIsShowStoryline === "true" && (
      
      <Text color="black" fontSize={'14'} fontWeight="700" mb={'100px'}>
        {formData.gameStoryLine}
      </Text>
    
  )}
  {formData.gameIsShowLearningOutcome === "true" && (     
      <Text color="black" fontSize={'14'} fontWeight="700" mb={'100px'}>
        {formData.gameLearningOutcome}
      </Text>
    
  )}
  {formData.gameIsShowGameDuration === "true" && (
      
      <Text color="black" fontSize={'14'} fontWeight="700" mb={'100px'}>
        {formData.gameDuration}
      </Text>
    
  )}
  {formData.gameIsShowAuhorName === "true" && (
      
      <Text color="black" fontSize={'14'} fontWeight="700" mb={'100px'}>
        {formData.gameAuthorName}
      </Text>
    
  )}
  {formData.gameIsShowAdditionalWelcomeNote === "true" && (      
      <Text color="black" fontSize={'14'} fontWeight="700" mb={'100px'}>
        {formData.gameAdditionalWelcomeNote}
      </Text>    
  )} */}
    </>
  );
};
export default WelcomeContentScreen;
