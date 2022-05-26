import React, {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from '../common/card';


const BarChart = ({expenses}) => {
    const [chartAttribute, setChartAttribute] = useState(null);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

      useEffect(() => {
        debugger;
        setChartAttribute(prepareChartData());
    }, [expenses]);

      const prepareChartData = () => {
        const allDates = expenses?.data?.map(expense => expense.date);
        const uniqueDates = [...new Set(allDates)];
        const expenseCategoryWise = uniqueDates.map((date) => {
            let dailyExpense = 0;
            expenses.data.map(expense => {
                if(expense.date.valueOf() === date.valueOf()) {
                    dailyExpense += Number(expense.expense);
                }
            });
            return dailyExpense;
        });
        
        const config = {
            labels: uniqueDates,
            datasets: [{
                label: 'Date wise expediture',
                backgroundColor: generateRandomColorMap(1),
                data: expenseCategoryWise
            }]
        };
        return config;
    }
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Date wise expenses',
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
           {chartAttribute && <Bar
           height="400px"
           width="400px"
            options={options}
            data={chartAttribute}
           />}
        </Card>    
    )
}

export default BarChart;