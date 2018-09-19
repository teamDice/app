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
    postMove: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { players, phase } = this.props;
    if(players) {
      const previousBid = Math.max(...players.map(player => player.bid));
      const totalPlayed = players.reduce(((acc, cur) => acc + cur.played.length), 0);
      const startingBid = phase === 1 ? 1 : previousBid + 1;
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
    this.props.postMove(this.state);
  };

  render() { 
    const { toggle, phase } = this.props;
    const { bid, minBid, maxBid } = this.state;
   
    return (
      <div className="bids">
        <i onClick={toggle} className="fas fa-times"></i>
        {phase === 2 && <button>PASS</button>}
        {bid > minBid && <i className="fa fa-minus" onClick={this.handleDecrement}></i>}
        <p>{bid}</p>
        {bid < maxBid && <i className="fa fa-plus" onClick={this.handleIncrement}></i>}
        <button onClick={this.handleBid}>BID</button>
      </div>
    );
    
  }
}

export default Bids;