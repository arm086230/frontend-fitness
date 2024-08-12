/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Showtainer() {
  const [trainers, setTrainers] = useState([]);
  const [resume, setResume] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/workout/admingettrainer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setTrainers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrainers();
  }, []);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8889/auth/getresume" , 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResume(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResume();
  } , []);



  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trainers.map((trainer) => (
            <TrainerRow key={trainer.id} trainer={trainer} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrainerRow({ trainer }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8889/workout/deletetrainer/${trainer.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isDeleted) {
    return null;
  }

  const resumes = trainer.Resume[0].status

  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">{trainer.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{trainer.sex}</td>
      <td className="px-6 py-4 whitespace-nowrap">{trainer.age}</td>
      <td className="px-6 py-4 whitespace-nowrap">{trainer.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap">{trainer.role}</td>
      <td className="px-6 py-4 whitespace-nowrap">{resumes}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          className="btn bg-blue-700 text-white hover:bg-sky-300 px-8"
          onClick={() => navigate(`/admin/trainerdetails/${trainer.id}`)}
        >
          Detail
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {/* <button
          className="btn bg-red-700 text-white hover:bg-red-800"
          onClick={handleDelete}
        >
          Delete
        </button> */}
      </td>
    </tr>
  );
}
