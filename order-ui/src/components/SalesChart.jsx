// File: src/components/SalesChart.jsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = ({ orders }) => {
    // Process order data to get total sales per day
    const salesData = orders.reduce((acc, order) => {
        const date = new Date(order.orderDate).toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD format for easy sorting
        acc[date] = (acc[date] || 0) + order.orderAmount;
        return acc;
    }, {});

    // Sort dates to ensure the chart is in chronological order
    const sortedLabels = Object.keys(salesData).sort();
    const sortedDataValues = sortedLabels.map(label => salesData[label]);

    const chartData = {
        labels: sortedLabels,
        datasets: [
            {
                label: 'Daily Sales (₹)',
                data: sortedDataValues,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Daily Sales Analytics' },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return <Bar options={options} data={chartData} />;
};

export default SalesChart;
