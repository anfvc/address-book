import express from "express";

const router = express.Router();

//* POST http://localhost:3001/login
router.post("/", loginUser);

export default router;
