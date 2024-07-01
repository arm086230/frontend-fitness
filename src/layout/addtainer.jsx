import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [input, setInput] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    age: "",
    sex: "",
    role:""
  });

  const fileInput = useRef(null);
  // const navigate = useNavigate();

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !input.name ||
        !input.username ||
        !input.email ||
        !input.password ||
        !input.confirmPassword ||
        !input.phone ||
        !input.age ||
        !input.sex ||
        !input.role


      ) {
        alert("Please fill in all fields");
      } else if (input.password !== input.confirmPassword) {
        alert("Please check confirm password");
      } else if (!isValidPhoneNumber(input.phone)) {
        alert("Please enter a valid 10-digit phone number");
      } else {
        const file = fileInput.current?.files[0];
        const formData = new FormData();

        Object.entries(input).forEach(([key, value]) => {
          formData.append(key, value);
          console.log(value);
        });

        if (file) {
          formData.append("image", file);
        }

        const rs = await axios.post(
          "http://localhost:8889/auth/register",
          formData
        );
        console.log(rs);
        if (rs.status === 200) {
          alert("Register Successful");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
    console.log(input);
  };

  return (
    <div
      className="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6"
      onSubmit={hdlSubmit}
    >
      <div className="text-center mb-16">
        <a href="javascript:void(0)">
          <img src="" alt="logo!!" className="w-52 inline-block" />
        </a>
        <h4 className="text-base font-semibold mt-3">
          Sign up into your account
        </h4>
      </div>
      <form>
        <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
          <div>
            <label className="text-sm mb-2 block">Full Name</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={hdlChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">User Name</label>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={hdlChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Email </label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={hdlChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Mobile No.</label>
            <input
              type="text"
              name="phone"
              value={input.phone}
              onChange={hdlChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter mobile number"
            />
          </div>

          <div>
            <label className="text-sm mb-2 block">Age</label>
            <input
              type="text"
              name="age"
              value={input.age}
              onChange={hdlChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter age"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mt-2">
              <span className="label-text text-black mb-1 block">Gender</span>
              <select
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-blue-500"
                name="sex"
                value={input.sex}
                onChange={hdlChange}
              >
                <option value="" hidden>
                  Click to select gender
                </option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </label>
          </div>

          <div>
            <label className="text-sm mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={hdlChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter confirm password"
            />
          </div>

           <div className="mb-4">
            <label className="block text-gray-600 mt-2">
              <span className="label-text text-black mb-1 block">Role</span>
              <select
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-blue-500"
                name="role"
                value={input.role}
                onChange={hdlChange}
              >
                <option value="" hidden>
                  Click to select role
                </option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
                <option value="TRAINER">TRAINER</option>
              </select>
            </label>
          </div> 

          <div className="">
            <input
              type="file"
              className="w-full mt-10"
              name="image"
              ref={fileInput}
              accept="image/*"
            />
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
