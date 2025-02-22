import { useRecoilState } from "recoil";
import { portfolioState } from "../../store/portfolioAtom";
import { useState } from "react";

export default function QuickTrade() {
  const [portfolio, setPortfolio] = useRecoilState(portfolioState);
  const [amount, setAmount] = useState("");

  const handleBuy = () => {
    if (parseInt(amount) > 0) {
      setPortfolio((prev) => ({
        ...prev,
        funds: prev.funds - parseInt(amount),
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Trade</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter Amount"
          className="border rounded-md py-2 px-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleBuy}>
          Buy
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sell
        </button>
      </div>
    </div>
  );
}
