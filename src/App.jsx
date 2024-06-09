import React from "react";
import Problems from "./Pages/ProblemSet/Problems";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./Component/ResponsiveAppBar";
import SignIn from "./Pages/LoginSignUp/SignIn";
import SignUp from "./Pages/LoginSignUp/SignUp";
import { Store } from "./Context/ContextStore";
import Home from "./Pages/Home";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Store>
      <BrowserRouter>
        <ResponsiveAppBar />
        <ToastContainer position="top-right" theme="light" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Store>
  );
};

export default App;
