import { atom } from "recoil";

export const swapFromTokenState = atom({
    key: "swapFromToken",
    default: "USDT"
});

export const swapToTokenState = atom({
    key: "swapToToken",
    default: "DRM"
});