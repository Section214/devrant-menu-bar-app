import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { store, hmrHistory } from './store';
import App from './components/App';
import Feed from './components/Feed';
import Rant from './components/Rant';

const ENV = process.env.NODE_ENV;
const IS_DEVELOPMENT = ENV === 'development';

injectTapEventPlugin();

const app = (
	<Provider store={ store }>
		<Router history={ IS_DEVELOPMENT ? hmrHistory : hashHistory }>
			<Route path="/" component={ App }>
				<IndexRoute component={ Feed } />
				<Route path="rants/:id" component={ Rant } />
			</Route>
		</Router>
	</Provider>
);

render(
	app,
	document.getElementById('root')
);
