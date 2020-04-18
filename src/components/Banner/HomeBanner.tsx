import React from 'react';
import Search from '../Search/Search';
import './Banner.css';

function HomeBanner(props: any) {
	
	return (
		<header className="banner">
			<div className="banner__title">
				<h1>Github API <span>[code]capi</span></h1>
			</div>
			<div className="banner__container">
				<Search></Search>
			</div>
		</header>
	);
	
}

export default HomeBanner;