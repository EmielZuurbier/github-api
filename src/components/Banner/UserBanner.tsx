import React from 'react';
import './Banner.css';

function UserBanner(props: any) {

	const { data: { avatarUrl }, name } = props;

	return (
		<header className="banner">
			<div className="banner__title">
				<h1>Github API <span>[code]capi</span></h1>
			</div>
			<div className="banner__container">
				<div className="banner__user">
					<h2>User: { name ? name : '' }</h2>
					<img className="banner__avatar" src={ avatarUrl } alt="Avatar"/>
				</div>
			</div>
		</header>
	);
	
}

export default UserBanner;