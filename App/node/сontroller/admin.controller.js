import pool from "../database/db.js";

class AdminController {
  async getUsers(req, res) {
    try {
      const query = await pool.query("SELECT * from GetUsers()");

      query.rows.forEach((user) => {
        user.user_img =
          "http://localhost:3001/" + user?.user_img?.toString("utf-8");
      });

      res.json({
        users: query.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async getTracks(req, res) {
    try {
      console.log("te");
      const tracks = await pool.query("select * from GetTracks()");
      tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json({
        tracks: tracks.rows,
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
      res.json({
        genres: genres.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async addUser(req, res) {
    try {
      const {
        user_name,
        user_email,
        user_password,
        user_date_of_birth,
        user_role_id,
      } = req.body;

      const isUsedEmail = await pool.query(
        "SELECT * FROM USERS WHERE user_email = $1",
        [user_email]
      );

      if (isUsedEmail.rows.length > 0) {
        return res.json({ message: "User already exists" });
      }

      const result = await pool.query(
        "SELECT Register($1, $2, $3, $4, $5, $6)",
        [
          user_name,
          user_email,
          user_password,
          user_date_of_birth,
          Number(user_role_id),
          req.file.filename,
        ]
      );
      const query = await pool.query("SELECT * from GetUsers()");

      query.rows.forEach((user) => {
        user.user_img =
          "http://localhost:3001/" + user?.user_img?.toString("utf-8");
      });

      res.json({
        users: query.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async addTrack(req, res) {
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
        tracks: songs.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async deleteUser(req, res) {
    try {
      const { user_id } = req.params;
      console.log(user_id);
      await pool.query("call delete_user($1)", [user_id]);
      const query = await pool.query("SELECT * from GetUsers()");

      query.rows.forEach((user) => {
        user.user_img =
          "http://localhost:3001/" + user?.user_img?.toString("utf-8");
      });

      console.log(query.rows);
      res.json({
        users: query.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async deleteTrack(req, res) {
    try {
      const { track_id } = req.params;
      console.log(track_id);
      const query = "call delete_track($1)";
      await pool.query(query, [Number(track_id)]);

      const tracks = await pool.query("select * from GetTracks()");
      tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json({
        tracks: tracks.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async updateUser(req, res) {
    try {
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
  async updateTrack(req, res) {
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
      const tracks = await pool.query("select * from GetTracks()");
      tracks.rows.forEach((song) => {
        song.track_image = `http://localhost:3001/images/${song.track_image.toString(
          "utf-8"
        )}`;
        song.track_content = `http://localhost:3001/music/${song.track_content.toString(
          "utf-8"
        )}`;
      });
      res.json({
        tracks: tracks.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
}

export default new AdminController();
