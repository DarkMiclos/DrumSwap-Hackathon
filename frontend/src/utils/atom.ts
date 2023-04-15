import { atom } from "recoil";

export const swapFromTokenState = atom({
    key: "swapFromToken",
    default: "BNB"
});

export const swapToTokenState = atom({
    key: "swapToToken",
    default: "CAKE"
});