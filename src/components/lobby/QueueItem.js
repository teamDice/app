import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QueueItem extends Component {

  state = {
    searching: false
  };

  static propTypes = {
    playersWaiting: PropTypes.string,
    queueType: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { onClick, queueType } = this.props;
    const { searching } = this.state;

    onClick(searching, `queue${queueType}`);
     
    this.setState({
      searching: !this.state.searching
    });
  };

  render() { 
    const { playersWaiting, queueType } = this.props;
    return (
      <article>
        <p>Players: {playersWaiting}</p>
        <div 
          onClick={ this.handleClick }
          className={ this.state.searching ? 'queueSelected' : 'queue'}
        >
          {queueType}
        </div>
      </article>
    );
  }
}
 
export default QueueItem;