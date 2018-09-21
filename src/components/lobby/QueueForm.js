import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueueItem from './QueueItem';
import styles from './QueueForm.css';

class QueueForm extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    queue2Users: PropTypes.number,
    queue3Users: PropTypes.number,
    queue4Users: PropTypes.number,
  };

  render() { 
    const { onClick, queue2Users, queue3Users, queue4Users } = this.props;

    return (
      <div className={styles.queueForm}>
        <section>
          <QueueItem onClick={onClick} playersWaiting={queue2Users} queueType="2"/>
          <QueueItem onClick={onClick} playersWaiting={queue3Users} queueType="3"/>
          <QueueItem onClick={onClick} playersWaiting={queue4Users} queueType="4"/>
        </section>
      </div>
    );
  }
}
 
export default QueueForm;