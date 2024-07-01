/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/booking/admin",
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
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trainer ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Booking Date Time
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
  const [isDeleted, setIsDeleted] = useState(false);
  const [editBooking, setEditBooking] = useState({ status: "Confirmed" });

  const handleDeleteBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const delebooks = booking.id;
      await axios.delete(`http://localhost:8889/booking/delete/${delebooks}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Deleted");
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditStatus = async (e) => {
    e.preventDefault();
    try {
      const id = booking.id;
      const response = await axios.patch(
        `http://localhost:8889/booking/updatebooking/${id}`,
        editBooking,
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

  if (isDeleted) return null;

  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.userId}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.bookingDateTime}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={handleDeleteBooking}
        >
          ลบ
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={handleEditStatus}
        >
          {booking.status === "Confirmed" ? "Unconfirm" : "Confirm"}
        </button>
      </td>
    </tr>
  );
}
