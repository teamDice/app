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
    postMove: PropTypes.func
  };

  componentDidUpdate() {
    const { bidding } = this.state;
    const { game } = this.props;
    if(bidding || game.phase !== 2) return;
    this.setState({ bidding: true });
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
    const { hand, game, user, postMove } = this.props;
    const { phase, turn, players } = game;
    const uid = user.profile._id;
    
    const isChallenger = game.challenger === uid;
    const isTurn = turn === uid;

    // if(user.profile._id !== turn) {
    //   return (
    //     <section className={styles.control}>
    //       {emoting && <Emotes toggle={this.toggleEmoting}/>}
    //       {!emoting &&
    //       <Fragment>
    //         <div>
    //           <button onClick={this.toggleEmoting}>Emote</button>
    //         </div>
    //         <div className="disabled">
    //           {hand.filter(card => card.order === 0).map((card, i) => (
    //             <Card key={i} card={card}/>
    //           ))}
    //         </div>
    //       </Fragment>
    //       }
    //     </section>
    //   );
    // }

    if(phase === 3) {
      return (
        <section className={styles.control}>
          {emoting && <Emotes toggle={this.toggleEmoting}/>}
          {!emoting && isChallenger &&
            <p>Flip {game.challenger.bid} squirrels!</p>
          }
        </section>
      );
    }
    
    return (
      <section className={styles.control}>

        {emoting
          ? <Emotes toggle={this.toggleEmoting}/>
          : <Fragment>
            <button onClick={this.toggleEmoting}>Emote</button>
            {phase > 2
              ? <section>
                {isChallenger &&
                  <p>Flip {game.challenger.bid} squirrels!</p>
                }
              </section>
              : <Fragment>
                {(bidding && isTurn)
                  ? <Bids 
                    toggle={this.toggleBidding}
                    players={players}
                    phase={phase}
                    postMove={postMove}
                  />
                  : <Fragment>
                    {phase === 1 && !bidding && isTurn && <button onClick={this.toggleBidding}>Bid</button>}
                    <div className="hand">
                      {hand
                        .filter(card => card.order === 0)
                        .map((card, i) => (
                          <Card 
                            className={isTurn ? null : 'disabled'} 
                            key={i} 
                            card={card}
                            postMove={postMove}
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


 
