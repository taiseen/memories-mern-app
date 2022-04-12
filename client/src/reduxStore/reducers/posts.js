import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LOADING_START, LOADING_END, COMMENT, LIKE } from '../../constants/actionTypes';

export const posts = (state = { isLoading: true, posts: [] }, { type, payload }) => {

    // console.log(state)

    switch (type) {

        case LOADING_START:
            return { ...state, isLoading: true };

        case LOADING_END:
            return { ...state, isLoading: false };

        case CREATE:
            return { ...state, posts: [...state.posts, payload] };

        case LIKE:
        case UPDATE:
        case COMMENT:
            return { ...state, posts: state.posts.map(post => post._id === payload._id ? payload : post) };

        // change the post, that just received a comment ==> if (post._id === payload._id) return payload;
        // return all the other posts normally ==> return post;

        case DELETE:
            return { ...state, posts: state.posts.filter(post => post._id !== payload) };

        case FETCH_ALL:
            return {
                ...state,
                posts: payload.data,
                currentPage: payload.currentPage,
                numberOfPages: payload.numberOfPages
            };

        case FETCH_POST:
            return { ...state, post: payload };

        case FETCH_BY_SEARCH:
            return { ...state, posts: payload };

        default:
            return state;
    }
}