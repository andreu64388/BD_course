import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
   isPlay: false,
   isTrack: false,
   currentSong: null,
   loading: false,
   isShow: false,
};

export const songSlice: any = createSlice({
   name: "song",
   initialState,
   reducers: {

      PlayMusic(state, action) {
         state.isPlay = true;
         state.isTrack = !state.isTrack;
         state.currentSong = action.payload;
         state.isShow = true;
      },
      StopPlay(state) {
         state.isTrack = !state.isTrack;
      }
      ,
      ClosePlay(state) {
         state.isTrack = false;
         state.isPlay = false;
         state.currentSong = null;
         state.isShow = false;

      },
      HideMusic(state) {
         state.isShow = false;
      },
      ShowMusic(state) {
         state.isShow = true;
      }


   }
   ,
   extraReducers: (builder) => {

   }
});

export const { PlayMusic, StopPlay, ClosePlay, HideMusic, ShowMusic } = songSlice.actions;
export default songSlice.reducer;