import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../../constants/actionTypes';
import * as api from '../api';


// all actions/events toward our backend are going to be done using redux
// we need to dispatch those actions... from needful components...


// Action Creators are Function that return function...
export const getAllPost = () => async (dispatch) => {

    try {
        const { data } = await api.getAllPost();
        dispatch({ type: FETCH_ALL, data });
    } catch (error) {
        console.log(error);
    }
}


export const createPost = (post) => async (dispatch) => {

    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, data });
    } catch (error) {
        console.log(error);
    }
}


export const updatePost = (id, post) => async (dispatch) => {

    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, data });
    } catch (error) {
        console.log(error);
    }
}


export const deletePost = (id) => async (dispatch) => {

    try {
        if (window.confirm("🔴 Are you sure to delete it? 🔴")) {
            await api.deletePost(id);
            dispatch({ type: DELETE, data: id });
            console.log("Can delete...");
        } else {
            console.log("Can't delete...");
        }
    } catch (error) {
        console.log(error);
    }
}


export const likePost = (id) => async (dispatch) => {

    try {
        const { data } = await api.likePost(id); 
        dispatch({ type: UPDATE, data });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}