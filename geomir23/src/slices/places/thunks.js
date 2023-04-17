import { startLoadingPlaces, setError, setPlaces, setPlace, setFavorites, setFavorited, setPages, setFilter } from "./placeSlice";
import { useNavigate } from "react-router-dom";

export const getPlaces = (authToken,page = 0) => {
    return async (dispatch, getState) => {
        let filter = getState().places.filter;
        dispatch(startLoadingPlaces());

        const headers = {

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        let url =  page > 0 ? 
        "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page 
        : 
        "https://backend.insjoaquimmir.cat/api/places" ;

        let primsimbolo = page > 0 ? "&" : "?";

        let description = filter.description != "" ? "description="+filter.description : "";

        let author = filter.author != "" ? "author="+filter.author : "";

        if (description != "" && author != ""){
            url = url+primsimbolo+description+"&"+author;
        }

        else if (author != ""){
            url = url+primsimbolo+author;
        }

        else if (description != "" ){
            url = url+primsimbolo+description;
        }

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if(resposta.success == true) {
            if (page > 0) {
                dispatch(setPlaces(resposta.data.collection));
                dispatch(setPages(resposta.data.links));
                console.log(resposta.data.links);
            } else {
                dispatch(setPlaces(resposta.data));
            }
        }else {
            setError(resposta.message);
        }
    }
}

export const getPlace = (id, authToken) => {
    return async (dispatch, getState) => {

        dispatch(startLoadingPlaces());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setPlace(resposta.data));
            dispatch(setFavorites(resposta.data.favorites_count));
            dispatch(testFavourites(id, authToken));

        } else {
            dispatch(setError(resposta.message));
        }
    };
}

// export const addPlace = (formulari, authToken) => {
export const addPlace = (data2, authToken) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingPlaces());

    // let { name, description, upload, latitude, longitude, visibility } = formulari;
    let { name, description, upload, latitude, longitude, visibility } = data2;
    const formData = new FormData();
        
    formData.append("name", name);
    formData.append("description", description);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    const headers = {

        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken,
        },
        method: "POST",
        body: formData
    };
    const url = "https://backend.insjoaquimmir.cat/api/places";

    const data = await fetch(url, headers);
    
    const resposta = await data.json();

    if (resposta.success == true) {
        console.log("Place Creat");
        dispatch(getPlaces(authToken));
    } else {
        setError(resposta.message);
    }
  };
}

export const editPlace = (formulari, authToken, place) => {
    return async (dispatch, getState) => {

    let { name, description, upload, latitude, longitude, visibility } = formulari;
    const formData = new FormData();
        
    formData.append("name", name);
    formData.append("description", description);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    const data = await fetch(
      "https://backend.insjoaquimmir.cat/api/places/" + place.id,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "POST",
        body: formData,
      }
    );
    const resposta = await data.json();

    if (resposta.success == true) {
        console.log("Place Editat");
    } else {
        setError(resposta.message);
    }
  };
}

export const delPlace = (place, authToken) => {
    return async (dispatch, getState) => {

        dispatch(startLoadingPlaces());

        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + place.id,
            {
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            }
        );
        const resposta = await data.json();
        console.log(resposta);

        if (resposta.success == true) {
            dispatch (getPlaces(0, authToken))
        }
    };
};

export const testFavourites = (id, authToken) => {
    return async (dispatch, getState) => {
        
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites"

        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setFavorited(false));
            console.log('Favorited False')
            const headers = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            };
            const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites"
    
            const data = await fetch(url,  headers  );
            const resposta = await data.json();

        } else {
            dispatch(setFavorited(true));
            console.log("Favorited");
        }
    };
}

export const favourite = (id, authToken, favorites) => {
    return async (dispatch, getState) => {

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites"

        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setFavorited(true));
            dispatch(setFavorites(favorites + 1));
        } else {
            dispatch(setFavorited(false));
        }
        
    };
}

export const unfavourite = (id, authToken, favorites) => {
    return async (dispatch, getState) => {

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "DELETE",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites"

        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setFavorited(false));
            dispatch(setFavorites(favorites - 1));
        }
    };
}