const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();

const queue2Ref = db.ref('queue2');
const queue3Ref = db.ref('queue3');
const queue4Ref = db.ref('queue4');

const gamesRef = db.ref('games');
const handsRef = db.ref('hands');
const timerRef = db.ref('timer');


// TURN TIMER SET TO 10 SECONDS
timerRef.child('timeInMs').set(10000);

exports.myCloudTimer = functions.database.ref('/startTimerRequest/{gameId}').onCreate((snapshot, context) => {
  const { gameId } = context.params;
  return db.ref('timer/timeInMs').once('value', snap => {
      if (!snap.exists()) {
          return Promise.reject(Error('time is not defined in the database.'));
      }

      let timeInSeconds = snap.val() / 1000;
      console.log('Cloud Timer was Started: ' + timeInSeconds);

      return functionTimer(timeInSeconds,
          elapsedTime => {
              db.ref('cloudTimer').child(gameId).set(elapsedTime);
          })
          .then(totalTime => {
              console.log('Timer of ' + totalTime + ' has finished.');
              return new Promise(resolve => setTimeout(resolve, 1000));
          })
          .then(() => snapshot.ref.remove())
          .catch(error => console.error(error));
  });
});

function functionTimer (seconds, call) {
  return new Promise((resolve, reject) => {
      if (seconds > 300) {
          reject(Error('execution would take too long...'));
          return;
      }
      let interval = setInterval(onInterval, 1000);
      let elapsedSeconds = 0;

      function onInterval () {
          if (elapsedSeconds >= seconds) {
              clearInterval(interval);
              call(0);
              resolve(elapsedSeconds);
              return;
          }
          call(seconds - elapsedSeconds);
          elapsedSeconds++;
      }
  });
}

// Fisher-Yates Shuffle algorithm
const shuffle = players => {
  let currentIndex = players.length, tempValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = players[currentIndex];
    players[currentIndex] = players[randomIndex];
    players[randomIndex] = tempValue;
  }
  return players;
};

const hand = [
  { type: 1, order: 0 },
  { type: 1, order: 0 },
  { type: 1, order: 0 },
  { type: 0, order: 0 }
];

const createNewGame = (users, queue) => {
  const players = users.map(user => {
    return {
      userId: user,
      name: queue[user].name,
      emote: queue[user].greeting,
      avatar: queue[user].avatar,
      wins: 0,
      hand: 4,
      bid: 0
    };
  });

  return {
    players,
    phase: 0,
    challenger: null
  };
};


exports.playerQueue2 = functions.database.ref('/queue2/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;

  return queue2Ref.once('value')
    .then(snapshot => {
      const queue = snapshot.val();
      if(Object.keys(queue).length < 2) return null;

      const [opponent] = Object.keys(queue)
        .filter(key => key !== uid);

      const newGameRef = gamesRef.push();

      const players = shuffle([uid, opponent]);
      const newGame = createNewGame(players, queue);

      const gameId = newGameRef.key;
      const startingState = { gameId, hand };

      return Promise.all([
        newGameRef.set(newGame),
        queue2Ref.child(uid).remove(),
        queue2Ref.child(opponent).remove(),
        queue3Ref.child(uid).remove(),
        queue3Ref.child(opponent).remove(),
        queue4Ref.child(uid).remove(),
        queue4Ref.child(opponent).remove(),
        handsRef.child(uid).set(startingState),
        handsRef.child(opponent).set(startingState)
      ]);
    });
});

exports.playerQueue3 = functions.database.ref('/queue3/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;

  return queue3Ref.once('value')
    .then(snapshot => {
      const queue = snapshot.val();
      if(Object.keys(queue).length < 3) return null;

      const [opponent1, opponent2] = Object.keys(queue)
        .filter(key => key !== uid);

        const newGameRef = gamesRef.push();

        const players = shuffle([uid, opponent1, opponent2]);
        const newGame = createNewGame(players, queue);

        const gameId = newGameRef.key;
        const startingState = { gameId, hand };

        return Promise.all([
          newGameRef.set(newGame),
          queue2Ref.child(uid).remove(),
          queue2Ref.child(opponent1).remove(),
          queue2Ref.child(opponent2).remove(),
          queue3Ref.child(uid).remove(),
          queue3Ref.child(opponent1).remove(),
          queue3Ref.child(opponent2).remove(),
          queue4Ref.child(uid).remove(),
          queue4Ref.child(opponent1).remove(),
          queue4Ref.child(opponent2).remove(),
          handsRef.child(uid).set(startingState),
          handsRef.child(opponent1).set(startingState),
          handsRef.child(opponent2).set(startingState)
        ]);
    });
});

