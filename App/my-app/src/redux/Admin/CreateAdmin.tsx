import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
const initialState = {
   users: [],
   tracks: [],
   genres: []
};



export const GetTracks = createAsyncThunk(
   "song/gettracks",
   async () => {
      try {
         const { data } = await axios.get("/admin/tracks");
         console.log(data);
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)


export const GetUsers = createAsyncThunk(
   "song/getusers",
   async () => {
      try {
         const { data } = await axios.get("/admin/users");
         console.log(data);
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)

export const GetGenres = createAsyncThunk(
   "song/getallGenres",
   async () => {
      try {
         const { data } = await axios.get("/admin/genres");
         console.log(data);
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)


export const DeleteUser = createAsyncThunk(
   "user/deleteuser",
   async (id: string) => {
      try {
         const { data } = await axios.delete(`/admin/delete_user/${id}`);
         console.log(data);
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)

export const DeleteTrack = createAsyncThunk(
   "songs/deletetrack",
   async (id: string) => {
      try {
         const { data } = await axios.delete(`/admin/delete_track/${id}`);
         console.log(data);
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)
export const adminSlice: any = createSlice({
   name: "admin",
   initialState,
   reducers: {


   }
   ,
   extraReducers: (builder) => {
      builder.addCase(GetTracks.fulfilled, (state: any, action: any) => {
         state.tracks = action.payload.tracks;
      })
      builder.addCase(GetTracks.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(DeleteTrack.fulfilled, (state: any, action: any) => {
         state.tracks = action.payload.tracks;
      })
      builder.addCase(DeleteTrack.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetUsers.fulfilled, (state: any, action: any) => {
         state.users = action.payload.users;
      })
      builder.addCase(GetUsers.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetGenres.fulfilled, (state: any, action: any) => {
         state.genres = action.payload.genres;
      })
      builder.addCase(GetGenres.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(DeleteUser.fulfilled, (state: any, action: any) => {
         state.users = action.payload.users;
      })
      builder.addCase(DeleteUser.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
   }
});

export const { } = adminSlice.actions;
export default adminSlice.reducer;