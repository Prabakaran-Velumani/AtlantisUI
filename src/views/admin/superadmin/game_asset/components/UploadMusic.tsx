import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  Text,
  Icon,
  Spinner,
  Select,
  useToast,
  SimpleGrid,
  Grid,
  
  GridItem,
  FormLabel,
  useColorModeValue,
  Image,
  CloseButton,
  Divider,
  background,
} from '@chakra-ui/react';
import OnToast from 'components/alerts/toast';
import DropZone from '../../../../../components/dropzone/DropZone';
import AudioDropZone from '../../../../../components/audiodropzone/AudioDropZone';
import InputField from '../../../../../components/fields/InputField';
import { RequiredFieldValidator } from '../../../../../utils/formValidations/validations';
import {
  addGameAsset,
  updateGameAsset,
  fetchImageBlob,
  deleteGameAsset,
} from '../../../../../utils/gameAssets/gameAssets';
import WelComePageList from './WelComePageList';
import UploadMusicList from './UploadMusicList';
import { fileStorageLocations } from '../../../../../utils/storage/storageDirectory';

type Input = {
  gasAssetType: string;
  gasAssetName: string;
  gasAssetAudio: File | null;
};
type Required = {
  gasAssetName: { gasAssetName: boolean; fieldName: string };
  gasAssetAudio: { gasAssetAudio: boolean; fieldName: string };
};

