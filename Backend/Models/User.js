import mongoose, { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value); //* If email is valid, return true. It not, false.
      },
      message: "Email address is not in a correct format",
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [4, "Username must be minimum 3 characters long."],
    maxLength: [23, "Username must be maximum 23 characters long."],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value);
      },
      message:
        "Password must have at least 8 characters, 1 lowercase char, 1 uppercase char, 1 number and 1 symbol.",
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  contacts: {
    type: [],
    required: true,
    default: [],
  },
});

const User = model("User", userSchema);

export default User;
