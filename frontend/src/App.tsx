import React from "react";
import { Routes, Route } from "react-router-dom";
import Swap from "./pages/Swap";
import Pool from "./pages/Pool";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/pool" element={<Pool />} />
      </Routes>
    </>
  );
};

export default App;
