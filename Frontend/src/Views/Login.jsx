import { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box className="w-full flex flex-col items-center justify-center max-w-screen-2xl mx-auto border min-h-screen"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-username"
        label="Username*"
        variant="filled"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="outlined-password"
        label="Password*"
        value={password}
        variant="filled"
        onChange={(e) => setPassword(e.target.value)}
      />
    </Box>
  );
}

export default Login;
