import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
	console.log("PieChart Data:", data);

	if (!data || !data.labels || !data.data || data.labels.length === 0) {
		return <p>No data available</p>;
	}

	const chartData = {
		labels: data.labels,
		datasets: [
			{
				data: data.data,
				backgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#4BC0C0",
					"#E6E6E6",
				],
			},
		],
	};

	return <Pie data={chartData} />;
};

export default PieChart;
