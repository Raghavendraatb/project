import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

function Chart2() {
    const { incomes, expenses } = useGlobalContext();

  const aggregateData = (data) => {
    const categories = [];
    const amounts = [];

    data.forEach((item) => {
      const { category, amount } = item;

      if (categories.includes(category)) {
        const index = categories.indexOf(category);
        amounts[index] += amount;
      } else {
        categories.push(category);
        amounts.push(amount);
      }
    });

    return { categories, amounts };
  };

  const aggregateIncome = aggregateData(incomes);
  const aggregateExpenses = aggregateData(expenses);

  const incomeData = {
    labels: aggregateIncome.categories,
    datasets: [
      {
        label: 'Income',
        data: aggregateIncome.amounts,
        backgroundColor: [
          'green',
          'lime',
          'darkgreen',
          'mediumseagreen',
          'seagreen',
        ],
      },
    ],
  };

  const expenseData = {
    labels: aggregateExpenses.categories,
    datasets: [
      {
        label: 'Expenses',
        data: aggregateExpenses.amounts,
        backgroundColor: [
          'red',
          'tomato',
          'darkred',
          'salmon',
          'indianred',
        ],
      },
    ],
  };
  
  return (
    <ChartContainer>
      <ChartWrapper>
        <PieChart data={incomeData} />
      </ChartWrapper>
      <ChartWrapper>
        <PieChart data={expenseData} />
      </ChartWrapper>
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width:200px;
  height:200px;
`;

const ChartWrapper = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  width: 200px; /* Adjust the width to your desired size */
  height: 200px; /* Adjust the height to your desired size */
`;

const PieChart = ({ data }) => (
  <ChartWrapper>
    <Pie data={data} />
  </ChartWrapper>
);

export default Chart2;