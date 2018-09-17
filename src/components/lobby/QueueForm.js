import React, { Component } from 'react';
import QueueItem from './QueueItem';
import styles from './QueueForm.css';

class QueueForm extends Component {

  render() { 
    return (
      <div>
        <section className={styles.queueForm}>
          <QueueItem playersWaiting="1" queueType="2"/>
          <QueueItem playersWaiting="0" queueType="3"/>
          <QueueItem playersWaiting="3" queueType="4"/>
        </section>
        <button className="submit">Go</button>
      </div>
    );
  }
}
 
export default QueueForm;