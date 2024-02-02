import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    Box,
    Text,
    Flex,
    Button,
    Icon,
    List,
    ListItem,
    Img,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,
} from '@chakra-ui/react'
import { MdAdd, MdCloudUpload, MdDelete } from 'react-icons/md';
import { BiSolidDuplicate } from "react-icons/bi";
import TextField from 'components/fields/TextField';
import SelectField from 'components/fields/SelectField';
import Select from 'react-select';
import Menu from '../components/Navigate'
import { GiConsoleController } from 'react-icons/gi';
import StrightConector from '../components/dragNdrop/strightConector'
interface PropsDialog {
    seq?: any,
    index?: number,
    name?: any,
    handleInput?: any,
    handleSelect?: any,
    input?: any,
    getSeq?: any,
    duplicateSeq?: any,
    delSeq?: any,
    characterOption?: any,
    dialogOption?: any,
    voicePoseOption?: any,
    animateBtn?: any,
    setAnimateBtn?: any,
    handleDialogEmotion: any,
    handleDialogVoice: any,
    formData: any,
    alphabet: any,
    setNavigation: any,
    handleBlock: any,
    handleSelectBlock: any,
    handleDialogBlockRoll: any,
    items?: any,
    showSelectBlock?:any,
     setSelectBlock?:any,
}



