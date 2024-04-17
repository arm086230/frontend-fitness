import axios from 'axios'
import {useState} from "react";
import useAuth from '../hooks/useAuth'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      const rs = await axios.post('http://localhost:8889/auth/login', input)
      console.log(rs.data.token)
      if (rs.status === 200) {
        alert('Login successful');
      }
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)
      
    }catch(err) {
      console.log( err.message)
    }
  }
  

  return (
<div className="flex justify-center items-center h-screen">
  <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 bg-gradient-to-b from-gray-300 gray-500 flex justify-center items-center flex-col gap-4">
    <div className="text-3xl mb-5 text-black">Login</div>
    <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>
      <label className="form-control">
        <div className="label">
          <span className="label-text text-black">Username</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          name="username"
          value={input.username}
          onChange={hdlChange}
        />
      </label>

      <label className="form-control">
        <div className="label">
          <span className="label-text text-black">Password</span>
        </div>
        <input
          type="password"
          className="input input-bordered w-full max-w-xs"
          name="password"
          value={input.password}
          onChange={hdlChange}
        />
      </label>

      <div className="flex justify-center">
        <button type="submit" className="btn btn-primary bg-pink-600 hover:bg-pink-700 text-white">
          Login
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
