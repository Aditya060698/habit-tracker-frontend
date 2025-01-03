import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Graphs(props) {
  const [analyticsData, setAnalyticsData] = useState({});
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  
  useEffect(() => {
      axios
        .get(`http://localhost:8000/api/habits/${props.userId}/history`, {
          params: { startDate, endDate },
          headers: {
            Authorization: `Bearer ${props.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          const data = response.data.reduce((acc, status) => {
            acc[status.date] = acc[status.date] || 0;
            acc[status.date] += status.completed ? 1 : 0;
            return acc;
          }, {});
          console.log(data);
          console.log(response.data);
          
          setAnalyticsData({
            labels: Object.keys(data),
            datasets: [
              {
                label: "Habits Completed",
                data: Object.values(data),
                backgroundColor: "rgba(75,192,192,0.4)",
              },
            ],
          });
        }).catch((error) => {
          console.log(error);
        });
 
  }, [startDate, endDate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* <h1 className="text-4xl font-bold mb-6">Habit Analytics</h1> */}
      <div className="mb-4">
        <label className="mr-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="mr-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1"
        />
      </div>

      {analyticsData.labels && (
        <Bar
          data={analyticsData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true },
              title: { display: true, text: 'Habit Analytics' },
            },
          }}
        />
      )}
    </div>
  );
}

export default Graphs;