exports.playerQueue4 = functions.database.ref('/queue4/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;

  return queue4Ref.once('value')
    .then(snapshot => {
      const queue = snapshot.val();
      if(Object.keys(queue).length < 4) return null;

      const [opponent1, opponent2, opponent3] = Object.keys(queue)
        .filter(key => key !== uid);

      const newGameRef = gamesRef.push();

      const players = shuffle([uid, opponent1, opponent2, opponent3]);
      const newGame = createNewGame(players, queue);

      const gameId = newGameRef.key;
      const startingState = { gameId, hand };

      return Promise.all([
        newGameRef.set(newGame),
        queue2Ref.child(uid).remove(),
        queue2Ref.child(opponent1).remove(),
        queue2Ref.child(opponent2).remove(),
        queue2Ref.child(opponent3).remove(),
        queue3Ref.child(uid).remove(),
        queue3Ref.child(opponent1).remove(),
        queue3Ref.child(opponent2).remove(),
        queue3Ref.child(opponent3).remove(),
        queue4Ref.child(uid).remove(),
        queue4Ref.child(opponent1).remove(),
        queue4Ref.child(opponent2).remove(),
        queue4Ref.child(opponent3).remove(),
        handsRef.child(uid).set(startingState),
        handsRef.child(opponent1).set(startingState),
        handsRef.child(opponent2).set(startingState),
        handsRef.child(opponent3).set(startingState)
      ]);
    });
});


// USERS POSTING MOVES
exports.cardMove = functions.database.ref('/cardMove/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;
  const move = snapshot.val();
  const { gameId } = move;
  const userMoveRef = snapshot.ref.parent;
  const playerHandRef = handsRef.child(uid).child('hand');

  return gamesRef.child(gameId).once('value')
    .then(snapshot => {
      const game = snapshot.val();
      // Prevent out of turn Plays
      if(game.turn !== uid) return userMoveRef.child(uid).remove();

      // Clear timers
      db.ref('startTimerRequest').child(gameId).remove();
      db.ref('timer').child(gameId).remove();
  

      return playerHandRef.once('value');
    })
    .then(snapshot => {
      const hand = snapshot.val();
      const card = hand.find(card => card.type === move.type && card.order === 0);
      if(card) card.order = 1 + hand.filter(card => card.order > 0).length;

      return Promise.all([
        playerHandRef.set(hand),
        userMoveRef.remove()
      ]);
    });
});

exports.bidMove = functions.database.ref('/bidMove/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;
  const move = snapshot.val();
  const { gameId } = move;
  const userMoveRef = snapshot.ref.parent;

  return gamesRef.child(gameId).once('value')
    .then(snapshot => {
      const game = snapshot.val();
      // Prevent out of turn Plays
      if(game.turn !== uid) return userMoveRef.child(uid).remove();

      // Clear timers
      db.ref('startTimerRequest').child(gameId).remove();
      db.ref('timer').child(gameId).remove();

      const { players } = game;
      const currentPlayer = players.find(player => player.userId === uid);
      currentPlayer.bid = move.bid;

      const newChallenger = {
        userId: uid,
        bid: move.bid
      };

      if(game.challenger) {
        game.challenger = move.bid > game.challenger.bid ? newChallenger : game.challenger;
      }
      else game.challenger = newChallenger;

      const totalPlayedCards = players.reduce(((acc, cur) => acc + cur.played.length), 0);

      if(move.bid === totalPlayedCards) game.phase = 3;
      else {
        let nextPlayerIndex = (players.indexOf(currentPlayer) + 1) % players.length;

        while(players[nextPlayerIndex].bid < 0) {
          nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
        }

        game.turn = players[nextPlayerIndex].userId;

        if(game.phase === 1) game.phase = 2;
        else if(game.phase === 2 && game.challenger.userId === game.turn) game.phase = 3;
      }

      return Promise.all([
        gamesRef.child(gameId).set(game),
        userMoveRef.child(uid).remove()
    ]);
  });
});

exports.flipMove = functions.database.ref('/flipMove/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;
  const move = snapshot.val();
  const { gameId } = move;
  const userMoveRef = snapshot.ref.parent;
  const playerHandRef = handsRef.child(move.playerId).child('hand');
  let game;
  return gamesRef.child(gameId).once('value')
    .then(snapshot => {
      game = snapshot.val();
      // Prevent out of turn Plays
      if(game.turn !== uid) return userMoveRef.child(uid).remove();

      // Clear timers
      db.ref('startTimerRequest').child(gameId).remove();
      db.ref('timer').child(gameId).remove();

      return playerHandRef.once('value');
    })
    .then(snapshot => {
      const hand = snapshot.val();
      const { type } = hand.find(card => card.order === move.order);
      const player = game.players.find(player => player.userId === move.playerId);
      const selectedCard = player.played.find(card => card.order === move.order);


      selectedCard.type = type;
      

      return Promise.all([
        gamesRef.child(gameId).set(game),
        userMoveRef.child(uid).remove()
      ]);
    });
});

