import {
	SET_GROUP,
	USERS_LIST,
	UPDATE_USER,
} from './actionTypes'

const usersActions = {
	getUsers: (payload) => ({ type: USERS_LIST.REQUEST, payload }),
	setGroup: (payload) => ({type: SET_GROUP, payload }),
	updateUser: (payload) => ({type: UPDATE_USER, payload }),
}

export default usersActions;
