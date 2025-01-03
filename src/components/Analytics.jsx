import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Graphs from "./Graphs";
function Analytics() {
  const [habitStats, setHabitStats] = useState([]);
  
  const location = useLocation();
  const props = location.state;

  useEffect(() => {
    console.log(props);

    axios
      .get(`http://localhost:8000/api/analytics/${props.userId}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setHabitStats(response.data);
      });
  }, [props]);

  return (
    <div>
      <Navbar {...props} />
      <div className=" bg-gray-100 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold mb-6">Habit Analytics</h1>
        <div className="bg-white w-96 shadow-md rounded-lg p-6">
          {habitStats.map((stat) => (
            <div key={stat.habitName} className="mb-4">
              <h2 className="text-lg font-semibold">{stat.habitName}</h2>
              <p className="text-sm text-gray-600">
                Completion Rate: {stat.completionRate}%
              </p>
              <div className="w-full bg-gray-200 h-4 rounded-full mt-2">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${stat.completionRate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Graphs {...props}/>
    </div>
  );
}

export default Analytics;
