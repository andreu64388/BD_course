import { Router } from "express";
import SongController from "../сontroller/song.controller.js";
import upload from "../middleware/music.js";
const songRoute = new Router();

songRoute.get("/gettoptracks", SongController.GetTopTracks);
songRoute.get("/recommend", SongController.GetPlayListRecommend);
songRoute.get("/genres", SongController.GetGenres);
songRoute.get("/get_all_tracks", SongController.GetAllTracks);
songRoute.post(
  "/add",
  upload.fields([
    { name: "track_image", maxCount: 1 },
    { name: "track_content", maxCount: 1 },
  ]),
  SongController.AddSong
);
songRoute.delete("/delete_song", SongController.DeleteTrack);
songRoute.get("/songs/:user_id", SongController.GetSongs);
songRoute.put(
  "/update",
  upload.fields([{ name: "track_image", maxCount: 1 }]),
  SongController.UpdateTrack
);
songRoute.get("/search/:query_text", SongController.GetSearch);
songRoute.get("/:track_id", SongController.GetSongById);
songRoute.get("/getartist/:executor_id", SongController.GetArsitstById);
songRoute.post("/create_playlsit", SongController.CreatePlaylist);
songRoute.get("/playlists/:user_id", SongController.GetAllPlayListByUserId);
songRoute.post("/add_song_to_playlist", SongController.AddSongToPlaylist);
songRoute.get(
  "/playlists/songs/:playlist_id",
  SongController.GetAllPlayListTracksByPlaylistId
);
songRoute.delete(
  "/playlists/songs/playlist_song_delete",
  SongController.DeleteSongToPlaylist
);
songRoute.delete("/delete_playlist", SongController.DeletPlaylist);
songRoute.post("/library/add", SongController.AddInLibraryTrack);
songRoute.delete("/library/delete", SongController.DeleteInLibraryTrack);
songRoute.get("/library/:user_id", SongController.GetAllLibraryTracksByUserId);
songRoute.post("/add_raiting", SongController.AddRaiting);

export default songRoute;
