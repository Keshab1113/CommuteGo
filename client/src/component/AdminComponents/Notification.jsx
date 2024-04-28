import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Messages from './Messages'
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";



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
                <Badge color="secondary" variant="dot">
                    <NotificationsIcon className="cursor-pointer text-black dark:text-white" />
                </Badge>
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

                <div onClick={handleCloseUserMenu} className="flex flex-col w-96  justify-center items-center">
                    <Messages />
                </div>

            </Menu>

        </AppBar>
    );
}
export default ResponsiveAppBar;
