/* eslint-disable */ 

import { Box, Checkbox, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { AndroidLogo, AppleLogo, WindowsLogo } from 'components/icons/Icons';
import * as React from 'react';
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
export default function ShareReviewTable(props: { tableData: any,onOpen:any,onClose:any,isOpen:any }) {
	const { tableData,onOpen,onClose,isOpen } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('secondaryGray.500', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					NAME
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Checkbox isChecked={info.getValue()[1]} colorScheme='brandScheme' me='10px'  />
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()[0]}
					</Text>
				</Flex>
			)
		}),
		// columnHelper.accessor('progress', {
		// 	id: 'progress',
		// 	header: () => (
		// 		<Text
		// 			justifyContent='space-between'
		// 			align='center'
		// 			fontSize={{ sm: '10px', lg: '12px' }}
		// 			color='gray.400'>
		// 		   Company Name
		// 		</Text>
		// 	),
		// 	cell: (info) => (
		// 		<Text color={textColor} fontSize='sm' fontWeight='700'>
		// 			{info.getValue()}
		// 		</Text>
		// 	)
		// }),
		// columnHelper.accessor('quantity', {
		// 	id: 'quantity',
		// 	header: () => (
		// 		<Text
		// 			justifyContent='space-between'
		// 			align='center'
		// 			fontSize={{ sm: '10px', lg: '12px' }}
		// 			color='gray.400'>
		// 			QUANTITY
		// 		</Text>
		// 	),
		// 	cell: (info) => (
		// 		<Text color={textColor} fontSize='sm' fontWeight='700'>
		// 			{info.getValue()}
		// 		</Text>
		// 	)
		// }),
		// columnHelper.accessor('date', {
		// 	id: 'date',
		// 	header: () => (
		// 		<Text
		// 			justifyContent='space-between'
		// 			align='center'
		// 			fontSize={{ sm: '10px', lg: '12px' }}
		// 			color='gray.400'>
		// 			DATE
		// 		</Text>
		// 	),
		// 	cell: (info) => (
		// 		<Text color={textColor} fontSize='sm' fontWeight='700'>
		// 			{info.getValue()}
		// 		</Text>
		// 	)
		// })
	];
	const [ data, setData ] = React.useState(() => [ ...defaultData ]);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});
	return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent backgroundColor="rgba(0, 0, 0, 0.4)">
          <ModalCloseButton color={'white'} onClick={onClose} cursor={'pointer'} />
          <ModalBody p={0} w='100%' h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Card flexDirection='column' w='80%' h={'80vh'} px='0px' overflowX={{ sm: 'scroll', lg: 'scroll' }}>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
					Check Table
				</Text>
				<Menu />
			</Flex>
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr  key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'
											onClick={header.column.getToggleSortingHandler()}>
											<Flex
												justifyContent='space-between'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
												{flexRender(header.column.columnDef.header, header.getContext())}{{
													asc: '',
													desc: '',
												}[header.column.getIsSorted() as string] ?? null}
											</Flex>
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.slice(0, 11).map((row) => {
							return (
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={{ sm: '150px', md: '200px', lg: 'auto' }}
												borderColor='transparent'>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Td>
										);
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Card>
        </ModalBody>
        </ModalContent>
        </Modal>
	);
}
