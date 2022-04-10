import { FETCH_ALL, FETCH_BY_SEARCH, LOADING_START, LOADING_END, CREATE, UPDATE, DELETE } from '../../constants/actionTypes';
import * as api from '../api';


// all actions/events toward our backend are going to be done using redux
// we need to dispatch those actions... from needful components...


export const getAllPost = (page) => async (dispatch) => {

    try {
        dispatch({ type: LOADING_START });
        // 🟩 1st ==> server call ==> for get all posts
        const { data } = await api.getAllPost(page);

        // 🟩 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: LOADING_END });

    } catch (error) {
        console.log(error);
    }
}


export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    try {
        dispatch({ type: LOADING_START });
        // 🟩 1st ==> server call ==> for get all posts
        const { data } = await api.getPostsBySearch(searchQuery);

        // 🟩 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: LOADING_END });
    } catch (error) {
        console.log(error);
    }
}



export const createPost = (post) => async (dispatch) => {

    try {
        dispatch({ type: LOADING_START });
        // 🟩 1st ==> server call
        const { data } = await api.createPost(post);
        console.log(data)

        // 🟩 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: LOADING_END });
    } catch (error) {
        console.log(error);
    }
}



export const updatePost = (id, post) => async (dispatch) => {

    try {
        // 🟩 1st ==> server call
        const { data } = await api.updatePost(id, post);

        // 🟩 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}



export const deletePost = (id) => async (dispatch) => {

    try {
        if (window.confirm("🔴 Are you sure to delete it? 🔴")) {

            // 🟩 1st ==> server call
            await api.deletePost(id);

            // 🟩 2nd ==> send (data) into Redux global store | post reducer 
            dispatch({ type: DELETE, payload: id });
        } else {
            console.log("Can't delete...");
        }
    } catch (error) {
        console.log(error);
    }
}



export const likePost = (id) => async (dispatch) => {

    try {
        // 🟩 1st ==> server call
        const { data } = await api.likingPost(id);

        // 🟩 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}