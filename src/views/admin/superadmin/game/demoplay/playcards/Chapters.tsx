import { Box, Button, Icon, Img, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

// Images
import Background from 'assets/img/games/fristscreenBackground.jpg';
import QueueBackground from 'assets/img/games/Quest_background.png';
import QueueScreen from 'assets/img/games/Queue_screen.png';
import Demo from 'assets/img/games/1700.jpg';
import Lock from 'assets/img/games/lock.png';
import { BiMoney } from 'react-icons/bi';
import { GiCoins } from 'react-icons/gi';

const ChapterPage: React.FC<{ formData?:any,imageSrc: any; demoBlocks: any,setCurrentScreenId:any; }> = ({
  imageSrc,
  demoBlocks,
  setCurrentScreenId,
  formData
}) => {
  return (
    <>
      <Box className="Play-game NoOfQueue">
        <Box
          position={'fixed'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={999}
        >
          <motion.div
            initial={{ opacity: 0, background: '#000' }}
            animate={{ opacity: 1, background: '#0000' }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Box className="img-box" position={'relative'}>
              <Img className="img-bg" src={imageSrc} />
              <Box className="img-section">
                <Img
                  className="queue-pad"
                  src={QueueBackground}
                  loading="lazy"
                />
                <Text className="title">{'Level 1'}</Text>
                <Box className="content-box" overflowY={'scroll'}>
                  <SimpleGrid columns={{ base: 1, sm: 1, md: 3 }}>
                    {Object.keys(demoBlocks).map((it, num) => (
                      <Box
                        className="queue-box"
                        key={num}                        
                        onClick={() => setCurrentScreenId(1)}
                      >
                        <Img className="queue-screen" src={QueueScreen} />
                        <Text className="heading">Quest {num+1}</Text>
                        <Box className="badge">
                          {it !== '1' ? (
                            <Img src={Lock} className="lock" />
                          ) : null}
                          <Img src={Demo} />
                        </Box>
                        <Text className="text"></Text>
                        <Box className="bottom-box">
                          <Text className="amount-score">
                            100/100 <Icon as={BiMoney} />
                          </Text>
                          <Text className="coin">
                            100/100 <Icon as={GiCoins} />
                          </Text>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                 
                </Box>
              </Box>
            </Box>
            {/* <Button
              position={'absolute'}
              top={0}
              right={0}
              // onClick={()=> useData?.Function?.handleClose()}
            >
              <Icon as={MdClose} />
            </Button> */}
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default ChapterPage;
