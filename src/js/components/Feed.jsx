import React from 'react';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import TextIcon from 'material-ui/svg-icons/editor/format-align-left';
import Badge from 'material-ui/Badge';
import CommentIcon from 'material-ui/svg-icons/editor/mode-comment';

const styles = {
	progress: {
		margin: '0 auto',
		textAlign: 'center'
	},
	feed: {
		marginTop: '6em'
	},
	listItem: {
		minHeight: '5.2em'
	},
	image: {
		borderRadius: '5px',
		top: '19px',
		left: '9px'
	},
	score: {
		fontSize: '1.4em',
		fontWeight: 'bold',
		lineHeight: '1em',
		borderRadius: '50%',
		margin: '20px 0',
		padding: '0.5em',
		color: '#f99a66',
		textAlign: 'center',
		right: '9px',
		top: '3px'
	}
};

const Feed = React.createClass({
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);

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

	componentWillUnmount: function() {
		window.removeEventListener('scroll', this.handleScroll);
	},

	getInitialState() {
		return {
			loadMore: false,
			paging: {
				algo: 0,
				top: 0,
				recent: 0
			}
		};
	},

	handleScroll() {
		const { loadMore, paging } = this.state;
		const { selectedSort, fetchRantsIfNeeded } = this.props;
		const travel = window.innerHeight + window.scrollY;
		const isBottom = travel	>= document.getElementById('feed-list').offsetHeight;

		if (isBottom && loadMore) {
			return;
		}

		if (!isBottom && loadMore) {
			this.setState({
				loadMore: false
			});
		}

		if (isBottom && !loadMore) {
			const skip = paging[selectedSort] + 50;

			fetchRantsIfNeeded(selectedSort, skip);

			this.setState({
				loadMore: true,
				paging: {
					...paging,
					[ selectedSort ]: skip
				}
			});
		}
	},

	render() {
		const { loadMore, paging } = this.state;
		const { selectedSort, rantsBySort } = this.props;
		const rants = rantsBySort[selectedSort];
		const showSpinner = rants.isFetching || loadMore;

		return (
			<section style={ styles.feed }>
				<List id="feed-list">
					{
						rants.items.map(({
							id,
							text,
							score,
							attached_image:image,
							user_username:username,
							num_comments:commentCount
						}) =>
							<Link to={ `/rants/${id}` } key={ id }>
								<ListItem
									style={ styles.listItem }
									rightIcon={ <span style={styles.score}>{score}</span> }
									leftAvatar={
										<Avatar
											style={ styles.image }
											src={ image.url }
											icon={ <TextIcon /> }
											size={ 50 }
										/>
									}
									primaryText={ `@${username}` }
									secondaryText={ text }
									secondaryTextLines={ 2 }
								/>

								<Divider style={ {color: '#efefef', backgroundColor: '#efefef'} } />
							</Link>
						)
					}
				</List>

				<div style={ styles.progress }>
					{
						showSpinner && <CircularProgress size={ 59.5 } thickness={ 3.5 } style={{ margin: 5.25 }} />
					}
				</div>
			</section>
		);
	}
});

export default Feed;
