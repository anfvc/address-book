import { useState } from "react";
import MyContacts from "./Views/MyContacts";
import Login from "./Views/Login";
import Register from "./Views/Register";

function App() {
  const [existUser, setExistUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="w-full max-w-screen-2xl mx-auto min-h-screen	">{!existUser ? showLogin ? <Login /> : <Register /> : <div>
      </div>}
      </div>
  );
}

export default App;
