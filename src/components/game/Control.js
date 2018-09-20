import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import Card from './Card';
import Bids from './ControlBids';
import Emotes from './ControlEmotes';
import styles from './Control.css';

class Control extends PureComponent {
  state = {
    emoting: false,
    bidding: false,
    processing: false,
  };

  static propTypes = {
    game: PropTypes.object.isRequired,
    hand: PropTypes.array.isRequired,
    user: PropTypes.object,
    postCard: PropTypes.func,
    postBid: PropTypes.func
  };

  componentDidUpdate() {
    const { bidding } = this.state;
    const { game } = this.props;
    if(!bidding && game.phase === 2) this.setState({ bidding: true });
    
  }

  toggleEmoting = () => {
    this.setState(({ emoting }) => ({ emoting: !emoting }));
  };

  toggleBidding = () => {
    this.setState(({ bidding }) => ({ bidding: !bidding }));
  };

  toggleProcessing = () => {
    this.setState(({ processing }) => ({ processing: !processing }));
  };

  render() { 
    const { emoting, bidding, processing } = this.state;
    const { hand, game, user, postCard, postBid } = this.props;
    const { phase, turn, players, challenger } = game;
    const uid = user.profile._id;
    
    const isTurn = turn === uid;
    
    return (
      <section className={styles.control}>

        {emoting
          ? <Emotes toggle={this.toggleEmoting}/>
          : <Fragment>
            <button onClick={this.toggleEmoting}>Emote</button>
            {phase > 2
              ? <section>
                {challenger.userId === uid &&
                  <p>Flip {challenger.bid} squirrels!</p>
                }
              </section>
              : <Fragment>
                {(bidding && isTurn)
                  ? <Bids 
                    toggle={this.toggleBidding}
                    players={players}
                    challenger={challenger}
                    phase={phase}
                    postBid={postBid}
                  />
                  : <Fragment>
                    {phase === 1 && !bidding && isTurn && hand.filter(card => card.order > 0).length > 0 && <button onClick={this.toggleBidding}>Bid</button>}
                    <div className={isTurn ? null : 'disabled'}>
                      {hand
                        .filter(card => card.order === 0)
                        .map((card, i) => (
                          <Card 
                            
                            key={i} 
                            card={card}
                            postMove={isTurn ? postCard : null}
                            setProcessing={this.toggleProcessing}
                          />
                        ))
                      }
                    </div>
                  </Fragment>
                }
              </Fragment>
            }
          </Fragment> 
        }
        
      </section>
    );
    

      
  }
}
 
export default connect(
  state => ({
    user: getUser(state),
  }),
  null
)(Control);


 
