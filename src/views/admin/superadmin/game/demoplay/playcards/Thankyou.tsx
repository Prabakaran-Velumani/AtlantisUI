import {
  Box,
  Icon,
  Img,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ImHappy } from 'react-icons/im';
import { TfiFaceSad } from 'react-icons/tfi';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { FaRegFaceMehBlank } from 'react-icons/fa6';
import { BsEmojiNeutral } from 'react-icons/bs';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { FaRegTired } from 'react-icons/fa';
import {
  FaHatCowboy,
  FaRegCommentDots,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from 'react-icons/fa';


interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const ThankYou: React.FC<{
  formData: any;
  imageSrc: any;
  preview: any;
}> = ({ formData, imageSrc, preview }) => {
  const renderContentTy = () => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;

    const parts = formData.gameThankYouMessage?.split(linkRegex);

    const contentWithLinks = parts?.map((part: any, index: any) => {
      if (linkRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            style={{ color: '#caa784', textDecoration: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      } else {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
    });

    return <React.Fragment>{contentWithLinks}</React.Fragment>;
  };
  return (
    <>
      {imageSrc && (
        <>
          <Box position={'relative'}>
            <Img src={imageSrc} width={'100%'} h={'90vh'} />
            <Box
              position={'absolute'}
              width={'100%'}
              h={'70vh'}
              left={'0px'}
              bottom={'0'}
              fontFamily={'gametext'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'flex-start'}
            >
              <Box
                w={'60%'}
                h={'60vh'}
                overflowY={'scroll'}
                className="content"
                textAlign={'center'}
              >
                <Box
                  w={'100%'}
                  fontFamily={'content'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  className="tq-msg"
                >
                  <Box
                    h={'100px'}
                    w={'80%'}
                    mt={{ base: '0px', sm: '0px', md: '20px', lg: '20px' }}
                    lineHeight={1}
                    textAlign={'center'}
                    color="#D9C7A2"
                    fontWeight="300"
                  >
                    {renderContentTy()}
                  </Box>
                </Box>
                {(formData.gameIsCollectLearnerFeedback === 'true' ||
                  preview) && (
                  <>
                    <Text
                      className="about-experience"
                      fontSize={18}
                      fontWeight="300"
                      textAlign="center"
                    >
                      How do you feel about the experience?
                    </Text>
                    <Box
                      className="collect-learner-feedback"
                      h={'300px'}
                      overflowY={'scroll'}
                    >
                      <Box display={'flex'} ml={'5px'}>
                        <div className="content-box">
                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Content
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              marginTop: '5px',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel">
                              <p>
                                <Icon as={ImHappy} /> I learned something useful
                              </p>
                            </div>
                            <div className="buttonfeel2">
                              <p>
                                <Icon as={TfiFaceSad} /> It wasn't useful
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="content-box">
                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Relevance
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel">
                              <p>
                                <Icon as={FaHatCowboy} /> I'll apply what I
                                learned
                              </p>
                            </div>
                            <div className="buttonfeel2">
                              <p>
                                <Icon as={BsEmojiNeutral} /> It's not relevant
                                to me
                              </p>
                            </div>
                          </div>
                        </div>
                      </Box>
                      <Box display={'flex'} mt={'5px'} ml={'5px'}>
                        <div className="content-box">
                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Behaviour
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel">
                              <p>
                                <Icon as={BsEmojiSunglasses} /> I understood
                                what I can do differentl
                              </p>
                            </div>
                            <div className="buttonfeel2">
                              <p>
                                {' '}
                                <Icon as={FaRegFaceMehBlank} /> I am not sure
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="content-box">
                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Recommendation
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel">
                              <p>
                                {' '}
                                <Icon as={RiEmotionHappyLine} /> I would
                                recommend this game to others
                              </p>
                            </div>
                            <div className="buttonfeel2">
                              <p>
                                {' '}
                                <Icon as={FaRegTired} /> I wouldn't recommend
                              </p>
                            </div>
                          </div>
                        </div>
                      </Box>
                      <Box display={'flex'} mt={'5px'} ml={'5px'}>
                        <div className="content-box">
                          <Text
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Gamification
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="buttonfeel">
                              <p>
                                <Icon as={FaRegThumbsUp} /> I would like to
                                learn via games
                              </p>
                            </div>
                            <div className="buttonfeel2">
                              <p>
                                {' '}
                                <Icon as={FaRegThumbsDown} /> I don't like this
                                format
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="content-box">
                          <Text
                            fontSize={16}
                            fontWeight="300"
                            letterSpacing="0px"
                            textAlign="center"
                            border="2px solid #b3a484"
                          >
                            Anything else you'd like to share
                          </Text>
                          <div
                            className="content-div"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              border: '2px solid #b3a484',
                            }}
                          >
                            <div className="buttonfeel3">
                              <p>
                                <Icon as={FaRegCommentDots} />
                              </p>
                            </div>
                          </div>
                        </div>
                      </Box>
                      <Box display={'flex'} mt={'5px'} ml={'5px'}>
                        <div className="last-item">
                          <Text
                            className=""
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                          >
                            {' '}
                            Could you please share your feedback with us on the
                            below link:
                          </Text>
                          <Text
                            className=""
                            fontSize={18}
                            fontWeight="300"
                            textAlign="center"
                          >
                            <a
                              href={formData.gameFeedBackLink}
                              style={{
                                color: '#caa784',
                                textDecoration: 'underline',
                              }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {formData.gameFeedBackLink}
                            </a>
                          </Text>
                        </div>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default ThankYou;
