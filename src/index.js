import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./Components/Login/Login";
import axios from "axios";
import Signup from "./Components/Login/Signup";
import LoginForm from "./Components/Login/LoginForm";

axios.defaults.baseURL= 'https://obesystemtesting.azurewebsites.net/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');




ReactDOM.render(
  
  <React.StrictMode>
    {!localStorage.getItem('token') && <LoginForm/>}
    
   {localStorage.getItem('token') && <App />}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
