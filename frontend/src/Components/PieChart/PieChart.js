import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const getBackgroundColor = (index) => {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    return colors[index % colors.length];
  };

  const aggregateData = (data) => {
    const categories = [];
    const amounts = [];
    const colors = [];

    data.forEach((item, index) => {
      const { category, amount } = item;

      if (categories.includes(category)) {
        const existingIndex = categories.indexOf(category);
        amounts[existingIndex] += amount;
      } else {
        categories.push(category);
        amounts.push(amount);
        colors.push(getBackgroundColor(index));
      }
    });

    return { categories, amounts, colors };
  };

  const aggregateIncome = aggregateData(incomes);
  const aggregateExpenses = aggregateData(expenses);

  const incomeData = {
    labels: aggregateIncome.categories,
    datasets: [
      {
        label: 'Income',
        data: aggregateIncome.amounts,
        backgroundColor: aggregateIncome.colors,
      },
    ],
  };

  const expenseData = {
    labels: aggregateExpenses.categories,
    datasets: [
      {
        label: 'Expenses',
        data: aggregateExpenses.amounts,
        backgroundColor: aggregateExpenses.colors,
      },
    ],
  };

  return (
    <PieChartStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <div className="income-section">
              <PieChart data={incomeData} title="Income" />
            </div>
            <div className="expense-section">
              <PieChart data={expenseData} title="Expenses" />
            </div>
          </div>
        </div>
      </InnerLayout>
    </PieChartStyled>
  );
}

const PieChartStyled = styled.div`
  .stats-con {
    display: flex;
    gap: 2rem;
  }

  .chart-con {
    display: flex;
    gap: 2rem;
    flex-grow: 1;
  }

  .income-section {
    flex-basis: 50%;
    background-color: #f2faf1;
    border: 2px solid #4caf50;
  }

  .expense-section {
    flex-basis: 50%;
    background-color: #fae3e3;
    border: 2px solid #f44336;
  }
`;

const PieChart = ({ data, title }) => {
  const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
  const percentageData = data.datasets[0].data.map((value) =>
    ((value / total) * 100).toFixed(2)
  );

  const updatedData = {
    ...data,
    datasets: [
      {
        ...data.datasets[0],
        data: percentageData,
      },
    ],
  };

  return (
    <div>
      <h2>{title}</h2>
      <Pie
        data={updatedData}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = data.labels[context.dataIndex];
                  const value = data.datasets[0].data[context.dataIndex];
                  const percentage = percentageData[context.dataIndex];
                  return `${label}: ${value} (${percentage}%)`;
                },
              },
            },
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        }
        }
      />
    </div>
  );
};

export default Dashboard;


