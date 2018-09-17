import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLeaders } from '../lobby/reducers';
import { loadLeaders } from '../lobby/actions';

class LeaderboardDisplay extends Component {
  static propTypes = {
    leaders: PropTypes.array,
    loadLeaders: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadLeaders();
  }

  render() { 
    const { leaders } = this.props;

    return (
      <div>
        <h2>Top 5 Most Successful Generals</h2>
        <ul>
          {leaders.map(leader => {
            <li>{leader.name}: {leader.wins}</li>;
          })}
        </ul>
      </div>
    );
  }
}
 
export default connect(
  state => ({
    leaders: getLeaders(state)
  }),
  { loadLeaders }
)(LeaderboardDisplay);