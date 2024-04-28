import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Search from '../../component/Search/Search.jsx'
import { useAuth } from "../../store/auth.jsx"




const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'from', headerName: 'From', width: 150 },
  { field: 'to', headerName: 'To', width: 150 },
  {
    field: 'route',
    headerName: 'Routes',
    sortable: false,
    width: 450,
  },
];

const Buses = () => {
  const { busdata } = useAuth();
  return (
    <div className=' h-full flex flex-col justify-center items-center bg-slate-100'>
      <div className=" h-full w-full flex flex-col justify-center items-center  pb-10">
        <Search />
        <h1 className=" items-center text-3xl font-bold underline mb-5">Bus List</h1>
        <div style={{ height: 400, width: '80%', backdropFilter: 'blur(10px)' }}>
          <DataGrid
            rows={busdata}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  )
}

export default Buses
