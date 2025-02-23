// import { useState, useEffect } from "react";

// export default function MarketOverview() {
//   const [stockData, setStockData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchStockData() {
//       try {
//         const response = await fetch(`/api/marketData`);
//         const data = await response.json();

//         if (data.error) {
//           console.log("Error fetching stock data:", data.error);
//         } else {
//           setStockData(data);
//         }
//       } catch (error) {
//         console.error("Error fetching stock data:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchStockData();
//     const interval = setInterval(fetchStockData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Overview</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full leading-normal">
//           <thead>
//             <tr>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Stock
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Price
//               </th>
//               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Change
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {stockData.map((stock) => (
//               <tr key={stock.symbol}>
//                 <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                   <div className="flex items-center">
//                     <div className="ml-3">
//                       <p className="text-gray-900 whitespace-no-wrap">{stock.name}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                   <p className="text-gray-900 whitespace-no-wrap">₹{stock.price}</p>
//                 </td>
//                 <td className={`px-5 py-5 border-b border-gray-200 text-sm ${stock.change.includes("-") ? "text-red-500" : "text-green-500"}`}>
//                   {stock.change}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }