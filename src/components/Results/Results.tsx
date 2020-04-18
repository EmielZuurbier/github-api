import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext'; 
import Result from './Result';
import './Results.css';

const Results = (props: any) => {
	
	const { users } = useContext(GlobalContext);

	let results;
	if (users !== undefined && users.length) {
		results = 
			<ul className="results__list">
				{ users!.map((user, index) => (<Result key={index} user={user}></Result>)) }
			</ul>
	} else {
		results =
			<div className="results__message">
				<p>No results found, please make a query.</p>
			</div>
	}

	return (
		<main className="results">
			{ results }
		</main>
	);

};

export default Results;