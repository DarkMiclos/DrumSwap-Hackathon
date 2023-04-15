import React, { useState } from "react";
import { Overrides, ethers } from "ethers";
import contractABI from "../utils/abi.json";
import { useWallet } from "../hook/useWallet";
import { useRecoilValue } from "recoil";
import { swapFromTokenState } from "../utils/atom";
import { swapToTokenState } from "../utils/atom";
import TokenSelectionButton from "../components/TokenSelectionButton";

const contractAddress = "0x46098Af079142A0D03e224597E74C758f6c6B2d3";
const usdtAddress = "0x9b75777bbb43ce39f80B33eEeaCb54141f90c4f8";
const drumAddress = "0xfC605CB680AfDf4FA4B2222010668013929a3F3F";

const Swap = () => {
  const { currentAccount } = useWallet();
  const swapFromToken = useRecoilValue(swapFromTokenState);
  const swapToToken = useRecoilValue(swapToTokenState);
  const [fromTokenAmount, setFromTokenAmount] = useState(0);
  const [toTokenAmount, setToTokenAmount] = useState(0);

  const tokenNameToAddress = {
    USDT: usdtAddress,
    DRM: drumAddress,
  };

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

  const swapExactTokensForETH = async (
    amountIn: number,
    amountOutMin: number,
    path: string[],
    to: string,
    deadline: number,
    overrides: Overrides
  ) => {
    await getContract()?.swapExactTokensForETH(
      amountIn,
      amountOutMin,
      path,
      to,
      deadline,
      overrides
    );
  };

  const swapExactETHForTokens = async (
    amountOutMin: number,
    path: string[],
    to: string,
    deadline: number,
    overrides: Overrides
  ) => {
    await getContract()?.swapExactETHForTokens(
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
            <TokenSelectionButton
              type="from"
              className="select select-bordered rounded-sm"
            >
              {swapFromToken}
            </TokenSelectionButton>
          </label>
          <label className="input-group flex justify-center">
            <input
              onChange={handleChangeToAmount}
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
            {swapToToken === "ETH" ? (
              <button
                onClick={() =>
                  swapExactTokensForETH(
                    fromTokenAmount,
                    toTokenAmount,
                    [tokenNameToAddress[swapFromToken]],
                    currentAccount as string,
                    Math.floor(Date.now() / 1000) + 60 * 5,
                    {
                      gasLimit: 5900000,
                    }
                  )
                }
                className="btn btn-primary"
              >
                Swap
              </button>
            ) : swapFromToken === "ETH" ? (
              <button
                onClick={() => {
                  console.log("from ether");
                  swapExactETHForTokens(
                    toTokenAmount,
                    [tokenNameToAddress[swapToToken]],
                    currentAccount as string,
                    Math.floor(Date.now() / 1000) + 60 * 5,
                    {
                      gasLimit: 5900000,
                    }
                  );
                }}
                className="btn btn-primary"
              >
                Swap
              </button>
            ) : (
              <button
                onClick={() => {
                  console.log(fromTokenAmount, toTokenAmount);
                  swapExactTokensForTokens(
                    fromTokenAmount,
                    toTokenAmount,
                    [
                      tokenNameToAddress[swapFromToken],
                      tokenNameToAddress[swapToToken],
                    ],
                    currentAccount as string,
                    Math.floor(Date.now() / 1000) + 60 * 5,
                    {
                      gasLimit: 5900000,
                    }
                  );
                }}
                className="btn btn-primary"
              >
                Swap
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
