import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE } from '../../constants/actionTypes';
import * as api from '../api';


// all actions/events toward our backend are going to be done using redux
// we need to dispatch those actions... from needful components...


// Action Creators are Function that return function...
export const getAllPost = () => async (dispatch) => {

    try {
        // 🟥 1st ==> server call ==> for get all posts
        const { data } = await api.getAllPost();

        // 🟥 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: FETCH_ALL, data });
    } catch (error) {
        console.log(error);
    }
}

// Action Creators are Function that return function...
export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    console.log(searchQuery)
    try {
        // 🟥 1st ==> server call ==> for get all posts
        const { data } = await api.getPostsBySearch(searchQuery);

        // 🟥 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: FETCH_BY_SEARCH, data });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}




export const createPost = (post) => async (dispatch) => {

    try {
        // 🟥 1st ==> server call
        const { data } = await api.createPost(post);

        // 🟥 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: CREATE, data });
    } catch (error) {
        console.log(error);
    }
}


export const updatePost = (id, post) => async (dispatch) => {

    try {
        // 🟥 1st ==> server call
        const { data } = await api.updatePost(id, post);

        // 🟥 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: UPDATE, data });
    } catch (error) {
        console.log(error);
    }
}


export const deletePost = (id) => async (dispatch) => {

    try {
        if (window.confirm("🔴 Are you sure to delete it? 🔴")) {

            // 🟥 1st ==> server call
            await api.deletePost(id);

            // 🟥 2nd ==> send (data) into Redux global store | post reducer 
            dispatch({ type: DELETE, data: id });
        } else {
            console.log("Can't delete...");
        }
    } catch (error) {
        console.log(error);
    }
}


export const likePost = (id) => async (dispatch) => {

    try {
        // 🟥 1st ==> server call
        const { data } = await api.likingPost(id);

        // 🟥 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: UPDATE, data });
    } catch (error) {
        console.log(error);
    }
}