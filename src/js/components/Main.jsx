import React from 'react';
import { Link } from 'react-router';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import PowerIcon from 'material-ui/svg-icons/action/power-settings-new';

const styles = {
	bar: {
		backgroundColor: '#fff',
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '4.5em',
		zIndex: 1,
		borderBottom: '1px solid #e0e0e0'
	},
	group: {
		display: 'flex',
		marginTop: '1em'
	},
	radio: {
		width: '33%',
		marginRight: '1em'
	}
};

const Bar = props => {
	return (
		<Toolbar style={ styles.bar }>
			<ToolbarGroup firstChild={ true }>
				<Link to="/">
					<IconButton>
						<HomeIcon color="#000000de" />
					</IconButton>
				</Link>
			</ToolbarGroup>

			<ToolbarGroup>
					<RadioButtonGroup
						name="selectedRantsType"
						defaultSelected={ props.selectedSort }
						onChange={ props.handleSortClick }
						style={ styles.group }
					>
						<RadioButton
							value="top"
							label="top"
							style={ styles.radio }
						/>

						<RadioButton
							value="algo"
							label="algo"
							style={ styles.radio }
						/>

						<RadioButton
							value="recent"
							label="recent"
							style={ styles.radio }
						/>
					</RadioButtonGroup>
			</ToolbarGroup>

			<ToolbarGroup lastChild={ true }>
				<IconButton>
					<PowerIcon color="#000000de" />
				</IconButton>
			</ToolbarGroup>
		</Toolbar>
	);
};

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500
	}
});

const Main = React.createClass({
	handleSortClick(e, sort) {
		const {
			selectRantsType,
			fetchRantsIfNeeded
		} = this.props;

		selectRantsType(sort);
		fetchRantsIfNeeded(sort);
	},

	render() {
		const props = this.props;

		return (
			<MuiThemeProvider muiTheme={ muiTheme }>
				<section>
					<Bar
						selectedSort={ props.selectedSort }
						handleSortClick={ this.handleSortClick }
					/>

					{
						React.cloneElement(
							props.children,
							{ ...props }
						)
					}
				</section>
			</MuiThemeProvider>
		);
	}
});

export default Main;
