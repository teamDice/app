import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import Control from './Control';
import styles from './GameDisplay.css';

class Game extends PureComponent {

  static propTypes = {
    hand: PropTypes.array.isRequired,
    game: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    postCard: PropTypes.func.isRequired,
    postBid: PropTypes.func.isRequired,
    postFlip: PropTypes.func.isRequired,
    postEmote: PropTypes.func.isRequired
  };

  render() { 
    const { game, hand, profile, postCard, postBid, postFlip, postEmote } = this.props;
    const { players, turn, phase, challenger } = game;
    const currentChallenger = players && challenger ? players.find(player => player.userId === challenger.userId) : null;
    const allFlipped = currentChallenger ? currentChallenger.played.filter(card => !card.type).length === 0 : null;

    return (
      <section className={styles.gameDisplay}>
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
                postFlip={
                  phase === 3 && challenger.userId === profile._id // is this phase 3 and are you the challenger?
                    ? challenger.userId === player.userId //is this you?
                      ? allFlipped //are your cards flipped?
                        ? null
                        : postFlip
                      : allFlipped // if not you, have you flipped all your cards?
                        ? postFlip
                        : null
                    : null
                
                
                }
                // 
                 
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
          postEmote={postEmote}
        />
      </section>
    );
  }
}
 
export default Game;