const DialogCompo: React.FC<PropsDialog> = ({ seq, index, name, handleInput, handleSelect, input, getSeq, duplicateSeq, delSeq, characterOption, dialogOption, voicePoseOption, animateBtn, setAnimateBtn, handleDialogEmotion, handleDialogVoice, formData, handleDialogBlockRoll, alphabet, setNavigation, handleBlock, handleSelectBlock , items,showSelectBlock,setSelectBlock}) => {
    const textareaRef = useRef(null);
    const selectValue = `Char${[seq.input]}`;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const customButtonStyles = {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '15px',
        borderColor: '#ccc', // Optional: Change border color for disabled state
        borderWidth: '1px', // Add this line to set the border width
        borderStyle: 'solid', // Add this line to set the border style
        cursor: 'not-allowed', // Optional: Change cursor for disabled state
        padding: '5px 10px',
        width: '144px',
        // textAlign: "left",
        outerWidth:'10px',
        outline: 'none',
      };

    const customStyles = {
        menuPortal: (base: any) => ({ ...base, zIndex: 9999, }), control: (provided: any, state: any) => ({
            ...provided,
            borderRadius: '15px',
            borderColor: 'inherit',
            background: 'transparent',
            // height: '45px',
            padding: '0 !important',
        }), 
    }
    const emotionsOptions = [
        { value: 'Joy', label: 'Joy', key: 1 },
        { value: 'Sadness', label: 'Sadness', key: 2 },
        { value: 'Anger', label: 'Anger', key: 3 },
        { value: 'Fear', label: 'Fear', key: 4 },
        { value: 'Surprise', label: 'Surprise', key: 5 },
        { value: 'Disgust', label: 'Disgust', key: 6 },
        { value: 'Anticipation', label: 'Anticipation', key: 7 },
        { value: 'Trust', label: 'Trust', key: 8 },
        { value: 'Guilt', label: 'Guilt', key: 9 },
        { value: 'Love', label: 'Love', key: 10 }
    ];
    const options = [
        { value: 999999, label: 'Player' },
        { value: 99999, label: 'Narrator' },
        { value: formData.gameNonPlayingCharacterId, label: formData.gameNonPlayerName }

    ];
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input?.[`Dialog${seq.input}`]?.dialog]);




    let focusSeqRef: any;
    const justClick = (event: any, seq: any) => {        
      
        if (event.type === 'click') {
          focusSeqRef = document.getElementsByClassName(seq.id);
          const element = focusSeqRef?.[0];
      
          if (element) {
            element.classList.remove('non-caret');
            element.removeAttribute('readonly');            
            element.focus();
            // console.log('event.----------------', element);
          }
        }
    };


    console.log('seq', seq);
    
    return (
        <>
            {/* {seq.status == 'no' ? 
            (null) :               */}
            <Flex className='block-compo' mb={'20px'} padding={'10px 0'} alignItems={'start'} overflowX={'auto'}>
                <Box className='block-action-icons'>
                    <Icon as={MdAdd} fontSize={'18px'} color={'grey'} mr={'10px'} cursor={'pointer'} onClick={() => getSeq(seq, index, name)} />
                    <Icon as={BiSolidDuplicate} fontSize={'18px'} color={'grey'} mr={'10px'} cursor={'pointer'} onClick={() => duplicateSeq(seq, index, name)} />
                    <Icon as={MdDelete} fontSize={'18px'} color={'grey'} cursor={'pointer'} onClick={() => delSeq(seq, index, name)} />
                </Box>
                <Box className='box-block' display={'flex'} w={'100%'} alignItems={'start'}>
                    <Box mr={'10px'} w={'50px'} fontSize={'17px'} color={'#1b2559'} fontWeight={'700'}>{seq.id}</Box>
                    <Box m={'0 10px 10px 0'} w={'150px'}>
                        {/* <Select placeholder={'Character...'} name={`Dialog${seq.input}`} options={characterOption} onChange={(selectedOption, e) => handleSelect(selectedOption, e, 'character')} value={input?.[`Dialog${seq.input}`]?.character} styles={customStyles} /> */}
                        <Select
                            placeholder={'Character...'}
                            id='blockRoll'
                            name={`Dialog${seq.input}`}
                            menuPortalTarget={document.body}
                            styles={customStyles}
                            options={options}
                            value={
                                options.find(
                                    (option) =>
                                        parseInt(input?.[`Dialog${seq.input}`]?.character, 10)
                                            ? option.value === parseInt(input?.[`Dialog${seq.input}`]?.character, 10)
                                            : ''
                                ) || null
                            }

                            isSearchable={true}

                            onChange={(selectedOption: any) => handleDialogBlockRoll(selectedOption, seq.input)}
                        />

                    </Box>
                    <Box m={'0 10px 0px 0'} w={'550px'}>
                        {/* <Select name={`Dialog${seq.input}`} options={dialogOption} onChange={(selectedOption, e) => handleSelect(selectedOption, e, 'animation')} value={input?.[`Dialog${seq.input}`]?.dialog} isMulti={true} /> */}
                        {/* <Textarea placeholder='Dialog' id='Dialog' name={`Dialog${seq.input}`} onChange={handleInput} value={input?.[`Dialog${seq.input}`]?.dialog} borderRadius={'18px'} /> */}
                        <Textarea
                            placeholder='Dialog'
                            id='Dialog'
                            className={`${seq.id}`}
                            name={`Dialog${seq.input}`}
                            onChange={handleInput}
                            onClick={(e)=>justClick(e, seq)}
                            value={input?.[`Dialog${seq.input}`]?.dialog}
                            borderRadius={'18px'}
                            style={{ overflowY: 'hidden' }}
                            minHeight="45px"
                            ref={textareaRef} // Add a ref to the textarea
                            _focusVisible={{borderColor: '#0000', border: '1px solid #e5e5e5', boxShadow: 'unset'}}
                            tabIndex={0}
                            readOnly={true}
                        />
                    </Box>
                    {parseInt(input?.[`Dialog${seq.input}`]?.character, 10)!==99999 &&( 
                        <Box mr={'10px'} w={'250px'}>
                            {/* <Select placeholder={'Animate...'} name={`Dialog${seq.input}`} options={dialogOption} onChange={(selectedOption, e) => handleSelect(selectedOption, e, 'animation')} value={input?.[`Dialog${seq.input}`]?.animation} isMulti={true} styles={customStyles} /> */}
                            <Select
                                placeholder={'Animate...'}
                                id='Dialog'
                                name={`Dialog${seq.input}`}
                                menuPortalTarget={document.body}
                                styles={customStyles}
                                options={emotionsOptions}
                                isSearchable={true}
                                isMulti={true}
                                value={input?.[`Dialog${seq.input}`]?.animation
                                    ? input?.[`Dialog${seq.input}`]?.animation.split(',').map((value: string) => ({ // Explicitly specify the type as string
                                        value,
                                        label: value,
                                    }))
                                    : []}
                                onChange={(selectedOption: any) => handleDialogEmotion(selectedOption, seq.input)}
                            />
                            <Box className='navigation-icon' mr={'40px'}>
                            
                                        <Flex mb={'13px'}>
                                            <Box>
                                                <Menu
                                                    tabState={'leadDialog'}
                                                   
                                                    id={seq.input}
                                                    for={`Dialog${seq.input}`}
                                                    setNavigation={setNavigation}
                                                    handleBlock={handleBlock}
                                                    items={items}
                                                    seq={seq}
                                                />            
                                            </Box>      
                                            <Box ml={'4px'} cursor={'pointer'} display={input?.[`Dialog${seq.input}`]?.DialogleadShow ? 'block' : 'none'} >   
                                            {input?.[`Dialog${seq.input}`]?.DialogleadShow === 'Select Block'  && !input?.[`Dialog${seq.input}`]?.Dialognavigate ?(
 
                                                 <Select
                                                    placeholder={'Blocks...'}
                                                    id='Dialog'
                                                    name={`Dialog${seq.input}`}
                                                    menuPortalTarget={document.body}
                                                    styles={customStyles}
                                                    options={showSelectBlock}
                                                    isSearchable={true}
                                                    className='react-select'
                                                    value={
                                                        showSelectBlock.find(
                                                            (option: any) => option.value === parseInt(input?.[`Dialog${seq.input}`]?.Dialognavigate, 10)
                                                        ) || null
                                                    }
                                                    onChange={(e: any) => handleSelectBlock(e, seq.input, `Dialog${seq.input}`, `Dialog${seq.input}`)}
                                                /> 
                                                ) : (

                                                    <>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <StrightConector
  name={
    input?.[`Dialog${seq.input}`]?.DialogleadShow === 'Select Block'
      ? (
        showSelectBlock.find(
          (option: any) => option.value === input?.[`Dialog${seq.input}`]?.Dialognavigate
        )?.label
      )
      : input?.[`Dialog${seq.input}`]?.Dialognavigate
  }
/>
                                                        
                                                        
                                                        
                                                     
                                                      
                                                    </div>
                                                  </>
                    )
}
                                            </Box> 
                                        </Flex>
                                
                            </Box>
                        </Box>
                    )}
                    {100<50 &&(

                        <Box w={'100px'} mr={'10px'}>
                            {/* <Select placeholder={'Voices...'} name={`Dialog${seq.input}`} options={voicePoseOption} onChange={(selectedOption, e) => handleSelect(selectedOption, e, 'voice')} value={input?.[`Dialog${seq.input}`]?.voice} styles={customStyles} /> */}
                            <Select
                                placeholder={'Voice...'}
                                id='Dialog'
                                name={`Dialog${seq.input}`}
                                menuPortalTarget={document.body}
                                styles={customStyles}
                                options={emotionsOptions}
                                isSearchable={true}

                                value={
                                    emotionsOptions.find(
                                        (option) => option.value === input?.[`Dialog${seq.input}`]?.voice
                                    ) || null
                                }
                                onChange={(selectedOption: any) => handleDialogVoice(selectedOption, seq.input)}
                            />
                        </Box>
                    )}
                   
                    {/* <Button mr={'10px'}  w={'10%'} onClick={()=>setAnimateBtn(!animateBtn)}>Animate</Button> */}
                    {/* <Button onClick={onOpen}>Animate</Button> */}
                    {animateBtn && <Img src='' alt='animate' h={'30px'} w={'30px'} />}
                    <Text w={'40px'} mr={'10px'} color={'#c4c4c4'}>{seq.upNext}</Text>
                </Box>
            </Flex>
            {/* } */}

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Animation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='bold' mb='1rem'>
                            Animation Images
                        </Text>
                        { }
                        <Img src='' />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DialogCompo
