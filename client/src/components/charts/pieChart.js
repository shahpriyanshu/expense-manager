import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Card from '../common/card';

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

const PieChart = ({expenses}) => {
    const [chartAttribute, setChartAttribute] = useState(null);
    ChartJS.register(ArcElement, Tooltip, Legend);
    useEffect(() => {
        setChartAttribute(prepareChartData());
    }, [expenses]);

    const prepareChartData = () => {
        const allExpenseType = expenses?.data?.map(expense => expense.expenseType);
        const uniqueExpenseType = [...new Set(allExpenseType)];
        const expenseCategoryWise = uniqueExpenseType.map((expenseType) => {
            let categoryExpense = 0;
            expenses.data.map(expense => {
                if(expense.expenseType === expenseType) {
                    categoryExpense += Number(expense.expense);
                }
            });
            return categoryExpense;
        });
        const config = {
            labels: uniqueExpenseType,
            datasets: [{
                label: 'category wise expediture',
                backgroundColor: generateRandomColorMap(uniqueExpenseType.length),
                data: expenseCategoryWise
            }]
        };
        return config;
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Category wise expenses',
          },
        },
      };

    const generateRandomColorMap = (limit) => {
        let colorMap = [];
        while(limit > 0) {
            let maxVal = 0xFFFFFF; // 16777215
            let randomNumber = Math.random() * maxVal; 
            randomNumber = Math.floor(randomNumber);
            randomNumber = randomNumber.toString(16);
            let randColor = randomNumber.padStart(6, 0);   
            colorMap.push(`#${randColor.toUpperCase()}`);
            limit--;
        }
        return colorMap;
    }

    return (
        <Card>
           {chartAttribute && <Pie
            data={chartAttribute}
            options={options}
           />}
        </Card>    
    )
}

export default PieChart;