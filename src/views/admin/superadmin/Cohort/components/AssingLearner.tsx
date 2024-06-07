import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useParams } from 'react-router-dom';
// Chakra imports
import {
  Flex,
  SimpleGrid,
  Text,
  Box,
  Button,
  useColorModeValue,
  useToast,
  CircularProgress,
  FormLabel,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react';
import Select from 'react-select';
// Custom Imports
import InputField from 'components/fields/InputField';
import Card from 'components/card/Card';
import OnToast from 'components/alerts/toast';
import { learnerListData, addcohorts, updatecohortsLearner, checkCohorts, updatecohorts,gamesListData, updatecohortsgame } from 'utils/cohorts/cohorts';
const AssignCohorts: React.FC = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    chCohortsName: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState<string>('');
  const [toastStatus, setToastStatus] = useState<string>('');
  const navigate = useNavigate(); // Use the useNavigate hook
  const [AllLearnerList, setAllLearnerList] = useState([]); // this state for Maitain Learner List 
  const [learnerFilterList, setLearnerFilterList] = useState([]); // this state for Maitain  Filter Learner List 
  const [searchMail, setSearchMail] = useState([]); // this state for Maitain for search Learner Mail 
  const [LearnerAssignData, setLearnerAssignData] = useState([]); // this state for Maitain Cohorts Assigned Learner List 
  const [cohortsId, setCohortsId] = useState<any>(null); // this state for Maitain CohortsId 
  const user: any = JSON.parse(localStorage.getItem('user'));
  const [selectedLearnerItems, setSelectedLearnerItems] = useState<any>([]); // this state for Maitain which learner are Eligible to Assign Cohorts Learner List 
  const [selectedGameItems, setSelectedGameItems] = useState<any>([]); // this state for Maitain which game are Eligible to Assign Cohorts game List 
  const [allSelected, setAllSelected] = useState(false); // this state for Maitain All learner to Assign Cohorts
  const [tabState, setTabState] = useState('Assignlearner');
  const [allGames, setAllGames] = useState([]); // this state for maitain All game data 
  const [filterGamesList, setFilterGamesList] = useState([]); // this state for Maitain  Filter game List 
  const [searchGame, setSearchGame] = useState([]); // this state for Maitain for search game  Name 
  const [GameAssignData, setGameAssignData] = useState([]);
  const { id } = useParams();

  const handleBack = () => {
    // Navigate back to the previous page
    navigate('/admin/superadmin/cohort/');
  };
  const fetchData = async (getCohortsId:number) => {
    if (getCohortsId) {
      try {
        const cohortId = getCohortsId;
        const result = await checkCohorts(cohortId);
        if (result.status !== 'Success') {
          console.log('getIndustry Error', result?.message);
          // Handle error, e.g., set an error state or show an error message
        } else {
          let cohorsData = result?.data;
          setFormData({
            chCohortsName: cohorsData.chCohortsName,
          });
          setCohortsId(getCohortsId);
          /********************This For Learner Assigned Data************************************************ */
          if (cohorsData.learnersListAssigned.length > 0) {
            setLearnerAssignData(cohorsData.learnersListAssigned);
            let lengetData: any = [];
            const lenIdAssigned = cohorsData.learnersListAssigned.map((item: any) => {
              lengetData.push(item.lenId);
            });
            const data = JSON.stringify(user.data);
            const learnerList = await learnerListData(data);
            if (learnerList.status === 'Success') {
              const learnersNotAssigned = learnerList?.data.map((item: any) => {
                if (!lengetData.includes(item.lenId)) {
                  return item;
                }
                return undefined;
              })
                .filter((item: any) => item !== undefined);
              setAllLearnerList(learnersNotAssigned);
            }
          }
           /********************This For game Assigned Data************************************************ */
          if (cohorsData.gameListAssigned.length > 0) {
            setGameAssignData(cohorsData.gameListAssigned);

            let gamegetData: any = [];
            const gameIdAssigned = cohorsData.gameListAssigned.map((item: any) => {
              gamegetData.push(item.gameId);
            });
            const data = JSON.stringify(user.data);
            const GamesList = await gamesListData(data);
            if (GamesList.status === 'Success') {
              // setAllGames(GamesList?.data);
              const learnersNotAssigned = GamesList?.data
                .map((item:any) => {
                  if (!gamegetData.includes(item.gameId)) {
                    return item;
                  }
                  return undefined;
                })
                .filter((item:any) => item !== undefined);
              setAllGames(learnersNotAssigned);
            }
          }
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    }
  };
  useEffect(() => {
if(id!==null)
  {
    fetchData(parseInt(id));
  }
  }, [id])
  useEffect(() => {
    setLearnerFilterList([]);
    setAllSelected(false);
    if (tabState === 'Assignlearner') {
      // setSelectedItems([]);
      setSelectedLearnerItems([]);
      if (LearnerAssignData.length === 0) {
        learnerList();
      }
    }
    else if (tabState === 'AssignGames') {
      // setSelectedItems([]);
      setSelectedGameItems([])
      // setAllSelected(false);
      if (GameAssignData.length === 0) {
        gamesList();
      }
    }


  }, [tabState])
  useEffect(() => {
    if(tabState === 'Assignlearner')
      {
        if (searchMail.length > 0) {
          const FilterValue = AllLearnerList.filter(option => searchMail?.includes(option.lenId));
          setLearnerFilterList(FilterValue);
        }
        else {
          setLearnerFilterList([])
        }
      }
    else if(tabState === 'AssignGames')
      {
        if (searchGame.length > 0) {
          const FilterValue = allGames.filter(option => searchGame?.includes(option.gameId));
          setFilterGamesList(FilterValue);
        }
        else {
          setFilterGamesList([])
        }
      }
  }, [searchMail,searchGame]);


  /********************** For Learners Function start *********************************** */
  const learnerList = async () => {
    const data = JSON.stringify(user.data);
    const AlllearnerList = await learnerListData(data);
    if (AlllearnerList.status === 'Success') {
      setAllLearnerList(AlllearnerList?.data);
    }
  }
  const handleLearnerSelectedData = (item: any) => {
    if (allSelected === true) {
      setAllSelected(false);
      setSelectedLearnerItems([])
    }
    else {
      if (selectedLearnerItems.includes(item)) {
        setSelectedLearnerItems(selectedLearnerItems.filter((i: any) => i !== item));
      } else {
        setSelectedLearnerItems([...selectedLearnerItems, item]);
      }
    }
  };
  const handleLearnerSelectAll = () => {
    if (allSelected) {
      // setSelectedItems([]);
      setSelectedLearnerItems([]);
    } else {
      let pushAllLearnerId: any = [];
      const lenId = AllLearnerList.map((item: any) => {
        pushAllLearnerId.push(item.lenId)
      });
      // setSelectedItems(pushAllLearnerId);
      setSelectedLearnerItems(pushAllLearnerId);
    }
    setAllSelected(!allSelected);
  };
  const handleLearnerAssign = async () => {
    if (!formData.chCohortsName) {
      setMsg('Please enter the Cohorts name ');
      setToastStatus('error');
      setAlert(true);
      return false;
    }
    if (selectedLearnerItems.length === 0) {
      setMsg('Please Select the learners  ');
      setToastStatus('error');
      setAlert(true);
      return false;
    }

    if (selectedLearnerItems.length > 0) {
      const data = {
        chCohortsName: formData.chCohortsName,
      };
      let cohortsResult;
      if (cohortsId === null) {
        cohortsResult = await addcohorts(data);
      }
      else {

        cohortsResult = await updatecohorts(cohortsId, JSON.stringify(data));
      }
      if (cohortsResult.status === 'Success') {
        setCohortsId(cohortsResult.data.chId);
        const data = {
          lenId: selectedLearnerItems,
          lenCohorts: cohortsResult.data.chId,
        };
        const result = await updatecohortsLearner(JSON.stringify(data));
        if (result.status === 'success') {
          setAllSelected(false);
          setSearchMail([]);
          if(cohortsId!==null)
            {
              fetchData(cohortsId);
            }
            else{
              fetchData(cohortsResult.data.chId);
            }
        }
      }


    }
  }

  /********************** For Learners Function End *********************************** */
  /********************** For Game Function start *********************************** */
  const handleGameSelectedData = (item: any) => {
    if (allSelected === true) {
      setAllSelected(false);
      setSelectedGameItems([])
    }
    else {
      if (selectedGameItems.includes(item)) {
        setSelectedGameItems(selectedGameItems.filter((i: any) => i !== item));
      } else {
        setSelectedGameItems([...selectedGameItems, item]);
      }
    }
  };

  
  const gamesList = async () => {
    const data = JSON.stringify(user.data);
    const AllGamesList = await gamesListData(data);
    if (AllGamesList.status === 'Success') {
      setAllGames(AllGamesList?.data);
    }
  }
  const handleGameSelectAll = () => {
    if (allSelected) {
      // setSelectedItems([]);

      setSelectedGameItems([]);
    } else {
      let pushAllGameId: any = [];
      const gameId = allGames.map((item: any) => {
        pushAllGameId.push(item.gameId)
      });
      // setSelectedItems(pushAllGameId);
      setSelectedGameItems(pushAllGameId);
    }
    setAllSelected(!allSelected);
  };
  const handleGameAssign = async () => {
    if (tabState === 'AssignGames') {

      if (!formData.chCohortsName) {
        setMsg('Please enter the Cohorts name ');
        setToastStatus('error');
        setAlert(true);
        return false;
      }
      if (selectedGameItems.length === 0) {
        setMsg('Please Select the Games');
        setToastStatus('error');
        setAlert(true);
        return false;
      }
      if (selectedGameItems.length > 0) {
        const data = {
          chCohortsName: formData.chCohortsName,
        };
        let cohortsResult;
        if (cohortsId === null) {
          cohortsResult = await addcohorts(data);
        }
        else {
          cohortsResult = await updatecohorts(cohortsId, JSON.stringify(data));
        }
        if (cohortsResult.status === 'Success') {
          setCohortsId(cohortsResult.data.chId);
          const data = {
            gameId: selectedGameItems,
            gameCohorts: cohortsResult.data.chId,
          };
          const result = await updatecohortsgame(JSON.stringify(data));
          if (result.status === 'success') {
            setAllSelected(false);
            setSearchGame([]);
            if(cohortsId!==null)
            {
              fetchData(cohortsId);
            }
            else{
              fetchData(cohortsResult.data.chId);
            }
          }
        }
      }
    }


  }
  /********************** For Game Function End *********************************** */
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  if (loading) {
    return <CircularProgress isIndeterminate color="blue.300" />;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, chCohortsName: value });
    // setSelectedItems([]);
    setSelectedLearnerItems([]);
    setSelectedGameItems([]);
  };
 
  
  const styles = {
    app: {
      display: 'flex',
      width: '100%',
      height: '100vh',
    },
    container: {
      flex: 1,
      overflowY: 'scroll' as 'scroll',
      padding: '20px',
      boxSizing: 'border-box' as 'border-box',
    },
    leftContainer: {
      backgroundColor: '#f0f0f0',
    },
    rightContainer: {
      backgroundColor: '#d0d0d0',
    },
    content: {
      height: '1500px', // This is to demonstrate the scroll effect
    },
  };

  const customStyles = {
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: '15px',
      height: '45px',
      padding: '0 !important',
      width: '100%',
    }),
  };
  const formattedOptions = AllLearnerList.map(learner => ({
    label: learner.lenMail, // or any other property you want to display
    value: learner.lenId,   // or any other unique identifier
    lenMail: learner.lenMail,
  }));

  const handleOption = (selected: any) => {
    const mergedOptions = selected.map(((item: any) => item.value));
    // Update the state with the merged options
    setSearchMail(mergedOptions);
  }
  const formattedGameOptions = allGames.map(game => ({
    label: game.gameTitle, // or any other property you want to display
    value: game.gameId,   // or any other unique identifier
    // lenMail: learner.lenMail,
  }));

  const handleGameOption = (selected: any) => {
    const mergedOptions = selected.map(((item: any) => item.value));
    // Update the state with the merged options
    setSearchGame(mergedOptions);

  }
  return (
    <>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={'75px'} position={'relative'}>
        <Card bg={'linear-gradient(to bottom, #7551ff, #3311db)'} w={'100%'} h={'300'} position={'absolute'} alignItems={'center'}></Card>
        <Card mb={{ base: '0px', xl: '20px' }} width={{ sm: '95%', lg: '70%' }} marginTop={'120px'}>
          <Flex direction="column" ms="10px">
            {/* <Button
              mt="20px"
              mr="100%"
              variant={tabState === 'Assignlearner' ? "darkBrand" : "light"}
              fontSize="sm"
              borderRadius="16px"
              w={{ base: '128px', md: '148px' }}
              h="46px"
              ms="auto"
              onClick={() => {
                setTabState('Assignlearner');
              }}
            >
              Assing Learners
            </Button> */}
            <Tabs>
              <TabList>
                <Tab
                  mt="20px"
                  mr="20px"
                  // variant={tabState === 'Assignlearner' ? "darkBrand" : "light"}
                  fontSize="sm"
                  borderRadius="16px"
                  w={{ base: '128px', md: '148px' }}
                  h="46px"
                  ms="auto"
                  onClick={() => {
                    setTabState('Assignlearner');
                  }}
                >
                  Assign Learners
                </Tab>
                <Tab
                  mt="20px"
                  mr="200px"
                  // variant={tabState === 'AssignGames' ? "darkBrand" :"light"}

                  fontSize="sm"
                  borderRadius="16px"
                  w={{ base: '128px', md: '148px' }}
                  h="46px"
                  ms="auto"
                  onClick={() => {
                    setTabState('AssignGames');
                  }}
                >
                  Assign Games
                </Tab>
              </TabList>
              {/* Add TabPanels and other related components here if needed */}
            </Tabs>
          </Flex>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
            <Flex direction="column" ms="10px">
              <InputField
                mb="0px"
                me="30px"
                name="itIndustryName"
                value={formData.chCohortsName}
                onChange={handleChange}
                label="Cohorts Name"
                placeholder="eg. High Demand"
                isRequired={true}
              />
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
            <Box>
              <FormLabel fontWeight='bold' fontSize='sm' mb='8px' mt='10px' ml='10px'>
                Search <Text as='span' color='red.500'></Text>
              </FormLabel>
              {/* <Select
                menuPortalTarget={document.body}
                styles={customStyles}
                options={formattedOptions}
                className='react-select'
                isClearable
                isSearchable
                isMulti
                value={formattedOptions.filter(option => searchMail?.includes(option.value))}
                onChange={handleOption}
              /> */}
              <Select
                menuPortalTarget={document.body}
                styles={customStyles}
                options={tabState === 'Assignlearner' ? formattedOptions : formattedGameOptions}
                className='react-select'
                isClearable
                isSearchable
                isMulti
                value={tabState === 'Assignlearner' ? formattedOptions.filter(option => searchMail?.includes(option.value)) : formattedGameOptions.filter(option => searchGame?.includes(option.value))}
                onChange={tabState === 'Assignlearner' ? handleOption : handleGameOption}
              // styles={customStyle}           
              />
            </Box>
            {cohortsId !== null ? (<Box ml={'20px'}>
              <Button
                mt="20px"
                variant="darkBrand"
                fontSize="sm"
                borderRadius="16px"
                w={{ base: '128px', md: '148px' }}
                h="46px"
                ms="auto"
                // onClick={handleLearnerAssign}
                onClick={tabState === 'Assignlearner' ? handleLearnerAssign : handleGameAssign}
              >
                {tabState === 'Assignlearner' ? " Update ASSIGN LEARNER" : " Update ASSIGN GAME"}
                {/* Assign */}
              </Button>
            </Box>) : <Box ml={'20px'}>
              <Button
                mt="20px"
                variant="darkBrand"
                fontSize="sm"
                borderRadius="16px"
                w={{ base: '128px', md: '148px' }}
                h="46px"
                ms="auto"
                // onClick={handleLearnerAssign}
                onClick={tabState === 'Assignlearner' ? handleLearnerAssign : handleGameAssign}
              >
                {tabState === 'Assignlearner' ? "ASSIGN LEARNER" : "ASSIGN GAME"}
                {/* Assign */}
              </Button>
            </Box>}

          </SimpleGrid>
          {tabState === "Assignlearner" ? (<SimpleGrid style={styles.app}>
            <Box style={styles.container}>
              <Box style={styles.content}>
                {learnerFilterList.length === 0 ? (
                  <><input
                    type="checkbox"
                    id="selectAll"
                    checked={allSelected}
                    onChange={handleLearnerSelectAll}
                  />
                    <label htmlFor="selectAll">Select All</label></>

                ) : null}

                {learnerFilterList.length === 0 && AllLearnerList?.map((item, index) => (
                  <Box
                    key={index}
                    onClick={() => handleLearnerSelectedData(item.lenId)}
                    style={{
                      backgroundColor: selectedLearnerItems.includes(item.lenId) ? 'lightblue' : 'transparent',
                      cursor: 'pointer',
                      padding: '10px',
                      margin: '5px',
                    }}
                  >
                    {item.lenMail} / {item.lenUserName}
                  </Box>
                ))}
                {learnerFilterList.length > 0 && learnerFilterList?.map((item, index) => (
                  <Box
                    key={index}
                    onClick={() => handleLearnerSelectedData(item.lenId)}
                    style={{
                      backgroundColor: selectedLearnerItems.includes(item.lenId) ? 'lightblue' : 'transparent',
                      cursor: 'pointer',
                      padding: '10px',
                      margin: '5px',
                    }}
                  >
                    {item.lenMail} / {item.lenUserName}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box style={styles.container}>
              <Box style={styles.content}>
                {LearnerAssignData?.map((item, index) =>
                (
                  <Box
                    key={index}
                    style={{

                      cursor: 'pointer',
                      padding: '10px',
                      margin: '5px',
                    }}
                  >
                    {item.lenMail} / {item.lenUserName}
                  </Box>
                ))
                }

              </Box>
            </Box>
          </SimpleGrid>)
            :
            <SimpleGrid style={styles.app}>
              <Box style={styles.container}>
                <Box style={styles.content}>
                  {filterGamesList.length === 0 ? (
                    <><input
                      type="checkbox"
                      id="selectAll"
                      checked={allSelected}
                      onChange={handleGameSelectAll}
                    />
                      <label htmlFor="selectAll">Select All</label></>
                  ) : null}
                  {filterGamesList.length === 0 && allGames?.map((item, index) => (
                    <Box
                      key={index}
                      onClick={() => handleGameSelectedData(item.gameId)}
                      style={{
                        backgroundColor: selectedGameItems.includes(item.gameId) ? 'lightblue' : 'transparent',
                        cursor: 'pointer',
                        padding: '10px',
                        margin: '5px',
                      }}
                    >
                      {item.gameTitle}
                    </Box>
                  ))}
                  {filterGamesList.length > 0 && filterGamesList?.map((item, index) => (
                    <Box
                      key={index}
                      onClick={() => handleGameSelectedData(item.gameId)}
                      style={{
                        backgroundColor: selectedGameItems.includes(item.gameId) ? 'lightblue' : 'transparent',
                        cursor: 'pointer',
                        padding: '10px',
                        margin: '5px',
                      }}
                    >
                      {item.gameTitle}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box style={styles.container}>
                <Box style={styles.content}>
                  {GameAssignData?.map((item, index) =>
                  (
                    <Box
                      key={index}
                      style={{

                        cursor: 'pointer',
                        padding: '10px',
                        margin: '5px',
                      }}
                    >
                      {item.gameTitle}
                    </Box>
                  ))
                  }

                </Box>
              </Box>
            </SimpleGrid>}

          <Flex justify="space-between">
            <Button
              variant="light"
              fontSize="sm"
              borderRadius="16px"
              w={{ base: '128px', md: '148px' }}
              h="46px"
              mt="20px"
              onClick={handleBack}
            >
              Cancel
            </Button>
          </Flex>
        </Card>
      </Box>
      {alert ? <OnToast msg={msg} status={toastStatus} setAlert={setAlert} /> : null}
    </>
  );
};

export default AssignCohorts;