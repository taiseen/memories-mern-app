import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
// const API = axios.create({ baseURL: 'https://moments-app-bd.herokuapp.com' });

const posts = '/posts';
const users = '/users';


// this this going to connect with (auth middleware) at BackEnd
// (auth middleware) can not work without this ==> token file
// this method run at ==> every requests... that created by user at FrontEnd
// this invoke before all of these requests that are call bellow
// by invoking this every time, we send our token to BackEnd 
// BackEnd auth middleware can verify that, who is currently login now...
// so by this process ==> BackEnd get specific header file... & base on that header do his logic...
API.interceptors.request.use(req => {

  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const getAllPost = page => API.get(`${posts}?page=${page}`);
export const createPost = newPost => API.post(posts, newPost);
export const updatePost = (id, updatedPost) => API.patch(`${posts}/${id}`, updatedPost);
export const deletePost = id => API.delete(`${posts}/${id}`);
export const likingPost = id => API.patch(`${posts}/${id}/likePost`);

export const getPostsBySearch = (searchQuery) => API.get(
  `${posts}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const signUp = formData => API.post(`${users}/signUp`, formData);
export const signIn = formData => API.post(`${users}/signIn`, formData);