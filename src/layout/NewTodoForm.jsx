import axios from "axios";
import { useEffect, useState } from "react";

export default function NewTodoForm() {
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const getTrainer = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/workout/gettrainer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrainer(response.data);
      } catch (error) {
        console.error("Error fetching trainer:", error);
      }
  };
    getTrainer();
  }, []);

  return (
    <div className="flex gap-3">
      {trainer && trainer.map((el) => <Trainer key={el.id} trainer={el} />)}
    </div>
  );
}


function Trainer({ trainer }) {
  const [input, setInput] = useState({
    TrainertId: trainer.id,
    bookingDateTime: "",
    status: "Pending",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  // const hdlCraeteBooking = (e) => {
  //   e.preventDefault();
  //   alert(input.TrainertId);
  //   alert(input.bookingDateTime);
  // };

  const hdlCraeteBooking = (e) => {
    e.preventDefault();
    const createBooking = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const rs = axios.post(
          `http://localhost:8889/booking/createbooking/`,
          input,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("successfully created");
      } catch (error) {
        alert(error);
      }
    };
    createBooking();
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
            <p className="">phone : {trainer.phone}</p>
            <div className="card-actions card-body items-center text-center">
              <input
                className="btn btn-primary"
                onChange={hdlChange}
                type="datetime-local"
                name="bookingDateTime"
                value={input.bookingDateTime}
              />
              <button
                onChange={hdlChange}
                className="btn btn-primary"
                onClick={hdlCraeteBooking}
              >
                คลิกเลือกTainer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
