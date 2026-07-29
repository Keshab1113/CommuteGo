import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash2, Bus, MapPin, Route, ArrowRight, X, Check } from 'lucide-react';
import { useAuth } from '../../store/auth';
import { ThemeContext } from '../../context/ThemeContext';
import { toast } from "react-toastify";
import { DataGrid } from '@mui/x-data-grid';

const defaultBusDataform = {
  id: "",
  name: "",
  from: "",
  to: "",
  route: "",
};

const AdminBusdata = () => {
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const [busDatas, setbusDatas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllBusData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/busdata`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      const formattedData = data.map((item) => ({
        ...item,
        id: item._id,
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
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/busdata/delete/${selectedBusId}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        toast.success("Bus deleted successfully");
        getAllBusData();
      }
    } catch (error) {
      toast.error("Failed to delete bus");
    }
    setIsModalOpen(false);
    setSelectedBusId(null);
  };

  useEffect(() => {
    getAllBusData();
  }, []);

  const filteredBusData = busDatas.filter(bus =>
    bus.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.to?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: 'name', headerName: 'Bus Name', width: 180, renderCell: (params) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <Bus className="w-4 h-4 text-white" />
        </div>
        <span className="font-medium">{params.value}</span>
      </div>
    )},
    { field: 'from', headerName: 'From', width: 140, renderCell: (params) => (
      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
        <MapPin className="w-4 h-4 text-cyan-500" />
        {params.value}
      </div>
    )},
    { field: 'to', headerName: 'To', width: 140, renderCell: (params) => (
      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
        <MapPin className="w-4 h-4 text-emerald-500" />
        {params.value}
      </div>
    )},
    { field: 'route', headerName: 'Route', width: 250, renderCell: (params) => (
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <Route className="w-4 h-4" />
        {params.value}
      </div>
    )},
    {
      field: 'action',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/busdata/${params.row.id}/edit`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 text-xs font-medium transition-colors"
          >
            <Edit className="w-3 h-3" /> Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(params.row.id)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 text-xs font-medium transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#141313]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-white dark:bg-[#1C1B1B] border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Bus Management</h1>
            <p className="text-sm text-gray-500">Manage and add bus routes</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search buses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <button
              onClick={() => navigate("addBus")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Bus
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <DataGrid
            rows={filteredBusData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-root': {
                backgroundColor: 'transparent',
                color: darkMode ? '#fff' : '#000',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: darkMode ? '#0a0a0a' : '#f8fafc',
                color: darkMode ? '#fff' : '#475569',
                borderBottom: `1px solid ${darkMode ? '#1C1B1B' : '#e2e8f0'}`,
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: darkMode ? '#1C1B1B' : '#f8fafc',
                },
              },
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${darkMode ? '#1C1B1B' : '#f1f5f9'}`,
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: `1px solid ${darkMode ? '#1C1B1B' : '#e2e8f0'}`,
              },
            }}
          />
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Delete Bus</h3>
              <p className="text-gray-500 mb-6">Are you sure you want to delete this bus? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteBus}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminBusdata;
