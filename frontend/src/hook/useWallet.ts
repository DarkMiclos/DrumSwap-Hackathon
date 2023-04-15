import { useEffect, useState } from "react";
import { getEthereum } from "../utils/ethereum";

export let isWalletConnected: boolean = false;

function getIsWalletConnected() {
    return isWalletConnected;
}

export const useWallet = () => {
    const [currentAccount, setCurrentAccount] = useState<string>();
    const ethereum = getEthereum();

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            if (!Array.isArray(accounts)) return;
            console.log("Connected: ", accounts[0]);
            addChain();
            setCurrentAccount(accounts[0]);
            switchNetwork();
            // FIXME
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const addChain = async () => {
        try {
            if (!ethereum) return;
            ethereum.request({
                method: "wallet_addEthereumChain", params: [
                    {
                        chainId: "0x28C5A",
                        rpcUrl: "https://l2rpc.hackathon.taiko.xyz",
                    },
                ],
            })
        } catch (err) {
            console.log(err);
        }
    }

    const switchNetwork = async () => {
        try {
            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x28C5A" }] })
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                console.log("Make sure you have MetaMask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (!Array.isArray(accounts)) return;
            if (accounts.length !== 0) {
                const account = accounts[0];
                isWalletConnected = true;
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        if (!ethereum) return;
        ethereum.on('accountsChanged', () => {
            window.location.reload();
        });
    }, []);

    return {
        currentAccount, connectWallet, switchNetwork
    }
}
