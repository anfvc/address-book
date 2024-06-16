import express from "express";
import { registerUser } from "../Controllers/registerController.js";

const router = express.Router();

//* POST http://localhost:3001/login
router.post("/", registerUser);


