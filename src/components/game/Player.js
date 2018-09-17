import React, { PureComponent } from 'react';
import Avatar from './Avatar';
import Card from './Card';
import PropTypes from 'prop-types';

class Player extends PureComponent {

  // placeholder hand data
  state = {
    hand: [
      { type: 1 },
      { type: 1 },
      // { type: 1 },
      { type: 0 }
    ]
  };

  render() {
    const { hand } = this.state;

    return (
      <section>
        <h2>User name</h2>
        <Avatar/>
        <div className="hand">
          {hand.map((card, i) => (
            <Card key={i} card={card}/>
          ))}
        </div>
        <div className="played">
          {[...Array(1)].map((card, i) => (
            <Card key={i}/>
          ))}
        </div>
      </section>
    );
  }
}
 
export default Player;