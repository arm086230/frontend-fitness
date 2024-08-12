import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Book() {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/booking/getbooking",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooking(response.data.getbooking);
      } catch (error) {
        console.log(error);
      }
    };
    getBooking();
  }, []);

  const handleEditStatus = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8889/booking/updatebooking/${id}`,
        { status: "Cancel" }, // Set the status here as required
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Status changed");
      // setBooking((prevBookings) =>
      //   prevBookings.map((booking) =>
      //     booking.id === id
      //       ? { ...booking, status: response.data.result.status }
      //       : booking
      //   ).filter((booking) => booking.status !== "Cancel" && booking.status !== "FullyBooked")
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Age
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Booking Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Booking Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Expiry Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {booking.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(item.bookingDateTime)
                  .toLocaleTimeString("th-TH")
                  .slice(0, 8)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(item.bookingDate).toLocaleDateString("th-TH")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(item.expiryDate).toLocaleDateString("th-TH")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleEditStatus(item.id)}
                >
                  {item.status === "Pending" ? "Cancel" : "Cancel"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
