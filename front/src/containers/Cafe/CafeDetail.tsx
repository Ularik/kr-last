import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCafes } from "../../features/cafes/cafesSelectors";


const CafeDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const cafe = useAppSelector(selectCafes);

    useEffect(() => {
        dispatch()
    }, [dispatch, id])
    return (
        <>
        </>
    )
};


export default CafeDetail;