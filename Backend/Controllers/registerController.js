import User from "../Models/User.js";
import createHttpError from "http-errors";

//* Attempting to log in a user:

export async function registerUser(req, res, next) {
  const { username, password } = req.body;

  let foundUser;

  //? Trying to find an existing user:

  try {
    foundUser = await User.findOne({ username: username });
  } catch (error) {
    return next(createHttpError(500, "Server Error."));
  }

  if (foundUser) {
    next(createHttpError(409, "This username already exists."));
  } else {
    try {
      const newUser = await User.create({
        username,
        password,
      });

      res.status(201).json({
        id: newUser._id,
        username: newUser.username,
        contacts: newUser.contacts,
      });
    } catch (error) {
      next(createHttpError(500, "Server Error"));
    }
  }
}
