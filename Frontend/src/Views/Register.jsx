import Box from "@mui/material/Box";
import { useState } from "react";
import Button from "../Components/Button";
import {
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
  TextField,
  FilledInput,
  IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register({ onClick, setUserId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  async function handleRegistration(e) {
    e.preventDefault();

    if (!email || !username || !password || !phone || !address) {
      // Set error states for each empty field
      setEmailError(!email);
      setUsernameError(!username);
      setPasswordError(!password);
      setPhoneError(!phone);
      setAddressError(!address);
      return; // Exit early if any field is empty
    }

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

        setUserId(newUserCreated.id);
        alert("Registration has been successful!");
      }
    } catch (error) {}
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-20 max-w-screen-2xl mx-auto min-h-screen">
      <h1 className="text-5xl text-white font-bold">Contact Management</h1>

      <Box
        className="w-10/12 flex flex-col items-center justify-center max-w-screen-2xl mx-auto py-20 rounded-xl shadow-custom-shadow border-black bg-white"
        component="form"
        onSubmit={handleRegistration}
        sx={{
          "& > :not(style)": { m: 1, width: 400, maxWidth: "100%" },
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
          label="Email*"
          variant="filled"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          error={emailError}
          helperText={emailError && "Email is required."}
        />
        <TextField
          fullWidth
          className="bg-white"
          id="outlined-username"
          label="Username*"
          variant="filled"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameError(false);
          }}
          error={usernameError}
          helperText={usernameError && "Username is required."}
        />
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="filled"
          error={passwordError}
        >
          <InputLabel htmlFor="filled-adornment-password">Password*</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {passwordError && (
            <FormHelperText>Password is required.</FormHelperText>
          )}
        </FormControl>

        <TextField
          fullWidth
          className="bg-white"
          id="outlined-phone"
          label="Phone*"
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
          label="Address*"
          variant="filled"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setAddressError(false);
          }}
          error={addressError}
          helperText={addressError && "Address is required."}
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
