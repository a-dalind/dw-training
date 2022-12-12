import {
  LOGIN_BY_PASS,
  LOGOUT,
} from './actionTypes'

const authActions = {
  login: (payload) => ({ type: LOGIN_BY_PASS.REQUEST, payload }),
  // logout: () => ({ type: LOGOUT.REQUEST }),
}

export default authActions;
