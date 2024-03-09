import { Box, Img } from '@chakra-ui/react';
import React from 'react';
import bull from 'assets/img/screens/bullet.png';
import next from 'assets/img/screens/next.png';
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const TakewayScreen: React.FC<{
  formData: any;
  imageSrc: any;
  preview: any;
  preloadedAssets?: any;
}> = ({ formData, imageSrc, preview, preloadedAssets }) => {
  const data = formData.gameTakeawayContent?.split('\n');

  return (
    <>
      {imageSrc && (
        <Box className="takeaway-screen">
          <Box className="takeaway-screen-box">
            <Img src={imageSrc} className="bg-img" />
            <Box className="content-box" w={preview ? '25%' : '76%'}>
              {data &&
                data.map((it: any, ind: number) => {
                  const bulletIndex = it.indexOf('\u2022');
                  const contentAfterBullet =
                    bulletIndex !== -1 ? it.slice(bulletIndex + 1).trim() : it;
                  return (
                    <Box className="content">
                      <>
                        <Img
                          src={preloadedAssets?.bull ?? bull}
                          className="dot-img"
                          w={'16px'}
                          h={'16px'}
                        />
                        <Box className="bullet-content-box">
                          {contentAfterBullet}
                        </Box>
                      </>
                    </Box>
                  );
                })}
            </Box>
            <Box className='next-btn'>
              <Img src={preloadedAssets?.next ?? next}  />
            </Box>
          </Box>
          
        </Box>
      )}
    </>
  );
};
export default TakewayScreen;
