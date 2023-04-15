import React from "react";
import { Routes, Route } from "react-router-dom";
import { useWallet } from "./hook/useWallet";
import { useDrumFactoryContract } from "./hook/useDrumSwap";
import ConnectButton from "./components/ConnectButton";
import Swap from "./pages/Swap";
import Pool from "./pages/Pool";
import Navbar from "./components/Navbar";

const App = () => {
  const { currentAccount } = useWallet();
  const { swap, getPair, createPair } = useDrumFactoryContract({
    currentAccount,
  });

  const handleClick = async () => {
    console.log("test");
    await createPair(
      "0x242a1ff6ee06f2131b7924cacb74c7f9e3a5edc9",
      "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
    );
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/swap" element={<Swap />} />
        <Route path="/pool" element={<Pool />} />
      </Routes>
      <ConnectButton />
      <button onClick={handleClick} className="btn btn-primary">
        button
      </button>
    </>
  );
};

export default App;
