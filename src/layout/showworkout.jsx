import React, { useState , useEffect } from 'react'
import axios from 'axios'

export default function showworkout() {
    const [workout , setWorkout] = useState([])
    useEffect(() =>{
        const getWorkout = async () =>{
            try{
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:8889/auth/getworkout",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                )
                setWorkout(response.data)
                console.log(response.data)
            }catch (error){
                console.log(error)
            }
        }
        getWorkout()

    },[])
  return (
    <div>
      {Array.isArray(workout) && workout.map((item) =>(
        <Workout key={item.id} workout={item} />
      ))}
    </div>
  )
}
function Workout ({workout}){
    const [isDelete, setIsDelete] = useState(true)

    const hdlDeleteworkout = (e) =>{
      e.preventDefault();
      // alert(555)
      const Deleteworkout =  async () => {
        try {
          const token = localStorage.getItem("token");
          const workouts = workout.id
          // alert(delebooks)
          const response = await axios.delete(
            `http://localhost:8889/auth/del/${workouts}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsDelete(!isDelete)
          window.location.reload()
          // console.log(response.data)
        } catch (error) {
          console.log(error)
  
        } finally {
          setIsDelete(true)
        }
      }
      Deleteworkout()
    }
    return(
        <div>
            {isDelete && (
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UserId</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">img</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advice</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WorkoutType</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WorkoutDate</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{workout.id}</td>
            <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{workout.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{workout.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{workout.img}</td>
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{workout.advice}</td>
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{workout.workoutType}</td>
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{workout.WorkoutDate}</td>


              <td className="px-6 py-4 whitespace-nowrap">
                <button 
                className="text-indigo-600 hover:text-indigo-900"
                onClick={hdlDeleteworkout}
                >
                  Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      )}
        </div>
    )

}


