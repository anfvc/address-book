import express from "express";
import createHttpError from "http-errors";
import createContact from "../Controllers/createContact.js"

const router = express.Router();

//* POST http://localhost:3001/contacts

router.post("/", createContact);

export default router;
