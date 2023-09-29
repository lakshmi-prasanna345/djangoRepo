import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Link } from "react-router-dom";

function PieChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from your Django backend API
        axios.get('http://127.0.0.1:8000/products/get/')
            .then(response => {
                const responseData = response.data;
                setData(responseData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Process the fetched data to extract necessary values
    const labels = data.map(item => item.pname);
    const priceValues = data.map(item => item.price);

    const pieData = {
        labels: labels,
        datasets: [
            {
                data: priceValues,
                backgroundColor: [
                    "aqua",
                    "black",
                    "red",
                    "grey",
                    "purple",
                    "orange"
                ],
            },
        ],
    };

    return (
        <div style={{ width: "20%", height: "600px", float: "right" }}>
            <center><h2>Pie Chart </h2></center>
            <Pie data={pieData} />
        </div>
    );
}

export default PieChart;
