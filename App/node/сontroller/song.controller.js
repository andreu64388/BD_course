import { json } from "express";
import pool from "../database/db.js";

class SongController {
  async GetPlayListRecommend(req, res) {
    console.log("testignfndngdn");
    try {
      const playlists_id = [59, 60, 61];
      const playlistData = [];

      for (const playlist_id of playlists_id) {
        const tracks = await pool.query(
          "select * from GetPlaylistTracksByID($1)",
          [Number(playlist_id)]
        );

        tracks.rows.forEach((song) => {
          song.track_image = `http://localhost:3001/images/${song.track_image.toString(
            "utf-8"
          )}`;
          song.track_content = `http://localhost:3001/music/${song.track_content.toString(
            "utf-8"
          )}`;
        });

        const title_playlist = await pool.query(
          "select user_id,title from playlist where playlist_id = $1",
          [Number(playlist_id)]
        );

        playlistData.push({
          playlist_id: playlist_id,
          user_id: title_playlist.rows[0].user_id,
          title: title_playlist.rows[0].title,
          tracks: tracks.rows,
        });
      }
      const new_tracks = await pool.query(
        "select * from get_recent_tracks($1)",
        [10]
      );
      new_tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });

      res.json({
        reccomend_playlists: playlistData,
        new_tracks: new_tracks.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async GetGenres(req, res) {
    try {
      const genres = await pool.query("SELECT * FROM genre");

      res.json(genres.rows);
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async GetAllTracks(req, res) {
    try {
      console.log("te");
      const songs = await pool.query("select * from GetTracks()");
      songs.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json(songs.rows);
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async AddSong(req, res) {
    try {
      const { user_id, track_title, genre_id } = req.body;
      const track_image = req.files["track_image"][0].filename;
      const track_content = req.files["track_content"][0].filename;
      const currentDate = new Date();
      const query = "call AddTrack ($1, $2, $3, $4, $5,$6)";
      await pool.query(query, [
        track_title,
        currentDate,
        user_id,
        track_image,
        track_content,
        genre_id,
      ]);
      const songs = await pool.query("SELECT * FROM GetTracksUser($1)", [
        Number(user_id),
      ]);
      songs.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });

      res.json({
        tracks_user: songs.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async DeleteTrack(req, res) {
    try {
      const { track_id, user_id } = req.body;
      console.log(track_id + " -" + user_id);
      const query = "call delete_track($1)";
      await pool.query(query, [Number(track_id)]);

      const songs = await pool.query("SELECT * FROM GetTracksUser($1)", [
        Number(user_id),
      ]);
      songs.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });

      res.json({
        tracks_user: songs.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async UpdateTrack(req, res) {
    try {
      const { track_id, track_title, genre_id, user_id } = req.body;
      console.log(req.body);
      const track_image =
        req.file == undefined ? null : req?.files["track_image"][0].filename;
      console.log(track_image);
      const currentDate = new Date();
      const query = "CALL update_track($1, $2, $3, $4, $5, $6)";
      await pool.query(query, [
        Number(track_id),
        track_title,
        currentDate,
        Number(user_id),
        track_image,
        Number(genre_id),
      ]);

      const songs = await pool.query("SELECT * FROM GetTracksUser($1)", [
        Number(user_id),
      ]);
      songs.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json({
        tracks_user: songs.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async GetSongs(req, res) {
    try {
      const { user_id } = req.params;
      console.log(user_id + "testing");
      const songs = await pool.query("SELECT * FROM GetTracksUser($1)", [
        Number(user_id),
      ]);
      songs.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json({
        tracks_user: songs.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async GetSongById(req, res) {
    const { track_id } = req.params;

    try {
      const song = await pool.query("SELECT * FROM GetTrackById($1)", [
        Number(track_id),
      ]);
      song.rows[0].user_img = `http://localhost:3001/${song.rows[0].user_img.toString(
        "utf-8"
      )}`;
      song.rows[0].track_image = `http://localhost:3001/images/${song.rows[0].track_image.toString(
        "utf-8"
      )}`;
      song.rows[0].track_content = `http://localhost:3001/music/${song.rows[0].track_content.toString(
        "utf-8"
      )}`;

      const user_id = song.rows[0].user_id;
      console.log("TEST THOS" + user_id);

      const track_user = await pool.query(
        "select * from GetTracks() where user_id = $1",
        [user_id]
      );
      track_user.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });

      console.log(track_user.rows);
      const raiting = await pool.query("select * from GetRatingUsers($1)", [
        track_id,
      ]);
      res.json({
        message: "Song found",
        song: song.rows[0],
        track_users: track_user.rows,
        raiting: raiting.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async GetArsitstById(req, res) {
    const { executor_id } = req.params;

    try {
      const user = await pool.query("SELECT * FROM getUserById($1)", [
        Number(executor_id),
      ]);
      user.rows[0].user_img =
        "http://localhost:3001/" + user.rows[0].user_img.toString("utf-8");
      const track_user = await pool.query(
        "select * from GetTracks() where user_id = $1",
        [Number(executor_id)]
      );
      track_user.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json({
        message: "Song found",
        artist: user.rows[0],
        track_users: track_user.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async GetPlaylistForHome(req, res) {
    try {
      const playlist = await pool.query("select * from GetPlaylist()");
      playlist.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json(playlist.rows);
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async CreatePlaylist(req, res) {
    try {
      const { user_id, playlist_name } = req.body;
      const query = "select CreatePlaylist($1,$2);";
      await pool.query(query, [Number(user_id), playlist_name]);
      const playlsit = await pool.query(
        "SELECT * FROM GetAllPlayListByUserId($1)",
        [Number(user_id)]
      );

      res.json({
        playlsit: playlsit.rows,
        message: "Playlist created successfully",
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async GetAllPlayListByUserId(req, res) {
    const { user_id } = req.params;
    try {
      const playlsit = await pool.query(
        "SELECT * FROM GetAllPlayListByUserId($1)",
        [Number(user_id)]
      );
      res.json(playlsit.rows);
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async AddSongToPlaylist(req, res) {
    try {
      const { playlist_id, song_id } = req.body;

      const query = "CALL add_track_to_playlist($1,$2)";
      await pool.query(query, [Number(song_id), Number(playlist_id)]);
      const tracks = await pool.query(
        "select * from GetPlaylistTracksByID($1)",
        [Number(playlist_id)]
      );
      tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      const title_playlist = await pool.query(
        "select user_id,title from playlist where playlist_id = $1",
        [Number(playlist_id)]
      );

      console.log(title_playlist.rows[0].title);
      res.json({
        tracks: tracks.rows,
        title_playlist: title_playlist.rows[0].title,
        user_id_playlist: title_playlist.rows[0].user_id,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async DeletPlaylist(req, res) {
    try {
      const { playlist_id, user_id } = req.body;
      console.log(playlist_id + "delete");
      const query = "CALL delete_playlist($1)";
      await pool.query(query, [Number(playlist_id)]);
      const playlsit = await pool.query(
        "SELECT * FROM GetAllPlayListByUserId($1)",
        [Number(user_id)]
      );
      res.json(playlsit.rows);
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async DeleteSongToPlaylist(req, res) {
    const { playlist_id, song_id } = req.body;
    try {
      console.log(req.body);
      console.log(playlist_id + "playlist_id");
      console.log(song_id + "song_id");
      const query = "CALL remove_track_from_playlist($1,$2)";
      await pool.query(query, [Number(playlist_id), Number(song_id)]);

      const tracks = await pool.query(
        "select * from GetPlaylistTracksByID($1)",
        [Number(playlist_id)]
      );
      tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      const title_playlist = await pool.query(
        "select user_id,title from playlist where playlist_id = $1",
        [Number(playlist_id)]
      );

      console.log(title_playlist.rows[0].title);
      res.json({
        tracks: tracks.rows,
        title_playlist: title_playlist.rows[0].title,
        user_id_playlist: title_playlist.rows[0].user_id,
      });
    } catch (err) {
      console.error(err);
      res.json({
        message: err,
      });
    }
  }
  async GetAllPlayListTracksByPlaylistId(req, res) {
    const { playlist_id } = req.params;

    try {
      const tracks = await pool.query(
        "select * from GetPlaylistTracksByID($1)",
        [Number(playlist_id)]
      );

      tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      const title_playlist = await pool.query(
        "select user_id,title from playlist where playlist_id = $1",
        [Number(playlist_id)]
      );

      console.log(title_playlist.rows[0].title);
      res.json({
        tracks: tracks.rows,
        title_playlist: title_playlist.rows[0].title,
        user_id_playlist: title_playlist.rows[0].user_id,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async AddInLibraryTrack(req, res) {
    try {
      const { user_id, song_id } = req.body;

      const query = "call add_track_to_library($1,$2)";
      await pool.query(query, [Number(user_id), Number(song_id)]);
      const tracks = await pool.query(
        "select * from GetTrackFromLibraryByUserID($1)",
        [Number(user_id)]
      );
      tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });

      res.json({
        message: "Song added successfully",
        libray_tracks: tracks.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async DeleteInLibraryTrack(req, res) {
    try {
      const { user_id, song_id } = req.body;
      console.log(req.body);
      console.log(user_id + "user_id delere");
      const query = "call delete_track_from_library($1,$2)";
      await pool.query(query, [Number(user_id), Number(song_id)]);
      const tracks = await pool.query(
        "select * from GetTrackFromLibraryByUserID($1)",
        [Number(user_id)]
      );
      tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json({
        message: "Song deleted successfully",
        libray_tracks: tracks.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async GetAllLibraryTracksByUserId(req, res) {
    const { user_id } = req.params;
    try {
      console.log(user_id + "user_id");
      const tracks = await pool.query(
        "select * from GetTrackFromLibraryByUserID($1)",
        [Number(user_id)]
      );
      tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json({
        message: "Song found",
        libray_tracks: tracks.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async AddRaiting(req, res) {
    try {
      const { user_id, track_id, rating } = req.body;
      console.log(req.body);
      const query = "call add_rating($1,$2,$3)";
      await pool.query(query, [
        Number(user_id),
        Number(track_id),
        Number(rating),
      ]);

      const song = await pool.query("SELECT * FROM GetTrackById($1)", [
        Number(track_id),
      ]);
      song.rows[0].user_img = `http://localhost:3001/${song.rows[0].user_img.toString(
        "utf-8"
      )}`;
      song.rows[0].track_image = `http://localhost:3001/images/${song.rows[0].track_image.toString(
        "utf-8"
      )}`;
      song.rows[0].track_content = `http://localhost:3001/music/${song.rows[0].track_content.toString(
        "utf-8"
      )}`;
      const user_ids = song.rows[0].user_id;
      const track_user = await pool.query(
        "select * from GetTracks() where user_id = $1",
        [user_ids]
      );
      track_user.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      const raiting = await pool.query("select * from GetRatingUsers($1)", [
        track_id,
      ]);
      res.json({
        message: "Song found",
        song: song.rows[0],
        track_users: track_user.rows,
        raiting: raiting.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async GetSearch(req, res) {
    try {
      const { query_text } = req.params;

      const songs = await pool.query(
        "select * from SearchTrackByTitleOrUserName($1)",
        [query_text]
      );

      const playlist = await pool.query(
        "SELECT * FROM GetPlaylistByTitle($1)",
        [query_text]
      );
      songs.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });

      res.json({
        message: "Song found",
        search_tracks: songs.rows,
        search_playlists: playlist.rows,
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: err,
      });
    }
  }
  async GetTopTracks(req, res) {
    try {
      const songs = await pool.query("select * from  tracks_by_rating($1)", [
        10,
      ]);
      songs.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json(songs.rows);
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
}
export default new SongController();
