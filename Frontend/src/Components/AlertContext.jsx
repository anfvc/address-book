import React, { createContext, useState, useContext } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  function showAlert(message, severity = "success") {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  }

  function handleCloseAlert() {
    setAlertOpen(false);
    setAlertMessage("");
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
}
