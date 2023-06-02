import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Routes, Route } from "react-router";
import BigScreen1 from "./big-screen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/big-screen1" element={<BigScreen1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
