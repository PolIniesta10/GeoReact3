import { configureStore } from '@reduxjs/toolkit'
import placesMarksReducer from './slices/placeMarkSlice'
import todosReducer from './slices/todoSlice'
import postsMarksReducer from './slices/postMarkSlice'
import reviewSlice from './slices/reviews/reviewSlice'
import commentSlice from './slices/comments/commentSlice'
import placeSlice from './slices/places/placeSlice'
import postSlice from './slices/posts/postSlice'

/**
 * The Redux store instance.
 * @type {Store}
 */

export const store = configureStore({

/**
 * Redux store instance configured with multiple reducers.
 * @typedef {Object} Store
 * @property {Object} Store.todos - The todos reducer.
 * @property {Object} Store.placeMarks - The place marks reducer.
 * @property {Object} Store.postMarks - The post marks reducer.
 * @property {Object} Store.reviews - The reviews reducer.
 * @property {Object} Store.comments - The comments reducer.
 * @property {Object} Store.places - The places reducer.
 * @property {Object} Store.posts - The posts reducer.
 */

  reducer: {
    todos: todosReducer,
    placeMarks: placesMarksReducer,
    postMarks: postsMarksReducer,
    reviews: reviewSlice,
    comments: commentSlice,
    places: placeSlice,
    posts: postSlice,
    
  },
})