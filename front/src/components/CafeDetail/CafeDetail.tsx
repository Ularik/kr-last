import { Grid, Typography, Box, Divider, Button } from "@mui/material";
import type { Cafe, Rating, RatingPost } from "../../types";
import { BASE_URL } from "../../constants";
import RatingsList from "../Ratings/RatingsList";
import RatingsForm from "../Ratings/RatingForm";
import { createRatings } from "../../features/ratings/ratingsThunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchRatings } from "../../features/ratings/ratingsThunks";
import { selectRatingsCreateError, selectRatingsLoading } from "../../features/ratings/ratingsSelectors";
import FileInput from "../FileInput/FileInput";
import { useState } from "react";
import { sendImages } from "../../features/cafes/cafesThunks";


interface Props {
  cafe: Cafe;
  ratings: Rating[];
}

const CafeDetail: React.FC<Props> = ({ cafe, ratings }) => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRatingsCreateError);
    const isLoading = useAppSelector(selectRatingsLoading);

    const sendRating = async (newRating: RatingPost) => {
        try {
            await dispatch(createRatings({cafeId: cafe._id, rating: newRating})).unwrap();
            dispatch(fetchRatings(cafe._id));
        } catch(e) {
            console.log(e);
        }
    }

    const [images, setImages] = useState<File[]>([]);

const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    setImages(Array.from(e.target.files)); 
  }
};

    const sendImage = () => {
      try {
        dispatch(sendImages({cafeId: cafe._id, images})).unwrap();
      } catch(e) {
        console.log(e);
      }
    }

  return (
    <>
      <Grid container spacing={2} sx={{ marginBlock: 3 }}>
        <Grid size={6}>
          <Typography variant="h4" sx={{ marginBlock: 2 }}>
            {cafe.title}
          </Typography>
          <Typography variant="body1">{cafe.description}</Typography>
        </Grid>
        <Grid size={6}>
          <Box
            sx={{
              height: "400px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.2)",
                padding: 2,
                height: "100%",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "contain",
                }}
                src={BASE_URL + "/" + cafe.images[0]}
                alt="Cafe image"
              />
            </Box>
          </Box>
        </Grid>

        <Grid size={12}>
          <Typography variant="h5" sx={{ marginBlock: 2 }}>
            Galery:
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {cafe.images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  height: "100px",
                  width: "100px",
                  boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={BASE_URL + "/" + image}
                  alt="Cafe image"
                />
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid size={12}>
          <Typography variant="h6" sx={{ marginBlock: 3 }}>
            Ratings
          </Typography>
          <Divider sx={{ my: 3 }} />

          <RatingsList ratings={ratings} />
        </Grid>

        <Grid size={7}>
          <RatingsForm
            isLoading={isLoading}
            error={error}
            submit={sendRating}
          />
        </Grid>

        <Grid size={7}>
          <Typography variant="h5" sx={{ marginBlock: 3 }}>Upload new photo</Typography>
          <FileInput
            onChange={fileInputChangeHandler}
            label="images"
            name="images"
          />
          <Button variant="outlined" onClick={sendImage}>
            Upload
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CafeDetail;
