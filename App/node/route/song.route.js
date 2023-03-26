import { Router } from "express";
import SongController from "../сontroller/song.controller.js";
import upload from "../middleware/music.js";
const songRoute = new Router();


//--------------------------------------//
//---------------GET--------------------//
//--------------------------------------//
songRoute.get("/gettoptracks", SongController.GetTopTracks);
songRoute.get("/recommend", SongController.GetPlayListRecommend);
songRoute.get("/genres", SongController.GetGenres);

//--------------------------------------//
//---------------TRACK------------------//
//--------------------------------------//
songRoute.post("/add", upload.fields([ { name: "track_image", maxCount: 1 }, { name: "track_content", maxCount: 1 }, ]),SongController.AddSong);
songRoute.delete("/delete_song", SongController.DeleteTrack);
songRoute.get("/songs/:user_id", SongController.GetSongs);
songRoute.post("/update", upload.fields([{ name: "track_image", maxCount: 1 }]), SongController.UpdateTrack);
songRoute.get("/search/:query_text", SongController.GetSearch);
songRoute.get("/:track_id", SongController.GetSongById);
songRoute.get("/getartist/:executor_id", SongController.GetArsitstById);

//--------------------------------------//
//---------------LIBRARY----------------//
//--------------------------------------//
songRoute.post("/library/add", SongController.AddInLibraryTrack);
songRoute.delete("/library/delete", SongController.DeleteInLibraryTrack);
songRoute.get("/library/:user_id", SongController.GetAllLibraryTracksByUserId);

//--------------------------------------//
//---------------PLAYLIST---------------//
//--------------------------------------//
songRoute.post("/create_playlsit", SongController.CreatePlaylist);
songRoute.get("/playlists/:user_id", SongController.GetAllPlayListByUserId);
songRoute.post("/add_song_to_playlist", SongController.AddSongToPlaylist);
songRoute.put("/playlist_edit_title", SongController.ChangePlaylistTitle);
songRoute.delete("/delete_playlist", SongController.DeletPlaylist);
songRoute.get("/playlists/songs/:playlist_id", SongController.GetAllPlayListTracksByPlaylistId);
songRoute.delete("/playlists/songs/playlist_song_delete", SongController.DeleteSongToPlaylist);

//--------------------------------------//
//---------------SEARCH-----------------//
//--------------------------------------//
songRoute.get("/search/users/:query_text", SongController.GetSearchUsers);
songRoute.get("/search/tracks/:query_text", SongController.GetSearchTracks);

//--------------------------------------//
//---------------RAITING----------------//
//--------------------------------------//
songRoute.post("/add_raiting", SongController.AddRaiting);

export default songRoute;
