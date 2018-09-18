import React, { Component } from 'react';
import styles from './Home.css';

export class Home extends Component {

  render() { 

    return (
      <div className={styles.home}>
        <h1>Snakes &amp; Squirrels</h1>
        <section>
          <p>player profile and picture</p>
        </section>
        <section>
          <h3>How to Play:</h3>
          <p>Each turn, either play a card or make a challenge. The first player to win 2 challenges is the victor!</p>
          <ul>
            <li><strong>Bluffing:</strong> is strongly encouraged.</li>
            <li><strong>Challenges:</strong> Once everyone has a card down, you can challenge by declaring how many squirrels you find.</li>
            <li><strong>Snake Attacked:</strong> If you flip a snake, you lose a random card.</li>
          </ul>
        </section>
      </div>
    );
  }
}
 
export default Home;