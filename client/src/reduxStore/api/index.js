import axios from 'axios';

// axios Object create, for method calling + add interceptors... for middleware...

const API = axios.create({ baseURL: 'http://localhost:5000' });
// const API = axios.create({ baseURL: 'https://memories-app-bd.herokuapp.com' });

// this this going to connect with (auth middleware) at BackEnd
// (auth middleware) can not work without this ==> token file
// this method run at ==> every requests... that created by user at FrontEnd
// this invoke before all of these requests that are call bellow
// by invoking this every time, we send our token to BackEnd 
// BackEnd auth middleware can verify that, who is currently login now...
// so by this process ==> BackEnd get specific header file... & base on that header do his logic...
API.interceptors.request.use(req => {

  // 1st ==> get user token from LocalStorage, that server send to client...
  const serverSendToken = localStorage.getItem('profile');

  if (serverSendToken) {
    // 2nd ==> send this token from LocalStorage into server for user id tracking... 
    req.headers.authorization = `Bearer ${JSON.parse(serverSendToken).token}`;
  }

  return req;
});


const posts = '/posts';
export const getPost = id => API.get(`${posts}/${id}`);
export const getPagPost = pageNumber => API.get(`${posts}?pageNumber=${pageNumber}`);
export const createPost = newPost => API.post(posts, newPost);
export const updatePost = (id, updatedPost) => API.patch(`${posts}/${id}`, updatedPost);
export const deletePost = id => API.delete(`${posts}/${id}`);
export const likingPost = id => API.patch(`${posts}/${id}/likePost`);
export const comment = (userComment, postId) => API.post(`${posts}/${postId}/commentPost`, { userComment });


export const getPostsBySearch = searchQuery => API.get(
  `${posts}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);


export const signUp = formData => API.post(`/users/signUp`, formData);
export const signIn = formData => API.post(`/users/signIn`, formData);


// only for image upload at this domain...
const imgbbLink = 'https://api.imgbb.com/1/upload';
export const imageUpload = imgFile => axios.post(imgbbLink, imgFile);
export const imageDelete = imgUrl => axios.delete(imgUrl);