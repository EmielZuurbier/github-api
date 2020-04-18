export default (state: any, action: any) => {
	const { type, payload }: { type: string, payload: any } = action;
	switch(type) {
		case 'UPDATE_QUERY':
			return {
				...state,
				query: payload
			}
		case 'UPDATE_USERS':
			return { 
				...state,
				users: payload
			}
		default:
			return state;
	}
}