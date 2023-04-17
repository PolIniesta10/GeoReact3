/**
 * This module contains the Redux slice that manages the marked posts
 * @module postMarkSlice
 * @requires reduxjs/toolkit
 */

import { createSlice } from '@reduxjs/toolkit'

/**
 * Initial state of the postMarkSlice reducer
 * @constant {Object}
 * @default
 */

const initialState = {
    postMarks: JSON.parse(localStorage.getItem("marksPosts")) || [],
    isMarked: false
}

/**
 * Redux slice that manages the marked posts
 * @type {Slice}
 */

export const postMarkSlice = createSlice({

    /**
     * Name of the slice
     * @type {string}
     */

    name: 'postMarks',

    /**
     * Initial state of the reducer
     * @type {Object}
     */

    initialState,

    /**
     * Reducer functions
     * @type {Object}
     */
    reducers: {

        /**
         * Adds a post to the list of marked posts
         * @function
         * @param {Object} state - Current state of the reducer
         * @param {Object} action - Redux action object
         * @param {Object} action.payload - Payload of the action, containing the post object to add
         */

        addpostmark: (state, action) => {
            state.postMarks.push(action.payload) // aqui podem fer push
            state.isMarked = true;

        },

        /**
         * Removes a post from the list of marked posts
         * @function
         * @param {Object} state - Current state of the reducer
         * @param {Object} action - Redux action object
         * @param {number} action.payload - Payload of the action, containing the id of the post to remove
         */

        delpostmark: (state, action) => {
            state.postMarks = state.postMarks.filter(postMarks => postMarks.id !== action.payload)
        },

        /**
         * Checks if a post is marked
         * @function
         * @param {Object} state - Current state of the reducer
         * @param {Object} action - Redux action object
         * @param {number} action.payload - Payload of the action, containing the id of the post to check
         */

        ismarked: (state, action) => {
            state.isMarked = false
            state.postMarks.map((postMark) => {
                if (postMark.id == action.payload) { //id
                    state.isMarked = true;
                }
            })
        }
    }
})

/**
 * Action creators of the postMarkSlice
 * @type {Object}
 */

export const { addpostmark, delpostmark, ismarked } = postMarkSlice.actions

/**
 * Reducer function of the postMarkSlice
 * @type {Function}
 */

const postsMarksReducer = postMarkSlice.reducer

export default postsMarksReducer