// src/app/page.js
"use client";
import { useEffect, useState } from "react";
import { getData } from "@/app/services/Data.service";
import Chart from "@/app/components/Chart";

export default function Home() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1m");
  const [data, setData] = useState({ candles: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(symbol, interval);
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [symbol, interval]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Crypto Chart</h1>
      <Chart data={data} symbol={symbol} interval={interval} />
    </div>
  );
}
