import { AUTH } from '../../constants/actionTypes';
import * as api from '../api';

export const signUp = (formData, navigate) => async (dispatch) => {

  try {
    // 🟩 1st ==> server call
    const { data } = await api.signUp(formData);

    // 🟩 2nd ==> send (data) into Redux global store | post reducer 
    dispatch({ type: AUTH, data });

    // after signUp ==> redirect user at index page
    navigate('/');
  } catch (error) {
    console.log(error);
  }
}


export const signIn = (formData, navigate) => async (dispatch) => {

  try {
    // 🟩 1st ==> server call
    const { data } = await api.signIn(formData);

    // 🟩 2nd ==> send (data) into Redux global store | post reducer 
    dispatch({ type: AUTH, data });

    // after signIn ==> redirect user at index page
    navigate('/');
  } catch (error) {
    console.log(error);
  }
}
