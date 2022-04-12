import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, LOADING_START, LOADING_END, CREATE, UPDATE, DELETE, COMMENT, LIKE, IMG_UPLOAD, UPLOAD_START, UPLOAD_END } from '../../constants/actionTypes';
import * as api from '../api';


// all actions/events toward our backend are going to be done using redux
// we need to dispatch those actions... from needful components...


export const getPost = (id) => async (dispatch) => {

    try {
        dispatch({ type: LOADING_START });

        // 🟩 1st ==> server call ==> for get specific post
        const { data } = await api.getPost(id);

        // 🟩 2nd ==> send (data) into Redux global store | post reducer
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: LOADING_END });
    } catch (error) {
        console.log(error);
    }
};


export const commentPost = (userComment, postId) => async (dispatch) => {

    try {
        // 🟩 1st ==> server call ==> for commenting at specific post
        const { data } = await api.comment(userComment, postId);

        // 🟩 2nd ==> send (data) into Redux global store | post reducer
        dispatch({ type: COMMENT, payload: data });

        // returning back newest comment...
        return data.comments;

    } catch (error) {
        console.log(error);
    }
}


// this (page) <== is integer value, link: 1 | 2 | 3 | 4 | ......
export const getAllPost = (pageNumber) => async (dispatch) => {

    try {
        dispatch({ type: LOADING_START });
        // 🟩 1st ==> server call ==> for get all posts
        const { data } = await api.getAllPost(pageNumber);

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


export const createPost = (post, navigate) => async (dispatch) => {

    try {
        dispatch({ type: LOADING_START });
        // 🟩 1st ==> server call
        const { data } = await api.createPost(post);

        console.log(data)

        // navigate(`/posts/${data._id}`);

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
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}



export const imageUpload = (imgFile) => async (dispatch) => {

    try {
        dispatch({ type: UPLOAD_START });
        // 🟩 1st ==> server call
        const { data } = await api.imageUpload(imgFile);
        console.log(data);

        // 🟩 2nd ==> send (data) into Redux global store | post reducer 
        dispatch({ type: IMG_UPLOAD, payload: data });
        dispatch({ type: UPLOAD_END });
    } catch (error) {
        console.log(error);
    }
}


export const imageDelete = (imgURL) => async (dispatch) => {

    console.log("imgURL : ", imgURL)

    // try {
    //     // 🟩 1st ==> server call
    //     await api.imageDelete(imgURL);

    //     // 🟩 2nd ==> send (data) into Redux global store | post reducer 
    //     dispatch({ type: IMG_DELETE, payload: imgURL });
    // } catch (error) {
    //     console.log(error);
    // }
}