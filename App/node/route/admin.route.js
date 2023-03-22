import { Router } from "express";
import upload from "./../middleware/multer.js";
import adminController from "../сontroller/admin.controller.js";
const adminRoute = new Router();

adminRoute.get("/users", adminController.getUsers);
adminRoute.get("/tracks", adminController.getTracks);
adminRoute.get("/genres", adminController.GetGenres);
adminRoute.delete("/delete_user/:user_id", adminController.deleteUser);
adminRoute.delete("/delete_track/:track_id", adminController.deleteTrack);
adminRoute.post( "/add_user", upload.single("user_img"), adminController.addUser);
export default adminRoute;
