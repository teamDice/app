import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './playerDisplay.css';

class PlayerDisplay extends PureComponent {
  state = { 
    editing: false
  };

  // static propTypes = {
  //   profile: PropTypes.object.isRequired,
  //   stats: PropTypes.object.isRequired
  // };

  render() { 
    // const { stats, profile } = this.props;
    // const { totalWins, totalGames } = stats;
    // const { name, location, rank, avatar } = profile;

    return ( 
      <div>
        <section className={styles.playerDisplay}>
          <h1>Bobby</h1>
          <img src="https://toolnavy.com/customavatars/avatar38224_10.gif" />
          <section className="playerInfo">
            <p>Location: Portland</p>
            <p>Rank: Private</p>
            <p>Statistics:</p>
            <ul>
              <li>Total Wins: 3</li>
              <li>Total Games: 11</li>
            </ul>
          </section>
        </section>

      </div>
    );
  }
}
 
export default PlayerDisplay;