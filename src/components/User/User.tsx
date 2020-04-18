import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import UserBanner from '../Banner/UserBanner';
import UserInfo from './UserInfo';
import './User.css';

const User = (props: any) => {

	const [ isLoaded, setIsLoaded ] = useState(false);
	const [ userData, setUserData ] = useState({});

	const { user: userName } = useParams();

	const fetchUserByName = (userName: string|undefined):void => {
		fetch(`/users/${userName}`)
			.then(response => response.json())
			.then(({ user }) => { 
				console.log(user);
				setIsLoaded(true);
				setUserData(user);
			});
	};

	useEffect(() => {
		if (!isLoaded) {
			fetchUserByName(userName);
		}
	});

	let body;
	if (isLoaded) {
		body = <UserInfo data={userData}></UserInfo>
	} else {
		body = <span className="user__message">Loading user...</span>
	}

	return (
		<>
			<UserBanner name={userName} data={userData}></UserBanner>
			<main className="results">
				<div className="user">
					{ body }
				</div>
			</main>
		</>
	);

}

export default User;