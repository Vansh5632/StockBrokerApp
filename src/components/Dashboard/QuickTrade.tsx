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
    <div className="bg-white p-4 rounded-xl shadow-lg mt-6">
      <h2 className="text-lg font-semibold mb-2">Quick Trade</h2>
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleBuy}>
        Buy
      </button>
    </div>
  );
}
