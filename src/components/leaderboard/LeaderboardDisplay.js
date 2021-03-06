import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from './User.js';
import Header from '../app/Header';
import { connect } from 'react-redux';
import { getLeaders } from './reducers';
import { loadLeaders } from './actions';
import styles from './LeaderboardDisplay.css';


class LeaderboardDisplay extends Component {
  
  static propTypes = {
    loadLeaders: PropTypes.func.isRequired,
    leaders: PropTypes.array
  };

  componentDidMount() {
    const { loadLeaders } = this.props;
    loadLeaders();
  }
 

  render() { 
    const { leaders } = this.props;
    return (
      <div className={styles.leader_display}>
        <Header />
        <h2>L E A D E R B O A R D</h2>
        <table>
          <tbody>
            <thead>
              <td>Name</td>
              <td>Wins</td>
            </thead>
            {
              leaders &&
              leaders.map(leader => (
                <User key={leader.id} user={leader.user} wins={leader.wins}/>
              ))
            }
          </tbody>
        </table>
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