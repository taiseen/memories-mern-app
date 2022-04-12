import { combineReducers } from 'redux';
import { posts } from './posts';
import { auth } from './auth';
import { img } from './img';

export default combineReducers({ posts, auth, img });