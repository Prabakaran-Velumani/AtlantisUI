// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MdCheck, MdClose, MdTimer, MdDelete } from 'react-icons/md';
import React, { useEffect, useRef, useState } from 'react';



export default function OrderStep(props: {
	quest?: any;
	data?: any;
	date?: string;
	sum?: string;
	icon: JSX.Element;
	status?: string;
	name: string;
	BlockItems?: any;
	listBlockItems?: any;
	listQuest?: any;
	[x: string]: any;
	handleGet?: any;
	fetchBlocks?: any;
	// handleTargetQuest?:any;
	handleTargetQuest?: (T: any, A: any) => void;
	id?: any;
	updateExtensiveNavigation?: (id: any) => void;
	extensiveNavigation?: number | null;
	setQuestTabState?: any;
	questTabState?: any;
	deleteQuest?: any;
	delSeq?: any;
}) {

	const [progressBlockItems, setProgressBlockItems] = useState(null);
	const [questDelete, setQestDelete] = useState(false);

	const { date, sum, icon, status, name, quest, data, BlockItems, listBlockItems, listQuest, id, handleTargetQuest, handleGet, fetchBlocks, setQuestTabState, questTabState, deleteQuest, delSeq, ...rest } = props;

	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (Array.isArray(BlockItems)) {
	// 	  setProgressBlockItems(BlockItems);
	// 	} else {

	// 	  setProgressBlockItems([]);
	// 	}
	// 	console.log('listQuest',BlockItems)
	//   }, [BlockItems]);
	const textColor = useColorModeValue('black', 'black');
	const iconColor = useColorModeValue('secondaryGray.600', 'white');
	const inActive = useColorModeValue('gray.50', 'white');

	useEffect(() => {
		if (BlockItems && Object.keys(BlockItems)?.length !== 0) {
			setProgressBlockItems(Object.values(BlockItems));
		}
	}, [BlockItems]);
	console.log('BlockItems', listBlockItems);

	const handleNavigation = (nid: number) => {

		if (nid) {
			setQuestTabState(nid)
			handleGet(nid);
			fetchBlocks();
		}
	}
	const handleMouseOver = (e: any) => {

		e.currentTarget.style.boxShadow = '0 0 20px rgba(128, 128, 128, 0.9)';
	};

	const handleMouseOut = (e: any) => {

		e.currentTarget.style.boxShadow = 'none';
	};


	// console.log('progressBlockItems',progressBlockItems)
	// console.log('listQuest',listQuest)	

	return (
		<>
			<Flex justifyContent='center' alignItems='center' w='100%' zIndex='2' {...rest} className='OrderStep'>
				{icon}
				<Flex direction='column' align='start' ms='20px' mr='auto'>
					<Text color={textColor} fontSize='lg' me='6px' fontWeight='600'>
						{name}
					</Text>

					<Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
						{date}
					</Text>
				</Flex>
				{status === 'done' ? (
					<Flex
						align='center'
						justify='center'
						h='30px'
						w='30px'
						borderRadius='50%'
					>

<Icon  borderRadius={'50%'} border='1px solid' h='27px' borderColor={'green.500'} w='29px' bgColor={'transparent'} as={MdCheck} color='green.500' />
		

					</Flex>
				) : status === 'error' ? (
					<Flex
						align='center'
						justify='center'
						h='30px'
						w='30px'
						borderRadius='50%'
						border='2px solid'
						borderColor='red.500'>
						<Icon h='18px' w='18px' as={MdClose} color='red.500' />
					</Flex>
				) : (
					<Icon h='34px' w='34px' color={iconColor} as={MdTimer} />
				)}
			</Flex>

			{progressBlockItems && name === 'Story' ? (
				<>
					{listQuest ? (
						listQuest.map((item: any, index: number) => (
							<Flex justifyContent='center' alignItems='center' w='100%' zIndex='2' {...rest} mt={'0px'} key={index}>
								<Box>
									<Flex className='QuestList'>
										<Icon as={MdDelete} fontSize={'md'} color={'grey'} cursor={'pointer'} onClick={() => deleteQuest(item.gameId, item.gameQuestNo)} className='del-icon' />
										<Text
											fontSize='md'
											me='6px'
											fontWeight='400'
											style={{
												cursor: 'pointer',
												color: textColor,
												display: 'flex',
												position: 'relative',
											}}
											// onMouseOut={(e) => handleMouseOut(e)}
											// onMouseOver={(e) => handleMouseOver(e)}

											onClick={() => handleNavigation(item.gameQuestNo)}
										>
											Quest {item.gameQuestNo}
										</Text>
									</Flex>


									{Number(item.gameQuestNo) === Number(progressBlockItems[0].questNo) && progressBlockItems?.map((progressItem: any, progressIndex: number) => (

										<div
											key={progressIndex}
											style={{
												display: 'flex',
												position: 'relative',
											}}
											className='QuestSequence'
											// onMouseOver={(e) => handleMouseOver(e)}
											// onMouseOut={(e) => handleMouseOut(e)}
											onClick={(e) => handleTargetQuest(progressItem, progressIndex)}
										>
											<Icon as={MdDelete} fontSize={'sm'} color={'grey'} cursor={'pointer'}
												onClick={() => delSeq(progressItem, progressIndex, progressItem.type)}
												className='del-icon'
											/>

											<Text color={textColor} fontSize='sm' me='5px' fontWeight='400' style={{ transform: 'scale(1)' }}>
												{progressItem.id}
											</Text>
											<Text color={textColor} fontSize='sm' fontWeight='400' style={{ transform: 'scale(1)' }}>
												{progressItem.type}
											</Text>
										</div>
									))}

									{Number(item.gameQuestNo) !== Number(progressBlockItems[0].questNo) && Object.entries(listBlockItems)
										.filter(([key, value]: [string, any]) => value.questNo === item.gameQuestNo)
										.map(([key, value]: [string, any], i: number) => (
											<Text key={i} fontSize='sm' me='6px' fontWeight='400' style={{ color: inActive }}>
												{value.id} {value.type}
											</Text>
										))}
								</Box>
							</Flex>
						))
					) : (
						<Box>
							{progressBlockItems?.map((progressItem: any, progressIndex: number) => (

								<Text key={progressIndex} color={textColor} fontSize='sm' me='6px' fontWeight='400'>
									{progressItem.id} {progressItem.type}
								</Text>

							))}
						</Box>
					)}


				</>

			) : null}

		</>
	);
}
