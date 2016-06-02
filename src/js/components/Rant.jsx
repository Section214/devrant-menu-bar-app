import React from 'react';

const Rant = React.createClass({
	render() {
		const { params } = this.props;

		return (
			<div>
				<span>{ params.id }</span>
			</div>
		);
	}
});

export default Rant;
