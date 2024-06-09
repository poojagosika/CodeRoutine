import React from "react";
import Problems from "./Pages/ProblemSet/Problems";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./Component/ResponsiveAppBar";
import SignIn from "./Pages/LoginSignUp/SignIn";
import SignUp from "./Pages/LoginSignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" theme="light" />
      <ResponsiveAppBar />
      <Routes>
        <Route path="/problems" element={<Problems />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
