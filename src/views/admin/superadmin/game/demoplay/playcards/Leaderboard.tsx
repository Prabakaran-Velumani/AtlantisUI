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
import { ScoreContext } from '../GamePreview';

// Afrith-modified-starts-07/Mar/24
const names = [
  { name: 'John', score: 300, allTimeScore: 1000 },
  { name: 'Jane', score: 400, allTimeScore: 800 },
  { name: 'Michael', score: 300, allTimeScore: 700 },
  { name: 'Emily', score: 200, allTimeScore: 600 },
  { name: 'David', score: 100, allTimeScore: 500 },
  { name: 'Sarah', score: 400, allTimeScore: 900 },
  { name: 'Daniel', score: 300, allTimeScore: 500 },
  { name: 'Jessica', score: 200, allTimeScore: 1000 },
  { name: 'Christopher', score: 100, allTimeScore: 1000 },
  { name: 'Amanda', score: 700, allTimeScore: 900 },
  { name: 'Matthew', score: 300, allTimeScore: 1000 },
  { name: 'Ashley', score: 500, allTimeScore: 900 },
  { name: 'Andrew', score: 500, allTimeScore: 700 },
  { name: 'Jennifer', score: 500, allTimeScore: 600 },
  { name: 'James', score: 400, allTimeScore: 500 },
  { name: 'Elizabeth', score: 300, allTimeScore: 900 },
  { name: 'Joseph', score: 200, allTimeScore: 900 },
  { name: 'Lauren', score: 100, allTimeScore: 900 },
  { name: 'Joshua', score: 500, allTimeScore: 700 },
  { name: 'Megan', score: 500, allTimeScore: 800 },
  { name: 'Robert', score: 100, allTimeScore: 900 },
  { name: 'Kayla', score: 100, allTimeScore: 800 },
  { name: 'William', score: 200, allTimeScore: 700 },
  { name: 'Samantha', score: 800, allTimeScore: 900 },
  { name: 'Daniel', score: 700, allTimeScore: 900 },
  { name: 'Emily', score: 500, allTimeScore: 800 },
  { name: 'Anthony', score: 400, allTimeScore: 700 },
  { name: 'Nicole', score: 100, allTimeScore: 1000 },
  { name: 'Brandon', score: 200, allTimeScore: 900 },
  { name: 'Amber', score: 300, allTimeScore: 1000 },
  { name: 'Ryan', score: 800, allTimeScore: 900 },
  { name: 'Rachel', score: 800, allTimeScore: 1000 },
  { name: 'Tyler', score: 100, allTimeScore: 900 },
  { name: 'Brittany', score: 400, allTimeScore: 800 },
  { name: 'Alexander', score: 300, allTimeScore: 1000 },
  { name: 'Stephanie', score: 200, allTimeScore: 600 },
  { name: 'Nicholas', score: 200, allTimeScore: 800 },
  { name: 'Heather', score: 100, allTimeScore: 600 },
  { name: 'Jacob', score: 100, allTimeScore: 600 },
  { name: 'Michelle', score: 400, allTimeScore: 700 },
  { name: 'Zachary', score: 200, allTimeScore: 600 },
  { name: 'Tiffany', score: 500, allTimeScore: 600 },
  { name: 'Kevin', score: 500, allTimeScore: 600 },
  { name: 'Melissa', score: 200, allTimeScore: 600 },
  { name: 'Steven', score: 400, allTimeScore: 1000 },
  { name: 'Rebecca', score: 200, allTimeScore: 800 },
  { name: 'Justin', score: 400, allTimeScore: 1000 },
  { name: 'Chelsea', score: 100, allTimeScore: 700 },
  { name: 'Brian', score: 400, allTimeScore: 600 },
  { name: 'Katherine', score: 400, allTimeScore: 500 }
]

const usersWithAllTimeScore = names.sort(() => Math.random() - 0.5).slice(0, 9);

// Afrith-modified-ends-07/Mar/24


