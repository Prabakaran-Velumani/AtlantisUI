import React, { ChangeEvent, useState } from 'react'
import Card from 'components/card/Card';
import { Navigate, useNavigate } from 'react-router-dom';
import {    
    Box,
    Text,
    Flex,
    Button,
    Icon,
    List,
    ListItem,
  } from '@chakra-ui/react'
import { MdAdd, MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import OnToast from 'components/alerts/toast';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
// import CustomAccordion from '';
import NoteForm from './NoteForm';
import DialogForm from './DialogForm';
import InteractionForm from './InteractionForm';
  

interface NDIMainProps {
    handleShowComponent: (componentName: string) => void;
}

const NDIMain: React.FC<NDIMainProps> = ({ handleShowComponent }) => {
 

    const [showBox, setShowBox] = useState(false);
    const [alert, setAlert] = useState(false);
    const [type, setType] = useState<any>('Note');
    const navigate = useNavigate();
    
    const [items, setItems] = useState<any>([
        { id: '1', name: 'Note', content: 'Lorem ipsum day tuna fogg'},
        { id: '2', name: 'Dialog', content: 'Lorem ipsum day tuna fogg'},
        { id: '3', name: 'Interaction', content: 'Lorem ipsum day tuna fogg'},
    ]);
           
    // This Below func is for show NDI Options    
    const handleShow = () => {
        setShowBox(!showBox);
    }


    const handleList = (type: any) => {
        console.log('type',type);
        setType(type);
    }
   
    console.log('type',type);
   
    console.log('items',items);

  return (
    <>
        <Box mt={{ base: '0px', xl: '0px' }} className='NDI' position={'relative'}>
            <Card mb={'20px'}>
                <Text fontSize={22} fontWeight={800} mb={'20px'}>
                  Story
                </Text>
                <Flex justify={'start'} mb={'20px'}>                                        
                    <Button bg={'#3311db'} _hover={{bg: '#3311db'}} color={'#fff'} mr={'10px'} className='showFormBox' onClick={handleShow}>
                        <Icon as={MdAdd}  />
                    </Button> 
                    {/* { showBox  ? 
                        <Box position={'absolute'} background={'#fff'} p={'10px'} top={10} right={20} boxShadow={'1px 1px 17px #69627914'} borderRadius={'8px'} className='showBox'>
                            <List cursor={'pointer'}>
                                <ListItem onClick={()=>handleShowComponent('Note')} p={'10px'}>Note</ListItem> 
                                <ListItem onClick={()=>handleShowComponent('Dialog')}  p={'10px'}>Dialog</ListItem> 
                                <ListItem onClick={()=>handleShowComponent('Interaction')}  p={'10px'}>Interaction</ListItem> 
                            </List>
                        </Box>   : null } */}
                     { showBox  ? 
                        <Box 
                            className='showBox'
                            h={'50vh'}
                            w={'100%'} 
                            zIndex={'9999999'} 
                            position={'relative'} 
                            background={'#fff'} 
                            p={'10px'}                             
                            boxShadow={'1px 1px 17px #69627914'} 
                            borderRadius={'8px'} 
                            overflow={'hidden'}
                            display={'flex'}
                        >
                            {/* <Flex> */}
                            <Box mr={'10px'} bg={'#f7f7f7'} w={'15%'} borderRadius={'10px'}>
                                        <List cursor={'pointer'}>
                                            <ListItem color={type == 'Note' ? '#3311db' : '#000'} fontWeight={500} onClick={()=>handleList('Note')} p={'10px'}>
                                                Note
                                            </ListItem> 
                                            <ListItem color={type == 'Dialog' ? '#3311db' : '#000'} fontWeight={500} onClick={()=>handleList('Dialog')}  p={'10px'}>
                                                Dialog
                                            </ListItem> 
                                            <ListItem color={type == 'Interaction' ? '#3311db' : '#000'} fontWeight={500} onClick={()=>handleList('Interaction')}  p={'10px'}>
                                                Interaction
                                            </ListItem> 
                                        </List>
                            </Box>
                            <Box w={'85%'} padding={'0 15px'} overflowY={'auto'}>
                                        {  type == 'Note' ? 
                                                <NoteForm handleShowComponent={handleShowComponent} setItems={setItems} close={setShowBox} /> 
                                            : type == 'Dialog' ? 
                                                    <DialogForm handleShowComponent={handleShowComponent}  /> 
                                            : type == 'Interaction' ? 
                                                <InteractionForm  handleShowComponent={handleShowComponent}  /> : <NoteForm handleShowComponent={handleShowComponent} setItems={setItems} close={setShowBox} />
                                        }                                    

                            </Box>
                            {/* </Flex> */}
                        </Box>   : null }  
                </Flex>
     
                {/* <CustomAccordion items={items} setItems={setItems} /> */}
            </Card>
        </Box>        

        <OnToast msg={'Drag Your Accordion'} status={'info'} setAlert={setAlert} position={'top-right'} />
    </>
  )
}




export default NDIMain