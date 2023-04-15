import { IoMdArrowDropdown } from "react-icons/io";
import TokenSelectionButton from "./TokenSelectionButton";
import { useRecoilValue } from "recoil";
import { swapFromTokenState, swapToTokenState } from "../utils/atom";
import { useState } from "react";

const Slippage = () => {
  const swapFromToken = useRecoilValue(swapFromTokenState);
  const swapToToken = useRecoilValue(swapToTokenState);
  const [feeTier, setFeeTier] = useState<number>(0);

  const feeTiers = ["0.1%", "0.3%", "0.5%", "1%", "optional"];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFeeTier(Number(e.currentTarget.id));
  };

  return (
    <div className="w-[400px] rounded-2xl mx-auto">
      {/* Select tokens */}
      <div className=" w-full h-[40px]">
        <div className=" w-full h-[32px] my-auto">
          <TokenSelectionButton
            type="from"
            className="btn btn-sm btn-secondary w-[40%] mx-3"
          >
            {swapFromToken}
            <IoMdArrowDropdown size={24} />
          </TokenSelectionButton>

          <TokenSelectionButton
            type="to"
            className="btn btn-sm btn-secondary w-[40%] float-right mx-3"
          >
            {swapToToken}
            <IoMdArrowDropdown size={24} />
          </TokenSelectionButton>
          <div className="clear-right" />
        </div>
      </div>
      <div className="w-full h-[calc(100%-40px)] bg-[#08060b] rounded-2xl">
        {/* Select fees */}
        <h3 className="text-md ml-3 mt-2 leading-10">Select Slippage</h3>
        <div className="h-full">
          <div className=" grid grid-cols-4 w-[90%] mx-auto h-fit bottom-[10px]">
            {feeTiers.map((fee, index) => (
              <button
                key={index}
                id={index.toString()}
                onClick={handleClick}
                className={`btn ${
                  feeTier === index ? "btn-secondary" : ""
                } no-animation w-[78px] mx-auto my-1`}
              >
                {fee}
              </button>
            ))}
          </div>
          {feeTier === 4 && (
            <div className="text-center">
              <input
                type="text"
                className="input input-secondary my-3 w-[90%]"
                placeholder="type slippage"
              />
            </div>
          )}

          {/* <button className="absolute btn btn-ghost w-[90%] left-0 right-0 bottom-0 mx-auto">
            Add Liquidity
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Slippage;
