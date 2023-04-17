import React, { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import "leaflet/dist/leaflet.css";

import "../App.css";

import { CommentsList } from "./comments/CommentsList";

import { useDispatch, useSelector } from "react-redux";
import { ismarked } from "../slices/postMarkSlice";
import { addpostmark } from "../slices/postMarkSlice";
import { getPost, like, unlike, delPost, editPost } from "../slices/posts/thunks";


export const Post = () => {

  const { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { post, page=0, error="", isLoading=true, likes, liked } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { postMarks, isMarked } = useSelector((state) => state.postMarks);

  const markPost = (event) => {
    event.preventDefault();
    if(post.body.lenght <= 1) return;

    const postMark = {
        id: post.id,
        body: post.body,
        ruta: pathname
    };
    console.log(postMark)
    dispatch(addpostmark(postMark))  
  };
  useEffect(() => {
    dispatch(getPost(id, authToken));
    dispatch(ismarked(id));
  }, []);

  return (
    <>
      {/* PostsShow { id } */}

      {/* Només es renderitza quan isLoading es false */}
      {isLoading ? (
        "Espera...."
      ) : (
        <>
          <div className="md:grid md:grid-col-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:bg-gray-900 dark:text-gray-100">
            <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1 ">
              <img
                src={
                  "https://backend.insjoaquimmir.cat/storage/" +
                  post.file.filepath
                }
                alt=""
                className=" col-span-1 w-200 h-96 items-center"
              />

              <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-40 transition duration-300 ease-in-out bg-white"></div>
            </div>

            <div className="max-w-xl">
              {/* <h2 className="bg-blue-300 col-span-1 text-xl font-semibold">
                {post.name}
              </h2> */}
              <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
                Enviada per: {post.author.name}
              </span>
              <span className="self-center   px-9 bg-gray-200 col-span-2 text-x2 font-semibold">
                Latitud: {post.latitude}{" "}
              </span>
              <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
                Longitud: {post.longitude}
              </span>

              <div className="bg-orange-100 py-3 text-x2 font-semibold">
                Cos
              </div>
              <p className=" bg-yellow-100">{post.body}</p>
              <div className="mt-10 h-12 max-h-full md:max-h-screen">
                {/* <MapContainer  style={{ height: 280 }} center={[43.92853, 2.14255]} zoom={12} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[43.92853, 2.14255]}>
    <Popup>
       { position }. 
    </Popup>
  </Marker>
</MapContainer> */}

                {/* <button type="submit" onClick={() => markPost(post)}>DESAR</button> */}
                {post.author.email === usuari ? (
                  <>
                    <Link
                      to={"/posts/edit/" + id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                    >
                      {" "}
                      Editar{" "}
                    </Link>
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                      onClick={(e) => dispatch( delPost(post, authToken)) }
                    >
                      {" "}
                      Esborrar
                    </a>
                  </>
                ) : (
                  <></>
                )}

                {isMarked ? (
                  <a
                    href="#"
                    
                    className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    DESAT
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => markPost(e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    DESAR
                  </a>
                )}


                {liked ? (
                  <a
                    href="#"
                    onClick={(e) => dispatch(unlike(id, authToken, likes))}
                    className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    - 👍 {likes}
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => dispatch(like(id, authToken, likes))}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    + 👍 {likes}
                  </a>
                )}

                {/* <ReviewAdd id={place.id}/> */}
                <CommentsList
                  id={post.id}
                  comments_count={post.comments_count}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
