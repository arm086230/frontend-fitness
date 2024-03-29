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
    status: "Pending",
  });
  const [isBookingAllowed, setIsBookingAllowed] = useState(true);
  const handleInputChange = (e) => {
    setInput((prevInput) => ({ ...prevInput, [e.target.name]: e.target.value }));
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      console.log();
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.post(
        `http://localhost:8889/booking/createbooking/`,
        {...input, bookingDateTime: new Date()},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Successfully created");
      setIsBookingAllowed(false);
      deleteBooking();
    } catch (error) {
      alert(error);
    }
  };

  // const Dte = new Date().toLocaleTimeString()
  // console.log(Dte);
  '2024-03-29 17:51:00.000'

  const deleteBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await axios.delete(`http://localhost:8889/booking/deletebooking/${input.TrainerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Booking time expired. Booking deleted.");
      setIsBookingAllowed(true);
    } catch (error) {
      console.error("Error deleting booking:", error);
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
          </div>
        </div>
      </div>
    </div>
  );
}
