import { useEffect } from "react";
import { useWallet } from "../hook/useWallet";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
  const { currentAccount } = useWallet();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">DrumSwap</a>
      </div>
      <div className="flex-none">
        {currentAccount && (
          <button className="btn btn-ghost mx-2">
            {currentAccount?.slice(0, 6) + "..." + currentAccount?.slice(-4)}
          </button>
        )}

        {!currentAccount && <ConnectButton className="mx-2" />}
      </div>
    </div>
  );
};

export default Navbar;
