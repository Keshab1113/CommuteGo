import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

const AdminFeedback = () => {
  const { authorizationToken } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/feedback`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFeedBack = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/feedback/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      toast.success("Feed Back Deleted")
      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <div className=' bg-slate-100 h-[100vh] pt-[8vh] w-full'>
      <h1 className='text-4xl font-bold mt-4 mb-5'>Admin Feedback</h1>
      <div className=' w-full sm:w-[100%] overflow-hidden px-4'>
        <table>
          <tr className=' bg-blue-600 border-b-2 h-16 text-white'>
            <th className=' border-r-2 px-4 py-2'>Name</th>
            <th className=' border-r-2 px-4 py-2'>Email</th>
            <th className=' border-r-2 px-4 py-2'>Phone</th>
            <th className=' border-r-2 px-4 py-2'>Message</th>
            <th className=' border-r-2 px-4 py-2'>Posted</th>
            <th className=' border-r-2 px-4 py-2'>Update</th>
            <th>Delete</th>
          </tr>
          {feedbacks.map((val, key) => {
            return (
              <tr key={key} className=' bg-blue-900 border-b-2 text-white'>
                <td className=' border-r-2 px-4 py-2'>{val.fullname}</td>
                <td className=' border-r-2 px-4 py-2'>{val.email}</td>
                <td className=' border-r-2 px-4 py-2'>{val.phone}</td>
                <td className=' border-r-2 px-4 py-2'>{val.message}</td>
                <td className=' border-r-2 px-4 py-2'>{val.isDone ? "YES" : "NO"}</td>
                <td className=' border-r-2 px-4 py-2'><Link to={`/admin/feedbacks/${val._id}/edit`} className=' bg-green-500 hover:bg-green-700 px-4 rounded-2xl text-sm py-2'>Edit</Link></td>
                <td className='px-4 py-2'><button onClick={() => deleteFeedBack(val._id)} className=' bg-red-500 hover:bg-red-700 px-4 rounded-2xl text-sm py-2'>Delete</button></td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default AdminFeedback
