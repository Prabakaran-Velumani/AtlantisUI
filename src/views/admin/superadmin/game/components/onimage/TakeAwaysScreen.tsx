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
import {
  gameDuplicateQuestionEntirely,
  getImages,
  updateGame,
} from 'utils/game/gameService';
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import BadgeImages from '../BadgeImages';
import { MdClose, MdOutlineCloudUpload } from 'react-icons/md';
import TextField from 'components/fields/TextField';
import take from 'assets/img/screens/takeaway.png';
import bull from 'assets/img/screens/bullet.png';
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const TakewayScreen: React.FC<{
  formData: any;
  imageSrc: any;
  preview: any;
}> = ({ formData, imageSrc, preview }) => {
  const data = formData.gameTakeawayContent?.split('\n');

  return (
    <>
      {imageSrc && preview ? (
        <Box position={'relative'}>
          <Img src={imageSrc} w={'100%'} h="100vh" />
          <Box
            position={'absolute'}
            width={'100%'}
            h={'70vh'}
            left={'0px'}
            bottom={'0'}
            fontFamily={'gametext'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'flex-start'}
          >
            <Box w={'70%'} className="content">
              <Box h={'60vh'} overflowY={'scroll'}>
                {data &&
                  data.map((it: any, ind: number) => {
                    const bulletIndex = it.indexOf('\u2022');
                    const contentAfterBullet =
                      bulletIndex !== -1
                        ? it.slice(bulletIndex + 1).trim()
                        : it;
                    return (
                      <Box display={'flex'}>
                        <>
                          <Img
                            mt={'5px'}
                            mr={'5px'}
                            src={bull}
                            className="dot-img"
                            w={'16px'}
                            h={'16px'}
                          />
                          {contentAfterBullet}
                        </>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="takeaway-screen">
          <Box className="takeaway-screen-box">
            <Img src={imageSrc} className="bg-img" />
            <Box className="content-box" overflowY={'scroll'}>
              {data &&
                data.map((it: any, ind: number) => {
                  const bulletIndex = it.indexOf('\u2022');
                  const contentAfterBullet =
                    bulletIndex !== -1 ? it.slice(bulletIndex + 1).trim() : it;
                  return (
                    <Box className="content" fontFamily={'AtlantisText'} color={'#D9C7A2'}>
                      <>
                        <Img
                          src={bull}
                          className="dot-img"
                          w={'16px'}
                          h={'16px'}
                        />
                        {contentAfterBullet}
                      </>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default TakewayScreen;
