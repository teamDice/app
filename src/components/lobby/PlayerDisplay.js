import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './playerDisplay.css';

class PlayerDisplay extends PureComponent {
  state = { 
    editing: false
  };

  static propTypes = {
    profile: PropTypes.object.isRequired,
    stats: PropTypes.object.isRequired
  };

  render() { 
    const { stats, profile } = this.props;
    const { totalWins, totalGames } = stats;
    const { name, location, rank, avatar } = profile;

    return ( 
      <section className={styles.playerDisplay}>
        <img src={avatar} />
        <section className="playerInfo">
          <h1>{name}</h1>
          <p>Location: {location}</p>
          <p>Rank: {rank}</p>
          <p>Statistics:</p>
          <ul>
            <li>Total Wins: {totalWins}</li>
            <li>Total Games: {totalGames}</li>
          </ul>
        </section>
      </section>
    );
  }
}
 
export default PlayerDisplay;