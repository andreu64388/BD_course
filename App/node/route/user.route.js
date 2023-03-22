import { Router } from "express";
import userController from "../сontroller/user.controller.js";
import { checkAuth } from "../middleware/ChechIsAuth.js";
import upload from "./../middleware/multer.js";

const userRoute = new Router();

userRoute.post("/register", upload.single("user_img"), userController.Register);
userRoute.post("/login", userController.Login);
userRoute.get("/getme", checkAuth, userController.GetMe);
userRoute.post("/upload_user", upload.single("user_img"),  userController.UpdateUser);
userRoute.post("/update/password", userController.UpdateUserPassword);

export default userRoute;
