import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


class Bids extends PureComponent {

  state = {
    minBid: null,
    bid: 0,
    maxBid: null
  };

  static propTypes = {
    toggle: PropTypes.func,
    players: PropTypes.array.isRequired,
    phase: PropTypes.number.isRequired,
    postBid: PropTypes.func.isRequired,
    challenger: PropTypes.object
  };

  componentDidMount() {
    const { players, phase, challenger } = this.props;
    if(players) {
      const totalPlayed = players.reduce(((acc, cur) => {
        const played = cur.played ? cur.played.length : 0;
        return acc + played;
      }), 0);
      const startingBid = phase === 1 ? 1 : challenger.bid + 1;
      this.setState({
        minBid: startingBid,
        bid: startingBid,
        maxBid: totalPlayed
      });
    }
  }
  

  handleIncrement = () => {
    this.setState(({ bid }) => ({ bid: bid + 1 }));
  };

  handleDecrement = () => {
    this.setState(({ bid }) => ({ bid: bid - 1 }));
  };

  handleBid = () => {
    const { bid } = this.state;
    this.props.postBid({ bid });
  };

  handlePass = () => {
    this.props.postBid({ bid: -1 });
  };

  render() { 
    const { toggle, phase } = this.props;
    const { bid, minBid, maxBid } = this.state;
   
    return (
      <div className="bids">
        {phase === 1 && <i onClick={toggle} className="fas fa-times"></i>}
        {phase === 2 && <button onClick={this.handlePass}>PASS</button>}
        {bid > minBid && <i className="fa fa-minus" onClick={this.handleDecrement}></i>}
        <p>{bid}</p>
        {bid < maxBid && <i className="fa fa-plus" onClick={this.handleIncrement}></i>}
        <button onClick={this.handleBid}>BID</button>
      </div>
    );
    
  }
}

export default Bids;