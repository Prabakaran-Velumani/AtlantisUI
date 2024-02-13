import { useState } from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  Row,
} from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Image,
  Input,
  Select,
  Box,
  Grid,
  GridItem,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { API_SERVER } from 'config/constant';

interface DataTableProps {
  data: any[];
  columns: { Header: string; accessor: string; type: string }[];
  rowIdKey: any;
  paginationCount: number;
  createFunc: React.Dispatch<React.SetStateAction<boolean>>;
  editFunc: React.Dispatch<React.SetStateAction<boolean>>;
  deleteFunc: React.Dispatch<React.SetStateAction<boolean>>;
  downloadFunc: React.Dispatch<React.SetStateAction<boolean>>;
  isFormEditMode: boolean;
  isEditing : boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  rowIdKey,
  paginationCount,
  createFunc,
  editFunc,
  deleteFunc,
  downloadFunc,
  isFormEditMode,
  isEditing,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: paginationCount },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [input, setInput] = useState<any>();

  const changeHanlder = (e: any) => {
    setPageNumber(e.target.value);
  };

  const handleCreate = async (): Promise<void> => {
    // Handle creation using createAPI
    await createFunc(input);
  };

  const handleEdit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number): Promise<void> => {
    event.preventDefault();
    try {
      await editFunc(data[id]);
      
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    
    try {
      // Handle deletion using deleteAPI
      await deleteFunc(data[id]);
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };
  const handleDownload = async (id: number): Promise<void> => {
    try {
      // Handle creation using createAPI
      await downloadFunc(data[id]);
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  return (
    <>
      <Box margin={'20px 10px 10px 10px'}>
        <Grid
          templateColumns={{
            base: '1fr',
            lg: '2fr 10fr 1fr 3fr',
          }}
          gap={{ base: '20px', xl: '20px' }}
        >
          <GridItem>
            <Select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem>{''}</GridItem>
          <GridItem>{''}</GridItem>
          <GridItem>
            <Input
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
            />
          </GridItem>
        </Grid>
        {/* Dropdown for changing page size */}
      </Box>
      <Table {...getTableProps()}>
        {/* Table header */}
        <Thead>
          <Tr>
            <Th>Sno</Th>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </Th>
              )),
            )}
          </Tr>
        </Thead>
        {/* Table body */}
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            const rowIdKeyValue = (row.original as { [key: string]: number })[
              rowIdKey
            ];
            return (
              <Tr {...row.getRowProps()} key={index + 1}>
                <Td>{index + 1}</Td>
                {row.cells.map((cell, cellIndex) => {
                  const columnType = columns[cellIndex].type;
                  console.log("columnType",columnType);
                  if(columnType ==='audio')
                  {
                    return (
                      <Td {...cell.getCellProps()} key={cellIndex}>
                        <audio controls>
                          <source src={API_SERVER + '/' + cell.value} type="audio/mpeg" />
                        </audio>
                      </Td>
                    );
                  }
                  if (columnType === 'image') {
                    return (
                      <Td {...cell.getCellProps()} key={cellIndex}>
                        <img
                          src={API_SERVER + '/' + cell.value} // Assuming cell value is the image URL
                          alt="Image"
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </Td>
                    );
                  } else if (columnType === 'action') {
                    return (
                      <Td {...cell.getCellProps()} key={cellIndex}>
          {/* Edit and Delete buttons conditionally based on isFormEditMode and isEditing */}
        
            <>
              {/* Edit button */}
              <IconButton
                icon={<EditIcon />} // Replace with your desired edit icon
                aria-label="Edit"
                onClick={(event) => handleEdit(event, index)}
                colorScheme="blue"
                variant="ghost"
                size="md"
                mr={2} // Margin right for spacing
              />

              {/* Delete button */}
              <IconButton
                icon={<DeleteIcon />} // Replace with your desired delete icon
                aria-label="Delete"
                onClick={() => handleDelete(index)}
                colorScheme="red"
                variant="ghost"
                size="md"
                mr={2} // Margin right for spacing
                isDisabled={isEditing}
              />
              {/* Add other button actions */}
            </>
          
        </Td>
      
                    );
                  } else {
                    return (
                      <Td {...cell.getCellProps()} key={cellIndex}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  }
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* Pagination controls */}
      <Grid templateColumns={'1fr 3fr 2fr 2fr'}>
        <GridItem
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text mr="2">Page</Text>
          <Text>
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>
          </Text>
        </GridItem>
        <GridItem></GridItem>
        <GridItem
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Button
            onClick={() => gotoPage(0)}
            isDisabled={pageIndex === 0 || pageCount === 1}
          >
            {'<<'}
          </Button>{' '}
          <Button
            onClick={() => previousPage()}
            isDisabled={!canPreviousPage || pageCount === 1}
          >
            {'<'}
          </Button>{' '}
          <Button
            onClick={() => nextPage()}
            isDisabled={!canNextPage || pageCount === 1}
          >
            {'>'}
          </Button>{' '}
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={pageIndex === pageCount - 1 || pageCount === 1}
          >
            {'>>'}
          </Button>{' '}
        </GridItem>
        <GridItem
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {/* <Flex justifyContent={"center"}> */}
          <Input
            type="number"
            onChange={(e: any) => changeHanlder(e)}
            value={pageNumber || 1}
            maxWidth="60px"
            isDisabled={pageCount === 1}
          />
          <Button
            onClick={() => gotoPage(pageNumber)}
            //   disabled={pageIndex === 0}
            isDisabled={pageCount === 1}
          >
            Go
          </Button>
          {/* </Flex> */}
        </GridItem>
      </Grid>
    </>
  );
};

export default DataTable;
