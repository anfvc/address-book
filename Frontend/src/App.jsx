import { useState } from "react";
import MyContacts from "./Views/MyContacts";
import Login from "./Views/Login";
import Register from "./Views/Register";
import { AlertProvider } from "./Components/AlertContext";

function App() {
  const [existUser, setExistUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  function handleToggleLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <AlertProvider>
      <div className="w-full flex items-center justify-center max-w-screen-2xl mx-auto min-h-screen px-2">
        {!existUser ? (
          showLogin ? (
            <Login onClick={handleToggleLogin} setUserId={setExistUser} />
          ) : (
            <Register onClick={handleToggleLogin} setUserId={setExistUser} />
          )
        ) : (
          <MyContacts userId={existUser} setUserId={setExistUser} />
        )}
      </div>
    </AlertProvider>
  );
}

export default App;
