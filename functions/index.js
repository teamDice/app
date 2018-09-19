const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();

const queue2Ref = db.ref('queue2');
const queue3Ref = db.ref('queue3');
const queue4Ref = db.ref('queue4');

const gamesRef = db.ref('games');
const movesRef = db.ref('moves');
const handsRef = db.ref('hands');
const timerRef = db.ref('timer');


// TURN TIMER SET TO 5 SECONDS
timerRef.child('timeInMs').set(5000);

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
      bid: null
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
      if(Object.keys(queue) < 2) return null;

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
      if(Object.keys(queue) < 3) return null;

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
      if(Object.keys(queue) < 4) return null;

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
exports.moves = functions.database.ref('/moves/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;
  const move = snapshot.val();
  const { gameId } = move;


  db.ref('startTimerRequest').child(gameId).remove();
  db.ref('timer').child(gameId).remove();

  const userMoveRef = snapshot.ref.parent;
  const playerHandRef = handsRef.child(uid).child('hand');

  if(move.type === 0 || move.type === 1) {
    return playerHandRef.once('value').then(snapshot => {
      const hand = snapshot.val();
      const card = hand.find(card => card.type === move.type && card.order === 0);
      if(card) card.order = 1 + hand.filter(card => card.order > 0).length;

      return Promise.all([
        playerHandRef.set(hand),
        userMoveRef.remove()
      ]);
    });
  }


  if(move.bid) {  
    return gamesRef.child(move.gameId).once('value').then(snapshot => {
      const game = snapshot.val();
        if(game) {
          const { players } = game;
          const currentPlayer = players.find(player => player.userId === uid);
          currentPlayer.bid = move.bid;

          let { challenger } = game;
          const newChallenger = {
            userId: currentPlayer.userId,
            bid: currentPlayer.bid
          };
          if(challenger) {
            challenger = newChallenger.bid > challenger.bid ? newChallenger : challenger;
          }
          else game.challenger = newChallenger;

          const nextPlayerIndex = (players.indexOf(currentPlayer) + 1) % players.length;
          game.turn = players[nextPlayerIndex].userId;

          if(game.phase === 1) game.phase++;
        }

      return Promise.all([
        gamesRef.child(move.gameId).set(game),
        userMoveRef.remove()
      ]);
    });
  }

  return null;
  
});

exports.moveToPhase1 = functions.database.ref('/games/{gameId}').onCreate((snapshot, context) => {
  const { gameId } = context.params;

  setTimeout(() => {
    return gamesRef.child(gameId).once('value').then(snapshot => {
      const { players } = snapshot.val();
      return Promise.all([
        gamesRef.child(gameId).child('phase').set(1),
        gamesRef.child(gameId).child('turn').set(players[0].userId)
      ]);
    });
  }, 5000);
});

exports.updateGame = functions.database.ref('/hands/{uid}').onUpdate((change, context) => {
  const { uid } = context.params;
  const userState = change.after.val();
  console.log('*** STATE ***', userState);
  const { gameId, hand } = userState;
  console.log(gameId, hand);
  const playedCard = hand.sort((a, b) => b.order - a.order)[0];


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


// ON TURN CHANGE, START A TURN TIMER
exports.firstTurnTimer = functions.database.ref('/games/{gameId}/turn').onCreate((snapshot, context) => {
  const { gameId } = context.params;
  return db.ref('startTimerRequest').set({ [gameId]: true });
});

exports.turnTimer = functions.database.ref('/games/{gameId}/turn').onUpdate((snapshot, context) => {
  const { gameId } = context.params;
  return db.ref('startTimerRequest').set({ [gameId]: true });
});