import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers';

const ENV = process.env.NODE_ENV;
const IS_DEVELOPMENT = ENV === 'development';

const enhancers = compose(
		// (window.devToolsExtension
			window.devToolsExtension && window.devToolsExtension(),
			// : f => f),

		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
	// : undefined;

const defaultRantsBySortState = {
	isFetching: false,
	didInvalidate: false,
	lastUpdated: null,
	items: [ ]
};

const defaultState = {
	selectedSort: 'algo',
	rantsBySort: {
		algo: defaultRantsBySortState,
		top: defaultRantsBySortState,
		recent: defaultRantsBySortState
	}
};

const loggerMiddleware = createLogger();

const store = createStore(
	rootReducer,
	defaultState,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

const hmrHistory = syncHistoryWithStore(
	browserHistory,
	store
);

if (IS_DEVELOPMENT && module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers').default;

		store.replaceReducer(nextRootReducer);
	});
}

export { store, hmrHistory };
