import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions, {showSideMenu} from '../../store/actions';
import {About, Button, Gallery, Input, LoginForm, Main} from "../../components";
import styles from './Content.module.scss'
import {Route, Routes} from "react-router-dom";
import clsx from "clsx";

class Content extends Component {
	// это локальный стор
	constructor(props) {
		super(props);

		this.state = {
			openSideMenu: false,
		}
	}

	onShowSideMenu(){
		const {openSideMenu} = this.state;
		this.setState({openSideMenu: !openSideMenu});
		this.props.showSideMenu(!openSideMenu);
	}

	render() {
		const {openSideMenu} = this.state;
		return (
			<div className={clsx("content", openSideMenu && "move")}>
				<div className={styles.header}>
					<Button onClick={() => this.onShowSideMenu()} modifiers={['blue']}>Menu</Button>
					<div className={styles.auth}>
						<LoginForm loginAction={this.props.loginAct} />
					</div>
				</div>
				<hr/>
				<Routes>
					<Route
						path='/'
						element={<Main />}
					/>
					<Route
						path='/about'
						element={<About />}
					/>
					<Route
						path='/gallery'
						element={<Gallery />}
					/>
				</Routes>
			</div>
		);
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		...actions,
		showSideMenu: showSideMenu,
		loginAct: actions.authActions.login,
	}, dispatch)
}

export default connect(null, matchDispatchToProps)(Content);