/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";

export default function NewTodoForm() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/workout/gettrainer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="flex gap-3">
      {trainers.map((trainer) => (
        <Trainer key={trainer.id} trainer={trainer} />
      ))}
    </div>
  );
}

function Trainer({ trainer }) {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState({
    userId: user?.id,
    name: trainer.name,
    age: trainer.age,
    sex: trainer.sex,
    phone: trainer.phone,
    TrainerId: trainer.id,
    bookingDateTime: "",
    status: "Pending",
    bookingDate: "",
    expiryDate: "",
  });
  const [isBookingAllowed, setIsBookingAllowed] = useState(true);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
    console.log(input);
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.post(
        `http://localhost:8889/booking/createbooking/`,
        {
          ...input,
          bookingDateTime: Date.now(),
          expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Complete your reservation",
        showConfirmButton: false,
        timer: 1500
      });
      setIsBookingAllowed(false);
    } catch (error) {
      console.error("Error creating booking:", error);

      setError("Failed to create booking. Please try again.");
    }
  };

  return (
<div className="mt-8 mx-5 max-w-md">
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <figure className="px-6 pt-6">
      <img src={trainer.image} alt="" className="w-40 h-38 mx-auto" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{trainer.name}</h2>
      <p>อายุ: {trainer.age}</p>
      <p>Phone: {trainer.phone}</p>
      <div className="card-actions card-body items-center text-center mt-4">
        <input
          className="btn btn-primary"
          onChange={handleInputChange}
          type="date"
          name="bookingDate"
          value={input.bookingDate}
          min={new Date().toISOString().split("T")[0]}
        />
        <button
          className="btn btn-primary w-full mt-4"
          onClick={handleCreateBooking}
          disabled={!isBookingAllowed || input.bookingDate === ""}
        >
          จอง
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  </div>
</div>

  );
}


// /* eslint-disable no-undef */
// /* eslint-disable react/prop-types */
// import React , {useContext, useEffect , useState} from 'react';
// import axios from 'axios';
// import AuthContext from '../contexts/AuthContext';

// export default function Trainer() {
//   const [trainers, setTrainers] = useState([]);
//   useEffect(()=>{
//     const fetchTrainer = async () =>{
//       try{
//         const token =  localStorage.getItem('token')
//         const response = await axios.get('http://localhost:8889/trainer/gettrainer', {
//           headers : {
//             Authorization : `Bearer ${token}`
//           }
//         });
//         setTrainers(response.data)
//       }catch{
//         console.log("Error fetching trainers:", error)
//       }
//     }
//     fetchTrainer();
//   }, [])
//   return (
//     <div className='flex gap-3'>
//       {trainers.map((trainer) =>(
//         <Trainers key={trainer.id} trainer={trainer} />
//       ))}
//     </div>
//   )
// }
// function Trainers({trainer}) {

//   const { user } = useContext(AuthContext)

//   const [input , setInput] = useState({
//     userId:user?.id,
//     name:trainer.name,
//     sex:trainer.sex,
//     phone:trainer.phone,
//     age:trainer.age,
//     TrainerId : trainer.id,
//     bookingDateTime : "",
//     status : "Pending"
//   });
//   const [isBookingAllowed , setIsBookingAllowed] = useState(true)
//   const handleInputChange = (e) =>{
//     setInput((prevInput) => ({...prevInput, [e.target.name]: e.target.value}));
//   }

//   const handleCreateBooking = async (e) => {
//     e.preventDefault();
//     try {
//       console.log();
//       const token = localStorage.getItem("token");
//       if (!token) return;
//       // console.log(input);
//       const response = await axios.post(
//         `http://localhost:8889/booking/createbooking/`,
//         {...input, bookingDateTime: new Date()},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Successfully created");
//       setIsBookingAllowed(false);
//     } catch (error) {
//       alert(error);
//     }
//   };

//   return (
//     <div className="flex justify-center space-x-8 px-6 py-5 ">
//     <div className="card w-96  gap-x-4 bg-base-100 shadow-lg">
//       <figure className="px-10 pt-10">
//         <img src={trainer.image} alt="" className="border" />
//       </figure>
//       <div className="card-body items-center text-center">
//         <h2 className="card-title">{trainer.name}</h2>
//         <p className="">อายุ : {trainer.age}</p>
//         <p className=''>เพศ : {trainer.sex}</p>
//         <p className="">Phone : {trainer.phone}</p>
//         <div className="card-actions card-body items-center ">
//           <input
//             className="btn btn-primary"
//             onChange={handleInputChange}
//             type="date"
//             name="bookingDateTime"
//             value={input.bookingDateTime}
//             min={new Date().toISOString().split('T')[0]}
//           />
//           <button
//             className="btn btn-primary w-full "
//             onClick={handleCreateBooking}
//             disabled={!isBookingAllowed || input.bookingDateTime === ""}
//           >
//             จอง
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// }
