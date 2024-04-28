import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";

const defaultfeedbackform = {
  fullname: "",
  email: "",
  phone: "",
  message: "",
};

const FeedBack = () => {

  const [feedback, setFeedback] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFeedback({
      ...feedback,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form/feedback`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(feedback)
      });
      if (response.ok) {
        setFeedback(defaultfeedbackform);
        const data = await response.json();
        toast.success("Message send successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=' h-screen pt-[6rem] mb-10 flex flex-col justify-center items-center '>
      <div className=' mt-5 sm:w-[70%] w-[90%] h-[80%] flex flex-col  items-center border shadow-xl shadow-violet-200 p-2'>
        <h1 className=' text-center text-2xl font-semibold mb-4 text-violet-800 mt-6 underline capitalize'>Welcome to our FeedBack form</h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-6 mb-4'>
          <div className='reviewFrom'>
            <h1 className=' font-semibold text-violet-800 mb-2'>Please Enter Your Full Name*</h1>
            <TextField
              required
              id="outlined-required"
              label="Name"
              name='fullname'
              value={feedback.fullname}
              onChange={handleInput}
              autoComplete='off'
            />
          </div>

          <div className='reviewFrom'>
            <h1 className=' font-semibold text-violet-800 mb-2'>Please Enter Your Email Address*</h1>
            <TextField
              required
              id="outlined-required2"
              label="Email"
              name='email'
              value={feedback.email}
              onChange={handleInput}
              autoComplete='off'
            />
          </div>
          <div className='reviewFrom'>
            <h1 className=' font-semibold text-violet-800 mb-2'>Enter Your Mobile Number*</h1>
            <TextField
              required
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              name='phone'
              value={feedback.phone}
              onChange={handleInput}
              autoComplete='off'
            />
          </div>
          <div className='reviewFrom'>
            <h1 className=' font-semibold text-violet-800 mb-2'>Your Valuable Suggestion*</h1>
            <TextField
              required
              id="outlined-multiline-static"
              label="Suggestion"
              multiline
              rows={4}
              name='message'
              value={feedback.message}
              onChange={handleInput}
              autoComplete='off'
            />
          </div>
          <Button type='submit' variant="outlined" className=' w-32 h-10' >Submit</Button>
        </form>

      </div>
    </div>
  )
}

export default FeedBack
