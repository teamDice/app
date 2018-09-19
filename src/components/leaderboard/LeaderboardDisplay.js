import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from './User.js';
import styles from './LeaderboardDisplay.css';


class LeaderboardDisplay extends Component {
  state = { 
    users: [{
      name: 'Bobby',
      totalWin: 5,
      totalGames: 10,
      winPercent: 50
    },
    {
      name: 'Arthur',
      totalWin: 6,
      totalGames: 10,
      winPercent: 60
    },
    {
      name: 'Easton',
      totalWin: 7,
      totalGames: 10,
      winPercent: 70
    },
    {
      name: 'Injoong',
      totalWin: 8,
      totalGames: 10,
      winPercent: 80
    },
    {
      name: 'Kevin',
      totalWin: 9,
      totalGames: 10,
      winPercent: 90
    },
    {
      name: 'Mario',
      totalWin: 1,
      totalGames: 10,
      winPercent: 10
    },
    {
      name: 'Antreo',
      totalWin: 2,
      totalGames: 10,
      winPercent: 20
    },
    {
      name: 'Robyn',
      totalWin: 3,
      totalGames: 10,
      winPercent: 30
    },
    {
      name: 'Mark',
      totalWin: 4,
      totalGames: 10,
      winPercent: 40
    }
    ]
  };
  static propTypes = {
    users: PropTypes.array  
  };
 

  render() { 
    const { users } = this.state;
    return (
      <div className={styles.leader_display}>
        <h2>L E A D E R B O A R D</h2>
        <table className="leader_table">
          <thead>
            <th>Name</th>
            <th>Total Wins</th>
            <th>Total Games</th>
            <th>Win %</th> 
          </thead>
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
 
export default LeaderboardDisplay;