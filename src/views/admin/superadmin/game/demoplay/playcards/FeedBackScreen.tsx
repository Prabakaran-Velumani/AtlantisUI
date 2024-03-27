import { Box, Img } from '@chakra-ui/react';
import React from 'react'
import next from 'assets/img/screens/next.png';
import feedi from 'assets/img/screens/feed.png';
import InteractionScreenShot from './InteractionScreenShot';

interface FeedBackScreenShotProps {

    backgroundScreenUrl: any;
    first: any;
    showNote: any;
    currentScreenId: any;
    isScreenshot: any;
    geTfeedBackoption: any;
    FeedbackremainingSentences: any;
    options: any;
    getData: any;
    data: any;
    FeedBackselectedoptionData: any;
    FeedBackoptionData: any;
    feed?: any;
    getFeedbackData: any;
}
const FeedBackScreen: React.FC<FeedBackScreenShotProps> = ({ backgroundScreenUrl,
    first,
    showNote,
    isScreenshot,
    data,
    geTfeedBackoption,
    getData,
    FeedbackremainingSentences,
    options,
    currentScreenId,
    FeedBackselectedoptionData,
    FeedBackoptionData,
    feed,
    getFeedbackData }) => {
    return (
        <>
            {/* <motion.div
              initial={{ opacity: 0, background: '#000' }}
              animate={{ opacity: 1, background: '#0000' }}
              transition={{ duration: 0.3, delay: 0.5 }}
            > */}
            <Box
                w={'100%'}
                h={'100vh'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
                overflow={'visible'}
                style={{ perspective: '1000px' }}
            >
                <Box
                    backgroundImage={backgroundScreenUrl}
                    w={'100%'}
                    h={'100vh'}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'cover'}
                    transform={`scale(${first ? 1 : 1.3}) translateY(${first ? 0 : -10
                        }%) translateX(${first ? 0 : -10}%)`}
                    transition={'transform 0.9s ease-in-out'}
                >
                    <Box
                        position={'fixed'}
                        top={'200px'}
                        right={'0px'}
                        bottom={0}
                        zIndex={999}
                        w={'300px'}
                    ></Box>
                </Box>
                <Box
                    style={{
                        transform: `scale(${showNote ? 0.2 : 1})`,
                        transition: 'transform 0.5s ease-in-out',

                    }}
                    ml={isScreenshot === true ? '-500px' : ''}
                    position={'fixed'}
                    w={'40%'}
                    h={'80vh'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Img w={'80%'} h={'80vh'} src={feedi} />
                    <Box
                        position={'fixed'}
                        w={'50%'}
                        mt={'10px'}
                        display={'flex'}
                        flexDirection={'column'}
                        textAlign={'center'}
                        justifyContent={'center'}
                        style={{
                            fontWeight: '900',
                            color: '#D9C7A2',
                            fontSize: '18px',
                            lineHeight: 1,
                            fontFamily: 'cont',
                        }}
                    >
                        {/* {feed} */}
                        {/* {FeedbackremainingSentences} */}
                        {currentScreenId === 9 ? <>
                            <Box>
                                <React.Fragment>{feed}</React.Fragment>
                            </Box>

                            <Box
                                w={'100%'}
                                onClick={() => getData(data)}
                                mt={'20px'}
                                display={'flex'}
                                justifyContent={'center'}
                                cursor={'pointer'}
                            >
                                <Img src={next} w={'200px'} h={'60px'} />
                            </Box>
                        </>
                            :
                            <><Box onClick={geTfeedBackoption}>
                                <React.Fragment>{FeedbackremainingSentences}</React.Fragment>
                            </Box>
                                {isScreenshot === true ? <InteractionScreenShot data={FeedBackoptionData} option={FeedBackselectedoptionData} options={options} /> : ''}
                                <Box
                                    w={'100%'}
                                    onClick={() => getFeedbackData(data)}
                                    mt={'20px'}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    cursor={'pointer'}
                                >
                                    <Img src={next} w={'200px'} h={'60px'} />
                                </Box></>

                        }



                    </Box>
                </Box>
            </Box>
            {/* </motion.div> */}
        </>
    );
}

export default FeedBackScreen;