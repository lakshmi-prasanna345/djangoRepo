import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import PieChart from './piechart';
import { Chart, CategoryScale, LinearScale, BarElement, Legend, Title, Tooltip, registerables } from 'chart.js';
import DonutChart from './donut_chart';

Chart.register(CategoryScale, LinearScale, BarElement, Legend, Title, Tooltip, ...registerables);

function Barchart() {
    const [labels, setLabels] = useState([]);
    const [priceValues, setPriceValues] = useState([]);

    useEffect(() => {
        // Fetch data from your Django backend API
        axios.get('http://127.0.0.1:8000/products/get/')
            .then(response => {
                const responseData = response.data;

                // Assuming the response data has a structure like [{ pname: 'Product1', price: 100 }, ...]
                const newLabels = responseData.map(item => item.pname);
                const newPriceValues = responseData.map(item => item.price);

                setLabels(newLabels);
                setPriceValues(newPriceValues);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const options = {
        scales: {
            x: {
                type: 'category', // Use the 'category' scale type for labels
                labels: labels, // Provide the labels for the categories
            },
            y: {
                beginAtZero: true, // Customize y-axis options as needed
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expense Tracker',
            },
        },
    };

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Price Values',
                data: priceValues,
                backgroundColor: 'black',
            },
        ],
    };
    return (
        <div>
           
            <div style={{ width: '30%', float: "left" }}>
                <center><h2>BarChart</h2></center>
                <Bar data={chartData} />
            </div>
        </div>
    );
}

export default Barchart;
