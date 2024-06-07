import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import ResponsiveAppBar from "./Component/ResponsiveAppBar";

const App = () => {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes></Routes>
    </BrowserRouter>
  );
};

export default App;
