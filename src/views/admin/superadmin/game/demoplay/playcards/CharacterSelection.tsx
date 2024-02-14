import React, {
  Suspense,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Box, Button, Icon, Img, Input, position, Text } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { motion, useAnimation } from 'framer-motion';
import { API_SERVER } from 'config/constant';
// import { DataContext } from '../components/gamePlayArea';

// Games Image
import InitialImg from 'assets/img/games/load.jpg';
import Sample from 'assets/img/games/Merlin.glb';
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
interface PlayGamesProps {
  state?: any;
  dispatch?: any;
  setDatas?: any;
  imageSrc?: any;
  setCurrentScreenId?: any;
  players?: any;
}

const Characterspage: React.FC<PlayGamesProps> = ({
  state,
  dispatch,
  setDatas,
  imageSrc,
  setCurrentScreenId,
  players,
}) => {
  //   const useData = useContext(DataContext)
  const [i, setI] = useState(0);
//   const [playerName,setPlayerName] = useState('')
//   const handleClick = () => {
//     console.log('Click"s');
//   };
// console.log(playerName);
const playerInfo = useContext(ProfileContext);
  return (
    <>
      <Box className="Play-game CharacterScreen">
        <Box onClick={() => console.log('hello')} h={'100vh'} w={'100%'}>
          <motion.div
            initial={{ opacity: 0, background: '#000' }}
            animate={{ opacity: 1, background: '#0000' }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Box className="img-box">
              <Img className="img-bg" src={imageSrc} />
              <Box className="img-section">
                <Img className="select-pad" src={Select} loading="lazy" />
                {/* <Input
                  className="enter-name"
                  placeholder="Enter Character Name"
                  onChange={(e: any) => setPlayerName(e.target.value)}
                /> */}
                <Text className="enter-name">{playerInfo.name}</Text>
                <Box className="back-n-next-box">
                  <Box
                    w={'230px'}
                    h={'50px'}
                    transform={'translate(475px, 250px)'}
                    cursor={'pointer'}
                    onClick={() => setCurrentScreenId(13)}
                  ></Box>
                </Box>
                <Box className="back-n-next-box">
                  <Button
                    className="btns left-btn"
                    onClick={() => setI(i === 0 ? i : i - 1)}
                  ></Button>
                  <Button
                    className="btns right-btn"
                    onClick={() => setI(players.length - 1 === i ? i : i + 1)}
                  ></Button>
                </Box>
                {players[i] && (
                  <Img
                    src={`${API_SERVER}/${players[i]}`}
                    position={'relative'}
                    zIndex={9999999}
                    w={'200px'}
                    h={'324px'}
                    transform={'translate(0px, 55px)'}
                  />
                )}

                {/* <Canvas camera={{ position: [0, 1, 9] }}>
                  <directionalLight
                    position={[2.0, 78.0, 100]}
                    intensity={0.8}
                    color={'ffffff'}
                    castShadow
                  />
                  <ambientLight intensity={0.5} />
                  <OrbitControls />
                  <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />
                  <Model />
                </Canvas> */}
              </Box>
            </Box>
          </motion.div>
        </Box>
        {/* <Button
          position={'absolute'}
          top={0}
          right={0}
          // onClick={useData?.Function?.handleClose}
        >
          <Icon as={MdClose} />
        </Button> */}
      </Box>
    </>
  );
};

const Model: React.FC = () => {
  const groupRef = useRef<any>();
  const gltf = useLoader(GLTFLoader, Sample);

  const mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);

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
      <primitive object={gltf.scene} />
    </group>
  );
};

export default Characterspage;
