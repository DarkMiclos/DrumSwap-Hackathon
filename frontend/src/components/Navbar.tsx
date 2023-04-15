import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../hook/useWallet";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
  const { currentAccount } = useWallet();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          DrumSwap
        </Link>
      </div>
      <div className="flex-none">
        <Link className="btn btn-ghost" to="/pool">
          Pool
        </Link>
        <Link className="btn btn-ghost" to="/swap">
          Swap
        </Link>
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
