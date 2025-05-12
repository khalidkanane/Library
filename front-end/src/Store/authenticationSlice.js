import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
      user: JSON.parse(localStorage.getItem('user')) || null,
      token: localStorage.getItem('token') || '',
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    },
    reducers: {
      login: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
  
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', state.token);
        localStorage.setItem('isAuthenticated', true);
      },

      editUser :(state, action) => {
        state.user = action.payload.user;

  
        localStorage.setItem('user', JSON.stringify(state.user));

      },




    logout: (state) => {
      state.user = null;
      state.token = null ;
      state.isAuthenticated = false;

      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('isAuthenticated' )


    },
  },
});

export const { login, logout ,editUser } = sessionSlice.actions;
export const selectSession = (state) => state.session;
export default sessionSlice.reducer;

