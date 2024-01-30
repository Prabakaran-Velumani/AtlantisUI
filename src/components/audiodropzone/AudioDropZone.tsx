import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Text,
} from '@chakra-ui/react';

interface AudioDropZoneProps {
  setStateFunc: (file: File | null) => void;
  accept: string;
}

const AudioDropZone: React.FC<AudioDropZoneProps> = ({ setStateFunc }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the dropped files here
    console.log(acceptedFiles);
    setStateFunc(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'audio/*', // Accept audio files
  });

  return (
    <Box
      {...getRootProps()}
      textAlign="center"
      p={8}
      border="2px dashed #E2E8F0"
      borderRadius="lg"
      cursor="pointer"
      _hover={{ borderColor: 'blue.500' }}
      bg={isDragActive ? 'gray.100' : 'white'}
      transition="all 0.3s ease-in-out"
      boxShadow={isDragActive ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'}
      _focus={{ outline: 'none' }}
      minH="80px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <input {...getInputProps()} />
      <Text fontSize="lg" color={isDragActive ? 'blue.500' : 'gray.600'} fontWeight="bold">
        {isDragActive ? 'Drop the audio file here' : 'Drag & Drop here (or) Click to browse'}
      </Text>
      <Text fontSize="sm" color="gray.500" mt={2}>
        {isDragActive ? 'Release to upload' : 'Supports only audio files'}
      </Text>
    </Box>
  );
};

export default AudioDropZone;
