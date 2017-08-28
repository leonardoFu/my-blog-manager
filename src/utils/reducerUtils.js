const createReducer = (initState, handlers) =>
	(state = initState, action) => {
		if(handlers[action.type]){
			return handlers[action.type](state, action);
		}
		return state;
	}
export {
  createReducer
}
