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

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`);

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
        `http://localhost:3001/users/${userId}`,
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

  return (
    <div className="w-full flex justify-center items-center flex-col">
      {/* <h1 className="text-5xl text-white">{user.username}'s Contacts</h1> */}
      <CreateContact
        userId={userId}
        user={user.username}
        setUser={setUser}
        handleDelete={handleDeleteAccount}
        logOut={handleLogOut}
      />
      {user.contacts.length === 0 ? (
        <h1 className="text-4xl text-white font-bold">
          Your Contact List is currently empty
        </h1>
      ) : (
        <h1 className="text-4xl text-white font-bold">
          This is your contact list:
        </h1>
      )}

      <div className="w-full grid grid-cols-1 px-5 md:grid-cols-2 md:px-20 lg:grid-cols-3 xl:grid-cols-3 gap-5 text-center my-10">
        {user.contacts.map((contact) => (
          <Contact
            key={contact._id}
            firstName={contact.firstName}
            lastName={contact.lastName}
            phone={contact.phone}
            address={contact.address}
          />
        ))}
      </div>
    </div>
  );
}

export default MyContacts;
