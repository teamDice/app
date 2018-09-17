import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Player.css';

class Player extends Component {
  

  static propTypes = {
    isYou: PropTypes.bool.isRequired,
    player: PropTypes.object.isRequired,
    selection: PropTypes.number,
    moves: PropTypes.bool
  };

  render() { 
    const { player, selection, moves, isYou } = this.props;
    const { wins, troops } = player;

    return (
      <section className={styles.player}>
        <section className="name-area">
          <h3>{isYou ? 'You' : 'Opponent'}</h3>
          <span>{buildArray(wins)
            .map((n, i) => 
              <i key={i} className="fas fa-star"></i>
            )
          }</span>
        </section>
        <section className="move">
          {moves &&
            <h1>Ready</h1>
          }
          <h1>{selection}</h1>
        </section>
        <p>{buildArray(troops)
          .map((n, i) => 
            <img className={isYou ? 'you' : 'opponent'} key={i} src={isYou
              ? 'https://i.imgur.com/iWo9fR6.png'
              : 'https://i.imgur.com/DfIxmLr.png'}
            />
          )
        }</p>
        
      </section>
    );
  }
}
const buildArray = number => {
  let arr = [];
  for(let i = 0; i < number; i++) {
    arr.push(i);
  }
  return arr;
};
export default Player;