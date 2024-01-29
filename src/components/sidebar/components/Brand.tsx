// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand(props: { mini: boolean; hovered: boolean }) {
  const { mini, hovered } = props;
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex alignItems="center" flexDirection="column" p={'0px'} mb={'20px'}>
      {/* <HorizonLogo
        h="26px"
        w="175px"
        my="32px"
        color={logoColor}
        display={
          mini === false
            ? 'block'
            : mini === true && hovered === true
            ? 'block'
            : 'none'
        }
      /> */}
      {/* <Text fontSize={20} fontWeight={600} mb='20px' letterSpacing={'2px'} >ATLANTIS</Text> */}
      <Text fontSize={25} fontWeight={800}  letterSpacing={'2px'} color={'#fff'} mr={'7px'} >ATLANTIS</Text>
      <Text
        display={
          mini === false
            ? 'none'
            : mini === true && hovered === true
            ? 'none'
            : 'block'
        }
        fontSize={'30px'}
        fontWeight="800"
        color={logoColor}
      >
        A
      </Text>
      { <HSeparator mt="20px" /> }
    </Flex>
  );
}

export default SidebarBrand;
