import {
  Box,
  Img,

  // brindha end
} from '@chakra-ui/react';
import React from 'react';

import bull from 'assets/img/screens/bullet.png';
import right from 'assets/img/games/right.png';
const Takeway: React.FC<{
  formData: any;
  imageSrc: any;
  getData?: any;
  data?: any;
}> = ({ formData, imageSrc, getData,
  data }) => {
  const content = formData.gameTakeawayContent?.split('\n');

  return (
    <>
      {imageSrc && (
        <Box className="takeaway-screen">
          <Box className="takeaway-screen-box">
            <Img src={imageSrc} className="bg-take" />
            <Box
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
                  content.map((it: any, ind: number) => {
                    const bulletIndex = it.indexOf('\u2022');
                    const contentAfterBullet =
                      bulletIndex !== -1
                        ? it.slice(bulletIndex + 1).trim()
                        : it;
                    return (
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
                          {contentAfterBullet}
                        </>
                      </Box>
                    );
                  })}
              </Box>
              <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
                <Img
                  src={right}
                  w={'50px'}
                  h={'50px'}
                  cursor={'pointer'}
                    onClick={()=>getData(data)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Takeway;
