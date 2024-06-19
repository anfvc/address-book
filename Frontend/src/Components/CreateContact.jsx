import { Box, TextField } from "@mui/material";
import Button from "./Button";
import { useState } from "react";
import { useAlert } from "./AlertContext";

function CreateContact({ user, userId, setUser, handleDelete, logOut }) {
  const { showAlert } = useAlert();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [fNError, setFNError] = useState(false);
  const [lNError, setLError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  //* Creating a new contact:

  async function handleCreateContact(e) {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !address) {
      setFNError(!firstName);
      setLError(!lastName);
      setPhoneError(!phone);
      setAddressError(!address);
      return; //if this condition is met, please exit the code block.
    }

    try {
      //* Try to create a new contact in the "contacts" collection
      const settings = {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          address,
          addedBy: userId,
        }),
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      const response = await fetch(`http://localhost:3001/contacts`, settings);

      if (response.ok) {
        const newContact = await response.json();
        //* Must add the _id of the new contact document to the user's "contacts" collection:
        console.log(newContact);

        const settings2 = {
          method: "PATCH",
          body: JSON.stringify({
            id: newContact.id,
            firstName: newContact.firstName,
          }),
          headers: {
            "Content-Type": "application/JSON",
          },
        };

        const response2 = await fetch(
          `http://localhost:3001/users/${userId}/contacts`,
          settings2
        );

        if (response2.ok) {
          //? The response should have an object like:
          //* {id: "a", firstName: "b"...}
          const updatedUserData = await response2.json();
          console.log(updatedUserData);
          setUser(updatedUserData);
          showAlert(
            `${newContact.firstName} has been successfully added to your contact list.`,
            "success"
          );
          //* Resetting the fields
          setFirstName("");
          setLastName("");
          setPhone("");
          setAddress("");
        } else {
          const { error } = await response2.json();
          showAlert(`${error.message}`, "warning");

          throw new Error(error.message);
        }
      } else {
        const { error } = await response.json();
        showAlert(error.message);
        throw new Error(error.message);
      }
    } catch (error) {
      showAlert(`${error.message}`, "warning");

      console.log(error.message);
    }
  }

  return (
    <div className="w-full flex text-center flex-col justify-center items-center gap-5 max-w-screen-2xl mx-auto min-h-screen px-2">
      <div className="w-10/12 bg-white p-4 max-w-screen-2xl mx-auto flex flex-col justify-center items-center rounded-xl gap-3">
        <div className="w-full flex">
          <h2 className="w-full text-2xl sm:text-4xl md:text-5xl text-black font-bold">
            {user}'s Contact Manager
          </h2>
        </div>
        <div className="w-full flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-[#0474b0] border px-5 py-2 hover:bg-[#b91c1c] text-white rounded-md transition-all shadow-custom-shadow"
          >
            Delete Account
          </button>
          <button onClick={logOut} className="border bg-[#0474b0] hover:bg-[#14651e] px-5 py-2 text-white rounded-md transition-all shadow-custom-shadow">
            Log Me Out
          </button>
        </div>
      </div>
      <Box
        className="w-10/12 flex flex-col items-center justify-center max-w-screen-2xl mx-auto py-20 px-10 rounded-xl shadow-custom-shadow border-black bg-white"
        component="form"
        onSubmit={handleCreateContact}
        sx={{
          "& > :not(style)": { m: 1, width: 400, maxWidth: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <h2 className="w-full text-2xl text-center sm:text-4xl font-semibold">
            Create a New Contact:
          </h2>
        </div>

        <TextField
          fullWidth
          className="bg-white"
          id="outlined-firstName"
          label="First Name:"
          variant="filled"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setFNError(false);
          }}
          error={fNError}
          helperText={fNError && "First Name is required."}
        />
        <TextField
          fullWidth
          className="bg-white"
          id="outlined-lastName"
          label="Last Name:"
          variant="filled"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setLError(false);
          }}
          error={lNError}
          helperText={lNError && "Last Name is required."}
        />
        <TextField
          fullWidth
          className="bg-white"
          id="outlined-phone"
          label="Phone:"
          variant="filled"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setPhoneError(false);
          }}
          error={phoneError}
          helperText={phoneError && "Phone is required."}
        />
        <TextField
          fullWidth
          className="bg-white"
          id="outlined-address"
          label="Address:"
          variant="filled"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setAddressError(false);
          }}
          error={addressError}
          helperText={addressError && "Address is required."}
        />

        <Button>Add New Contact</Button>
      </Box>
    </div>
  );
}

export default CreateContact;
