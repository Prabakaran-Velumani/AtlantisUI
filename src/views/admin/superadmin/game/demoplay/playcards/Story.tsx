// Chakra Imports
import { Box, Flex, Img, Text } from '@chakra-ui/react';

import bk from 'assets/img/games/17.png';
import note from 'assets/img/games/note.png';
import next from 'assets/img/screens/next.png';
import dial from 'assets/img/games/Dialogue.png';
import char from 'assets/img/games/charbox.png';
import right from 'assets/img/games/right.png';
import left from 'assets/img/games/left.png';
import parch from 'assets/img/games/parch.png';
import on from 'assets/img/games/on.png';
import off from 'assets/img/games/off.png';
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
//   import SelectField from 'components/fields/SelectField';
//   import InitialImg from 'assets/img/games/load.jpg';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
// import Sample from '../../../../assets/img/games/Character_sample.glb';
//   import Sample from 'assets/img/games/Character_sample.glb';
//   import * as THREE from 'three';
//   import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import feedi from 'assets/img/screens/feed.png';
import TypingEffect from './Typing';
//   import { AiFillMessage } from 'react-icons/ai';

const Story: React.FC<{
  data: any;
  type: any;
  // first?: any;
  // showNote?: any;
  backGroundImg: any;
  getData: any;
  option: any;
  options: any;
  handleValidate: any;
  resMsg: any;
  feed: any;
  formData: any;
}> = ({
  data,
  type,
  resMsg,
  feed,
  getData,
  option,
  options,
  handleValidate,
  backGroundImg,
  formData,
}) => {
  const [showNote, setShowNote] = useState(false),
    [first, setFirst] = useState(false);

  console.log('this is the game data of the blocks', formData);
  console.log(data);
  useEffect(() => {
    setShowNote(true);
    setTimeout(() => {
      setShowNote(false);
    }, 1000);
  }, [data, type]);
  useEffect(() => {
    setShowNote(true);
    setFirst(true);
    setTimeout(() => {
      setFirst(false);
      setShowNote(false);
    }, 1000);
    // to set the first data for the game
  }, []);

  return (
    <>
      {data && type === 'Note' && (
        <Box
          w={'100%'}
          h={'100vh'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
          overflow={'visible'}
          style={{ perspective: '1000px' }}
        >
          {/* <Box w={'80%'}> */}
          <Box
            backgroundImage={backGroundImg}
            w={'100%'}
            h={'100vh'}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
            transform={`scale(${first ? 1 : 1.3}) translateY(${
              first ? 0 : -10
            }%) translateX(${first ? 0 : -10}%)`}
            transition={'transform 0.9s ease-in-out'}
          >
            <Box
              position={'fixed'}
              top={'200px'}
              // left={0}
              right={'0px'}
              bottom={0}
              zIndex={999}
              w={'300px'}
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
                {/* <Model /> */}
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -5, 0]}
                  receiveShadow
                >
                  <planeGeometry args={[100, 100]} />
                  <shadowMaterial opacity={0.5} />
                </mesh>
              </Canvas>
            </Box>
          </Box>
          <Box
            style={{
              transform: `scale(${showNote ? 0.2 : 1})`,
              transition: 'transform 0.5s ease-in-out',
            }}
            position={'fixed'}
            w={'40%'}
            h={'80vh'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Img w={'80%'} h={'80vh'} src={note} />
            <Box
              position={'fixed'}
              overflowY={'scroll'}
              w={'50%'}
              mt={'10px'}
              display={'flex'}
              flexDirection={'column'}
              textAlign={'center'}
              justifyContent={'center'}
              style={{
                fontWeight: '900',
                color: '#D9C7A2',
                fontSize: '18px',
                fontFamily: 'AtlantisContent',
                lineHeight: 1,
              }}
            >
              <Box w={'100%'} overflowY={'scroll'} h={'100px'} display={'flex'} alignItems={'center'}  mt={'20px'}>
                {data?.blockText}
              </Box>
              <Box 
                w={'100%'}
                onClick={() => getData(data)}
                mt={'20px'}
                display={'flex'}
                justifyContent={'center'}
                cursor={'pointer'}
              >
                <Img src={next} w={'200px'} h={'60px'} />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {data && type === 'Dialog' && (
        <Box
          w={'100%'}
          h={'100vh'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
        >
          <Img
            src={backGroundImg}
            maxW={'100%'}
            maxH={'100%'}
            w={'100%'}
            h={'100vh'}
            transform={'scale(1.3}) translateY(-10%) translateX(-10%)'}
            transition={'transform 0.9s ease-in-out'}
          />
          <Img
            style={{
              transform: `translateY(${showNote ? 200 : 0}px)`,
              transition:
                'transform 0.3s ease-in-out, translateY 0.3s ease-in-out',
            }}
            position={'fixed'}
            maxW={'100%'}
            maxH={'100%'}
            w={'100%'}
            h={'240px'}
            bottom={'0'}
            src={dial}
          />
          {!showNote && (
            <>
              <Box position={'relative'}>
                <Img
                  src={char}
                  position={'fixed'}
                  h={'70px'}
                  w={'25%'}
                  left={'13%'}
                  bottom={'150px'}
                />
                <Text
                  position={'fixed'}
                  left={'24%'}
                  bottom={'167px'}
                  fontSize={'25'}
                  fontWeight={700}
                  textAlign={'center'}
                  fontFamily={'AtlantisText'}
                >
                  {data.blockRoll === 'Narrator'
                    ? data.blockRoll
                    : formData.gameNonPlayerName}
                </Text>
              </Box>
              <Box
                display={'flex'}
                position={'fixed'}
                justifyContent={'space-between'}
                w={'75%'}
                bottom={'55px'}
                fontFamily={'AtlantisContent'}
                fontSize={'21px'}
              >
                <TypingEffect text={data?.blockText} speed={50} />
              </Box>
              <Box
                display={'flex'}
                position={'fixed'}
                justifyContent={'space-between'}
                w={'80%'}
                bottom={'0'}
              >
                <Img src={left} w={'50px'} h={'50px'} cursor={'pointer'} />
                <Img
                  src={right}
                  w={'50px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => getData(data)}
                />
              </Box>
            </>
          )}
        </Box>
      )}
      {data && type === 'Interaction' && (
        <Box
          w={'100%'}
          h={'100vh'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
        >
          <Img
            src={backGroundImg}
            maxW={'100%'}
            maxH={'100%'}
            w={'100%'}
            h={'100vh'}
            transform={`scale(1.5}) translateY(-10%) translateX(${
              showNote ? -200 : 0
            }px)`}
            transition={'transform 0.9s ease-in-out'}
          />
          <Box
            style={{
              transform: `translateX(${showNote ? -200 : 0}px) scale(1.2)`,
              transition:
                'transform 0.3s ease-in-out, translateY 0.3s ease-in-out',
            }}
            backgroundImage={parch}
            position={'fixed'}
            w={{ sm: '350px', md: '500px' }}
            h={{ sm: '50vh', md: ' 550px' }}
            // top={'4vh'}
            left={{ sm: '60px', md: '180px' }}
            backgroundSize={'contain'}
            backgroundRepeat={'no-repeat'}
          >
            <Box
              textAlign={'center'}
              h={'100px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              fontWeight={700}
              fontFamily={'AtlantisText'}
              lineHeight={1}
              w={'100%'}
            >
              <Box w={'50%'} fontSize={'21px'}>
                Here You Can Answer the Interactions...!{' '}
              </Box>
            </Box>
            <Box
              textAlign={'center'}
              h={'100px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              fontWeight={500}
              fontFamily={'AtlantisText'}
              lineHeight={1}
              w={'96%'}
              overflowY={'scroll'}
            >
              <Box w={'60%'} fontSize={'20px'} letterSpacing={1}>
                {data?.blockText}
              </Box>
            </Box>
            <Box
              mt={'10px'}
              w={{ sm: '200px', md: '400px' }}
              fontWeight={500}
              ml={'17%'}
              h={'220px'}
              overflowY={'scroll'}
            >
              {options &&
                options.map((item: any, ind: number) => (
                  <Box
                    mb={'10px'}
                    w={'80%'}
                    lineHeight={1}
                    color={option === ind ? 'purple' : ''}
                    textAlign={'center'}
                    cursor={'pointer'}
                    onClick={() => handleValidate(item, ind)}
                    fontFamily={'AtlantisText'}
                    fontSize={'20px'}
                  >
                    <Img src={option === ind ? on : off} h={'30px'} w={'95%'} />
                    {item?.qpOptionText}
                  </Box>
                ))}
            </Box>
            <Box
              display={'flex'}
              position={'fixed'}
              justifyContent={'space-between'}
              w={'508px'}
              left={'-10px'}
            >
              <Img src={left} w={'50px'} h={'50px'} cursor={'pointer'} />
              {option !== null && (
                <Img
                  src={right}
                  w={'50px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => getData(data)}
                />
              )}
            </Box>
          </Box>
        </Box>
      )}
      {data && type === 'response' && (
        <Box
          w={'100%'}
          h={'100vh'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
        >
          <Img
            src={backGroundImg}
            maxW={'100%'}
            maxH={'100%'}
            w={'100%'}
            h={'100vh'}
            transform={'scale(1.3}) translateY(-10%) translateX(-10%)'}
            transition={'transform 0.9s ease-in-out'}
          />
          <Img
            style={{
              transform: `translateY(${showNote ? 200 : 0}px)`,
              transition:
                'transform 0.3s ease-in-out, translateY 0.3s ease-in-out',
            }}
            position={'fixed'}
            maxW={'100%'}
            maxH={'100%'}
            w={'100%'}
            h={'240px'}
            bottom={'0'}
            src={dial}
          />
          {!showNote && (
            <>
              <Box
                backgroundImage={char}
                position={'fixed'}
                h={'70px'}
                w={'25%'}
                left={'13%'}
                fontSize={'25'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                fontWeight={700}
                textAlign={'center'}
                bottom={'150px'}
                backgroundRepeat={'no-repeat'}
                backgroundSize={'contain'}
                fontFamily={'albuma'}
              >
                Logan
                {/* {data.character === '999999'
                    ? 'Player'
                    : data.character === '99999'
                    ? 'Narrator'
                    : formData.gameNonPlayerName} */}
              </Box>
              <Box
                display={'flex'}
                position={'fixed'}
                justifyContent={'space-between'}
                w={'75%'}
                bottom={'55px'}
                fontFamily={'cont'}
              >
                {resMsg}
              </Box>
              <Box
                display={'flex'}
                position={'fixed'}
                justifyContent={'space-between'}
                w={'80%'}
                bottom={'0'}
              >
                <Img src={left} w={'50px'} h={'50px'} cursor={'pointer'} />
                <Img
                  src={right}
                  w={'50px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => getData(data)}
                />
              </Box>
            </>
          )}
        </Box>
      )}
      {data && type === 'feedback' && (
        <Box
          w={'100%'}
          h={'100vh'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
          overflow={'visible'}
          style={{ perspective: '1000px' }}
        >
          <Box
            backgroundImage={backGroundImg}
            w={'100%'}
            h={'100vh'}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
            transform={`scale(${first ? 1 : 1.3}) translateY(${
              first ? 0 : -10
            }%) translateX(${first ? 0 : -10}%)`}
            transition={'transform 0.9s ease-in-out'}
          >
            <Box
              position={'fixed'}
              top={'200px'}
              right={'0px'}
              bottom={0}
              zIndex={999}
              w={'300px'}
            >
              <Canvas camera={{ position: [3, 3, 10] }}>
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
                {/* <Model /> */}
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -5, 0]}
                  receiveShadow
                >
                  <planeGeometry args={[100, 100]} />
                  <shadowMaterial opacity={0.5} />
                </mesh>
              </Canvas>
            </Box>
          </Box>
          <Box
            style={{
              transform: `scale(${showNote ? 0.2 : 1})`,
              transition: 'transform 0.5s ease-in-out',
            }}
            position={'fixed'}
            w={'40%'}
            h={'80vh'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Img w={'80%'} h={'80vh'} src={feedi} />
            <Box
              position={'fixed'}
              w={'50%'}
              mt={'10px'}
              display={'flex'}
              flexDirection={'column'}
              textAlign={'center'}
              justifyContent={'center'}
              style={{
                fontWeight: '900',
                color: '#D9C7A2',
                fontSize: '18px',

                lineHeight: 1,
                fontFamily: 'cont',
              }}
            >
              {feed}
              <Box
                w={'100%'}
                onClick={() => getData(data)}
                mt={'20px'}
                display={'flex'}
                justifyContent={'center'}
                cursor={'pointer'}
              >
                <Img src={next} w={'200px'} h={'60px'} />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Story;
