import { hash } from "bcrypt";
import User from "../Models/User.js";
import createHttpError from "http-errors";

//* Attempting to log in a user:

async function registerUser(req, res, next) {
  const { email, username, password, phone, address } = req.body;

  //? Trying to find an existing user in the "users" collection with the same email and username:

  try {
    const foundUser = await User.findOne({ $or: [{ email }, { username }] });

    if (foundUser) {
      //? If the found user has the same email as the one in the req.body:
      if (foundUser.email === email) {
        return next(
          createHttpError(
            409,
            "This email is already taken. You should use a different alternative."
          )
        );
      }

      //? If the found user has the same email as the one in the req.body:
      if (foundUser.username === username) {
        return next(
          createHttpError(
            409,
            "This user is already in use. Please try a different one."
          )
        );
      }
    }

    //? We have to hash the password from the req.body and give it 10 salt rounds:
    const hashedPassword = await hash(password, 10);

    //? If the user wasn't found, create a new "user" document with the data from req.body:
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
      phone: phone,
      address: address,
    });

    //* When the document is created, send back a success response:
    res.status(201).json({
      id: newUser.id,
      username: newUser.username
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)[0].message;
      return next(createHttpError(400, errorMessage));
    }
    return next(
      createHttpError(
        500,
        "Registration could not be completed. Please try again."
      )
    );
  }
}

export default registerUser;
