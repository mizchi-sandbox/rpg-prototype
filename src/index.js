/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render(
  <App/>,
  document.querySelector('main')
)

// HMR
import {setStatefulModules} from 'fuse-box/modules/fuse-hmr'
setStatefulModules(name => {
  return /init\.js/.test(name)
});
