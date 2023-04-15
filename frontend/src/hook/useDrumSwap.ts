import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/abi.json";
import { getEthereum } from "../utils/ethereum";

const CONTRACT_ADDRESS = "0x802B7cCc3cc79aA41FCb67B9c4e73ec5B121A9d6";
const CONTRACT_ABI = abi;

type Props = {
    currentAccount: string | undefined;
}

export const useDrumFactoryContract = ({ currentAccount }: Props) => {
    const [drumFactoryContract, setDrumFactoryContract] = useState<ethers.Contract>();
    const ethereum = getEthereum();

    const getDrumFactory = () => {
        try {
            if (!ethereum) return;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const DrumFactoryContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            setDrumFactoryContract(DrumFactoryContract);
        } catch (err) {
            console.log(err);
        }
    }

    const createPair = async (tokenA: string, tokenB: string) => {
        try {
            if (!ethereum) return;
            const txn = await drumFactoryContract?.createPair(tokenA, tokenB);
            await txn.wait();
            console.log("done");
        } catch (err) {
            console.log(err);
        }
    }

    const getPair = async (tokenA: string, tokenB: string) => {
        try {
            if (!ethereum) return;
            const txn = await drumFactoryContract?.getPair(tokenA, tokenB);
            await txn.wait();
            console.log("done");
        } catch (err) {
            console.log(err);
        }
    }

    const swap = async (amount0Out: number, amount1Out: number, to: string, data: number) => {
        try {
            if (!ethereum) return;
            const txn = await drumFactoryContract?.swap(amount0Out, amount1Out, to, data);
            await txn.wait();
            console.log("done");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDrumFactory()
    }, [currentAccount, ethereum]);

    return {
        createPair,
        getPair,
        swap
    }
}
