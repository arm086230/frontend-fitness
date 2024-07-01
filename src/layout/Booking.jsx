import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

  const hdlDeleteBooking = (bookingId) => async () => {
    try {
      const token = localStorage.getItem("token");
      const confirmDelete = await Swal.fire({
        title: "คุณต้องการลบการจองนี้ใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
      });

      if (!confirmDelete.isConfirmed) {
        return;
      }

      await axios.delete(`http://localhost:8889/booking/delete/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooking((prevBooking) =>
        prevBooking.filter((item) => item.id !== bookingId)
      );
      Swal.fire({
        icon: "success",
        title: "ลบการจองเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบการจองได้ กรุณาลองใหม่ภายหลัง",
      });
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
                {item.status === "Pending" && (
                  <button
                    className="text-red-600 hover:hover:text-red-600"
                    onClick={hdlDeleteBooking(item.id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}