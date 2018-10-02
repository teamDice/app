import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../app/Header';
import QueueForm from './QueueForm';
import Chatroom from './Chatroom';
import { connect } from 'react-redux';
import { getGames, getQueues } from './reducers';
import { getProfile } from '../profile/reducers';
import {
  requestGame,
  removeGame,
  loadChatroom,
  loadQueues } from './actions';
import styles from './Lobby.css';

export class Lobby extends Component {

  static propTypes = {
    profile: PropTypes.object,
    games: PropTypes.string,
    queues: PropTypes.object.isRequired,
    requestGame: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    removeGame: PropTypes.func.isRequired,
    loadQueues: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { loadQueues } = this.props;
    loadQueues();
  }

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
    requestGame(true, 2);
    requestGame(true, 3);
    requestGame(true, 4);
  }

  render() { 
    const { requestGame, profile, queues } = this.props;
    

    return (
      <div className={styles.lobby}>
        <Header/>
        <QueueForm 
          handleQueue={requestGame}
          queues={queues}
        />
        <Chatroom profile={profile}/>
      </div>
    );
  }
}
 
export default connect(
  state => ({
    profile: getProfile(state),
    games: getGames(state),
    queues: getQueues(state)
  }),
  { requestGame, loadChatroom, removeGame, loadQueues }
)(Lobby);
