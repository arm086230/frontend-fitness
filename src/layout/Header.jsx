import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const guestNav = [
  { to: "/", text: "Home" },
  // { to: "/login", text: "Login" },
  // { to: "/register", text: "Register" },
];

const userNav = [
  { to: "/", text: "Exercise Posture" },
  { to: "/BmiForm", text: "BMI" },
  { to: "/new", text: "Trainer" },
  { to: "/Booking", text: "Booking" },
];

const adminNav = [
  { to: "/", text: "Admin Workout" },
  { to: "/admin/showuser", text: "Show User" },
  { to: "/admin/showworkout", text: "Show Workout" },
  { to: "/admin/addTrainer", text: "Admin Trainer" },
  { to: "/admin/showtrainer", text: "Show Trainer" },
  { to: "/admin/booking", text: "Show Booking" },
];

const trainerNav = [
  { to: "/trainer/booking", text: "Show Booking" },
]

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const finalNav = user?.id
    ? user.role === "ADMIN"  ? adminNav: user.role === "TRAINER" ? trainerNav  : userNav : guestNav;

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-blue-400 flex justify-between items-center py-2 px-9 border-b border-gray-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-gray-600">
          Kratos Fitness : {user?.id ? user.username : "Guest"}
        </a>
      </div>
      <div className="flex-none lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`flex-none ${menuOpen ? "block" : "hidden"} lg:block`}
        id="menu"
      >
        <ul className="menu menu-horizontal px-1">
          {finalNav.map((el) => (
            <li key={el.to}>
              <Link
                to={el.to}
                className="text-base text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                {el.text}
              </Link>
            </li>
          ))}
          {user?.id && (
            <li>
              <Link
                to="#"
                onClick={hdlLogout}
                className="text-base text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
