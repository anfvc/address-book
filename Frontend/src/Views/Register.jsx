import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  return (
    <Box
      className="w-full flex flex-col items-center justify-center max-w-screen-2xl mx-auto border min-h-screen"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        id="outlined-email"
        label="Email"
        variant="filled"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="outlined-username"
        label="Username"
        variant="filled"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        id="outlined-password"
        label="Password"
        variant="filled"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <TextField
        id="outlined-phone"
        label="Phone"
        variant="filled"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <TextField
        id="outlined-address"
        label="Address"
        variant="filled"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
    </Box>
  );
}

export default Register;
