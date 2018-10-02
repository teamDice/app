import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueueItem from './QueueItem';
import styles from './QueueForm.css';

class QueueForm extends Component {

  static propTypes = {
    handleQueue: PropTypes.func.isRequired,
    queues: PropTypes.object.isRequired
  };

  render() { 
    const { handleQueue, queues } = this.props;

    return (
      <div className={styles.queueForm}>
        <section>
          <QueueItem handleQueue={handleQueue} playersWaiting={queues[2]} queueType="2"/>
          <QueueItem handleQueue={handleQueue} playersWaiting={queues[3]} queueType="3"/>
          <QueueItem handleQueue={handleQueue} playersWaiting={queues[4]} queueType="4"/>
        </section>
      </div>
    );
  }
}
 
export default QueueForm;