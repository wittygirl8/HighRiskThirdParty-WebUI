import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: "false",
    },
    title: {
      display: false,
    },
  },
};

export function LineChart({data}) {
  return <Line options={options} data={data.data} />;
}
