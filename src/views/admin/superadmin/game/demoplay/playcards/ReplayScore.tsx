import { Box, Button, Img } from '@chakra-ui/react';

const ReplayScore: React.FC<{ preloadedAssets?: any }> = ({
  preloadedAssets,
}) => {
  return (
    <>
      <Box id="container" className="Play-station">
        <Box className="top-menu-home-section">
          <Box className="Setting-box">
            <Img
              src={preloadedAssets?.Replay}
              className="setting-pad"
              //   h={'100vh !important'}
            />
            <Box className="replay-vertex">
              <Box
                w={'100%'}
                h={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
              >
                <Box>would you like to play Again ?</Box>
                <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                  <Button
                    className="okay"
                    //  onClick={() => setIsLanguage(false)}
                  >
                    <Img src={preloadedAssets?.OkayBtn} w={'100%'} h={'auto'} />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReplayScore;
