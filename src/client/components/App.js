/* @flow */
import React from 'react'
import BattleContainer from '../containers/BattleContainer'
import DebugModeContainer from '../containers/DebugModeContainer'
import AdventureContainer from '../containers/AdventureContainer'
import SetupContainer from '../containers/SetupContainer'
import type { AppContainerProps } from '../containers/AppContainer'
import Layout from './Layout'

export default function App(props: AppContainerProps) {
  const frontScene = props.sceneStack[props.sceneStack.length - 1]
  return (
    <Layout>
      {(() => {
        switch (frontScene.sceneId) {
          case 'debug-mode':
            return <DebugModeContainer />
          case 'adventure':
            return <AdventureContainer />
          case 'battle':
            return <BattleContainer />
          case 'setup':
            return <SetupContainer />
        }
        return <h1>App</h1>
      })()}
    </Layout>
  )
}
