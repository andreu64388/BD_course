import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded.name;
    next();
  } catch (err) {
    return res.json({
      message: "",
    });
  }
};
