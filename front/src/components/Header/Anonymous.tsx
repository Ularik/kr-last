import { Grid, Button } from "@mui/material";
import { NavLink } from "react-router";

const AnonymousMenu = () => {
  return (
    <Grid>
      <Button component={NavLink} to="/register" color="inherit">
        Sign Up
      </Button>
      |
      <Button component={NavLink} to="/login" color="inherit">
        Sign in
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;
