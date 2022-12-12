import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './Navigate.module.scss'
import {Button, Input, Textarea} from "../../components";
import {bindActionCreators} from "redux";
import actions from "../../store/actions";

class Navigate extends Component {
	constructor(props) {
		super(props);

		// когда закрываю стр, this.state стирается, a this.props - остается в редакс
		this.state = {
			userID: 0,
			name: '',
			description: '',
			editName: false,
			editDesc: false,
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.currentGroup !== prevProps.currentGroup) {
			const {currentGroup} = this.props;

			this.setState({
				userID: 0,
				name: currentGroup[0]?.name,
				description: currentGroup[0]?.description,
			});
		}
	}

	switchUser(direction) {
		const {currentGroup} = this.props;

		switch (direction) {
			case 'next':
				const userId = this.state.userID + 1;
				if (this.state.userID !== (this.props.currentGroup.length - 1)) {
					this.setState({
						userID: userId,
						name: currentGroup[userId]?.name,
						description: currentGroup[userId]?.description,
					});
				}
				break;
			default:
				if (this.state.userID !== 0) {
					this.setState({
						userID: this.state.userID - 1,
						name: currentGroup[0]?.name,
						description: currentGroup[0]?.description,
					});
				}
		}
	}

	updateUserName(id) {
		const {editName, name} = this.state;
		if (editName) {
			this.setState({editName: false});
			this.props.editUser({
				id,
				name,
			})
		}
		else {
			this.setState({editName: true});
		}
	}

	updateUserDesc(id) {
		const {editDesc, description} = this.state;
		if (editDesc) {
			this.setState({editDesc: false});
			this.props.editUser({
				id,
				description,
			})
		}
		else {
			this.setState({editDesc: true});
		}
	}

	render() {
		const {role, isAdmin} = this.props;
		if (!this.props.currentGroup.length) return <h1>LOADING</h1>
		return (
			<div className={styles.navUsers}>
				<div className={styles.navigate} ref="navigate">
					<div className={styles.navBar}>
						<Button className="toLeft"
							onClick={() => this.switchUser('previous')}>&lt;</Button>
						<span>{this.state.userID + 1} from {this.props.currentGroup.length}</span>
						<Button className="toRight"
							onClick={() => this.switchUser('next')}>&gt;</Button>
					</div>
					<div>
						<div className={styles.info}>
							{this.state.editName ? (
								<>
									<span>Name: {this.props.currentGroup[this.state.userID]?.name}</span>
									<Input placeholder={'name'}
									       onChange={(e) => this.setState({name: e.target.value})}
									       value={this.state.name}
									/>
								</>
							) :(
								<span>Name: {this.props.currentGroup[this.state.userID]?.name}</span>
							)}

							{/*{isAdmin && (*/}
							{/*{role === 'admin' && (*/}
								<Button
									className={styles.editBtn}
									onClick={() => {
										this.updateUserName(this.props.currentGroup[this.state.userID].id);
									}}
									disabled={role !== 'admin'}
								>Edit</Button>
							{/*)}*/}

						</div>


						<div className={styles.info}>
							{this.state.editDesc ? (
								<>
									<span>Description: {this.props.currentGroup[this.state.userID]?.description}</span>
									<Textarea
										placeholder={'description'}
								        onChange={(e) => this.setState({description: e.target.value})}
										value={this.state.description}
									/>
								</>
							) :(
								<span>Description: {this.props.currentGroup[this.state.userID]?.description}</span>
							)}

							<Button
								className={styles.editBtn}
								onClick={() => {
									this.updateUserDesc(this.props.currentGroup[this.state.userID].id);
								}}
								disabled={role !== 'admin'}
							>Edit</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
// analogue useState
function mapStateToProps(state) {
	return {
		// currentGroup: state.currentGroup
		// заходим в стор, там currentGroup находится в users
		currentGroup: state.users.currentGroup,
		role: state.auth.role,
		isAdmin: state.auth.role === 'admin',

	};
}
// analogue useDispatch
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		editUser: actions.usersAction.updateUser,
	}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Navigate);
