import ConnectButton from "./ConnectButton";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">DrumSwap</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <ConnectButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
