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
        phone: 1,
        address: 1,
        softDeletedAt: 1,
      });

      res.status(201).json({
        username: foundUser.username,
        contacts: foundUser.contacts.filter(
          (contact) => contact.softDeletedAt === null
        ),
        message: `${foundUser.username} has been found.`,
      });
    } catch (error) {
      next(createHttpError(500, "Server Error"));
    }
  } else {
    next(createHttpError(404, `${foundUser.username} has not been found.`));
  }
}

export async function newContact(req, res, next) {
  //
  const { id } = req.body;

  let foundUser;

  try {
    foundUser = await User.findById(req.params.id);
  } catch (error) {
    return next(createHttpError(500, "Server Error"));
  }

  //? If the user in the "users" collection is found:
  //* Try to add a new contact to their "contacts" collection
  if (foundUser) {
    try {
      const options = {
        //? Mongoose will return the previous doc. Excluding the update just made
        //* new: true will tell mongoose to return the new document
        new: true,
        runValidators: true,
      };

      const foundUserUpdated = await User.findByIdAndUpdate(
        req.params.id,
        { $push: { contacts: id } },
        options
      );

      //* Populate the "contacts" array:

      await foundUserUpdated.populate("contacts", {
        _id: 1,
        firstName: 1,
        lastName: 1,
        address: 1,
        phone: 1,
        softDeletedAt: 1,
      });

      res.status(201).json({
        id: foundUserUpdated._id,
        username: foundUserUpdated.username,
        contacts: foundUserUpdated.contacts.filter(
          (contact) => contact.softDeletedAt === null
        ),
      });
    } catch (error) {}
  } else {
    next(createHttpError(404, "This user was not found."));
  }
}
