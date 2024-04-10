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
import { getGameLanguages, getLanguages, getContentRelatedLanguage } from 'utils/game/gameService';
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
  preloadedAssets?: any;
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
  preloadedAssets
}) => {
  //   const useData = useContext(DataContext)
  const [i, setI] = useState(0);
  const [isLanguage, setIsLanguage] = useState(false);
  const [select, setSelect] = useState(false);
  const [languages, setLanguages] = useState<any[]>(null);
  // Afrith-modified-starts-08/Mar/24
  const [characterName, setCharacterName] = useState('');
  // Afrith-modified-ends-08/Mar/24
  //Afrith-modified-starts-20/Mar/24
  const [gameContentId, setGameContentId] = useState(null);
  //Afrith-modified-ends-20/Mar/24
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const resLang = await getGameLanguages(id);
      if (resLang?.status === 'Success') {
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
    console.log('Object.keys(demoBlocks).length', Object.keys(demoBlocks).length);
    /**if game has more than one quest, then navigate to chapter selection screen, otherwise navigate to story part direclty */
    if (playerInfo.name === '') {
      setProfileData((prev: any) => ({ ...prev, name: 'Guest' }));
    }

    if (Object.keys(demoBlocks).length > 1) {
      setCurrentScreenId(13);//navigate to Chapter selection
    } else {
      setCurrentScreenId(2);//navigate to story
    }
  };

  // const handleProfile = (e: any, lang?: any) => {
  //   const { id, value } = e.target;
  //   setSelect(false);
  //   setProfileData((prev: any) => ({
  //     ...prev,
  //     [id]: id === 'name' ? value : lang,
  //   }));
  // };

  ///Afrith-modified-starts-20/Mar/24
  const currGameId = id; //from useParams
  const handleProfile = (e: any, lang?: any, langId?: any) => {

    const { id, value } = e.target;

    setSelect(false);
    setProfileData((prev: any) => ({
      ...prev,
      [id]: id === 'name' ? value : lang,
    }));
    setGameContentId(langId);
    getContentRelatedLanguage(currGameId, langId);
  };

  //////////
  useEffect(() => {
    const fetchGameContent = async () => {
      const gameContentResult = await getContentRelatedLanguage(currGameId, gameContentId);
      if (gameContentResult.status === 'Success') {
        const data = gameContentResult.data;
        setProfileData((prev: any) => ({
          ...prev,
          content: data.map((x: any) => ({ content: x.content })),
          audioUrls: data.map((x: any) => ({ audioUrls: x.audioUrls })),
          textId: data.map((x: any) => ({ textId: x.textId })),
          fieldName: data.map((x: any) => ({ fieldName: x.fieldName })),
          Audiogetlanguage: data.map((x: any) => ({
            content: x.content,
            audioUrls: x.audioUrls,
            textId: x.textId,
            fieldName: x.fieldName,
          })),
        }))
      }
    };
    fetchGameContent();
  }, [gameContentId])
  /////////
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
                <Img src={preloadedAssets.Lang} className="setting-pad" />
                <Box className="vertex">
                  <FormLabel className={'label'} me={'0'}>
                    Language
                  </FormLabel>
                  <Box position={'relative'}>
                    <Img
                      // className="formfield"
                      w={'100%'}
                      h={'auto'}
                      src={preloadedAssets.FormField}
                      onClick={() => setSelect(!select)}
                    />
                    <Box w={'100%'} position={'absolute'} display={'flex'} onClick={() => setSelect(!select)} top={'7%'}>
                      <Box w={'80%'} display={'flex'} justifyContent={'center'} >
                        <Text
                          // transform={'translate(0px,25px)'}
                          // textAlign={'center'}
                          onClick={() => setSelect(!select)}
                          className={'choosen_lang'}
                        >
                          {profileData?.language}
                        </Text>
                      </Box>
                      <Box w={'20%'} >
                        <Img src={preloadedAssets.Selected} className={'select'} mt={'18%'} />
                      </Box>
                      {select && (
                        <Box className="dropdown">
                          {languages &&
                            languages.map((lang: any, num: any) => (
                              <Text
                                className={'choosen_langs'}
                                ml={'5px'}
                                key={num}
                                _hover={{ bgColor: '#377498' }}
                                id={'language'}
                                onClick={(e: any) =>
                                  handleProfile(e, lang.label)
                                }
                              >
                                {lang.label}
                              </Text>
                            ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                    <Button
                      className="okay"
                      onClick={() => setIsLanguage(false)}
                    >
                      <Img src={preloadedAssets.Okay} w={'100%'} h={'auto'} />
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
        </Box>
      ) : null}
      <Box
        position="relative"
        w={'100%'}
        height="100vh"
        backgroundImage={imageSrc}
        backgroundSize={'cover'}
        backgroundRepeat={'no-repeat'}
        className="CharacterScreen chapter_potrait"
      >
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={4}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="100%"
        >
          <GridItem colSpan={1} position={'relative'}>
            <Box display={'flex'} justifyContent={'center'}>
              <Img
                src={preloadedAssets.Select}
                className={'character_template'}
                loading="lazy"
              />
              <Box className={'character_select_area'}>
                <Box
                  w={'30%'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Img
                    src={preloadedAssets.Selected}
                    className={'character_toggle_left'}
                  />
                  <Img
                    src={preloadedAssets.Selected}
                    className={'character_toggle_right'}
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
                <Box className={'character_buttons'}>
                  <Button
                    className="btns left-btn"
                    bg={'none'}
                    _hover={{ bg: 'none' }}
                    onClick={() => setCurrentScreenId(1)}
                  ></Button>
                  <Box w={'25%'} position={'relative'}>
                    <input
                      style={{ width: '100%' }}
                      className="player_name"
                      placeholder={'Enter Alias Name'}
                      value={playerInfo.name}
                      onChange={(e: any) =>
                        setProfileData((prev: any) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Button
                    className="btns right-btn"
                    bg={'none'}
                    _hover={{ bg: 'none' }}
                    onClick={selectPlayerClick}
                  ></Button>
                </Box>
              </Box>
            </Box>
            {/* <Box
              position={'fixed'}
    
              // left={0}
              right={'0px'}
              bottom={0}
              zIndex={999}
              w={'100vw'}
              h={'100vh'}
            >
              <Canvas
                camera={{ position: [3, 3, 10] }}
              // style={{ width: '50%', height: '50vh'}}
              >
                <directionalLight
                  position={[5, 5, 5]}
                  intensity={0.8}
                  color={0xffccaa}
                  castShadow
                />
                <ambientLight intensity={5.5} />
                <pointLight
                  position={[5, 5, 5]}
                  color={0xff0000}
                  intensity={1}
                />
                <Model />
              </Canvas>
            </Box> */}
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
