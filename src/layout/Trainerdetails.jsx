import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default function TrainerDetails() {
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const handleEditStatus = async (e, value) => {
    setStatus(value);
    e.preventDefault();

    try {
      const resumeId = details.Resume[0].id;
      await axios.patch(
        `http://localhost:8889/auth/update/${resumeId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Status updated',
        text: `The status has been changed to ${value}`,
        confirmButtonText: 'OK',
      });
    } catch (err) {
      console.log(err);
      // Swal.fire({

      //   // icon: 'error',
      //   // title: 'Update Failed',
      //   // text: 'There was an error updating the status. Please try again.',
      //   // confirmButtonText: 'OK',
      // });
    }
  };

  useEffect(() => {
    const getDetail = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8889/auth/get/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getDetail(id);
  }, [id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center mb-4">
          <img
            className="w-20 h-20 rounded-full mr-4"
            src={details.image}
            alt="รูปเทรนเนอร์"
          />
          <div>
            <h2 className="text-xl font-bold">{details.name}</h2>
            <p className="text-gray-600">{details.position}</p>
          </div>
        </div>
        <form>
          {/* ฟิลด์ข้อมูลของเทรนเนอร์ */}
          {['name', 'age', 'sex', 'phone'].map((field) => (
            <div className="mb-4" key={field}>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={field}
              >
                {field === 'name' ? 'ชื่อ:' : field === 'age' ? 'อายุ' : field === 'sex' ? 'เพศ' : 'เบอร์โทร'}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={field}
                type="text"
                value={details[field]}
                readOnly
              />
            </div>
          ))}

          {/* ปุ่มเปิด Modal */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Toggle Resume
            </button>
          </div>

          {/* Modal สำหรับ Resume */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <img
              src={details.Resume[0].resumefile}
              alt="Resume"
              className="w-full"
            />
          </Modal>

          {/* ปุ่มสำหรับเปลี่ยนสถานะ */}
          <div>
            <button
              className="btn bg-green-500 text-white py-2 px-4 rounded"
              onClick={(e) => handleEditStatus(e, "Approve")}
            >
              Approve
            </button>
            <button
              className="btn bg-red-500 text-white py-2 px-4 rounded ml-2"
              onClick={(e) => handleEditStatus(e, "Not_approved")}
            >
              Not Approved
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
