import React from "react";
import { BigNumber, ethers } from "ethers";
import routerContractABI from "../abi/router.json";
import usdtAbi from "../abi/usdt.json";
import { swapFromTokenState, swapToTokenState } from "../utils/atom";
import TokenSelectionButton from "../components/TokenSelectionButton";
import { useRecoilValue } from "recoil";
import { useWallet } from "../hook/useWallet";

const routerContractAdress = "0x46098Af079142A0D03e224597E74C758f6c6B2d3";
const usdtTokenAdress = "0x9b75777bbb43ce39f80B33eEeaCb54141f90c4f8";
const drumTokenAdress = "0xfC605CB680AfDf4FA4B2222010668013929a3F3F";

const Pool = () => {
    const swapFromToken = useRecoilValue(swapFromTokenState);
    const swapToToken = useRecoilValue(swapToTokenState);
    const usdtAmount = ethers.utils.parseEther("1000");
    const drumAmount = ethers.utils.parseEther("1000");
    const { currentAccount } = useWallet();
    let signer: any;

    let getRouterContract = () => {
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            let contract = new ethers.Contract(
            routerContractAdress,
            routerContractABI,
            signer
            );
            return contract;
        }
    }

    let getUsdtContract = () => {
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            let contract = new ethers.Contract(
            usdtTokenAdress,
            usdtAbi,
            signer
            );
            return contract;
        }
    }

    let getDrumContract = () => {
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            let contract = new ethers.Contract(
            drumTokenAdress,
            usdtAbi,
            signer
            );
            return contract;
        }
    }

    let addLiquidity = async (tokenAdressA: string | undefined, tokenAdressB: string | undefined, amountADesired: BigNumber | undefined,
         amountBDesired: BigNumber | undefined, amountAMin: number | undefined,
        amountBMin: number | undefined, to: string | undefined,  deadline: any, gasLimit: any ) => {
        /*await getUsdtContract()?.approve(getRouterContract()?.address, usdtAmount,{
            gasLimit: 5900000
            });
        await getDrumContract()?.approve(getRouterContract()?.address, drumAmount,{
        gasLimit: 5900000
        });*/
        getRouterContract()?.addLiquidity(tokenAdressA, tokenAdressB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline, gasLimit)
        .then(() => console.log())
    ;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-[60vw] w-min-[60vw] shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">Add Liquidity</h2>
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
                    <button className="btn btn-primary" onClick={() => addLiquidity(usdtTokenAdress, 
                        drumTokenAdress, usdtAmount, drumAmount, 0, 0, currentAccount, Math.floor(Date.now() / 1000) + 60 * 10,
                        {
                            gasLimit: 4000000
                        }
                        )}>Add Liquidity</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Pool;