import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueueItem from './QueueItem';
import styles from './QueueForm.css';

class QueueForm extends Component {
  state = {
    two: false,
    three: false,
    four: true
  };

  static propTypes = {
    onClick: PropTypes.func.isRequired
  };


  handleSubmit = event => {
    event.preventDefault();
    const { onClick } = this.props;
    onClick(this.state);
  };

  render() { 


    return (
      <form className={styles.queueForm} onSubmit={this.handleSubmit}>
        <section>
          <QueueItem playersWaiting="1" queueType="2"/>
          <QueueItem playersWaiting="0" queueType="3"/>
          <QueueItem playersWaiting="3" queueType="4"/>
        </section>
        <button className="submit">Find Game</button>
      </form>
    );
  }
}
 
export default QueueForm;