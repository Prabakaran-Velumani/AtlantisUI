import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormLabel,
  Icon,
  Img,
  Input,
  Text,
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

import { motion } from 'framer-motion';
import { API_SERVER } from 'config/constant';
// Games Image
import ProfileCard from 'assets/img/games/profile-card.png';
import FormField from 'assets/img/games/formfield.png';
import NextBtn from 'assets/img/screens/next.png';
import Selected from 'assets/img/games/selected.png';
import { ValueContainer } from 'react-select/dist/declarations/src/components/containers';
// import { DataContext } from '../components/gamePlayArea';
interface ProfileScreenProps {
  imageSrc: any;
  setCurrentScreenId?: any;
  formData?: any;
  profileData?: any,
  setProfileData: any
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  imageSrc,
  setCurrentScreenId,
  formData,
  profileData,
  setProfileData
}) => {

  const [select, setSelect] = useState(false);
  const [isGender, setIsGender] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('handlePlayGames success:');

        // console.log('hello');
      } catch (error) {
        console.error('Error in handlePlayGames:', error);
      }
    };
    fetchData(); 
  }, []);

  const handleProfile = (e: any, lang?: any) => {
    const { id, value } = e.target;
    setSelect(false);
    setIsGender(false);
    setProfileData((prev:any) => ({ ...prev, [id]: id === 'name' ? value : lang }));
  };
  const spokenLanguages = [
    'English',
    'Spanish',
    'Mandarin Chinese',
    'Hindi',
    'French',
    'Arabic',
    'Bengali',
    'Russian',
    'Portuguese',
    'Urdu',
    'Indonesian',
    'German',
    'Japanese',
    'Swahili',
    'Turkish',
    'Italian',
    'Thai',
    'Dutch',
    'Korean',
    'Vietnamese',
  ];

  const gender = ['Male', 'female'];

  return (
    <>
      <Box className="Play-game ProfileScreen">
        <Box
          position={'fixed'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={999}
        >
          {/* <motion.div initial={{ opacity: 0, transform: 'scale(0.5)' }} animate={{ opacity: 1, transform: 'scale(1)' }} transition={{ duration: 0.3, delay: 0.5 }} > */}
          <motion.div
            initial={{ opacity: 0, background: '#000' }}
            animate={{ opacity: 1, background: '#0000' }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Box className="img-box" position={'relative'}>
              <Img className="img-bg" src={imageSrc} />
              <Box className="img-section">
                <Img className="img" src={ProfileCard} loading="lazy" />
                <Box className="profile-box">
                  <Box className="nick-name" mb={'20px'}>
                    <FormLabel>Nick Name</FormLabel>
                    <Img className="formfield" src={FormField} />
                    <Input
                      type={'text'}
                      id={'name'}
                      onChange={(e: any) => handleProfile(e)}
                    />
                  </Box>
                  <Box className="gender">
                    <FormLabel>Language</FormLabel>
                    <Text transform={'translate(0px,25px)'} textAlign={'center'}  onClick={() => setSelect(!select)} position={'relative'} zIndex={9999999}>
                      {profileData?.language}
                    </Text>
                    <Img
                      className="formfield"
                      src={FormField}
                      onClick={() => setSelect(!select)}
                    />
                    <Img className="selectField" src={Selected} />
                    {select && (
                      <Box className="dropdown">
                        {spokenLanguages &&
                          spokenLanguages.map((lang, num) => (
                            <Text
                              ml={'5px'}
                              key={num}
                              _hover={{ bgColor: '#377498' }}
                              id={'language'}
                              onClick={(e: any) => handleProfile(e, lang)}
                            >
                              {lang}
                            </Text>
                          ))}
                      </Box>
                    )}
                  </Box>
                  <Box className="gender">
                    <FormLabel mt={'40px'}>Gender</FormLabel>
                    <Text transform={'translate(0px,25px)'} textAlign={'center'}  onClick={() => setIsGender(!isGender)} position={'relative'} zIndex={9999999}>
                      {profileData?.gender}
                    </Text>
                    <Img
                      className="formfield"
                      src={FormField}
                      onClick={() => setIsGender(!isGender)}
                    />
                    <Img className="selectField" src={Selected} />
                    {isGender && (
                      <Box className="dropdown">
                        {gender &&
                          gender.map((lang, num) => (
                            <Text
                              key={num}
                              ml={'5px'}
                              _hover={{ bgColor: '#377498' }}
                              id={'gender'}
                              onClick={(e: any) => handleProfile(e, lang)}
                            >
                              {lang}
                            </Text>
                          ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              {/* <Box className='pinewood' onClick={()=>dispatch({ type: 'level_3'})}></Box> */}
              <Button
                className="next-btn"
                onClick={() => setCurrentScreenId(12)}
              >
                <Img src={NextBtn} />
              </Button>
            </Box>
            {/* <Button
              position={'absolute'}
              top={0}
              right={0}
              //   onClick={useData?.Function?.handleClose()}
            >
              <Icon as={MdClose} />
            </Button> */}
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default ProfileScreen;
