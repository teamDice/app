import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Control from './Control';
import PropTypes from 'prop-types';
import { loadGame } from './actions';
import { getGame, getHand } from './reducers';

class Game extends PureComponent {

  static propTypes = {
    loadGame: PropTypes.func.isRequired,
    game: PropTypes.object,
    hand: PropTypes.array
  };

  componentDidMount() {
    this.props.loadGame();
  }

  render() { 

    const { game, hand } = this.props;
    const { players } = game;

    return (
      <section>
        {
          players &&
            players.map(player => (
              <Player key={player.id} player={player}/>
            ))
        }
        
        <Control/>
      </section>
    );
  }
}
 
export default connect(
  state => ({
    game: getGame(state),
    hand: getHand(state)
  }),
  { loadGame }
)(Game);