import {ACTION_STATUS} from "../../../constants/common";
import {
	SET_GROUP,
	USERS_LIST,
	UPDATE_USER,
} from './actionTypes';
import MYJSON from '../../../test.json'

const getInitialState = () => ({
	// items: MYJSON.colorsArray,
	items: [],
	currentGroup: [],
	userListStatus: ACTION_STATUS.IDLE,
})

export default function (state = getInitialState(), action) {
	switch (action.type) {
		case USERS_LIST.REQUEST:
			return {
				...state,
				userListStatus: ACTION_STATUS.LOADING,
			};
		case USERS_LIST.RECEIVE:
			return {
				...state,
				items: action.payload,

				userListStatus: ACTION_STATUS.LOADED,
			};
		case USERS_LIST.FAILURE:
			return {
				...state,
				userListStatus: ACTION_STATUS.FAILED,
			};
		case SET_GROUP:
			return {
				...state,
				currentGroup: action.payload,
			};
		case UPDATE_USER:
			// ! userData: {name, description}
			const {id, ...userData} = action.payload;
			console.log(id, 'id111111')
			// debugger
			return {
				...state,
				// ! user - изменяемый юзер
				items: state.items.map(user => {
					if (user.id === id) {
						return {...user, ...userData};
					}

					return user;
				})
			};
		default:
			return state
	}
}
