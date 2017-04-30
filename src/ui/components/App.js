/* @flow */
import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/index'
import Layout from './Layout'
import BattleContainer from '../containers/BattleContainer'

export default (props: any) => {
  return <Provider store={store}>
    <Layout>
      <h1>App</h1>
      <BattleContainer/>
    </Layout>
  </Provider>
}
