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

const startingHand = [
  {
    type: 1,
    order: 0,
  },
  {
    type: 1,
    order: 0,
  },
  {
    type: 1,
    order: 0,
  },
  {
    type: 0,
    order: 0,
  },
];

exports.playerQueue2 = functions.database.ref('/queue2/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;

  return queue2Ref.once('value')
    .then(snapshot => {
      if(Object.keys(snapshot.val()) < 2) return null;

      const [opponent] = Object.keys(snapshot.val())
        .filter(key => key !== uid);

      const newGameRef = gamesRef.push();

      const players = shuffle([uid, opponent]);
      const firstPlayer = players[0];

      return Promise.all([
        newGameRef.set({ 
          players,
          turn: players[0],
          phase: 0
        }),
        queue2Ref.child(uid).remove(),
        queue2Ref.child(opponent).remove(),
        queue3Ref.child(uid).remove(),
        queue3Ref.child(opponent).remove(),
        queue4Ref.child(uid).remove(),
        queue4Ref.child(opponent).remove(),
        handsRef.child(uid).set(startingHand),
        handsRef.child(opponent).set(startingHand)
      ]);
    });
});

exports.playerQueue3 = functions.database.ref('/queue3/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;

  return queue3Ref.once('value')
    .then(snapshot => {
      if(Object.keys(snapshot.val()) < 3) return null;

      const [opponent1, opponent2] = Object.keys(snapshot.val())
        .filter(key => key !== uid);

        const newGameRef = gamesRef.push();

        const players = shuffle([uid, opponent1, opponent2]);
        const firstPlayer = players[0];

        return Promise.all([
          newGameRef.set({ 
            players,
            turn: firstPlayer,
            phase: 0
          }),
          queue2Ref.child(uid).remove(),
          queue2Ref.child(opponent1).remove(),
          queue2Ref.child(opponent2).remove(),
          queue3Ref.child(uid).remove(),
          queue3Ref.child(opponent1).remove(),
          queue3Ref.child(opponent2).remove(),
          queue4Ref.child(uid).remove(),
          queue4Ref.child(opponent1).remove(),
          queue4Ref.child(opponent2).remove(),
          handsRef.child(uid).set(startingHand),
          handsRef.child(opponent1).set(startingHand),
          handsRef.child(opponent2).set(startingHand)
        ]);
    });
});

exports.playerQueue4 = functions.database.ref('/queue4/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;

  return queue4Ref.once('value')
    .then(snapshot => {
      if(Object.keys(snapshot.val()) < 4) return null;

      const [opponent1, opponent2, opponent3] = Object.keys(snapshot.val())
        .filter(key => key !== uid);

      const newGameRef = gamesRef.push();

      const players = shuffle([uid, opponent1, opponent2, opponent3]);
      const firstPlayer = players[0];

      return Promise.all([
        newGameRef.set({ 
          players,
          turn: firstPlayer,
          phase: 0
        }),
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
        handsRef.child(uid).set(startingHand),
        handsRef.child(opponent1).set(startingHand),
        handsRef.child(opponent2).set(startingHand),
        handsRef.child(opponent3).set(startingHand)
      ]);
    });
});

// exports.moveQueue = functions.database.ref('/moves/{gameKey}/{uid}').onCreate((snapshot, context) => {

//   const { gameKey } = context.params;

//   const gameMovesRef = movesRef.child(gameKey);

//   return gameMovesRef.once('value')
//     .then(snapshot => {
      
//       const game = snapshot.val();
//       const moves = Object.keys(game)
//         .map(key => ({
//           uid: key,
//           play: game[key]
//         }));
//       if(moves.length < 2) return null;

      
//       const gameRef = gamesRef.child(gameKey);

//       return Promise.all([
//         gameMovesRef.remove(),
//         gameRef.update({
//           moves: moves
//         })
//       ]);
//     });
// });



// exports.gameLogic = functions.database.ref('/games/{gameKey}/moves').onCreate((snapshot, context) => {
//   const { gameKey } = context.params;

//   const gameRef = gamesRef.child(gameKey);

//   return gameRef.once('value')
//     .then(snapshot => {
//       const game = snapshot.val();
//       const player1 = game.moves[0];
//       const player2 = game.moves[1];
      
//       const winnerId = calculateWinner(game.moves);
//       if(winnerId) {
//         game[winnerId].wins++;

//         game[player1.uid].troops -= player1.play;
//         game[player2.uid].troops -= player2.play;

//       }
      
//       delete game.moves;
//       return Promise.all([
//         gameRef.set(game)
//       ]);
//     });      
// });

// exports.endGame = functions.database.ref('/moves/{gameKey}').onCreate((snapshot, context) => {

//   const { gameKey } = context.params;

//   const gameRef = gamesRef.child(gameKey);

//   return gameRef.on('value', snapshot => {
//       const game = snapshot.val();
//       const [ player1, player2 ] = Object.keys(game);
      
//       if(game[player1].wins < 2 && game[player2].wins < 2) return;

//       const winner = game[player1].wins === 2 ? player1 : player2;
      
//       gameRef.off('value');
//       return Promise.all([
//         gameRef.child('winner').set(winner),
//         userGamesRef.child(player1).remove(),
//         userGamesRef.child(player2).remove(),
//       ]);
//   });
// });

// const calculateWinner = ([a, b]) => {

//   // Refund if tie;
//   if(a.play === b.play) return null;

//   // Undercutter wins;
//   const limit = 3;
//   if(b.play - a.play > limit) return a.uid;
//   if(a.play - b.play > limit) return b.uid;

//   // High number wins;
//   return a.play > b.play ? a.uid : b.uid;
// };