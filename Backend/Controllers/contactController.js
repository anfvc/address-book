import Contact from "../Models/Contact.js";
import createHttpError from "http-errors";

export async function createContact(req, res, next) {
  const { firstName, lastName, phone, address, addedBy } = req.body;

  try {
    //? Try to create a new contact inside the "contacts" collection:
    const newContact = await Contact.create({
      firstName,
      lastName,
      phone,
      address,
      addedBy,
    });

    //? If this is successful, return the _id of the new "contact" in the response:
    res.status(201).json({
      id: newContact._id,
      firstName: newContact.firstName,
    });
  } catch (error) {
    //* When the error is caused by the Mongoose schema validation:
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)[0].message;

      return next(createHttpError(400, errorMessage));
    }

    next(
      createHttpError(500, "Contact could not be created. Please try again.")
    );
  }
}

export async function editContact(req, res, next) {
  const { id } = req.params;
  const { firstName, lastName, phone, address } = req.body;

  try {
    //* Find the contact by ID and update it with the new data:

    const options = {
      new: true,
      runValidators: true,
    };

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phone,
        address,
      },
      options
    );

    if (!updatedContact) {
      return next(createHttpError(404, "Contact not found."));
    }

    res.status(200).json({
      id: updatedContact._id,
      firstName: updatedContact.firstName,
      lastName: updatedContact.lastName,
      phone: updatedContact.phone,
      address: updatedContact.address,
    });
  } catch (error) {
    //* When the error is caused by the Mongoose schema validation:
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)[0].message;

      return next(createHttpError(400, errorMessage));
    }

    next(
      createHttpError(500, "Contact could not be updated. Please try again.")
    );
  }
}
