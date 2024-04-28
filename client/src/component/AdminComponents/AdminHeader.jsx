import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import Button from "@mui/material/Button";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DevicesIcon from '@mui/icons-material/Devices';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import LogoutIcon from '@mui/icons-material/Logout';
import Notification from "./Notification";
import User from "./User"
import {useAuth} from "../../store/auth"


function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [ismenu, setIsmenu] = useState(true);
    const { isLoggedIn } = useAuth();

    const showSidebar = () => {
        setIsmenu(!ismenu);
        setSidebar(!sidebar);

    };

    return (
        <>
            <div className="bg-white dark:bg-slate-900 h-[8vh] border-b-2 dark:border-slate-700 flex fixed w-full justify-between">
                <div className="sm:w-[10%] w-[30%] h-full flex justify-around items-center pl-5">
                    <button
                        onClick={showSidebar}
                        className="bg-white cursor-pointer text-red dark:text-white dark:bg-slate-900"
                    >
                        {
                            ismenu ? <FormatAlignJustifyIcon className="mr-2 text-2xl text-black dark:text-white" /> : < FormatAlignLeftIcon className="mr-2 text-2xl text-black dark:text-white" />
                        }
                    </button>
                    <Link to={"/admin"}>
                        <img src={'/logo.png'} alt="Company logo" width="auto" height={50} title="Home" />
                    </Link>
                </div>
                <div className=" sm:w-[65%] w-[25%] items-center sm:justify-start justify-center sm:flex float-left hidden ">
                    <div className="flex w-2/4 justify-center items-center">
                        <SearchIcon className="mr-2 text-2xl text-black dark:text-white" />
                        <input
                            type="search"
                            placeholder="Search here...."
                            name="Search"
                            id=""
                            className=" h-10 w-[90%] outline-none px-4 border dark:border-black dark:bg-slate-600 bg-white dark:text-white"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between ">
                    <div className="flex items-center justify-center h-full w-14 border-x-2 dark:border-slate-700">
                        <Notification />
                    </div>
                    <div className="flex items-center justify-start px-4">
                        {isLoggedIn ? (
                            <>
                                <User />
                            </>
                        ) : (
                            <>
                                <Link to={"/login"}>
                                    <Button variant="outlined" sx={{ marginRight: "10px", width: "50px", marginLeft: "5px" }}>Login</Button>
                                </Link>
                                <Link to={"/signup"}>
                                    <Button variant="outlined" sx={{ marginRight: "", width: "50px" }}>Signup</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <nav
                className={
                    sidebar
                        ? "nav-menu active bg-slate-200 dark:bg-[#060b26] fixed"
                        : "nav-menu fixed"
                }
            >
                <ul className="flex flex-col items-center w-full" onClick={showSidebar}>
                    <NavLink className="sidebaritems">
                        <HomeIcon className="" />
                        Home
                    </NavLink>
                    <Link to={'/'} className=" sidebaritems">
                        <DevicesIcon className="" />
                        Frontend
                    </Link>
                    <Link to={"feedback"} className=" sidebaritems">
                        <ManageHistoryIcon className="" />
                        FeedBacks
                    </Link>
                    
                    <Link to={"users"} className="sidebaritems">
                        <SupervisedUserCircleIcon className="" />
                        User Manage
                    </Link>
                    <Link to={"busdata"} className="sidebaritems">
                        <SupervisedUserCircleIcon className="" />
                        Add BusData
                    </Link>
                    <Link to={"profile"} className="sidebaritems">
                        <AccountCircleIcon className="" />
                        Profile
                    </Link>
                    <Link to={"/logout"} className="sidebaritems">
                        <LogoutIcon className="rotate-180 " />
                        Logout
                    </Link>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;