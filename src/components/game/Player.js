import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Card from './Card';
import styles from './Player.css';

class Player extends PureComponent {

  static propTypes = {
    player: PropTypes.object.isRequired
  };


  render() {
    const { player } = this.props;
    const { hand, played } = player;

    return (
      <section className={styles.player}>
        <Avatar/>
        <h2>User name</h2>
        <div className="hand">
          {[...Array(hand)].map((card, i) => (
            <Card key={i} card={card}/>
          ))}
        </div>
        <div className="played">
          {[...Array(played)].map((card, i) => (
            <Card key={i}/>
          ))}
        </div>
      </section>
    );
  }
}
 
export default Player;