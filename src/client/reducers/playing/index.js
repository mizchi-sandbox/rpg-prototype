/* @flow */
import { combineReducers } from 'redux'
import location from './location'
import savedata from './savedata'

export type State = {}

export default combineReducers({
  location,
  savedata
})
