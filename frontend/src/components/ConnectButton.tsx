import { useWallet, isWalletConnected } from "../hook/useWallet";

type Props = {
  className?: string;
};

const ConnectButton = ({ className }: Props) => {
  const { connectWallet } = useWallet();

  const handleClick = () => {
    connectWallet();
  };
  if(isWalletConnected) {
    return (
      <div className="float-right">
        <button className={`btn btn-primary ${className}`}>
        Disconnect
      </button>
      </div>
    );
  }
  else {
    return (
    
      <button onClick={handleClick} className={`btn float-right btn-primary ${className}`}>
        Connect
      </button>
    );
  }
};

export default ConnectButton;
