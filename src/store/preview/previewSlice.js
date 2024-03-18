import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    gameId: null,
    currentTab: 3,
    currentSubTab: 0,
    currentQuest: 1,
    isDispatched: false,
    activeBlockSeq: 1,
    CompKeyCount:0,
    reflectionPageUpdated: false,
};

export const previewSlice = createSlice({
name: 'preview',
initialState,
reducers:{
    updatePreviewData : (state, action)=>{

        if(!action.payload){
            return initialState;
        }
        const newState = { ...state, ...action.payload };
            return newState;
    }
},
extraReducers(builder) {
    
},
})


export const { updatePreviewData } = previewSlice.actions;

export default previewSlice.reducer;
