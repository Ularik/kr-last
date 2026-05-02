import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";


const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        inset: 0,
        zIndex: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
};


export default Spinner;