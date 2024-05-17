import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameId: null,
  currentTab: 3,
  currentSubTab: 0,
  currentQuest: 1,
  isDispatched: false,
  activeBlockSeq: 1,
  CompKeyCount: 0,
  reflectionPageUpdated: false

};
const reduxInitialState = null;
export const previewSlice = createSlice({
  name: 'preview',
  initialState: reduxInitialState,
  reducers: {
    updatePreviewData: (state, action) => {
      if (!action.payload) {
        return initialState;
      }
        if(action.payload.hasOwnProperty('currentQuest'))
            {
                const newState = { ...state,[action.payload.gameId]:{...state[action.payload.gameId],activeBlockSeq : 1,...action.payload} };
                return newState;
            }
            else{
              if(action.payload.activeBlockSeq!== undefined)
                {
                  const newState = { ...state,[action.payload.gameId]:{...state[action.payload.gameId],...action.payload}  };
                  return newState;
                }
            }
    },
    createPreviewData:(state,action) =>
      {
        if((state!==undefined  &&  state !==null)){
          if(Object.keys(state).find(keyvalue => action.payload == keyvalue) )
          {
            return state;
          }
        }
          else{
            let newState ={} ;
            const newInitialState ={...initialState,gameId:action.payload};
            if(state === null )
              {  newState = { [action.payload]:newInitialState};

              }
              else{
                 newState = { ...state, [action.payload]:newInitialState};
              }
            return newState;
           }
          
          
      }
  },
  extraReducers(builder) {},
});

export const { updatePreviewData,createPreviewData } = previewSlice.actions;

export default previewSlice.reducer;
