import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promise-middleware';
import { error, loading } from '../components/app/reducers';
import { game, hand } from '../components/game/reducers';
import { user, checkedAuth } from '../components/auth/reducers';
import { leaders } from '../components/leaderboard/reducers';
import { games, stats, chatroom } from '../components/lobby/reducers';
import { profile } from '../components/profile/reducers';

const rootReducer = combineReducers({
  error,
  loading,
  user,
  checkedAuth,
  games,
  profile,
  game,
  hand,
  stats,
  leaders,
  chatroom,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      promiseMiddleware
    )
  )
);

export default store;