import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Components from "./pages/index";

const { Login, Projects, Recorder } = Components;
export default () => { 
  return (
    <>
    <BrowserRouter>
      <Routes>
         {/* <Route exact path="/" element={<Login />} />  */}
        <Route exact path="/projects" element={<Projects />} />
        {/* <Route exact path="/projects/:id" element={<Recorder />} /> */}
        {/* <Route exact path="/tracking" element={<Recorder />}/> * */}
        <Route path="*" element={<Recorder />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}
