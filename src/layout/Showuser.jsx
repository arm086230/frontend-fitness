import React from 'react'
import { useEffect , useState } from 'react'
import axios from 'axios'

export default function Showuser() {
  const [user, setUser] = useState([])

  useEffect(()=> {
    const getUsers = async () =>{
      try{
        const token = localStorage.getItem('token')
        const response = await axios.get(
          'http://localhost:8889/auth/getuser',
          {
            headers : {
              Authorization : `Bearer ${token}`
            }
          }
        )
        setUser(response.data)
      }catch(error){
        console.log(error)
      }
    }
    getUsers()
  },[])
  return (
    <div>
      {Array.isArray(user) && user.map((item)=> (<Users key={item.id} user={item}/>))}
    </div>
  )
}
function Users ({user}){
  const [isDelete , setDelete] = useState(true)
  const hdlDeleteUser = (e) =>{
    e.preventDefault();
    const deleteUser = async () =>{
      try{
        const token = localStorage.getItem("token")
      const id = user.id
      const response = await axios.delete(`http://localhost:8889/auth//deluser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    alert('deleted success')
    setDelete(!isDelete)
    window.location.reload()

      }catch(error){
        console.log(error)
      }
    }
    deleteUser()
  }
  
  return (
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      <tr className="hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="text-indigo-600 hover:text-indigo-900" onClick={hdlDeleteUser}>Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  )
}
