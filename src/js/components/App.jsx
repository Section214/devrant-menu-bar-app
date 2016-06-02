import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sortRants from '../action-creators/sort-rants';
import Main from './Main';

function mapStateToProps({ posts, comments }) {
	return { posts, comments };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ sortRants }, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
