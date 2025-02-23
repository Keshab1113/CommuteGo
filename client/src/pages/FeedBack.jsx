import React, { useState,useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import feedbackImage from "/feedback.png";
import { ThemeContext } from '../context/ThemeContext';

const defaultfeedbackform = {
  fullname: "",
  email: "",
  phone: "",
  message: "",
};

const FeedBack = () => {
  const [feedback, setFeedback] = useState(defaultfeedbackform);
const { darkMode } = useContext(ThemeContext);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form/feedback`, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(feedback),
      });
      if (response.ok) {
        setFeedback(defaultfeedbackform);
        toast.success("Message sent successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`min-h-screen flex flex-col justify-center items-center p-4 py-10 md:py-0 ${darkMode ? 'bg-[#1d1d1d] text-white' : 'bg-gradient-to-b from-white to-cyan-100'}`}
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-cyan-600 mb-6 text-center mt-10"
      >
        We Value Your Feedback
      </motion.h1>

      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        whileInView={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className={` shadow-xl rounded-xl p-6 sm:w-[80%] w-[95%] flex flex-col sm:flex-row items-center border border-cyan-200 ${darkMode ? 'bg-[#070707] text-white' : 'bg-white'}`}
      >
        <div className="w-full sm:w-2/5 p-3 flex justify-center">
          <motion.img 
            initial={{ scale: 0.95, opacity: 0 }} 
            whileInView={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.6 }} 
            src={feedbackImage} 
            alt="Feedback"
            className="w-full max-w-xs sm:max-w-sm"
          />
        </div>

        <div className="w-full sm:w-3/5 p-6">
          <motion.form 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            onSubmit={handleSubmit} 
            className="grid grid-cols-1 gap-4"
          >
            <TextField
              required
              fullWidth
              label="Full Name"
              name="fullname"
              value={feedback.fullname}
              onChange={handleInput}
              autoComplete="off"
              className="rounded-md"
              InputProps={{
                className: "bg-white border border-cyan-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all",
              }}
            />

            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              value={feedback.email}
              onChange={handleInput}
              autoComplete="off"
              className="rounded-md"
              InputProps={{
                className: "bg-white border border-cyan-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all",
              }}
            />

            <TextField
              required
              fullWidth
              label="Mobile Number"
              type="number"
              name="phone"
              value={feedback.phone}
              onChange={handleInput}
              autoComplete="off"
              className="rounded-md"
              InputProps={{
                className: "bg-white border border-cyan-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all",
              }}
            />

            <TextField
              required
              fullWidth
              label="Your Suggestion"
              multiline
              rows={3}
              name="message"
              value={feedback.message}
              onChange={handleInput}
              autoComplete="off"
              className="rounded-md"
              InputProps={{
                className: "bg-white border border-cyan-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-lg transition-all",
              }}
            />

            <motion.div 
              whileHover={{ scale: 1.04 }} 
              whileTap={{ scale: 0.96 }} 
              className="flex justify-center mt-4"
            >
              <Button 
                type="submit" 
                variant="contained"
                className="bg-cyan-600 text-white hover:bg-cyan-700 w-36 h-10 font-semibold rounded-md shadow-md transition-all"
              >
                Submit
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeedBack;
