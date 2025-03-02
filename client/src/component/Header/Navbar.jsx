import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain, faBus, faTrainTram, faPlane, faHouse } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../../store/auth";
import User from "./User";
import { ThemeContext } from "../../context/ThemeContext";

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
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const toggleNavbar = () => {
    setIsopen(!isOpen);
  };

  const adminlogin = () => {
    navigate("login");
  };

  return (
    <div className=" bg-white  top-2 mx-auto w-[90vw] flex justify-center items-center sm:px-12 px-2 h-16 rounded-xl shadow-lg shadow-cyan-500/50 z-50 fixed ml-[5vw]">
      <div className="hidden md:flex lg:w-[50%] md:w-[90%] w-full justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navbarOption duration-200 ${isActive ? " text-violet-900 " : "text-cyan-900"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `navbarOption duration-200 ${isActive ? "text-violet-900 " : "text-cyan-900"}`
          }
        >
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) =>
          `navbarOption duration-200 ${isActive ? "text-violet-900 " : "text-cyan-900"}`
        }>
          Contact
        </NavLink>
        <NavLink to="/services" onClick={shoot} className={({ isActive }) =>
          `navbarOption duration-200 ${isActive ? "text-violet-900 " : "text-cyan-900"}`
        }>
          Services
        </NavLink>
        {isLoggedIn ? <NavLink to="/admin/profile" className="navbarOption text-cyan-900">
          Profile
        </NavLink> : <NavLink onClick={adminlogin} className="navbarOption text-cyan-900">
          Admin
        </NavLink>
        }

      </div>

      {/* Right Side Buttons */}


      <div className=" lg:w-fit md:w-fit w-full flex justify-between">
        <NavLink to="/" className=" ml-2 md:hidden">
          <h1 className="text-2xl font-semibold text-cyan-400">CommuteGo</h1>
        </NavLink>
        <div className={`flex items-center gap-0 absolute ${isLoggedIn?"right-4 top-3":"right-4 top-5"}`}>
          {isLoggedIn && <User />}
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
        className={`  absolute right-2 top-20 flex items-center justify-center gap-2 rounded-full text-white transition-all duration-500 h-10 w-10 ${darkMode ? "bg-white" : "bg-black"
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
        <div className="w-full pt-4 flex basis-full flex-col items-center z-50 bg-white md:hidden absolute top-14 left-0 rounded-b-lg shadow-lg shadow-cyan-500/50">
          <NavLink to="/" onClick={()=>setIsopen(false)} className="navItemsStyle">
            Home
          </NavLink>
          <NavLink to="/about" onClick={()=>setIsopen(false)} className="navItemsStyle">
            About
          </NavLink>
          <NavLink to="/contact" onClick={()=>setIsopen(false)} className="navItemsStyle">
            Contact
          </NavLink>
          <NavLink to="/services" onClick={()=>{
            setIsopen(false);
            shoot();
            }} className="navItemsStyle">
            Services
          </NavLink>
          {isLoggedIn ? <NavLink to="/admin/profile" onClick={()=>setIsopen(false)} className="navItemsStyle">
            Profile
          </NavLink> :
            <NavLink onClick={()=>{
              setIsopen(false);
              adminlogin();
            }}
               className="navItemsStyle">
              Admin
            </NavLink>}
        </div>
      )}
    </div>
  );
};

export default Navbar;
