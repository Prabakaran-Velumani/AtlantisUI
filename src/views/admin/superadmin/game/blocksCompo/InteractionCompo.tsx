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
    Avatar,
    Input,
    Table,
    Thead,
    Tr,
    Td,
    Tbody,
    Th,
    TableContainer,
    Checkbox,
    Textarea,
} from '@chakra-ui/react'
import Select from 'react-select';
import { MdAdd, MdArrowBack, MdArrowForward, MdArrowRight, MdCloudUpload, MdDelete } from 'react-icons/md';

import InputField from 'components/fields/InputField';
import SelectField from 'components/fields/SelectField';
import Avatar14 from 'assets/img/avatars/avatar14.png';
import { BiSolidDuplicate } from 'react-icons/bi';
import Menu from '../components/Navigate'
import TagsField from './interactionSkills';
import StrightConector from '../components/dragNdrop/strightConector'
interface PropsInteraction {
    seq?: any,
    index?: number,
    name?: any,
    number?: any,
    dummySequence?: any,
    getSeq?: any,
    duplicateSeq?: any,
    delSeq?: any,
    input?: any,
    handleInput?: any, 
    handleSelect?: any,
    characterOption?: any,
    alphabet?: any,
    setAlphabet?: any,
    animateBtn?: any,
    setAnimateBtn?: any
    interactionBlock?: any,
    setInteractionBlock?: any
    formData?: any
    handleBlockRoll: any
    handleResponseRoll: any
    handleQuestionEmotion: any,
    handleOptionEmotion: any,
    handleResponseEmotion: any,
    handleCheckBox: any,
    setNavigation: any,
    handleBlock: any,
    handleOptionVoice: any,
    handleQuestionVoice: any,
    countalphabet: any,
    setAlphabetCount: any,
    items: any,
    handleSelectBlock: any,
    handleTagsChange: any,
    showSelectBlock?:any,
    setSelectBlock?:any,
}
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


