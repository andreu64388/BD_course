import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "uploads/images/");
    } else if (file.mimetype.startsWith("audio/")) {
      cb(null, "uploads/music/");
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },
});

const upload = multer({ storage: storage });

export default upload;
