// src/app/page.js
"use client";
import { useEffect, useState } from "react";
import { getData } from "@/app/services/Data.service";
import Chart from "@/app/components/Chart";

const symbols = [
  { value: "BTCUSDT", label: "Bitcoin (BTC/USDT)" },
  { value: "ETHUSDT", label: "Ethereum (ETH/USDT)" },
  { value: "ADAUSDT", label: "Cardano (ADA/USDT)" },
  { value: "BNBUSDT", label: "Binance Coin (BNB/USDT)" },
  { value: "XRPUSDT", label: "Ripple (XRP/USDT)" },
];

const intervals = [
  { value: "1m", label: "1 minute" },
  { value: "5m", label: "5 minutes" },
  { value: "15m", label: "15 minutes" },
  { value: "1h", label: "1 hour" },
  { value: "4h", label: "4 hours" },
  { value: "1d", label: "1 day" },
];

export default function Home() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1m");
  const [data, setData] = useState({ candles: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getData(symbol, interval);
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval]);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Crypto Chart</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <select
          value={symbol}
          onChange={handleSymbolChange}
          className="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {symbols.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={interval}
          onChange={handleIntervalChange}
          className="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {intervals.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <Chart data={data} symbol={symbol} interval={interval} />
      )}
    </div>
  );
}
