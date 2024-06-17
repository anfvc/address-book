import express from "express";
import { getAllUsers } from "../Controllers/usersController.js";

const router = express.Router();

//* GET http://localhost:3001/login
router.get("/", getAllUsers);

export default router;
