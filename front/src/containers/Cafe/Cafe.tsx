import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCafeDetail } from "../../features/cafes/cafesSelectors";
import { fetchOneCafes } from "../../features/cafes/cafesThunks";
import { fetchRatings } from "../../features/ratings/ratingsThunks";
import { selectRatings } from "../../features/ratings/ratingsSelectors";
import CafeDetail from "../../components/CafeDetail/CafeDetail";


const Cafe = () => {
    const { cafeId } = useParams();

    const dispatch = useAppDispatch();
    const cafe = useAppSelector(selectCafeDetail);
    const ratings = useAppSelector(selectRatings);

    useEffect(() => {
      if (cafeId) {
        dispatch(fetchOneCafes(cafeId));
        dispatch(fetchRatings(cafeId));
      }
    }, [dispatch, cafeId]);

    return (
        <>
        {cafe && <CafeDetail cafe={cafe} ratings={ratings}/>}
        </>
    )
};


export default Cafe;