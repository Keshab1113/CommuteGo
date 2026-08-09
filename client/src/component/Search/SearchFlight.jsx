import React from 'react'
import SimpleSelect from '../../components/ui/SimpleSelect'

const CITIES = ['Kolkata', 'Mumbai', 'Pune', 'Hydrabad', 'Bengaluru', 'Chennai']
const GUEST_OPTIONS = ['1', '2', '3', '4']
const CLASS_OPTIONS = ['Economy', 'Premium Economy', 'Business', 'First Class']

const SearchFlight = () => {
  const searchSelectClass = "searchselects"
  return (
    <div className='h-screen flex justify-center items-center firstbackground'>
      <div className=' sm:h-20 sm:w-9/12 w-[60%] flex sm:flex-row flex-col rounded-xl sm:backdrop-blur bg-white sm:bg-inherit'>
        <div className='searchlabels rounded-tl-xl'>
          <label htmlFor="cars" className='searchlabel rounded-tl-xl'>Destination from</label>
          <SimpleSelect
            options={CITIES.map(c => ({ value: c, label: c }))}
            triggerClassName={`${searchSelectClass} rounded-bl-xl`}
          />
        </div>
        <div className='searchlabels'>
          <label htmlFor="cars" className='searchlabel'>Destination to</label>
          <SimpleSelect
            options={CITIES.map(c => ({ value: c, label: c }))}
            triggerClassName={searchSelectClass}
          />
        </div>
        <div className=' searchlabels'>
          <h1 className='searchlabel'>Journey date</h1>
          <input type="date" name="" id="" className=' searchselects' />
        </div>
        <div className=' searchlabels'>
          <label htmlFor="cars" className='searchlabel'>Guests</label>
          <SimpleSelect
            options={GUEST_OPTIONS.map(g => ({ value: g, label: g }))}
            triggerClassName={searchSelectClass}
          />
        </div>
        <div className='searchlabels'>
          <label htmlFor="cars" className='searchlabel'>ClassName</label>
          <SimpleSelect
            options={CLASS_OPTIONS.map(c => ({ value: c, label: c }))}
            triggerClassName={searchSelectClass}
          />
        </div>
        <div className='sm:w-[10%] w-full sm:h-full h-16 items-end justify-end flex rounded-br-xl '>
          <button className=' w-full h-[70%] bg-blue-600 sm:rounded-br-xl rounded-b-xl sm:rounded-b-none text-white'>Search</button>
        </div>
      </div>
    </div>
  )
}

export default SearchFlight
