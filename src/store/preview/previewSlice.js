import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameId: null,
  currentTab: 3,
  currentSubTab: 0,
  currentQuest: 1,
  isDispatched: false,
  activeBlockSeq: 1,
  CompKeyCount: 0
};
const reduxInitialState = null;
export const previewSlice = createSlice({
  name: 'preview',
  initialState: reduxInitialState,
  reducers: {
    updatePreviewData: (state, action) => {
      const payload = action?.payload;
      console.log("action payload", payload);
      console.log("!payload || !payload.gameId", !payload || !payload.gameId);
      if (!payload || !payload.gameId) {
        return initialState;
      } 
      else{
        console.log("^^^^^^^^^ state", {...state})
        const existingState = {...state};
        // const gameId = existingState?.hasOwnProperty([payload.gameId]);
        const gameId = payload?.gameId;
        console.log("gameId", gameId);
        if(gameId)
        {
          const newState = {...state, [gameId]: {...state[payload.gameId] || {}, ...payload}};
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
            console.log("newInitialState", newInitialState);
            if(state === null )
              {  
                newState = { [action.payload]:newInitialState};
              }
              else{
                 newState = { ...state, [action.payload]:newInitialState};
              }
            return newState;
           }          
      },
      removeGame: (state, action) =>{
        const gameId = action.payload;
        // console.log("gameId", gameId)
        // console.log("Object.keys(state).some(id => id===gameId", Object.keys(state).some(id => id===gameId));
        
        if(gameId && Object.keys(state).some(id => id===gameId))
          {
            const newState = Object.keys(state).filter(id => id!==gameId);
            console.log("newState",newState)
            return newState;
          }
      },
      resetGameDispatchState: (state,action) =>{
        if(action?.payload)
          {
            console.log("resetGameDispatchState", {...state[action.payload]});
            const newState = {...state, [action.payload]:{...(state[action.payload]), isDispatched: false}};
            console.log("resetGameDispatchState", newState);
            return newState;
          }
      }
  },
  extraReducers(builder) {},
});

export const { updatePreviewData,createPreviewData, removeGame, resetGameDispatchState } = previewSlice.actions;

export default previewSlice.reducer;
