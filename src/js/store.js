import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers';

const ENV = process.env.NODE_ENV;
const IS_DEVELOPMENT = ENV === 'development';

const enhancers = IS_DEVELOPMENT
	? compose(
		window.devToolsExtension
			? window.devToolsExtension()
			: f => f
		)
	: undefined;

const defaultState = { /* TODO */ };
const store = createStore(rootReducer, defaultState, enhancers);
const hmrHistory = syncHistoryWithStore(browserHistory, store);

if (IS_DEVELOPMENT && module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers').default;

		store.replaceReducer(nextRootReducer);
	});
}

export { store, hmrHistory };
