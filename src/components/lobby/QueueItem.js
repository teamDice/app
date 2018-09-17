import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QueueItem extends Component {

  static propTypes = {
    playersWaiting: PropTypes.string,
    queueType: PropTypes.string
  };
  render() { 
    const { playersWaiting, queueType } = this.props;
    return (
      <article>
        <p>Players: {playersWaiting}</p>
        <div>
          {queueType}
        </div>
      </article>
    );
  }
}
 
export default QueueItem;