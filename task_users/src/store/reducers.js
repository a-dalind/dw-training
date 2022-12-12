import {combineReducers} from 'redux';
import auth from './modules/auth';
import showSideMenu from './modules/showSideMenu';
import usersList from './modules/users';

const allReducers = combineReducers ({
	auth,
	showSideMenu,
	users: usersList,
});

export default allReducers;