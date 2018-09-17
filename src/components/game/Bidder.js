import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Bidder.css';

class Bidder extends Component {

  


  static propTypes = {
    troops: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render() { 
    const { troops, onSelect, onSubmit } = this.props;
    return (
      <section className={styles.bidder}>
        <button onClick={onSubmit} className="submit">Submit</button>

        <span>
          {buildArray(troops).map(troop => (
            <button
              className="numbers"
              key={troop}
              onClick={() => onSelect(troop)}>{troop}</button>
          ))}
        </span>

      </section>
    );
  }
}
 
const buildArray = number => {
  let arr = [];
  for(let i = 1; i <= number; i++) {
    arr.push(i);
  }
  return arr;
};
 
export default Bidder;