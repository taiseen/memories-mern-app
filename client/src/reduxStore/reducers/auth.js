import { AUTH, LOGOUT } from '../../constants/actionTypes';

export const auth = (state = { authData: null }, { type, data }) => {

    switch (type) {

        case AUTH:

            localStorage.setItem('profile', JSON.stringify({ ...data }));
            return { ...state, authData: data, loading: false, errors: null };


        case LOGOUT:

            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };


        default:
            return state;
    }
}