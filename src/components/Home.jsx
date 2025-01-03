// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import moment from "moment";
// import Navbar from "./Navbar";
// function App() {
//   const [habits, setHabits] = useState([]);
//   const [newHabit, setNewHabit] = useState("");
//   const [selectedDate, setSelectedDate] = useState(
//     moment().format("YYYY-MM-DD")
//   );
//   const location = useLocation();
//   const props = location.state;

//   useEffect(() => {
//     try {
//       console.log(props);

//       axios
//         .get(`http://localhost:8000/api/habits/${props.userId}`, {
//           headers: {
//             Authorization: `Bearer ${props.token}`,
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         })
//         .then((response) => {
//           setHabits(response.data);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   }, [props]);

//   const addHabit = () => {
//     try {
//       axios
//         .post(
//           "http://localhost:8000/api/habits",
//           {
//             user: {
//               id: props.userId,
//               email: props.email,
//               username: props.username,
//             },
//             habitName: newHabit,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${props.token}`,
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         )
//         .then((response) => {
//           setHabits([...habits, response.data]);
//           setNewHabit("");
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const toggleHabitCompletion = (habitId, completed) => {
//     axios
//       .post(
//         `http://localhost:8000/api/habits/${habitId}/status`,
//         {
//           date: selectedDate,
//           completed: completed,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${props.token}`,
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       )
//       .then(() => {
//         alert("Habit status updated!");
//       }).catch((error) => {
//         alert("Error updating habit status:", error);
//       });
//   };
  
//   return (
//     <div>
//       <Navbar {...props} />
//       <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//         <h1 className="text-4xl font-bold mb-6">Habit Tracker</h1>
//         <div className="flex items-center mb-4">
//           <input
//             type="text"
//             value={newHabit}
//             onChange={(e) => setNewHabit(e.target.value)}
//             placeholder="New Habit"
//             className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-64"
//           />
//           <button
//             onClick={addHabit}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             Add Habit
//           </button>
//         </div>
//         <div className="flex space-x-8">
//           <div className="bg-white w-96 shadow-md rounded-lg p-4">
//             <h2 className="text-xl font-bold mb-4">Habits</h2>
//             <ul>
//               {habits.map((habit) => (
//                 <li
//                   key={habit.id}
//                   className="p-4 border-b border-gray-200 last:border-b-0"
//                 >
//                   {habit.habitName}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="bg-white w-96 shadow-md rounded-lg p-4">
//             <h2 className="text-xl font-bold mb-4">Status</h2>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
//             />
//             <ul>
//               {habits.map((habit) => (
//                 <li
//                   key={habit.id}
//                   className="p-4 border-b border-gray-200 last:border-b-0 flex justify-between"
//                 >
//                   <span>{habit.habitName}</span>
//                   <input
//                     type="checkbox"
//                     onChange={(e) =>
//                       toggleHabitCompletion(habit.id, e.target.checked)
//                     }
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Navbar from "./Navbar";

function App() {
  const [habits, setHabits] = useState([]);
  const [habitStatus, setHabitStatus] = useState({});
  const [newHabit, setNewHabit] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const maxDate = moment().format("YYYY-MM-DD");
  const minDate = moment().subtract(1, "year").format("YYYY-MM-DD");
  const location = useLocation();
  const props = location.state;

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8000/api/habits/${props.userId}`, {
          headers: {
            Authorization: `Bearer ${props.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          setHabits(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [props]);

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`http://localhost:8000/api/habits/${props.userId}/status`, {
          params: { date: selectedDate },
          headers: {
            Authorization: `Bearer ${props.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const statusMap = {};
          response.data.forEach((status) => {
            statusMap[status.habit.id] = status.completed;
          });
          setHabitStatus(statusMap);
        })
        .catch((err) => console.error("Error fetching habit status:", err));
    }
  }, [selectedDate, props]);

  const addHabit = () => {
    try {
      axios
        .post(
          "http://localhost:8000/api/habits",
          {
            user: {
              id: props.userId,
              email: props.email,
              username: props.username,
            },
            habitName: newHabit,
          },
          {
            headers: {
              Authorization: `Bearer ${props.token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          setHabits([...habits, response.data]);
          setNewHabit("");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleHabitCompletion = (habitId) => {
    const completed = !habitStatus[habitId];
    axios
      .post(
        `http://localhost:8000/api/habits/${habitId}/status`,
        {
          date: selectedDate,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        setHabitStatus({ ...habitStatus, [habitId]: completed });
      })
      .catch((error) => {
        console.error("Error updating habit status:", error);
      });
  };

  const getTileColor = (habitId) => {
    const today = moment().format("YYYY-MM-DD");
    const isPast = moment(selectedDate).isBefore(today);

    if (habitStatus[habitId]) return "bg-green-500"; // Completed
    if (isPast) return "bg-red-500"; // Past and not completed
    return "bg-yellow-500"; // Default (not completed)
  };

  return (
    <div>
      <Navbar {...props} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold mb-6">Habit Tracker</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="New Habit"
            className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-64"
          />
          <button
            onClick={addHabit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Habit
          </button>
        </div>
        <div className="flex space-x-8">
          <div className="bg-white w-96 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Habits</h2>
            <ul>
              {habits.map((habit) => (
                <li
                  key={habit.id}
                  className={`p-4 border-b border-gray-200 last:border-b-0 ${getTileColor(
                    habit.id
                  )}`}
                >
                  {habit.habitName}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white w-96 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Status</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
              min={minDate}
              max={maxDate}
            />
            <ul>
              {habits.map((habit) => (
                <li
                  key={habit.id}
                  className={`p-4 border-b border-gray-200 last:border-b-0 flex justify-between cursor-pointer ${getTileColor(
                    habit.id
                  )}`}
                  onClick={() => toggleHabitCompletion(habit.id)}
                >
                  <span>{habit.habitName}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
