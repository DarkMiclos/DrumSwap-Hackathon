import { ReactNode, useRef, useState } from "react";
import { swapFromTokenState, swapToTokenState } from "../utils/atom";
import { useRecoilState } from "recoil";

type Props = {
  type: "from" | "to";
  children: ReactNode;
  className: string;
};

type Token = {
  name: string;
  abbreviation: string;
};

const TokenSelectionButton = ({ type, children, className }: Props) => {
  const [swapFromToken, setSwapFromToken] = useRecoilState(swapFromTokenState);
  const [swapToToken, setSwapToToken] = useRecoilState(swapToTokenState);
  const [inputValue, setInputValue] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  const availableTokens: Token[] = [
    {
      name: "Ethereum",
      abbreviation: "ETH",
    },
    {
      name: "Drum",
      abbreviation: "DRM",
    },
    {
      name: "Tether",
      abbreviation: "USDT",
    },
  ];

  const filterTokens = (type: "from" | "to") => {
    if (type === "from") {
      return availableTokens.filter(
        ({ abbreviation }) =>
          abbreviation.includes(inputValue.toUpperCase()) &&
          abbreviation !== swapFromToken
      );
    } else if (type === "to") {
      return availableTokens.filter(
        ({ abbreviation }) =>
          abbreviation.includes(inputValue.toUpperCase()) &&
          abbreviation !== swapToToken
      );
    } else {
      return [];
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const abbreviation = e.currentTarget.textContent;
    if (!abbreviation) return;
    if (type === "from") {
      setSwapFromToken(abbreviation);
    } else if (type === "to") {
      setSwapToToken(abbreviation);
    }
    ref.current!.checked = false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  if (type === "from") {
    return (
      <>
        {/* Button */}
        <label htmlFor="FromTokenSelectionModal" className={className}>
          {children}
        </label>

        {/* Modal */}
        <input
          ref={ref}
          type="checkbox"
          id="FromTokenSelectionModal"
          className="modal-toggle"
        />
        <label
          htmlFor="FromTokenSelectionModal"
          className="modal cursor-pointer"
        >
          <label className="modal-box relative h-full" htmlFor="">
            <h3 className="text-2xl font-bold mb-5">Select a Token</h3>
            <hr />

            <input
              onChange={handleChange}
              type="text"
              placeholder="Search Name"
              className="input input-bordered w-full my-5"
            />
            <div className="py-4">
              {filterTokens("from").map(({ abbreviation }, index) => (
                <button
                  key={index}
                  onClick={handleClick}
                  className="btn w-full"
                >
                  {abbreviation}
                </button>
              ))}
            </div>
          </label>
        </label>
      </>
    );
  } else if (type === "to") {
    return (
      <>
        {/* Button */}
        <label htmlFor="ToTokenSelectionModal" className={className}>
          {children}
        </label>

        {/* Modal */}
        <input
          ref={ref}
          type="checkbox"
          id="ToTokenSelectionModal"
          className="modal-toggle"
        />
        <label htmlFor="ToTokenSelectionModal" className="modal cursor-pointer">
          <label className="modal-box relative h-full" htmlFor="">
            <h3 className="text-2xl font-bold mb-5">Select a Token</h3>
            <hr />

            <input
              onChange={handleChange}
              type="text"
              placeholder="Search Name"
              className="input input-bordered w-full my-5"
            />
            <div className="py-4">
              {filterTokens("to").map(({ abbreviation }, index) => (
                <button
                  key={index}
                  onClick={handleClick}
                  className="btn w-full"
                >
                  {abbreviation}
                </button>
              ))}
            </div>
          </label>
        </label>
      </>
    );
  } else {
    return <></>;
  }
};

export default TokenSelectionButton;
