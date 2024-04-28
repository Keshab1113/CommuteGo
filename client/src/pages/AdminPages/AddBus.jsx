import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
const defaultBusDataform = {
    id:"",
    name: "",
    from: "",
    to: "",
    route: "",
};

const AddBus = () => {
    const { authorizationToken } = useAuth();
    const [addbusdata, setaddbusdata] = useState({
        name: "",
        from: "",
        to: "",
        route: "",
    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setaddbusdata({
            ...addbusdata,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/busdata/addbus`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(addbusdata)
            });
            if (response.ok) {
                setaddbusdata(defaultBusDataform);
                const data = await response.json();
                toast.success("Bus added successfully.");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
      <div className=' bg-slate-100 h-[100vh] pt-[8vh] w-full flex justify-center items-center'>
          <form onSubmit={handleSubmit} className=' h-[75%] sm:w-[50%] w-[90%] bg-white rounded-2xl p-4 flex flex-col justify-center'>
              <h1 className=' text-2xl font-bold text-center'>Please Input Bus Data</h1>
              <div className=' flex flex-col mb-2'>
                  <h1 className=' font-bold'>Bus Name</h1>
                  <TextField
                      required
                      id="filled-multiline-flexible"
                      label="Please Enter Bus Name"
                      name='name'
                      value={addbusdata.name}
                      onChange={handleInput}
                      multiline
                      maxRows={4}
                      variant="filled"
                  />
                  <div className=' flex w-full gap-4 mt-2'>
                      <div className=' w-full'>
                          <h1 className=' font-bold'>From</h1>
                          <TextField
                              required
                              id="filled-textarea"
                              label="Where From?"
                              name='from'
                              value={addbusdata.from}
                              placeholder="Please enter a valid name."
                              multiline
                              variant="filled"
                              className='w-full'
                              onChange={handleInput}
                          />
                      </div>
                      <div className=' w-full'>
                          <h1 className=' font-bold'>To</h1>
                          <TextField
                              required
                              id="filled-textarea"
                              label="Where To?"
                              placeholder="Please enter a valid name."
                              name='to'
                              value={addbusdata.to}
                              multiline
                              variant="filled"
                              className='w-full'
                              onChange={handleInput}
                          />
                      </div>
                  </div>
                  <h1 className=' font-bold mt-2'>Routes</h1>
                  <TextField
                      id="filled-multiline-static"
                      label="Enter Your Bus Route."
                      name='route'
                      value={addbusdata.route}
                      multiline
                      rows={4}
                      variant="filled"
                      onChange={handleInput}
                  />
              </div>
              <Button type='submit' variant="contained">Add Bus</Button>
          </form>
      </div>
  )
}

export default AddBus
