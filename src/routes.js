import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Components from "./pages/index";

export default () => {
  const { Login, Register } = Components; // Destructuring
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} /> 
        <Route exact path="/register" element={<Register />} />
        <Route path="*" element={<Login/>} /> 
      </Routes>
    </BrowserRouter>
  )
};
