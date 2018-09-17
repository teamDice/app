import React, { PureComponent } from 'react';
import Avatar from './Avatar';
import Card from './Card';
import PropTypes from 'prop-types';
import styles from './Player.css';

class Player extends PureComponent {

  // placeholder hand data
  state = {
    hand: [
      { type: 1 },
      { type: 1 },
      { type: 1 },
      { type: 0 }
    ]
  };

  render() {
    const { hand } = this.state;

    return (
      <section className={styles.player}>
        <Avatar/>
        <h2>User name</h2>
        <div className="hand">
          {hand.map((card, i) => (
            <Card key={i} card={card}/>
          ))}
        </div>
        <div className="played">
          {[...Array(0)].map((card, i) => (
            <Card key={i}/>
          ))}
        </div>
      </section>
    );
  }
}
 
export default Player;