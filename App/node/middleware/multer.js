import multer from "multer";

// Создайте экземпляр multer, указав место для сохранения файлов и допустимые типы файлов
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
});

export default upload;
