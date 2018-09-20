import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Control from './Control';
import PropTypes from 'prop-types';
import { loadGame } from './actions';
import { getGame } from './reducers';

class Game extends PureComponent {

  static propTypes = {
    hand: PropTypes.array.isRequired,
    game: PropTypes.object.isRequired,
    postCard: PropTypes.func.isRequired,
    postBid: PropTypes.func.isRequired,
    postFlip: PropTypes.func.isRequired
  };

  render() { 
    const { game, hand, postCard, postBid, postFlip } = this.props;
    const { players, turn, phase } = game;

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
                postFlip={postFlip}
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
 
export default connect(
  state => ({
    game: getGame(state)
  }),
  { loadGame }
)(Game);