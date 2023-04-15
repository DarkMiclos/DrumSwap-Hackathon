import React from "react";
import { Overrides, ethers } from "ethers";
import contractABI from "../abi/drumfactory.json";
import TokenSelectionButton from "./TokenSelectionButton";
import { useRecoilValue } from "recoil";
import { swapFromTokenState, swapToTokenState } from "../utils/atom";
import { useWallet } from "../hook/useWallet";

const contractAdress = "0x46098Af079142A0D03e224597E74C758f6c6B2d3";

const Swap = () => {
  const swapFromToken = useRecoilValue(swapFromTokenState);
  const swapToToken = useRecoilValue(swapToTokenState);
  const drumAddress = "0xfC605CB680AfDf4FA4B2222010668013929a3F3F";
  const usdtAddress = "0x9b75777bbb43ce39f80B33eEeaCb54141f90c4f8";
  const { currentAccount } = useWallet();

  let getContract = () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(contractAdress, contractABI, signer);
      return contract;
    }
  };

  let swapExactTokensForTokens = (
    amountIn: number,
    amountOutMin: number,
    path: string[],
    to: string,
    deadline: number,
    overrides: Overrides
  ) => {
    console.log(getContract());
    getContract()?.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      path,
      to,
      deadline,
      overrides
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-[60vw] w-min-[60vw] shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Swap</h2>
          <div className="divider"></div>
          <label className="input-group flex justify-center">
            <input
              type="text"
              placeholder="0.01"
              className="input input-bordered"
            />
            <TokenSelectionButton
              type="from"
              className="select select-bordered rounded-sm"
            >
              {swapFromToken}
            </TokenSelectionButton>
          </label>
          <label className="input-group flex justify-center">
            <input
              type="text"
              placeholder="0.01"
              className="input input-bordered"
            />
            <TokenSelectionButton
              type="to"
              className="select select-bordered rounded-sm"
            >
              {swapToToken}
            </TokenSelectionButton>
          </label>
          <div className="divider"></div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() =>
                swapExactTokensForTokens(
                  10,
                  0,
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
