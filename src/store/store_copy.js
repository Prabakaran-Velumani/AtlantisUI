import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import rootReducer from './reducers'; // Your combined reducers

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createStateSyncMiddleware()),
});

initMessageListener(store);

export default store;
