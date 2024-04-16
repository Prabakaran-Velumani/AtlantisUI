import {
  Box,
  Img,

  // brindha end
} from '@chakra-ui/react';
import React from 'react';

import bull from 'assets/img/screens/bullet.png';
import right from 'assets/img/games/right.png';
import nextBtn from 'assets/img/screens/next.png';
const Takeway: React.FC<{
  formData: any;
  imageSrc: any;
  getData?: any;
  data?: any;
  preloadedAssets: any;
}> = ({ formData, imageSrc, getData, data,preloadedAssets }) => {
  const content = formData.gameTakeawayContent?.split('\n');

  return (
    <>
      {imageSrc && (
        <Box className="takeaway-screen"> 
          <Box className="takeaway-screen-box">
            <Img src={imageSrc} className="bg-take" />
            <Box
              className="content-box"             
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
                        key={ind}
                      >
                        <>
                          <Img
                            src={preloadedAssets.bull}
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
            </Box>
            <Box className='next-btn-box'>
                <Img
                  src={preloadedAssets.next}                 
                  onClick={()=>getData(data)}
                />
              </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Takeway;
