import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, FormLabel, Icon, Img, Input, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { motion } from 'framer-motion';
import { API_SERVER } from 'config/constant';
// Games Image
import ProfileCard from 'assets/img/games/profile-card.png';
import FormField from 'assets/img/games/formfield.png';
import NextBtn from 'assets/img/screens/next.png';
import Selected from 'assets/img/games/selected.png';
// import { DataContext } from '../components/gamePlayArea';

interface ProfileScreenProps {
    imageSrc:any;  
    setCurrentScreenId?:any;
    formData?: any;   
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({imageSrc,setCurrentScreenId,formData}) => {    
//   const useData = useContext(DataContext)
        const [select,setSelect] = useState(false);
        const [profileData,setProfileData] = useState();
      useEffect(() =>{
        const fetchData = async () => {
          try {           
            // const res = await useData?.Function?.handlePlayGames();
            console.log('handlePlayGames success:');
      
            console.log('hello');
          } catch (error) {
            console.error('Error in handlePlayGames:', error);
          }
        };
      
        fetchData(); // Call the async function
      },[]);      

const handleProfile = (e) =>{
  const {name,value} = e.target
  setProfileData((prev)=>({...prev,[name]:value}))
}
    //   console.log('statePayload', useData?.state);
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
                    <Input type={'text'} onChange={handleProfile} />
                  </Box>
                  <Box className="gender">
                    <FormLabel>Gender</FormLabel>
                    <Img className="formfield" src={FormField} />
                    <Input type={'text'} />
                  </Box>
                  <Box className="gender">
                    <FormLabel>Language</FormLabel>
                    <Img
                      className="formfield"
                      src={FormField}
                      onClick={() => setSelect(!select)}
                    />
                    <Img className="selectField" src={Selected} />
                    {select && (
                      <Box className="dropdown">
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                        <Text ml={'5px'} _hover={{bgColor:'#377498'}}>the ruby</Text>
                       
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
            <Button
              position={'absolute'}
              top={0}
              right={0}
              //   onClick={useData?.Function?.handleClose()}
            >
              <Icon as={MdClose} />
            </Button>
          </motion.div>
        </Box>
      </Box>
    </>
  );
}

export default ProfileScreen
