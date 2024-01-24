import React, { ChangeEvent, useState } from 'react'
import Card from 'components/card/Card';
import { Navigate, useNavigate } from 'react-router-dom';
import {    
    Box,
    Text,   
    Button,
    Icon,
    Flex,
    Img,   
  } from '@chakra-ui/react'
import { MdAdd, MdArrowDownward, MdArrowDropUp, MdArrowUpward, MdDelete } from 'react-icons/md';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

type ItemType = {
    id: string;
    name: string;
    content: string;
  };
  

const CustomAccordion = (props: { items: any, setItems: any }) => {

    const {items, setItems} = props;

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
          return;
        }
    
        // const reorderedItems = Array.from(items);
        const reorderedItems: ItemType[] = Array.from(items);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);           

         // Update the id based on the original order        
        const updatedItems = reorderedItems.map((item: ItemType, index) => ({ ...item, id: (index + 1).toString() }));

        
        setItems(updatedItems);    
        console.log('result', updatedItems);
    };

    return (
    <Box>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="your-droppable-id">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {/* {items.map((item, index) => (             */}
                        {items.map((item:any, index:number) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}                   
                                    >                                               
                                        <CustomAccordionItem key={index} title={item.name} content={item.content} img={item.img} />
                                    </div>
                                )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>            
    </Box>
    );
};


const CustomAccordionItem = (props: { title:any, content:any, img:any }) => {
    const {title, content, img} = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        // <Box border="1px" borderColor="gray.200" mb={4} borderRadius="md">
        //     <Box  width={'100%'} p={'10px 15px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} bg={isOpen ? '#e1e1e1' : '#f7f7f7'}
        //         color={isOpen ? '#000' : '#000'}
        //         // style={{width: '100%', textAlign:'left', padding:'4px', display:'flex', justifyContent:'space-between'}}
        //         onClick={toggleAccordion}
        //     >
        //         <Text textAlign="left" fontSize={15} fontWeight={600} letterSpacing={0.4}>{title}</Text>
        //         <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
        //     </Box>
        //     {isOpen && (
        //         <Box p={4}>                    
        //             <Text>{content}</Text>
        //             <Flex mt={4} justifyContent={'end'}>
        //                 <Button bg="#3311db" color="white" mr={2} w={'80px'} h={'37'}>Edit</Button>
        //                 <Button bg="#000" color="white" h={'37'}>Cancel</Button>
        //             </Flex>                                
        //         </Box>
        //      )} 
        // </Box>

        <>
            <Flex flexDirection={'row-reverse'} className='custom-accordion'>
                <Box className='custom-accordionItem' width={'100%'} p={'10px 15px'} ml={'15px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} 
                    flexDirection={'row'} color={isOpen ? '#000' : '#000'} mb={'10px'}  bg={'#f7f7f7'}                 
                >
                    <Text textAlign="left" fontSize={15} fontWeight={600} letterSpacing={0.4}>{title}</Text>  
                    {img ? <Img src={img} height={'30px'} width={'30px'} borderRadius={'30px'} /> : null}
                </Box>
                <Box className='icons' width={'30px'} height={'auto'} display={'flex'}>
                    <Icon as={MdAdd} color={'green'} filter={'drop-shadow(5px 6px 5px green)'} fontSize={'16px'} mb={'4px'} mr={'5px'} onClick={()=>console.log('add')} />
                    <Icon as={MdDelete} color={'red'} filter={'drop-shadow(5px 6px 5px #e5212194)'} mb={'4px'} onClick={()=>console.log('delete')}  />
                </Box>
            </Flex>
        </>
    );
};

export default CustomAccordion