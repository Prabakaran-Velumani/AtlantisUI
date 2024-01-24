import React, { useState, ChangeEvent, useEffect } from 'react';

// Chakra imports
import { Flex, SimpleGrid, Text, Box, Button, useColorModeValue, useToast, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';


// Custom Imports
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import SelectField from 'components/fields/SelectField';
import Card from 'components/card/Card';
import Axios from 'axios';
import { API_SERVER } from 'config/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { getCompanyList, getSelectCreator } from 'utils/creator/creator';
import { getCountries } from 'utils/company/companyService';
import { addLearner, getLearnerById, learnerAdd, updateLearner } from 'utils/leaner/leaner';
import OnToast from 'components/alerts/toast';
import { FaLeaf } from 'react-icons/fa';
const CreatorCreation = () => {
    const isInvalid = true;

    const stroage = JSON.parse(localStorage.getItem('user'));
let selectDisable=false;
    let storageCreatorId = '';
    if (stroage.data.role === 'Creator') {
        storageCreatorId = stroage.data.id;
        selectDisable=true;
    }
    console.log('storageCreatorId', storageCreatorId);
    const toast = useToast();
    const { id } = useParams();

    const navigate = useNavigate();
    // Chakra Color Mode    
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = 'secondaryGray.600';
    const [companyOptions, setCompanyOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const [creatorOptions, setCreatorOptions] = useState([]);
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [indicate, setIndicate] = useState<boolean>(false);
    const [emptyInfo, setEmptyInfo] = useState([]);
    const [alert, setAlert] = useState(false);
    const [msg, setMsg] = useState<string>('');
    const [toastStatus, setToastStatus] = useState<string>('');
   
    const [specificInvalidIds, setspecificInvalidIds] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({ value: 'Active', label: 'Active' });
    type FormData = {
        [key: string]: {
            lenUserName: string[]; // Ensure lenUserName is an array of strings
            lenMail: string[];
            lenCountryId: string[];
            lenDepartment: string[];
            lenDesignation: string[];
            lenAge: string[];
            lenGender: string[];
            leanerId: number[];
        };
    };
   
    const additionalStyle = setIndicate ? { borderColor: 'red' /* add additional styles when setIndicate is true */ } : {};
    
    const [formData, setFormData] = useState({
        lenCompanyId: '',
        lenCreatorId: storageCreatorId !== null && storageCreatorId !== undefined ? storageCreatorId : '',
        lenStatus: 'Active',
    });

    const [formDatas, setFormDatas] = useState<FormData>({
        '0': {

            lenUserName: [], // Ensure lenUserName is initialized as an array
            lenMail: [],
            lenCountryId: [],
            lenDepartment: [],
            lenDesignation: [],
            lenAge: [],
            lenGender: [],
            leanerId: [],
        },
        // ... other rows ...
    });
   
    const [noOfRows, setNoOfRows] = useState<any>(1);
    const [rows, setRows] = useState([{}]);


    interface OptionType {
        value: string;
        label: string;
    }
    interface OptionTypecon {
        value: string;
        label: string;
        CompanyId: string;
    }
    const selectDatas = async (companyid:any) => {
       
    
    let data = {
        companyId: companyid,
    };
        const selectCreator = await getSelectCreator(JSON.stringify(data));
        if (selectCreator?.status !== 'Success') return console.log('getSelectCreator Error :', selectCreator?.message);
        setCreatorOptions(selectCreator?.data);
         
    }
    useEffect(() => {
        if (stroage.data.role !== 'Creator') {
            selectDatas(formData.lenCompanyId);
        }
       

    }, [formData.lenCompanyId]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const result = await getLearnerById(id);
                    if (result?.status !== 'Success') return console.log('getLearnerById Error :', result?.message);
                    setFormData(result?.data);
                }

                const result = await getCountries();
                if (result?.status !== 'Success') return console.log('getCountries Error :', result?.message);
                setCountryOptions(result?.data);
                const company = await getCompanyList();
                if (company?.status !== 'Success') return console.log('getCountries Error :', company?.message);

                setCompanyOptions(company?.data);

                const selectCreator = await getSelectCreator();
                if (selectCreator?.status !== 'Success') return console.log('getSelectCreator Error :', selectCreator?.message);



                setCreatorOptions(selectCreator?.data);

                const selectCreatorData: OptionTypecon[] = selectCreator?.data || [];
                const foundItem = selectCreatorData.find(item => item.value === storageCreatorId);

                setFormData({ ...formData, lenCreatorId: storageCreatorId });
                setFormData({ ...formData, lenCompanyId: foundItem.CompanyId });
                //     const countriesResponse = await Axios.get(`${API_SERVER}/country/getAllCountries`);

                // if (countriesResponse.status === 200) {
                //     const countriesData = countriesResponse.data.data;
                //     console.log("Countries Response Data:", countriesData);
                //     setCountryOptions(countriesResponse.data.data);
                // } else {
                //     console.error('An error occurred while fetching the country data:', countriesResponse.data.data);
                // }

            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    // Sample options data

    const mappedCompanyOptions = Array.isArray(companyOptions)
        ? companyOptions.map((company) => ({
            value: company.cpId,
            label: company.cpCompanyName
        }))
        : [];

    const mappedCountryOptions = Array.isArray(countryOptions)
        ? countryOptions.map((country) => ({
            value: country.value,  // Change 'Id' to 'value'
            label: country.label,
        }))
        : [];




    const handleBack = () => {
        // Navigate back to the previous page
        navigate('/admin/superadmin/learner/');
    };


    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Others', label: 'Others' },
    ];
    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];


    const date = new Date();
    const getYear = date.getFullYear();
    const getMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const getDate = date.getDate().toString().padStart(2, '0');
    const getHours = date.getHours().toString().padStart(2, '0');
    const getMinutes = date.getMinutes().toString().padStart(2, '0');

    const isoFormatDate = `${getYear}-${getMonth}-${getDate}`;


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, selectedOption?: any) => {
        const { name, value } = e.target;

        // If a selectedOption is provided, set the value of that field in the formData state
        if (selectedOption) {
            setFormData({ ...formData, [name]: selectedOption.value });
        } else {
            // Set the value of the field to the current value of the target
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleChangeflied = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [fieldName, rowIndex] = name.split('-');

        setFormDatas((prevData) => ({
            ...prevData,
            [rowIndex]: {
                ...prevData[rowIndex],
                [fieldName]: value,
            },
        }));
    };
    const handleCompanyChange = (selectedOption: OptionType | null) => {
      
       
        setFormData({
            ...formData,
            
            lenCompanyId: selectedOption.value,
            lenCreatorId: '',
          });
        
    };
   const handleCreatorChange = (selectedOption: OptionTypecon | null) => {
  if (selectedOption) {
    setFormData({
      ...formData,
      lenCreatorId: selectedOption.value,
      lenCompanyId: selectedOption.CompanyId
    });
  } else {
    // Handle the case where selectedOption is null if needed
  }
};



    const handleCountryChange = (selectedOption: any, rowIndex: string) => {
        // Handle country change for the specific row
        setFormDatas((prevData) => ({
            ...prevData,
            [rowIndex]: {
                ...prevData[rowIndex],
                lenCountryId: selectedOption.value,
            },
        }));
    };
    const handleGenderChange = (selectedOption: any, rowIndex: string) => {
        // Handle country change for the specific row
        setFormDatas((prevData) => ({
            ...prevData,
            [rowIndex]: {
                ...prevData[rowIndex],
                lenGender: selectedOption.value,
            },
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!formData.lenCompanyId) {

            setMsg('Please select the company name');
            setToastStatus('error');
            setAlert(true);
            return false;
        }
        if (!formData.lenCreatorId) {

            setMsg('Please select the Creator Name');
            setToastStatus('error');
            setAlert(true);
            return false;
        }



        let formDataStringified = JSON.stringify(formData);
        let formDatasStringified = JSON.stringify(formDatas);

        const formDatasParsed = JSON.parse(formDatasStringified);

        // const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const emptyInfo = Object.entries(formDatasParsed).reduce(
            (acc: { position: string; name: string }[], [key, value]) => {
                const lenUserNameLength = (value as { lenUserName?: any }).lenUserName?.length;
                const lenMailValues = (value as { lenMail?: any }).lenMail || [];
                const lenMailLength = (value as { lenMail?: any }).lenMail?.length;
                const lenDepartmentLength = (value as { lenDepartment?: any }).lenDepartment?.length;
                const lenDesignationLength = (value as { lenDesignation?: any }).lenDesignation?.length;

                if (lenUserNameLength === 0 || lenMailLength === 0 || lenDepartmentLength === 0 || lenDesignationLength === 0) {

                    if (lenUserNameLength === 0) {
                        acc.push({ position: key, name: 'lenUserName' });

                    }
                    if (lenMailLength === 0) {
                        acc.push({ position: key, name: 'lenMail' });
                    }
                    // if (lenMailValues.length !== 0) {
                    //     for (const mailValue of lenMailValues) {
                    //       if (!emailPattern.test(mailValue)) {
                    //         acc.push({ position: key, name: 'lenMail' });
                    //         break; // Break the loop if one email is not valid
                    //       }
                    //     } 
                    //   }

                    if (lenDepartmentLength === 0) {
                        acc.push({ position: key, name: 'lenDepartment' });
                    }
                    if (lenDesignationLength === 0) {
                        acc.push({ position: key, name: 'lenDesignation' });
                    }
                    // Add similar conditions for other properties if needed
                }

                return acc;
            },
            []
        );
       

        if (emptyInfo.length !== 0) {
            const mergerPosition = `${emptyInfo[0].name}-${emptyInfo[0].position}`;

            const inputFieldElement = document.getElementById(mergerPosition);
            if (inputFieldElement) {
               
                setspecificInvalidIds([mergerPosition]);
                inputFieldElement.focus();
                
            }

        } else {
            try {
            setButtonDisabled(true);
            let data = {
                defaultData: formData,
                learnerData: formDatas,
            };
   
            const result = await addLearner(JSON.stringify(data));
            if (result?.status === 'ValidationFailure') {
                setButtonDisabled(false);
                setspecificInvalidIds(result?.mails);
                setMsg(result?.message);
                setToastStatus('error');
                setAlert(true);
                return


            }
            else if (result?.status === 'existingLearnerEmails') {
                setButtonDisabled(false);
                setspecificInvalidIds(result?.mails);
                setMsg(result?.message);
                setToastStatus('error');
                setAlert(true);
                return
            }
            else if (result?.status === 'existingCreatorEmails') {
                setButtonDisabled(false);
                setspecificInvalidIds(result?.mails);
                setMsg(result?.message);
                setToastStatus('error');
                setAlert(true);
                return

            } else if (result?.status === 'Failure') {
                setButtonDisabled(false);
                console.log('updateLearner Error :', result?.message);
                setMsg('Failed to Create Learner');
                setToastStatus('error');
                setAlert(true);
                return
            }
            else if (result?.status === 'Success') {

                setMsg('Learner Stored');
                setToastStatus('success');
                setAlert(true);
                setTimeout(() => {
                    navigate('/admin/superadmin/learner');
                }, 200);
            }
        } catch (error) {
            setButtonDisabled(false);
              console.error('An error occurred while sending the request:', error);
          }



        }

        //   console.log(formDatasStringified);





        // try {
        //     if (id) {
        //         const result = await updateLearner(id, data);
        //         if (result?.status !== 'Success') {
        //             console.log('updateLearner Error :', result?.message);
        //             setMsg('Failed to Update Learner');
        //             setToastStatus('error');
        //             setAlert(true);
        //             return;
        //         }
        //         setMsg('Learner Updated');
        //         setToastStatus('success');
        //         setAlert(true);
        //         setTimeout(() => {
        //             navigate('/admin/superadmin/learner');
        //         }, 2000);


        //     } else {
        //         // This is a new plan, create it using POST request
        //         const result = await addLearner(data);
        //         if (result?.status === 'MailFailure') {
        //             setMsg(result?.message);
        //             setToastStatus('error');
        //             setAlert(true);
        //             return

        //         }
        //         if (result?.status !== 'Success') {
        //             console.log('updateLearner Error :', result?.message);
        //             setMsg('Failed to Create Learner');
        //             setToastStatus('error');
        //             setAlert(true);
        //             return
        //         }

        //         setMsg('Learner Stored');
        //         setToastStatus('success');
        //         setAlert(true);
        //         setTimeout(() => {
        //             navigate('/admin/superadmin/learner');
        //         }, 2000);

        //         const res = await learnerAdd(result?.data?.lenId)

        //         navigate('/admin/superadmin/learner');
        //         // const response = await Axios.post(`${API_SERVER}/creator/addcreator`, formData);

        //         // if (response.status === 201) {
        //         //     console.log('Data was successfully created.', response);
        //         // } else {
        //         //     console.error('Failed to create data.');
        //         // }
        //     }
        // } catch (error) {
        //     console.error('An error occurred while sending the request:', error);
        // }


    };

    console.log(specificInvalidIds, 'specificInvalidIds');
    const handleAddRow = () => {
        setNoOfRows(noOfRows + 1);
        const newRowId = noOfRows; // Use noOfRows directly as the new row ID
        setFormDatas((prevFormDatas) => ({
            ...prevFormDatas,
            [newRowId.toString()]: {
                lenUserName: [],
                lenMail: [],
                lenCountryId: [],
                lenDepartment: [],
                lenDesignation: [],
                lenAge: [],
                lenGender: [],
                leanerId: [],
            },
        }));
    };


    useEffect(() => {
        setRows(Array.from({ length: noOfRows }, (_, index) => ({ id: index + 1 })));
    }, [noOfRows]);


    // console.log('fsfsd', formData);
    return (
        <>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={'100px'} position={'relative'}>
                <Card bg={'linear-gradient(to bottom, #7551ff, #3311db)'} w={'100%'} h={'300'} position={'absolute'} alignItems={'center'}></Card>
                <Card mb={{ base: '0px', xl: '20px' }} width={'80%'} marginTop={'120px'} >
                    <Flex direction='row' w={'100%'}  ms='10px' justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                        <Text color={useColorModeValue('secondaryGray.900', 'white')} fontSize="2xl" fontWeight="700" mb="20px">
                                Learner {id ? 'Updation' : 'Creation'}
                            </Text>
                        </Box>
                        {/* <Box>
                            <Button bg={'#11047a'} color={'#fff'} mr={'10px'} >Click To Upload</Button>
                            <Button bg={'#11047a'} color={'#fff'}>Submit Data</Button>
                        </Box> */}
                        {/* <Text fontSize='md' color={textColorSecondary}>
                            Here you can change your Creator details
                        </Text> */}
                    </Flex>
                    <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={{ base: '20px', xl: '20px' }}>
                        
                        <SelectField
                            mb='0px'
                            me='30px'
                            id='lenCompanyId'
                            name='lenCompanyId'
                            label='Learner Company Name'
                            options={companyOptions}
                            onChange={handleCompanyChange}
                            isRequired={true}
                            value={companyOptions.find(option => option.value === formData.lenCompanyId) || null}
                            isDisabled={selectDisable}
                            isClearable={true}
                        />
                        <SelectField
                            mb='0px'
                            me='30px'
                            id='lenCreatorId'
                            name='lenCreatorId'
                            label='Creator Name'
                            options={creatorOptions}
                            onChange={handleCreatorChange}
                            isRequired={true}
                            value={creatorOptions.find(option => option.value === formData.lenCreatorId) || null}
                            isDisabled={selectDisable}
                            isClearable={true}
                        />
<InputField mb='0px' me='30px' id='creatorEntryDate' label='Learner Entry Date' type='date-local' defaultValue={isoFormatDate} disabled={true} />

                    </SimpleGrid>

                    {/* Table Input */}
                    <Box m={'50px 0 20px 0'} w={'100%'} overflowX={'auto'}>
                        <Flex mb={'20px'}>
                            <Button onClick={handleAddRow} bg={'#ddd'}>Add Row</Button>
                        </Flex>
                        <Table variant={'striped'} boxShadow={'1px 2px 17px #f7f7f7'} mb={'50px'}>
                            <Thead whiteSpace={'nowrap'}>
                                <Tr borderBottom={'2px solid #ddd'}>
                                    <Th color={'#000'}>learner Name<span style={{ color: 'red' }}>*</span></Th>

                                    <Th color={'#000'}>learner Mail<span style={{ color: 'red' }}>*</span></Th>
                                    <Th color={'#000'}>learner Department<span style={{ color: 'red' }}>*</span></Th>
                                    <Th color={'#000'}>learner Designation<span style={{ color: 'red' }}>*</span></Th>
                                    <Th color={'#000'}>learner Country</Th>
                                    <Th color={'#000'}>learner Age</Th>
                                    <Th color={'#000'}>learner Gender</Th>
                                </Tr>
                            </Thead>
                            <Tbody whiteSpace={'nowrap'}>
                                {rows.map((row, i) => (
                                    
                                    <Tr key={i} whiteSpace={'nowrap'}>
                                        <Td>
                                            <InputField
                                                mb='0px'
                                                me='30px'
                                                id={`lenUserName-${i}`}

                                                name={`lenUserName-${i}`}

                                                placeholder='eg. jhon '
                                                onChange={handleChangeflied}
                                                value={formDatas[i]?.lenUserName || ''}
                                                style={{
                                                    borderColor: isInvalid && specificInvalidIds.includes(`lenUserName-${i}`) ? 'red' : ''
                                                }}
                                            />
                                        </Td>

                                        <Td>
                                            <InputField mb='0px' me='30px' id={`lenMail-${i}`} name={`lenMail-${i}`} placeholder='eg. Mail@sample.com' onChange={handleChangeflied} value={formDatas[i]?.lenMail || ''} autoComplete="off" disabled={id ? true : false}
                                                style={{
                                                    borderColor: isInvalid && specificInvalidIds.includes(`lenMail-${i}`) ? 'red' : ''
                                                }}
                                            />
                                        </Td>
                                        <Td>
                                            <InputField mb='0px' me='30px' id={`lenDepartment-${i}`} name={`lenDepartment-${i}`} placeholder='eg. sales ' onChange={handleChangeflied} value={formDatas[i]?.lenDepartment || ''}  style={{
                                                    borderColor: isInvalid && specificInvalidIds.includes(`lenDepartment-${i}`) ? 'red' : ''
                                                }}
                                                />
                                        </Td>
                                        <Td>
                                            <InputField mb='0px' me='30px' id={`lenDesignation-${i}`} name={`lenDesignation-${i}`} placeholder='eg. new joinee' onChange={handleChangeflied} value={formDatas[i]?.lenDesignation || ''}  style={{
                                                    borderColor: isInvalid && specificInvalidIds.includes(`lenDesignation-${i}`) ? 'red' : ''
                                                }} />
                                        </Td>
                                        <Td>
                                            <SelectField
                                                mb='0px'
                                                me='30px'
                                                id={`lenCountryId-${i}`}
                                                name={`lenCountryId-${i}`}

                                                options={mappedCountryOptions}
                                                // onChange={handleCountryChange}
                                                onChange={(selectedOption: any) => handleCountryChange(selectedOption, i.toString())}

                                                value={mappedCountryOptions.find((option) => option.value === formDatas[i]?.lenCountryId) || null}

                                            />
                                        </Td>
                                        <Td>
                                            <InputField mb='0px' me='30px' id={`lenAge-${i}`} name={`lenAge-${i}`} placeholder='eg. 30' type='number' onChange={handleChangeflied} value={formDatas[i]?.lenAge || ''} />
                                        </Td>
                                        <Td>
                                            <SelectField
                                                mb='0px'
                                                me='30px'
                                                id={`lenGender-${i}`}
                                                name={`lenGender-${i}`}

                                                options={genderOptions}

                                                onChange={(selectedOption: any) => handleGenderChange(selectedOption, i.toString())}
                                                autoComplete="off"

                                                value={genderOptions.find((option) => option.value === (formDatas[i]?.lenGender || '')) || null}

                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                    {/* <Flex flexDirection="row" justifyContent={'center'}>

                        <Button mt="20px" mr="10px" padding={2} background="#f7f4fe"  _hover={{background:"#e9edf7"}} color="#000" w={100} onClick={handleBack}>
                            Cancel
                        </Button>
                        <Button mt="20px"  padding={2} background="#3311db"  _hover={{background:"#3311db"}} color="#fff" w={100} onClick={handleSubmit} isDisabled={isButtonDisabled}>
                            {id ? 'Update' : 'Save'}
                        </Button>
                    </Flex> */}
                    <Flex justify="space-between">
            <Button
               variant="light"
               fontSize="sm"
               borderRadius="16px"
               w={{ base: '128px', md: '148px' }}
               h="46px"
               mt="20px"
              onClick={handleBack}
            >
              Cancel
            </Button>
            <Button
              mt="20px"
              variant="darkBrand"
              fontSize="sm"
              borderRadius="16px"
              w={{ base: '128px', md: '148px' }}
              h="46px"
              ms="auto"
              onClick={handleSubmit}
            >
              {id ? 'Update' : 'Save'}
            </Button>
          </Flex>
                </Card>
            </Box>
            {alert ? <OnToast msg={msg} status={toastStatus}  setAlert={setAlert} /> : null}
        </>
    )
}

export default CreatorCreation;