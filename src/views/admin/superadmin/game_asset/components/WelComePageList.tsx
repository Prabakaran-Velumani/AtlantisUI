import React, {useState,useEffect} from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Image } from '@chakra-ui/react';
import DataTable from "../../../../../components/dataTable/DataTable";
import { getGameAssets } from '../../../../../utils/gameAssets/gameAssets';

// GameAssertWelcome component
interface GameAssertWelcomeProps {
    handleEditRow: React.Dispatch<React.SetStateAction<boolean>>;   
    handleDeleteRow: React.Dispatch<React.SetStateAction<boolean>>; 
    reRender: boolean;  
    isEditing: boolean;
    isFormEditMode: boolean;

  }

const WelComePageList : React.FC<GameAssertWelcomeProps> = ({handleEditRow, handleDeleteRow,reRender,isEditing,isFormEditMode}) =>{
const [data, setData] = useState([]);

useEffect( ()=>{
    getWelcome();
},[reRender]);

const getWelcome  = async () =>{
    const list = await getGameAssets('welcome');
    if(list?.status =="success"){
        setData(list?.data);
        console.log('data',list?.data);
    }
    else{
        console.log(list?.message);
    }
}
// actionlist:[{name: "Add", function: 'createFunc'}, {name: "Edit", function: 'handleEdit(index)'}, {name: "Delete", function: 'deleteFunc'},{name: "Download", function: 'downloadFunc'}]
    const columns = [
        // { Header: 'Sno', accessor: 'index', type: 'text' },
        { Header: 'Welcome Image Name', accessor: 'gasAssetName', type: 'text', actionlist:[]},
        // { Header: 'Template Title', accessor: 'tempTitle', type: 'text', actionlist:[] },
        // { Header: 'Template StoryLine', accessor: 'tempStoryLine', type: 'text' , actionlist:[]},
        { Header: 'Image', accessor: 'gasAssetImage', type: 'image', actionlist:{name: "Download", function: 'downloadFunc',isDisabled: isEditing}},
        { Header: 'Actions', accessor: '', type: 'action' , actionlist:[{name: "Edit", function: 'editFunc'}, {name: "Delete", function: 'deleteFunc',isDisabled: isEditing}]},
      ];
      const rowIdKey = "gasId";
return (
<Box>
    <DataTable
      data={data}
      columns={columns}
      rowIdKey = {rowIdKey}
      paginationCount={10}
      createFunc={handleEditRow}
      editFunc={handleEditRow}
      deleteFunc={handleDeleteRow}
      downloadFunc={handleEditRow}
      isFormEditMode={isFormEditMode}
      isEditing={isEditing}
    />
</Box>

)
}


export default WelComePageList;