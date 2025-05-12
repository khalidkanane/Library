// store.js

import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './authenticationSlice';
import userSlice from './apiGoogle'

export const   store = configureStore({
  reducer: {
    session : sessionReducer ,
    user:userSlice
  },
});


