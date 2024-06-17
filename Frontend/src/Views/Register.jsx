import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useState } from "react";
import Button from "../Components/Button";

function Register({ onClick, setUserId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  async function handleRegistration(e) {
    e.preventDefault();

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({ email, username, password, phone, address }),
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      //* Attempting to register a user:
      const response = await fetch(`http://localhost:3001/register`, settings);

      if (response.ok) {
        const newUserCreated = await response.json();
        console.log(newUserCreated);

        setUserId(newUserCreated);
      }
    } catch (error) {}
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-20 max-w-screen-2xl mx-auto min-h-screen">
      <h1 className="text-3xl text-white font-bold">Address Directory</h1>

      <Box
        className="w-10/12 flex flex-col items-center justify-center max-w-screen-2xl mx-auto py-20 rounded-xl shadow-custom-shadow border-black bg-white"
        component="form"
        onSubmit={handleRegistration}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <h2 className="text-4xl font-semibold">Registration</h2>
        </div>

        <TextField
          fullWidth
          className="bg-white"
          id="outlined-email"
          label="Email"
          variant="filled"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          fullWidth
          className="bg-white"
          id="outlined-username"
          label="Username"
          variant="filled"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          fullWidth
          className="bg-white"
          id="outlined-password"
          label="Password"
          variant="filled"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          fullWidth
          className="bg-white"
          id="outlined-phone"
          label="Phone"
          variant="filled"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <TextField
          fullWidth
          className="bg-white"
          id="outlined-address"
          label="Address"
          variant="filled"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <Button>Register</Button>
        <div className="w-full flex flex-col justify-center items-center font-semibold">
          Have an account?{" "}
          <span onClick={onClick} className="text-[#2B6CB0] cursor-pointer">
            Log in here
          </span>
        </div>
      </Box>
    </div>
  );
}

export default Register;
