import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import back from '../../assets/back.png';
import squirrel from '../../assets/squirrel.png';
import snake from '../../assets/snake.png';
import styles from './Card.css';

class Card extends PureComponent {
  static propTypes = {
    card: PropTypes.object,
    onClick: PropTypes.func
  };

  render() { 
    const { card } = this.props;
    return (
      <Fragment>
        
        <img className={styles.card} src={
          card
            ? card.type === 1
              ? squirrel
              : snake
            : back
        }/>

      </Fragment>
    );
  }
}
 
export default Card;