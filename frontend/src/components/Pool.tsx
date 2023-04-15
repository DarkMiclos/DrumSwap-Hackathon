import { IoMdArrowDropdown } from "react-icons/io";
import TokenSelectionButton from "./TokenSelectionButton";
import { useRecoilValue } from "recoil";
import { swapFromTokenState, swapToTokenState } from "../utils/atom";
import { useState } from "react";

const Pool = () => {
  const swapFromToken = useRecoilValue(swapFromTokenState);
  const swapToToken = useRecoilValue(swapToTokenState);
  const [feeTier, setFeeTier] = useState<number>(0);

  const feeTiers = ["0.01%", "0.05%", "0.25%", "1%"];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFeeTier(Number(e.currentTarget.id));
  };

  return (
    <div className="w-[400px] h-[200px] rounded-2xl m-10">
      {/* Select tokens */}
      <div className="relative w-full h-[40px]">
        <div className="absolute top-0 bottom-0 w-full h-[32px] my-auto">
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
        </div>
      </div>
      <div className="w-full h-[calc(100%-40px)] bg-[#08060b] rounded-2xl">
        {/* Select fees */}
        <div className="relative h-[calc(100%-60px)]">
          <div className="absolute grid grid-cols-4 w-full h-[48px] top-0 bottom-0 my-auto">
            {feeTiers.map((fee, index) => (
              <button
                key={index}
                id={index.toString()}
                onClick={handleClick}
                className={`btn ${
                  feeTier === index ? "btn-secondary" : ""
                } no-animation w-[78px] mx-auto`}
              >
                {fee}
              </button>
            ))}
          </div>
        </div>
        <div className="relative w-full h-[48px]">
          <button className="absolute btn btn-ghost w-[90%] left-0 right-0 mx-auto mb-5">
            Add Liquidity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pool;
