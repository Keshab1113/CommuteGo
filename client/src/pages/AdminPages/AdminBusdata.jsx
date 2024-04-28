import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import { useNavigate } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";


const AdminBusdata = () => {
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const [busDatas, setbusDatas] = useState([]);

  const getAllBusData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/busdata`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      setbusDatas(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBus = async (id) => {
    toast.success("Bus Deleted Successfully");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/busdata/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        getAllBusData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBusData();
  }, []);
  return (
    <div className=' bg-slate-100 h-full pt-[8vh] w-full flex flex-col justify-center items-center'>
      <h1 className=' text-4xl font-bold'>All Bus</h1>
      <div className=' w-full justify-end flex'>
        <button onClick={() => navigate("addBus")} className=' px-4 border border-white bg-blue-500 text-white rounded-xl py-2'><AddIcon/> Add Bus </button>
      </div>
      
      <div className=' w-full flex flex-col justify-center items-center'>
        <div className=' flex max-w-max h-10 border-b-2 border-white text-white'>
          <h1 className=' w-14 bg-blue-700 px-2 flex justify-center items-center border-r'>Id</h1>
          <h1 className=' w-40 bg-blue-700 px-2 flex justify-center items-center border-r'>Bus Name</h1>
          <h1 className=' w-60 bg-blue-700 px-2 flex justify-center items-center border-r'>From</h1>
          <h1 className=' w-60 bg-blue-700 px-2 flex justify-center items-center border-r'>To</h1>
          <h1 className=' w-60 bg-blue-700 px-2 flex justify-center items-center border-r'>Route</h1>
          <h1 className=' w-60 bg-blue-700 px-2 flex justify-center items-center border-r'>Action</h1>
        </div>
        {busDatas && busDatas.map((i) => {
          return (
            <div className=' flex max-w-max border-b text-white' key={i._id}>
            <h1 className=' w-14 bg-slate-400 px-2'>{i.id}</h1>
            <h1 className=' w-40 bg-red-500 px-2'>{i.name}</h1>
            <h1 className=' w-60 bg-amber-400 px-2'>{i.from}</h1>
            <h1 className=' w-60 bg-green-700 px-2'>{i.to}</h1>
            <h1 className=' w-60 bg-neutral-700 px-2'>{i.route}</h1>
              <div className=' w-60 bg-cyan-700 px-2 flex justify-center items-center py-2'> <Link to={`/admin/busdata/${i._id}/edit`} className=' bg-green-500 hover:bg-green-700 px-4 rounded-2xl text-sm py-2'>Edit</Link> <button onClick={() => deleteBus(i._id)} className=' ml-4 border px-2 py-1 flex hover:bg-red-500 rounded'>Delete<DeleteIcon /></button></div>
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default AdminBusdata
