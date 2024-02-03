import {
    Box,
    Img,

    // brindha end
} from '@chakra-ui/react';
import React from 'react';

import bull from 'assets/img/screens/bullet.png';

const Takeway: React.FC<{
    formData: any;
    imageSrc: any;
}> = ({ formData, imageSrc }) => {
    const data = formData.gameTakeawayContent?.split('\n');

    return (
        <>
            {imageSrc && (
                <Box className="takeaway-screen">
                    <Box className="takeaway-screen-box">
                        <Img src={imageSrc} className="bg-img" />
                        <Box className="content-box" width={'315px !important'} overflowY={'scroll'} position={'absolute'}>
                            {data &&
                                data.map((it: any, ind: number) => {
                                    const bulletIndex = it.indexOf('\u2022');
                                    const contentAfterBullet =
                                        bulletIndex !== -1 ? it.slice(bulletIndex + 1).trim() : it;
                                    return (
                                        <Box className="content" fontFamily={'AtlantisText'} color={'#D9C7A2'}>
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
                    </Box>
                </Box>
            )}
        </>
    );
};
export default Takeway;
