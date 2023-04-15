import React from "react";
import { useWallet } from "./hook/useWallet";
import ConnectButton from "./components/ConnectButton";
import Swap from "./components/Swap" 

const App = () => {
  return (
    <>
      <ConnectButton />
      <Swap></Swap>
    </>
    );

};

export default App;
