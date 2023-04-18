import { json } from "express";
import pool from "../database/db.js";

class SongController {
  //-----------------------------------//
  //-------------RECOMEND--------------//
  //-----------------------------------//

  async GetPlayListRecommend(req, res) {
    try {
      const playlists_id = [5, 6, 7];
      const playlistData = [];
      for (const playlist_id of playlists_id) {
        const tracks = await pool.query(
          "select * from GetPlaylistTracksByID($1)",
          [Number(playlist_id)]
        );
        const tracks_send = [];

        for (const song of tracks.rows) {
          song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
            "utf-8"
          )}`;
          song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
            "utf-8"
          )}`;
          let author = await pool.query(
            "select * from get_users_from_track($1)",
            [Number(song?.track_id)]
          );
          tracks_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }

        const title_playlist = await pool.query(
          "select user_id,title from playlist where playlist_id = $1",
          [Number(playlist_id)]
        );
        console.log("1");
        playlistData.push({
          playlist_id: playlist_id,
          user_id: title_playlist.rows[0].user_id,
          title: title_playlist.rows[0].title,
          tracks: tracks_send, // добавляем tracks_send
        });
      }

      const songs = await pool.query("select * from get_recent_tracks($1)", [
        5,
      ]);

      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );
        songs_send.push({
          track_id: song.track_id,
          track_title: song.track_title,
          track_date: song.track_date,
          genre_name: song.genre_name,
          track_image: song.track_image,
          track_content: song.track_content,
          avg_rating: song.avg_rating,
          users: author.rows,
        });
      }

      res.json({
        reccomend_playlists: playlistData,
        new_tracks: songs_send,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async GetGenres(req, res) {
    try {
      const genres = await pool.query("SELECT * FROM genre limit 10");

      res.json(genres.rows);
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  //-----------------------------------//
  //---------------TRACK---------------//
  //-----------------------------------//

  async AddSong(req, res) {
    try {
      const { arr_user_id, track_title, genre_id, user_id } = req.body;

      const track_image = req.files["track_image"][0].filename;
      const track_content = req.files["track_content"][0].filename;

      const currentDate = new Date();
      const query = "select AddTrack($1, $2, $3, $4, $5)";
      const result = await pool.query(query, [
        track_title,
        currentDate,
        track_image,
        track_content,
        genre_id,
      ]);

      const track_id = result.rows[0].addtrack;

      for (const userid of arr_user_id) {
        await pool.query("call AddUserTrack($1,$2);", [
          Number(userid),
          Number(track_id),
        ]);
      }

      const songs = await pool.query("SELECT * FROM GetTracksUser($1)", [
        Number(user_id),
      ]);
      const songs_send = [];
      console.log("upload");
      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content?.toString(
          "utf-8"
        )}`;

        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );
        author;

        songs_send.push({
          track_id: song.track_id,
          track_title: song.track_title,
          track_date: song.track_date,
          genre_name: song.genre_name,
          track_image: song.track_image,
          track_content: song.track_content,
          avg_rating: song.avg_rating,
          users: author.rows,
        });
      }

      res.json({
        tracks_users: songs_send,
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

      const query = "call delete_track($1)";
      await pool.query(query, [Number(track_id)]);
      const songs = await pool.query("SELECT * FROM GetTracksUser($1)", [
        Number(user_id),
      ]);
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        songs_send.push({
          track_id: song.track_id,
          track_title: song.track_title,
          track_date: song.track_date,
          genre_name: song.genre_name,
          track_image: song.track_image,
          track_content: song.track_content,
          avg_rating: song.avg_rating,
          users: author.rows,
        });
      }
      res.json({
        tracks_user: songs_send,
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
      track_title == undefined ? null : track_title;
      genre_id == undefined ? null : genre_id;
      const track_image =
        req?.file.filename == undefined
          ? null
          : req?.files["track_image"][0].filename;

      const query = "CALL update_track($1, $2, $3, $4)";
      await pool.query(query, [
        Number(track_id),
        track_title,
        track_image,
        genre_id,
      ]);

      const songs = await pool.query("SELECT * FROM GetTracksUser($1)", [
        Number(user_id),
      ]);
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        songs_send.push({
          track_id: song.track_id,
          track_title: song.track_title,
          track_date: song.track_date,
          genre_name: song.genre_name,
          track_image: song.track_image,
          track_content: song.track_content,
          avg_rating: song.avg_rating,
          users: author.rows,
        });
      }
      res.json({
        tracks_users: songs_send,
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

      const songs = await pool.query("SELECT * FROM GetTracksUser($1)", [
        Number(user_id),
      ]);
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        songs_send.push({
          track_id: song.track_id,
          track_title: song.track_title,
          track_date: song.track_date,
          genre_name: song.genre_name,
          track_image: song.track_image,
          track_content: song.track_content,
          avg_rating: song.avg_rating,
          users: author.rows,
        });
      }
      res.json({
        tracks_users: songs_send,
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

      song.rows[0].track_image = `http://localhost:3001/images/${song?.rows[0].track_image?.toString(
        "utf-8"
      )}`;
      song.rows[0].track_content = `http://localhost:3001/music/${song?.rows[0].track_content?.toString(
        "utf-8"
      )}`;

      const authors = await pool.query(
        "SELECT * FROM get_users_from_track($1)",
        [Number(track_id)]
      );

      const authorIds = authors.rows.map((user) => user.user_id);

      const songs_send = [];

      for (const authorId of authorIds) {
        const userSongs = await pool.query("SELECT * FROM GetTracksUser($1)", [
          authorId,
        ]);

        for (const song of userSongs.rows) {
          song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
            "utf-8"
          )}`;
          song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
            "utf-8"
          )}`;

          const author = await pool.query(
            "select * from get_users_from_track($1)",
            [Number(song?.track_id)]
          );
          if (songs_send.some((e) => e.track_id === song.track_id)) {
          } else {
            songs_send.push({
              track_id: song.track_id,
              track_title: song.track_title,
              track_date: song.track_date,
              genre_name: song.genre_name,
              track_image: song.track_image,
              track_content: song.track_content,
              avg_rating: song.avg_rating,
              users: author.rows,
            });
          }
        }
      }

      const raiting = await pool.query("SELECT * FROM GetRatingUsers($1)", [
        track_id,
      ]);
      authors.rows.forEach((el) => {
        el.user_img =
          "http://localhost:3001/" + el?.user_img?.toString("utf-8");
      });
      res.json({
        message: "Song found",
        song: {
          track_id: song.rows[0].track_id,
          track_title: song.rows[0].track_title,
          track_date: song.rows[0].track_date,
          genre_name: song.rows[0].genre_name,
          track_image: song.rows[0].track_image,
          track_content: song.rows[0].track_content,
          avg_rating: song.rows[0].avg_rating,
          users: authors.rows,
        },
        tracks_users: songs_send,
        raiting: raiting.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  //--------------------------------------//
  //---------------PLAYLIST---------------//
  //--------------------------------------//

  async ChangePlaylistTitle(req, res) {
    const { playlist_id, title } = req.body;
    try {
      await pool.query("call update_playlist($1,$2)", [playlist_id, title]);
      const songs = await pool.query(
        "select * from GetPlaylistTracksByID($1)",
        [Number(playlist_id)]
      );
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );
        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }
      const title_playlist = await pool.query(
        "select user_id,title from playlist where playlist_id = $1",
        [Number(playlist_id)]
      );

      res.json({
        tracks: songs_send,
        title_playlist: title_playlist.rows[0].title,
        user_id_playlist: title_playlist.rows[0].user_id,
      });
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

  async GetArsitstById(req, res) {
    const { executor_id } = req.params;

    try {
      const user = await pool.query("SELECT * FROM getUserById($1)", [
        Number(executor_id),
      ]);
      user.rows[0].user_img =
        "http://localhost:3001/" + user.rows[0].user_img.toString("utf-8");

      const track_user = await pool.query("SELECT * FROM GetTracksUser($1)", [
        Number(executor_id),
      ]);
      const songs_send = await Promise.all(
        track_user.rows.map(async (song) => {
          song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
            "utf-8"
          )}`;
          song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
            "utf-8"
          )}`;

          const authors = await pool.query(
            "SELECT * FROM get_users_from_track($1)",
            [Number(song.track_id)]
          );

          return {
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: authors.rows,
          };
        })
      );

      res.json({
        message: "Song found",
        artist: user.rows[0],
        track_users: songs_send,
      });
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
      const songs = await pool.query(
        "select * from GetPlaylistTracksByID($1)",
        [Number(playlist_id)]
      );
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }
      const title_playlist = await pool.query(
        "select user_id,title from playlist where playlist_id = $1",
        [Number(playlist_id)]
      );

      res.json({
        tracks: songs_send,
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

  async DeleteSongToPlaylist(req, res) {
    const { playlist_id, song_id } = req.body;
    try {
      const query = "CALL remove_track_from_playlist($1,$2)";
      await pool.query(query, [Number(playlist_id), Number(song_id)]);

      const songs = await pool.query(
        "select * from GetPlaylistTracksByID($1)",
        [Number(playlist_id)]
      );
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }
      const title_playlist = await pool.query(
        "select user_id,title from playlist where playlist_id = $1",
        [Number(playlist_id)]
      );

      res.json({
        tracks: songs_send,
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
      const songs = await pool.query(
        "select * from GetPlaylistTracksByID($1)",
        [Number(playlist_id)]
      );
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }
      const title_playlist = await pool.query(
        "select user_id,title from playlist where playlist_id = $1",
        [Number(playlist_id)]
      );

      res.json({
        tracks: songs_send,
        title_playlist: title_playlist.rows[0].title,
        user_id_playlist: title_playlist.rows[0].user_id,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  //-----------------------------------//
  //-------------LIBRARY---------------//
  //-----------------------------------//

  async AddInLibraryTrack(req, res) {
    try {
      const { user_id, song_id } = req.body;

      const query = "call add_track_to_library($1,$2)";
      await pool.query(query, [Number(user_id), Number(song_id)]);
      const songs = await pool.query(
        "select * from GetTrackFromLibraryByUserID($1)",
        [Number(user_id)]
      );
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }
      res.json({
        message: "Song added successfully",
        libray_tracks: songs_send,
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

      const query = "call delete_track_from_library($1,$2)";
      await pool.query(query, [Number(user_id), Number(song_id)]);
      const songs = await pool.query(
        "select * from GetTrackFromLibraryByUserID($1)",
        [Number(user_id)]
      );
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }
      res.json({
        message: "Song deleted successfully",
        libray_tracks: songs_send,
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
      const songs = await pool.query(
        "select * from GetTrackFromLibraryByUserID($1)",
        [Number(user_id)]
      );
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }
      res.json({
        message: "Song found",
        library_tracks: songs_send,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  //-----------------------------------//
  //-------------SEARCH----------------//
  //-----------------------------------//

  async GetSearchTracks(req, res) {
    try {
      const { query_text } = req.params;

      const songs = await pool.query(
        "select * from search_track_by_title_or_user_name($1)",
        [query_text]
      );

      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }
      res.json({
        tracks: songs_send,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async GetSearchUsers(req, res) {
    try {
      const { query_text } = req.params;
      const query = await pool.query("select * from search_user_name($1)", [
        query_text,
      ]);
      query.rows.forEach((user) => {
        user.user_img =
          "http://localhost:3001/" + user?.user_img?.toString("utf-8");
      });
      res.json({
        users: query.rows,
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: err,
      });
    }
  }

  async GetSearch(req, res) {
    try {
      const { query_text } = req.params;
      const playlist = await pool.query(
        "SELECT * FROM GetPlaylistByTitle($1)",
        [query_text]
      );
      const songs = await pool.query(
        "select * from search_track_by_title_or_user_name($1)",
        [query_text]
      );

      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }

      res.json({
        message: "Song found",
        search_tracks: songs_send,
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
      const songs = await pool.query("SELECT* FROM  GetTrackByRaiting($1)", [
        10,
      ]);
      const songs_send = [];

      for (const song of songs.rows) {
        song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
          "utf-8"
        )}`;
        let author = await pool.query(
          "select * from get_users_from_track($1)",
          [Number(song?.track_id)]
        );

        if (songs_send.some((e) => e.track_id === song.track_id)) {
        } else {
          songs_send.push({
            track_id: song.track_id,
            track_title: song.track_title,
            track_date: song.track_date,
            genre_name: song.genre_name,
            track_image: song.track_image,
            track_content: song.track_content,
            avg_rating: song.avg_rating,
            users: author.rows,
          });
        }
      }
      res.json(songs_send);
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  //-----------------------------------//
  //-------------RATING----------------//
  //-----------------------------------//

  async AddRaiting(req, res) {
    try {
      const { user_id, track_id, rating } = req.body;

      const query = "call add_rating($1,$2,$3)";
      await pool.query(query, [
        Number(user_id),
        Number(track_id),
        Number(rating),
      ]);

      const song = await pool.query("SELECT * FROM GetTrackById($1)", [
        Number(track_id),
      ]);

      song.rows[0].track_image = `http://localhost:3001/images/${song?.rows[0].track_image?.toString(
        "utf-8"
      )}`;
      song.rows[0].track_content = `http://localhost:3001/music/${song?.rows[0].track_content?.toString(
        "utf-8"
      )}`;

      const authors = await pool.query(
        "SELECT * FROM get_users_from_track($1)",
        [Number(track_id)]
      );

      const authorIds = authors.rows.map((user) => user.user_id);

      const songs_send = [];

      for (const authorId of authorIds) {
        const userSongs = await pool.query("SELECT * FROM GetTracksUser($1)", [
          authorId,
        ]);

        for (const song of userSongs.rows) {
          song.track_image = `http://localhost:3001/images/${song?.track_image?.toString(
            "utf-8"
          )}`;
          song.track_content = `http://localhost:3001/music/${song?.track_content?.toString(
            "utf-8"
          )}`;

          const author = await pool.query(
            "select * from get_users_from_track($1)",
            [Number(song?.track_id)]
          );

          if (songs_send.some((e) => e.track_id === song.track_id)) {
          } else {
            songs_send.push({
              track_id: song.track_id,
              track_title: song.track_title,
              track_date: song.track_date,
              genre_name: song.genre_name,
              track_image: song.track_image,
              track_content: song.track_content,
              avg_rating: song.avg_rating,
              users: author.rows,
            });
          }
        }
      }

      const raiting = await pool.query("SELECT * FROM GetRatingUsers($1)", [
        track_id,
      ]);
      authors.rows.forEach((el) => {
        el.user_img =
          "http://localhost:3001/" + el?.user_img?.toString("utf-8");
      });
      res.json({
        message: "Song found",
        song: {
          track_id: song.rows[0].track_id,
          track_title: song.rows[0].track_title,
          track_date: song.rows[0].track_date,
          genre_name: song.rows[0].genre_name,
          track_image: song.rows[0].track_image,
          track_content: song.rows[0].track_content,
          avg_rating: song.rows[0].avg_rating,
          users: authors.rows,
        },
        track_users: songs_send,
        raiting: raiting.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
}
export default new SongController();
