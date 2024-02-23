import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function UserHome() {
  const [workouts, setWorkouts] = useState(null);
  // console.log(workouts)

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/auth/getworkout",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    getWorkouts();
  }, []);

  return (
    <div className="flex gap-3">
      {workouts && workouts.map((el) => <WorkOut key={el.id} workout={el} />)}
    </div>
  );
}

function WorkOut({ workout }) {
  // console.log(workout);
  return (
      <div className=" rounded w-[400px] overflow-hidden shadow-lg my-4">
        <div className="max-w-sm">
          <img className="" src={workout.img} alt="Workout" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{workout.workoutType}</div>
            <p className="text-gray-700 text-base">{workout.advice}</p>
          </div>
        </div>
      </div>
  );
}

