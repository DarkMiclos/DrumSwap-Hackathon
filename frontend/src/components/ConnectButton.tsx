import { useWallet } from "../hook/useWallet";

type Props = {
  className?: string;
};

const ConnectButton = ({ className }: Props) => {
  const { connectWallet } = useWallet();

  const handleClick = () => {
    connectWallet();
  };

  return (
    <button onClick={handleClick} className={`btn btn-primary ${className}`}>
      Connect
    </button>
  );
};

export default ConnectButton;
