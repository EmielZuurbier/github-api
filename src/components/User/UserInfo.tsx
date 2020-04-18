import React from 'react';

const UserInfo = (props: any) => {

	const { data: { name, bio, url, followers } } = props;

	return (
		<div className="user__info">
			<ul>
				{ name ? <li>Name: { name }</li> : '' }
				{ bio ? <li>Bio: { bio }</li> : '' }
				{ url ? <li>URL: { <a href={ url } target="_blank" rel="noopener noreferrer">{ url }</a> }</li> : '' }
				{ followers ? <li>Followers: { followers }</li> : '' }
			</ul>
		</div>
	);
	
};

export default UserInfo;