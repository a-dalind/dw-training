import { all } from 'redux-saga/effects';
import authInit from './auth';
import usersInit from './users';

export default function* initializeSagas() {
	yield all([
		authInit(),
		usersInit(),
	])
}
