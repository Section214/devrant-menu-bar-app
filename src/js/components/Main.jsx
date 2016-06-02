import React from 'react';
import { Link } from 'react-router';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500
	}
});

const Main = React.createClass({
	render() {
		const props = this.props;

		return (
			<MuiThemeProvider muiTheme={ muiTheme }>
				<div>
					<h1>
						<Link to="/">devRant</Link>
					</h1>

					{
						React.cloneElement(
							props.children,
							{ ...props }
						)
					}
				</div>
			</MuiThemeProvider>
		);
	}
});

export default Main;
