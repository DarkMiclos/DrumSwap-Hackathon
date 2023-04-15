import { IoMdArrowDropdown } from "react-icons/io";
import TokenSelectionButton from "./TokenSelectionButton";
import { useRecoilValue } from "recoil";
import { swapFromTokenState, swapToTokenState } from "../utils/atom";

const Pool = () => {
  const swapFromToken = useRecoilValue(swapFromTokenState);
  const swapToToken = useRecoilValue(swapToTokenState);

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
            <button className="btn btn-secondary w-[78px] mx-auto">
              0.01%
            </button>
            <button className="btn btn-secondary w-[78px] mx-auto">
              0.05%
            </button>
            <button className="btn btn-secondary w-[78px] mx-auto">
              0.25%
            </button>
            <button className="btn btn-secondary w-[78px] mx-auto">1%</button>
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
