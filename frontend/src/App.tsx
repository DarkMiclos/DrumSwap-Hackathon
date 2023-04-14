import { useWallet } from "./hook/useWallet";
import ConnectButton from "./components/ConnectButton";

const App = () => {
  return (
    <>
      <div className="text-red-500">DrumSwap</div>
      <ConnectButton />
    </>
  );
};

export default App;
