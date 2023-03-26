import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";


const initialState = {
   isPlay: false,
   play_musics: [],
   track_id: -1,
   currentSong: null,
   isTrack: false,
   loading: false,
   isShow: false,
   genres: [],//
   songs: [], // your tracks
   song: null,
   index: -1,
   song_id: null, // about all track
   user_tracks: [], // similar tracks user
   artist: null, // full info about artist
   rating: [], //
   search_tracks: [],
   search_playlists: [],
   top_tracks: [],
   users_search: [],
   tracks_search: [],

};



export const GetGenres = createAsyncThunk(
   "song/getGenres",
   async () => {
      try {
         const { data } = await axios.get("/song/genres");
         console.log(data);
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)

export const GetTopTracks = createAsyncThunk(
   "song/GetTopTracks",
   async () => {
      try {
         const { data } = await axios.get("/song/gettoptracks");
         return data;
      }
      catch (error) {
         console.log(error);
      }
   }
)

export const AddTrack = createAsyncThunk(
   "song/add",
   async (formData: any) => {
      try {
         const onUploudsProgress = (progressEvent: any) => {
            console.log(
               "Upload Progress:" +
               Math.round((progressEvent.loaded * 100) / progressEvent.total) +
               "%"
            );
         };
         const config = {
            headers: {
               "Content-Type": "multipart/form-data",
            },
            onUploadProgress: onUploudsProgress,
         };
         const { data } = await axios.post("/song/add", formData, config);
         return data;
      } catch (error) {
         console.log(error);
      }
   }
);

export const DeleteTrack = createAsyncThunk(
   "song/deleteTrack ",
   async (datas: any) => {
      try {
         const { data } = await axios.delete("/song/delete_song", {
            data: {
               user_id: datas.user_id,
               track_id: datas.track_id
            }
         });
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)

export const UpdateTrack = createAsyncThunk(
   "song/UpdateTrack ",
   async (formData: any) => {
      try {

         const onUploudsProgress = (progressEvent: any) => {
            console.log(
               "Upload Progress: " +
               Math.round((progressEvent.loaded * 100) / progressEvent.total) +
               "%"
            );
         };
         const config = {
            headers: {
               "Content-Type": "multipart/form-data",
            },
            onUploadProgress: onUploudsProgress,
         };

         const { data } = await axios.post("/song/update", formData, config);
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)

export const GetSongs = createAsyncThunk(
   "song/getsongs",
   async (id: any) => {
      try {
         const { data } = await axios.get(`/song/songs/${id}`)
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)

export const getTrack = createAsyncThunk(
   "song/getTrack",
   async (id: string | undefined) => {
      try {
         const { data } = await axios.get(`/song/${id}`);
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)

export const getArtist = createAsyncThunk(
   "song/getArtist",
   async (id: string | undefined) => {
      try {
         const { data } = await axios.get(`/song/getartist/${id}`);
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)

export const AddRaiting = createAsyncThunk(
   "song/AddRaiting",
   async (datas: any) => {
      try {
         const { data } = await axios.post("/song/add_raiting", datas);
         return data;
      } catch (error) {
         console.log(error);
      }
   }

)

export const SearchTracksAndPlaylist = createAsyncThunk(
   "song/search",
   async (title: string) => {
      try {
         const { data } = await axios.get(`/song/search/${title}`)
         return data;
      }
      catch (error) {
         console.log(error);
      }
   }
)

export const SearchUsers = createAsyncThunk(
   "song/searchusers",
   async (title: string) => {
      try {
         const { data } = await axios.get(`/song/search/users/${title}`)
         return data;
      }
      catch (error) {
         console.log(error);
      }
   }
)

export const SearchTracks = createAsyncThunk(
   "song/searctrackss",
   async (title: string) => {
      try {
         const { data } = await axios.get(`/song/search/tracks/${title}`)
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)

export const songSlice: any = createSlice({
   name: "song",
   initialState,
   reducers: {
      PlayMusic(state, action) {
         state.isPlay = true;
         state.isTrack = !state.isTrack;
         state.play_musics = action.payload.songs_array;
         state.index = action.payload.index;
         state.isShow = true;
         state.currentSong = state.play_musics[state.index];
      },
      StopPlay(state) {
         state.isTrack = !state.isTrack;
      },
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
      },
      SetMusic(state, action) {
         state.song = action.payload;
      },
      Prev(state) {
         if (state.index < 0) {
            state.index = state.index - 1;
            state.currentSong = state.play_musics[state.index];
         }

      },
      Next(state) {

         if (state.index >= state.play_musics.length - 1) {
            state.index = 0;
         }
         else {
            state.index = state.index + 1;
         }
         state.currentSong = state.play_musics[state.index];

      },

   }
   ,
   extraReducers: (builder) => {
      builder.addCase(DeleteTrack.fulfilled, (state: any, action: any) => {
         state.songs = action?.payload.tracks_user;
      })
      builder.addCase(DeleteTrack.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(UpdateTrack.fulfilled, (state: any, action: any) => {
         state.songs = action?.payload.tracks_users;
      })
      builder.addCase(UpdateTrack.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetGenres.fulfilled, (state: any, action: any) => {
         state.genres = action.payload;
      })
      builder.addCase(GetGenres.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetSongs.fulfilled, (state: any, action: any) => {
         state.songs = action.payload.tracks_users;
         console.log(state.songs);
      })
      builder.addCase(GetSongs.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(AddTrack.fulfilled, (state: any, action: any) => {
         state.songs = action.payload.tracks_users;
      })
      builder.addCase(AddTrack.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(getTrack.fulfilled, (state: any, action: any) => {
         state.song_id = action.payload.song;
         state.raiting = action.payload.raiting;
         state.user_tracks = action.payload.tracks_users;
      })
      builder.addCase(getTrack.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(AddRaiting.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(AddRaiting.fulfilled, (state: any, action: any) => {
         state.song_id = action.payload.song;
         state.user_tracks = action.payload.track_users;
         state.raiting = action.payload.raiting;
      })
      builder.addCase(getArtist.fulfilled, (state: any, action: any) => {
         state.artist = action.payload.artist;
         state.user_tracks = action.payload.track_users;
      })
      builder.addCase(getArtist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(SearchTracksAndPlaylist.fulfilled, (state: any, action: any) => {
         state.search_tracks = action.payload.search_tracks;
         state.search_playlists = action.payload.search_playlists;
      })
      builder.addCase(SearchTracksAndPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetTopTracks.fulfilled, (state: any, action: any) => {
         state.top_tracks = action.payload;
      })
      builder.addCase(GetTopTracks.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(SearchUsers.fulfilled, (state: any, action: any) => {
         state.users_search = action.payload.users;
      })
      builder.addCase(SearchUsers.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(SearchTracks.fulfilled, (state: any, action: any) => {
         state.tracks_search = action.payload.tracks;
      })
      builder.addCase(SearchTracks.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
   }
});

export const { setPlayMusics, setCurrentSong, clearCurrentSong, nextSong, prevSong, Prev, Next, PlayMusic, StopPlay, ClosePlay, HideMusic, ShowMusic, SetMusic } = songSlice.actions;
export default songSlice.reducer;