/* @flow */
import type { Connector as __ReduxConnector } from 'react-redux'

declare type Redux$Dispatcher<T> = {
  dispatch: (T | Promise<T>) => any
}
declare type Redux$Connector<OP, P, A> = __ReduxConnector<OP, P, A>
