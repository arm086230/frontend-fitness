import React, {useState , useEffect} from 'react'
import axios from 'axios'

export default function Showtainer() {
  const [tainer , settainer] = useState([])
  useEffect(() =>{
    const gettainer = async () =>{
      try{
        const token = localStorage.getItem('token')
        const response = await axios.get(
          'http://localhost:8889/workout/gettrainer',
          {
            headers : {
              Authorization : `Bearer ${token}`
            }

          }
        )
          settainer(response.data)
          console.log(response.data)
      }catch (error){
        console.log(error)
      }
    }
    gettainer()
  },[])
  return(
    <div>
      {Array.isArray(tainer) && tainer.map((item) =>(
        <Tainer key={item.id} tainer={item} />
      ))}
    </div>

  )
  
}
function Tainer({tainer}) {
  const [Delete , setDelete] = useState(true)
  const hdlDeletetainer = (e) =>{
    e.preventDefault();
    const Deletetainer = async () =>{
      try{
        const token = localStorage.getItem('token')
        const tainers = tainer.id
        const response = await axios.delete(
          `http://localhost:8889/workout/deletetrainer/${tainers}`,
          {
            headers : {
              Authorization : `Bearer ${token}`
            }
          }
        )
        setDelete(!Delete)
        window.location.reload()
      }catch(error){
        console.log(error)
      } finally{
        setDelete(true)
      }
    }
    Deletetainer()
  }

  return (
    <div>
      {Delete && (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">userId</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">age</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">phone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{tainer.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tainer.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tainer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tainer.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tainer.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button 
                className="text-indigo-600 hover:text-indigo-900"
                onClick={hdlDeletetainer}
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
