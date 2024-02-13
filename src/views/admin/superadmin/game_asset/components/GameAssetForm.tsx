import React, { ChangeEvent, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  Text,
  Icon,
  Spinner,
  Select,
  useToast,
  SimpleGrid,
} from '@chakra-ui/react';
import SelectField from 'components/fields/SelectField';
import BackgroundImageForm from "./BackgroundImageForm";
import UploadMusic from "./UploadMusic";
import WelComePageForm from "./WelComePageForm";
import ThankYouPageForm from "./ThankYouPageForm";
import BadgeForm from "./BadgeForm";
import ReflectionPageForm from "./ReflectionPageForm";
import CompletionForm from './CompletionForm';
import LeaderBoardForm from './LeaderBoardForm';
import TakeAwayForm from './TakeAwayForm';


// import BackgroundImageForm from "./BackgroundImageForm";
// import BackgroundImageForm from "./BackgroundImageForm";
// import BackgroundImageForm from "./BackgroundImageForm";
// import BackgroundImageForm from "./BackgroundImageForm";
interface OptionType {
  value: string;
  label: string;
}

const GamesAssetFrom = () => {
  const [selectOption, setSelectOption] = useState<OptionType>({
    value: null,
    label: '',
  });
  const [listOfoption, setListOfOption] = useState([]);

  useEffect(() => {
    setListOfOption([
      { value: '1', label: 'Background Image' },
      { value: '2', label: 'Badge' },
      { value: '3', label: 'Playing Character' },
      { value: '4', label: 'Non Playing Character' },
      { value: '5', label: 'Reflection Screen' },
      { value: '6', label: 'Welcome Screen' },
      { value: '7', label: 'ThankYou Screen' },
      { value: '8', label: 'Completion Screen' },
      { value: '9', label: 'Leader Board Screen' },
      { value: '10', label: 'TakeAway Screen' },
      { value: '11', label: 'Upload Music' }


    ]);
  }, []);

  const handleChange = (selectedOption: OptionType | null) => {
     
    setSelectOption(selectedOption);
    console.log('selectedOption',selectedOption);
  };

  return (
    <Box>
      <SimpleGrid
        columns={{ sm: 1, md: 4 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <SelectField
          id="assetType"
          isRequired={true}
          label="Asset Type"
          placeholder="Select Type"
          name="assetType"
          value={
            listOfoption.find(
              (option) =>
                option?.value?.toString() === selectOption?.value?.toString(),
            ) || null
          }
          onChange={(e: any) => handleChange(e)}
          options={listOfoption}
        ></SelectField>
      </SimpleGrid>
      <Flex>
        {selectOption.value === "1" && <BackgroundImageForm /> }
        {selectOption.value === "6" && <WelComePageForm />}
        {selectOption.value === "7" && <ThankYouPageForm />}
        {selectOption.value === "2" && <BadgeForm />}
        {selectOption.value === "5" && <ReflectionPageForm />}
        {selectOption.value === "8" && <CompletionForm />}
        {selectOption.value === "9" && <LeaderBoardForm />}
        {selectOption.value === "10" && <TakeAwayForm />}
        {selectOption.value === "11" && <UploadMusic />}



      </Flex>
    </Box>
  );
};

export default GamesAssetFrom;
