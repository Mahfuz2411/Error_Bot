import express from "express";
import { userRoutes } from "../modules/users/user.route.js";

const router = express.Router();

const routes = [
  {
    path: "/create",
    route: userRoutes,
  }
];


routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;