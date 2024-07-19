
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

// export const options = {
//   indexAxis: "x",
//   elements: {
//     bar: {
//       borderWidth: 2,
//     },
//   },
//   scales: {
//     y: {
//       grid: {
//         display: false,
//       },
//       ticks: {
//         display: false,
//       },
//       display: true,
//     },
//     x: {
//       grid: {
//         display: false,
//       },
//       ticks: {
//         display: false,
//       },
//       display: true,
//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       display: false,
//     },
//     title: {
//       display: false,
//     },
//   },
// };

// export function BarChart({ connectionsChartData }) {
//   return <Bar options={options} data={connectionsChartData} />;
// }

export const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
      display: true,
      title: {
            display: true,
            text: 'Number of HCOs',
            font: {weight: 'bold'}
         },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
      display: true,
      title: {
            display: true,
            text: 'Connection Strength',
            font: {weight: 'bold'}
         },
    },
  },
  responsive: true,
  aspectRatio: 1.4,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

export function BarChart({ connectionsChartData, onBarClick }) {
  const onClick = (event, elements) => {
    if (elements.length === 0) {
      // Clicked on whitespace
      onBarClick(null);
    } else {
      // Clicked on a bar
      const index = elements[0].index;
      const priority = connectionsChartData.labels[index];
      onBarClick(priority);
    }
  };

  return <Bar options={{ ...options, onClick }} data={connectionsChartData} />;
}
