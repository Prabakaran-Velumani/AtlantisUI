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
import { useContext } from 'react';
import { ProfileContext } from '../EntirePreview';
const LeaderBoard: React.FC<{
  formData: any;
  imageSrc: any;
  getData: any;
  data: any;
  homeLeaderBoard: any;
  setHomeLeaderBoard: any;
  setCurrentScreenId?:any;
}> = ({
  imageSrc,
  formData,
  getData,
  data,
  setCurrentScreenId,
  homeLeaderBoard,
  setHomeLeaderBoard,
}) => {
  const content = [1, 2, 3, 4, 5, 6];
  const names = [
    'John',
    'Jane',
    'Michael',
    'Emily',
    'David',
    'Sarah',
    'Daniel',
    'Jessica',
    'Christopher',
    'Amanda',
    'Matthew',
    'Ashley',
    'Andrew',
    'Jennifer',
    'James',
    'Elizabeth',
    'Joseph',
    'Lauren',
    'Joshua',
    'Megan',
    'Robert',
    'Kayla',
    'William',
    'Samantha',
    'Daniel',
    'Emily',
    'Anthony',
    'Nicole',
    'Brandon',
    'Amber',
    'Ryan',
    'Rachel',
    'Tyler',
    'Brittany',
    'Alexander',
    'Stephanie',
    'Nicholas',
    'Heather',
    'Jacob',
    'Michelle',
    'Zachary',
    'Tiffany',
    'Kevin',
    'Melissa',
    'Steven',
    'Rebecca',
    'Justin',
    'Chelsea',
    'Brian',
    'Katherine',
  ];
  const playerInfo = useContext(ProfileContext);
  const namesWithScores = names.map((name) => ({
    name,
    score: Math.floor(Math.random() * 101) * 10,
  }));
  // Generate random scores for each name (0-100)

  const shuffledNamesWithScores = namesWithScores.sort(
    () => Math.random() - 0.5,
  );
  // Shuffle the array of objects

  const selectedNamesWithScores = shuffledNamesWithScores.slice(0, 10);
  // Select the first 10 elements

  const sortedSelectedNamesWithScores = selectedNamesWithScores.sort(
    (a, b) => b.score - a.score,
  );
  // Sort the selected names based on score (descending order)

  const usersWithAllTimeScore = sortedSelectedNamesWithScores.map((user) => {
    const allTimeScore =
      user.score + Math.floor(Math.random() * (2001 - user.score) * 10);
    // Generate a random allTimeScore between the user's current score and 2000
    return { ...user, allTimeScore };
  });

  const randomPosition = Math.floor(Math.random() * 10);
  usersWithAllTimeScore[randomPosition] = {
    ...usersWithAllTimeScore[randomPosition],
    name: playerInfo.name,
  };

  const handleHome = () =>{
    setHomeLeaderBoard(false);
    setCurrentScreenId(10)
  }

 

  return (
    <>
      {imageSrc && (       
          <Box className="Leaderboard-screen">
            <Img src={imageSrc} className="leaderboard-img" />
            <Box className="content-box">
                <Box className="table-heading"
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
                    <Text color={'#D9C7A2'}>
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
                <Box>
                  {/* {content && content.map((it: any, ind: number) => ( */}
                  {usersWithAllTimeScore &&
                    usersWithAllTimeScore.map((item: any, index: number) => (
                      <Box
                        className="content-lead"                       
                        key={index}
                        _hover={{
                          filter: 'grayscale(50%)',
                          transform: 'scale(1.02)',
                          transition: 'transform 0.3s ease-in-out',
                          opacity: '0.8',
                        }}
                      >
                        <>
                          <Img
                            src={Entry}
                            className="list-pad"                           
                            _hover={{ filter: 'grayscale(50%)' }}
                          />
                          <Box className='list-wrapper'                           
                            _hover={{ filter: 'grayscale(50%)' }}
                          >
                            <Box w={'30%'}>
                              <Text
                                textAlign={'center'}                               
                                color={'#D9C7A2'}
                              >
                                {item.name}
                              </Text>
                            </Box>
                            <Box
                              w={'30%'}
                              display={'flex'}
                              justifyContent={'space-between'}
                            >
                              <Text textAlign={'center'} color={'#D9C7A2'}>
                                {index + 1}
                              </Text>
                              <Text textAlign={'center'} color={'#D9C7A2'}>
                                {item.score}
                              </Text>
                            </Box>
                            <Box
                              w={'30%'}
                              display={'flex'}
                              justifyContent={'space-between'}
                            >
                              <Text textAlign={'center'} color={'#D9C7A2'}>
                                {index + 1}
                              </Text>
                              <Text textAlign={'center'} color={'#D9C7A2'}>
                                {item.allTimeScore}
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
            <Box className='top-bar'>
              <Box className='list-wrapper'
                // w={'550px'}
                // display={'flex'}
                // justifyContent={'space-between'}
                // position={'relative'}
              >
                <Box className='heading-box'>
                  <Img
                    src={Label}
                    className="heading-box-img"
                    w={'200px'}
                    h={'60px'}
                    position={'relative'}
                  />{' '}
                  <Box className='heading-box-content'
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
                <Box className='heading-box'>
                  <Img
                    src={Label}
                    className="heading-box-img"
                    w={'200px'}
                    h={'60px'}
                    position={'relative'}
                  />{' '}
                  <Box className='heading-box-content'
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
                <Box className='heading-box'>
                  <Img
                    src={Label}
                    className="heading-box-img"
                    w={'200px'}
                    h={'60px'}
                    position={'relative'}
                  />{' '}
                  <Box className='heading-box-content'
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
                  className='close-btn'
                  onClick={() =>homeLeaderBoard ? handleHome() : getData(data)}
                />
              </Box>
            </Box>
          </Box>      
      )}
    </>
  );
};
export default LeaderBoard;
