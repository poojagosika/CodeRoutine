import React from "react";
import Problems from "./Pages/ProblemSet/Problems";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./Component/ResponsiveAppBar";
import SignIn from "./Pages/LoginSignUp/SignIn";
import SignUp from "./Pages/LoginSignUp/SignUp";
import { Store } from "./Context/ContextStore";
import Home from "./Pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Playgrounds from "./Component/profile/Playgrounds";
import Orders from "./Component/profile/Orders";
import Profile from "./Component/profile/Profile";

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
          <Route path="/settings/profile" element={<Profile />} />
          <Route path="/settings/orders" element={<Orders />} />
          <Route path="/settings/playgrounds" element={<Playgrounds />} />
        </Routes>
      </BrowserRouter>
    </Store>
  );
};

export default App;
