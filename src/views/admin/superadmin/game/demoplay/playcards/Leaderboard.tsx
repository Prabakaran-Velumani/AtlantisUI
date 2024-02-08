import { Img, Text, SimpleGrid, Box } from '@chakra-ui/react';
import React from 'react';

/* for reflection question inside the image */
import ref from 'assets/img/screens/refquestions.png';
import qs from 'assets/img/screens/QS.png';

const LeaderBoard: React.FC<{
  formData: any;
  imageSrc: any;
}> = ({ imageSrc, formData }) => {
    const content =[1,2,3,4,5,6]
  return (
    <>
      {imageSrc && (
        <Box className="takeaway-screen">
          <Box className="takeaway-screen-box">
            <Img src={imageSrc} className="bg-take" />
            {/* <Box
              className="content-box"
              width={'633px !important'}
              overflowY={'scroll'}
              position={'absolute'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
            >
              <Box>
                {content &&
                  content.map((it: any, ind: number) => (
                    
                      <Box
                        className="content"
                        fontFamily={'AtlantisText'}
                        color={'#D9C7A2'}
                      >
                        <>
                          <Img
                            src={bull}
                            className="dot-img"
                            w={'16px'}
                            h={'16px'}
                          />
                          {it}
                        </>
                      </Box>
                    ))}
              </Box>
              <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
                <Img
                  src={right}
                  w={'50px'}
                  h={'50px'}
                  cursor={'pointer'}
                  onClick={() => getData(data)}
                />
              </Box>
            </Box> */}
          </Box>
        </Box>
      )}
    </>
  );
};
export default LeaderBoard;
