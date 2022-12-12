import usersAction from './modules/users/actions'
import authActions from './modules/auth/actions'

export const showSideMenu = (payload) => {
	console.log('payload', payload)
	return {
		type: "SHOW_SIDE_MENU",
		payload: payload,
	}
}


const actions = {
	usersAction,
	authActions,
}
export default actions;