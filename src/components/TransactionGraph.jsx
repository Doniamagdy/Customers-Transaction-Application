import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TransactionGraph = ({ transactions, selectedCustomer }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Transaction Amount',
        data: [],
        borderColor: '#006161',
        tension: 0.4
      }
    ]
  });

  useEffect(() => {
    const filteredTransactions = selectedCustomer
      ? transactions.filter(t => t.customer_id === selectedCustomer)
      : transactions;

    const groupedData = filteredTransactions.reduce((acc, transaction) => {
      if (!acc[transaction.date]) {
        acc[transaction.date] = 0;
      }
      acc[transaction.date] += transaction.amount;
      return acc;
    }, {});

    const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));
    const amounts = sortedDates.map(date => groupedData[date]);

    setChartData({
      labels: sortedDates,
      datasets: [
        {
          ...chartData.datasets[0],
          data: amounts
        }
      ]
    });
  }, [transactions, selectedCustomer]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Total Transaction Amount per Day',
       
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default TransactionGraph;
