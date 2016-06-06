import fetch from 'isomorphic-fetch';

function _fetchRants(sort) {
	return {
		type: 'FETCH_RANTS',
		sort
	};
}

function _requestRants(sort, skip = 0) {
	return dispatch => {
		dispatch(
			_fetchRants(sort)
		);

		const api = 'https://www.devrant.io/api/devrant/rants';
		const url = `${api}?app=3&sort=${sort}&skip=${skip}&limit=50`;

		fetch(url)
			.then(res => {
				if (res.status !== 200) {
					throw new Error(res.statusText);
				}

				return res.json();
			})
			.then(json =>
				dispatch(
					_receiveRants(sort, json.rants)
				)
			)
			.catch(err => console.log(`fetch rants error: ${err}`));
	};
}

function _receiveRants(sort, rants) {
	return {
		type: 'RECEIVE_RANTS',
		receivedAt: Date.now(),
		sort, rants
	};
}

function _shouldFetchRants(state, sort, skip = 0) {
	const rants = state.rantsBySort[sort];
	const hydrate = rants.items.length === skip;

	return !rants || !rants.isFetching || rants.didInvalidate || hydrate;
}

export function selectRantsType(sort) {
	return {
		type: 'SELECT_RANTS_TYPE',
		sort
	};
}

export function invalidateRantsType(sort) {
	return {
		type: 'INVALIDATE_RANTS_TYPE',
		sort
	};
}

export function fetchRantsIfNeeded(sort, skip) {
	return (dispatch, getState) => {
		const state = getState();
		const shouldFetch = _shouldFetchRants(state, sort, skip);

		if (shouldFetch) {
			return dispatch(
				_requestRants(sort, skip)
			);
		}
	};
}
