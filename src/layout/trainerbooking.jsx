/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function trainerbooking() {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  console.log(user?.id);
  useEffect(() => {
    const getData = async () => {
      try {
        const id = user?.id;
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8889/workout/getbyusers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                MemberName
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                TrainerName
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                age
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                phonenumber
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data &&
              data.map((item) => (
                <AdminShowBooking key={item.id} booking={item} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminShowBooking({ booking }) {
  // const [isDeleted, setIsDeleted] = useState(false);
  const [editBooking, setEditBooking] = useState("");
  const handleEditStatus = async (e, status) => {
    e.preventDefault();
    try {
      setEditBooking(status);
      console.log(status);
      const id = booking.id;
      const response = await axios.patch(
        `http://localhost:8889/booking/updatebooking/${id}`,
        {status},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Status changed");
      setEditBooking(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(booking.id);

  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">{booking.user.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.age}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(booking.bookingDateTime)
          .toLocaleTimeString("th-TH")
          .slice(0, 8)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(booking.bookingDate).toLocaleDateString("th-TH")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(booking.expiryDate).toLocaleDateString("th-TH")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>

      <td className="px-6 py-4 whitespace-nowrap">
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={(e) => handleEditStatus(e, "Confirmed")}
        >
          {"Confirmed"}
        </button>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={(e) => handleEditStatus(e, "FullyBooked")}
        >
          {"FullyBooked"}
        </button>
      </td>
    </tr>
  );
}
