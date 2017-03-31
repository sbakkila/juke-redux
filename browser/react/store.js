import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import lyricsReducer from './reducers/lyrics-reducer'
import playerReducer from './reducers/player-reducer'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'


const middleware = [ createLogger(), thunkMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer
}), composeEnhancers(
  applyMiddleware(...middleware)
));
