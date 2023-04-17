import { setAdd, setError, setReviews, setReviewsCount, startLoadingReviews } from "./reviewSlice";

export const getReviews = (page = 0, id, authToken, usuari="") => {
    return async (dispatch, getState) => {

        dispatch(startLoadingReviews());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews"

        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) 
        {
            dispatch(setReviews(resposta.data));
            dispatch(setReviewsCount(resposta.data.length))
        }
        else {
            dispatch (setError(resposta.message));
        }

        resposta.data.map((v) => {
            if (v.user.email === usuari) {
                dispatch (setAdd(false));
                console.log("Te review");
            }
        });
       
};
}

export const delReview = (review, authToken) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" +
              review.place.id +
              "/reviews/" +
              review.id,
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
            dispatch (setAdd(true));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch (getReviews(0,review.place.id,authToken))
            const state = getState()
            dispatch (setReviewsCount(state.reviews_count - 1));
          }
    };
};

// export const addReview =  ( place_id, review, authToken) => {
  export const addReview =  (dataWithId) => {

    return async (dispatch,getState) => {
      const {review,id,authToken} = dataWithId;
      console.log(dataWithId.review);
      console.log(dataWithId.id);
      const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/places/" + id +"/reviews",
          {
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + authToken,
              },
              method: "POST",
              body: JSON.stringify({review})
          }
      );
    const resposta = await data.json();
    console.log(resposta);
    
    if (resposta.success == true) {
        dispatch (setAdd(false));
        console.log("Todo bien"); 
        dispatch(setReviews(review))
        dispatch (getReviews(0,id,authToken))
        const state = getState()
        dispatch (setReviewsCount(state.reviewsCount + 1));
  


    } else {
        setError(resposta.message)
    }
  };
}