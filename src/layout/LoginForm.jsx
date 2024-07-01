import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ImgLogin from "../assets/img/804866b1da49206828b435134fb47c10.jpg";
import Swal from "sweetalert2";
export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const rs = await axios.post("http://localhost:8889/auth/login", input);
      console.log(rs.data.token);
      if (rs.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Complete",
          showConfirmButton: false,
          timer: 2000
        });
      }
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8889/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      console.log(rs1.data);
      setUser(rs1.data);
      navigate("/"); // Navigate to workout page upon successful login
    } catch (err) {
      console.log(err.message);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: 'The username or password is incorrect. Please try again.',
      });
    }
  };
  

  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row justify-center items-center min-h-screen py-12">
      <div className="w-full lg:w-1/2 lg:px-8">
        <img
          src={ImgLogin}
          alt=""
          className="object-cover w-full h-auto lg:rounded-lg"
        />
      </div>

      <div className="lg:p-8 md:p-12 p-6 w-full lg:w-1/2  flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={hdlSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={input.username}
                onChange={hdlChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={hdlChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
            <div className="mt-6 text-blue-500 text-center">
              <Link to="/register" className="hover:underline">
                Sign up Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
