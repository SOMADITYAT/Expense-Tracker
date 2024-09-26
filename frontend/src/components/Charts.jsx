import React from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ expenses }) => {
  const monthlyData = {};
  expenses.forEach((expense) => {
    const month = new Date(expense.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    monthlyData[month] = (monthlyData[month] || 0) + expense.amount;
  });

  const monthlyLabels = Object.keys(monthlyData);
  const monthlyValues = Object.values(monthlyData);

  const lineChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyValues,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // Prepare data for category breakdown (Pie Chart)
  const categoryData = {};
  expenses.forEach((expense) => {
    categoryData[expense.category] =
      (categoryData[expense.category] || 0) + expense.amount;
  });

  const pieLabels = Object.keys(categoryData);
  const pieValues = Object.values(categoryData);

  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: "Category Breakdown",
        data: pieValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="charts-container">
      <h2>Monthly Expense Comparison</h2>
      <Line data={lineChartData} />
      <h2>Category Breakdown</h2>
      <Pie data={pieChartData} />
    </div>
  );
};

export default Charts;
