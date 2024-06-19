import mongoose, { Schema, model } from "mongoose";
import validator from "validator";

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isLength(value, { min: 2 });
      },
      message: "First Name must be maximum 30 characters long.",
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isLength(value, { min: 2 });
      },
      message: "Last Name must be maximum 30 characters long.",
    },
  },
  phone: {
    type: String,
    required: true,
    validate: [
      {
        validator: function (value) {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number.",
      },
      {
        validator: function (value) {
          return validator.isLength(value, { min: 10 });
        },
        message: "Phone number must be min 10 characters long.",
      },
    ],
  },
  address: {
    type: String,
    required: true,
  },
  addedBy: {
    //* When a person wants to create a new contact, the contact will have a copy of the user's _id
    type: mongoose.ObjectId,
    default: null,
  },
  softDeletedAt: {
    type: Date,
    default: null,
  },
});

const Contact = model("Contact", contactSchema);

export default Contact;
