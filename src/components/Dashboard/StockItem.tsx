import React from "react";

interface StockItemProps {
    symbol: string;
    name: string;
    price: number;
    change: string;
    onRemove: (symbol: string) => void;
}

export default function StockItem({
    symbol,
    name,
    price,
    change,
    onRemove,
}: StockItemProps) {
    const isNegativeChange = change.startsWith("-");
    const changeColorClass = isNegativeChange ? "text-red-500" : "text-green-500";
    const changeIcon = isNegativeChange ? "↓" : "↑";

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500">{symbol}</p>
            </div>
            <div className="flex items-center space-x-6">
                <div className="text-right">
                    <p className="text-base font-medium text-gray-700">
                        ${price.toFixed(2)}
                    </p>
                    <p className={`text-sm font-medium ${changeColorClass}`}>
                        {changeIcon} {change}
                    </p>
                </div>
                <button
                    onClick={() => onRemove(symbol)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
