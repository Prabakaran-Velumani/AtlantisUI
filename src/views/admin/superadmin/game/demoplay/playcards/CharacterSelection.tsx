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
  useToast,
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
import {
  getGameLanguages,
  getLanguages,
  getContentRelatedLanguage,
} from 'utils/game/gameService';
import { useParams } from 'react-router-dom';
import { OrbitControls } from '@react-three/drei/core/OrbitControls';
// import {Parrot}  from '../three/Parrot';
import PlayingCharacter from './PlayingCharacter';
import Model from './Model';
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
  isLanguage?: any;
  setIsLanguage?: any;
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
  preloadedAssets,
  setIsLanguage,
  isLanguage,
}) => {
  const [i, setI] = useState(0);
  const [select, setSelect] = useState(false);
  const [languages, setLanguages] = useState<any[]>(null);
  const [characterName, setCharacterName] = useState('');
  const [toggleLeft, setToggleLeft] = useState(false);
  const [toggleRight, setToggleRight] = useState(false)
  const toast = useToast();
  const playerInfo = useContext(ProfileContext);

  const selectPlayerClick = () => {
    const i = 0; // Assuming you are referring to a specific player index
    setSelectedPlayer(players[i]);
    /**if game has more than one quest, then navigate to chapter selection screen, otherwise navigate to story part direclty */
    if (playerInfo.name === '') {
      setProfileData((prev: any) => ({ ...prev, name: 'Guest' }));
    }
    setCurrentScreenId(13);
    //navigate to Chapter selection
  };


  const innerBoxWidth = useBreakpointValue({
    base: '95%',
    lg: '95%',
    xl: '90%',
    xxl: '90%',
  });
  return (
    <>
      <Box
        position="relative"
        w={'100%'}
        height="100vh"
        backgroundImage={preloadedAssets.StarsBg}
        backgroundColor={'#0d161e'}
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
                  w={'55%'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Img
                    src={preloadedAssets.Selected}
                    className={`character_toggle_left ${
                      toggleLeft ? 'toggle_effect_on' : 'toggle_effect_off'
                    }`}
                    onMouseDown={() => setToggleLeft(true)}
                    onMouseUp={() => setToggleLeft(false)}
                  />
                  <Canvas
                    camera={{ position: [0, 1, 9] }}
                    dpr={window.devicePixelRatio}
                  >
                    {' '}
                    {/* For Single view */}
                    {/* <Environment preset={"park"} background />   */}
                    <directionalLight
                      position={[2.0, 78.0, 100]}
                      intensity={0.8}
                      color={'ffffff'}
                      castShadow
                    />
                    <ambientLight intensity={0.5} />
                    {/* <OrbitControls   />  */}
                    <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />
                    {/* COMPONENTS */}
                    <Model position={[0, -1.5, 4]} />
                    {/* <Sphere position={[0,0,0]} size={[1,30,30]} color={'orange'}  />   */}
                    {/* <Trex position={[0,0,0]} size={[1,30,30]} color={'red'}  />             */}
                    {/* <Parrot /> */}
                  </Canvas>
                  <Img
                    onMouseDown={() => setToggleRight(true)}
                    onMouseUp={() => setToggleRight(false)}
                    src={preloadedAssets.Selected}
                    className={`character_toggle_right ${
                      toggleRight ? 'toggle_effect_on' : 'toggle_effect_off'
                    }`}
                  />
                </Box>
              </Box>
              <Box className={'select_player'}>
                <Button
                  w={'15%'}
                  bg={'none'}
                  className="mouse_style"
                  _hover={{ bg: 'none' }}
                  onClick={selectPlayerClick}
                ></Button>
              </Box>
              <Box className={'character_next'}>
                <Box className={'character_buttons'}>
                  <Button
                    className="btns left-btn mouse_style"
                    bg={'none'}
                    _hover={{ bg: 'none' }}
                    onClick={() => setCurrentScreenId(1)}
                  ></Button>
                  <Box w={'25%'} position={'relative'}>
                    <input
                      style={{
                        width: '100%',
                      }}
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
                    className="btns right-btn mouse_style"
                    bg={'none'}
                    _hover={{ bg: 'none' }}
                    onClick={selectPlayerClick}
                  ></Button>
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Characterspage;
