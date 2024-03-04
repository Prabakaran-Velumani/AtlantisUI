import { Box, Button, Icon, Img, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
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
import { ScoreContext } from '../GamePreview';

const ChapterPage: React.FC<{
  formData?: any;
  imageSrc: any;
  demoBlocks: any;
  setCurrentScreenId: any;
  questOptions?: any;
  currentQuestNo?:any;
}> = ({ imageSrc, demoBlocks, setCurrentScreenId, formData, questOptions,currentQuestNo }) => {
  const [questScores, setQuestScores] = useState(null);
  useEffect(() => {
    const groupedByQuest: any = {};
    questOptions.forEach((item: any) => {
      const questNo = item.qpQuestNo;
      if (!groupedByQuest[questNo]) {
        groupedByQuest[questNo] = [];
      }
      groupedByQuest[questNo].push(item);
    });
    const maxScoresByQuest: any = {};
    for (const questNo in groupedByQuest) {
      const questData = groupedByQuest[questNo];
      const maxScoresBySequence: any = {};

      questData.forEach((item: any) => {
        const sequence = item.qpSequence;
        const score = parseInt(item.qpScore);

        if (
          !maxScoresBySequence[sequence] ||
          score > maxScoresBySequence[sequence]
        ) {
          maxScoresBySequence[sequence] = score;
        }
      });
      const maxScoreForQuest = Object.values(maxScoresBySequence).reduce(
        (acc: any, score: any) => acc + score,
        0,
      );
      maxScoresByQuest[questNo] = maxScoreForQuest;
    }
    setQuestScores(maxScoresByQuest);

  }, []);
  const { profile } = useContext(ScoreContext);
  useEffect(()=>{
      if(profile.score.length !== 0) 
      {
        const completedLevels = profile.score.map((item:any)=> parseInt(item?.quest));
        console.log(completedLevels);
      } 
    },[profile])
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
                    {demoBlocks &&
                      Object.keys(demoBlocks).map((it, num) => (
                        <Box
                          className="queue-box"
                          key={num}
                          onClick={() => setCurrentScreenId(1)}
                        >
                          <Img className="queue-screen" src={QueueScreen} />
                          <Text className="heading">Quest {num + 1}</Text>
                          <Box className="badge">
                            {parseInt(it) >= currentQuestNo ? (
                              <Img src={Lock} className="lock" />
                            ) : null}
                            <Img src={Demo} />
                          </Box>
                          <Text className="text"></Text>
                          <Box className="bottom-box">
                            <Text className="amount-score">
                              {(profile &&
                                profile.score &&
                                profile.score.length > 0 &&
                                profile.score.reduce(
                                  (accumulator: number, currentValue: any) => {
                                    return currentValue.quest === it
                                      ? accumulator + currentValue.score
                                      : accumulator;
                                  },
                                  0,
                                )) ||
                                0}
                              /{questScores && questScores[it]}{' '}
                              <Icon as={BiMoney} />
                            </Text>
                          </Box>
                        </Box>
                      ))}
                  </SimpleGrid>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default ChapterPage;
