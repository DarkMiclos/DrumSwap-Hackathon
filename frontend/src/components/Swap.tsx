import React from "react";
import { ethers } from "ethers";
import contractABI from "../abi/drumfactory.json";
import { getEthereum } from "../utils/ethereum";
import TokenSelectionButton from "./TokenSelectionButton";
import { useRecoilValue } from "recoil";
import { swapFromTokenState, swapToTokenState } from "../utils/atom";
import { IoMdArrowDropdown } from "react-icons/io";

const contractAdress = "0x802B7cCc3cc79aA41FCb67B9c4e73ec5B121A9d6";

const Swap = () => {
    const swapFromToken = useRecoilValue(swapFromTokenState);
    const swapToToken = useRecoilValue(swapToTokenState);

    let getContract = () => {
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(
            contractAdress,
            contractABI,
            signer
            );
            return contract;
        }
    }

    let createPair = (tokenAdressA: string, tokenAdressB: string) => {
        getContract()?.createPair(tokenAdressA, tokenAdressB);
    }

    let allPairs = () => {
        console.log(getContract()?.getPair("0xCea5BFE9542eDf828Ebc2ed054CA688f0224796f", "0x16B3b6c340aaB14A6696D66fA1C319B371AFeBd1"));
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-[60vw] w-min-[60vw] shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">Swap</h2>
                <div className="divider"></div>
                <label className="input-group flex justify-center">
                    <input type="text" placeholder="0.01" className="input input-bordered" />
                    <TokenSelectionButton
                        type="from"
                        className="select select-bordered rounded-sm"
                    >
                        {swapFromToken}
                    </TokenSelectionButton>
                </label>
                <label className="input-group flex justify-center">
                    <input type="text" placeholder="0.01" className="input input-bordered" />
                    <TokenSelectionButton
                        type="from"
                        className="select select-bordered rounded-sm"
                    >
                        {swapToToken}
                    </TokenSelectionButton>
                </label>
                <div className="divider"></div>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={allPairs}>Swap</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Swap;