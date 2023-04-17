/**
 * This module contains the Redux slice that manages the todos
 * @module todosSlice
 * @requires reduxjs/toolkit
 */

import { createSlice } from '@reduxjs/toolkit'

/**
 * Initial state of the todosSlice reducer
 * @constant {Object}
 * @default
 */

const initialState = {
    todos: JSON.parse(localStorage.getItem("todos")) || []
}

/**
 * Redux slice that manages the todos
 * @type {Slice}
 */

export const todosSlice = createSlice({

    /**
     * Name of the slice
     * @type {string}
     */

    name: 'todos',

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
         * Adds a todo to the list of todos
         * @function
         * @param {Object} state - Current state of the reducer
         * @param {Object} action - Redux action object
         * @param {Object} action.payload - Payload of the action, containing the todo object to add
         */

        addtodo: (state,action) => {
            state.todos.push(action.payload) // aqui podem fer push
        },

        /**
         * Removes a todo from the list of todos
         * @function
         * @param {Object} state - Current state of the reducer
         * @param {Object} action - Redux action object
         * @param {number} action.payload - Payload of the action, containing the id of the todo to remove
         */

        deltodo: (state,action) => {
            state.todos = state.todos.filter( todo => todo.id !== action.payload)
        },

        /**
         * Toggles the done property of a todo
         * @function
         * @param {Object} state - Current state of the reducer
         * @param {Object} action - Redux action object
         * @param {number} action.payload - Payload of the action, containing the id of the todo to toggle
         */

        toggletodo: (state,action) => {
            state.todos = state.todos.map ((todo)=> {
                if (todo.id === action.payload) { //id
                    return { ...todo, done:!todo.done } // invertim el done
                }
                return todo
            })
        }
    }
})

/**
 * Action creators of the todosSlice
 * @type {Object}
 */

export const { addtodo, deltodo, toggletodo } = todosSlice.actions

/**
 * Reducer function of the todosSlice
 * @type {Function}
 */

const todosReducer = todosSlice.reducer

export default todosReducer