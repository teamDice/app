import React, { PureComponent } from 'react';
import Avatar from './Avatar';
import Card from './Card';
import PropTypes from 'prop-types';

class Player extends PureComponent {
  state = {  }
  render() { 
    return (
      <section>
        <h2>Player</h2>
        <Avatar/>
        <Card/>

      </section>
    );
  }
}
 
export default Player;