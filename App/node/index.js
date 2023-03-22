import express from "express";
import cors from "cors";
import multer from "multer";
import songRoute from "./route/song.route.js";
import userRoute from "./route/user.route.js";
import adminRoute from "./route/admin.route.js";

const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = process.env.PORT || 3001;

app.use("/", express.static("uploads"));
app.use(express.static("uplouds"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
//#region ROUTES
app.use("/api/user", userRoute);
app.use("/api/song", songRoute);
app.use("/api/admin", adminRoute);
//#endregion

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
