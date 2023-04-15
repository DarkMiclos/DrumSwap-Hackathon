import React from "react";
import { ethers } from "ethers";
import contractABI from "../abi/drumfactory.json";
import { getEthereum } from "../utils/ethereum";

const contractAddress = "0x802B7cCc3cc79aA41FCb67B9c4e73ec5B121A9d6";

const Swap = () => {
  const getContract = () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(contractAddress, contractABI, signer);
      return contract;
    }
  };

  const createPair = (tokenAddressA: string, tokenAddressB: string) => {
    getContract()?.createPair(tokenAddressA, tokenAddressB);
  };

  const allPairs = async () => {
    const pair = await getContract()?.getPair(
      "0xCea5BFE9542eDf828Ebc2ed054CA688f0224796f",
      "0x16B3b6c340aaB14A6696D66fA1C319B371AFeBd1"
    );
    console.log(pair);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-[60vw] h-[60vh] shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Swap</h2>
          <div className="divider"></div>
          <label className="input-group flex justify-center">
            <input
              type="text"
              placeholder="0.01"
              className="input input-bordered"
            />
            <select className="select select-bordered">
              <option disabled selected>
                ETH{" "}
              </option>
              <option>T-shirts</option>
              <option>Mugs</option>
            </select>
          </label>
          <label className="input-group flex justify-center">
            <input
              type="text"
              placeholder="0.01"
              className="input input-bordered"
            />
            <select className="select select-bordered">
              <option disabled selected>
                ETH{" "}
              </option>
              <option>T-shirts</option>
              <option>Mugs</option>
            </select>
          </label>
          <div className="divider"></div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={allPairs}>
              Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
