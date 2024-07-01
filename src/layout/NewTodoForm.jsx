/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [input, setInput] = useState({
    TrainerId: trainer.id,
    bookingDateTime: "", 
    bookingDate: "", 
    expiryDate: "", 
    status: "Pending",
  });
  const [isBookingAllowed, setIsBookingAllowed] = useState(true);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInput((prevInput) => ({ ...prevInput, [e.target.name]: e.target.value }));
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Validate bookingDateTime input
      if (!input.bookingDateTime) {
        setError("Please select a booking date.");
        return;
      }

      // Create a JavaScript Date object from input.bookingDateTime
      const bookingDateTime = new Date(input.bookingDateTime);

      // Check if bookingDateTime is a valid date
      if (isNaN(bookingDateTime)) {
        setError("Invalid date format provided.");
        return;
      }

      const bookingDate = bookingDateTime.toISOString(); 
      const expiryDate = new Date(bookingDateTime.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(); 

      
      const response = await axios.post(
        `http://localhost:8889/booking/createbooking/`,
        { ...input, bookingDateTime, bookingDate, expiryDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      alert("Successfully created");
      setIsBookingAllowed(false); 
    } catch (error) {
      console.error("Error creating booking:", error);
      setError("Failed to create booking. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-center space-x-8">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={trainer.img} alt="" className="trainer" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{trainer.name}</h2>
            <p className="">อายุ : {trainer.age}</p>
            <p className="">Phone : {trainer.phone}</p>
            <div className="card-actions card-body items-center text-center">
              <input
                className="btn btn-primary"
                onChange={handleInputChange}
                type="date"
                name="bookingDateTime"
                value={input.bookingDateTime}
                min={new Date().toISOString().split('T')[0]}
              />
              <button
                className="btn btn-primary"
                onClick={handleCreateBooking}
                disabled={!isBookingAllowed || input.bookingDateTime === ""}
              >
                จอง
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

