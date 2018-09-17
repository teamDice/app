const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();
const playersRef = db.ref('players');
const gamesRef = db.ref('games');
const movesRef = db.ref('moves');
const userGamesRef = db.ref('userGames');

exports.playerQueue = functions.database.ref('/players/{uid}').onCreate((snapshot, context) => {
  const { uid } = context.params;

  return playersRef.once('value')
    .then(snapshot => {
      const [player] = Object.keys(snapshot.val())
        .filter(key => key !== uid);

        if(!player) return null;

        const newGameRef = gamesRef.push();

        return Promise.all([
          newGameRef.set({ 
            [uid]: {
              troops: 10,
              wins: 0
            }, 
            [player]: {
              troops: 10,
              wins: 0
            } 
          }),
          playersRef.child(uid).remove(),
          playersRef.child(player).remove(),
          userGamesRef.child(uid).child(newGameRef.key).set(true),
          userGamesRef.child(player).child(newGameRef.key).set(true)
        ]);
    });
});

exports.moveQueue = functions.database.ref('/moves/{gameKey}/{uid}').onCreate((snapshot, context) => {

  const { gameKey } = context.params;

  const gameMovesRef = movesRef.child(gameKey);

  return gameMovesRef.once('value')
    .then(snapshot => {
      
      const game = snapshot.val();
      const moves = Object.keys(game)
        .map(key => ({
          uid: key,
          play: game[key]
        }));
      if(moves.length < 2) return null;

      
      const gameRef = gamesRef.child(gameKey);

      return Promise.all([
        gameMovesRef.remove(),
        gameRef.update({
          moves: moves
        })
      ]);
    });
});



exports.gameLogic = functions.database.ref('/games/{gameKey}/moves').onCreate((snapshot, context) => {
  const { gameKey } = context.params;

  const gameRef = gamesRef.child(gameKey);

  return gameRef.once('value')
    .then(snapshot => {
      const game = snapshot.val();
      const player1 = game.moves[0];
      const player2 = game.moves[1];
      
      const winnerId = calculateWinner(game.moves);
      if(winnerId) {
        game[winnerId].wins++;

        game[player1.uid].troops -= player1.play;
        game[player2.uid].troops -= player2.play;

      }
      
      delete game.moves;
      return Promise.all([
        gameRef.set(game)
      ]);
    });      
});

exports.endGame = functions.database.ref('/moves/{gameKey}').onCreate((snapshot, context) => {

  const { gameKey } = context.params;

  const gameRef = gamesRef.child(gameKey);

  return gameRef.on('value', snapshot => {
      const game = snapshot.val();
      const [ player1, player2 ] = Object.keys(game);
      
      if(game[player1].wins < 2 && game[player2].wins < 2) return;

      const winner = game[player1].wins === 2 ? player1 : player2;
      
      gameRef.off('value');
      return Promise.all([
        gameRef.child('winner').set(winner),
        userGamesRef.child(player1).remove(),
        userGamesRef.child(player2).remove(),
      ]);
  });
});

const calculateWinner = ([a, b]) => {

  // Refund if tie;
  if(a.play === b.play) return null;

  // Undercutter wins;
  const limit = 3;
  if(b.play - a.play > limit) return a.uid;
  if(a.play - b.play > limit) return b.uid;

  // High number wins;
  return a.play > b.play ? a.uid : b.uid;
};