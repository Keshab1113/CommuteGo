import React from 'react'

const SearchFlight = () => {
  return (
    <div className='h-screen flex justify-center items-center firstbackground'>
      <div className=' sm:h-20 sm:w-9/12 w-[60%] flex sm:flex-row flex-col rounded-xl sm:backdrop-blur bg-white sm:bg-inherit'>
        <div className='searchlabels rounded-tl-xl'>
          <label for="cars" className='searchlabel rounded-tl-xl'>Destination from</label>
          <select name="cars" id="cars" form="carform" className=' searchselects rounded-bl-xl'>
            <option value="volvo">Kolkata</option>
            <option value="saab">Mumbai</option>
            <option value="opel">Pune</option>
            <option value="audi">Hydrabad</option>
            <option value="audi">Bengaluru</option>
            <option value="audi">Chennai</option>
          </select>
        </div>
        <div className='searchlabels'>
          <label for="cars" className='searchlabel'>Destination to</label>
          <select name="cars" id="cars" form="carform" className=' searchselects'>
            <option value="volvo">Kolkata</option>
            <option value="saab">Mumbai</option>
            <option value="opel">Pune</option>
            <option value="audi">Hydrabad</option>
            <option value="audi">Bengaluru</option>
            <option value="audi">Chennai</option>
          </select>
        </div>
        <div className=' searchlabels'>
          <h1 className='searchlabel'>Journey date</h1>
          <input type="date" name="" id="" className=' searchselects' />
        </div>
        <div className=' searchlabels'>
          <label for="cars" className='searchlabel'>Guests</label>
          <select name="cars" id="cars" form="carform" className=' searchselects'>
            <option value="volvo">1</option>
            <option value="saab">2</option>
            <option value="opel">3</option>
            <option value="audi">4</option>
          </select>
        </div>
        <div className='searchlabels'>
          <label for="cars" className='searchlabel'>ClassName</label>
          <select name="cars" id="cars" form="carform" className=' searchselects'>
            <option value="volvo">Economy</option>
            <option value="saab">Premium Economy</option>
            <option value="opel">Business</option>
            <option value="audi">First Class</option>
          </select>
        </div>
        <div className='sm:w-[10%] w-full sm:h-full h-16 items-end justify-end flex rounded-br-xl '>
          <button className=' w-full h-[70%] bg-blue-600 sm:rounded-br-xl rounded-b-xl sm:rounded-b-none text-white'>Search</button>
        </div>
      </div>
    </div>
  )
}

export default SearchFlight
