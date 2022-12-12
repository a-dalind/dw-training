import React, {Component} from 'react';
import './App.css';
import {createStore} from 'redux';
import allReducers from './store/reducers';
import {Provider} from 'react-redux';
import WebPage from './components/webpage';
import {BrowserRouter} from "react-router-dom";
import store from "./store";

// const store = createStore(allReducers);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<WebPage/>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
