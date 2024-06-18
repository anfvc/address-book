import mongoose, { Schema, model } from "mongoose";
import validator from "validator";

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must be at least 3 chars long."],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [5, "Last name must be at least 3 chars long."],
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, "de-DE");
      },
      message: "Please provide a valid german number.",
    },
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
