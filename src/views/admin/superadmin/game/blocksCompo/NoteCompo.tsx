import React, { ChangeEvent, useCallback, useEffect, useMemo, useState ,useRef} from 'react'
// import { useRef } from 'react';
import {
    Box,
    Text,
    Flex,
    Button,
    Icon,
    List,
    ListItem,
    Img,
    Textarea,
    Input,    
    Divider 
} from '@chakra-ui/react'
import Select from 'react-select';
import { MdAdd, MdCloudUpload, MdDelete } from 'react-icons/md';
import { BiSolidDuplicate } from "react-icons/bi";
import Menu from '../components/Navigate'
import TextField from 'components/fields/TextField';
import InputField from 'components/fields/InputField'
import StrightConector from '../components/dragNdrop/strightConector'
 
interface PropsNote {
    seq?: any,
    index?: number,
    name?: any,
    handleInput?: any,
    input?: any,
    getSeq?: any,
    duplicateSeq?: any,
    delSeq?: any,
    alphabet?: any,
    setNavigation: any,
    handleBlock: any,
    items?: any,
    handleSelectBlock?: any,
    showSelectBlock?:any,
     setSelectBlock?:any,
}
const NoteCompo: React.FC<PropsNote> = ({ seq, index, name, handleInput, input, getSeq, duplicateSeq, delSeq, alphabet, setNavigation, handleBlock, handleSelectBlock, items,showSelectBlock,setSelectBlock }) => {
    const textareaRef = useRef(null);
    

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [input?.[`Note${seq.input}`]?.note]);

  


    // const customButtonStyles = {
    //     borderRadius: '15px',
    //     borderColor: '#ccc', // Optional: Change border color for disabled state
    //     borderWidth: '1px', // Add this line to set the border width
    //     borderStyle: 'solid', // Add this line to set the border style
    //     cursor: 'not-allowed', // Optional: Change cursor for disabled state
    //     padding: '10px 20px', // Adjust padding as needed
    //     outline: 'none',
    //     width: '140px', // Adjust width as needed
    //     // textAlign: 'left' as TextAlign, // Align content to the left
    //   };
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
            width: '130px',
            padding: '0 !important',
        }),
    }


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



    console.log('off',alphabet.filter((alp: any) => alp.seqs === seq.id ));
    return (
        <Flex className='block-compo' mb={'20px'} padding={'10px 0'} alignItems={'start'}>
            <Box className='block-action-icons'>
                <Icon as={MdAdd} fontSize={'18px'} color={'grey'} mr={'10px'} cursor={'pointer'} onClick={() => getSeq(seq, index, name)} />
                <Icon as={BiSolidDuplicate} fontSize={'18px'} color={'grey'} mr={'10px'} cursor={'pointer'} onClick={() => duplicateSeq(seq, index, name)} />
                <Icon as={MdDelete} fontSize={'18px'} color={'grey'} cursor={'pointer'} onClick={() => delSeq(seq, index, name)} />
            </Box>
            <Box className='box-block' display={'flex'} alignItems={'start'}>
                <Box mr={'10px'} w={'50px'} fontSize={'17px'} color={'#1b2559'} fontWeight={'700'}>{seq.id}</Box>
                <Box mr={'10px'} w={'150px'}> 
                <button
                    style={customButtonStyles}
                    disabled={true}
                    onClick={() => {}}
                    >
                    <span style={{ textAlign: 'left' }}>Narrator</span>
                    </button>
                                    {/* <InputField
                    placeholder={'Character...'}
                    
                    value="Narrator"
                    style={customStyles.inputField}
                    /> */}
                                    {/* <InputField
                    
                        
                    
                        value="Narrator"
                        style={{
                            padding: '5px',
                            borderRadius: '15px',
                            border: '1px solid #ccc',
                            width: '140px', // Adjust the width as needed
                            textAlign: 'left', // Align the text to the right
                            outline: 'none',
                        }}
                    /> */}

            </Box>
                <Box mr={'10px'} w={'550px'} >

                    {/* <Textarea
                        ref={textareaRef}
                        placeholder='Note'
                        id='Note'
                        name={`Note${seq.input}`}
                        onChange={handleInput}
                        value={input?.[`Note${seq.input}`]?.note}
                        isRequired={true}
                        // minHeight="45px"
                        borderRadius={'18px'}
                        // style={{ overflowY: 'hidden' }}
                    /> */}
                     <Textarea
                        ref={textareaRef}
                        placeholder='Note'
                        id='Note'
                        className={`${seq.id}`}    
                        name={`Note${seq.input}`}
                        onChange={handleInput}
                        onClick={(e)=>justClick(e, seq)}
                        value={input?.[`Note${seq.input}`]?.note}
                        isRequired={true}
                        minHeight="45px"
                        borderRadius={'18px'}
                        style={{ overflow: 'hidden' }}
                        overflow="auto" // Allow vertical scrolling
                        _focusVisible={{borderColor: '#0000', border: '1px solid #e5e5e5', boxShadow: 'unset'}}
                        tabIndex={0}
                        readOnly={true}
                    />
                    {/* <Textarea 
                        placeholder='Note' 
                        id='Note'                        
                        name={`Note${seq.input}`}                         
                        onChange={handleInput} 
                        value={input?.[`Note${seq.input}`]?.note}                         
                        isRequired={true}
                        borderRadius={'18px'}                        
                    /> */}
                </Box>
                {/* <Text w={'40px'} mr={'10px'} color={'#999797'}>{seq.upNext}</Text> */}
            </Box>
            
            <Box className='navigation-icon' mr={'40px'} width={'100%'}>
                
                        <Flex mb={'13px'}>
                            <Box>           
                                <Menu
                                                    tabState={'leadDialog'}
                                                   
                                                    id={seq.input}
                                                    for={`Note${seq.input}`}
                                                    setNavigation={setNavigation}
                                                    handleBlock={handleBlock}
                                                />     
                            </Box>      
                            <Box ml={'4px'} cursor={'pointer'} display={input?.[`Note${seq.input}`]?.NoteleadShow ? 'block' : 'none'} >               
                            {input?.[`Note${seq.input}`]?.NoteleadShow === 'Select Block' && !input?.[`Note${seq.input}`]?.Notenavigate  ?(

<Select
   placeholder={'Blocks...'}
   id='Dialog'
   name={`Note${seq.input}`}
   menuPortalTarget={document.body}
   styles={customStyles}
   options={showSelectBlock}
   isSearchable={true}
   className='react-select'
   value={
       showSelectBlock.find(
           (option: any) => option.value === parseInt(input?.[`Note${seq.input}`]?.Notenavigate, 10)
       ) || null
   }
   onChange={(e: any) => handleSelectBlock(e, seq.input, `Note${seq.input}`, `Note${seq.input}`)}
/> 
) : (
<>
  <div style={{ display: 'flex', alignItems: 'center' }}>

  <StrightConector
  name={
    input?.[`Note${seq.input}`]?.NoteleadShow === 'Select Block'
      ? (
        showSelectBlock.find(
          (option: any) => option.value === input?.[`Note${seq.input}`]?.Notenavigate
        )?.label
      )
      : input?.[`Note${seq.input}`]?.Notenavigate
  }
/>

    
   
    
  </div>
</>
    
)
}
                            </Box> 
                        </Flex>
                
            </Box>
        </Flex>
    )
}


export default NoteCompo;