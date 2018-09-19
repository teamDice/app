import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameDisplay from './GameDisplay';
import { startGame, loadHand, clearEmotes, endGame } from './actions';
import { getGame, getHand } from './reducers';

class Game extends PureComponent {

  static propTypes = {
    match: PropTypes.object.isRequired,
    startGame: PropTypes.func.isRequired,
    loadHand: PropTypes.func.isRequired,
    game: PropTypes.object,
    hand: PropTypes.array
  };

  componentDidMount() {
    const { match, startGame, loadHand } = this.props;
    const { gameKey } = match.params;
    startGame(gameKey);
    loadHand();

    setTimeout(() => clearEmotes(gameKey), 3000);
  }


  render() { 
    const { game, hand } = this.props;
    return (
      <section>
        {game && hand &&
          <GameDisplay
            game={game}
            hand={hand}
          />
        }
      </section>
    );
  }
}
 
export default connect(
  state => ({
    game: getGame(state),
    hand: getHand(state)
  }),
  { startGame, loadHand, endGame }
)(Game);