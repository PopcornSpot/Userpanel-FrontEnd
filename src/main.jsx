import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from "./App";
const Cliend_ID = "14907406865-uao7o1e46q70afmgpeoshg248s2dsjq2.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={Cliend_ID}>
    <BrowserRouter>
      <AppRouter />
      <ToastContainer/>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
