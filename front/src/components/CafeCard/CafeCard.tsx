import { Grid, Box, Typography } from "@mui/material";
import type { Cafe } from "../../types";
import { BASE_URL } from "../../constants";
import Rating from "@mui/material/Rating";


interface Props {
    cafe: Cafe;
}


const CafeCard: React.FC<Props> = ({ cafe }) => {
    return (
      <Grid
        size={3}
        sx={{
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          sx={{
            width: "100%", 
            height: "200px", 
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", 
            }}
            src={BASE_URL + "/" + cafe.images[0]}
            alt="Cafe image"
          />
        </Box>
        <Box sx={{ padding: "5px 10px 10px" }}>
          <Typography>{cafe.title}</Typography>
          <Rating
            name="half-rating-read"
            defaultValue={cafe.overal}
            precision={0.5}
            readOnly
          />
          <Typography variant="subtitle2">{`(${cafe.overal.toFixed(1)}, ${cafe.total} reviews)`}</Typography>

          <Typography variant="subtitle2">
            {cafe.images.length} Photos
          </Typography>
        </Box>
      </Grid>
    );
}; 

export default CafeCard;