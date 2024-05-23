import { Box } from '@chakra-ui/react'
import React from 'react'
import { Canvas } from 'react-three-fiber'
import CharacterModal from './CharacterModal'
import Model from './Model'

interface SelectedNPCType {
    preloadedAssets: any;
    isStartsAnimationPlay?: boolean;
    isSpeaking?: boolean;
    selectedNpc?: boolean;
}


const SelectedNPCs: React.FC<SelectedNPCType> = ({preloadedAssets, isStartsAnimationPlay, isSpeaking, selectedNpc}) => {
  
    return (
        <>
    {selectedNpc ? (
        <Box className={'player_character_image'}>
          <Canvas camera={{ position: [0, 1, 9] }} > {/* For Single view */}
            {/* <Environment preset={"park"} background />   */}
            <directionalLight position={[2.0, 78.0, 100]} intensity={0.8} color={'ffffff'} castShadow />
            <ambientLight intensity={0.5} />
            {/* <OrbitControls   />  */}
            <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />

            {/* COMPONENTS */}
            {/* <Canvas> */}
              <CharacterModal preloadedAssets={preloadedAssets} isStartsAnimationPlay={isStartsAnimationPlay}/>
          {/* </Canvas> */}

            {/* <Player /> */}
            <Model position={[-3, -1.8, 5]} rotation={[0, 1, 0]} isSpeaking={false} />
            {/* <Sphere position={[0,0,0]} size={[1,30,30]} color={'orange'}  />   */}
            {/* <Trex position={[0,0,0]} size={[1,30,30]} color={'red'}  />             */}
            {/* <Parrot /> */}
          </Canvas>
        </Box>
      )
    : null}
    </>
  )
}

export default SelectedNPCs;
export type { SelectedNPCType };