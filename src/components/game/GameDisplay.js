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
    postMove: PropTypes.func.isRequired
  };

  render() { 
    const { game, hand, postMove } = this.props;
    const { players, turn } = game;

    return (
      <section>
        {
          players &&
            players.map(player => (
              <Player key={player.userId} player={player} turn={turn}/>
            ))
        }
        
        <Control 
          hand={hand}
          game={game} 
          postMove={postMove}
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