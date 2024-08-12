import React from "react";
import Img from "../assets/img/black and white gym logo -  PosterMyWall.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-4 sm:p-9 grid grid-cols-1 sm:grid-cols-2 gap-5 place-items-center min-h-[600px]">
      <div className="">
        <div className="space-y-7 text-black order-2 sm:order-1">
          <h1 className="text-6xl">Spartan Fitness</h1>
          <p className="lg:pr-64">
            At the core of Spartan Fitness lies a philosophy inspired by the
            ancient Spartans, known for their unmatched discipline, strength,
            and resilience
          </p>
          <div>
            <Link to="/login">
              <button className="bg-gradient-to-r from-blue-400 via-teal-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-500 hover:via-g hover:to-cyan-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md hover:shadow-lg group focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 active:translate-y-2 active:shadow-sm">
                Login Now
              </button>
            </Link>
            <Link to="/register" className="ml-3">
              <button className="bg-gradient-to-r from-blue-400 via-teal-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-500 hover:via-blue-400 hover:to-cyan-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md hover:shadow-lg group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 active:translate-y-2 active:shadow-sm">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <img src={Img} alt="Healthy Meal" />
      </div>
    </div>
  );
}
