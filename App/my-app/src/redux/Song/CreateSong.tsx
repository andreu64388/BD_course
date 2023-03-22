import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";


const initialState = {
   isPlay: false,
   isTrack: false,
   loading: false,
   isShow: false,
   genres: [],
   songs: [],
   song: null,
   index: -1,
   play_musics: [],
   currentSong: null,
   song_id: null,
   user_tracks: [],
   artist: null,
   playlists_users: [],
   tracks_in_playlist: [],
   items_add_in_playlist: [],
   title_playlist: "",
   user_id_playlist: null,
   library: [],
   all_songs: [],
   rating: [],
   search_tracks: [],
   search_playlists: [],
   reccomend_playlists: [],
   top_tracks: [],
   new_tracks: []
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

export const GetRecommend = createAsyncThunk(
   "song/getreccomend",
   async () => {
      try {
         const { data } = await axios.get("/song/recommend");
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
         console.log(data);
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)

export const GetAllTracks = createAsyncThunk(
   "song/getsongsall",
   async () => {
      try {
         const { data } = await axios.get("/song/get_all_tracks");
         console.log(data);
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
         console.log(formData);
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
         console.log(formData + "datas");
         const { data } = await axios.post("/song/add", formData, config);
         console.log(data + "data");
         return data;
      } catch (error) {
         console.log(error);
      }
   }
);

export const GetSongs = createAsyncThunk(
   "song/getsongs",
   async (id: any) => {
      try {
         const { data } = await axios.get(`/song/songs/${id}`)
         console.log(data);
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)

export const DeleteTrack = createAsyncThunk(
   "song/eleteTrack ",
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
         console.log(formData);
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
         console.log(formData);
         const { data } = await axios.put("/song/update", formData, config);
         console.log(data);
         return data;
      } catch (error) {
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



export const GetPlaylistsUserId = createAsyncThunk(
   "song/getPlaylistsUserId",
   async (id: any) => {
      try {
         const { data } = await axios.get(`/song/playlists/${id}`);
         console.log("test")
         console.log(data);
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
         console.log(data)
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

export const AddTrackInLibrary = createAsyncThunk(
   "song/AddTrackInLibrary",
   async (datas: any) => {
      try {

         const { data } = await axios.post("/song/library/add", datas);
         console.log(data + "data");
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
               user_id: datas.user_id
            }
         });
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)


export const GetTrackinLibrary = createAsyncThunk(
   "song/track_library",
   async (user_id: any) => {
      try {
         const { data } = await axios.get(`/song/library/${user_id}`,
         );
         console.log(data);
         return data;
      }
      catch (error) {
         console.log(error);
      }

   }
)
export const SearchTracksAndPlaylist = createAsyncThunk(
   "song/search",
   async (title: string) => {
      try {
         const { data } = await axios.get(`/song/search/${title}`)
         console.log(data);
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
      AddToPlaylist(state: any, action: any) {
         state.items_add_in_playlist = [...state.items_add_in_playlist, action.payload];
      },
      ResetPlaylist(state) {
         state.items_add_in_playlist = [];
         state.playlists_users = [];
         state.user_tracks = [];
         state.tracks_in_playlist = [];
         state.title_playlist = "";
         state.user_id_playlist = null;
      }
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
         state.songs = action?.payload.tracks_user;
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
      builder.addCase(GetAllTracks.fulfilled, (state: any, action: any) => {
         state.all_songs = action.payload;
      })
      builder.addCase(GetAllTracks.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetSongs.fulfilled, (state: any, action: any) => {
         state.songs = action.payload.tracks_user;
      })
      builder.addCase(GetSongs.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })

      builder.addCase(AddTrack.fulfilled, (state: any, action: any) => {
         state.songs = action.payload.tracks_user;
      })
      builder.addCase(AddTrack.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(getTrack.fulfilled, (state: any, action: any) => {
         state.song_id = action.payload.song;
         state.raiting = action.payload.raiting;
         state.user_tracks = action.payload.track_users;


      })
      builder.addCase(AddRaiting.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(AddRaiting.fulfilled, (state: any, action: any) => {
         state.song_id = action.payload.song;
         state.user_tracks = action.payload.track_users;
         state.raiting = action.payload.raiting;
      })
      builder.addCase(getTrack.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(getArtist.fulfilled, (state: any, action: any) => {
         state.artist = action.payload.artist;
         state.user_tracks = action.payload.track_users;
      })
      builder.addCase(getArtist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(CreatePlayList.fulfilled, (state: any, action: any) => {
         state.playlists_users = action.payload.playlsit;
         console.log(state.playlists_users);

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
      builder.addCase(GetTracksInPlaylist.fulfilled, (state: any, action: any) => {
         state.tracks_in_playlist = action.payload.tracks;
         state.title_playlist = action.payload.title_playlist;
         state.user_id_playlist = action.payload.user_id_playlist;
         console.log(action.payload.tracks);
      })
      builder.addCase(GetTracksInPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(DeleteTrackInPlaylist.fulfilled, (state: any, action: any) => {
         state.tracks_in_playlist = action.payload.tracks;
         state.title_playlist = action.payload.title_playlist;
         state.user_id_playlist = action.payload.user_id_playlist;
         console.log(action.payload.tracks);
      })
      builder.addCase(DeleteTrackInPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(AddTrackInLibrary.fulfilled, (state: any, action: any) => {
         state.library = action.payload.libray_tracks;
      })
      builder.addCase(DeletenPlaylist.fulfilled, (state: any, action: any) => {
         state.playlists_users = action.payload;
         alert("ted")
         console.log(state.playlists_users);
      })
      builder.addCase(DeletenPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(AddTrackInLibrary.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(DeleteTrackInLibrary.fulfilled, (state: any, action: any) => {
         state.library = action.payload.libray_tracks;
      })
      builder.addCase(DeleteTrackInLibrary.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetTrackinLibrary.fulfilled, (state: any, action: any) => {
         state.library = action.payload.libray_tracks;
      })
      builder.addCase(GetTrackinLibrary.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(SearchTracksAndPlaylist.fulfilled, (state: any, action: any) => {
         state.search_tracks = action.payload.search_tracks;
         state.search_playlists = action.payload.search_playlists;

      })
      builder.addCase(SearchTracksAndPlaylist.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetRecommend.fulfilled, (state: any, action: any) => {
         state.reccomend_playlists = action.payload.reccomend_playlists;
         state.new_tracks = action.payload.new_tracks;
      })
      builder.addCase(GetRecommend.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })
      builder.addCase(GetTopTracks.fulfilled, (state: any, action: any) => {
         state.top_tracks = action.payload;
      })
      builder.addCase(GetTopTracks.rejected, (state: any, action: any) => {
         state.message = action?.payload.message;
      })


   }
});

export const { ResetPlaylist, Prev, Next, PlayMusic, StopPlay, ClosePlay, HideMusic, ShowMusic, SetMusic } = songSlice.actions;
export default songSlice.reducer;