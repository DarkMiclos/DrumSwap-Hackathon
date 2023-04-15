import React, { useState } from "react";
import { Overrides, ethers } from "ethers";
import contractABI from "../utils/abi.json";
import { useWallet } from "../hook/useWallet";

const contractAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const usdtAddress = "0x9b75777bbb43ce39f80B33eEeaCb54141f90c4f8";
const drumAddress = "0xfC605CB680AfDf4FA4B2222010668013929a3F3F";

const Swap = () => {
  const { currentAccount } = useWallet();
  const [fromTokenAmount, setFromTokenAmount] = useState(0);
  const [toTokenAmount, setToTokenAmount] = useState(0);

  const getContract = () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(contractAddress, contractABI, signer);
      return contract;
    }
  };

  const swapExactTokensForTokens = async (
    amountIn: number,
    amountOutMin: number,
    path: string[],
    to: string,
    deadline: number,
    overrides: Overrides
  ) => {
    await getContract()?.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      path,
      to,
      deadline,
      overrides
    );
  };

  const handleChangeFromAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromTokenAmount(Number(e.currentTarget.value));
  };

  const handleChangeToAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToTokenAmount(Number(e.currentTarget.value));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-[60vw] h-[60vh] shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Swap</h2>
          <div className="divider"></div>
          <label className="input-group flex justify-center">
            <input
              onChange={handleChangeFromAmount}
              type="text"
              placeholder="0.01"
              className="input input-bordered"
            />
          </label>
          <label className="input-group flex justify-center">
            <input
              onChange={handleChangeToAmount}
              type="text"
              placeholder="0.01"
              className="input input-bordered"
            />
          </label>
          <div className="divider"></div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() =>
                swapExactTokensForTokens(
                  fromTokenAmount,
                  toTokenAmount,
                  [drumAddress, usdtAddress],
                  currentAccount as string,
                  Math.floor(Date.now() / 1000) + 60 * 5,
                  {
                    gasLimit: 5900000,
                  }
                )
              }
            >
              Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
