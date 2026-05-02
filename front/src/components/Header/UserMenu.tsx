import React, { useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import type { User } from "../../types";
import { NavLink } from "react-router";
import { logout } from "../../features/users/usersThunks";
import { useAppDispatch } from "../../app/hooks";
import { BASE_URL } from "../../constants";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutClick = async (e: React.MouseEvent) => {
    await dispatch(logout());
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
      <Button
        variant="text"
        component={NavLink}
        to="/add-artist"
        color="inherit"
      >
        Add Artist
      </Button>
      <Button variant="text" component={NavLink} to="add-album" color="inherit">
        Add Album
      </Button>
      <Button
        variant="text"
        component={NavLink}
        to="/add-treck"
        color="inherit"
      >
        Add Treck
      </Button>
      <Button onClick={handleClick} color="inherit">
        {user.avatar && (
          <Box sx={{ width: "50px", height: "50px", borderRadius: "50%", overflow: 'hidden', marginRight: 1 }}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: 'contain',
                display: "block",
              }}
              src={`${BASE_URL + "/" + user.avatar}`}
            />
          </Box>
        )}
        Hello, {user.username}
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Button component={NavLink} to="/history" color="inherit">
            listening history
          </Button>
        </MenuItem>
        <MenuItem onClick={logoutClick}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
