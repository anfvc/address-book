import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserData,
  newContact,
} from "../Controllers/usersController.js";

const router = express.Router();

//* GET http://localhost:3001/users
router.get("/", getAllUsers);

//* GET http://localhost:3001/users/:id
router.get("/:id", getUserData);

//* PATCH http://localhost:3001/users/:id/contacts

router.patch("/:id/contacts", newContact);

//* DELETE http://localhost:3001/users/:id

router.delete("/:id", deleteUser);

export default router;
