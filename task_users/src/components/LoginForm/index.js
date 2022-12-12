import styles from './LoginForm.module.scss';
import React, {Component} from 'react';
import Input from "../Input";
import {Button} from "../index";

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: '',
			password: '',
		}
	}
	onLoginChange(e) {
		const login = e.target.value;
		this.setState({
			login
		})
	}
	onPasswordChange(e) {
		const password = e.target.value;
		this.setState({
			password
		})
	}
	submitForm(e) {
		e.preventDefault();
		this.props.loginAction({
			login: this.state.login,
			password: this.state.password,
		})
	}

	render() {
		const {login, password} = this.state;
		return (
			<form className={styles.authForm} onSubmit={(e) => this.submitForm(e)}>
				<Input placeholder='login' labelText='Login' required value={login} onChange={(e) => this.onLoginChange(e)} />
				<Input placeholder='password' labelText='Password' required value={password} type={'password'} onChange={(e) => this.onPasswordChange(e)} />
				<Button modifiers={['blue']} type={'submit'}>Submit</Button>
			</form>
		)
	}
}

export default LoginForm;
