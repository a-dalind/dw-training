import { put, takeEvery, call, select, all } from 'redux-saga/effects';
import { api } from "../api";
import {
	LOGIN_BY_PASS,
	// LOGOUT,
} from "../modules/auth/actionTypes";

function* loginByPassword(action) {
	try {
		const { login, password } = action.payload
		const response = yield call(
			api.post,
			'/login/', {
				login,
				password,
			}
		)
		console.log('digitalwanddigitalwand', response)
		if (response.ok) {
			yield put({ type: LOGIN_BY_PASS.RECEIVE, payload: {
					role: login==='digitalwand' ? 'admin' : 'user',
					login,
				} })
		} else {
			yield put({ type: LOGIN_BY_PASS.FAILURE, payload: response.data })
		}
	} catch (e) {
		yield put({ type: LOGIN_BY_PASS.FAILURE })
	}
}

// function* logout(action) {
// 	try {
// 		const response = yield call(api.get, '/user/logout/')
// 		yield put({ type: LOGOUT.RECEIVE })
// 		yield put({ type: PROFILE_GET.RECEIVE, payload: { isAuth: false } })
// 	} catch (e) {
// 		yield put({ type: LOGOUT.FAILURE })
// 	}
// }


export default function* authInit() {
	yield takeEvery(LOGIN_BY_PASS.REQUEST, loginByPassword)
	// yield takeEvery(LOGOUT.REQUEST, logout)
}
