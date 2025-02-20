import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain, faBus, faTrainTram, faPlane, faHouse } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../../store/auth";
import User from "./User";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

export const shoot = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "We are Working on this features...",
  });
};

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsopen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Access ThemeContext

  const toggleNavbar = () => {
    setIsopen(!isOpen);
  };

  const adminlogin = () => {
    navigate("login");
  };

  return (
    <div className=" bg-white  top-2 mx-auto w-[90vw] flex justify-center items-center sm:px-12 px-2 h-16 rounded-xl shadow-lg shadow-cyan-500/50 z-50 fixed ml-[5vw]">
      {/* Navigation Links (Desktop View) */}
      <div className="hidden md:flex w-8/12 justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navbarOption duration-200 ${isActive ? " text-violet-900 " : "text-cyan-900"}`
          }
        >
          <FontAwesomeIcon icon={faHouse} className="mr-1 lg:inline md:hidden hidden mt-[2px]" />
          Home
        </NavLink>
        <NavLink
          to="/bus"
          className={({ isActive }) =>
            `navbarOption duration-200 ${isActive ? "text-violet-900 " : "text-cyan-900"}`
          }
        >
          <FontAwesomeIcon icon={faBus} className="mr-1 lg:inline md:hidden hidden mt-[2px]" />
          Bus
        </NavLink>
        <NavLink onClick={shoot} className="navbarOption text-cyan-900">
          <FontAwesomeIcon icon={faTrain} className="mr-1 lg:inline md:hidden hidden mt-[2px]" />
          Train
        </NavLink>
        <NavLink onClick={shoot} className="navbarOption text-cyan-900">
          <FontAwesomeIcon icon={faTrainTram} className="mr-1 lg:inline md:hidden hidden mt-[2px]" />
          Metro
        </NavLink>
        <NavLink
          to="/flight"
          className={({ isActive }) =>
            `navbarOption duration-200 ${isActive ? " text-violet-900 " : "text-cyan-900"}`
          }
        >
          <FontAwesomeIcon icon={faPlane} className="mr-1 rotate-[-90deg] lg:inline md:hidden hidden mt-[2px]" />
          Flight
        </NavLink>
        <NavLink onClick={shoot} className="navbarOption text-cyan-900">
          <FontAwesomeIcon icon={faTrainTram} className="mr-1 lg:inline md:hidden hidden mt-[2px]" />
          Tram
        </NavLink>
      </div>

      {/* Right Side Buttons */}
      
        
        <div className=" lg:w-fit md:w-fit w-full flex justify-between">
        <NavLink to="/" className=" ml-2 md:hidden">
          <h1 className="text-2xl font-semibold text-violet-800">CommuteGo</h1>
        </NavLink>
        <div className="flex items-center gap-4 absolute right-4 top-3">
        {isLoggedIn ? <User /> : <Button onClick={adminlogin} variant="outlined">Admin Login</Button>}
        <button onClick={toggleNavbar} className="md:hidden">
          {isOpen ? (
            <X className="text-violet-800 dark:text-white" />
          ) : (
            <Menu className="text-violet-800 dark:text-white" />
          )}
        </button>
      </div>
      </div>
      <button
          onClick={toggleDarkMode}
          className={` absolute right-2 top-20 flex items-center justify-center gap-2 rounded-full text-white transition-all duration-500 h-10 w-10 ${
            darkMode ? "bg-white" : "bg-black"
          } shadow-md`}
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-black" />
          ) : (
            <Moon className="w-6 h-6 text-white" />
          )}
        </button>

      {/* Mobile View Navbar */}
      

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="w-full flex basis-full flex-col items-center z-50 bg-white md:hidden absolute top-14 left-0 rounded-b-lg shadow-lg shadow-cyan-500/50">
          <NavLink to="/bus" data-aos="fade-up" data-aos-delay="50" className="navItemsStyle">
            <FontAwesomeIcon icon={faBus} className="mr-2" />
            Bus
          </NavLink>
          <NavLink onClick={shoot} data-aos="fade-up" data-aos-delay="100" className="navItemsStyle">
            <FontAwesomeIcon icon={faTrain} className="mr-2" />
            Train
          </NavLink>
          <NavLink onClick={shoot} data-aos="fade-up" data-aos-delay="150" className="navItemsStyle">
            <FontAwesomeIcon icon={faTrainTram} className="mr-2" />
            Metro
          </NavLink>
          <NavLink to="/flight" data-aos="fade-up" data-aos-delay="200" className="navItemsStyle">
            <FontAwesomeIcon icon={faPlane} className="rotate-[-90deg] mr-2" />
            Flight
          </NavLink>
          <NavLink onClick={shoot} data-aos="fade-up" data-aos-delay="250" className="navItemsStyle">
            <FontAwesomeIcon icon={faTrainTram} className="mr-2" />
            Tram
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
