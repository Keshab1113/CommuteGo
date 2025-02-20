import React from 'react'
import Destination from './Destinitions/Destination'
import Destination2 from './Destinitions/Destination2'
import Destination3 from './Destinitions/Destination3'
import Destination4 from './Destinitions/Destination4'
import Destination5 from './Destinitions/Destination5'
import Destination6 from './Destinitions/Destination6'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const Destinition = () => {
    const { darkMode } = useContext(ThemeContext)
    return (
        <div className={`h-full flex items-center flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-100 text-black'}`}>
            <h1 className=' text-4xl font-semibold mt-8 mb-12 text-black text-center'>Most Visited Destination</h1>
            <div className=' w-[80%] grid sm:grid-cols-3 grid-cols-1 gap-4 justify-center mb-12'>
                <Destination />
                <Destination2/>
                <Destination3 />
                <Destination4/>
                <Destination5 />
                <Destination6/>
            </div>
        </div>
    )
}

export default Destinition