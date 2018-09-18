import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendChat } from './actions';
import { connect } from 'react-redux';
import { getChatroom } from './reducers';
import { loadChatroom } from './actions';


import ChatDisplay from './ChatDisplay';

class Chatroom extends Component {

  state = {
    message: ''
  };

  static propTypes = {
    sendChat: PropTypes.func,
    loadChatroom: PropTypes.func.isRequired,
    chatroom: PropTypes.array
  };

  componentDidMount() {
    const { loadChatroom } = this.props;
    loadChatroom();
  }


  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  handleSubmit = (event, message) => {
    event.preventDefault();
    const { sendChat } = this.props;
    sendChat(message);
  };

  render() { 
    const { chatroom } = this.props;
    return (
      <div>
        <ChatDisplay chatroom={chatroom}/>
        <form onSubmit={event => this.handleSubmit(event, this.state.message)}>
          <input name='message' onChange={this.handleChange}/>
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