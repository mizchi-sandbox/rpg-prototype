/* @flow */
import { combineReducers } from 'redux'
import playing from './playing'
import battle from './battle'

export default combineReducers({
  battle,
  playing
})
