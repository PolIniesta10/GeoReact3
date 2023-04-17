import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { delplacemark } from '../slices/placeMarkSlice';

const PlaceMark = ({placeMark}) => {
    console.log(placeMark)
    const dispatch = useDispatch();

    return (
        <>
            <td>{placeMark.name}</td>
            <td>{placeMark.description}</td>
            <td><Link to={placeMark.ruta}>VEURE</Link></td>
            <br></br>
            <td><button onClick={() => {dispatch(delplacemark(placeMark.id))}}>ESBORRAR</button></td>
        </>
    )
}

export default PlaceMark