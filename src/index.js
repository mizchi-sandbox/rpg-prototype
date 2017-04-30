/* @flow */
import startApp from './ui'

// HMR
import {setStatefulModules} from 'fuse-box/modules/fuse-hmr'
setStatefulModules(name => {
  return /init\.js/.test(name)
})

startApp()