const UploadMusic = () => {
  const [input, setInput] = useState<Input>({
    gasAssetType: '11',
    gasAssetName: '',
    gasAssetAudio: null,
  });
  const [isRequired, setIsRequired] = useState<Required>({
    gasAssetName: { gasAssetName: true, fieldName: 'Music Title' },
    gasAssetAudio: { gasAssetAudio: true, fieldName: 'Upload Audio' },
  });
  const [toast, setToast] = useState<{
    enable: boolean;
    message: string;
    status: string;
  }>({ enable: false, message: '', status: '' });
  const [btnLoading, setBtnLoading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState<number>();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const [rowId, setRowId] = useState(null); //rowId is used to edit/update if rowId has id value then it this form become Update form or otherwies Create form
  const [reRender, setReRender] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormEditMode, setIsFormEditMode] = useState<boolean>(false);

  const inputHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    setBtnLoading(true);
    try {
      const validationResult = RequiredFieldValidator(input, isRequired);
      console.log('validationResult', validationResult);
      //{ valid: false, msg: err };
      setToast({
        enable: true,
        message: validationResult.msg,
        status: validationResult.valid ? 'success' : 'error',
      });

      if (validationResult.valid) {
        const formData = new FormData();
        Object.entries(input).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        });
        console.log('rowId', rowId);
        if (!rowId) {
          const response = await addGameAsset(
            formData,
            (event: ProgressEvent<EventTarget>) => {
              // Calculate file upload progress here
              if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 100;
                setUploadingProgress(progress);
                console.log(`File Upload Progress: ${Math.round(progress)}%`);
                // You can update the UI with the progress value as needed
              }
            },
            'audios'
          );
          if (response.status === "Success") {
            setToast({
              enable: true,
              message: 'Music Upload added successfully..!',
              status: 'success',
            });
          } else {
            setToast({
              enable: true,
              message: response.message,
              status: 'error',
            });
          }
          
          if(response.status === 'Success'){
            setReRender(!reRender);
            setInput({
              gasAssetType: '11',
              gasAssetName: '',
              gasAssetAudio: null,
            });
          }
        } else {
          const response = await updateGameAsset(formData, rowId,'audios');
          if (response.status === "Success") {
            setToast({
              enable: true,
              message: 'Music Upload Updated successfully..!',
              status: 'success',
            });
            setIsEditing(false);
          } else {
            setToast({
              enable: true,
              message: response.message,
              status: 'error',
            });
          }
          if(response.status === 'Success'){
            setReRender(!reRender);
            setInput({
              gasAssetType: '11',
              gasAssetName: '',
              gasAssetAudio: null,
            });
            setRowId(null);
          }
        }
      }
    } catch (err) {
      setBtnLoading(false);
      setTimeout(() => {
        setToast({ enable: false, message: '', status: '' });
      }, 1000);
    }
    setBtnLoading(false);
    setTimeout(() => {
      setToast({ enable: false, message: '', status: '' });
    }, 1000);
  };

  const handleAudioChange = (file: File | null) => {
    setInput((prev) => ({ ...prev, gasAssetAudio: file }));
  };

  const handleRemoveAudio = () => {
    setInput((prev) => ({ ...prev, gasAssetAudio: null }));
  };

  const handleEditRow = async (rowData: any) => {
    let data = { path: rowData.gasAssetAudio, gasId: rowData.gasId };
    try {
      const response = await fetchImageBlob(JSON.stringify(data));
      const blob = await response.blob();
      const contentType = response.headers.get('Content-Type');
      const fileName = rowData.gasAssetAudio
        .split('_')
        .shift()
        .split('/')
        .pop();
      const ext = rowData.gasAssetAudio.split('.').pop();
      console.log('response',response);
      if (response.status === 200) {
        const file = new File([blob], fileName + '.' + ext, {
          type: contentType,
        });
        setRowId(rowData.gasId);
        setInput((prev) => {
          return {
            ...prev,
            gasAssetType: '11',
            gasAssetName: rowData?.gasAssetName || '',
            gasAssetAudio: file || null,
          };
        });
        setIsEditing(true);
      } else {
        setToast({
          enable: true,
          message: 'Unable to fetch Data, try again',
          status: 'error',
        });
      }
    } catch (err) {
      setToast({ enable: true, message: 'Somthing not ok', status: 'error' });
    }
  };
  const handleDeleteRow = async (rowData: any) => {
    
    try {
      const response = await deleteGameAsset(rowData.gasId,'audios');
      console.log('response',response);
      if (response.status === "Success") {
        setToast({
          enable: true,
          message: 'Game Asset Audios  removed',
          status: 'success',
        });
        setReRender((prev) => !prev);
      } else {
        setToast({
          enable: true,
          message: 'Unable to fetch Data, try again',
          status: 'error',
        });
      }
    } catch (err) {
      setToast({ enable: true, message: 'Somthing not ok', status: 'error' });
    }
  };
  useEffect(()=>{
    console.log('input', input);
  },[input]);
  // console.log('reRender', reRender);
  return (
    <>
      <Box>
        <Grid templateColumns="2fr 2fr 4fr" gap={5}>
          <GridItem w="100%">
            <InputField
              mb="0px"
              me="30px"
              w="100%"
              id="gasAssetName"
              label="Music Title"
              isRequired={true}
              placeholder="Music Title"
              name="gasAssetName"
              onChange={(e: any) => {
                inputHandler(e);
              }}
              value={input.gasAssetName}
            />
          </GridItem>

          
          {/* <GridItem w="100%">
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="bold"
              color={textColorPrimary}
              mb="8px"
            >
              WelcomePage Image Upload<Text color="red">*</Text>
            </FormLabel>
            <DropZone setStateFunc={handleFileChange} />
          </GridItem>
          {input.gasAssetImage && (
            <GridItem w="100%">
              <>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="bold"
                  color={textColorPrimary}
                  mb="8px"
                >
                  Uploaded Image
                </FormLabel>

                <Box position="relative">
                  <CloseButton
                    size="md"
                    color="red"
                    position="absolute"
                    top={1}
                    right={1}
                    zIndex={1}
                    onClick={handleRemoveImage}
                    fontWeight={800}
                  />
                  <Image
                    src={URL.createObjectURL(input.gasAssetImage)}
                    alt="Uploaded Image"
                    maxH="140px"
                    borderRadius="5%"
                  />
                </Box>
              </>
            </GridItem>
          )} */}
          <GridItem w="100%">
  <FormLabel
    display="flex"
    ms="4px"
    fontSize="sm"
    fontWeight="bold"
    color={textColorPrimary}
    mb="8px"
  >
    Audio Upload<Text color="red">*</Text>
  </FormLabel>
  <AudioDropZone setStateFunc={handleAudioChange} accept="audio/*" />
</GridItem>
{input.gasAssetAudio && (
  <GridItem w="100%">
    <>
      <FormLabel
        display="flex"
        ms="4px"
        fontSize="sm"
        fontWeight="bold"
        color={textColorPrimary}
        mb="8px"
      >
        Uploaded Audio
      </FormLabel>

      <Box position="relative">
        <CloseButton
          size="md"
          color="red"
          position="absolute"
          top={1}
          right={1}
          zIndex={1}
          onClick={handleRemoveAudio}
          fontWeight={800}
        />
        <audio controls>
          <source src={URL.createObjectURL(input.gasAssetAudio)} type="audio/mpeg" />
        </audio>
      </Box>
    </>
  </GridItem>
)}
          <GridItem w="100%">
            <Button
              mt={'30px'}
              // bg={'green'}
              // color={'#fff'}
              onClick={handleSubmit}
              isDisabled={btnLoading}
              padding={2}
              boxShadow={'3px 4px 12px #2e292940'}
              _hover={{ bg: '#3311db', boxShadow: '3px 4px 12px #2e292975' }}
              background="#3311db"
              color="#fff"
              w={100}
              // type="submit"
            >
              {btnLoading ? (
                <>
                  <Spinner size="md" />{' '}
                  <Text ml={4} mt={0}>
                    {rowId ? 'Updating..' : 'Adding..'}
                  </Text>
                </>
              ) : rowId ? (
                'Update'
              ) : (
                'Add'
              )}
            </Button>
          </GridItem>
        </Grid>
        {toast.enable && <OnToast status={toast.status} msg={toast.message} />}
        <Divider my="5" /> {/* Adjust margin as needed */}
        <UploadMusicList
          handleEditRow={handleEditRow}
          handleDeleteRow={handleDeleteRow}
          reRender={reRender}
          isEditing={isEditing}
          isFormEditMode={isFormEditMode}
        />
      </Box>
    </>
  );
};
export default UploadMusic;
