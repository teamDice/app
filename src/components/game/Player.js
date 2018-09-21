import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { db } from '../../services/firebase';
import Card from './Card';
import back from '../../assets/back.png';
import styles from './Player.css';

class Player extends PureComponent {

  static propTypes = {
    player: PropTypes.object.isRequired,
    turn: PropTypes.string,
    profile: PropTypes.object.isRequired,
    phase: PropTypes.number,
    postFlip: PropTypes.func,
    challenger: PropTypes.object
  };

  render() {
    const { player, turn, postFlip } = this.props;
    const { hand, played, name, avatar, bid, emote, message } = player;
    let lastCard;
    if(played) {
      const notFlippedCards = played.filter(card => !card.type);
      lastCard = notFlippedCards[notFlippedCards.length - 1];
    }

    return (
      <section className={styles.player} 
        style={turn === player.userId ? { backgroundColor: 'rgba(0, 0, 0, .25)', border: '1px solid white', borderRadius: '10px' } : null } 
      >
        <Avatar emote={emote} avatar={avatar} bid={bid}/>
        <p>{message}</p>
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
          <div className={['played', 'animated ', 'bounceInLeft'].join('')}>
            {played.map((card, i) => (
              <Card
                key={i}
                card={card}
                postFlip={card === lastCard ? postFlip : null}
                playerId={player.userId}/>
            ))}
          </div>
        }
      </section>
    );
  }
}
 
export default Player;