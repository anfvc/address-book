import express from "express";
import createHttpError from "http-errors";
import { createContact, editContact } from "../Controllers/contactController.js";

const router = express.Router();

//* POST http://localhost:3001/contacts

router.post("/", createContact);

router.put("/:id", editContact)

export default router;
