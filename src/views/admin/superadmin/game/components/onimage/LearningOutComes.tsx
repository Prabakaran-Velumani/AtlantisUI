import React from 'react';
import { Box, Img, Text } from '@chakra-ui/react';

const LearningOutComes:React.FC<{data: any, preloadAssets: any}> = ({data, preloadAssets}) => {
  return (
    <>
    {data &&
        data.map((it: any, ind: number) => {
          const bulletIndex = it.indexOf('\u2022');
          const contentAfterBullet =
            bulletIndex !== -1
              ? it.slice(bulletIndex + 1).trim()
              : it;
          return (
            <Box display={'flex'} key={ind}>
              <Img src={preloadAssets.write} w={'25px'} h={'25px'} />
              <Box>
                <Box
                  display={'flex'}
                  w={'50px'}
                  h={'20px'}
                  justifyContent={'space-between'}
                  font-weight={'300'}
                  margin-left={'5px'}
                >
                  <Text color={'#D9C7A2'}>
                    {contentAfterBullet}
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        })}
</>
)}

export default LearningOutComes;