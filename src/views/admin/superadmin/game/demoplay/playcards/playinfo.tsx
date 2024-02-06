/* eslint-disable */

import {
  Box,
  Checkbox,
  Flex,
  Modal,
  Input,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  TagLabel,
  Tag,
  TagCloseButton,
  Tr,
  useColorModeValue,
  useToast,
  Img,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
// Custom components

import * as React from 'react';
import TextField from 'components/fields/TextField';
import { sentFeedbackEmails } from 'utils/game/gameService';
import { useParams } from 'react-router-dom';
import { addReviewers } from 'utils/reviews/reviews';
import ReplayBox from 'assets/img/screens/ReplayBox.png';
import play from 'assets/img/games/Play.png';
// Assets

type RowObj = {
  name: [string, boolean];
  progress: string;
  quantity: number;
  date: string;
  info: boolean;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function PlayInfo(props: {
  // tableData: any;
  onOpen: any;
  onClose: any;
  isOpen: any;
  startDemo:any;
}) {
  const { onOpen, onClose, isOpen,startDemo } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('secondaryGray.500', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const { id } = useParams();
  const toast = useToast();

  let lightBlue = useColorModeValue('#3311db5c', '#3311db5c');

  const submitEmails = async () => {};
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {/* <Box w={'100%'} ></Box> */}
          <Box
            width={'100%'}
            h={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'flex-end'}
            //   backgroundImage={ReplayBox}
            //   backgroundRepeat={'no-repeat'}
            //   backgroundSize={'contain'}
            //   color={'none'}
          >
            <Box>
              <Text mt={'20px'} fontSize={'25px'} fontWeight={700} mb={'10px'} >Welcome</Text>
              <Box ml={'20px'} color={textColor} fontSize={'sm'}>
                Reviewer Please Review The Game And you Can Add FeedBack For The
                Every Screens Just Click the Right Side Bottom Corner Option and
                You Can Select The Screen To Add FeedBack
              </Box>
              <Text mt={'20px'} mb={'10px'} fontSize={'25px'} fontWeight={700}>Thank You...!</Text>
            </Box>
            <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
              <Button
                bg="#11047a"
                _hover={{ bg: '#190793' }}
                color="#fff"
                h={'46px'}
                w={'128px'}
                mb={'10px'}
                onClick={startDemo}
              >
                Go
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
