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
    postCard: PropTypes.func,
    postFlip: PropTypes.func,
    setProcessing: PropTypes.func,
    order: PropTypes.number,
    playerId: PropTypes.string,
  };

  handleClick = () => {
    const { postCard, postFlip, card, playerId } = this.props;
    
    // setProcessing();
    if(postFlip) postFlip({ order: card.order, playerId });
    if(postCard) postCard({ type: card.type });

  };

  render() { 
    const { card, postCard, postFlip } = this.props;
    return (
      <div className={styles.card}>

        <img className={postFlip ? 'clickable' : null} onClick={postCard || postFlip ? this.handleClick : null} src={
          card.type > -1
            ? card.type === 1
              ? squirrel
              : snake
            : back
        }/> 
      </div>
    );
  }
}
 
export default Card;