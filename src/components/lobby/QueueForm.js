import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueueItem from './QueueItem';
import styles from './QueueForm.css';

class QueueForm extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired
  };



  render() { 
    const { onClick } = this.props;

    return (
      <div className={styles.queueForm}>
        <section>
          <QueueItem playersWaiting="1" onClick={onClick} queueType="2"/>
          <QueueItem playersWaiting="0" onClick={onClick} queueType="3"/>
          <QueueItem playersWaiting="3" onClick={onClick} queueType="4"/>
        </section>
      </div>
    );
  }
}
 
export default QueueForm;