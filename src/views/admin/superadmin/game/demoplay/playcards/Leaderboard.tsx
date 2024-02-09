import { Img, Text, SimpleGrid, Box } from '@chakra-ui/react';
import React from 'react';

/* for reflection question inside the image */
import ref from 'assets/img/screens/refquestions.png';
import qs from 'assets/img/screens/QS.png';
import Entry from 'assets/img/games/entry.png';
import Label from 'assets/img/games/label.png';
import Separator from 'assets/img/games/separator.png';
import Close from 'assets/img/games/close.png';
import Arrow from 'assets/img/games/arrow.png';
const LeaderBoard: React.FC<{
  formData: any;
  imageSrc: any;
  getData: any;
  data: any;
}> = ({ imageSrc, formData, getData, data }) => {
  const content = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {imageSrc && (
        <Box className="takeaway-screen">
          <Box className="takeaway-screen-box">
            <Img src={imageSrc} className="bg-lead" />
            <Box
              className="content-box"
              width={'633px !important'}
              overflowY={'scroll'}
              position={'absolute'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
            >
              <Box>
                <Box
                  className="content-lead"
                  fontFamily={'AtlantisText'}
                  // color={'#D9C7A2'}
                  display={'flex'}
                >
                  <Box
                    w={'200px'}
                    h={'50px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Text color={'#D9C7A2'} fontSize={'x-large'}>
                      Name
                    </Text>
                  </Box>
                  <Img
                    src={Separator}
                    className="dot-img"
                    w={'10px'}
                    h={'65px'}
                    position={'relative'}
                  />
                  <Box w={'200px'} h={'50px'}>
                    <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                      <Text color={'#D9C7A2'}>Monthly</Text>
                    </Box>
                    <Box
                      w={'100%'}
                      display={'flex'}
                      justifyContent={'space-between'}
                    >
                      <Text textAlign={'center'} color={'#D9C7A2'}>
                        Position
                      </Text>
                      <Text textAlign={'center'} color={'#D9C7A2'}>
                        Score
                      </Text>
                    </Box>
                  </Box>
                  <Img
                    src={Separator}
                    className="dot-img"
                    w={'10px'}
                    h={'65px'}
                    position={'relative'}
                  />
                  <Box w={'200px'} h={'50px'}>
                    <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                      <Text color={'#D9C7A2'}>All Time</Text>
                    </Box>
                    <Box
                      w={'100%'}
                      display={'flex'}
                      justifyContent={'space-between'}
                    >
                      <Text textAlign={'center'} color={'#D9C7A2'}>
                        Position
                      </Text>
                      <Text textAlign={'center'} color={'#D9C7A2'}>
                        Score
                      </Text>
                    </Box>
                  </Box>
                </Box>
                {content &&
                  content.map((it: any, ind: number) => (
                    <Box
                      className="content-lead"
                      fontFamily={'AtlantisText'}
                      // color={'#D9C7A2'}
                    >
                      <>
                        <Img
                          src={Entry}
                          className="dot-img"
                          w={'98%'}
                          h={'50px'}
                          ml={'10px'}
                          position={'relative'}
                        />
                        <Box
                          position={'absolute'}
                          left={'25px'}
                          w={'93%'}
                          display={'flex'}
                          justifyContent={'space-between'}
                        >
                          <Box w={'30%'}>
                            <Text textAlign={'center'} color={'#D9C7A2'}>
                              Cilian morphy
                            </Text>
                          </Box>
                          <Box
                            w={'30%'}
                            display={'flex'}
                            justifyContent={'space-between'}
                          >
                            <Text textAlign={'center'} color={'#D9C7A2'}>
                              1
                            </Text>
                            <Text textAlign={'center'} color={'#D9C7A2'}>
                              2525
                            </Text>
                          </Box>
                          <Box
                            w={'30%'}
                            display={'flex'}
                            justifyContent={'space-between'}
                          >
                            <Text textAlign={'center'} color={'#D9C7A2'}>
                              1
                            </Text>
                            <Text textAlign={'center'} color={'#D9C7A2'}>
                              2590
                            </Text>
                          </Box>
                        </Box>
                      </>
                    </Box>
                  ))}
              </Box>
              {/* <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
                <Img
                  src={right}
                  w={'50px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => getData(data)}
                />
              </Box> */}
            </Box>
            <Box
              w={'100%'}
              position={'absolute'}
              display={'flex'}
              justifyContent={'center'}
              top={'130px'}
            >
              <Box
                w={'550px'}
                display={'flex'}
                justifyContent={'space-between'}
                position={'relative'}
              >
                <Box>
                  <Img
                    src={Label}
                    className="dot-img"
                    w={'200px'}
                    h={'60px'}
                    position={'relative'}
                  />{' '}
                  <Box
                    top={'0'}
                    fontFamily={'AtlantisText'}
                    // color={'#D9C7A2'}
                    fontSize={'x-large'}
                    position={'absolute'}
                    display={'flex'}
                    justifyContent={'center'}
                    width={'200px'}
                    mt={'3px'}
                  >
                    <Text>Your Region</Text>
                    <Img
                      src={Arrow}
                      className="dot-img"
                      mt={'5px'}
                      ml={'3px'}
                      w={'30px'}
                      h={'30px'}
                      position={'relative'}
                    />{' '}
                  </Box>
                </Box>
                <Box>
                  <Img
                    src={Label}
                    className="dot-img"
                    w={'200px'}
                    h={'60px'}
                    position={'relative'}
                  />{' '}
                  <Box
                    top={'0'}
                    fontFamily={'AtlantisText'}
                    // color={'#D9C7A2'}
                    fontSize={'x-large'}
                    position={'absolute'}
                    display={'flex'}
                    justifyContent={'center'}
                    width={'200px'}
                    mt={'3px'}
                  >
                    <Text>Your Region</Text>
                    <Img
                      src={Arrow}
                      className="dot-img"
                      mt={'5px'}
                      ml={'3px'}
                      w={'30px'}
                      h={'30px'}
                      position={'relative'}
                    />{' '}
                  </Box>
                </Box>
                <Box>
                  <Img
                    src={Label}
                    className="dot-img"
                    w={'200px'}
                    h={'60px'}
                    position={'relative'}
                  />{' '}
                  <Box
                    top={'0'}
                    fontFamily={'AtlantisText'}
                    // color={'#D9C7A2'}
                    fontSize={'x-large'}
                    position={'absolute'}
                    display={'flex'}
                    justifyContent={'center'}
                    width={'200px'}
                    mt={'3px'}
                  >
                    <Text>Your Region</Text>
                    <Img
                      src={Arrow}
                      className="dot-img"
                      mt={'5px'}
                      ml={'3px'}
                      w={'30px'}
                      h={'30px'}
                      position={'relative'}
                    />{' '}
                  </Box>
                </Box>
                <Img
                  src={Close}
                  w={'50px'}
                  h={'50px'}
                  position={'absolute'}
                  top={'-55px'}
                  right={'-40px'}
                  cursor={'pointer'}
                  onClick={() => getData(data)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default LeaderBoard;