const InteractionCompo: React.FC<PropsInteraction> = ({ seq, index, number, dummySequence, name, handleInput, handleSelect, input, getSeq, duplicateSeq, delSeq, characterOption, alphabet, setAlphabet, animateBtn, setAnimateBtn, interactionBlock, setInteractionBlock, formData, handleBlockRoll, handleQuestionEmotion, handleOptionEmotion, handleResponseEmotion, handleCheckBox, setNavigation, handleBlock, handleOptionVoice, handleQuestionVoice, countalphabet, setAlphabetCount, items, handleSelectBlock, handleResponseRoll, handleTagsChange,showSelectBlock, setSelectBlock }) => {
    const initial = {
        [`block${index}`]: ['']
    };
    const textareaRef = useRef(null);
    const targetRef = useRef(null);
    const [textareaHeight, setTextareaHeight] = useState<number>(0);

    const [keyUp, setKeyUp] = useState<any>(),
        [upComing, setUpComing] = useState<any>([]),
       
        [showAlpha, setShowAlpha] = useState<any>(['A']),
        [isdelHovered, setdelHovered] = useState<any>(false),
        [state, setState] = useState<any>(initial);
    const alphaText = ['A'];
    const borderColor = '#f1e9e9'



    useEffect(() => {
        // const alphabet = alphaText.map((item: any)=> `${seq.input}${item}`);
        // setAlpha(alphabet);
        // setAlphabet(alphabet);
        // setShowAlpha(alphaText);

        // const sequencial:any = [];        
        // for (let i = 1; i <= index; i++) {
        //     const key = seq.input;                                       
        //     if (!sequencial[key]) {                                                                                                      
        //         sequencial[key] = ['']; 
        //       }
        // }    

        //sample
        // const sequencial: any = [];
        // number.forEach((item: any)=>{
        //     sequencial[item] = ['']
        // })

        //  console.log('sequencial',  seq);

        const blocks: any = [];
        dummySequence.forEach((item: any) => {
            blocks[item] = ['']
        });

        setState({ ...state, blocks });
    }, [number])
    // console.log('sequencial', alphabet);
    useEffect(() => {
        console.log('alphabet', seq);

        // console.log('sequencial',  seq.id,'--',alphabet);
        // const currentAlpha = alphabet
        //     .slice()
        //     .reverse() // Reverse the array to start searching from the end
        //     .find((item: any) => item.seqs === seq.id);
        //  if (seq.id !== currentAlpha?.seqs){
        //     setAlphabet((prev: any) => [
        //         ...prev,
        //         { seqs: seq.id, option: 'A' },
        //         { seqs: seq.id, option: 'B' },
        //         { seqs: seq.id, option: 'C' }
        //     ]);
        // }
    }, [alphabet])

   
    const handleSubmit1 = (e: any) => {
        e.preventDefault();

        console.log('seqqq', seq.input);

        const currentAlpha = alphabet[alphabet.length - 1];
        const currentLetter = currentAlpha.charAt(currentAlpha.length - 1);
        const nextLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
        // setState({...state, [`block${index}`]: newAlpha }); 

        dummySequence.forEach((el: any) => {
            setState((prev: any) => {
                const newAlpha = [...alphabet, `${seq.input}${nextLetter}`];
                const previous = prev.blocks?.[dummySequence[index]]
                setAlphabet(newAlpha);

                return {
                    ...prev,
                    // [`block${index}`]: index === index ? newAlpha : prev?.[`block${index}`],
                    blocks: { ...prev.blocks, [el]: seq.id == el ? newAlpha : previous }
                }
            })
        });



        // const sequenceAlpha = [{name: newAlpha, seq: seq.input}]; 
        // setNewAlp(sequenceAlpha);       

        const upComingAlpha = String.fromCharCode(nextLetter.charCodeAt(0) + 1)
        setUpComing(upComingAlpha);
        setShowAlpha([...showAlpha, nextLetter]);
        if (nextLetter > 'Z') {
            console.log('finisho')
        }
    }
    console.log('alphabet', alphabet)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const secondarycount = countalphabet + 1;
        setAlphabetCount(secondarycount)
        const lastElement = alphabet
            .filter((item: any) => item.seqs === seq.id)
            .reduce((acc: any, cur: any) => (cur.option > acc.option ? cur : acc), alphabet[0]);

        console.log('Last element for seqs:', 'is', lastElement.option);
        const currentAlpha = lastElement.option;
        const currentLetter = currentAlpha.charAt(currentAlpha.length - 1);
        let nextLetter = '';
        let upComingAlpha = '';
        if (currentLetter.charCodeAt(0) >= 90) {
            nextLetter = 'A';
            upComingAlpha = 'A';
        } else {

            nextLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
            upComingAlpha = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        }
        const newAlpha = [...alphabet, { seq: seq.id, option: `${currentAlpha}${nextLetter}` }];

        setAlphabet((prev: any) => [...prev, { seqs: seq.id, option: nextLetter, secondaryId: secondarycount }]);
        setUpComing(upComingAlpha);

        setShowAlpha([...showAlpha, nextLetter]);

        if (nextLetter > 'Z') {
            console.log('finisho');
        }
    };

    const handleKeyDown = (e: any) => {
        setKeyUp(true);
    };
    const handleFocusOut = () => {
        setKeyUp(false);
    };
    const handleIconHover = (iconId: any, isHovered: any) => {
        setdelHovered((prevIsDelHovered: any) => ({
            ...prevIsDelHovered,
            [iconId]: isHovered,
        }));
    };
    const options = [
        { value: 99999, label: 'Narrator' },
        { value: formData.gameNonPlayingCharacterId, label: formData.gameNonPlayerName }

    ];
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
    const setBlocks = (menuvalue: any, i: any, foroption: any) => {
        console.log(setBlocks)
    }
    const deleteAndRearrange = (seqs: string, option: string) => {
        // Filter out the deleted element

        if (typeof input === 'object' && input !== null) {
            // Find the iteration with the specified key
            const iteration = input[`Interaction${seq.input}`];

            if (iteration) {
                // Ensure that optionsObject is an object
                if (typeof iteration.optionsObject === 'object' && iteration.optionsObject !== null) {
                    // Delete the specified optionKey from optionsObject
                    delete iteration?.optionsObject[option];
                    delete iteration?.ansObject[option];


                    if (iteration.ansObject && iteration.ansObject.hasOwnProperty(option)) {
                        delete iteration?.ansObject[option];
                    }

                    if (iteration.feedbackObject && iteration.feedbackObject.hasOwnProperty(option)) {
                        delete iteration?.feedbackObject[option];
                    }

                    if (iteration.responseObject && iteration.responseObject.hasOwnProperty(option)) {
                        delete iteration?.responseObject[option];
                    }
                    if (iteration.responseObject && iteration.responseObject.hasOwnProperty(option)) {
                        delete iteration?.responseObject[option];
                    }


                    if (iteration.scoreObject && iteration.scoreObject.hasOwnProperty(option)) {
                        delete iteration?.scoreObject[option];
                    }


                    if (iteration.optionsemotionObject && iteration.optionsemotionObject.hasOwnProperty(option)) {
                        delete iteration?.optionsemotionObject[option];
                    }

                    if (iteration.responseemotionObject && iteration.responseemotionObject.hasOwnProperty(option)) {
                        delete iteration?.responseemotionObject[option];
                    }

                    if (iteration.optionTitleObject && iteration.optionTitleObject.hasOwnProperty(option)) {
                        delete iteration?.optionTitleObject[option];
                    }


                    if (iteration.optionsvoiceObject && iteration.optionsvoiceObject.hasOwnProperty(option)) {
                        delete iteration.optionsvoiceObject[option];
                    }



                    // Get the remaining keys and sort them alphabetically
                    const remainingKeys = Object.keys(iteration.optionsObject).sort();

                    // Create a new optionsObject with the reordered keys 
                    const reorderedOptionsObject: { [key: string]: any } = {};
                    const reorderedansObject: { [key: string]: any } = {};
                    const reorderedfeedbackObject: { [key: string]: any } = {};
                    const reorderedresponseObject: { [key: string]: any } = {};
                    const reorderedscoreObject: { [key: string]: any } = {};
                    const reorderedoptionsemotionObject: { [key: string]: any } = {};
                    const reorderedresponseemotionObject: { [key: string]: any } = {};
                    const reorderedoptionTitleObject: { [key: string]: any } = {};
                    const reorderedoptionVoiceObject: { [key: string]: any } = {};

                    let counter = 0;

                    Object.keys(iteration.optionsObject)
                        .sort()
                        .forEach((key) => {
                            const newKey = String.fromCharCode('A'.charCodeAt(0) + counter);

                            reorderedOptionsObject[newKey] = iteration.optionsObject[key] ? iteration.optionsObject[key] : undefined;
                            reorderedansObject[newKey] = iteration.ansObject[key] ? iteration.ansObject[key] : undefined;

                            reorderedfeedbackObject[newKey] = iteration.feedbackObject[key] ? iteration.feedbackObject[key] : undefined;

                            reorderedresponseObject[newKey] = iteration.responseObject[key] ? iteration.responseObject[key] : undefined;

                            reorderedscoreObject[newKey] = iteration.scoreObject[key] ? iteration.scoreObject[key] : undefined;

                            // reorderedoptionsemotionObject[newKey] = iteration.optionsemotionObject[key]? iteration.optionsemotionObject[key] : undefined;
                            if (iteration.optionsemotionObject && iteration.optionsemotionObject[key]) {
                                reorderedoptionsemotionObject[newKey] = iteration.optionsemotionObject[key];
                            } else {
                                // Handle the case where iteration.responseemotionObject or its property is undefined
                                reorderedoptionsemotionObject[newKey] = undefined;
                            }
                            // reorderedresponseemotionObject[newKey] = iteration.responseemotionObject ? iteration.responseemotionObject[key] : undefined;
                            if (iteration.responseemotionObject && iteration.responseemotionObject[key]) {
                                reorderedresponseemotionObject[newKey] = iteration.responseemotionObject[key];
                            } else {
                                // Handle the case where iteration.responseemotionObject or its property is undefined
                                reorderedresponseemotionObject[newKey] = undefined;
                            }
                            reorderedoptionTitleObject[newKey] = iteration.optionTitleObject[key] ? iteration.optionTitleObject[key] : undefined;


                            // reorderedoptionVoiceObject[newKey] = iteration.optionsvoiceObject[key]? iteration.optionsvoiceObject[key] : undefined;
                            if (iteration.optionsvoiceObject && iteration.optionsvoiceObject[key]) {
                                reorderedoptionVoiceObject[newKey] = iteration.optionsvoiceObject[key];
                            } else {
                                // Handle the case where iteration.responseemotionObject or its property is undefined
                                reorderedoptionVoiceObject[newKey] = undefined;
                            }



                            counter++;
                        });

                    // Set the reordered optionsObject
                    iteration.optionsObject = reorderedOptionsObject;
                    iteration.ansObject = reorderedansObject;
                    iteration.feedbackObject = reorderedfeedbackObject;
                    iteration.responseObject = reorderedresponseObject;
                    iteration.scoreObject = reorderedscoreObject;
                    iteration.optionsemotionObject = reorderedoptionsemotionObject;
                    iteration.responseemotionObject = reorderedresponseemotionObject;
                    iteration.optionTitleObject = reorderedoptionTitleObject;
                    iteration.optionsvoiceObject = reorderedoptionVoiceObject;

                    // Log the value of the deleted option and the reordered optionsObject
                    console.log('Deleted option key:', option);
                    console.log('Reordered optionsObject:', iteration.optionsObject);
                } else {
                    console.error('optionsObject is not an object');
                }
            } else {
                console.error(`No iteration found with key 'Interaction${seqs}'`);
            }
        } else {
            console.error('Input is not an object');
        }

        const updatedAlphabet = alphabet?.filter(
            (item: any) => !(item.seqs === seqs && item.option === option)
        );

        // Get only the elements with the specific seqs ID
        const filteredBySeqs = updatedAlphabet?.filter((item: any) => item.seqs === seqs);
        if (filteredBySeqs.length === 0) {
            console.log('Cannot delete the last element for seqs:', seqs);
            return;
        }

        const rearrangedAlphabet = filteredBySeqs.map((item: any, index: any) => ({
            ...item,
            option: String.fromCharCode(65 + index), // Convert index to alphabet ('A', 'B', ...)
        }));

        console.log('rearrangedAlphabet', rearrangedAlphabet);

        setAlphabet((prevAlphabet: any[]) => {

            const filteredPrevAlphabet = prevAlphabet?.filter((item) => item.seqs !== seqs);


            const updatedAlphabet = filteredPrevAlphabet.concat(rearrangedAlphabet);

            return updatedAlphabet;
        });


    };//1998

    // InteractionBlock Function
    const handleDelResponse = () => {
        setInteractionBlock({ ...interactionBlock, [`Resp${seq.input}`]: null })
    }
    const handleDelFeedback = () => {
        setInteractionBlock({ ...interactionBlock, [`Feedbk${seq.input}`]: null })
    }
    const handleDelSkills = () => {
        setInteractionBlock({ ...interactionBlock, [`Skills${seq.input}`]: null })
    }
    const handleDelTitles = () => {
        setInteractionBlock({ ...interactionBlock, [`Title${seq.input}`]: null })
    }

    const [showLeftButton, setShowLeftButton] = useState(false);
  
    const [showcount, setShowcount] = useState<any>('');

  const handleLeft = () => {
    
    const container = document.getElementById(seq.id);
    if (container) {
        container.scrollLeft -= 200;
        
        
        if(container.scrollLeft <= 0 ){
          setShowLeftButton(false);
        }
        
      }
  };

  const handleRight = () => {
    const container = document.getElementById(seq.id);
    
    if (container) {
      container.scrollLeft += 200;
      setShowcount(container.scrollLeft+300)
      if(container.scrollLeft > 0){
        setShowLeftButton(true);
      }
      
    }
  };
  const scrollToElement1 = (id:any) => {
    const element = document.getElementById(id);
  if (element) {
    element.scrollLeft = 0;
    element.scrollTo({
      left: 0,
      behavior: 'auto' // Optionally, use 'auto' or 'smooth' for smooth scrolling
    });
  }
  };
  const scrollToElement = (inputId:any) => {
    const inputElement = document.getElementById(inputId);
    // if (inputElement) {
        //   inputElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        // }
    if (targetRef.current) {        
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });        
    }
  };
    // Styles for Select
    const customStyles = {
        menuPortal: (base: any) => ({ ...base, zIndex: 9999, }), control: (provided: any, state: any) => ({
            ...provided,
            borderRadius: '15px',
            borderColor: 'inherit',
            background: 'transparent',
            // height: '45px',
            width: '180px',
            padding: '0 !important',
        }),
    }
    useEffect(() => {
        if (textareaRef.current) {
            // Adjust the height of the textarea based on its content
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    
            // Set the textarea height to adjust the marginTop of the block-score
            setTextareaHeight(textareaRef.current.scrollHeight);
        }
    }, [input?.[`Interaction${seq.input}`]?.interaction, input?.[`Note${seq.input}`]?.note]);
    // useEffect(() => {
    //     if (textareaRef.current) {
    //         // Adjust the height of the textarea based on its content
    //         textareaRef.current.style.height = 'auto';
    //         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    
    //         const titlesBox = document.querySelector('.titles') as HTMLElement | null;
    //         if (titlesBox) {
    //             // Set the margin-top of titlesABC based on the current height of the textarea
    //             titlesBox.style.marginTop = `${textareaRef.current.scrollHeight - 10}px`; // Adjust this value as needed
    //         }
    
    //         // Iterate over the interaction boxes and set margin-top based on seq.id
    //         ['Response', 'Feedback', 'Skills', 'Title'].forEach((interactionType) => {
    //             const interactionBox = document.querySelector(`.${interactionType}`) as HTMLElement | null;
    //             if (interactionBox) {
    //                 // Assuming seq.input is the identifier for each interaction box
    //                 const newHeight = textareaRef.current.scrollHeight;
    //                 interactionBox.style.marginTop = `${newHeight - 10}px`; // Adjust this value as needed
    //             }
    //         });
    //     }
    // }, [input?.[`Interaction${seq.input}`]?.interaction, input?.[`Note${seq.input}`]?.note, seq.input]);
    
    
    
    
    

    // console.log('tempo1', input?.[`Interaction${seq.input}`]?.blockroll)
    // console.log('dummySequence', dummySequence)
    // console.log('index', number)




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




    console.log('seq',alphabet);
    

    return (
        <Flex className='block-compo' overflowX={'auto'} scrollBehavior={'smooth'} id={`${seq.id}`}>
              {showLeftButton && (
            <Box className='goLeft' display={'flex'} alignItems={'center'} height={'100%'} position={'absolute'} left={0}>
                <Button onClick={handleLeft} position={'absolute'} left={0} zIndex={9} background={'#0000'} _hover={{background: '#0000'}} boxShadow={'unset'}>
                    <Icon as={MdArrowBack} color={'#fff'} />
                    <Box content='""' height={'30px'} width={'30px'} borderRadius={'30px'} zIndex={-9} background={'#11047a'} position={'absolute'}></Box>
                </Button>   
            </Box>
              )}
            <Box className='block-action-icons'>
                <Icon as={MdAdd} fontSize={'18px'} color={'grey'} mr={'10px'} cursor={'pointer'} onClick={() => getSeq(seq, index, name)} />
                <Icon as={BiSolidDuplicate} fontSize={'18px'} color={'grey'} mr={'10px'} cursor={'pointer'} onClick={() => duplicateSeq(seq, index, name)} />
                <Icon as={MdDelete} fontSize={'18px'} color={'grey'} cursor={'pointer'} onClick={() => delSeq(seq, index, name)} />
            </Box>
            <Box className='box-block' display={'flex'} mr={'8px'} mb={'30px'} >                                           
                    <Box mr={'10px'} fontWeight={'700'} w={'50px'}>{seq.id}</Box>
                    <Box mr={'10px'} w={'150px'}>
                        <Select
                            placeholder={'Character...'}
                            id='blockRoll'
                            name={`Interaction${seq.input}`}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
                                control: (provided: any, state: any) => ({
                                    ...provided,
                                    borderRadius: '15px',
                                    height: '40px',
                                    borderColor: 'inherit',
                                    background: 'transparent',
                                    padding: '0 !important',
                                    width: '150px',
                                }),
                            }}
                            options={options}
                            value={
                                options.find(
                                    (option) =>
                                        parseInt(input?.[`Interaction${seq.input}`]?.blockRoll, 10)
                                            ? option.value === parseInt(input?.[`Interaction${seq.input}`]?.blockRoll, 10)
                                            : ''
                                ) || null
                            }

                            isSearchable={true}
                            className='react-select'
                            onChange={(selectedOption: any) => handleBlockRoll(selectedOption, seq.input, `Interaction${seq.input}`)}
                        />
                        {/*  // onChange={(selectedOption) => handleCompanyChange(selectedOption)}
                            // isClearable={true} // Optional: allow clearing the selection */

                            // value={
                            //   Category.find(
                            // (option) => option.value === selected.gameCategoryId,
                            //  / ) || null
                            // }

                            // styles={customStyle}  
                        }
                    </Box>
                    <Box mr={'10px'}>
                        <Flex justifyContent={'space-between'}>
                            {/* <Input
                                placeholder='Interaction - Type your Question'
                                id='interaction'
                                name={`Interaction${seq.input}`}
                                onChange={handleInput}
                                value={input?.[`Interaction${seq.input}`]?.interaction}
                                borderRadius={'15px'}
                                w={'260px'}                            
                                mr={'10px'}
                            /> */}
                            <Box m={'0 10px 0px 0'} w={'400px'} marginBottom="24px">
                                <Textarea
                                    placeholder='Interaction - Type your Question'
                                    id='interaction'
                                    className={`${seq.id}`}
                                    name={`Interaction${seq.input}`}
                                    onChange={handleInput}
                                    onClick={(e)=>justClick(e, seq)}
                                    value={input?.[`Interaction${seq.input}`]?.interaction}
                                    borderRadius={'15px'}
                                    // w={'260px'}
                                    style={{ overflow: 'hidden' }}
                                    minHeight="45px"
                                    height={`auto`}
                                    ref={textareaRef}
                                    _focusVisible={{borderColor: '#0000', border: '1px solid #e5e5e5', boxShadow: 'unset'}}
                                    tabIndex={0}
                                    readOnly={true}
                                /></Box>
                            <Box mr={'10px'}>
                                <Select
                                    placeholder={'Animate...'}
                                    id='interaction'
                                    name={`Interaction${seq.input}`}
                                    menuPortalTarget={document.body}
                                    styles={customStyles}
                                    options={emotionsOptions}
                                    isSearchable={true}
                                    
                                    isMulti={true}
                                    className='react-select'
                                    // value={
                                    //     emotionsOptions.find(
                                    //         (option) => option.value === input?.[`Interaction${seq.input}`]?.QuestionsEmotion
                                    //     ) || null
                                    // }

                                    value={input?.[`Interaction${seq.input}`]?.QuestionsEmotion
                                    ? input?.[`Interaction${seq.input}`]?.QuestionsEmotion.split(',').map((value: string) => ({ // Explicitly specify the type as string
                                        value,
                                        label: value,
                                    }))
                                    : []}

                                    onChange={(selectedOption: any) => handleQuestionEmotion(selectedOption, seq.input, `Interaction${seq.input}`)}
                                />
                            </Box>
                            <Box>
                                {/* <Select
                                    placeholder={'Voice...'}
                                    id='interaction'
                                    name={`Interaction${seq.input}`}
                                    menuPortalTarget={document.body}
                                    styles={customStyles}
                                    options={emotionsOptions}
                                    isSearchable={true}
                                    className='react-select'
                                    value={
                                        emotionsOptions.find(
                                            (option) => option.value === input?.[`Interaction${seq.input}`]?.QuestionsVoice
                                        ) || null
                                    }
                                    onChange={(selectedOption: any) => handleQuestionVoice(selectedOption, seq.input,`Interaction${seq.input}`)}
                                /> */}
                            </Box>
                        </Flex>
                        <form onSubmit={handleSubmit} style={{ margin: '10px 0' }}>
                            {alphabet?.filter((alp: any) => alp.seqs === seq.id).map((alp: any, i: number, arr: any[]) => {
                                const isLastElement = i === arr.length - 1;
                                // console.log('alp',i)     
                                const iconId = `deleteIcon_${alp.option}`;
                                return (
                                    <Box className='interaction-option' display={'flex'} alignItems={'center'} mb={'10px'}>
                                        <Box className='interaction-option-del-icon' ml={'2px'} mr={'4px'} cursor={'pointer'} onClick={() => deleteAndRearrange(alp.seqs, alp.option)}>
                                            <Icon as={MdDelete} color={'grey'} />
                                        </Box>
                                        <Box key={alp.option} position={'relative'} display={'flex'} >
                                            {/* Your existing content */}
                                            <Input
                                                placeholder={`Option${alp.option}`}
                                                id={`Option${alp.option}`}
                                                name={`Interaction${seq.input}`}
                                                onChange={handleInput}
                                                pl={'25px'}
                                                onKeyDown={handleKeyDown}
                                                onBlur={handleFocusOut}
                                                borderRadius={'15px'}
                                                title={alp.option}
                                                value={input?.[`Interaction${seq.input}`]?.optionsObject?.[alp.option]}
                                                w={'240px'}
                                                mr={'10px'}
                                            />
                                            <Box >
                                                <Text
                                                    position={'absolute'}
                                                    top={'13px'}
                                                    left={'5px'}
                                                    display={'flex'}
                                                    justifyContent={'center'}
                                                    alignItems={'center'}
                                                    h={'11px'}
                                                    w={'11px'}
                                                    bg={'#000'}
                                                    color={'#fff'}
                                                    p={'7px'}
                                                    borderRadius={'30px'}
                                                    fontSize={'10px'}
                                                >
                                                    {alp.option}
                                                </Text>
                                            </Box>
                                            <Box mr={'10px'}>
                                                <Select
                                                    placeholder={'Animate...'}
                                                    id={`Option${alp.option}`}
                                                    name={`Interaction${seq.input}`}
                                                    menuPortalTarget={document.body}
                                                    styles={customStyles}
                                                    options={emotionsOptions}
                                                    isSearchable={true}
                                                    className='react-select'
                                                    isMulti={true}
                                                    // value={
                                                    //     emotionsOptions.find(
                                                    //         (option) => option.value === input?.[`Interaction${seq.input}`]?.optionsemotionObject?.[alp.option]
                                                    //     ) || null
                                                    // }
                                                    value=
                                                    {input?.[`Interaction${seq.input}`]?.optionsemotionObject?.[alp.option]
                                                    ? input?.[`Interaction${seq.input}`]?.optionsemotionObject?.[alp.option].split(',').map((value: string) => ({ // Explicitly specify the type as string
                                                        value,
                                                        label: value,
                                                    }))
                                                    : []}

                                                    onChange={(e: any) => handleOptionEmotion(e, seq.input, `Option${alp.option}`, `Interaction${seq.input}`)}
                                                />
                                            </Box>
                                            {/* <Box>
                                                <Select
                                                    placeholder={'Voice...'}
                                                    id={`Option${alp.option}`}
                                                    name={`Interaction${seq.input}`}
                                                    menuPortalTarget={document.body}
                                                    styles={customStyles}
                                                    options={emotionsOptions}
                                                    isSearchable={true}
                                                    className='react-select'
                                                    value={
                                                        emotionsOptions.find(
                                                            (option) => option.value === input?.[`Interaction${seq.input}`]?.optionsvoiceObject?.[alp.option]
                                                        ) || null
                                                    }
                                                    onChange={(e: any) => handleOptionVoice(e, seq.input, `Option${alp.option}`, `Interaction${seq.input}`)}
                                                />
                                            </Box> */}
                                        </Box>
                                    </Box>
                                )
                            })}
                            {/* {keyUp ?  */}

                            <Box position={'relative'} opacity={0.6} cursor={'pointer'} onClick={handleSubmit} display={'flex'}>
                                <Box visibility={'hidden'} w={'20px'}><Icon as={MdDelete} /></Box>
                                <Input
                                    placeholder={'Add Option'}
                                    name={alphabet}
                                    pl={'25px'}
                                    borderRadius={'10px'}
                                    tabIndex={1}
                                    style={{ pointerEvents: 'none' }}
                                    w={'240px'}
                                />
                                <Text
                                    position={'absolute'}
                                    top={'13px'}
                                    left={'25px'}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    h={'11px'}
                                    w={'11px'}
                                    bg={'#000'}
                                    color={'#fff'}
                                    p={'7px'}
                                    borderRadius={'30px'}
                                    fontSize={'10px'}
                                >
                                    {/* {upComing} */}
                                </Text>
                            </Box>
                            {/* // : null  } */}
                            <Button type='submit' hidden>Save</Button>
                        </form>
                    </Box>
                    {/* <Text  w={'40px'} mr={'0px'} color={'#c4c4c4'}>{seq.upNext}</Text> border={'1px solid #8080807d'} */}
                {/* <Button onClick={handleRight} position={'absolute'} right={0} zIndex={9} height={'100%'} alignItems={'center'} background={'#fff'} _hover={{background: '#fff'}} boxShadow={'unset'}>
                    <Icon as={MdArrowForward} color={'#000'}/>
                    <Box content='""' height={'30px'} width={'30px'} borderRadius={'30px'} zIndex={-9} background={'grey'} position={'absolute'}></Box>
                </Button> */}
            </Box>
            <div ref={targetRef} id="targetRef"></div>
            <Box className='Skill-Title' display={'flex'}>
                <Box className='skills'>
                    {interactionBlock?.[`Skills${[seq.input]}`] == seq.input ?
                        <Box display={'flex'} flexDir={'column'}>
                            {/* <Box w={'100%'} borderBottom={`1px solid ${borderColor}`}>
                                <Text fontWeight={'800'} fontSize={'16px'} m={'5px 0'} textAlign={'center'}>Skills</Text>
                            </Box> */}
                            <Box display={'flex'}>
                                {/* <TagsField placeholder='Skills...' name={`Interaction${seq.input}`} w={'200px'} m={'15px 0 15px 10px'} onTagsChange={handleTagsChange}
                                    interaction={`Interaction${seq.input}`}
                                    inputskill={input?.[`Interaction${seq.input}`]?.SkillTag}
                                /> */}
                                <Textarea
                                    id={`skills`}
                                    placeholder='Skills...'           
                                    name={`Interaction${seq.input}`}
                                    w={'160px'}
                                    m={'0px 0 15px 10px'}
                                    minHeight="40px"
                                    borderRadius={'18px'}
                                    onChange={handleInput} // Adjust the event handler accordingly
                                    value={input?.[`Interaction${seq.input}`]?.SkillTag} />

                                <Box  m={'10px 0 0px -30px'} w={'100px'} textAlign={'center'} cursor={'pointer'} onClick={handleDelSkills} >
                                    <Icon as={MdDelete} color={'grey'} />
                                </Box>
                            </Box>
                        </Box>
                        : null
                    }
                </Box>
                <Box className='titles'   style={{ marginTop: `${textareaHeight - 10}px`, transition: 'margin-top 0.3s ease-out' }}  >
                    {interactionBlock?.[`Title${[seq.input]}`] == seq.input ?
                        <Box display={'flex'} alignItems={'center'} borderRight={`1px solid ${borderColor}`} borderLeft={`1px solid ${borderColor}`} mr={'20px'}>
                            <Box display={'flex'} flexDir={'column'} p={'0px 10px'}>
                                <Box w={'100%'} display={'flex'} p={'0px'}>                                    
                                    {/* <Text fontWeight={'800'} fontSize={'16px'} m={'5px 10px 0 0'} textAlign={'center'}>Title</Text> */}
                                    <Input placeholder='Question Title...' name={`Interaction${seq.input}`} onChange={handleInput} value={input?.[`Interaction${[seq.input]}`].quesionTitle} id={`QuestionTitle${seq.input}`} w={'200px'} borderRadius={'15px'}  />
                                </Box>
                                <Box m={'10px 0'}>                                
                                    {alphabet.filter((alp: any) => alp.seqs === seq.id).map((alp: any, i: number) => (
                                        <Box>                                        
                                            <Input
                                                placeholder={`Title${alp.option}`}
                                                id={`OptionTitle${alp.option}`}
                                                name={`Interaction${seq.input}`}
                                                onChange={handleInput}
                                                onKeyDown={handleKeyDown}
                                                onBlur={handleFocusOut}
                                                title={alp.option}
                                                value={input?.[`Interaction${seq.input}`]?.optionTitleObject?.[alp.option]}
                                                pl={'25px'}
                                                mb={'10px'}                                                                                       
                                                borderRadius={'15px'}
                                                w={'200px'}
                                            />                                
                                        </Box>
                                        ))}
                                </Box>
                            </Box>   
                            <Box w={'100px'} textAlign={'center'} cursor={'pointer'} onClick={handleDelTitles}>
                                <Icon as={MdDelete} color={'grey'} />
                            </Box>                         
                        </Box>
                        : null

                    }
                </Box>
                
                {/* <Box className='titles'>
                    {interactionBlock?.[`Title${[seq.input]}`] == seq.input ?
                        <Box display={'flex'} alignItems={'center'} borderRight={`1px solid ${borderColor}`} borderLeft={`1px solid ${borderColor}`} mr={'20px'}>
                            <Box display={'flex'} flexDir={'column'} p={'0px 10px'}>
                                <Box w={'100%'} display={'flex'} p={'0px'}>
                                    {/* <Text fontWeight={'800'} fontSize={'16px'} m={'5px 10px 0 0'} textAlign={'center'}>Title</Text> */}
                                    {/* <Input placeholder='Question Title...' name={`Interaction${seq.input}`} onChange={handleInput} value={input?.[`Interaction${[seq.input]}`].quesionTitle} id='QuestionTitles' w={'200px'} borderRadius={'15px'} />
                                </Box>
                                <Box m={'0px 0'} className='titlesABC'>
                                    {alphabet.filter((alp: any) => alp.seqs === seq.id).map((alp: any, i: number) => (
                                        <Box m={'-2px 0'}>
                                            <Input
                                                placeholder={`Title${alp.option}`}
                                                id={`OptionTitle${alp.option}`}
                                                name={`Interaction${seq.input}`}
                                                onChange={handleInput}
                                                onKeyDown={handleKeyDown}
                                                onBlur={handleFocusOut}
                                                title={alp.option}
                                                value={input?.[`Interaction${seq.input}`]?.optionTitleObject?.[alp.option]}
                                                pl={'25px'}
                                                mb={'10px'}
                                                borderRadius={'15px'}
                                                w={'200px'}
                                            />
                                        </Box>
                                    ))}

                                </Box>
                                <Box w={'100px'} textAlign={'center'} cursor={'pointer'} onClick={handleDelTitles}>
                                    <Icon as={MdDelete} color={'grey'} />
                                </Box>
                            </Box>
                        </Box>
                        : null

                    }
                </Box> */} 
            </Box>
            <Box className='block-score' mr={'20px'}  style={{ marginTop: `${textareaHeight - 10}px`, transition: 'margin-top 0.3s ease-out' }}  >
                <TableContainer>
                    <Table  >
                        <Thead >
                            <Tr>
                                <Th >Right</Th>
                                <Th >Score</Th>                                
                            </Tr>
                        </Thead>
                       
                        <Tbody >
                            {alphabet
                                .filter((alp: any) => alp.seqs === seq.id)
                                .map((alp: any, i: number) => (
                                    <Tr key={i}>
                                        <Td>
                                            <Box>
                                            <Checkbox size='md' colorScheme='green' id={`Ans${alp.option}`} title={alp.option} name={`Interaction${seq.input}`} onChange={(e: any) => handleCheckBox(e, seq.input, `Option${alp.option}`, `Interaction${seq.input}`)} isChecked={
                                                input?.[`Interaction${seq.input}`]?.ansObject?.[alp.option] === true ||
                                                input?.[`Interaction${seq.input}`]?.ansObject?.[alp.option] === 'true'
                                            }>

                                            </Checkbox></Box>
                                        </Td>
                                        <Td p={0} alignItems={'center'}>
                                        <Box>
                                            <Input type='text' borderRadius={'15px'}   placeholder='00'  id={`Score${alp.option}`} title={alp.option} name={`Interaction${seq.input}`} onChange={handleInput}
                                            onKeyPress={(e) => {
                                                // Allow only numeric characters and some special keys
                                                const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                                            
                                                if (!allowedKeys.includes(e.key)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                               value={input?.[`Interaction${seq.input}`]?.scoreObject?.[alp.option]} /><span hidden>{alp.option}</span>

                                            </Box>
                                        </Td>
                                        {/* <Td p={0}> <Box>
                                                    <Menu
                                                        tabState={'navigation'}
                                                        option={`Option${alp.option}`}
                                                        id={seq.input}
                                                        for={`Interaction${seq.input}`}
                                                        setNavigation={setNavigation}
                                                        handleBlock={handleBlock}

                                                    />
                                                </Box>
                                                </Td><Td p={0}><Box ml={'4px'} cursor={'pointer'} display={input?.[`Interaction${seq.input}`]?.navigateshowObjects?.[alp.option] === 'Select Block' ? 'block' : 'none'} >
                                                    <Select
                                                        placeholder={'Blocks...'}
                                                        id='interaction'
                                                        name={`Interaction${seq.input}`}
                                                        menuPortalTarget={document.body}
                                                        styles={customStyles}
                                                        options={showSelectBlock}
                                                        isSearchable={true}
                                                        className='react-select'
                                                        value={
                                                            showSelectBlock.find(
                                                                (option: any) => option.value === parseInt(input?.[`Interaction${seq.input}`]?.navigateObjects?.[alp.option], 10)
                                                            ) || null
                                                        }
                                                        onChange={(e: any) => handleSelectBlock(e, seq.input, `Option${alp.option}`, `Interaction${seq.input}`)}
                                                    />

                                                </Box> </Td> */}
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>

                </TableContainer>

            </Box>
            <Box className='block-btns-based-input' display={'flex'}  style={{ marginTop: `${textareaHeight - 10}px`, transition: 'margin-top 0.3s ease-out' }}  >
                <Box className='Response' mr={interactionBlock?.[`Resp${[seq.input]}`] == seq?.input ? '20px' : '0px'} display={'flex'} flexDir={'column' } style={{ marginTop: '10px !important' }}>
                    {interactionBlock?.[`Resp${[seq.input]}`] == seq?.input ?
                        <Box border={`1px solid ${borderColor}`} >
                            <Box w={'100%'} borderBottom={`1px solid ${borderColor}`}>
                                <Text fontWeight={'800'} fontSize={'16px'} m={'5px 0'} textAlign={'center'}>Response</Text>
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <Box w={'120px'} textAlign={'center'} mr={'10px'}>
                                    <Select
                                        placeholder={'Character...'}
                                        id='ResponseCharter'
                                        name={`Interaction${seq.input}`}
                                        menuPortalTarget={document.body}
                                        styles={{
                                            menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
                                            control: (provided: any, state: any) => ({
                                                ...provided,
                                                borderRadius: '15px',
                                                height: '40px',
                                                borderColor: 'inherit',
                                                background: 'transparent',
                                                padding: '0 !important',
                                                width: '115px',
                                                marginLeft: '4px',
                                            }),
                                        }}
                                        options={options}
                                        value={
                                            options.find(
                                                (option) =>
                                                    parseInt(input?.[`Interaction${seq.input}`]?.responseRoll, 10)
                                                        ? option.value === parseInt(input?.[`Interaction${seq.input}`]?.responseRoll, 10)
                                                        : ''
                                            ) || null
                                        }

                                        isSearchable={true}
                                        className='react-select'
                                        onChange={(selectedOption: any) => handleResponseRoll(selectedOption, seq.input, `Interaction${seq.input}`)}
                                    />
                                </Box>
                                        <Box m={'15px 0'}>
                                            {alphabet
                                                .filter((alp: any) => alp.seqs === seq.id)
                                                .map((alp: any, i: number) => (
                                                    <Box key={i} position={'relative'} display={'flex'} mb={'10px'} >
                                                        <Box mr={'10px'}>
                                                            <Input placeholder={'Response'}  id={`Response${alp.option}`} title={alp.option} name={`Interaction${seq.input}`} onChange={handleInput} pl={'25px'} borderRadius={'15px'} value={input?.[`Interaction${seq.input}`]?.responseObject?.[alp.option]} w={'200px'} />
                                                            <Text position={'absolute'} top={'13px'} left={'5px'} display={'flex'} justifyContent={'center'} alignItems={'center'} h={'11px'} w={'11px'} bg={'#000'} color={'#fff'} p={'7px'} borderRadius={'30px'} fontSize={'10px'}  >{alp.option}</Text>
                                                        </Box>
                                                        {input?.[`Interaction${seq.input}`]?.responseRoll!==99999 &&(
                                                <Box>
                                                <Select
                                                    placeholder={'Animate...'}
                                                    id={`Option${alp.option}`}
                                                    name={`Interaction${seq.input}`}
                                                    menuPortalTarget={document.body}
                                                    styles={customStyles}
                                                    options={emotionsOptions}
                                                    isSearchable={true}
                                                    isMulti={true}
                                                    className='react-select'
                                                    value=
                                                    {input?.[`Interaction${seq.input}`]?.responseemotionObject?.[alp.option]
                                                    ? input?.[`Interaction${seq.input}`]?.responseemotionObject?.[alp.option].split(',').map((value: string) => ({ // Explicitly specify the type as string
                                                        value,
                                                        label: value,
                                                    }))
                                                    : []}

                                                    // value={
                                                    //     emotionsOptions.find(
                                                    //         (option) => option.value === input?.[`Interaction${seq.input}`]?.responseemotionObject?.[alp.option]
                                                    //     ) || null
                                                    // }
                                                    onChange={(e: any) => handleResponseEmotion(e, seq.input, `Option${alp.option}`, `Interaction${seq.input}`)}
                                                />
                                                </Box>
                                                )}
                                               
                                            </Box>
                                        ))}
                                </Box>
                                <Box w={'100px'} textAlign={'center'} cursor={'pointer'} onClick={handleDelResponse}>
                                    <Icon as={MdDelete} color={'grey'} />
                                </Box>
                            </Box>
                        </Box>
                        : null
                    }
                </Box>
                <Box className='Feedback' mr={interactionBlock?.[`Feedbk${[seq.input]}`] == seq?.input ? '20px' : '0px'} display={'flex'} flexDir={'column'}>
                    {interactionBlock?.[`Feedbk${[seq.input]}`] == seq.input ?
                        <Box border={`1px solid ${borderColor}`}>
                            <Box w={'100%'} borderBottom={`1px solid ${borderColor}`}>
                                <Text fontWeight={'800'} fontSize={'16px'} m={'5px 0'} textAlign={'center'}>Feedback</Text>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} m={'10px'}>
                                <Box>
                                    {alphabet?.filter((alp: any) => alp.seqs === seq.id).map((alp: any, i: number) => (
                                        <>
                                            <Box display={'flex'} mb={'10px'}>
                                                {/* First Box */}
                                                <Box key={i} position={'relative'} display={'flex'}>
                                                    <Input
                                                        placeholder={'Feedback'}
                                                        id={`FeedBack${alp.option}`}
                                                        title={alp.option}
                                                        name={`Interaction${seq.input}`}
                                                        onChange={handleInput}
                                                        pl={'25px'}
                                                        borderRadius={'15px'}
                                                        value={input?.[`Interaction${seq.input}`]?.feedbackObject?.[alp.option]}
                                                        mb={'3px'}
                                                        w={'200px'}
                                                    />
                                                    <Text
                                                        position={'absolute'}
                                                        top={'13px'}
                                                        left={'5px'}
                                                        display={'flex'}
                                                        justifyContent={'center'}
                                                        alignItems={'center'}
                                                        h={'11px'}
                                                        w={'11px'}
                                                        bg={'#000'}
                                                        color={'#fff'}
                                                        p={'7px'}
                                                        borderRadius={'30px'}
                                                        fontSize={'10px'}
                                                    >
                                                        {alp.option}
                                                    </Text>
                                                </Box>
                                                {/* Second Box */}
                                                {/* <Box ml={'4px'} cursor={'pointer'}>
                                                    <Menu
                                                        tabState={'navigation'}
                                                        option={`Option${alp.option}`}
                                                        id={seq.input}
                                                        for={`Interaction${seq.input}`}
                                                        setNavigation={setNavigation}
                                                        handleBlock={handleBlock}

                                                    />
                                                </Box> */}
                                                <Box ml={'4px'} cursor={'pointer'} display={input?.[`Interaction${seq.input}`]?.navigateshowObjects?.[alp.option] === 'Select Block' ? 'block' : 'none'} >
                                                    <Select
                                                        placeholder={'Blocks...'}
                                                        id='interaction'
                                                        name={`Interaction${seq.input}`}
                                                        menuPortalTarget={document.body}
                                                        styles={customStyles}
                                                        options={showSelectBlock}
                                                        isSearchable={true}
                                                        className='react-select'
                                                        value={
                                                            showSelectBlock.find(
                                                                (option: any) => option.value === parseInt(input?.[`Interaction${seq.input}`]?.navigateObjects?.[alp.option], 10)
                                                            ) || null
                                                        }
                                                        onChange={(e: any) => handleSelectBlock(e, seq.input, `Option${alp.option}`, `Interaction${seq.input}`)}
                                                    />

                                                </Box>
                                            </Box>
                                        </>
                                    ))}
                                </Box>
                                <Box w={'100px'} textAlign={'center'} cursor={'pointer'} onClick={handleDelFeedback}>
                                    <Icon as={MdDelete} color={'grey'} />
                                </Box>
                            </Box>
                        </Box>
                        : null
                    }
                </Box>
            </Box>
            <Box className='navigation-icon' mt={'98px'} mr={'40px'}>
                {alphabet
                    .filter((alp: any) => alp.seqs === seq.id)
                    .map((alp: any, i: number) => (
                        <Flex mb={'13px'}>
                            <Box>
                                <Menu
                                    tabState={'navigation'}
                                    option={`Option${alp.option}`}
                                    id={seq.input}
                                    for={`Interaction${seq.input}`}
                                    setNavigation={setNavigation}
                                    handleBlock={handleBlock}
                                />            
                            </Box>      
                           
                            <Box ml={'4px'} cursor={'pointer'}  display={input?.[`Interaction${seq.input}`]?.navigateshowObjects?.[alp.option] ? 'block' : 'none'} >               
                            {input?.[`Interaction${seq.input}`]?.navigateshowObjects?.[alp.option] === 'Select Block' && !input?.[`Interaction${seq.input}`]?.navigateObjects?.[alp.option] ?(






                                <Select
                                    placeholder={'Blocks...'}
                                    id='interaction'
                                    name={`Interaction${seq.input}`}
                                    menuPortalTarget={document.body}
                                    styles={customStyles}
                                    options={showSelectBlock}
                                    isSearchable={true}
                                    className='react-select'
                                    value={
                                        showSelectBlock.find(
                                            (option: any) => option.value === parseInt(input?.[`Interaction${seq.input}`]?.navigateObjects?.[alp.option], 10)
                                        ) || null
                                    }
                                    onChange={(e: any) => handleSelectBlock(e, seq.input, `Option${alp.option}`, `Interaction${seq.input}`)}
                                />
                            ):(
<>
  <div style={{ display: 'flex', alignItems: 'center',width:'164px' }}>

  <StrightConector
  name={
    input?.[`Interaction${seq.input}`]?.navigateshowObjects?.[alp.option] === 'Select Block'
      ? (
        showSelectBlock.find(
          (option: any) => option.value === input?.[`Interaction${seq.input}`]?.navigateObjects?.[alp.option]
        )?.label
      )
      : input?.[`Interaction${seq.input}`]?.navigateObjects?.[alp.option]
  }
/>

    
   

  </div>
</>

                               
                            )}
                            </Box> 
                        </Flex>
                ))}
            </Box>
            <Box className='block-btns'>
                <Box display={'flex'} flexDir={'column'}>
                    <Flex>
                        {interactionBlock?.[`Resp${seq.input}`] !== seq?.input ?
                            <Button mr={'10px'} w={'130px'} p={5} justifyContent={'start'} onClick={() => setInteractionBlock((prev: any) => { return { ...prev, [`Resp${[seq.input]}`]: seq.input } })
                            
                            }>
                                <Icon as={MdAdd} bg={'blue'} color={'#fff'} borderRadius={'888px'} mr={'5px'} /> <Text>Response</Text>
                            </Button> : null}
                        {interactionBlock?.[`Feedbk${seq.input}`] !== seq?.input ?
                            <Button mr={'10px'} w={'130px'} p={5} justifyContent={'start'} onClick={() => setInteractionBlock((prev: any) => { return { ...prev, [`Feedbk${[seq.input]}`]: seq.input } })}>
                                <Icon as={MdAdd} bg={'blue'} color={'#fff'} borderRadius={'888px'} mr={'5px'} /> <Text>Feedback</Text>
                            </Button> : null}
                    </Flex>
                    <Flex>
                        {/* 1998 */}
                        {interactionBlock?.[`Skills${seq.input}`] !== seq?.input ?
                            <Button mr={'10px'} w={'130px'} p={5} justifyContent={'start'} onClick={() => {
                                setInteractionBlock((prev: any) => {
                                  return { ...prev, [`Skills${[seq.input]}`]: seq.input  };
                                });
                                scrollToElement(`skill${seq.input}`); // Replace 'yourElementId' with the ID of the element you want to scroll to
                              }}>
                                <Icon as={MdAdd} bg={'blue'} color={'#fff'} borderRadius={'888px'} mr={'5px'} /> <Text>Skills</Text>
                            </Button> : null}
                        {interactionBlock?.[`Title${seq.input}`] !== seq?.input ?
                            <Button mr={'10px'} w={'130px'} p={5} justifyContent={'start'} onClick={() => {
                                setInteractionBlock((prev: any) => {
                                  return { ...prev, [`Title${[seq.input]}`]: seq.input  };
                                });
                                scrollToElement(`QuestionTitle${seq.input}`); // Replace 'yourElementId' with the ID of the element you want to scroll to
                              }}>


                                <Icon as={MdAdd} bg={'blue'} color={'#fff'} borderRadius={'888px'} mr={'5px'} /> <Text>Title</Text>
                            </Button> : null}
                    </Flex>
                </Box>
            </Box>                                             
            <Box className='goRight' display={'flex'} alignItems={'center'} height={'100%'} position={'absolute'} right={0}>
                <Button onClick={handleRight} position={'absolute'} right={0} zIndex={9} background={'#0000'} _hover={{background: '#0000'}} boxShadow={'unset'}>   
                    <Icon as={MdArrowForward} color={'#fff'}/>
                    <Box content='""' height={'30px'} width={'30px'} borderRadius={'30px'} zIndex={-9} background={'#11047a'} position={'absolute'}></Box>
                </Button>
            </Box>
        </Flex>
    )
}

export default InteractionCompo
 