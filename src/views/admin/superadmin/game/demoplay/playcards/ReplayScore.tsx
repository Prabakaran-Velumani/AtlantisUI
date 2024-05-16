import { Box, Button, Img } from '@chakra-ui/react';
import { useState } from 'react';

const ReplayScore: React.FC<{ preloadedAssets?: any, setReplayIsOpen?: any }> = ({
  preloadedAssets,
  setReplayIsOpen,
}) => {
  const [stat, setStat] = useState('Prompt');
  return (
    <>
      <Box id="container" className="Play-station">
        <Box className="top-menu-home-section">
          <Box className="Setting-box">
            <Img
              src={preloadedAssets?.Replay}
              className="setting-pad"
            />
            <Box className="replay-vertex">
              <Box
                w={'100%'}
                h={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
              >
                {stat === 'Replay' &&
                  <>
                    <Box className='replay_game_text'>would you like to play Again ?</Box>
                    <Box display={'flex'} justifyContent={'space-between'} w={'100%'}>
                      <Button
                        background={'transparent !important'}
                      >
                        <Img src={preloadedAssets?.NextBtn} onClick={() => setReplayIsOpen(false)} className='replay_game_btn' />
                      </Button>
                      <Button
                        background={'transparent !important'}
                      >
                        <Img src={preloadedAssets?.replayBtn} className='replay_game_btn' />
                      </Button>
                    </Box>
                  </>
                }
                {stat === 'Minimum' &&
                  <>
                    <Box className='replay_game_text'>Your score is too low than required score please play again ?</Box>
                    <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                      <Button
                        background={'transparent !important'}
                      >
                        <Img src={preloadedAssets?.OkayBtn} className='replay_game_btn' />
                      </Button>
                    </Box>
                  </>
                }
                {stat === 'Prompt' &&
                  <>
                    <Box className='replay_prompt_text'> Would you like to resume last played block ?</Box>
                    <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                      <Button
                        h={'auto !important'}
                        background={'transparent !important'}
                      >
                        <Img src={preloadedAssets?.Continue} className='replay_game_btn' />
                      </Button>
                    </Box>
                    <Box className='replay_prompt_text'>Would you like to resume last edited block ?</Box>
                    <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                      <Button
                        h={'auto !important'}
                        background={'transparent !important'}
                      >
                        <Img src={preloadedAssets?.Continue} className='replay_game_btn' />
                      </Button>
                    </Box>
                    <Box className='replay_prompt_text'>Would you like to play again ?</Box>
                    <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                      <Button
                        h={'auto !important'}
                        background={'transparent !important'}
                      >
                        <Img src={preloadedAssets?.Continue} className='replay_game_btn' />
                      </Button>
                    </Box>
                  </>
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReplayScore;
