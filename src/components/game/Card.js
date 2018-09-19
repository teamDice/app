import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import back from '../../assets/back.png';
import squirrel from '../../assets/squirrel.png';
import snake from '../../assets/snake.png';
import styles from './Card.css';

class Card extends PureComponent {
  static propTypes = {
    cards: PropTypes.number,
    card: PropTypes.object,
    postMove: PropTypes.func,
    setProcessing: PropTypes.func,
    order: PropTypes.number,
    playerId: PropTypes.string
  };

  handleClick = () => {
    const { postMove, card, setProcessing, order, playerId } = this.props;
    const { type } = card;
    setProcessing();
    if(order) postMove({ order, playerId });
    else postMove({ type });
  };

  render() { 
    const { card, cards } = this.props;
    return (
      <div className={styles.card}>
        {cards && 
          <div>{cards}</div>
        }
        
        
        <img onClick={this.handleClick} src={
          card
            ? card.type === 1
              ? squirrel
              : snake
            : back
        }></img>

        


      </div>
    );
  }
}
 
export default Card;