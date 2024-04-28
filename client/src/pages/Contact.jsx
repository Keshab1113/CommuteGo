import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className=' h-screen flex justify-center items-center w-full'>
      <div className=' h-[40%] sm:w-[80%] w-full flex flex-col justify-center items-center'>
        <h1 className=' text-center text-4xl font-semibold'>Welcome To The Help Centre</h1>
        <p className=' text-2xl text-center'>We're available for 24 hours</p>
        <div className=' flex border mt-4 flex-col sm:flex-row items-center'>
          <div className=' flex sm:w-[50%] w-[80%] flex-col p-4'>
            <h1 className=' font-bold text-xl'><FontAwesomeIcon icon={faPhone} className=' text-2xl pr-2' />Call Us</h1>
            <p>For anything urgent you can call us 24/7 on a local or international phone number.</p>
          </div>
          <div className=' flex sm:w-[50%] w-[80%] flex-col p-4'>
            <h1 className=' font-bold text-xl'><FontAwesomeIcon icon={faMailBulk} className=' text-2xl pr-2' />Email Us</h1>
            <p>For any querry, you can contact us through
              <Link to={"mailto:mailboxofsarkar@gmail.com"} class="hover: text-cyan-950 opacity-70 hover:opacity-100"> mailboxofsarkar@gmail.com</Link></p>
          </div>
        </div>
        <Link to={"mailto:mailboxofsarkar@gmail.com"}>
          <Button variant="outlined" className=' top-4'>Contact Us</Button>
        </Link>
      </div>
    </div>
  )
}

export default Contact
