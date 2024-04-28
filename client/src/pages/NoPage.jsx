import React from 'react'
import img from '/something.png'
import { Route, Routes, useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();
  return (
    <div className=' flex items-center'>
      <img src={img} alt="" />
      <div className=' text-center'>
        <h1 className=' text-4xl text-cyan-800 font-semibold'>No Page Found</h1>
        <button onClick={() => navigate(-1)} className=' w-24 mt-4 rounded-xl text-white h-10 bg-cyan-600'>Go Back</button>
      </div>
    </div>
  )
}

export default NoPage
