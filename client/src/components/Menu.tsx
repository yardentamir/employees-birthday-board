import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import client from "../services/client";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    try {
      await client.post(`employee/logOut`);

      Cookies.remove("accessToken", { path: "" });
      handleClose();
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Login failed:", axiosError.message);
    }
  };

  const handleLogOutAllDevices = async () => {
    try {
      await client.post(`employee/logOutAll`);

      Cookies.remove("accessToken", { path: "" });
      handleClose();
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Login failed:", axiosError.message);
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "primary.main",
          padding: "3px",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
        <Typography sx={{ minWidth: 100, color: "white" }}>
          Hello name
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        color="main"
      >
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={handleLogOutAllDevices}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout All Devices
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
