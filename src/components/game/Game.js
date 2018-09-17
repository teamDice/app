import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameDisplay from './GameDisplay.js';
import Bidder from './Bidder.js';
import { connect } from 'react-redux';
import { getGame, getMoves } from './reducers';
import { getUser } from '../auth/reducers';
import { loadGame, unloadGame, loadMoves, move } from './actions';
import styles from './Game.css';

class Game extends Component {

  state = {
    selection: null,
    opponentHasBid: false
  };

  static propTypes = {
    match: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    move: PropTypes.func.isRequired,
    moves: PropTypes.array.isRequired,
    loadMoves: PropTypes.func.isRequired,
    loadGame: PropTypes.func.isRequired,
    unloadGame: PropTypes.func,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { match, loadGame, loadMoves } = this.props;
    const { gameKey } = match.params;
    loadGame(gameKey);
    loadMoves(gameKey);
  }

  componentDidUpdate() {
    const { game, history } = this.props;
    if(game !== null) return;
    history.push({
      pathname: '/lobby'
    });
  }

  componentWillUnmount() {
    const { match, unloadGame } = this.props;
    unloadGame(match.params.gameKey);
  }

  handleSelect = selection => {
    this.setState({ selection });
  };

  handleSubmit = () => {
    const { move } = this.props;
    const { selection } = this.state;
    move(selection);
  };

  render() {
    const { game, user, moves } = this.props;
    const { selection } = this.state;
    if(!game || !user) return null;

    const uid = user.profile._id;
    const opponentId = Object.keys(game).filter(key => key !== uid)[0];

    const you = game[uid];
    const opponent = game[opponentId];
    opponent.uid = opponentId;

    return (
      <div className={styles.game}>
        <GameDisplay
          you={you}
          opponent={opponent}
          selection={selection}
          moves={moves.includes(opponentId)}/>
        <Bidder troops={you.troops} onSelect={this.handleSelect} onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    game: getGame(state),
    user: getUser(state),
    moves: getMoves(state)
  }),
  { loadGame, unloadGame, loadMoves, move }
)(Game);