function selectedSort(state = 'algo', { type, sort }) {
	switch (type) {
		case 'SELECT_RANTS_TYPE': {
			return sort;
		}

		default: {
			return state;
		}
	}
}

export default selectedSort;
