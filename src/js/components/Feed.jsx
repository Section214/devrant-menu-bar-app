import React from 'react';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styles = {
	progress: {
		margin: '0 auto',
		textAlign: 'center'
	},
	feed: {
		marginTop: '6em'
	}
};

const Feed = React.createClass({
	componentDidMount() {
		const {
			selectedSort,
			rantsBySort,
			fetchRantsIfNeeded
		} = this.props;

		const rants = rantsBySort[selectedSort];

		if (!rants.items.length) {
			fetchRantsIfNeeded(selectedSort);
		}
	},

	render() {
		const { selectedSort, rantsBySort } = this.props;
		const rants = rantsBySort[selectedSort];

		return (
			<section style={ styles.feed }>
				<div style={ styles.progress }>
					{
						rants.isFetching && <CircularProgress size={ 1 } />
					}
				</div>

				<List>
					{
						rants.items.map(({ id, text, score }) =>
							<Link to={ `/rants/${id}` } key={ id }>
								<ListItem
									primaryText={ score }
									secondaryText={ text }
									secondaryTextLines={ 2 }
								/>
								<Divider />
							</Link>
						)
					}
				</List>
			</section>
		);
	}
});

export default Feed;
