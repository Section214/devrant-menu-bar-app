function rants(state = {
	isFetching: false,
	didInvalidate: false,
	items: [ ]
}, action) {
	switch (action.type) {
		case 'INVALIDATE_RANTS_TYPE': {
			return {
				...state,
				didInvalidate: true
			};
		}

		case 'FETCH_RANTS': {
			return {
				...state,
				didInvalidate: false,
				isFetching: true
			};
		}

		case 'RECEIVE_RANTS': {
			return {
				...state,
				isFetching: false,
				lastUpdated: action.receivedAt,
				items: [
					...state.items,
					...action.rants
				]
			};
		}
	}
}

function rantsBySort(state = {}, action) {
	switch (action.type) {
		case 'INVALIDATE_RANTS_TYPE':
		case 'FETCH_RANTS':
		case 'RECEIVE_RANTS': {
			const sort = action.sort;

			return {
				...state,
				[sort]: rants(state[sort], action)
			};
		}

		default: {
			return state;
		}
	}
}

export default rantsBySort;
