import styles from './Main.module.scss'
import {Button} from "../index";
import React, {Component} from "react";
import Navigate from "../../containers/Navigate/navigate";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import actions from '../../store/actions'

class Main extends Component {
	constructor(props) {
		super(props);
		// console.log('11111', actions)
		this.state = {
			mainContent: true
		}
	}

	componentWillMount(){
		this.props.getUsers();
	}
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.userInfo !== this.props.userInfo) {
			this.props.setGroup(nextProps.userInfo);
		}
	}

	getGroup(group) {
		if (group === 'all') {
			// console.log('1111', this.props )
			return this.props.setGroup(this.props.userInfo);
		} else if ((group === 'first') || (group === 'second') || (group === 'third')) {
			let result = [];
			this.props.userInfo.map((user) => {
				if (user.group === group) {
					result.push(user);
				}
			});
			return this.props.setGroup(result);
		}
	}

	render() {
		// console.log('this.props', this.props)
		return (
			<div className={styles.main}>
				<h1>Main Page</h1>
				<div className={styles.btnWrapper}>
					<Button onClick={() => this.getGroup('all')}>All</Button>
					<Button onClick={() => this.getGroup('first')}>First group</Button>
					<Button onClick={() => this.getGroup('second')}>Second group</Button>
					<Button onClick={() => this.getGroup('third')}>Third group</Button>
				</div>
				<Navigate />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userInfo: state.users.items
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		...actions,
		getUsers: actions.usersAction.getUsers,
		setGroup: actions.usersAction.setGroup,
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Main);
