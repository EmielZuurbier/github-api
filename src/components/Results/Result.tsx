import React from 'react';
import {
	Link
} from 'react-router-dom';

const Result = ({ user }: { user: any }) => {

	return (
		<li className="result">
			<Link className="result__link" to={ `/users/${user.login}` } title={ user.login }>
				<span className="result__name">{ user.login }</span>
				<img className="result__avatar" src={ user.avatarUrl } alt="Avatar"/>
			</Link>
		</li>
	)

};

export default Result;