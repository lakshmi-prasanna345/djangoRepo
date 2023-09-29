import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {Link} from "react-router-dom";

function DonutChart() {
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

    const donutData = {
        labels: labels,
        datasets: [
            {
                data: priceValues,
                backgroundColor: [
                    "green",
                    "grey",
                    "blue",
                    "black",
                    "pink",
                    "aqua",
                    "red"
                ],
            },
        ],
    };

    return (
        <div style={{ width: "30%", float: "left", marginLeft: "200px", height: "400px" }}>
            <center><h2>Donut Chart </h2></center>
            <Doughnut data={donutData} />
        </div>
    );
}

export default DonutChart;
