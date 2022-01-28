import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Components from "./pages/index";

const { Login, Register, Recorder } = Components;
export default () => { 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/rracking" element={<Recorder />}/>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}
