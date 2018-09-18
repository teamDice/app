import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerDisplay from './PlayerDisplay';
import QueueForm from './QueueForm';
import Chatroom from './Chatroom';
import { connect } from 'react-redux';
import { getGames, getStats } from './reducers';
import { getUser } from '../auth/reducers';
import { requestGame, deQueue, getStatsById, loadChatroom } from './actions';
import styles from './Lobby.css';

export class Lobby extends Component {

  static propTypes = {
    user: PropTypes.object,
    games: PropTypes.string,
    stats: PropTypes.object,
    requestGame: PropTypes.func.isRequired,
    deQueue: PropTypes.func.isRequired,
    getStatsById: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  // componentDidMount() {

  // const { getStatsById, user } = this.props;
  // getStatsById(user.profile._id);
  // }

  componentDidUpdate() {
    const { games, history } = this.props;
    if(!games) return;
    history.push({
      pathname: `/games/${games}`
    });
  }

  componentDidUnmount() {
    this.props.deQueue();
  }

  render() { 
    const { requestGame, user } = this.props;

    return (
      <div className={styles.lobby}>
        <QueueForm onClick={requestGame}/>
        <Chatroom user={user}/>
        {/* <PlayerDisplay/> */}
        {/* {user && <button onClick={requestGame}>PLAY GORTS</button>} */}
      </div>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state),
    games: getGames(state),
    stats: getStats(state)
  }),
  { requestGame, deQueue, getStatsById, loadChatroom }
)(Lobby);
