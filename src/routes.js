import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Components from "./pages/index";

const { Login, Register, Recorder } = Components;
export default () => { console.log('insinde routes')
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<Login />} /> */}
        <Route path="*" element={<Recorder />} />
        {/* <Route exact path="/register" component={Register} /> */}
      </Routes>
    </BrowserRouter>
  </>
  )
}
