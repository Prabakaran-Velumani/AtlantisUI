import React, {
  Suspense,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Img,
  Input,
  position,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { motion, useAnimation } from 'framer-motion';
import { API_SERVER } from 'config/constant';
// import { DataContext } from '../components/gamePlayArea';

// Games Image
import InitialImg from 'assets/img/games/load.jpg';
import Sample from 'assets/img/games/Character_sample.glb';
// import Victor from '../../../../assets/img/games/victoria.glb';
// import Sample from '../../../../assets/img/games/Source_file.glb';
import Background from 'assets/img/games/fristscreenBackground.jpg';
import Select from 'assets/img/games/select_character.png';

// Three js
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import SelectButton from 'assets/img/games/selectbtn.png';
import Lang from 'assets/img/games/lang.png';
import Okay from 'assets/img/games/OKAY button.png';
import FormField from 'assets/img/games/formfield.png';
import Selected from 'assets/img/games/selected.png';
// import { useGLTF } from '@react-three/drei';
// import { Environment, OrbitControls } from '@react-three/drei';
// import { FBXLoader } from 'three/addons/loaders/FBXLoader';
// Components
// import PlayingCharacter from '../three/PlayingCharacter';
// import Sphere from '../three/Sphere';
// import Trex from '../three/Trex';
// import { Parrot } from '../three/Parrot';
// Import ProfileContext from EntirePreview
import { ProfileContext } from '../EntirePreview';
import { getGameLanguages, getLanguages } from 'utils/game/gameService';
import { useParams } from 'react-router-dom';
interface PlayGamesProps {
  formData?: any;
  state?: any;
  dispatch?: any;
  setDatas?: any;
  imageSrc?: any;
  setCurrentScreenId?: any;
  players?: any;
  setSelectedPlayer?: any;
  profileData?: any;
  setProfileData?: any;
  demoBlocks?: any;
}

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

const Characterspage: React.FC<PlayGamesProps> = ({
  state,
  dispatch,
  setDatas,
  imageSrc,
  setCurrentScreenId,
  players,
  setSelectedPlayer,
  profileData,
  setProfileData,
  demoBlocks,
  formData,
}) => {
  //   const useData = useContext(DataContext)
  const [i, setI] = useState(0);
  const [isLanguage, setIsLanguage] = useState(false);
  const [select, setSelect] = useState(false);
  const [lanuages, setLanguages] = useState<any[]>(null);
    // Afrith-modified-starts-08/Mar/24
    const [characterName, setCharacterName] = useState('');
    // Afrith-modified-ends-08/Mar/24
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const resLang = await getGameLanguages(id);
      if (resLang.status === 'Success') {
        if (resLang?.data.length !== 0) {
          const data = resLang?.data;
          data.unshift({ value: 0, label: 'English' });
          setLanguages(data);
          setProfileData((prev: any) => ({
            ...prev,
            language: data[0]?.label,
          }));
          setTimeout(() => {
            setIsLanguage(true);
          }, 1500);
        }
      }
    };
    fetch();
  }, []);

  const playerInfo = useContext(ProfileContext);

  const selectPlayerClick = () => {
    setSelectedPlayer(players[i]);
    if (Object.keys(demoBlocks).length > 1) {
      setCurrentScreenId(13);
    } else {
      setCurrentScreenId(1);
    }
  };

  const handleProfile = (e: any, lang?: any) => {
    const { id, value } = e.target;
    setSelect(false);
    setProfileData((prev: any) => ({
      ...prev,
      [id]: id === 'name' ? value : lang,
    }));
  };

    // Afrith-modified-starts-08/Mar/24
    // const setPlayerName = (value:any) => {
    //   setCharacterName(value);
    //   setProfileData((prev:any) => ({...prev, name:value}))
    // };
    // Afrith-modified-ends-08/Mar/24
 
  const innerBoxWidth = useBreakpointValue({
    base: '95%',
    lg: '95%',
    xl: '90%',
    xxl: '90%',
  });
  return (
    <>
      {formData && formData?.gameLanguageId !== null ? (
        <Box id="container" className="Play-station">
          <Box className="top-menu-home-section">
            {isLanguage ? (
              <Box className="Setting-box">
                <Img src={Lang} className="setting-pad" />
                <Box className="music-volume volumes">
                  <Box className="gender">
                    <FormLabel>Language</FormLabel>
                    <Text
                      transform={'translate(0px,25px)'}
                      textAlign={'center'}
                      onClick={() => setSelect(!select)}
                      position={'relative'}
                      zIndex={9999999}
                      fontFamily={'AtlantisText'}
                      color={'#D9C7A2'}
                    >
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
                        {lanuages &&
                          lanuages.map((lang: any, num: any) => (
                            <Text
                              ml={'5px'}
                              key={num}
                              _hover={{ bgColor: '#377498' }}
                              id={'language'}
                              onClick={(e: any) => handleProfile(e, lang.label)}
                            >
                              {lang.label}
                            </Text>
                          ))}
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box className="voice-volume volumes"></Box>
                <Box className="btns">
                  <Button
                    className="okay-btn btn"
                    onClick={() => setIsLanguage(false)}
                  >
                    <Img src={Okay} />
                  </Button>
                </Box>
              </Box>
            ) : null}
          </Box>
        </Box>
      ) : null}
      <Box
        position="relative"
        maxW="100%"
        w={'100vw'}
        height="100vh"
        backgroundImage={imageSrc}
        backgroundSize={'cover'}
        backgroundRepeat={'no-repeat'}
        className='CharacterScreen chapter_potrait'        
      >
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={4}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="65%"
        >
          <GridItem colSpan={1} position={'relative'}>
            <Img src={Select} h={'auto'} maxW={'100%'} loading="lazy" />
            <Box className={'character_select_area'}>
              <Box
                w={'30%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Img
                  src={Selected}
                  w="40px"
                  h="45px"
                  transform={'rotate(90deg)'}
                />
                <Img
                  src={Selected}
                  w="40px"
                  h="45px"
                  transform={'rotate(-90deg)'}
                />
              </Box>
            </Box>
            <Box className={'select_player'}>
              <Button
                w={'15%'}
                bg={'none'}
                _hover={{ bg: 'none' }}
                onClick={selectPlayerClick}
              ></Button>
            </Box>
            <Box className={'character_next'}>
              <Box
                w={innerBoxWidth}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Button
                  className="btns left-btn"
                  bg={'none'}
                  _hover={{ bg: 'none' }}
                  onClick={() => setI(i === 0 ? players.length - 1 : i - 1)}
                ></Button>
                <Box w={'25%'} position={'relative'}>
                  <input className="player_name" value={playerInfo.name} onChange={(e:any)=>setProfileData((prev:any)=>({...prev,name:e.target.value}))}/>
                  {/* <Text >{playerInfo.name}</Text> */}
                </Box>
                <Button
                  className="btns right-btn"
                  bg={'none'}
                  _hover={{ bg: 'none' }}
                  onClick={() => setI(players.length - 1 === i ? 0 : i + 1)}
                ></Button>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

const Model: React.FC = () => {
  const groupRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, Sample);

  const mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[1]);

  useFrame((state, delta) => {
    // Rotate the model on the Y-axis
    if (groupRef.current) {
      // groupRef.current.rotation.y += 0.01;
      groupRef.current.castShadow = true;
    }
    mixer.update(delta);
  });
  action.play();

  useLayoutEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
    }
  }, []);

  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.color.set(0xffccaaf0); // Set your desired color
      child.material.roughness = 0.4; // Adjust roughness as needed
      child.material.metalness = 0.8; // Adjust metalness as needed
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} scale={[1, 1, 1]} position={[0, -3, 10]} />
    </group>
  );
};

export default Characterspage;
