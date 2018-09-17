import React, { Component } from 'react';
import Player from './Player.js';
import PropTypes from 'prop-types';
import styles from './GameDisplay.css';

class GameDisplay extends Component {
  static propTypes = {
    you: PropTypes.object.isRequired,
    opponent: PropTypes.object.isRequired,
    moves: PropTypes.bool.isRequired,
    selection: PropTypes.number
  };

  render() { 
    const { you, opponent, moves, selection } = this.props;

    return (
      <section className={styles.gameDisplay}>
        <Player player={you} isYou={true} selection={selection}/>
        <Player player={opponent} isYou={false} moves={moves}/>
      </section>
    );
  }
}
 
export default GameDisplay;