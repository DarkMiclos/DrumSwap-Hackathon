import { useWallet } from "../hook/useWallet";

const ConnectButton = () => {
  const { connectWallet } = useWallet();

  const handleClick = () => {
    connectWallet();
  };

  return (
    <button onClick={handleClick} className="btn btn-primary">
      Connect
    </button>
  );
};

export default ConnectButton;
