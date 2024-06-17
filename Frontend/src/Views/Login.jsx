import { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "../Components/Button";

function Login({ onClick, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault(e);

    //* Trying to Log in:

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/JSON",
        },
        // credentials: "include", //* for captcha
      };

      //* Send POST request to login:
      const response = await fetch(`http://localhost:3001/login`, settings);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserId(data.id);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="w-full flex flex-col justify-center gap-20 items-center max-w-screen-2xl mx-auto min-h-screen">
      <h1 className="text-3xl text-white font-bold">Address Directory</h1>

      <Box
        className="w-10/12 flex flex-col items-center justify-center max-w-screen-2xl mx-auto py-20 rounded-xl shadow-custom-shadow border-black bg-white"
        component="form"
        onSubmit={handleLogin}
        sx={{
          "& > :not(style)": { m: 1, width: 400, maxWidth: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <h2 className="text-4xl font-semibold text-black">Log In</h2>
        </div>
        <TextField
          className="bg-white"
          id="outlined-username"
          label="Username*"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="bg-white"
          id="outlined-password"
          label="Password*"
          value={password}
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Login!</Button>
        <div className="w-full flex flex-col justify-center items-center font-semibold">
          Don't have an account yet?{" "}
          <span onClick={onClick} className="text-[#2B6CB0] cursor-pointer">
            Register here
          </span>
        </div>
      </Box>
    </div>
  );
}

export default Login;
