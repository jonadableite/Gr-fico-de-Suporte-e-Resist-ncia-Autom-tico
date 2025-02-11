// src/app/components/Chart.js
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Chart({ data, symbol, interval }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const options = {
    chart: {
      type: "candlestick",
      height: 400,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    title: {
      text: `${symbol} - ${interval}`,
      align: "left",
      style: {
        fontSize: "16px",
        color: theme === "dark" ? "#F1F5F9" : "#334155",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: theme === "dark" ? "#CBD5E1" : "#64748B",
        },
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
      axisBorder: {
        color: theme === "dark" ? "#475569" : "#E2E8F0",
      },
      axisTicks: {
        color: theme === "dark" ? "#475569" : "#E2E8F0",
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: theme === "dark" ? "#CBD5E1" : "#64748B",
        },
      },
    },
    grid: {
      borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#10B981",
          downward: "#EF4444",
        },
      },
    },
    tooltip: {
      theme: theme,
      x: {
        formatter: function (val) {
          const date = new Date(val);
          return date.toLocaleString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        },
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 250,
          },
        },
      },
    ],
  };

  const series = [
    {
      data: data.candles.map((candle) => ({
        x: candle.getTime(),
        y: [
          candle.getOpen(),
          candle.getHigh(),
          candle.getLow(),
          candle.getClose(),
        ],
      })),
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <ApexCharts
        options={options}
        series={series}
        type="candlestick"
        width="100%"
        height="400px"
      />
    </div>
  );
}
