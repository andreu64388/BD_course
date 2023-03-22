import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded.name;
    console.log(req.userData);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
