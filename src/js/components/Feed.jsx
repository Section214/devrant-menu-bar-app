import React from 'react';
import { Link } from 'react-router';

const Feed = React.createClass({
	render() {
		return (
			<ul>
				{
					[ 'Fuck CSS!', 'Rant rant rant!' ].map((n, i) =>
						<li key={ i }>
							<Link to={ `/rants/${i}` }>
								<span>{ n }</span>
							</Link>
						</li>
					)
				}
			</ul>
		);
	}
});

export default Feed;
