import { useState } from "react";
import MyContacts from "./Views/MyContacts";
import Login from "./Views/Login";
import Register from "./Views/Register";

function App() {
  const [existUser, setExistUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  function handleToggleLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <div className="w-full flex flex-col justify-center max-w-screen-2xl mx-auto min-h-screen">
      {!existUser ? (
        showLogin ? (
          <Login onClick={handleToggleLogin} setUserId={setExistUser} />
        ) : (
          <Register onClick={handleToggleLogin} setUserId={setExistUser} />
        )
      ) : (
        <MyContacts userId={setExistUser} />
      )}
    </div>
  );
}

export default App;
