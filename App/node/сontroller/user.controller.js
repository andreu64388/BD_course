import pool from "../database/db.js";
import jwt from "jsonwebtoken";

class UserController {
  async Register(req, res) {
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

      const token = jwt.sign({ name: user_email }, "secret");
      const user_id = result.rows[0].register;

      const user = await pool.query("SELECT * FROM getUserById($1)", [user_id]);
      user.rows[0].user_img =
        "http://localhost:3001/" + user.rows[0].user_img.toString("utf-8");

      res.json({
        message: "User registered successfully",
        token: token,
        user: user.rows[0],
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async Login(req, res) {
    const { user_email, user_password } = req.body;

    try {
      const isUserHave = await pool.query("SELECT Login($1,$2)", [
        user_email,
        user_password,
      ]);

      const loginResult = isUserHave.rows[0].login;

      if (!loginResult) {
        return res.json({ message: "Data is not correct" });
      }

      const token = jwt.sign({ name: user_email }, "secret");
      const result = await pool.query(
        "SELECT user_id FROM Users WHERE USER_EMAIL=$1",
        [user_email]
      );
      const user_id = result.rows[0].user_id;

      const user = await pool.query("SELECT * FROM getUserById($1)", [
        Number(user_id),
      ]);
      user.rows[0].user_img =
        "http://localhost:3001/" + user.rows[0].user_img.toString("utf-8");

      res.json({
        message: "User logged in successfully",
        token: token,
        user: user.rows[0],
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async GetMe(req, res) {
    try {
      const result = await pool.query(
        "SELECT user_id FROM Users WHERE USER_EMAIL=$1",
        [req.userData]
      );

      const user_id = result.rows[0].user_id;

      if (result.rows.length === 0) {
        return res.json({ message: "User not found" });
      }
      const user = await pool.query("SELECT * FROM getUserById($1)", [
        Number(user_id),
      ]);
      user.rows[0].user_img =
        "http://localhost:3001/" + user.rows[0].user_img.toString("utf-8");

      const token = jwt.sign({ name: req.userData }, "secret");
      res.json({
        message: "User logged in successfully",
        token: token,
        user: user.rows[0],
      });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  }

  async UpdateUser(req, res) {
    try {
      const { user_id, user_name, user_date_of_birth } = req.body;

      const file = req.file == undefined ? null : req.file.filename;
      await pool.query("CALL update_user($1, $2, $3, $4)", [
        Number(user_id),
        user_name,
        user_date_of_birth,
        file,
      ]);

      const user = await pool.query("SELECT * FROM getUserById($1)", [
        Number(user_id),
      ]);

      user.rows[0].user_img =
        "http://localhost:3001/" + user.rows[0].user_img.toString("utf-8");

      const token = jwt.sign({ name: user.rows[0].user_email }, "secret");
      res.json({
        message: "User data update",
        token: token,
        user: user.rows[0],
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }

  async UpdateUserPassword(req, res) {
    try {
      const { user_id, user_password } = req.body;
      await pool.query("CALL update_user_password($1, $2)", [
        user_id,
        user_password,
      ]);
      const user = await pool.query("SELECT * FROM getUserById($1)", [user_id]);

      const token = jwt.sign({ name: user.rows[0].user_email }, "secret");

      res.json({
        message: "Password update",
        token: token,
        user: user.rows[0],
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
}
export default new UserController();
