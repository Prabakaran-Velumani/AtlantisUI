import React, { useEffect, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  TableInstance,
} from 'react-table';
import { Navigate, useNavigate } from 'react-router-dom';

// Chakra imports
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { SearchIcon } from '@chakra-ui/icons';

import {
  IconButton,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';

type RowObj = {
  sNo: number;
  chId:any;
  CohortName: string;
  NoGames: any;
  NoLearners: any;
  // status: JSX.Element;
  action: JSX.Element;
  // lenUserName:any;
  // lenMail:any;
  
  value:any;
};

interface ColumnObj {
  Header: number | string;
  accessor: keyof RowObj;
}

interface cohortsDataTableProps {
  data: RowObj[];
}

type DataCol = TableInstance<RowObj>;

const CohortsTable: React.FC<cohortsDataTableProps> = ({ data }) => {
  const [lastPage, setLastPage] = useState<any>();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('creation');
  };
  
  const columns: ColumnObj[] = React.useMemo(
    () => [
      { Header: 'S.No', accessor: 'sNo' },
      // { Header: 'Learner Name', accessor: 'lenUserName' },
      // { Header: 'Learner Mail', accessor: 'lenMail' },
      { Header: 'Cohort Name', accessor: 'CohortName' },
      { Header: 'No Games', accessor: 'NoGames' },
      { Header: 'No Learners', accessor: 'NoLearners' },
      { Header: 'Action', accessor: 'action' },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    gotoPage,
    setPageSize,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  }: DataCol = useTable<RowObj>(
    {
      columns,
      data: data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    const lastPage = Math.floor(data.length / pageSize);
    setLastPage(Math.floor(data.length / pageSize));
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);
  const searchIconColor = useColorModeValue('gray.700', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );

  const handleGoPage = (pageNumber: number) => {
    // Ensure the page number is within valid range
    if (pageNumber >= 0 && pageNumber < totalPages) {
      gotoPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pageCount = 5; // Adjust the number of visible page numbers as needed
    const currentPage = pageIndex + 1;
    const pages = [];

    if (totalPages <= pageCount) {
      // Display all pages if total pages are less than or equal to the page count
      for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1);
      }
    } else {
      // Display a range of pages with three dots in between
      const start = Math.max(1, currentPage - Math.floor(pageCount / 2));
      const end = Math.min(totalPages, start + pageCount - 1);

      if (start > 1) {
        pages.push(1, '...'); // Display first page and three dots if not in the initial range
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        pages.push('...', totalPages); // Display three dots and last page if not in the final range
      }
    }

    return pages;
  };

  return (
    <>
      <Flex
        justifyContent="flex-end"
        align={'center'}
        mb={'10px'}
        p={{ sm: '20px 0px', md: '20px' }}
      >
        <Flex
          w={{ sm: '100%', md: 'auto' }}
          alignItems="center"
          flexDirection={{base:'column',sm:'column',md:"row"}}
          bg={menuBg}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          p="10px"
          borderRadius="20px"
          boxShadow={shadow}
          justifyContent={'space-between'}
        >
          <InputGroup w={{ base: '100%', sm: '100%', md: '200px' }}>
            <InputLeftElement
              children={
                <IconButton
                  aria-label="search"
                  bg="inherit"
                  borderRadius="inherit"
                  _active={{
                    bg: 'inherit',
                    transform: 'none',
                    borderColor: 'transparent',
                  }}
                  _hover={{
                    background: 'none',
                  }}
                  _focus={{
                    background: 'none',
                    boxShadow: 'none',
                  }}
                  icon={
                    <SearchIcon color={searchIconColor} w="15px" h="15px" />
                  }
                />
              }
            />
            
            <Input
              type="text"
              placeholder="Search..."
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              bg={'#f9f9f9'}
              borderRadius={'14px'}
              w={{ base: '100%', sm: '100%', xl: '300px' }}
            />
          </InputGroup>
          {/* <Tooltip
            label="Create a New Category"
            hasArrow
            placement="right-start"
          >
          <Button
            ml={{ sm: 0, md: 10 }}
            mt={{sm:5,md:0}}
            padding={2}
            boxShadow={'3px 4px 12px #2e292940'}
            _hover={{ bg: '#3311db', boxShadow: '3px 4px 12px #2e292975' }}
            background="#3311db"
            color="#fff"
            w={{ sm: '100%', md: 70 }}
            onClick={handleNavigate}
          >
                 Assign Learner 
          </Button>
          
          </Tooltip> */}
          <Tooltip
            label="Create a New Category"
            hasArrow
            placement="right-start"
          >
          <Button
            ml={{ sm: 0, md: 10 }}
            mt={{sm:5,md:0}}
            padding={2}
            boxShadow={'3px 4px 12px #2e292940'}
            _hover={{ bg: '#3311db', boxShadow: '3px 4px 12px #2e292975' }}
            background="#3311db"
            color="#fff"
            w={{ sm: '100%', md: 70 }}
            onClick={handleNavigate}
          >
                 Assign 
          </Button>
          
          </Tooltip>
        </Flex>
      </Flex>
      <Box
        overflowX={{ sm: 'scroll', xl: 'scroll' }}
        padding="2px"
        borderRadius={'13px 13px 20px 20px'}
      >
        <Table
          {...getTableProps()}
          variant={'simple'}
          overflowX={{ base: 'auto', xl: 'unset' }}
          style={{
            border: '2px solid #f7f7f7',
          }}
        >
          {/* <Card> */}
          <Thead className="thead" bg={'#f9f9f9'}>
            {headerGroups.map((headerGroup) => (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                borderBottom={'2px solid #f7f7f7'}
              >
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    color={'#191919'}
                    textAlign={'start'}
                    p={'10px 10px'}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()} fontSize={'17px'}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr
                  {...row.getRowProps()}
                  borderBottom={'2px solid #f7f7f7'}
                  _hover={{ bg: '#FAF9F6' }}
                  cursor={'pointer'}
                >
                  {row.cells.map((cell) => {
                    return (
                      <Td
                        {...cell.getCellProps()}
                        p={'12px'}
                        className="industryForAction"
                        textAlign={'start'}
                        justifyContent={'center'}
                      >
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <Box
        p={'20px 5px'}
        display={{ base: 'block', xl: 'flex' }}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box mb={5}>
          <Box mr={'10px'} color={'#000'}>
            <span style={{ color: '#20212396' }}>
              Page{' '}
              <span>
                {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
              </span>{' '}
            </span>
          </Box>
        </Box>
        <Box display={{ base: 'flex', xl: 'flex' }}>
          <Box mr={'10px'} display={'flex'} alignItems={'center'}>
            <Button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              bg={'#f3f0f0'}
              mr={'5px'}
              h={'40px'}
              w={'40px'}
              borderRadius="50%"
              lineHeight="1em"
              flexShrink={0}
              fontWeight={800}
            >
              {'<'}
            </Button>{' '}
            {getPageNumbers().map((page, index) => (
              <Button
                key={index}
                mr={'5px'}
                h={'40px'}
                w={'40px'}
                borderRadius="100px"
                lineHeight="1em"
                flexShrink={0}
                fontWeight={800}
                background={pageIndex + 1 === page ? '#3311db' : 'unset'}
                color={pageIndex + 1 === page ? '#fff' : 'unset'}
                onClick={() =>
                  typeof page === 'number' ? handleGoPage(page - 1) : null
                }
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              bg={'#f3f0f0'}
              h={'40px'}
              w={'40px'}
              borderRadius="100px"
              lineHeight="1em"
              flexShrink={0}
              fontWeight={800}
            >
              {'>'}
            </Button>{' '}
          </Box>
          <Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CohortsTable;
