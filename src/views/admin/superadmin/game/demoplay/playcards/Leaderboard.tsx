import { Img, Text, SimpleGrid, Box } from '@chakra-ui/react';
import React, { useEffect, useState ,useContext } from 'react';
import { ProfileContext } from '../EntirePreview';
import { ScoreContext } from '../GamePreview';

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
  { name: 'Katherine', score: 400, allTimeScore: 500 },
];

const usersWithAllTimeScore = names.sort(() => Math.random() - 0.5).slice(0, 9);
const LeaderBoard: React.FC<{
  formData?: any;
  imageSrc?: any;
  getData?: any;
  data?: any;
  homeLeaderBoard?: any;
  setHomeLeaderBoard?: any;
  setCurrentScreenId?: any;
  gameInfo?: any;
  preloadedAssets: any;
  profile?: any;
}> = ({
  imageSrc,
  formData,
  getData,
  data,
  setCurrentScreenId,
  homeLeaderBoard,
  setHomeLeaderBoard,
  gameInfo,
  preloadedAssets,
  profile
}) => {
  const [sortAscOrder, setSortAscOrder] = useState({ daily: true, allTime: true });
  const [shuffledUsers, setShuffledUsers] = useState<any[]>([]);
  const [playerInfo, setplayerInfo] = useState<any>({});
  const palyerProfile = useContext(ProfileContext);

  useEffect(() => {
    /** all time score of a player calculated based on quest wise total, inclusive of currently played Quest total*/    
    const PlayerAlltimeScore : any = Object.values(profile?.playerGrandTotal).reduce((total: any, acc: any)=>{
      if (typeof total === 'number' && acc > 0) {
        return total + acc;
      } else {
        return acc;
      }
    }, 0);
    const playerInfo = {name : palyerProfile.name ,score : 600, allTimeScore: PlayerAlltimeScore ? PlayerAlltimeScore :0 };
    const mergedUsersPlayers = [playerInfo, ...names].sort((a, b) => {
      // Sort by allTimeScore in descending order
      if (b.allTimeScore !== a.allTimeScore) {
        return b.allTimeScore - a.allTimeScore;
      }
      // If allTimeScores are equal, sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

    //Sorted Using Score-starts for score position
    let sortedUsingScore = [...mergedUsersPlayers].sort((a, b) => {
      // Sort by daily score in descending order
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // If scores are equal, sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

    let dailyPositionIndex = -1;
    sortedUsingScore = sortedUsingScore.map((usrScore: any, index: number) => {
      dailyPositionIndex = index + 1;
      let alltimePositionIndex = -1;
      let alltimePosition = mergedUsersPlayers.find(
        (userDetail: any, indexvalue: number) => {
          if (
            userDetail.name == usrScore.name &&
            userDetail.score == usrScore.score &&
            userDetail.allTimeScore == usrScore.allTimeScore
          ) {
            alltimePositionIndex = indexvalue + 1;
            return true;
          }
        },
      );
      return {
        ...usrScore,
        dailyPosition: dailyPositionIndex,
        alltimePosition: alltimePositionIndex,
      };
    });

    const playerIndex = sortedUsingScore.findIndex(
      (x) => x.name === playerInfo.name,
    );

    if (playerIndex !== -1) {
      // Remove it from its current position
      const unShiftedPlayer = sortedUsingScore.splice(playerIndex, 1)[0];

      // Add it to the beginning of the array
      sortedUsingScore.unshift(unShiftedPlayer);
      setShuffledUsers(sortedUsingScore);
    }
  }, []);

  const handleAllTimeClick = async (type: string) => {
    let newSortedUsers = [...shuffledUsers];
    if (type === 'daily') {
      setSortAscOrder((prev: any) => ({ ...prev, daily: !prev.daily }));

      newSortedUsers = [...shuffledUsers].sort((a: any, b: any) => {
        if (sortAscOrder.daily) {
          if (a.score !== b.score) {
            return a.score - b.score;
          } else {
            return b.name.localeCompare(a.name);
          }
        } else {
          // Sort by score in descending order
          if (b.score !== a.score) {
            return b.score - a.score;
          } else {
            return a.name.localeCompare(b.name);
          }
        }
      });
      newSortedUsers = newSortedUsers.map((row: any, index: number) => ({
        ...row,
      }));
    } else if (type === 'alltime') {
      setSortAscOrder((prev: any) => ({ ...prev, allTime: !prev.allTime }));
      // Sort the users by all-time score
      newSortedUsers = [...shuffledUsers].sort((a: any, b: any) => {
        if (sortAscOrder.allTime) {
          if (b.allTimeScore !== a.allTimeScore) {
            return b.allTimeScore - a.allTimeScore;
          } else {
            return a.name.localeCompare(b.name);
          }
        } else {
          // Sort by allTimeScore in descending order
          if (a.allTimeScore !== b.allTimeScore) {
            return a.allTimeScore - b.allTimeScore;
          } else {
            return b.name.localeCompare(a.name);
          }
        }
      });

      newSortedUsers = newSortedUsers.map((row: any, index: number) => ({
        ...row,
      }));
    }

    // If playerData exists, move it to the first position
    const playerData = newSortedUsers.find(
      (user) => user.name === playerInfo.name,
    );
    if (playerData) {
      const playerIndex = newSortedUsers.findIndex(
        (x) => x.name === playerData.name,
      );

      if (playerIndex !== -1) {
        // Remove it from its current position
        const unShiftedPlayer = newSortedUsers.splice(playerIndex, 1)[0];
        // Add it to the beginning of the array
        newSortedUsers.unshift(unShiftedPlayer);
      }
    }
    // Update the state with the new sorted users
    setShuffledUsers(newSortedUsers);
  };

  ///Afrith-modified-ends-09/Mar/24
  const handleHome = () => {
    if (homeLeaderBoard) {
      setCurrentScreenId(homeLeaderBoard);
      setHomeLeaderBoard(null);
    } else {
      if (gameInfo) {
        if (
          gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' &&
          gameInfo?.reflectionQuestions.length > 0
        ) {
          setCurrentScreenId(3); //Navigate to Reflection screen
        } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
          setCurrentScreenId(7); //Navigate to Takeaway screen
        } else {
          setCurrentScreenId(5); //Navigate to Thank you screen
        }
      }
    }
  };

  return (
    <>
      {imageSrc && (
        <Box className="Leaderboard-screen">
          <Img src={imageSrc} className="leaderboard-img" />
          <Text className="title">LeaderBoard</Text>
          <Box className="content-box">
            <Box
              className="table-heading"
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
                <Text color={'#D9C7A2'}>Name</Text>
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
                  <Text color={'#D9C7A2'}>Daily</Text>
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
              {shuffledUsers &&
                shuffledUsers.map((item: any, index: number) => (
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
                      <Box
                        className="list-wrapper"
                        _hover={{ filter: 'grayscale(50%)' }}
                      >
                        <Box w={'30%'}>
                          <Text textAlign={'center'} color={'#D9C7A2'}>
                            {item.name ? item.name : 'Guest'}
                          </Text>
                        </Box>
                        <Box
                          w={'30%'}
                          display={'flex'}
                          justifyContent={'space-between'}
                        >
                          <Text textAlign={'center'} color={'#D9C7A2'}>
                            {item.dailyPosition !== undefined ? item.dailyPosition : index + 1}
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
                          {item.alltimePosition !== undefined ? item.alltimePosition : index + 1}
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
          <Box className="top-bar">
            <Box className="list-wrapper">
              <Box className="heading-box">
                <Img
                  src={preloadedAssets.Label}
                  className="heading-box-img"
                  w={'200px'}
                  h={'60px'}
                  position={'relative'}
                />{' '}
                <Box
                  className="heading-box-content"
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
              <Box className="heading-box">
                <Img
                  src={preloadedAssets.Label}
                  className="heading-box-img"
                  w={'200px'}
                  h={'60px'}
                  position={'relative'}
                />{' '}
                <Box
                  className="heading-box-content"
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
                 
                  <Text>Overall</Text>
                  
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
            className="close-btn"
            onClick={() => (homeLeaderBoard ? handleHome() : getData(data))}
          />
        </Box>
      )}
    </>
  );
};
export default LeaderBoard;
