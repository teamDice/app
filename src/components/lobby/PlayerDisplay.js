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
          <article className="title">
            <h1 className="player-header">Bobby</h1>
            <button className="edit">✎</button>
          </article>
          <div className="top-playerInfo">
            <img src="https://toolnavy.com/customavatars/avatar38224_10.gif" />
            <h3>Greeting: "Prepare to... DIE"</h3>
          </div>
          <section className="playerInfo">
            <div>
              <p>Location: Portland</p>
              <p>Statistics:</p>
              <ul>
                <li>Total Wins: 3</li>
                <li>Total Games: 11</li>
              </ul>
            </div>
          </section>
        </section>

      </div>
    );
  }
}
 
export default PlayerDisplay;