import React, { useState } from "react";
import { BigNumber, ethers } from "ethers";
import routerContractABI from "../abi/router.json";
import { swapFromTokenState, swapToTokenState } from "../utils/atom";
import TokenSelectionButton from "../components/TokenSelectionButton";
import { useRecoilValue } from "recoil";
import { useWallet } from "../hook/useWallet";

const routerContractAddress = "0x46098Af079142A0D03e224597E74C758f6c6B2d3";
const usdtTokenAddress = "0x9b75777bbb43ce39f80B33eEeaCb54141f90c4f8";
const drumTokenAddress = "0xfC605CB680AfDf4FA4B2222010668013929a3F3F";

const Pool = () => {
  const swapFromToken = useRecoilValue(swapFromTokenState);
  const swapToToken = useRecoilValue(swapToTokenState);
  const { currentAccount } = useWallet();
  const [fromTokenAmount, setFromTokenAmount] = useState(0);
  const [toTokenAmount, setToTokenAmount] = useState(0);

  const tokenNameToAddress = {
    USDT: usdtTokenAddress,
    DRM: drumTokenAddress,
  };

  let signer: any;

  let getRouterContract = () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      let contract = new ethers.Contract(
        routerContractAddress,
        routerContractABI,
        signer
      );
      return contract;
    }
  };

  const handleChangeFromAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromTokenAmount(Number(e.currentTarget.value));
  };

  const handleChangeToAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToTokenAmount(Number(e.currentTarget.value));
  };

  const addLiquidity = async (
    tokenAddressA: string | undefined,
    tokenAddressB: string | undefined,
    amountADesired: BigNumber | undefined,
    amountBDesired: BigNumber | undefined,
    amountAMin: number | undefined,
    amountBMin: number | undefined,
    to: string | undefined,
    deadline: any,
    gasLimit: any
  ) => {
    getRouterContract()
      ?.addLiquidity(
        tokenAddressA,
        tokenAddressB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline,
        gasLimit
      )
      .then(() => console.log());
  };

  const addLiquidityETH = async (
    token: string,
    amountTokenDesired: BigNumber | undefined,
    amountTokenMin: number | undefined,
    amountETHMin: number | undefined,
    to: string | undefined,
    deadline: any,
    gasLimit: any
  ) => {
    getRouterContract()
      ?.addLiquidityETH(
        token,
        amountTokenDesired,
        amountTokenMin,
        amountETHMin,
        to,
        deadline,
        gasLimit
      )
      .then(() => console.log());
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-[60vw] w-min-[60vw] shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Add Liquidity</h2>
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
                className="btn btn-primary"
                onClick={() =>
                  addLiquidityETH(
                    tokenNameToAddress[swapFromToken],
                    ethers.utils.parseEther(toTokenAmount.toString()),
                    0,
                    0,
                    currentAccount,
                    Math.floor(Date.now() / 1000) + 60 * 10,
                    {
                      gasLimit: 4000000,
                    }
                  )
                }
              >
                Add Liquidity
              </button>
            ) : swapFromToken === "ETH" ? (
              <button
                className="btn btn-primary"
                onClick={() =>
                  addLiquidityETH(
                    tokenNameToAddress[swapToToken],
                    ethers.utils.parseEther(fromTokenAmount.toString()),
                    0,
                    0,
                    currentAccount,
                    Math.floor(Date.now() / 1000) + 60 * 10,
                    {
                      gasLimit: 4000000,
                    }
                  )
                }
              >
                Add Liquidity
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() =>
                  addLiquidity(
                    tokenNameToAddress[swapFromToken],
                    tokenNameToAddress[swapToToken],
                    ethers.utils.parseEther(fromTokenAmount.toString()),
                    ethers.utils.parseEther(toTokenAmount.toString()),
                    0,
                    0,
                    currentAccount,
                    Math.floor(Date.now() / 1000) + 60 * 10,
                    {
                      gasLimit: 4000000,
                    }
                  )
                }
              >
                Add Liquidity
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pool;
