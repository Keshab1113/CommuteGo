import React from 'react'
import Slider from './Slider'
import Search from './Search'
import Navber from './Navber'

const Body = () => {
  return (
    <div className=' bg-slate-800 h-screen'>
      <div className=' bg-slate-600 h-80'>
      <Slider/>
      <Search/>
      <Navber/>
      </div>
    </div>
  )
}

export default Body
