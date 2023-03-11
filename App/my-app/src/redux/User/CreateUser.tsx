import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
   isAuth: false,
   user: null,
   admin: false,
   token: null,
   modal: false,
   loading: false
};

export const userSlice: any = createSlice({
   name: "user",
   initialState,
   reducers: {
      Reset(state) {
         state.isAuth = false;
         state.user = null;
         state.admin = false;
      },
      ResetModal(state) {
         state.modal = false;
      },
      ShowModal(state) {
         state.modal = true;
      }

   }
   ,
   extraReducers: (builder) => {

   }
});

export const { Reset, ResetModal, ShowModal } = userSlice.actions;
export default userSlice.reducer;