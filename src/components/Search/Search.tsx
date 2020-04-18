import React, { Component, SyntheticEvent } from 'react';
import { GlobalContext } from '../../context/GlobalContext'; 
import './Search.css';

type SearchState = {
	query: string
}

class Search extends Component {

	static contextType = GlobalContext;

	public state: SearchState = {
		query: ''
	}

	public getUsers = async (query: string):Promise<void> => {
		const { updateUsers } = this.context;
		const response = await fetch('/search', {
			method: 'POST',
			headers: { 'Content-type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ query })
		});
		if (response.status !== 200) {
			throw new Error(`getUsers encountered an error of status ${response.status}`);
		}
		const { users } = await response.json();
		updateUsers(users);
	}

	private handleInput = ({ target }: { target: HTMLInputElement}) => {
		const { updateQuery } = this.context;
		this.setState({
			query: target.value
		});
		updateQuery(target.value);
	}

	private handleSubmit = (event: SyntheticEvent) => {
		const { query } = this.context;
		this.getUsers(query);
		event.preventDefault();
	}

	public render() {
		return(
			<div className="search">
				<form 
					className="search__form"
					onSubmit={this.handleSubmit}>
					<label 
						className="search__label" 
						htmlFor="search-users">
							Search users by username
					</label>
					<div className="search__container">
						<input 
							className="search__input"
							type="search" 
							id="search-users"
							placeholder="Enter username..."
							value={this.state.query}
							onChange={this.handleInput}
						/>
						<button 
							className="search__submit"
							type="submit">
								Search
						</button>
					</div>
				</form>
			</div>
		);
	}
	
}

export default Search;