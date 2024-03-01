import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    // gameid: null,
    // formData: {},
    // gameInfo: [],
    // error: '',
    // currentTab: '',
    // currentSubTab: '',
    // show: [],
    // selectedBadge: '',
    // compliData: [],
    // CompKeyCount: '',
    // reflectionQuestions:'',
    // reflectionQuestionsdefault:'',
    // currentQuest: null,

    gameId: null,
    currentTab: 1,
    currentSubTab: 0,
    currentQuest: 1,
    isDispatched: false
};

export const previewSlice = createSlice({
name: 'preview',
initialState,
reducers:{
    updatePreviewData : (state, action)=>{
        console.log("********payload",action.payload);
        console.log("********state",{...state});
        if(!action.payload){
            return initialState;
        }
        const newState = { ...state, ...action.payload };
            console.log('******new state:', newState);
            // return newState;
            return newState;
    }
},
extraReducers(builder) {
    
},
})


export const { updatePreviewData } = previewSlice.actions;

export default previewSlice.reducer;
