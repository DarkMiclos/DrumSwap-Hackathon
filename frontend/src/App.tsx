import React from "react";
import { Routes, Route } from "react-router-dom";
import { useWallet, isWalletConnected } from "./hook/useWallet";
import { useDrumFactoryContract } from "./hook/useDrumSwap";
import ConnectButton from "./components/ConnectButton";
import Swap from "./components/Swap";
import Pool from "./pages/Pool";
import Navbar from "./components/Navbar";

const App = () => {
  const { currentAccount } = useWallet();
  const { swap, getPair, createPair } = useDrumFactoryContract({
    currentAccount,
  });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/swap" element={<Swap />} />
        <Route path="/pool" element={<Pool />} />
      </Routes>
    </>
  );
};

export default App;
