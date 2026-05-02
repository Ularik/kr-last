import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCafes } from "../../features/cafes/cafesSelectors";
import { useEffect } from "react";
import { fetchCafes } from "../../features/cafes/cafesThunks";
import CafeCard from "../../components/CafeCard/CafeCard";


const Home = () => {
    const dispatch = useAppDispatch();
    const cafeList = useAppSelector(selectCafes);

    useEffect(() => {
        dispatch(fetchCafes());
    }, [dispatch])
    return (
      <>
        <Typography>All Places</Typography>
        <Grid container spacing={2}>
          {cafeList.map((cafe) => (
            <CafeCard key={cafe._id} cafe={cafe} />
          ))}
        </Grid>
      </>
    );
};

export default Home;