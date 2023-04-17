import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PlaceMark from './PlaceMark';




const PlaceMarks = () => {


    const { placeMarks } = useSelector((state) => state.placeMarks);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("marksPlaces", JSON.stringify(placeMarks));
      }, [placeMarks]);

      

    return (
        <>
        {placeMarks.map((placeMark) => (
            <>
            <th>Name</th>
            <th>Description</th>
            <th colSpan={2}>Actions</th>
            <tr>
                <PlaceMark key={placeMark.id} placeMark={placeMark} />
            </tr>
            </>
        ))}
        </>
    )
}

export default PlaceMarks
