import React, { Component } from 'react';
import styles from './Home.css';

export class Home extends Component {

  render() { 

    return (
      <div className={styles.home}>
        <h1>GORTS</h1>
        <section>
          <h3>How to Play:</h3>
          <p>You and your opponent choose how many troops to send to battle. </p>
          <ul>
            <li><strong>Stalemate:</strong> Replay on a tie.</li>
            <li><strong>Guerilla Warfare:</strong> Lower number wins if the difference is greater than 3.</li>
            <li><strong>Outnumbered:</strong> Higher number wins, otherwise.</li>
          </ul>
        </section>
      </div>
    );
  }
}
 
export default Home;