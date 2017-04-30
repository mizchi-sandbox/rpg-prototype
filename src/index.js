/* eslint-disable */
import './init'
import { setStatefulModules } from 'fuse-box/modules/fuse-hmr'
import startApp from './client'

// HMR
setStatefulModules(name => {
  return /init\.js|middlewares|data\.json/.test(name)
})

startApp()
