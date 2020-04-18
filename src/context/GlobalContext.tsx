import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

interface User {
	id: number,
	login: string,
	avatarUrl: string
}

interface ContextProps {
	query: string
	users: User[],
	updateQuery: any,
	updateUsers: any
}

const initalState = {
	query: '',
	users: []
};

// Create a context with an initial state.
export const GlobalContext = createContext<Partial<ContextProps>>(initalState);

// Create a global provider to pass the data to all the components.
export const GlobalProvider = ({ children }: any) => {
	const [ { query, users }, dispatch ]: [ ContextProps, any ] = useReducer(AppReducer, initalState);

	// Create actions
	const updateQuery = (query: string): void => {
		dispatch({
			type: 'UPDATE_QUERY',
			payload: query
		})
	}

	const updateUsers = (users: any[]): void => {
		dispatch({
			type: 'UPDATE_USERS',
			payload: users
		})
	};

	return (
		<GlobalContext.Provider value={{
			query: query,
			users: users,
			updateQuery,
			updateUsers}}>
			{children}
		</GlobalContext.Provider>
	)
}