import { Box, Img, Button, Text, FormLabel, Input, FormHelperText, FormErrorMessage, FormControl, CloseButton} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react';


type languageProps = {
    formData: any;
    preloadedAssets: any;
    gameLanguages: any;
    hasMulitLanguages: boolean;
    setHasMulitLanguages: any;
    profileData: any;
    setProfileData:any;
    isOpenCustomModal: boolean;
    setIsOpenCustomModal: (value: boolean)=> void;
    setPreLogDatas: (val: any)=> void;
    getPrevLogDatas: any;
    currentScreenId: number;
}
const genderList = ['Male', 'Female', 'Other'];
const IsErrorInitialState = { name: '', language: '', gender: '' };

const defaultLanguage = ''; // Default to empty string instead of 0
const PromptScreen  : React.FC<languageProps> = ({formData, preloadedAssets, gameLanguages, hasMulitLanguages, setHasMulitLanguages, profileData,setProfileData, setIsOpenCustomModal, isOpenCustomModal, setPreLogDatas, getPrevLogDatas, currentScreenId})=> {

const [isLanguageSelected, setIsLanguageSelected] = useState(false); //to handle the dropdown open and hide for language
const [isGenderSelected, setIsGenderSelected] = useState(false); //to handle the dropdown open and hide for gender
const [isError, setIsError] = useState(IsErrorInitialState);
const [formState, setFormState] = useState<any>({
  name: '',
  language: defaultLanguage,
  gender: '',
});


useEffect(()=>{
        setFormState({
          name: getPrevLogDatas?.previewProfile?.name || '',
          language: getPrevLogDatas?.previewProfile?.language || defaultLanguage,
          gender: getPrevLogDatas?.previewProfile?.gender || '',
        });
        
  // return ()=>{
  //   setIsLanguageSelected(false);
  //   setIsGenderSelected(false);
  //   setIsError(IsErrorInitialState);
  //   setFormState(IsErrorInitialState);
  // }
},[])


useEffect(()=>{
  /*** Profile Screen Control logic */
  const {name, language, gender} = getPrevLogDatas?.previewProfile;
  if(currentScreenId === 10 && 
    (name || gender || language))
    {
      if((name !=="" || name)   &&  (gender !=='' || gender))
        {
          if(hasMulitLanguages)
          {
            if((language!=undefined && language ==='') || language ===0 ){
              setIsOpenCustomModal(true);
            }
          }
        }
        else{
          setIsOpenCustomModal(true);
        }
      }
  else{
    if(currentScreenId === 10 )
    {
      setTimeout(() => {
        setIsOpenCustomModal(true);
      }, 500);
    } 
    }
    
  },[hasMulitLanguages])

useEffect(()=>{
if(formState?.name || formData?.gender || formData?.language){
  setProfileData((prev:any) => ({ ...prev, ...formState}));
}
},[formState])


// const handleProfile = (e: any, input?: any) => {
//   const { id, value } = e.target;
//   if(id== "gender"){
//     setIsGenderSelected(false);
//   }
//   else if(id== "language"){
//     setIsLanguageSelected(false);
//   }
//   setFormState((prev:any)=> ({...prev, [id]: id=='name' ? value :  input}));
// };
const handleProfile = (e: any, input?: any) => {
  const { id, value } = e.target;
  if (id === 'gender') {
    setIsGenderSelected(false);
  } else if (id === 'language') {
    setIsLanguageSelected(false);
  }
  setIsError((prevError) => ({ ...prevError, [id]: '' }));
  setFormState((prev: any) => ({ ...prev, [id]: id === 'name' ? value : input }));
};

// const handleProfileSubmit=()=>{
//   if(formState?.name ==='')
//     { 
//       setIsError({name: 'Alias name is empty! Please enter an alias name', ...IsErrorInitialState});
//       return false;
//     }
//   else if(formState?.name?.length < 3 || formState?.name?.length > 15){
//     setIsError({name: 'Alias name must be between 3 and 15 letters', ...IsErrorInitialState});
//       return false;
//     }
//   else if(formState?.gender === '' ){
//       setIsError({gender: "Gender field is mandatory", ...IsErrorInitialState});
//       return false;
//     }
//   else if(formState?.language === '' )
//   {
//     setIsError({gender: "Language field is mandatory", ...IsErrorInitialState});
//     return false;
//   }
//   setProfileData((prev:any) => ({ ...prev, ...formState}));
//   setPreLogDatas((prev:any) => ({...prev,previewProfile:{...prev.previewProfile, ...formState}}));
//   setIsOpenCustomModal(false);
// }

const handleProfileSubmit = () => {
  const newErrors = {
    name: formState.name === '' ? 'Alias name is empty! Please enter an alias name' : '',
    gender: formState.gender === '' ? 'Gender field is mandatory' : '',
    language: gameLanguages.length > 0 && formState.language === '' ? 'Language field is mandatory' : '',
  };

  setIsError(newErrors);

  const isErrorPresent = Object.values(newErrors).some(error => error !== '');

  if (!isErrorPresent) {
    setProfileData((prev: any) => ({ ...prev, ...formState }));
    setPreLogDatas((prev: any) => ({ ...prev, previewProfile: { ...prev.previewProfile, ...formState } }));
    setIsOpenCustomModal(false);
  }
};
  return (
    isOpenCustomModal && 
    (<FormControl>
    <Box className="top-menu-home-section">
    <Box className="Setting-box">
            <Img
              src={preloadedAssets.Lang}
              className="setting-pad"
            />
            <Box className={'pofile-screen-body'}>
                <CloseButton onClick={()=>setIsOpenCustomModal(false)}/>
                <Box className="profile-screen-title">
                        <Text fontFamily="AtlantisText">Profile</Text>
                </Box>
                <Box className={'profile-screen-form'}>
                    {/** Alias Name */}
                    <Box className="nick-name " mb={'20px'}>
                        <FormLabel  fontFamily="AtlantisText">Alias Name</FormLabel>
                        <Img className="formfield" src={preloadedAssets.FormField} />
                        <Input
                        type={'text'}
                        id={'name'}
                        onChange={(e: any) => handleProfile(e)}
                        value={formState.name}
                        />
                          {isError.name && <FormHelperText color="red">{isError.name}</FormHelperText>}
                    </Box>

                    {/** Gender Selection */}
                    <Box className="gender-selection-box" onMouseLeave={() => setIsGenderSelected(false)}>
                  <FormLabel className={'label'} me={'0'}>
                    Gender
                  </FormLabel>
                  <Box position={'relative'}>
                    <Img
                      className="formfield"
                      w={'100%'}
                      h={'auto'}
                      zIndex={'1'}
                      src={preloadedAssets.FormField}
                      onClick={() => setIsGenderSelected(!isGenderSelected)}
                    />
                    <Box w={'100%'} position={'absolute'} display={'flex'} top={'7%'} onClick={() => setIsGenderSelected(!isGenderSelected)}>
                      <Box w={'80%'} display={'flex'} justifyContent={'center'}>
                        <Text className={'choosen_lang'}>
                          {/* {getPrevLogDatas?.previewProfile.gender} */}
                          {formState.gender}
                        </Text>
                      </Box>
                      <Box w={'20%'}>
                        <Img src={preloadedAssets.Selected} className={'select'} mt={'18%'} />
                      </Box>
                      {isGenderSelected && (
                        <Box className="dropdown" z-index={2} >
                          {genderList &&
                            genderList.map((gender: any, num: any) => (
                              <Text
                                className={'choosen_langs'}
                                ml={'5px'}
                                key={num}
                                _hover={{ bgColor: '#377498' }}
                                id={'gender'}
                                onClick={(e: any) =>handleProfile(e, gender)}
                              >
                                {gender}
                              </Text>
                            ))}
                        </Box>
                      )}
                    </Box>
                    {/* {isError.gender!=='' ? (
                          <FormHelperText>Select Player Gender..!</FormHelperText>
                          ) : (
                          <FormErrorMessage>{isError.gender}</FormErrorMessage>
                      )} */}
                  </Box>
                  {isError.gender && <FormHelperText color="red">{isError.gender}</FormHelperText>}
                  </Box>


                    {/** Language Selection */}

                    <Box className="language-selection-box" onMouseLeave={() => setIsLanguageSelected(false)}>
                  <FormLabel className={'label'} me={'0'}>
                    Language
                  </FormLabel>
                  <Box position={'relative'}>
                    <Img
                      className="formfield"
                      w={'100%'}
                      h={'auto'}
                      src={preloadedAssets.FormField}
                      onClick={() => setIsLanguageSelected(!isLanguageSelected)}
                      zIndex={1}
                    />
                    <Box w={'100%'} position={'absolute'} display={'flex'} top={'17%'} onClick={() => setIsLanguageSelected(!isLanguageSelected)}>
                      <Box w={'80%'} display={'flex'} justifyContent={'center'}>
                        <Text className={'choosen_lang'} z-index={isLanguageSelected ? 0 : 1}>
                        {/* {gameLanguages.find((lan:any)=> lan.value == getPrevLogDatas?.previewProfile?.language)?.label} */}
                        {/* {gameLanguages.find((lan:any)=> lan.value == formState?.language)?.label} */}
                        {gameLanguages.length > 0 ? gameLanguages.find((lan: any) => lan.value === formState?.language)?.label : 'English'}
                        </Text>
                      </Box>
                      <Box w={'20%'}>
                        <Img src={preloadedAssets.Selected} className={'select'} mt={'18%'} />
                      </Box>
                      {isLanguageSelected && (
                        <Box className="dropdown" z-index={2}>
                          {/* {gameLanguages &&
                            gameLanguages.map((lang: any, num: any) => (
                              <Text
                                className={'choosen_langs'}
                                ml={'5px'}
                                key={num}
                                _hover={{ bgColor: '#377498' }}
                                id={'language'}
                                onClick={(e: any) =>
                                  handleProfile(e, lang.value)
                                }
                              >
                                {lang.label}
                              </Text>
                            ))} */}
                            {gameLanguages.length > 0 ? gameLanguages.map((lang: any, num: any) => (
                            <Text
                              className={'choosen_langs'}
                              ml={'5px'}
                              key={num}
                              _hover={{ bgColor: '#377498' }}
                              id={'language'}
                              onClick={(e: any) => handleProfile(e, lang.value)}
                            >
                              {lang.label}
                            </Text>
                          )) : null}
                        </Box>
                      )}
                    </Box>
                    {/* {isError.language!=='' ? (
                          <FormHelperText>Select Player Gender..!</FormHelperText>
                          ) : (
                          <FormErrorMessage>{isError.language}</FormErrorMessage>
                      )} */}
                       {isError.language && <FormHelperText color="red">{isError.language}</FormHelperText>}
                  </Box>
                </Box>
          

            
            <Box className="btns">
              <Button
                className="okay-btn btn"
                // onClick={() => setIsOpenCustomModal(false)}
                onClick={() => handleProfileSubmit()}
              >
                <Img src={preloadedAssets.OkayBtn} />
              </Button>
            </Box>
          </Box>
    </Box> 
    </Box> 
    </Box> 
    </FormControl>)
  )
}

export default PromptScreen