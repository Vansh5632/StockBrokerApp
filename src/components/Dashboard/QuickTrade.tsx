import { useRecoilState } from "recoil";
import { portfolioState } from "../../store/portfolioAtom";
import { useState } from "react";

export default function QuickTrade() {
  const [portfolio, setPortfolio] = useRecoilState(portfolioState);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleBuy = () => {
    const parsedAmount = parseInt(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (parsedAmount > portfolio.funds) {
      setError("Insufficient funds.");
      return;
    }
    setPortfolio((prev) => ({
      ...prev,
      funds: prev.funds - parsedAmount,
    }));
    setAmount("");
    setError("");
  };

  const handleSell = () => {
    const parsedAmount = parseInt(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setPortfolio((prev) => ({
      ...prev,
      funds: prev.funds + parsedAmount,
    }));
    setAmount("");
    setError("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Quick Trade</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter Amount"
          className="border rounded-md py-2 px-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <div className="flex justify-between space-x-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleBuy}
        >
          Buy
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleSell}
        >
          Sell
        </button>
      </div>
    </div>
  );
}
