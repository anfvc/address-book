import express from "express";
import loginUser from "../Controllers/loginController.js";

const router = express.Router();

//* POST http://localhost:3001/login
router.post("/", loginUser);

export default router;
