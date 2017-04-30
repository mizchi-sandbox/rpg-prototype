/* @flow */
import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/index'
import BattleContainer from '../containers/BattleContainer'
import Layout from './Layout'

export default function App (_props: any) {
  return <Provider store={store}>
    <Layout>
      <BattleContainer/>
    </Layout>
  </Provider>
}
