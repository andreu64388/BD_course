import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

const initialState = {
  library: [],
  message: "",
};

export const AddTrackInLibrary = createAsyncThunk(
  "song/AddTrackInLibrary",
  async (datas: any) => {
    try {
      const { data } = await axios.post("/song/library/add", datas);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const DeleteTrackInLibrary = createAsyncThunk(
  "song/DeleteTrackInLibrary",
  async (datas: any) => {
    try {
      const { data } = await axios.delete("/song/library/delete", {
        data: {
          song_id: datas.song_id,
          user_id: datas.user_id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetTrackinLibrary = createAsyncThunk(
  "song/track_library",
  async (user_id: any) => {
    try {
      const { data } = await axios.get(`/song/library/${user_id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const LibararySlice: any = createSlice({
  name: "librarys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddTrackInLibrary.fulfilled, (state: any, action: any) => {
      state.library = action.payload.libray_tracks;
    });
    builder.addCase(AddTrackInLibrary.rejected, (state: any, action: any) => {
      state.message = action?.payload.message;
    });
    builder.addCase(
      DeleteTrackInLibrary.fulfilled,
      (state: any, action: any) => {
        state.library = action.payload.libray_tracks;
      }
    );
    builder.addCase(
      DeleteTrackInLibrary.rejected,
      (state: any, action: any) => {
        state.message = action?.payload.message;
      }
    );
    builder.addCase(GetTrackinLibrary.fulfilled, (state: any, action: any) => {
      state.library = action.payload.library_tracks;
    });
    builder.addCase(GetTrackinLibrary.rejected, (state: any, action: any) => {
      state.message = action?.payload.message;
    });
  },
});

export const {} = LibararySlice.actions;
export default LibararySlice.reducer;
