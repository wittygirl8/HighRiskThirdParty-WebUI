import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    x: {
        title: {
            display: true,
            text: 'Number of Media Coverage',
            font: {weight: 'bold'}
         },
      grid: {
        display: false,
      },
      ticks: {
        callback: function (value, index, ticks) {
          return Math.abs(this.getLabelForValue(value));
        },
      },
      display: true,
    },
    y: {
        title: {
            display: true,
            text: 'HCO',
            font: {weight: 'bold'}
         },
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        callback: function (value, index, ticks) {
          return this.getLabelForValue(value).substring(0, 9);
        },
      },
      display: true,
    },
  },
  responsive: true,
  aspectRatio: 1.4,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

export function CenteredBarChart({ mediaCoverageChartData, onBarClick }) {
    const onClick = (event, elements) => {
        if (elements.length === 0) {
          // Clicked on whitespace
          onBarClick(null);
        } else {
          // Clicked on a bar
          const index = elements[0].index;
          const id = mediaCoverageChartData.ids[index];
          onBarClick(id);
        }
      };
  return <Bar options={{ ...options, onClick }} data={mediaCoverageChartData} />;
}
