import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    singInStart: state => {
      state.loading = true;
    },
    singInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: state => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: state => {
      state.loading = true;
    },
    deleteUSerSuccess: state => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = flase;
      state.error = action.payload;
    },
    signOutUserStart: state => {
      state.loading = true;
    },
    signOutUSerSuccess: state => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.loading = flase;
      state.error = action.payload;
    },
  },
});

export const {
  singInStart,
  singInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUSerSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUSerSuccess,
  signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
