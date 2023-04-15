import React from "react";
import { useWallet, isWalletConnected } from "./hook/useWallet";
import ConnectButton from "./components/ConnectButton";
import Swap from "./components/Swap";
import Pool from "./components/Pool";
import Slippage from "./components/Slippage";

const App = () => {
  const { currentAccount } = useWallet();

  return (
    <>
      <ConnectButton />
      <Swap></Swap>
    </>
  );
};

export default App;
