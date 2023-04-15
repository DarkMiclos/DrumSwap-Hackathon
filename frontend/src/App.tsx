import React from "react";
import { useWallet } from "./hook/useWallet";
import ConnectButton from "./components/ConnectButton";
import Swap from "./components/Swap";

const App = () => {
  const { currentAccount } = useWallet();

  const handleClick = async () => {
    console.log("test");
  };

  return (
    <>
      <ConnectButton />
      <Swap></Swap>
      <button onClick={handleClick} className="btn btn-primary">
        button
      </button>
    </>
  );
};

export default App;
