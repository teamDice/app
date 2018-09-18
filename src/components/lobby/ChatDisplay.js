import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ChatDisplay.css';

class ChatDisplay extends Component {

  static propTypes = {
    chatroom: PropTypes.array
  };

  render() { 
    const { chatroom } = this.props;
    return (
      <div className={styles.chat_display}>
        {chatroom.map(chat => (
          <p key={chat.key}><strong>{chat.name}</strong>: {chat.text}</p>
        ))}
      </div>
    );
  }
}
 
export default ChatDisplay;