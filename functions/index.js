const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();

const queue2Ref = db.ref('queue2');
const queue3Ref = db.ref('queue3');
const queue4Ref = db.ref('queue4');

const gameQueueRef = db.ref('gameQueue');

const gamesRef = db.ref('games');
const handsRef = db.ref('hands');
const stackRef = db.ref('stack');

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

const createQueue2Remove = id => {
  return function queue2Remove() {
    return queue2Ref.child(id).remove();
  };
};
const createQueue3Remove = id => {
  return function queue3Remove() {
    return queue3Ref.child(id).remove();
  };
};
const createQueue4Remove = id => {
  return function queue4Remove() {
    return queue4Ref.child(id).remove();
  };
};

const createStartingStateSet = (gameId, id) => {
  return function startingStateSet() {
    return handsRef.child(id).set({ gameId, hand });
  };
};

const newGameFuncs = (gameId, ids) => ids.map(id => {
  return [
    createQueue2Remove(id)(),
    createQueue3Remove(id)(),
    createQueue4Remove(id)(),
    createStartingStateSet(gameId, id)()
  ];
});

exports.gameQueue = functions.database.ref('gameQueues/{numberOfPlayers}/{uid}').onCreate((snapshot, context) => {
  const { numberOfPlayers, uid } = context.params;
  const queueRef = gameQueueRef.child(numberOfPlayers);
  return queueRef.once('value')
    .then(snapshot => {
      const queue = snapshot.val();
      const playerIds = Object.keys(queue);

      if(playerIds.length < numberOfPlayers) return null;

      const newGameRef = gamesRef.push();

      const players = shuffle(playerIds);
      const newGame = createNewGame(players, queue);

      const gameId = newGameRef.key;

      return Promise.all([
        newGameRef.set(newGame),
        ...newGameFuncs(gameId, players)
      ]);
    });
});

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

      return Promise.all([
        newGameRef.set(newGame),
        ...newGameFuncs(gameId, players)
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

        return Promise.all([
          newGameRef.set(newGame),
          ...newGameFuncs(gameId, players)
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

      return Promise.all([
        newGameRef.set(newGame),
        ...newGameFuncs(gameId, players)
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

      return playerHandRef.once('value');
    })
    .then(snapshot => {
      const hand = snapshot.val();
      console.log('*** HAND ***', hand);
      const card = hand.find(card => card.type === move.type && card.order === 0 && !card.removed);
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

      const totalPlayedCards = players.reduce(((acc, cur) => {
        const played = cur.played ? cur.played.length : 0;
        return acc + played;
      }), 0);

      if(move.bid === totalPlayedCards) game.phase = 3;
      else {
        let nextPlayerIndex = (players.indexOf(currentPlayer) + 1) % players.length;

        while(players[nextPlayerIndex].bid < 0 || players[nextPlayerIndex].loser === true) {
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

      return playerHandRef.once('value');
    })
    .then(snapshot => {
      const hand = snapshot.val();
      const { type } = hand.find(card => card.order === move.order);
      const player = game.players.find(player => player.userId === move.playerId);
      const playerIndex = game.players.indexOf(player);

      const selectedCard = player.played.find(card => card.order === move.order);
      const cardIndex = player.played.indexOf(selectedCard);

      selectedCard.type = type;
      

      return Promise.all([
        gamesRef.child(gameId).child('players').child(playerIndex).child('played').child(cardIndex).set(selectedCard),
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
        const newHand = hand.filter(card => !card.removed);
        const randomIndex = Math.floor(Math.random() * newHand.length);
        newHand[randomIndex].removed = true;

        console.log('*** HAND ***', hand);
        
        return currentPlayerHandRef.set(hand);
      }

      return null;
    });  
});

exports.onWin = functions.database.ref('/games/{gameId}/players/{playerIndex}/wins').onUpdate((change, context) => {
  const wins = change.after.val();
  const { gameId, playerIndex } = context.params;

  return gamesRef.child(gameId).once('value')
    .then(snapshot => {
      const game = snapshot.val();
      if(wins === 2) {
        game.winner = game.challenger.userId;
        game.phase = 4;

      }
      else {
        game.phase = 1;
        game.players.forEach(player => {
          player.hand = player.hand + player.played.length;
          delete player.played;
          player.bid = 0;
        });
        game.challenger = null;

      }
      
      return gamesRef.child(gameId).set(game);
    });
});
  



exports.moveToPhase1 = functions.database.ref('/games/{gameId}').onCreate((snapshot, context) => {
  const { gameId } = context.params;
  const game = snapshot.val();
  game.turn = game.players[0].userId;
  game.phase = 1;
  return gamesRef.child(gameId).set(game);

});



exports.updateGame = functions.database.ref('/hands/{uid}/hand/{index}/order').onUpdate((change, context) => {
  const { uid, index } = context.params;
  const oldOrder = change.before.val();
  const order = change.after.val();
  console.log('*** OLD ORDER ***', oldOrder);
  console.log('*** NEW ORDER ***', order);

  if(order === 0 || !order) return null;

  let gameId, hand;
  return handsRef.child(uid).once('value')
    .then(snapshot => {
      const state = snapshot.val();
      if(!state) return null;
      hand = state.hand;

      console.log('*** HAND ***', hand);

      gameId = state.gameId;
      return gamesRef.child(gameId).once('value');
    })
    .then(snapshot => {
      const game = snapshot.val();
      if(!game) return null;

      console.log('*** GAME ***', game);

      const { players } = game;
      const currentPlayer = players.find(player => player.userId === uid);

      if(!currentPlayer) return null;

      const playedCard = { order };
      let played = currentPlayer.played;
      if(played) played.push(playedCard);
      else currentPlayer.played = [playedCard];
      currentPlayer.hand = hand.filter(card => !card.removed).length - currentPlayer.played.length;
      
      let nextPlayerIndex = (players.indexOf(currentPlayer) + 1) % players.length;

      while(players[nextPlayerIndex].loser === true) {
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
      }

      game.turn = players[nextPlayerIndex].userId;

      return gamesRef.child(gameId).set(game);
    });

});

exports.snakeAttack = functions.database.ref('/hands/{uid}/hand/{index}/removed').onCreate((snapshot, context) => {
  const { uid } = context.params;
  const playerHandRef = snapshot.ref.parent.parent;
  let hand, gameId;
  return handsRef.child(uid).once('value')
    .then(snapshot => {
      const playerState = snapshot.val();

      // GUARD CLAUSE FOR GAME END
      if(!playerState) return null;

      gameId = playerState.gameId;
      hand = playerState.hand;
      return gamesRef.child(gameId).once('value');
    })
    .then(snapshot => {
      const game = snapshot.val();
      const { players } = game;
      const loser = players.find(player => player.userId === uid);
      loser.hand--;

      // CHECK IF PLAYER LOST ALL THEIR CARDS
      if(hand.filter(card => !card.removed).length === 0) {
        loser.loser = true;

        // ADVANCE TURN TO NEXT NOT-LOSER
        let nextPlayerIndex = (players.indexOf(loser) + 1) % players.length;

        while(players[nextPlayerIndex].loser === true) {
          nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
        }

        game.turn = players[nextPlayerIndex].userId;
      }

      game.phase = 1;
      players.forEach(player => {
        player.hand = player.hand + player.played.length;
        delete player.played;
        player.bid = 0;
      });
      game.challenger = null;
      return gamesRef.child(gameId).set(game);
    });
});

exports.handReset = functions.database.ref('/games/{gameId}/players/{playerIndex}/played').onDelete((change, context) => {
  const { gameId, playerIndex } = context.params;
  let uid;
  return gamesRef.child(gameId).child('players').once('value')
    .then(snapshot => {
      const players = snapshot.val();
      if(!players) return null;
      uid = players[playerIndex].userId;
      return handsRef.child(uid).child('hand').once('value');
    })
    .then(snapshot => {
      const hand = snapshot.val();
      hand.forEach(card => {
        card.order = 0;
      });
      return handsRef.child(uid).child('hand').set(hand);
    });
});
