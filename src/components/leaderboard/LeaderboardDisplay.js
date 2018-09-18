import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './LeaderboardDisplay.css';


class LeaderboardDisplay extends Component {
  


 

  render() { 

    return (
      <div className={styles.leader_display}>
        <h2>L E A D E R B O A R D</h2>
        <table className="leader_table">
          <tr className="leader_heading">
            <th>Name</th>
            <th>Total Wins</th>
            <th>Total Games</th>
            <th>Win %</th> 
          </tr>
          <tr>
            <td>Bobby</td>
            <td>5</td>
            <td>10</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Arthur</td>
            <td>6</td>
            <td>10</td>
            <td>60</td>
          </tr>
          <tr>
            <td>Easton</td>
            <td>7</td>
            <td>10</td>
            <td>70</td>
          </tr>
          <tr>
            <td>Injoong</td>
            <td>8</td>
            <td>10</td>
            <td>80</td>
          </tr>
        </table>
      </div>
    );
  }
}
 
export default LeaderboardDisplay;