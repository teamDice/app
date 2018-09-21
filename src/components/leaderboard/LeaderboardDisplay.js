import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from './User.js';
import { connect } from 'react-redux';
import { getLeaders } from './reducers';
import { loadLeaders } from './actions';
import styles from './LeaderboardDisplay.css';


class LeaderboardDisplay extends Component {
  
  static propTypes = {
    loadLeaders: PropTypes.func.isRequired,
    users: PropTypes.array
  };

  componentDidMount() {
    const { loadLeaders } = this.props;
    loadLeaders();
  }
 

  render() { 
    const { users } = this.props;
    return (
      <div className={styles.leader_display}>
        <h2>L E A D E R B O A R D</h2>
        <table className="leader_table">
          {/* <thead>
            <td>Name</td>
            <td>Total Wins</td>
            <td>Total Games</td>
            <td>Win %</td> 
          </thead> */}
          {
            users &&
            users.map(user => (
              <User key={user.id} user={user}/>
            ))
          }
          
        </table>
      </div>
    );
  }
}
 
export default connect(
  state => ({
    users: getLeaders(state)
  }),
  { loadLeaders }
)(LeaderboardDisplay);