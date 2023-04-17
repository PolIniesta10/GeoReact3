import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PlaceMark from './PlaceMark';


// import placesMarksReducer from './placesMarksReducer';


// const initialState = [];

// const init = ()=> {

//     return JSON.parse(localStorage.getItem("marksPlaces")) || []
// }



const PlaceMarks = () => {

    // const [marks, dispatchPlaces] = useReducer(placesMarksReducer, initialState,init);

    const { placeMarks } = useSelector((state) => state.placeMarks);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("marksPlaces", JSON.stringify(placeMarks));
      }, [placeMarks]);

      

    // const handleDeleteMark = (id) => {
    //     console.log("AQui arribo " + id);
    //     dispatchPlaces({
    //         type: "Del Mark",
    //         payload: id
    //     });
    //     console.log("Mark Eliminado")
    // };

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
