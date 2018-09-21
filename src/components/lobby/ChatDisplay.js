import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ChatDisplay.css';

class ChatDisplay extends Component {

  static propTypes = {
    chatroom: PropTypes.array
  };

  //the scrolling to bottom featured in this code was found on Stack Overflow, posted by user metakermit

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() { 
    const { chatroom } = this.props;
    return (
      <div className={styles.chat_display}>
        {chatroom.map(chat => (
          <p key={chat.key}><span className='chatName'>{chat.name}</span>: {chat.text}</p>
        ))}
        <div 
          style={{ float:'left', clear: 'both' }}
          ref={(el) => { this.messagesEnd = el; }}
        >
        </div>
      </div>
    );
  }
}
 
export default ChatDisplay;