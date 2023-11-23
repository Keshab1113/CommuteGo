import React from 'react'
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

const Header = () => {
  return (
    <div className=' bg-slate-500 h-[10vh] w-full flex justify-between items-center sm:px-12 px-2'>
    <h1 className='font-bold font-serif text-2xl text-slate-50 cursor-pointer'>CommuteGo</h1>
    <h1 className=' font-serif text-xl text-slate-50'><LiveHelpIcon className=''/>Help</h1>
    </div>
  )
}

export default Header
