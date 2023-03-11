import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {

};

export const adminSlice: any = createSlice({
   name: "admin",
   initialState,
   reducers: {


   }
   ,
   extraReducers: (builder) => {

   }
});

export const { } = adminSlice.actions;
export default adminSlice.reducer;