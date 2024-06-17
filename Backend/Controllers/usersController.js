import User from "../Models/User.js";
import createHttpError from "http-errors";

export async function getAllUsers(req, res, next) {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
}
