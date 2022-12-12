import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from "./Sidemenu.module.scss";
import {NavLink} from "react-router-dom";
import clsx from "clsx";

class SideMenu extends Component {
	render() {
		const {showSideMenu} = this.props;
		// console.log(showSideMenu)
		return (
			<div className={clsx("sideMenu", showSideMenu && "show")}>
				<div className={styles.sidebar}>
					<ul className={styles.sidebarList}>
						<li className={styles.sidebarItem}>
							<NavLink to='/' className={link => (link.isActive ? styles.sidebarLinkActive : styles.sidebarLink)}>Main</NavLink>
						</li>
						<li className={styles.sidebarItem}>
							<NavLink to='/about' className={link => (link.isActive ? styles.sidebarLinkActive : styles.sidebarLink)}>About</NavLink>
						</li>
						<li className={styles.sidebarItem}>
							<NavLink to='/gallery' className={link => (link.isActive ? styles.sidebarLinkActive : styles.sidebarLink)}>Gallery</NavLink>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		showSideMenu: state.showSideMenu
	};
}

export default connect(mapStateToProps)(SideMenu);