import Contact from "../Models/Contact.js";
import createHttpError from "http-errors";

async function createContact(req, res, next) {
  const { firstName, lastName, phone } = req.body;

  try {
    //? Try to create a new contact inside the "contacts" collection:
    const newContact = await Contact.create({ firstName, lastName, phone });

    //? If this is successful, return the _id of the new "contact" in the response:
    res.status(201).json({
      id: newContact._id,
    });
  } catch (error) {
    //* When the error is caused by the Mongoose schema validation:
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)[0].message;

      return next(createHttpError(400, errorMessage));
    }
  }
}

export default createContact;
