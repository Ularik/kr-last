import { Box, Typography } from "@mui/material";
import type { Rating as RatingType } from "../../types";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  rating: RatingType;
}

const ratingStyle = {
    width: '200px'
}

const RatingItem: React.FC<Props> = ({ rating }) => {
  const [overalRate, setOveralRate] = useState(rating.overal);
  const [foodRate, setFoodRate] = useState<number>(rating.food);
  const [serviceRate, setServiceRate] = useState<number>(rating.service);
  const [interiorRate, setInteriorRate] = useState<number>(rating.interior);

  useEffect(() => {
    setFoodRate(rating.food);
    setServiceRate(rating.service),
      setInteriorRate(rating.interior),
      setOveralRate(rating.overal);
  }, [rating.food, rating.service, rating.interior, rating.overal]);

    return (
      <Box
        sx={{
          boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.2)",
          padding: 1,
          width: "500px",
        }}
      >
        <Box>
          <Typography variant="subtitle2">
            On {new Date(rating.createdAt).toLocaleDateString()}{" "}
            {rating.user.username} said:
          </Typography>
          <Typography variant="body2">{rating.description}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Box sx={{ ...ratingStyle, marginBlock: 1 }}>
            <Typography variant="subtitle2">Overall:</Typography>
          </Box>
          <Box sx={ratingStyle}>
            <Rating
              name="half-rating-read"
              value={overalRate}
              precision={0.5}
              readOnly
            />
          </Box>
          <Typography>{rating.overal.toFixed(1)}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Box sx={ratingStyle}>
            <Typography>Quality of food:</Typography>
          </Box>
          <Box sx={ratingStyle}>
            <Rating
              name="half-rating-read"
              value={foodRate}
              precision={0.5}
              readOnly
            />
          </Box>
          <Typography>{rating.food.toFixed(1)}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Box sx={ratingStyle}>
            <Typography>Service:</Typography>
          </Box>
          <Box sx={ratingStyle}>
            <Rating
              name="half-rating-read"
              value={serviceRate}
              precision={0.5}
              readOnly
            />
          </Box>
          <Typography>{rating.service.toFixed(1)}</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Box sx={ratingStyle}>
            <Typography>Interior:</Typography>
          </Box>
          <Box sx={ratingStyle}>
            <Rating
              name="half-rating-read"
              value={interiorRate}
              precision={0.5}
              readOnly
            />
          </Box>
          <Typography>{rating.interior.toFixed(1)}</Typography>
        </Box>
      </Box>
    );
};


export default RatingItem;