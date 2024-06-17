import User from "../Models/User.js";
import createHttpError from "http-errors";

export async function getAllUsers(req, res, next) {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
}

export async function getUserData(req, res, next) {
  let foundUser;

  try {
    foundUser = await User.findById(req.params.id);
  } catch (error) {
    return next(createHttpError(500, "Server Error"));
  }

  //* If the user exists in the collection:
  if (foundUser) {
    try {
      await foundUser.populate("contacts", {
        _id: 1,
        firstName: 1,
        lastName: 1,
        phone: 1
      });


      res.status(201).json({
        username: foundUser.username,
        message: `${foundUser.username} has been found.`
      });
    } catch (error) {
      next(createHttpError(500, "Server Error"))
    }
  } else {
    next(createHttpError(404, `${foundUser.firstName} has not been found.`))
  }
}
