import React from "react";
import { useWallet } from "./hook/useWallet";
import { useDrumFactoryContract } from "./hook/useDrumFactory";
import ConnectButton from "./components/ConnectButton";
import Swap from "./components/Swap";
import Pool from "./components/Pool";

const App = () => {
  const { currentAccount } = useWallet();

  const handleClick = async () => {
    console.log("test");
  };

  return (
    <>
      <ConnectButton />
      <Pool></Pool>
      <button onClick={handleClick} className="btn btn-primary">
        button
      </button>
    </>
  );
};

export default App;
