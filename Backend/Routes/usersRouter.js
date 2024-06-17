import express from "express";
import { getAllUsers, getUserData } from "../Controllers/usersController.js";

const router = express.Router();

//* GET http://localhost:3001/login
router.get("/", getAllUsers);

//* GET http://localhost:3001/login
router.get("/:id", getUserData);

export default router;
