import { ACTION_STATUS } from '../../../constants/common';
import {
  LOGIN_BY_PASS,
  LOGOUT,
} from './actionTypes';

const getInitialState = () => ({
  isAuth: false,
  loginStatus: ACTION_STATUS.IDLE,
  role: null,
})

export default function (state = getInitialState(), action) {
  switch (action.type) {
    case LOGIN_BY_PASS.REQUEST:
		return {
		// всегда нужно возвращать предыдущий  ...state,
			...state,
			loginStatus: ACTION_STATUS.LOADING,
		}

    case LOGIN_BY_PASS.RECEIVE:
      return {
	      // всегда нужно возвращать предыдущий  ...state,
        ...state,
        isAuth: true,
        loginStatus: ACTION_STATUS.LOADED,
	      // достали role и login из middlwares auth
        ...action.payload
      }
    case LOGIN_BY_PASS.FAILURE:
		return {
			// всегда нужно возвращать предыдущий  ...state,
			...state,
			isAuth: false,
			loginStatus: ACTION_STATUS.FAILED,
			role: null,
		}
    default:
      return state
  }
}
