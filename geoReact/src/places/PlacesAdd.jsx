import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../userContext';
import 'leaflet/dist/leaflet.css';

import "../App.css"

import { Marker, Popup, useMapEvents ,MapContainer, TileLayer, useMap } from 'react-leaflet'

import { useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { addPlace } from "../slices/places/thunks";

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export const PlacesAdd = () => {

  
  const { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { places = [], page=0, error="", isLoading=true } = useSelector((state) => state.places);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { register, handleSubmit,formState: { errors },setValue} = useForm();

  const afegir = (data) => {

    const data2 = { ...data, upload: data.upload[0]}
    
    dispatch(addPlace(data2, authToken));

    navigate("/places/grid");
    
  }

  

  useEffect(() => {
    // dispatch(addPlace(afegir));
    navigator.geolocation.getCurrentPosition((pos) => {

      setValue('latitude', pos.coords.latitude)

      setValue('longitude', pos.coords.longitude)
    });

  }, [])

  

  return (
    <>
     <div className="py-9 pl-9">


    
    {/* <form method="post" action="" enctype="multipart/form-data"> */}
    <div className="py-9 flex flex-col gap-y-2">
        <label className="text-gray-600" htmlFor="Name">Nom</label>
        <input
            type="text"
            // value={formulari.name}
            // name="name"
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            // onChange={ handleChange}
            {...register("name", {
              required: "Aquest camp és obligatori",
              maxLength: {
                value: 255,
                message: "El nom pot contenir un maxim de 255 caràcters"
              },
             
            })}
        />
    </div>
    {errors.name && <p>{errors.name.message}</p>}

    <div className="w-1/3">
  <label className="text-gray-600">Descripció</label>
  <textarea 
    // name="description"
    // value={formulari.description}
    className="
      w-full
      h-32
      px-4
      py-3
      border-2 border-gray-300
      rounded-sm
      outline-none
      focus:border-blue-400
    "
    placeholder="Explica'ns alguna cosa d'aquest lloc..."
    // onChange={ handleChange}
    {...register("description", {
      required: "Aquest camp és obligatori",
      maxLength: {
        value: 255,
        message: "La descripció pot contenir un maxim de 255 caràcters"
      },
     
    })} 
  ></textarea>
  {errors.description && <p>{errors.description.message}</p>}

<div className="flex justify-center">
  <div className="mb-3 w-96">
    <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF (MAX. 800x400px)</label>
    <input name="upload" 
    // onChange={ handleChange}
    className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" 
    // id="upload"
    {...register("upload", {
      required: "Aquest camp és obligatori",
      maxLength: {
        value: 2048,
        message: "El nom de la imatge pot contenir un maxim de 2048 caràcters"
      },
     
    })} 
    />
  </div>
  {errors.file && <p>{errors.file.message}</p>}
</div>

<span className="flex flex-col gap-y-2">
        <label className="text-gray-600" htmlFor="Name">Longitud</label>
        <input
            type="text"
            // name="longitude"
            // value={formulari.longitude}
            // onChange={ handleChange}
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            {...register("longitude", {
              required: "Aquest camp és obligatori",
            })}
        />
</span>
{errors.longitude && <p>{errors.longitude.message}</p>}
<span className="flex flex-col gap-y-2">
        <label className="text-gray-600" htmlFor="Name">Latitud</label>
        <input
            type="text"
            // name="latitude"
            // value={formulari.latitude}
            // onChange={ handleChange}
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            {...register("latitude", {
              required: "Aquest camp és obligatori",         
            })}
        />
</span>
{errors.latitude && <p>{errors.latitude.message}</p>}

<label htmlFor="visibility" className="block mb-2 text-sm text-gray-600 dark:text-white">Selecciona la visibilitat</label>
<select 
  // value={formulari.visibility} name="visibility" id="visibility" onChange={ handleChange} 
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  {...register("visibility", {
    required: "Aquest camp és obligatori",        
  })} 
>
  <option defaultValue value="">----</option>
  <option  value="1">Public</option>
  <option value="2">Contactes</option>
  <option value="3">Privat</option>
  
</select>
{errors.visibility && <p>{errors.visibility.message}</p>}
<div className="py-9">
<button 
  // onClick={(e) => { e.preventDefault();  dispatch( addPlace(formulari, authToken))} }
  onClick={handleSubmit(afegir)}
  // type="submit" 
  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    Afegir Entrada
    </button>
    {/* { error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)  } */}
    {/* { avis ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-green-50 px-4 ring-2 ring-green-200 ">{avis}</div>) : (<></>)  } */}


    
  </div>
    
  
    
    
    
    
    
    </div>
    {/* </form> */}
    {/* <MapContainer style={{ height: 280 }} center={{ lat: 51.505, lng: -0.09 }} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      
  
  
    </MapContainer> */}
    </div>
    
    
    
    
    
    </>
  )
}
