import { put, takeEvery, call } from 'redux-saga/effects';
import { api } from "../api";
import {USERS_LIST} from "../modules/users/actionTypes";

function* fetchUsers(action) {
	try {
		const response = yield call(
			api.get,
			'/users',
		)
		// console.log(response)
		// ok смотрим в response
		if (response.ok) {
			yield put({ type: USERS_LIST.RECEIVE, payload: response.colorsArray })
		} else {
			yield put({ type: USERS_LIST.FAILURE })
		}
	} catch (e) {
		console.error(e)
		yield put({ type: USERS_LIST.FAILURE })
	}
}

export default function* usersInit() {
	yield takeEvery(USERS_LIST.REQUEST, fetchUsers)
}