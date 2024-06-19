import Contact from "../Models/Contact.js";
import createHttpError from "http-errors";
import User from "../Models/User.js";

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

export async function findContactById(req, res, next) {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return next(createHttpError(404, "Contact was not found."));
    }

    res.status(200).json(contact);
  } catch (error) {
    next(createHttpError(500, "Error fetching contact details"));
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

    console.log(`${updatedContact.firstName} has been successfully updated.`);
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

export async function deleteContact(req, res, next) {
  try {
    console.log(`Received request to delete contact with ID: ${req.params.id}`);
    const options = {
      new: true,
      runValidators: true,
    };

    const deletedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        softDeletedAt: new Date(),
      },
      options
    );

    if (deletedContact) {
      console.log("Contact successfully deleted:", deletedContact);
      res.json({
        message: "Contact was successfully deleted.",
      });
    } else {
      next(createHttpError(404, "Contact was not found."));
    }
  } catch (error) {
    console.error("Server error while deleting contact:", error);
    next(createHttpError(500, "Server Error."));
  }
}

export async function deleteAllContacts(req, res, next) {
  const { userId } = req.body;

  try {
    // ? Deleting all contacts from a specific user:
    const deletedAll = await Contact.deleteMany({ addedBy: userId });

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { contacts: [] } },
      { new: true }
    );

    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    if (deletedAll.deletedCount === 0) {
      return next(createHttpError(404, "No contacts found to delete."));
    }

    res.status(200).json({
      message: `${deletedAll.deletedCount} contacts were successfully deleted.`,
    });
  } catch (error) {
    next(createHttpError(500, "Server Error."));
  }
}
