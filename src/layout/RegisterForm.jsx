import axios from "axios";
import { useState , useRef} from "react";

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
  });

  const fileInput = useRef(null)
  
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !input.name ||
        !input.username ||
        !input.email ||
        !input.password ||
        !input.confirmPassword
      ) {
        alert("Please fill in all fields");
      } else if (input.password !== input.confirmPassword) {
        alert("Please check confirm password");
      }

      const file = fileInput.current?.files[0]
      const formData = new FormData();

      Object.entries(input).forEach(([key , value]) =>{
        formData.append(key, value)
        console.log(value)
      })

      if (file){
        formData.append('image', file)
      }
      
      // console.log(input)
      const rs = await axios.post("http://localhost:8889/auth/register", formData);
      console.log(rs);
      if (rs.status === 200) {
        alert("Register Successful");
      }
      window.location.reload()
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 bg-gradient-to-b from-gray-300 gray-500 flex justify-center items-center">
      <div className="w-full max-w-xs">
        <div className="text-3xl mb-5 text-black">Register Form</div>
        <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
          <label className="form-control">
            <span className="label-text text-black">Name</span>
            <input
              type="text"
              className="input input-bordered w-full"
              name="name"
              value={input.name}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text text-black">Username</span>
            <input
              type="text"
              className="input input-bordered w-full"
              name="username"
              value={input.username}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text text-black">Email</span>
            <input
              type="email"
              className="input input-bordered w-full"
              name="email"
              value={input.email}
              onChange={hdlChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">Phone</span>
            <input
              type="text"
              className="input input-bordered w-full"
              name="phone"
              value={input.phone}
              onChange={hdlChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">Age</span>
            <input
              type="text"
              className="input input-bordered w-full"
              name="age"
              value={input.age}
              onChange={hdlChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">Gender</span>
            <select
              className="w-full"
              name="sex"
              value={input.sex}
              onChange={hdlChange}
            >
              <option value="" hidden>Click to select gender</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </label>

          <label className="form-control">
            <span className="label-text text-black">Password</span>
            <input
              type="password"
              className="input input-bordered w-full"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text text-black">Confirm Password</span>
            <input
              type="password"
              className="input input-bordered w-full"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
            />
          </label>
          <div>
          <input 
          type="file"
          className="w-full"
          name="image"
          ref={fileInput}
          accept="image/*" />
          </div>


          <button
            type="submit"
            className="btn btn-primary bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 md:px-4 md:py-3 rounded-md shadow-md transition-colors duration-300 text-lg md:text-xl mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
