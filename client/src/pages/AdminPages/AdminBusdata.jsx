import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import { useNavigate } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { DataGrid } from '@mui/x-data-grid';
import { ThemeContext } from '@emotion/react';




const AdminBusdata = () => {
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const [busDatas, setbusDatas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);

  const getAllBusData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/busdata`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
  
      // Ensure each item has an `id` field
      const formattedData = data.map((item) => ({
        ...item,
        id: item._id, // Assign `_id` to `id`
      }));
  
      setbusDatas(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedBusId(id);
    setIsModalOpen(true);
  };
  

  const deleteBus = async () => {
    toast.success("Bus Deleted Successfully");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/busdata/delete/${selectedBusId}`, {
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
    setIsModalOpen(false);
    setSelectedBusId(null);
  };

  useEffect(() => {
    getAllBusData();
  }, []);
const { darkMode } = useContext(ThemeContext)

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'from', headerName: 'From', width: 150 },
  { field: 'to', headerName: 'To', width: 150 },
  {
    field: 'route',
    headerName: 'Routes',
    sortable: false,
    width: 250,
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <div className='w-60 px-2 flex justify-center items-center py-2'>
        <Link 
          to={`/admin/busdata/${params.row.id}/edit`} 
          className='bg-green-500 hover:bg-green-700 px-4 rounded-2xl text-sm py-2 text-white'
        >
          Edit
        </Link>
        <button 
          onClick={() => handleDeleteClick(params.row.id)}
          className='ml-4 border px-2 py-1 flex hover:bg-red-500 bg-red-400 rounded text-white'
        >
          Delete
          <DeleteIcon />
        </button>
      </div>
    ),
  },
];

  return (
    <section className=' bg-black bg-grid-white/[0.2] h-screen pt-[8vh] w-screen overflow-hidden flex flex-col justify-center items-center'>
      <h1 className=' text-4xl font-bold mt-10 text-white px-6'>Manage Bus and Add New Bus</h1>
      <div className=' w-full justify-end flex md:mr-20 mr-6 mb-10'>
        <button onClick={() => navigate("addBus")} className=' px-4 border border-white bg-blue-500 text-white rounded-xl py-2'><AddIcon /> Add Bus </button>
      </div>
      <div className=' bg-white rounded-xl overflow-y-scroll max-h-[80vh] mb-20 max-w-[90vw] md:overflow-x-hidden overflow-x-scroll'>
      <DataGrid
        rows={busDatas}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        sx={{
          '& .MuiDataGrid-root': {
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: darkMode ? '#374151' : '#f3f4f6',
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: darkMode ? '#4b5563' : '#e5e7eb',
            },
          },
        }}
      />
</div>
{isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this bus?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={deleteBus}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AdminBusdata
