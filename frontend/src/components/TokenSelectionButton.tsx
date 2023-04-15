import { ReactNode, useState } from "react";
import { swapFromTokenState, swapToTokenState } from "../utils/atom";
import { useSetRecoilState } from "recoil";

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
  const setSwapFromToken = useSetRecoilState(swapFromTokenState);
  const setSwapToToken = useSetRecoilState(swapToTokenState);
  const [inputValue, setInputValue] = useState<string>("");

  const availableTokens: Token[] = [
    {
      name: "Ethereum",
      abbreviation: "ETH",
    },
    {
      name: "Binance Chain Native Token",
      abbreviation: "BNB",
    },
  ];

  const filteredTokes = availableTokens.filter(({ abbreviation }) =>
    abbreviation.includes(inputValue.toUpperCase())
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const abbreviation = e.currentTarget.textContent;
    if (!abbreviation) return;
    if (type === "from") {
      setSwapFromToken(abbreviation);
    } else if (type === "to") {
      setSwapToToken(abbreviation);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  if (type === "from") {
    return (
      <>
        <label htmlFor="FromTokenSelectionModal" className={className}>
          {children}
        </label>

        <input
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
              {inputValue === "" &&
                availableTokens.map(({ abbreviation }, index) => (
                  <button
                    key={index}
                    onClick={handleClick}
                    className="btn w-full"
                  >
                    {abbreviation}
                  </button>
                ))}
              {inputValue !== "" &&
                filteredTokes.map(({ abbreviation }, index) => (
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
        <label htmlFor="ToTokenSelectionModal" className={className}>
          {children}
        </label>

        <input
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
              {inputValue === "" &&
                availableTokens.map(({ abbreviation }, index) => (
                  <button
                    key={index}
                    onClick={handleClick}
                    className="btn w-full"
                  >
                    {abbreviation}
                  </button>
                ))}
              {inputValue !== "" &&
                filteredTokes.map(({ abbreviation }, index) => (
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
