// src/app/services/Data.service.js
import axios from "axios";
import CandlePoint from "@/app/lib/CandlePoint";

export async function getData(symbol = "BTCUSDT", interval = "1m") {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=60`
    );

    const candles = response.data.map((k) => {
      return new CandlePoint(k[0], k[1], k[2], k[3], k[4]);
    });

    return {
      candles,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { candles: [] };
  }
}
