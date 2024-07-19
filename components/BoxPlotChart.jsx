"use client";

import React from "react";
import { Chart as ChartJS, registerables } from "chart.js/auto";

import { Chart } from "react-chartjs-2";
import {
  BoxPlotController,
  BoxAndWiskers,
} from "@sgratzl/chartjs-chart-boxplot";

ChartJS.register(...registerables, BoxPlotController, BoxAndWiskers);

function randomValues(count, min, max) {
  const delta = max - min;
  return Array.from({ length: count }).map(() => Math.random() * delta + min);
}

const data = {
  // define label tree
  labels: ["X"],
  datasets: [
    {
      label: "",
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderColor: "rgba(207, 88, 29, 0.7)",
      borderWidth: 4,
      outlierStyle: "circle",
      outlierBackgroundColor: "#000",
      outlierBorderColor: "#000",
      // yellow version
      // outlierBackgroundColor: "#FFEF98",
      // outlierBorderColor: "#6E3B00",
      outlierRadius: 3,
      outlierBorderWidth: 2,
      padding: 0,
      itemRadius: 2,
      itemBackgroundColor: "#000",
      data: [
        {
          min: 137.94,
          q1: 250.0,
          median: 500.0,
          q3: 800.0,
          max: 202070.0,
        },
      ],
    },
  ],
};

const options = {
  indexAxis: "y",
  scales: {
    x: {
      type: "logarithmic",
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      display: false,
    },
  },

  plugins: {
    legend: {
      display: false,
    },
  },
};

export function BoxPlotChart() {
  return (
    <Chart type="boxplot" options={options} data={data} className="mb-5 mx-5" />
  );
}
