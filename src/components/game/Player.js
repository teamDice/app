import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Card from './Card';
import back from '../../assets/back.png';
import styles from './Player.css';

class Player extends PureComponent {

  static propTypes = {
    player: PropTypes.object.isRequired,
    turn: PropTypes.string,
    phase: PropTypes.number,
    postFlip: PropTypes.func
  };

  // componentDidMount() {
  //   setTimeout(() => {
  //     clearEmote();
  //   }, 5000);

  // }

  render() {
    const { player, turn, phase, postFlip } = this.props;
    const { hand, played, name, avatar, bid } = player;
    // const order = played.map(card => card.order);
    // const highestOrder = Math.max(...order);

    return (
      <section className={styles.player} 
        style={{ backgroundColor: turn === player.userId ? '#ff0000' : null }}
      >
        <Avatar avatar={avatar} bid={bid}/>
        {/* <h2>{emote}</h2> */}
        <h2>{name}</h2>
        <div className="hand">
          {hand > 0 && 
          <Fragment>
            <div className='handDisplay'>{hand}</div>
            <img className='handImage' src={back}/>
          </Fragment>
          }
        </div>
        {played && 
          <div className="played">
            {played.map((card, i) => (
              <Card key={i} card={card} postMove={phase === 3 ? postFlip : null}  playerId={player.userId}/>
            ))}
          </div>
        }
      </section>
    );
  }
}
 
export default Player;