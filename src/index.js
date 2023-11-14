import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    green: "#0bfc03",
    red: "#fc263b",
  },
  typography: {
    h1: {
      fontWeight: "500",
      fontSize: "3rem",
      "@media (min-width:700px)": {
        fontSize: "6rem",
      },
    },
    h3: {
      fontWeight: "bold",
      fontSize: "2rem",
      "@media (min-width:700px)": {
        fontSize: "3rem",
      },
    },
    h5: {
      fontSize: "1rem",
      "@media (min-width:700px)": {
        fontSize: "1.5rem",
      },
    },
    h6: {
      fontWeight: "bold",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
