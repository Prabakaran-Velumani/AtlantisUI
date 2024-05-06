import { Box, Img, Text } from '@chakra-ui/react';
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
        <>
          <Box
            w={'100%'}
            h={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Box w={'auto'} position={'relative'} h={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Img src={imageSrc} h={'auto'} w={'100%'}  transition={'transform 0.3s ease'} transform={{lg:'scale(1)','2xl':'scale(1.3)'}} />
              <Box position={'absolute'}  transition={'transform 0.3s ease'} transform={{lg:'scale(1)','2xl':'scale(1.25)'}} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} w={'100%'} h={'41%'} top={{base:'37.5%','2xl':'41.5%'}} fontFamily={'AtlantisText'}>
                <Box className='takeaway_content'>
                  {data &&
                    data.map((it: any, ind: number) => {
                      const bulletIndex = it.indexOf('\u2022');
                      const contentAfterBullet =
                        bulletIndex !== -1 ? it.slice(bulletIndex + 1).trim() : it;
                      return (
                        <Box display={'flex'} alignItems={'center'} h={'auto'}>
                          <Img
                            src={preloadedAssets?.bull ?? bull}
                            className="dot-img"
                            w={'16px'}
                            h={'16px'}
                          />
                          <Text ml={'5px'} fontSize={'1.2rem'} color={'#D9C7A2'} fontFamily={'AtlantisContent'} overflowWrap={'anywhere'} letterSpacing={'1px'}>
                            {contentAfterBullet}
                          </Text>
                        </Box>
                      );
                    })}
                </Box>
                <Box w={'100%'} display={'flex'} justifyContent={'center'} mt={'15px'}>
                  <Img src={preloadedAssets?.next ?? next} h={'4vh'} w={'auto'} />
                </Box>
              </Box>
            </Box>
          </Box>
          {/* <Box className="takeaway-screen">
          <Box className="takeaway-screen-box">
            <Img src={imageSrc} className="bg-img bg-take" />
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
            <Box className='next-btn next-btn-box'>
              <Img src={preloadedAssets?.next ?? next}  />
            </Box>
          </Box>
          
        </Box> */}
        </>
      )}
    </>
  );
};
export default TakewayScreen;
