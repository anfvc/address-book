import express from "express";
import {
  createContact,
  editContact,
  findContactById,
  deleteContact,
  deleteAllContacts,
} from "../Controllers/contactController.js";

const router = express.Router();

//* GET http://localhost:3001/contacts/:id
router.get("/:id", findContactById);

//* POST http://localhost:3001/contacts

router.post("/", createContact);

//* PUT http://localhost:3001/contacts/:id

router.put("/:id", editContact);

//* DELETE http://localhost:3001/contacts/:id
router.delete("/:id", deleteContact);

//* DELETE http://localhost:3001/contacts/
router.delete("/", deleteAllContacts);

export default router;
