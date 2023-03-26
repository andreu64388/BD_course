import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";


const initialState = {
   recomend_playlists: [],
   playlists_users: [], // 
   user_id_playlist: [],
   tracks_in_playlist: [],
   title_playlist: "",
   new_tracks: [],
   message: "",
};


export const GetRecommendPlaylist = createAsyncThunk(
   "song/getreccomend",
   async () => {
      try {
         const { data } = await axios.get("/song/recommend");
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)
export const CreatePlayList = createAsyncThunk(
   "song/createPlayList",
   async (datas: any) => {
      try {
         const { data } = await axios.post("/song/create_playlsit", datas);
         return data;
      } catch (error) {
         console.log(error);
      }
   }

)

export const GetPlaylistsUserId = createAsyncThunk(
   "song/getPlaylistsUserId",
   async (id: any) => {
      try {
         const { data } = await axios.get(`/song/playlists/${id}`);
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)

export const AddTrackInPlaylist = createAsyncThunk(
   "song/addTrackInPlaylist",
   async (datas: any) => {
      try {
         const { data } = await axios.post("/song/add_song_to_playlist", datas);
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)

export const GetTracksInPlaylist = createAsyncThunk(
   "song/GetTracksInPlaylist",
   async (id: any) => {
      try {
         const { data } = await axios.get(`/song/playlists/songs/${id}`);
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)

export const DeleteTrackInPlaylist = createAsyncThunk(
   "song/deleteTrackInPlaylist",
   async (datas: any) => {
      try {

         const { data } = await axios.delete("/song/playlists/songs/playlist_song_delete", {
            data: {
               song_id: datas.song_id,
               playlist_id: datas.playlist_id
            }
         });
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)
export const DeletenPlaylist = createAsyncThunk(
   "song/deletePlaylist",
   async (datas: any) => {
      try {
         const { data } = await axios.delete("/song/delete_playlist", {
            data: {
               playlist_id: datas.playlist_id,
               user_id: datas.user_id
            }
         });
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)


export const UpdatePlaylistTitle = createAsyncThunk(
   "song/UpdatePlaylistsTitle",
   async (datas: any) => {
      try {
         const { data } = await axios.put(`/song/playlist_edit_title`, datas);
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)
export const playlistSlice: any = createSlice({
   name: "playlist",
   initialState,
   reducers: {
      ResetPlaylist(state) {
         state.playlists_users = [];
         state.tracks_in_playlist = [];
         state.title_playlist = "";

      }
   }
   ,
   extraReducers: (builder) => {
      builder.addCase(GetRecommendPlaylist.fulfilled, (state: any, action: any) => {
         state.reccomend_playlists = action.payload.reccomend_playlists;
         state.new_tracks = action.payload.new_tracks;
      })
      builder.addCase(GetRecommendPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(CreatePlayList.fulfilled, (state: any, action: any) => {
         state.playlists_users = action.payload.playlsit;
      });
      builder.addCase(CreatePlayList.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      });
      builder.addCase(GetPlaylistsUserId.fulfilled, (state: any, action: any) => {
         state.playlists_users = action.payload;
      })
      builder.addCase(GetPlaylistsUserId.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(AddTrackInPlaylist.fulfilled, (state: any, action: any) => {
         state.tracks_in_playlist = action.payload.tracks;
         state.title_playlist = action.payload.title_playlist;
         state.user_id_playlist = action.payload.user_id_playlist;
      })
      builder.addCase(AddTrackInPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(UpdatePlaylistTitle.fulfilled, (state: any, action: any) => {
         state.tracks_in_playlist = action.payload.tracks;
         state.title_playlist = action.payload.title_playlist;
         state.user_id_playlist = action.payload.user_id_playlist;
      })
      builder.addCase(UpdatePlaylistTitle.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetTracksInPlaylist.fulfilled, (state: any, action: any) => {
         state.tracks_in_playlist = action.payload.tracks;
         state.title_playlist = action.payload.title_playlist;
         state.user_id_playlist = action.payload.user_id_playlist;
      })
      builder.addCase(GetTracksInPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(DeleteTrackInPlaylist.fulfilled, (state: any, action: any) => {
         state.tracks_in_playlist = action.payload.tracks;
         state.title_playlist = action.payload.title_playlist;
         state.user_id_playlist = action.payload.user_id_playlist;
      })
      builder.addCase(DeleteTrackInPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(DeletenPlaylist.fulfilled, (state: any, action: any) => {
         state.playlists_users = action.payload;

      })
      builder.addCase(DeletenPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
   }
});

export const { ResetPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;