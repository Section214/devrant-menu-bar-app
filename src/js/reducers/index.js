import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import selectedSort from './selected-sort';
import rantsBySort from './rants-by-sort';

const reducer = combineReducers({
	selectedSort,
	rantsBySort,
	routing: routerReducer
});

export default reducer;
