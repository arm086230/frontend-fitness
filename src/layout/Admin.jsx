import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Admin() {
    const [data , setData] = useState([])

    useEffect(() => {
        const getData = async () =>{
            try{
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8889/booking/admin', {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                 }
                )
                
                setData(response.data)
            }catch(err){
                console.log(err)
            }
        }
        getData()

        // console.log(data);
    }, [])
    return (
        <div>

        {Array.isArray(data) && data.map((item) => (
        <AdminShowBooking key={item.id} booking={item} />))}</div>
    )

}


function AdminShowBooking({booking}) {
  const [isDelete, setIsDelete] = useState(true)

  const hdlDeleteBooking = (e) =>{
    e.preventDefault();
    // alert(555)
    const deleteBooking =  async () => {
      try {
        const token = localStorage.getItem("token");
        const delebooks = booking.id
        // alert(delebooks)
        const response = await axios.delete(
          `http://localhost:8889/booking/delete/${delebooks}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("deleted..")
        setIsDelete(!isDelete)
        window.location.reload()
        // console.log(response.data)
      } catch (error) {
        console.log(error)

      } finally {
        setIsDelete(true)
      }
    }
    deleteBooking()
    
  }
  const [editBooking, seteditBooking ] = useState({status : "Confirmed"})
  const handleEditStatus = (e) =>{
    e.preventDefault();
    const editBook = async () =>{
      try{
        const id = booking.id
        const response = await axios.patch(
          `http://localhost:8889/booking//updatebooking/${id}`, editBooking, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
          )
          alert("Status changed")
        seteditBooking(response.data)
        window.location.reload()
      }catch(error){
        console.log(error)
      }
    }
    editBook()
    
      
  }

    return (
        <div>
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tainerid</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.TrainertId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.bookingDateTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                className="text-indigo-600 hover:text-indigo-900"
                onClick={hdlDeleteBooking}
                >
                  Delete</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                className="text-indigo-600 hover:text-indigo-900"
                onClick={handleEditStatus}
                >
                  Confirmed</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  )

}
