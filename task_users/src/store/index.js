import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import allReducers from "./reducers";
import initializeSagas from "./middlewares";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	allReducers,
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
		applyMiddleware(sagaMiddleware)
	)
)
sagaMiddleware.run(initializeSagas)

export default store;
