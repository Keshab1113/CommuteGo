import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import {Link} from "react-router-dom"


const AllUsers = () => {
  const {authorizationToken} = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      // console.log(data);

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users after delete:  ${data}`);

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
    <div className=' bg-slate-300 h-[100vh] pt-[8vh] w-full flex flex-col items-center'>
      <h1 className=' text-4xl font-bold mt-4 mb-5'>All Users are here</h1>
      <div className=' bg-slate-100 w-full sm:w-[80%] overflow-hidden'>
        <div className=' w-full flex bg-blue-700 py-2'>
            <h1 className=' sm:w-[25%] w-44 border-r px-4 text-white'>Name</h1>
          <h1 className='sm:w-[25%] w-44 border-r px-4 text-white'>Email</h1>
          <h1 className=' sm:w-[20%] w-44 border-r px-4 text-white justify-center items-center flex'>Is Admin</h1>
          <h1 className='sm:w-[15%] w-44 border-r px-4 text-white justify-center items-center flex'>Update</h1>
          <h1 className='sm:w-[15%] w-44 px-4 text-white justify-center items-center flex'>Delete</h1>
        </div>
        <div className=' w-full flex flex-col justify-around items-center bg-slate-500'>
      {users.map((curUsers, index) => {
        return (
          <div className=' flex w-full border-b sm:py-5 py-0' key={index}>
            <h1 className=' sm:w-[25%] w-44 sm:overflow-x-hidden overflow-x-scroll border-r px-4 text-white'>{curUsers.username}</h1>
            <h1 className='sm:w-[25%] w-44 sm:overflow-x-hidden overflow-x-scroll border-r px-4 text-white'>{curUsers.email}</h1>
            <h1 className='w-44 sm:overflow-x-hidden overflow-x-scroll sm:w-[20%] border-r px-4 text-white justify-center items-center flex'>{curUsers.isAdmin ? "YES" : "NO"}</h1>
            <div className='w-44 overflow-x-scroll sm:overflow-x-hidden sm:w-[15%] border-r px-4 text-white  justify-center items-center flex'><Link to={`/admin/users/${curUsers._id}/edit`} className=' bg-green-500 hover:bg-green-700 px-4 rounded-2xl text-sm py-[2px]'>Edit</Link></div>
            <div className='w-44 overflow-x-scroll sm:overflow-x-hidden sm:w-[15%] px-4 text-white justify-center items-center flex'><button onClick={() => deleteUser(curUsers._id)} className=' bg-red-500 hover:bg-red-700 px-4 rounded-2xl text-sm py-[2px]'>Delete</button></div>
          </div>
        )
      })}
        </div>
      </div>
    </div>
  )
}

export default AllUsers
