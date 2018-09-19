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
    emoteToggle: PropTypes.func,
    postMove: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { players } = this.props;
    const highestBid = Math.max(...players.map(player => player.bid)) || 1;
    
    const totalPlayed = players.reduce(((acc, cur) => acc + cur.played.length), 0);
    this.setState({
      minBid: highestBid,
      bid: highestBid,
      maxBid: totalPlayed
    });
    
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
    const { toggle, phase, emoteToggle } = this.props;
    const { bid, minBid, maxBid } = this.state;

    
  
    switch(phase) {
      case 1:
        return (
          <div className="bids">
            <i onClick={toggle} className="fas fa-times"></i>
            {bid <= minBid ? 
              <i className="fa fa-minus"></i>
              : <i className="fa fa-minus" onClick={this.handleDecrement}></i>
            }
            <p>{bid}</p>
            {bid >= maxBid ?
              <i className="fa fa-plus"></i>
              : <i className="fa fa-plus" onClick={this.handleIncrement}></i>
            }
            <button onClick={this.handleBid}>Bid</button>
          </div>
        );
      case 2:
        return (
          <div className="bids">
            <button onClick={emoteToggle}>Emote</button>
            <button>Pass</button>
            {bid <= 1 ? 
              <i className="fa fa-minus"></i>
              : <i className="fa fa-minus" onClick={this.handleDecrement}></i>
            }
            <p>{bid}</p>
            {bid >= 8 ?
              <i className="fa fa-plus"></i>
              : <i className="fa fa-plus" onClick={this.handleIncrement}></i>
            }
            <button>Bid</button>
          </div>
        );
      case 3:
        return (
          <div className="bids">
            <button onClick={emoteToggle}>Emote</button>
            <h4>Flip {bid} squirrels</h4>
          </div>
        );
      default:
        return (
          <div className="bids">
            <h6>The game is not happening right now!</h6>
          </div>
        );
    }
  }
}

export default Bids;