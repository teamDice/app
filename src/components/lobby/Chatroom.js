import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendChat } from './actions';
import { connect } from 'react-redux';
import { getChatroom } from './reducers';
import { loadChatroom } from './actions';
import { db } from '../../services/firebase';
import { chatRef } from '../../services/firebaseRef';


import ChatDisplay from './ChatDisplay';

class Chatroom extends Component {

  state = {
    message: ''
  };

  static propTypes = {
    sendChat: PropTypes.func,
    loadChatroom: PropTypes.func.isRequired,
    chatroom: PropTypes.array,
    user: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { loadChatroom } = this.props;
    loadChatroom();
  }


  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event, message) => {
    event.preventDefault();
    const { name } = this.props.user.profile;
    db.ref(chatRef).push({
      name: name,
      text: message
    });
    this.setState({ message: '' });
  };

  render() { 
    const { chatroom } = this.props;
    const { message } = this.state;
    
    return (
      <div>
        <ChatDisplay chatroom={chatroom}/>
        <form onSubmit={event => this.handleSubmit(event, this.state.message)}>
          <input name='message' value={message} onChange={this.handleChange}/>
          <button type='submit'>Send</button>
        </form>
      </div>
    );
  }
}
 
export default connect(
  state => ({
    chatroom: getChatroom(state)
  }),
  { sendChat, loadChatroom }
)(Chatroom);