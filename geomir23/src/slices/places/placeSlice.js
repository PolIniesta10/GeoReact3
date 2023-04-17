import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    places: [],
    place: {
        file: { filepath:""},
        author: { name:""},
        title: "",
        description: "",
        visibility: "",
        latitude: 0,
        longitude: 0,
    },
    page: 1,
    pages: [],
    isLoading: false,
    favorites: 0,
    favorited: false,
    error: "",
    filter: { description: "", author: ""}
}

export const placeSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        startLoadingPlaces: (state) => {
            state.isLoading = true;
        },

        setPlaces: (state, action ) => {
            state.places = action.payload
            state.isLoading = false
        },

        setPlace: (state, action ) => {
            state.place = action.payload
            state.isLoading = false
        },

        setFavorites: (state, action ) => {
            state.favorites = action.payload
        },

        setFavorited: (state, action ) => {
            state.favorited = action.payload
        },

        setError: (state,action) => {
            state.error = action.payload
        },

        setPage: (state,action) => {
            state.page = action.payload
        },

        setPages: (state,action) => {
            state.pages = action.payload
        },

        setFilter: (state,action) => {
            state.filter = action.payload;
        },
    }
});

export const { startLoadingPlaces, setPlaces, setPlace, setFavorites, setFavorited, setError, setPage, setPages, setFilter } = placeSlice.actions;
export default placeSlice.reducer