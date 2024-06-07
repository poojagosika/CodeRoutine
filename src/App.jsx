import React from "react";
import Problems from "./Pages/ProblemSet/Problems";
import { BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./Component/ResponsiveAppBar";
const App = () => {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Problems />
    </BrowserRouter>
  );
};

export default App;
