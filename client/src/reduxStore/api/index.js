import axios from 'axios';


// const server_db_url = 'http://localhost:5000/posts';
const server_db_url = 'https://moments-app-bd.herokuapp.com/posts';


export const getAllPost = () => axios.get(server_db_url);
export const createPost = (newPost) => axios.post(server_db_url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${server_db_url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${server_db_url}/${id}`);
export const likePost = (id) => axios.patch(`${server_db_url}/${id}/likePost`);


// all actions/events toward our backend are going to be done using redux
// we need to dispatch those actions... from needful components...