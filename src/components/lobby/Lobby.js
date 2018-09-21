import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../app/Header';
import QueueForm from './QueueForm';
import Chatroom from './Chatroom';
import { connect } from 'react-redux';
import { getStats, getGames } from './reducers';
import { getProfile } from '../profile/reducers';

import { requestGame, removeGame, getStatsById, loadChatroom } from './actions';
import styles from './Lobby.css';

export class Lobby extends Component {

  static propTypes = {
    profile: PropTypes.object,
    games: PropTypes.string,
    stats: PropTypes.object,
    requestGame: PropTypes.func.isRequired,
    getStatsById: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    removeGame: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    const { games, history } = this.props;
    if(!games) return;

    history.push({
      pathname: `/games/${games}`
    });
  }

  componentWillUnmount() {
    const { requestGame, removeGame } = this.props;
    removeGame();
    requestGame(true, 'queue2');
    requestGame(true, 'queue3');
    requestGame(true, 'queue4');
  }

  render() { 
    const { requestGame, profile } = this.props;
    

    return (
      <div className={styles.lobby}>
        <Header/>
        <QueueForm onClick={requestGame}/>
        <Chatroom profile={profile}/>
      </div>
    );
  }
}
 
export default connect(
  state => ({
    profile: getProfile(state),
    games: getGames(state),
    stats: getStats(state)
  }),
  { requestGame, getStatsById, loadChatroom, removeGame }
)(Lobby);
