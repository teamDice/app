import React, { PureComponent, Fragment } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import styles from './Control.css';

class Control extends PureComponent {
  state = {
    emoting: false,
    bidding: false,
    hand: [
      { type: 1 },
      { type: 1 },
      { type: 1 },
      { type: 0 }
    ]
  };

  toggleEmoting= () => {
    this.setState(({ emoting }) => ({ emoting: !emoting }));
  };

  toggleBidding = () => {
    this.setState(({ bidding }) => ({ bidding: !bidding }));
  };

  render() { 
    const { hand, emoting, bidding } = this.state;
    return (
      <section className={styles.control}>
        {emoting && <Emotes toggle={this.toggleEmoting}/>}
        {bidding && <Bids toggle={this.toggleBidding}/>}
        {!emoting && !bidding &&
          <Fragment>
            <div>
              <button onClick={this.toggleEmoting}>Emote</button>
              <button onClick={this.toggleBidding}>Bid</button>
            </div>
            <div className="hand">
              {hand.map((card, i) => (
                <Card key={i} card={card}/>
              ))}
            </div>
          </Fragment>
        }
      </section>
    );
  }
}
 
export default Control;

class Emotes extends PureComponent {

  static propTypes = {
    toggle: PropTypes.func.isRequired
  };

  render() { 
    const { toggle } = this.props;

    return (
      <div className="emotes">
        <i onClick={toggle}className="fas fa-times"></i>
        <i className="far fa-laugh-squint"></i>
        <i className="far fa-sad-cry"></i>
        <i className="far fa-grimace"></i>
        <i className="far fa-angry"></i>
      </div>
    );
  }
}
 
class Bids extends PureComponent {

  static propTypes = {
    toggle: PropTypes.func.isRequired
  };

  render() { 
    return (
      <h1>bids</h1>
    );
  }
}