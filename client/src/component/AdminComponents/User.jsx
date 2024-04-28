import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";



function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };



    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ width: "50px", backgroundColor: "white", boxShadow: "none" }} className=" bg-white dark:bg-slate-900">
            <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleIcon className="dark:text-white" />
            </IconButton>

            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >

                <div onClick={handleCloseUserMenu} className="flex flex-col w-[100px] justify-center items-center">
                    <Link to={"/admin/profile"} className=" h-7 w-full text-center font-bold"><AccountCircleIcon className=" mr-2" />Profile</Link>
                    <Link to={"/logout"} className=" h-7 w-full text-center mt-4 font-bold"><LogoutIcon className=" rotate-180 mr-2" />Logout</Link>
                </div>

            </Menu>

        </AppBar>
    );
}
export default ResponsiveAppBar;
