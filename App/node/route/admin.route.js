import { Route } from "express";
const adminRoute = new Route();

adminRoute.get("/", (req, res) => {
  res.send("Hello Admin");
});

export default adminRoute;
