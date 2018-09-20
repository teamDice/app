import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import Control from './Control';

class Game extends PureComponent {

  static propTypes = {
    hand: PropTypes.array.isRequired,
    game: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    postCard: PropTypes.func.isRequired,
    postBid: PropTypes.func.isRequired,
    postFlip: PropTypes.func.isRequired
  };

  render() { 
    const { game, hand, profile, postCard, postBid, postFlip } = this.props;
    const { players, turn, phase, challenger } = game;

    return (
      <section>
        {
          players &&
            players.map(player => (
              <Player
                key={player.userId}
                player={player}
                turn={turn}
                phase={phase}
                challenger={challenger}
                profile={profile}
                postFlip={postFlip}
                // phase === 3 && challengerId === profile._id
                 
                // ? challengerId === player.userId && notFlippedCards.length > 0
                //   ? notFlippedCards[notFlippedCards.length - 1]
                //     ? postFlip
                //     : null
                //   : notFlippedCards.length > 0
                //     ?
                //     :
                // // send postFlip to only challenger cards

                // // send postFlip to the highest order non-type card
                // : null
              />
            ))
        }
        
        <Control 
          hand={hand}
          game={game} 
          postCard={postCard}
          postBid={postBid}
        />
      </section>
    );
  }
}
 
export default Game;