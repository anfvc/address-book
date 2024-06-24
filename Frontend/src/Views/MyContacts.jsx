import { useState, useEffect } from "react";
import CreateContact from "../Components/CreateContact";
import Contact from "../Components/Contact";
import { useAlert } from "../Components/AlertContext";

function MyContacts({ setUserId, userId }) {
  const { showAlert } = useAlert();
  const [user, setUser] = useState({
    username: "",
    contacts: [],
  });

  const [editingContactId, setEditingContactId] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/users/${userId}`);

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      showAlert(error.message, "warning");
    }
  }

  async function handleDeleteAccount() {
    try {
      const settings = {
        method: "DELETE",
      };

      const response = await fetch(
        `${import.meta.env.VITE_API}/users/${userId}`,
        settings
      );

      if (response.ok) {
        const { message } = await response.json();
        showAlert(message, "success");
        setUserId(null);
      } else {
        const { error } = await response.json();
        showAlert(`${error.message}, warning`);
        throw new Error(error.message);
      }
    } catch (error) {
      showAlert(`${error.message}, warning`);
    }
  }

  function handleLogOut() {
    setUserId(null);
    showAlert("You have logged out.");
  }

  async function handleEditContact(contactId) {
    setEditingContactId(contactId);
    console.log(`Editing contact with ID: ${contactId}`);
  }

  async function handleUpdateContact(updatedContact) {
    try {
      const settings = {
        method: "PUT",
        body: JSON.stringify(updatedContact),
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API}/contacts/${updatedContact.id}`
      );

      if (response.ok) {
        const updatedContactData = await response.json();
        //? This will be the new data with which I must update the existing contact details:
        setUser({
          ...user,
          contacts: user.contacts.map((contact) =>
            contact._id === updatedContact.id ? updatedContactData : contact
          ),
        });
        showAlert(
          `${updatedContactData.firstName} updated successfully!`,
          "success"
        );
        setEditingContactId(null);
      } else {
        const { error } = await response.json();
        showAlert(error.message, "warning");
        throw new Error(error.message);
      }
    } catch (error) {
      showAlert(error.message, "warning");
    }
  }

  async function handleDeleteContact(contactId) {
    try {
      console.log(`Attempting to delete contact with ID: ${contactId}`);
      const settings = {
        method: "DELETE",
      };

      const response = await fetch(
        `${import.meta.env.VITE_API}/contacts/${contactId}`,
        settings
      );

      if (response.ok) {
        const { message } = await response.json();
        showAlert(message, "success");
        console.log("Delete response message:", message);
        console.log(userId);
        await getUserData(); //To retrieve the most current data
      } else {
        const { error } = await response.json();
        showAlert(error.message, "warning");
        throw new Error(error.message);
      }
    } catch (error) {
      showAlert(error.message, "warning");
    }
  }

  async function handleDeleteAllContacts() {
    try {
      const settings = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({userId})
      };

      const response = await fetch(`${import.meta.env.VITE_API}/contacts`, settings);

      if (response.ok) {
        const { message } = await response.json();
        showAlert(message, "success");
        await getUserData();
      } else {
        const { error } = await response.json();
        showAlert(error.message, "warning");
        throw new Error(error.message);
      }
    } catch (error) {
      showAlert(error.message, "warning");
    }
  }

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <CreateContact
        userId={userId}
        user={user.username}
        setUser={setUser}
        handleDelete={handleDeleteAccount}
        logOut={handleLogOut}
        editingContactId={editingContactId}
        onUpdateContact={handleUpdateContact}
      />

      {user.contacts.length === 0 ? (
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold px-5 md:px-20 text-center">
          Your Contact List is currently empty
        </h1>
      ) : (
        <div className="w-10/12 flex flex-col justify-center bg-white p-5 shadow-custom-shadow max-w-screen-2xl mx-auto rounded-xl items-center gap-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-black font-bold md:px-20">
            This is your contact list:
          </h1>
          <button
            className="mt-2 bg-[#b91c1c] hover:bg-[#7b1313] transition-all text-white py-0.5 px-3 rounded-xl"
            onClick={handleDeleteAllContacts}
          >
            Delete Contacts
          </button>
        </div>
      )}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 px-8 md:grid-cols-2 md:px-20 lg:grid-cols-3 xl:grid-cols-3 gap-5 text-center my-10">
        {user.contacts.map((contact) => (
          <Contact
            key={contact._id}
            contactId={contact._id}
            firstName={contact.firstName}
            lastName={contact.lastName}
            phone={contact.phone}
            address={contact.address}
            deleteContact={handleDeleteContact}
            onEdit={() => handleEditContact(contact._id)} //* Passing editing function
          />
        ))}
      </div>
    </div>
  );
}

export default MyContacts;
