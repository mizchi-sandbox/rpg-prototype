import './init'
import startApp from './client'

// HMR
import {setStatefulModules} from 'fuse-box/modules/fuse-hmr'
setStatefulModules(name => {
  return /init\.js/.test(name)
})

startApp()
