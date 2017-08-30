const createReducer = (initState, handlers) =>
	(state = initState, action) => {
		if(handlers[action.type]){
			return handlers[action.type](state, action);
		}
		return state;
	}

const createAction = (type, payload) => ({
	type,
	payload
})
export {
  createReducer,
	createAction
}
