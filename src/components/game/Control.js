import React, { PureComponent } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import styles from './Control.css';

class Control extends PureComponent {
  state = {
    hand: [
      { type: 1 },
      { type: 1 },
      { type: 1 },
      { type: 0 }
    ]
  };

  render() { 
    const { hand } = this.state;
    return (
      <section className={styles.control}>
        <button>BID</button>
        <div className="hand">
          {hand.map((card, i) => (
            <Card key={i} card={card}/>
          ))}
        </div>
      </section>
    );
  }
}
 
export default Control;