import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Img,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
  useTheme,
  useToast,
  // brindha start
  Select,
  Textarea,
  Link,
  Slider,
  Image,
  IconButton,
  // brindha end
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  gameDuplicateQuestionEntirely,
  getImages,
  updateGame,
} from 'utils/game/gameService';
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import BadgeImages from '../BadgeImages';
import { MdClose, MdOutlineCloudUpload } from 'react-icons/md';
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const CompletionScreenRight: React.FC<{
  handleChange: (e: any) => void; 
  formData: any;
  setSelectedBadge:any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setBadge: any;
  compliData:any;
  setCompliData:any;                   
  CompKeyCount:any;
  handlecompletion:any;
 
}> = ({ handleChange, formData,setSelectedBadge, setFormData, setBadge,compliData,setCompliData,CompKeyCount,handlecompletion  }) => {
  const searchIconColor = useColorModeValue('gray.700', 'white');
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const [imgb, setbImg] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [img, setImg] = useState<any[]>([]);
  const [badgeData, setBadgeData] = useState(null);

  const fetchData = async () => {
    const result = await getImages(6);
    if (result?.status !== 'Success')
      return alert('getbackruond error:' + result?.message);
    setImg(result?.data);
  };
  const handleBadgeImages = async () => {
    const result = await getImages(4);
    if (result?.status !== 'Success')
      return console.log('getbackruond error:' + result?.message);
    else {
      setBadgeData(result?.data);
      setIsModalOpen(true);
    }
    setImg(result?.data);
  };
  const handleBadgeSelection = (badge: Badge) => {
    // setShowBadge(badge.gasAssetImage);
    // setFormData((prev:any)=>({...prev,gameBadgeName:badge.gasAssetName}))
  
    setCompliData((prevInput: any) => {
      return {
          ...prevInput,
          [CompKeyCount]: {
              ...prevInput[CompKeyCount],
              gameBadge: badge.gasId,
      gameBadgeName: badge.gasAssetName,
              
          }
      }
    });

    setSelectedBadge(badge);
    setIsModalOpen(false);
    console.log('Selected Image:', badge);
  };
  const handleClear = () => {
   
    setCompliData((prevInput: any) => {
      return {
          ...prevInput,
          [CompKeyCount]: {
              ...prevInput[CompKeyCount],
              gameBadge: '',
      gameBadgeName: '',
              
          }
      }
    });

    setSelectedBadge(null);
    setBadge(null);
    setbImg(null);
  };
  useEffect(() => {
    const fetchDatass = async () => {
      console.log('image url geting',compliData[CompKeyCount])
      if (compliData[CompKeyCount]?.gameBadge) {
        const result = await getImages(4);

        if (result?.status !== 'Success') {
          console.error('getbackground error:' + result?.message);
          return;
        }
        const selectedGasId = compliData[CompKeyCount]?.gameBadge;
        const selectedGasImage = result?.data.find(
          (gas: any) => gas.gasId === selectedGasId,
        );
        const imageUrl =
          selectedGasImage?.gasAssetImage || 'defaultImageURL.jpg';

        setbImg(imageUrl);
        
      }
    };

    fetchDatass(); // Call the asynchronous function
  }, [compliData]);
  const handleKeyPress = (e: any) => {
    const charCode = e.which ? e.which : e.keyCode;
    const enteredValue = e.target.value + String.fromCharCode(charCode);

    if (
      charCode > 31 &&
      (charCode < 48 ||
        charCode > 57 ||
        parseInt(enteredValue, 10) > compliData[CompKeyCount]?.gameTotalScore[0]?.maxScore)
    ) {
      e.preventDefault();
    }
  };
  const handleKeyPresss = (e: any) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Stack direction="column" gap="20px">
        <Card h={'500px'}>
          <Text fontSize={18} fontWeight={700}>
            Score
          </Text>
          <SimpleGrid columns={{ base: 1, md: 1 }} gap="20px">
            <Flex align="center">
              <FormControl
                w={'50%'}
                display="flex"
                alignItems="center"
                justifyContent={'space-between'}
              >
                <FormLabel mr={2} fontSize="sm" fontWeight="bold">
                  Total Score:<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <InputField
                  mb="10px"
                  id="gameTotalScore"
                  type="text"
                  placeholder="eg. 1000"
                  name="gameTotalScore"
                  w="100px"
                  value={compliData[CompKeyCount]?.gameTotalScore?compliData[CompKeyCount]?.gameTotalScore[0]?.maxScore :''}
                  // onChange={handlecompletion}
                  onKeyPress={handleKeyPresss}
                  readOnly
                /> 
              </FormControl>
            </Flex>
          </SimpleGrid>
          {/***Afrith-Modified-20-12-23*****/}
          <Flex>
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent={'space-between'}
              width={'40%'}
              // mt={'10px'}
            >
              <FormLabel
                htmlFor="email-"
                fontSize="sm"
                fontWeight="bold"
                color={textColorPrimary}
              >
                Set a Minimum Pass Score
              </FormLabel>
              <Switch
                mb="10px"
                isChecked={compliData[CompKeyCount]?.gameIsSetMinPassScore === 'true'}
                color="#fff"
                colorScheme="brandScheme"
                size="md"
                id="gameIsSetMinPassScore"
                name="gameIsSetMinPassScore"
                onChange={handlecompletion}
              />
            </FormControl>
            {/***********Spacer*****************/}
            <div style={{ width: '20px' }} />
            {compliData[CompKeyCount]?.gameIsSetMinPassScore === 'true' && (
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent={'space-between'}
                width={'50%'}
                h={'40px'}
                // mt={'5px'}
              >
                <FormLabel
                  htmlFor="email-"
                  fontSize="sm"
                  fontWeight="bold"
                  color={textColorPrimary}
                >
                  Minimum Score
                  {compliData[CompKeyCount]?.gameIsSetMinPassScore === 'true' && (
                    <span style={{ color: 'red' }}>*</span>
                  )}
                </FormLabel>
                <InputField
                  mt="10px"
                  id="gameMinScore"
                  name="gameMinScore"
                  type="text"
                  disabled={compliData[CompKeyCount]?.gameIsSetMinPassScore !== 'true'}
                  placeholder="eg. 1000"
                  w="100px"
                  value={compliData[CompKeyCount]?.gameMinScore}
                  onChange={handlecompletion}
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
            )}
          </Flex>
          <Flex mt={'10px'}>
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent={'space-between'}
              width={'40%'}
              // mt={'10px'}
            >
              <FormLabel
                htmlFor="email-"
                // mb="0"
                fontSize="sm"
                fontWeight="bold"
                color={textColorPrimary}
              >
                Set a Distinction Score
              </FormLabel>
              <Switch
                isChecked={
                  compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'true' ? true : false
                }
                color="#fff"
                colorScheme="brandScheme"
                size="md"
                id="gameIsSetDistinctionScore"
                name="gameIsSetDistinctionScore"
                onChange={handlecompletion}
                mb="10px"
              />
            </FormControl>
            {/***********Spacer*****************/}
            <div style={{ width: '20px' }} />

            {compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'true' && (
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent={'space-between'}
                width={'50%'}
                h={'40px'}
                // mt={'5px'}
              >
                <FormLabel
                  htmlFor="email-"
                  fontSize="sm"
                  fontWeight="bold"
                  color={textColorPrimary}
                >
                  Distinction Score
                  {compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'true' && (
                    <span style={{ color: 'red' }}>*</span>
                  )}
                </FormLabel>
                <InputField
                  mt={'10px'}
                  w="100px"
                  disabled={
                    compliData[CompKeyCount]?.gameIsSetDistinctionScore === 'true'
                      ? false
                      : true
                  }
                  id="gameDistinctionScore"
                  name="gameDistinctionScore"
                  type="text"
                  placeholder="eg. 1000"
                  value={compliData[CompKeyCount]?.gameDistinctionScore}
                  onChange={handlecompletion}
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
            )}
          </Flex>

          {/*************SkillWise**********************/}

          <FormControl
            display="flex"
            alignItems="center"
            justifyContent={'space-between'}
            width={'40%'}
            mt={'10px'}
          >
            <FormLabel
              htmlFor="email-"
              fontSize="sm"
              fontWeight="bold"
              color={textColorPrimary}
            >
              Skill Wise Score
            </FormLabel>

            <Switch
              isChecked={
                compliData[CompKeyCount]?.gameIsSetSkillWiseScore === 'true' ? true : false
              }
              color="#fff"
              colorScheme="brandScheme"
              size="md"
              mb="10px"
              id="gameIsSetSkillWiseScore"
              name="gameIsSetSkillWiseScore"
              onChange={handlecompletion}
            />
          </FormControl>

          {/**********************BADGE*********************/}

          <FormControl
            display="flex"
            alignItems="center"
            justifyContent={'space-between'}
            width={'40%'}
            mt={'20px'}
            // ml="150px"
          >
            <FormLabel
              htmlFor="email-"
              mb="0"
              fontSize="sm"
              fontWeight="bold"
              color={textColorPrimary}
            >
              <Text fontSize={18} fontWeight={700}>
                Badge
              </Text>
            </FormLabel>
            <Switch
              isChecked={compliData[CompKeyCount]?.gameIsSetBadge === 'true' ? true : false}
              color="#fff"
              colorScheme="brandScheme"
              size="md"
              id="gameIsSetBadge"
              name="gameIsSetBadge"
              onChange={handlecompletion}
            />
          </FormControl>
          {compliData[CompKeyCount]?.gameIsSetBadge === 'true' && (
            <>
              <Flex mt={'10px'} >
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent={'space-between'}
                  width={'33%'}
                  mt={'10px'}
                  mb="10px"
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="bold"
                    color={textColorPrimary}
                    mb="10px"
                    whiteSpace={'nowrap'}
                    onClick={handleBadgeImages}
                  >
                    Select Badge:{' '}
                    {compliData[CompKeyCount]?.gameIsSetBadge === 'true' && (
                      <span style={{ color: 'red' }}>*</span>
                    )}
                  </FormLabel>
                  <BadgeImages
                    isModalOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    badgeData={badgeData}
                    handleBadgeSelection={handleBadgeSelection}
                  />
                </FormControl>
                {!imgb ? (
                  <>
                    {/*<input type="file" style={{ display: 'none' }} />
                    <Box
                      w={'70%'}
                      border={'1px solid #e0e5f2'}
                      padding={'5px'}
                      display={'flex'}
                      cursor={'pointer'}
                      h={'34px'}
                      onClick={() => handleBadgeImages()}
                    >
                      <Box
                        h={'25px'}
                        width={'35%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        bg={'#3311db'}
                      >
                        <Text color={'#fff'} textAlign={'center'}>
                          Choose
                        </Text>
                      </Box>
 <Text mt={'5px'} ml={'2px'}>
                        No File Choosen
                      </Text> 
                    </Box>
                    */}
                      <Box display={'inline-block'}  position={'relative'} mt={'10px'} mb={'10px'} cursor={'pointer'} onClick={() =>handleBadgeImages()}>
  <input type="file" style={{ width:'100px',
                      position:'absolute',
                      display:'none',
                      textAlign:'right',
                      
                      opacity:0,
                      zIndex:2,
                      height:'100px' }}/>
  <Box  position={'absolute'} className={'choosebadge'} top={0} left={0} zIndex={1} backgroundColor= {'#422AFB'}
    p= {'2px'}
    borderRadius= {'15px'}
    pr={'8px'} 
    pl= {'8px'} display={'flex'}  alignItems="center"
                  justifyContent={'flex-start'} >
    <SearchIcon color={'#fff'} w="15px" h="15px"/>
    <Text fontSize="sm"
                    //fontWeight="bold"
                    //color={textColorPrimary}
                    color={'#fff'}
                    whiteSpace={'nowrap'} textAlign={'left'}>
                          Choose Badge
                        </Text>
  </Box>
</Box> 
                     
                  </>
                ) : (
                  <Box position={'relative'}>
                    <Img
                      id={compliData[CompKeyCount]?.gameBadge}
                      src={imgb}
                      w={'50px'}
                      h={'50px'}
                    />
                    <Icon
                      as={MdClose}
                      bg={'#fff'}
                      position={'absolute'}
                      borderRadius={'50%'}
                      top={'0'}
                      right={'0'}
                      cursor={'pointer'}
                      onClick={handleClear}
                    />
                  </Box>
                )}
              </Flex>
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent={'space-between'}
                width={'60%'}
                //mt={'10px'}
              >
                <FormLabel
                    fontSize="sm"
                    fontWeight="bold"
                    color={textColorPrimary}
                    mb="0px"
                    whiteSpace={'nowrap'}
                  
                  >
                  
                  Badge Name:{' '}
                  {compliData[CompKeyCount]?.gameIsSetBadge === 'true' && (
                    <span style={{ color: 'red' }}>*</span>
                  )}
                </FormLabel>
                <InputField
                  mb="0px"
                  id="gameBadgeName"
                  name="gameBadgeName"
                  disabled={compliData[CompKeyCount]?.gameIsSetBadge === 'true' ? false : true}
                  placeholder="eg. Bronze"
                  w="150px" // Adjust the width as needed
                  value={compliData[CompKeyCount]?.gameBadgeName}
                  onChange={handlecompletion}
                  maxlength="9"
                />
              </FormControl>
            </>
          )}

          {/******************Criteria for Badge***************************/}

          {compliData[CompKeyCount]?.gameIsSetBadge === 'true' && (
            <>
              <Flex>
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent={'space-between'}
                  width={'40%'}
                  // mt={'10px'}
                >
                  <FormLabel
                    htmlFor="email-"
                    mb="10px"
                    fontSize="sm"
                    mt="5"
                    fontWeight="bold"
                    whiteSpace={'nowrap'}
                    color={textColorPrimary}
                  >
                    Criteria For Badge
                  </FormLabel>
                  <Switch
                    isChecked={
                      compliData[CompKeyCount]?.gameIsSetCriteriaForBadge === 'true'
                        ? true
                        : false
                    }
                    mt="10px"
                    ml={'10px'}
                    color="#fff"
                    colorScheme="brandScheme"
                    size="md"
                    id="gameIsSetCriteriaForBadge"
                    name="gameIsSetCriteriaForBadge"
                    onChange={handlecompletion}
                  />
                </FormControl>

                <div style={{ width: '20px' }} />
                {compliData[CompKeyCount]?.gameIsSetCriteriaForBadge === 'true' && (
                  <>
                    <FormControl
                      display="flex"
                      alignItems="center"
                      justifyContent={'space-between'}
                      width={'50%'}
                      // mt={'10px'}
                    >
                      <FormLabel>
                        <Text
                          fontSize="sm"
                          mt={'15px'}
                          whiteSpace={'nowrap'}
                          fontWeight="bold"
                        >
                          Score Greater Than{' '}
                          {compliData[CompKeyCount]?.gameIsSetCriteriaForBadge === 'true' && (
                            <span style={{ color: 'red' }}>*</span>
                          )}
                        </Text>
                      </FormLabel>
                      <InputField
                        mb="0px"
                        id="gameAwardBadgeScore"
                        w={'100px'}
                        name="gameAwardBadgeScore"
                        disabled={
                          compliData[CompKeyCount]?.gameIsSetCriteriaForBadge === 'true'
                            ? false
                            : true
                        }
                        placeholder="eg. 200"
                        // Adjust the width as needed
                        value={compliData[CompKeyCount]?.gameAwardBadgeScore}
                        onChange={handlecompletion}
                        onKeyPress={handleKeyPress}
                      />
                    </FormControl>
                  </>
                )}
              </Flex>
            </>
          )}
        </Card>
      </Stack>
    </>
  );
};
export default CompletionScreenRight;
