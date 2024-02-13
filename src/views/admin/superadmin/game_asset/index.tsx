import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Card from 'components/card/Card';
import GamesAssetFrom from "./components/GameAssetForm"; 
const GamesAsset = () => {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('creation');
    }

  return (
    <>
        <Box mb={{ base: '0px', xl: '100px' }}>            
        </Box>               
        {/* <Card>       
            <Flex justifyContent='end'>            
                <Button mt='10px' mb='15px' padding={2} background='#3311db' color='#fff' w={70} onClick={handleNavigate}>New</Button>
            </Flex>            
        </Card>   */}
        <Box>
            <GamesAssetFrom />
        </Box>
    </>
  )
}

export default GamesAsset