/* @flow */
import type { Connector as __ReduxConnector } from 'react-redux'

declare module '@mizchi/redux-helper' {
  declare type Dispatcher<T> = {
    dispatch: (a: T | Promise<T>) => any
  }
  declare type Connector<OP, P, A> = __ReduxConnector<OP, P & Dispatcher<A>>
}
