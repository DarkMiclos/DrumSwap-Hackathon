import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { MetaMaskInpageProvider } from "@metamask/providers"

declare global {
    interface Window {
        ethereum?: ExternalProvider;
    }
}

export const getEthereum = (): ExternalProvider | null => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        const { ethereum } = window;
        return ethereum;
    }
    return null;
}