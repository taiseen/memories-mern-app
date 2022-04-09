import { AUTH, LOGOUT } from '../../constants/actionTypes';

export const auth = (state = { authData: null }, { type, data }) => {

    switch (type) {

        case AUTH:

            // save this info at localStorage, 
            // so that after refresh, still we get user info
            // convert JS Object ==> into ==> JSON String
            localStorage.setItem('profile', JSON.stringify({ ...data }));
            return { ...state, authData: data, loading: false, errors: null };

        case LOGOUT:

            // remove or delete all info about user - from localStorage...
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };

        default:
            return state;
    }
}