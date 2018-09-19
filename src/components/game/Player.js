import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Card from './Card';
import styles from './Player.css';

class Player extends PureComponent {

  static propTypes = {
    player: PropTypes.object.isRequired
  };

  // componentDidMount() {
  //   setTimeout(() => {
  //     clearEmote();
  //   }, 5000);

  // }

  render() {
    const { player } = this.props;
    const { hand, played, name } = player;

    return (
      <section className={styles.player}>
        <Avatar/>
        {/* <h2>{emote}</h2> */}
        <h2>{name}</h2>
        <div className="hand">
          <Card cards={player.hand}/>
        </div>
        {played && 
          <div className="played">
            {[...Array(played.length)].map((card, i) => (
              <Card key={i}/>
            ))}
          </div>
        }
      </section>
    );
  }
}
 
export default Player;