import User from "../Models/User.js";
import createHttpError from "http-errors";
import { compare } from "bcrypt";
import captcha from "../Middleware/captcha.js";

async function loginUser(req, res, next) {
  //* Destructure req.body to get the username, password
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username });

    const passwordMatches = await compare(password, foundUser.password);

    if (foundUser && passwordMatches) {
      await foundUser.populate("contacts", {
        _id: 1,
        firstName: 1,
        lastName: 1,
      });

      res.json({
        id: foundUser._id,
        username: foundUser.username,
        message: `${foundUser.username} has logged in.`
      });
      console.log(`${foundUser.username} has successfully logged in.`);
    } else {
      next(createHttpError(401, "Username or Password are invalid. Please try once again."));
    }
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}

export default loginUser;
