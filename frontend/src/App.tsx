import React from "react";
import { Routes, Route } from "react-router-dom";
import Swap from "./components/Swap";
import Pool from "./pages/Pool";
import Test from "./pages/Test";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/pool" element={<Pool />} />
      </Routes>
    </>
  );
};

export default App;