const LeaderBoard: React.FC<{
  formData?: any;
  imageSrc?: any;
  getData?: any;
  data?: any;
  homeLeaderBoard?: any;
  setHomeLeaderBoard?: any;
  setCurrentScreenId?:any;
  gameInfo?: any;
  preloadedAssets: any;
}> = ({
  imageSrc,
  formData,
  getData,
  data,
  setCurrentScreenId,
  homeLeaderBoard,
  setHomeLeaderBoard,
  gameInfo,
  preloadedAssets
}) => {
  const content = [1, 2, 3, 4, 5, 6];

  const playerInfo = useContext(ProfileContext);
  const { profile } = useContext(ScoreContext);

    ///Afrith-modified-starts-09/Mar/24
    const profileInfo = useContext(ScoreContext);
    const mergedUsersPlayers = [playerInfo,...usersWithAllTimeScore];
  
    ///Sorted Using Score-starts for score position
    const sortedUsingScore = [...mergedUsersPlayers].sort((a, b) => b.score - a.score);
    ///Sorted Using Score-ends for score position
  
    ///Using unShift-starts - AllTimeScore
    const beforeSorting = [...mergedUsersPlayers].sort((a, b) => b.allTimeScore - a.allTimeScore);
    const sortedUsers = [...mergedUsersPlayers].sort((a, b) => b.allTimeScore - a.allTimeScore);
    const playerIndex = sortedUsers.findIndex(x => x.name === playerInfo.name);
    if (playerIndex !== -1) {
      // Remove it from its current position
      const unShiftedPlayer = sortedUsers.splice(playerIndex, 1)[0];
      // Add it to the beginning of the array
      sortedUsers.unshift(unShiftedPlayer);
    }
    ///Using unShift-ends - AllTimeScore

    ///Afrith-modified-ends-09/Mar/24
  const handleHome = () =>{
    if(homeLeaderBoard)
    {
      setCurrentScreenId(homeLeaderBoard);
      setHomeLeaderBoard(null);
    }
    else{
      if(gameInfo)
      {
        if(gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' && gameInfo?.reflectionQuestions.length > 0){
          setCurrentScreenId(3);//Navigate to Reflection screen
        }
        else if(gameInfo?.gameData?.gameIsShowTakeaway === 'true'){
          setCurrentScreenId(7);//Navigate to Takeaway screen
        }
        else{
          setCurrentScreenId(5);//Navigate to Thank you screen
        }
      }
    }
  }

  return (
    <>
      {imageSrc && (       
          <Box className="Leaderboard-screen">
            <Img src={imageSrc} className="leaderboard-img" />
            <Text className='title'>LeaderBoard</Text>
            <Box className="content-box">
                <Box className="table-heading"
                  fontFamily={'AtlantisText'}
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
                    src={preloadedAssets.Separator}
                    className="dot-img"
                    w={'10px'}
                    h={'65px'}
                    position={'relative'}
                  />
                  <Box w={'200px'} h={'50px'}>
                    {/* Afrith-modified-starts-07/Mar/24 */}
                    <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                      <Text color={'#D9C7A2'}>Daily</Text>
                    </Box>
                    {/* Afrith-modified-ends-07/Mar/24 */}
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
                    src={preloadedAssets.Separator}
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
                  {sortedUsers &&
                    // usersWithAllTimeScore.map((item: any, index: number) => (
                      sortedUsers.map((item: any, index: number) => (
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
                            src={preloadedAssets.Entry}
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
                                {item.name ? item.name : 'Guest'}
                              </Text>
                            </Box>
                            <Box
                              w={'30%'}
                              display={'flex'}
                              justifyContent={'space-between'}
                            >
                              <Text textAlign={'center'} color={'#D9C7A2'}>
                                {/* Afrith-modified-starts-09/Mar/24 */}
                                {sortedUsingScore ? sortedUsingScore.indexOf(item) + 1 : 0}
                                {/* Afrith-modified-ends-09/Mar/24 */}
                              </Text>
                              <Text textAlign={'center'} color={'#D9C7A2'}>
                                {item.score ? item.score : 0}
                              </Text>
                            </Box>
                            <Box
                              w={'30%'}
                              display={'flex'}
                              justifyContent={'space-between'}
                            >
                              <Text textAlign={'center'} color={'#D9C7A2'}>
                                {/* Afrith-modified-starts-09/Mar/24 */}
                                {item.name === playerInfo?.name ? beforeSorting.indexOf(beforeSorting.find(x => x.name === playerInfo?.name)) + 1 : beforeSorting ? beforeSorting.indexOf(item) + 1  : 0}
                                {/* Afrith-modified-ends-09/Mar/24 */}
                                {/* {index + 1} */}
                              </Text>
                              <Text textAlign={'center'} color={'#D9C7A2'}>
                                {item.allTimeScore ? item.allTimeScore : 0}
                              </Text>
                            </Box>
                          </Box>
                        </>
                      </Box>
                    ))}
                </Box>                
             
            </Box>
            <Box className='top-bar'>
              <Box className='list-wrapper'
              >                
                <Box className='heading-box'>
                  <Img
                    src={preloadedAssets.Label}
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
                     {/* Afrith-modified-starts-07/Mar/24 */}
                     <Text>Department</Text>
                    {/* Afrith-modifed-ends-07/Mar/24 */}
                    <Img
                      src={preloadedAssets.Arrow}
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
                    src={preloadedAssets.Label}
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
                    {/* Afrith-modified-starts-07/Mar/24 */}
                    <Text>Overall</Text>
                    {/* Afrith-modified-ends-07/Mar/24 */}
                    <Img
                      src={preloadedAssets.Arrow}
                      className="dot-img"
                      mt={'5px'}
                      ml={'3px'}
                      w={'30px'}
                      h={'30px'}
                      position={'relative'}
                    />{' '}
                  </Box>
                </Box>                
              </Box>
            </Box>  
            <Img
              src={preloadedAssets.Close}                   
              className='close-btn'
              onClick={() => homeLeaderBoard ? handleHome() : getData(data) }
            />          
          </Box>      
      )}
    </>
  );
};
export default LeaderBoard;