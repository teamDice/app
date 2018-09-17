import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QueueItem extends Component {

  state = {
    selected: false
  };

  static propTypes = {
    playersWaiting: PropTypes.string,
    queueType: PropTypes.string
  };

  handleClick = () => {
    this.setState({
      selected: !this.state.selected
    });
  };

  render() { 
    const { playersWaiting, queueType } = this.props;
    return (
      <article>
        <p>Players: {playersWaiting}</p>
        <div 
          onClick={ this.handleClick }
          className={ this.state.selected ? 'queueSelected' : 'queue'}
        >
          {queueType}
        </div>
      </article>
    );
  }
}
 
export default QueueItem;