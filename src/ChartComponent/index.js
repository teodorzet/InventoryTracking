import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AnalyticsCharts = ({ inventory }) => {
  const valueDistribution = inventory.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  const valueRangeCounts = {
    "0-100": 0,
    "101-500": 0,
    "501-1000": 0,
    "1001+": 0,
  };

  inventory.forEach((item) => {
    if (item.value <= 100) valueRangeCounts["0-100"]++;
    else if (item.value <= 500) valueRangeCounts["101-500"]++;
    else if (item.value <= 1000) valueRangeCounts["501-1000"]++;
    else valueRangeCounts["1001+"]++;
  });

  const pieData = {
    labels: valueDistribution.map((item) => item.name),
    datasets: [
      {
        label: "Value Distribution",
        data: valueDistribution.map((item) => item.value),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(valueRangeCounts),
    datasets: [
      {
        label: "Item Count by Value Range",
        data: Object.values(valueRangeCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-center mb-2">
            Value Distribution
          </h3>
          <Pie data={pieData} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-center mb-2">
            Count of Items by Value Range
          </h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
