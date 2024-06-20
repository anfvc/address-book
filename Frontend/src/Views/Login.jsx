import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "../Components/Button";
import IconButton from "@mui/material/IconButton";
import {
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
  TextField,
  FilledInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAlert } from "../Components/AlertContext";
import ReCaPTCHA from "react-google-recaptcha";

function Login({ onClick, setUserId }) {
  const { showAlert } = useAlert();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const recaptcha = useRef(null);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!username || !password) {
      setUsernameError(!username);
      setPasswordError(!password);
      showAlert("Please fill in all the required fields.", "warning");
      return;
    }

    let captchaValue = recaptcha.current.getValue();

    if (!captchaValue) {
      showAlert("Please complete the reCaptcha to continue.", "warning");
      return;
    }

    //* Trying to Log in:

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({ username, password, recaptcha: captchaValue }),
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
        showAlert(`${data.username} has logged in successfully!`, "success");
        setUserId(data.id);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      showAlert(`${error.message}`, "warning");
    }
  }

  return (
    <div className="w-full flex flex-col justify-center gap-20 items-center max-w-screen-2xl mx-auto min-h-screen px-2">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center text-white font-bold">
        Contact Manager
      </h1>
      <Box
        className="w-11/12 flex flex-col items-center justify-center max-w-screen-2xl mx-auto py-20 px-10 rounded-xl shadow-custom-shadow border-black bg-white"
        component="form"
        onSubmit={handleLogin}
        sx={{
          "& > :not(style)": { m: 1, width: 400, maxWidth: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-semibold text-black">
            Log In
          </h2>
        </div>
        <TextField
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

        <div style={{ width: "100%" }}>
          <ReCaPTCHA
            sitekey={import.meta.env.VITE_SITE}
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              padding: "1rem",
            }}
            ref={recaptcha}
          />
        </div>

        <Button>Login</Button>
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