exports.evaluateFlip = functions.database.ref('/games/{gameId}/players/{playerIndex}/played/{cardIndex}/type').onCreate((snapshot, context) => {
  const { gameId, playerIndex, cardIndex } = context.params;

  const type = snapshot.val();
  let game, currentPlayer, currentPlayerHandRef;
  return gamesRef.child(gameId).once('value')
    .then(snapshot => {
      game = snapshot.val();
      const { players, challenger } = game;
      currentPlayer = players.find(player => player.userId === challenger.userId);
      currentPlayerHandRef = handsRef.child(currentPlayer.userId).child('hand');
      return currentPlayerHandRef.once('value');
    })
    .then(snapshot => {
      const hand = snapshot.val();

      if(type === 1) {
        currentPlayer.bid--;
        game.challenger.bid = currentPlayer.bid;

        if(currentPlayer.bid === 0) currentPlayer.wins++;
        return gamesRef.child(gameId).set(game);
      }

      if(type === 0) {
        delete hand[Math.floor(Math.random() * hand.length)];
        return currentPlayerHandRef.set(hand);
      }

      return null;
    });

      
      
});


  

  




exports.moveToPhase1 = functions.database.ref('/games/{gameId}').onCreate((snapshot, context) => {
  const { gameId } = context.params;

  setTimeout(() => {
    return gamesRef.child(gameId).once('value').then(snapshot => {
      const game = snapshot.val();
      const firstPlayer = game.players[0].userId;
      return Promise.all([
        gamesRef.child(gameId).child('phase').set(1),
        gamesRef.child(gameId).child('turn').set(firstPlayer)
      ]);
    });
  }, 3000);
});



exports.updateGame = functions.database.ref('/hands/{uid}').onUpdate((change, context) => {
  const { uid } = context.params;
  const userState = change.after.val();
  const previousState = change.before.val();
  console.log('before', previousState);
  console.log('after', userState);
  if(userState.hand.length !== previousState.hand.length) return null;

  const { gameId, hand } = userState;
  const playedCard = hand.sort((a, b) => b.order - a.order)[0];
  delete playedCard.type;

  return gamesRef.child(gameId).once('value').then(snapshot => {
    const game = snapshot.val();
    if(game) {
      const { players } = game;
      const currentPlayer = players.find(player => player.userId === uid);

      if(currentPlayer) {
        let played = currentPlayer.played;
        if(played) played.push(playedCard);
        else currentPlayer.played = [playedCard];
        currentPlayer.hand = hand.length - currentPlayer.played.length;
      }

      const nextPlayerIndex = (players.indexOf(currentPlayer) + 1) % players.length;
      game.turn = players[nextPlayerIndex].userId;

      return Promise.all([
        gamesRef.child(gameId).set(game),
      ]);
    }
  
    return null;
  });

});

exports.snakeAttack = functions.database.ref('/hands/{uid}/hand/{index}').onDelete((snapshot, context) => {
  const { uid } = context.params;
  const playerHandRef = snapshot.ref.parent.parent;
  let hand;
  return handsRef.child(uid).once('value')
    .then(snapshot => {
      const playerState = snapshot.val();

      // GUARD CLAUSE FOR GAME END
      if(!playerState) return null;

      const { gameId } = playerState;
      hand = playerState.hand;
      return gamesRef.child(gameId).once('value');
    })
    .then(snapshot => {
      const game = snapshot.val();
      const loser = game.players.find(player => player.userId === uid);
      const loserIndex = game.players.indexOf(loser);
      loser.hand--;
      if(!hand) {
        delete game.players[loserIndex];
      }
      game.phase = 1;
      game.players.forEach(player => {
        player.hand = player.hand + played.length;
        delete player.played;
      });
      game.challenger = null;
      return gamesRef.child(gameId).set(game);
    });
});


// ON TURN CHANGE, START A TURN TIMER
exports.firstTurnTimer = functions.database.ref('/games/{gameId}/turn').onCreate((snapshot, context) => {
  const { gameId } = context.params;
  return db.ref('startTimerRequest').set({ [gameId]: true });
});

exports.turnTimer = functions.database.ref('/games/{gameId}/turn').onUpdate((snapshot, context) => {
  const { gameId } = context.params;
  return db.ref('startTimerRequest').set({ [gameId]: true });
});