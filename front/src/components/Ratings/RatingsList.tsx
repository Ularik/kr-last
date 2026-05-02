import { Box } from "@mui/material";
import type { Rating } from "../../types";
import RatingItem from "./RatingItem";


interface Props {
    ratings: Rating[];
}

const RatingsList: React.FC<Props> = ({ ratings }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: "column", gap: 1 }}>
        {ratings.map(rate => (
            <RatingItem key={rate._id} rating={rate}/>
        ))}
        </Box>
    )
};

export default RatingsList;