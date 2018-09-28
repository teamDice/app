import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueueItem from './QueueItem';
import styles from './QueueForm.css';

class QueueForm extends Component {

  static propTypes = {
    handleQueue: PropTypes.func.isRequired,
    queue2Users: PropTypes.number,
    queue3Users: PropTypes.number,
    queue4Users: PropTypes.number,
  };

  render() { 
    const { handleQueue, queue2Users, queue3Users, queue4Users } = this.props;

    return (
      <div className={styles.queueForm}>
        <section>
          <QueueItem handleQueue={handleQueue} playersWaiting={queue2Users} queueType="2"/>
          <QueueItem handleQueue={handleQueue} playersWaiting={queue3Users} queueType="3"/>
          <QueueItem handleQueue={handleQueue} playersWaiting={queue4Users} queueType="4"/>
        </section>
      </div>
    );
  }
}
 
export default QueueForm;