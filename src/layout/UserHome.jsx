/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function UserHome() {
  const [workouts, setWorkouts] = useState(null);

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
    <div className="flex flex-wrap gap-3 justify-start">
      {workouts &&
        workouts.map((el) => (
          <WorkOut key={el.id} workout={el} />
        ))}
    </div>
  );
}

function WorkOut({ workout }) {
  return (
    <div className="bg-white rounded w-[340px] sm:w-[400px] md:w-[450px] lg:w-[340px] xl:w-[400px] overflow-hidden shadow-lg my-4 mx-3 flex-shrink flex ">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <img className="w-full h-auto" src={workout.img} alt="Workout" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{workout.workoutType}</div>
          <p className="text-gray-700 text-base">{workout.advice}</p>
        </div>
      </div>
    </div>
  );
}
