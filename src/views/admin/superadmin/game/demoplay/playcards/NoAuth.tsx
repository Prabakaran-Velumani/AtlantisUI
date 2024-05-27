import React from 'react'
import {Button, Text, Box, Flex} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NoAuth: React.FC<{isAuthFailed:boolean}> = ({isAuthFailed}) => {
    const navigate = useNavigate();

    const goHome = ()=>{
        navigate('/auth/sign-in/default');
    }
  return (
    <Box position={'absolute'} display={'flex'} justifyContent={"center"} alignItems={"center"}>
        {isAuthFailed ? 
        <Text onClick={()=>goHome()}> {"You are not Authorized User...! You are not allowed"}</Text>
        :
        <>
            <Text>{"You are not Authorized User...! Please login."}</Text>
            <Button bg="#11047a" 
                _hover={{ bg: '#190793' }} 
                color="#fff" 
                h={'46px'} 
                w={'128px'} 
                display={'block'} 
                mr={'17px'} 
                mt={'6px'} 
                ml={'11px'}
                onClick={()=>goHome()}> {"Go to Login page"}
            </Button>
            </>
        }
    </Box>
  )
}

export default NoAuth;