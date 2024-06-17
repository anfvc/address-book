import express from "express";
import registerUser from "../Controllers/registerController.js";

const router = express.Router();

//* POST http://localhost:3001/register
router.post("/", registerUser);

export default router;
