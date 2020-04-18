const fetch = require('node-fetch');

const endpoints = {
	user: 'users/',
	search: 'search/users?q='
};

/**
 * Gets a resource from the Github REST API.
 * 
 * @param 	{string} endpoint Endpoint to get data from.
 * @param 	{string} data Specific data from endpoint.
 * @returns	{Promise<Response>}
 */
const getGithubResource = async (endpoint, data) => {
	const url = new URL(`https://api.github.com/${endpoint}${data}`)
	const response = await fetch(url);
	if (response.status === 200) {
		const data = await response.json();
		return data;
	}
	throw new Error(`Github API request failed. status: ${response.status}`);
}

/**
 * @typedef 	UserObject
 * @property	{string} name
 * @property	{string} bio
 * @property	{string} url
 * @property	{number} followers
 * @property	{string} avatarUrl
 *
 * Get a single user from the Github REST API.
 * 
 * @param 	{string} username Username to search for.
 * @returns	{Promise<UserObject>}
 */
const getUser = username => {
	const { user } = endpoints;
	return getGithubResource(user, username)
		.then(user => ({
			name: user.name,
			bio: user.bio,
			url: user.url,
			followers: user.followers,
			avatarUrl: user.avatar_url
		}))
		.catch(error => {
			console.log(error);
		});
};

/**
 * @typedef 	UsersResult
 * @property	{string} login
 * @property	{number} id
 * @property	{string} avatarUrl
 * 
 * Search for users in the Github REST API.
 * 
 * @param 	{string} query String to search for in users.
 * @returns	{Promise<UsersResult[]>}
 */
const searchUsers = query => {
	const { search } = endpoints;
	return getGithubResource(search, query)
		// .then(response => {
		// 	console.log(response);
		// 	return response;
		// })
		.then(({ items }) => items.map(({ login, id, avatar_url }) => ({ login, id, avatarUrl: avatar_url })))
		.catch(error => {
			console.log(error);
		});
};

module.exports = {
	getUser,
	searchUsers
}