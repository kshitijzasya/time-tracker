import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Components from "./pages/index";

const { Login, Register } = Components;
export default () => {
  <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" component={Login} />
        {/* <Route exact path="/register" component={Register} /> */}
      </Routes>
    </BrowserRouter>
  </>;
};
